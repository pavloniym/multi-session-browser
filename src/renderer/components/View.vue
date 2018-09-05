<template>

    <div class="view__container">

        <div class="view__container__controls">

            <div class="view__container__controls__button" @click="view.canGoBack() ? view.goBack() : null">
                <i class="fa fa-chevron-left"></i>
            </div>

            <div class="view__container__controls__button" @click="view.canGoForward() ? view.goForward() : null">
                <i class="fa fa-chevron-right"></i>
            </div>


            <div class="view__container__controls__button" @click="view.reload()">
                <i class="fa fa-refresh"></i>
            </div>


            <input type="text" placeholder="URL" @keyup.enter="(e) => navigate(e.target.value)" :value="url">



            <!-- Close event -->
            <div class="view__container__controls__button right" @click="$emit('close')">
                <i class="fa fa-times"></i>
            </div>

        </div>

        <div class="view__container__content">
            <webview
                ref="view"
                autosize
                :src="url"
                style="height:100%;width: 100%"
                :partition="`persist:${hash}`">
            </webview>
        </div>

    </div>


</template>

<script>

    import get from 'lodash/get'
    import moment from 'moment'

    export default {
        data() {
            return {
                url: 'http://google.com',
                favicon: null,
                view: null,
                hash: moment().format('x'),

                events: {
                    'did-finish-load': 'didFinishLoad',
                    'page-favicon-updated': 'pageFaviconUpdated',
                    'did-navigate' : 'didNavigate',
                    'new-window' : 'newWindow'
                }
            }
        },


        methods: {


            didFinishLoad() {
                this.view.removeEventListener('did-finish-load', this.didFinishLoad);
                this.navigate(this.url)
            },

            /**
             * Set view src
             *
             */
            navigate(url) {
                this.view.loadURL(url);
                this.url = url;
            },


            pageFaviconUpdated(r) {
                this.favicon = get(r, 'favicons.0', null);
            },


            newWindow(e) {
                this.navigate(get(e, 'url', 'http://google.com'))
            },


            didNavigate(e) {
                this.url = get(e, 'url', 'about:blank');
            }


        },


        mounted() {

            this.view = this.$refs.view;

            Object.keys(this.events).forEach(event => {
                this.view.addEventListener(event, this[this.events[event]]);
            })

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

        &__controls {
            height: 30px;
            background: white;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #a8a8a8;
            box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.15);
            z-index: 1;

            &__button {
                height: 100%;
                border-right: 1px solid #eaeaea;
                padding: 0 10px;
                display: flex;
                align-items: center;
                cursor: pointer;

                &.right {
                    border-right: none;
                    border-left: 1px solid #eaeaea;
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
