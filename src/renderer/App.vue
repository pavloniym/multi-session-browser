<template>
    <div id="app">


        <side-bar>
            <side-head/>
            <side-tabs>
                <side-tab
                    v-for="(t, k) in tabs"
                    :key="k"
                    :active="k === tab"
                    :favicon="t.favicon || null"
                    @click.native="setActiveTab(k)">
                </side-tab>

                <side-tab
                    class="tab--new"
                    @click.native="setNewTab">
                    <i class="fa fa-plus"></i>
                </side-tab>

            </side-tabs>
            <controls />
            <credentials />
        </side-bar>



        <div class="app__views">
            <div class="app__views__container" v-if="tab >= 0 && tabs[tab]">
                <content-view
                    v-show="k === tab "
                    v-for="(i,k) in tabs"
                    :key="i.hash"
                    :url="i.url"
                    :hash="i.hash"
                    :session="i.session"
                    :hostSession="session"
                    @url="setURL(k, $event)"
                    @close="removeThisTab(k)"
                    @favicon="setFavicon(k, $event)">
                </content-view>
            </div>
            <empty-view v-else/>
        </div>


    </div>
</template>

<script>



    import {
        Bar as SideBar,
        Head as SideHead,
        Tabs as SideTabs,
        Tab as SideTab,
        Credentials,
        Controls
    } from './components/side'

    import EmptyView from './components/view/pages/Empty'
    import ContentView from './components/view/pages/Content'

    import moment from 'moment'
    import get from 'lodash/get'

    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'clone-browser',
        components: {
            SideBar, SideHead, SideTabs, SideTab,
            Credentials, Controls,
            EmptyView, ContentView,
        },

        data() {
            return {
                session: moment().format('x')
            }
        },

        computed: mapGetters('tabs', ['tab', 'tabs']),

        methods: {
            ...mapMutations('tabs', ['update', 'add', 'remove']),


            /**
             * Set favicon to tab
             *
             * @param key
             * @param favicon
             */
            setFavicon(key, favicon) {
                this.update({
                    k: `tabs.${key}.favicon`,
                    v: favicon
                })
            },


            /**
             * Set updated URL to tab config in store
             *
             * @param key
             * @param url
             */
            setURL(key, url) {

                const currentUrl = get(this.tabs, [this.tab, 'url'], null);
                if(url !== currentUrl) this.update({k: `tabs.${key}.url`, v: url})
            },


            /**
             * Set tab as active
             *
             * @param index
             */
            setActiveTab(index) {
                this.update({
                    k: 'tab',
                    v: index,
                })
            },


            /**
             * Add new tab to stack
             *
             */
            setNewTab() {

                this.add({session: this.session});
                this.update({k: 'tab', v: this.tabs.length - 1});
            },



            /**
             * Remove tab from stack
             *
             * @param index
             */
            removeThisTab(index) {
                this.remove(index)
            }

        },

    }
</script>

<style lang="scss">

    @import "~@scss/_variables.scss";

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;

        * {
            box-sizing: border-box;
        }

        body {

            font-family: $font;
            line-height: 1.254;
            font-weight: 400;
            -webkit-font-smoothing: subpixel-antialiased;
            -moz-osx-font-smoothing: auto;

            #app {
                height: 100%;
                display: flex;
                width: 100%;

                .app {

                    &__views {
                        width: 100%;
                        background: #eaeaea;

                        &__container {
                            height: 100%;
                        }
                    }
                }

            }

        }

    }


</style>
