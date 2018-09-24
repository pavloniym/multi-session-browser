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
                    v-for="(i,k) in tabs"
                    :hash="i.hash"
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
    import {name} from '../../package'

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
                tabs: [],
            }
        },

        computed: {
            ...mapGetters('tabs', ['tab']),
        },


        methods: {


            btoa(string) {
                return window.btoa(string);
            },

            ...mapMutations('tabs', ['update', 'add', 'remove']),


            /**
             * Set favicon to tab
             *
             * @param key
             * @param favicon
             */
            setFavicon(key, favicon) {
                this.update({k: `tabs.${key}.favicon`,v: favicon})
            },


            /**
             * Set updated URL to tab config in store
             *
             * @param key
             * @param url
             */
            setURL(key, url) {

                let tab = JSON.parse(JSON.stringify(this.tabs[key]));
                tab.url = url;

                this.update({k: `tabs.${key}`, v: tab})
            },


            /**
             * Set tab as active
             *
             * @param index
             */
            setActiveTab(index) {
                this.update({k: 'tab',v: index,})
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

        mounted() {
            this.tabs = this.$store.getters['tabs/tabs'];
        }

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
