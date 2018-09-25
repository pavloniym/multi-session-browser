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
            <controls/>
            <credentials/>
        </side-bar>


        <div class="app__views">
            <div class="app__views__container" v-if="tab >= 0 && tabs[tab]">
                <content-view
                    v-for="(t,k) in tabs"
                    v-show="k === tab"
                    :key="t.hash"
                    :configuration="hashTab(t)"
                    :session="session"
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
        Controls,
        Credentials,
        Head as SideHead,
        Tab as SideTab,
        Tabs as SideTabs
    } from './components/side'

    import EmptyView from './components/view/pages/Empty'
    import ContentView from './components/view/pages/Content'

    import moment from 'moment'

    import {mapGetters, mapMutations} from 'vuex'
    import {name} from '../../package'
    import {hashing} from "./utils/hashing";

    export default {
        name,
        components: {
            SideBar, SideHead, SideTabs, SideTab,
            Credentials, Controls,
            EmptyView, ContentView,
        },

        data() {
            return {
                session: moment().format('x'),
            }
        },

        computed: mapGetters('tabs', ['tab', 'tabs']),
        methods: {

            ...mapMutations('tabs', ['update', 'add', 'remove']),


            /**
             * Hash tab's object to b64
             *
             * @returns {string}
             */
            hashTab(tab) {
                return hashing(tab);
            },


            /**
             * Set favicon to tab
             *
             * @param key
             * @param favicon
             */
            setFavicon(key, favicon) {
                this.update({k: `tabs.${key}.favicon`, v: favicon})
            },


            /**
             * Set updated URL to tab config in store
             *
             * @param key
             * @param url
             */
            setURL(key, url) {
                this.update({k: `tabs.${key}.url`, v: url})
            },


            /**
             * Set tab as active
             *
             * @param index
             */
            setActiveTab(index) {
                this.update({k: 'tab', v: index,})
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
