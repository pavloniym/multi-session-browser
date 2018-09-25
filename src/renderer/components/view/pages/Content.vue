<template>

    <div class="view__container">

        <!-- Controls -->
        <bar>

            <!-- History -->
            <action icon="fa fa-arrow-left" @click.native="view.canGoBack() ? view.goBack() : null"/>
            <action icon="fa fa-arrow-right" @click.native="view.canGoForward() ? view.goForward() : null"/>


            <!-- Loading -->
            <action :icon="!loading ? 'fa fa-refresh' : 'fa fa-times'"
                    @click.native="loading ? view.stop() : view.reload()"/>
            <action class="not-interactive">
                <i class="fa fa-circle-o-notch fa-spin" v-if="loading"></i>
            </action>


            <!-- Search -->
            <url @navigate="navigate($event)" :value="tab.url"/>


            <!-- Close event -->
            <action icon="fa fa-trash" @click.native="$emit('close')"/>

        </bar>

        <!-- View -->
        <div class="view__container__content">
            <webview
                v-if="initialized"
                autosize
                class="webview"
                ref="view"
                src="data:text/plain"
                :guestinstance="tab.hash"
                :partition="`persist:${tab.hash}`">
            </webview>
        </div>

    </div>


</template>

<script>


    import Action from './../controls/action'
    import Bar from './../controls/bar'
    import Url from './../controls/url'

    import {parsing} from "../../../utils/hashing";
    import get from 'lodash/get'

    import context from 'electron-context-menu'

    const events = {
        'did-finish-load': 'didFinishLoad',
        'page-favicon-updated': 'pageFaviconUpdated',
        'new-window': 'newWindow',
        'did-start-loading': 'didStartLoading',
        'did-stop-loading': 'didStopLoading',
    };

    const props = {

        configuration: {
            type: String,
            default: null
        },

        session: {
            type: String,
            default: null
        }
    };

    export default {
        props,
        data() {
            return {
                default: 'https://google.com',
                url: parsing(this.configuration).url,
                view: null,
                initialized: false,
                loading: false,

            }
        },

        components: {Action, Bar, Url},

        computed: {

            /**
             * Get tab from configuration b64
             *
             * @returns {{}}
             */
            tab() {
                return parsing(this.configuration)
            },
        },

        methods: {


            /**
             * Load url
             *
             */
            navigate(url) {
                this.view.loadURL(url || this.default);
            },


            /**
             * Fire then webview finish loading
             * Run context menu
             * Navigate to url
             *
             */
            didFinishLoad() {
                this.view.removeEventListener('did-finish-load', this.didFinishLoad);

                context({
                    window: this.view,
                    showCopyImageAddress: true,
                    showInspectElement: true,
                });

                this.navigate(this.tab.url)
            },


            /**
             * Emit event with new favicon
             *
             */
            pageFaviconUpdated(r) {
                this.$emit('favicon', get(r, 'favicons.0', null));
            },


            /**
             * Navigate then new window is opened
             *
             */
            newWindow(e) {
                this.navigate(get(e, 'url', this.default))
            },



            /**
             * Start loading page
             *
             */
            didStartLoading() {
                this.loading = true;
            },



            /**
             * Finish loading page
             * Set new url
             *
             */
            didStopLoading() {
                this.loading = false;
                this.url = this.view.getURL();
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
            if (this.session !== this.tab.session) {

                document.addEventListener("DOMContentLoaded", () => {
                    this.initialized = true;
                    this.$nextTick(() => this.initView())
                });

            } else {

                this.initialized = true;
                this.$nextTick(() => this.initView())
            }
        },


        watch: {

            /**
             * Watch for url change
             * Emit event
             *
             */
            url: {
                handler(url) {
                    this.$emit('url', url)
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

        &__content {
            height: 100%;
            position: relative;

            .webview {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                min-width: 100%;
                min-height: 100%;
                display: inline-flex !important;
            }
        }
    }

</style>
