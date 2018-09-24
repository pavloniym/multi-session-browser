<template>

    <div class="view__container">

        <!-- Controls -->
        <bar>

            <!-- History -->
            <action icon="fa fa-arrow-left" @click.native="view.canGoBack() ? view.goBack() : null"/>
            <action icon="fa fa-arrow-right" @click.native="view.canGoForward() ? view.goForward() : null"/>


            <!-- Loading -->
            <action :icon="!loading ? 'fa fa-refresh' : 'fa fa-times'" @click.native="loading ? view.stop() : view.reload()"/>
            <action class="not-interactive">
                <i class="fa fa-circle-o-notch fa-spin" v-if="loading"></i>
            </action>


            <!-- Search -->
            <url @navigate="navigate($event)" :value="tab.url" />


            <!-- Close event -->
            <action icon="fa fa-trash" @click.native="$emit('close')" />

        </bar>

        <!-- View -->
        <div class="view__container__content">
            <webview
                class="webview"
                v-if="initialized"
                ref="view"
                autosize
                allowpopups
                webpreferences="nativeWindowOpen=true"
                :src="tab.url || startFrom"
                :guestinstance="tab.hash"
                :partition="`persist:${tab.hash}`">
            </webview>
        </div>

    </div>


</template>

<script>

    import get from 'lodash/get'

    import Action from './../controls/action'
    import Bar from './../controls/bar'
    import Url from './../controls/url'

    import {mapGetters} from 'vuex'

    const events = {
        'did-finish-load': 'didFinishLoad',
        'page-favicon-updated': 'pageFaviconUpdated',
        'did-navigate': 'didNavigate',
        'did-navigate-in-page': 'didNavigate',
        'new-window': 'newWindow',
        'did-start-loading': 'didStartLoading',
        'did-stop-loading': 'didStopLoading',
    };

    const props = {
        hash: {
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
                startFrom: 'https://google.com',
                view: null,
                initialized: false,
                loading: false,
            }
        },

        components: {
            Action, Bar, Url
        },

        computed: {

            ...mapGetters('tabs', ['tabs']),
            
            tab() {
                const tabs = this.tabs || [];
                return tabs.find(t => t.hash === this.hash);
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
                this.navigate(this.tab.url)
            },


            pageFaviconUpdated(r) {
                this.$emit('favicon', get(r, 'favicons.0', null));
            },


            newWindow(e) {
                this.navigate(get(e, 'url', this.startFrom))
            },


            didNavigate(e) {
                this.$emit('url', get(e, 'url', null));
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
            if (this.hostSession !== this.tab.session) {

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
