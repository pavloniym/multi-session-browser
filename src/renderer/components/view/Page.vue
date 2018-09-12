<template>

    <div class="view__container">

        <!-- Controls -->
        <div class="view__container__controls">

            <!-- Backward -->
            <div class="view__container__controls__button" @click="view.canGoBack() ? view.goBack() : null">
                <i class="fa fa-arrow-left"></i>
            </div>


            <!-- Forward -->
            <div class="view__container__controls__button" @click="view.canGoForward() ? view.goForward() : null">
                <i class="fa fa-arrow-right"></i>
            </div>

            <!-- Reload -->
            <div class="view__container__controls__button" @click="loading ? view.stop() : view.reload()">
                <i class="fa" :class="{'fa-refresh' : !loading, 'fa-times' : loading}"></i>
            </div>

            <!-- Loading -->
            <div class="view__container__controls__button button--not-interactive">
                <i class="fa fa-circle-o-notch fa-spin" v-if="loading"></i>
            </div>

            <!-- Search -->
            <input type="text" placeholder="URL" @keyup.enter="(e) => navigate(e.target.value)" :value="url">


            <!-- Close event -->
            <div class="view__container__controls__button right" @click="$emit('close')">
                <i class="fa fa-trash"></i>
            </div>


        </div>

        <!-- View -->
        <div class="view__container__content">
            <webview
                class="webview"
                v-if="initialized"
                ref="view"
                autosize
                :src="url || startFrom"
                :guestinstance="hash"
                :partition="`persist:${hash}`">
            </webview>
        </div>

    </div>


</template>

<script>

    import get from 'lodash/get'

    const events = {
        'did-finish-load': 'didFinishLoad',
        'page-favicon-updated': 'pageFaviconUpdated',
        'did-navigate' : 'didNavigate',
        'did-navigate-in-page': 'didNavigate',
        'new-window' : 'newWindow',
        'did-start-loading': 'didStartLoading',
        'did-stop-loading': 'didStopLoading',
    };

    const props = {
        url: {
            type: String,
            default: null,
        },

        hash: {
            type: String,
            default: null
        },

        session: {
            type: String,
            default: null
        },

        hostSession: {
            type: String,
            default: null
        }
    };

    export default {
        props,
        data() {
            return {
                startFrom: 'http://google.com',
                view: null,
                initialized: false,
                loading: false,
            }
        },

        methods: {


            /**
             * Set view src
             *
             */
            navigate(url) {

                this.view.loadURL(url);
                this.$emit('url', url);
            },



            /**
             * Fire then webview finish loading
             *
             */
            didFinishLoad() {
                this.view.removeEventListener('did-finish-load', this.didFinishLoad);
                this.navigate(this.url)
            },


            pageFaviconUpdated(r) {
                this.$emit('favicon', get(r, 'favicons.0', null));
            },


            newWindow(e) {
                this.navigate(get(e, 'url', this.startFrom))
            },


            didNavigate(e) {
                this.$emit('url', get(e, 'url', 'about:blank'));
            },


            didStartLoading() {
                this.loading = true;
            },


            didStopLoading() {
                this.loading = false;
            },



            /**
             * Load view
             * Create event listeners
             *
             */
            initView() {

                this.view = this.$refs.view;
                Object.keys(events).forEach(event => this.view.addEventListener(event, this[events[event]]))

            },


        },

        mounted() {

            /**
             * Check tab session
             * If it was created before -> load it after dom ready
             * If it was created now -> load it now
             *
             */
            if(this.hostSession !== this.session) {

                document.addEventListener("DOMContentLoaded", () => {
                    this.initialized = true;
                    this.$nextTick(() => this.initView())
                });

            } else {

                this.initialized = true;
                this.$nextTick(() => this.initView())
            }
        },



    }
</script>

<style scoped lang="scss">

    .view__container {
        height: 100%;
        display: flex;
        flex-direction: column;

        &__progress {
            overflow: initial;
            position: initial;
        }

        &__controls {
            height: 40px;
            min-height: 40px;
            max-height: 40px;

            background: white;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #a8a8a8;
            border-bottom: 1px solid #eaeaea;
            z-index: 1;
            padding: 10px;

            &__button {
                height: 25px;
                display: flex;
                align-items: center;
                cursor: pointer;
                justify-content: center;
                width: 25px;
                margin: 0 5px;
                font-size: 12px;
                min-width: 25px;
                border-radius: 50%;
                background: transparent;
                transition: .2s ease;

                &:hover {
                    background: #f7f7f7;

                }

                &.button--not-interactive {
                    background: transparent;
                    cursor: default;
                    color: #eaeaea;
                }
            }

            input {
                height: 100%;
                width: 100%;
                border: none;

                &:focus {
                    outline: none;
                }
            }
        }

        &__content {
            height: 100%;
            position: relative;

            .webview {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: inline-flex !important;
            }
        }
    }

</style>
