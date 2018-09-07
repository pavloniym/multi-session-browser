<template>

    <div class="view__container">

        <!-- Progress -->
        <nprogress class="view__container__progress" />

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
                ref="view"
                style="height:100%;width: 100%"
                autosize
                :src="url"
                :guestinstance="hash"
                :partition="`persist:${hash}`">
            </webview>
        </div>

    </div>


</template>

<script>

    import nprogress from 'vue-nprogress/src/NprogressContainer'

    import get from 'lodash/get'
    import moment from 'moment'

    const events = {
        'did-finish-load': 'didFinishLoad',
        'page-favicon-updated': 'pageFaviconUpdated',
        'did-navigate' : 'didNavigate',
        'new-window' : 'newWindow',
        'did-start-loading': 'didStartLoading',
        'did-stop-loading': 'didStopLoading'

    };

    export default {
        data() {
            return {
                url: 'http://google.com',
                favicon: null,
                view: null,
                hash: moment().format('x'),
                loading: false,
            }
        },

        components: {nprogress},
        methods: {


            /**
             * Set view src
             *
             */
            navigate(url) {
                this.view.loadURL(url);
                this.url = url;
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
                this.favicon = get(r, 'favicons.0', null);
            },


            newWindow(e) {
                this.navigate(get(e, 'url', 'http://google.com'))
            },


            didNavigate(e) {
                this.url = get(e, 'url', 'about:blank');
            },


            didStartLoading() {
                this.$nprogress.start();
                this.loading = true;
            },


            didStopLoading() {
                this.$nprogress.done();
                this.loading = false;
            }


        },


        mounted() {

            // Get webview content
            this.view = this.$refs.view;

            // Apply events listeners
            Object.keys(events).forEach(event => this.view.addEventListener(event, this[events[event]]))
        },

        watch: {

            // Watch for favicon change
            favicon: {
                handler(favicon) {
                    this.$emit('favicon', favicon);
                }
            }
        }


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
            }

            input {
                height: 100%;
                width: 100%;
                border: none;
                padding: 0 0 0 10px;

                &:focus {
                    outline: none;
                }
            }
        }

        &__content {
            height: 100%;
        }
    }

</style>
