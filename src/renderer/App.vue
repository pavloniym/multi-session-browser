<template>
    <div id="app">


        <div class="app__side">
            <side-head/>
            <div class="app__side__tabs">
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
            </div>
        </div>


        <div class="app__views">
            <div class="app__views__container" v-if="tab >= 0 && tabs[tab]">
                <page-view
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
                </page-view>
            </div>
            <empty-view v-else/>
        </div>


    </div>
</template>

<script>


    import SideHead from './components/side/Head'
    import SideTab from './components/side/Tab'

    import EmptyView from './components/view/Empty'
    import PageView from './components/view/Page'

    import moment from 'moment'
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'clone-browser',
        components: {
            SideHead, SideTab,
            EmptyView, PageView,
        },

        data() {
            return {
                session: moment().format('x')
            }
        },

        computed: {
            ...mapGetters('tabs', ['tab', 'tabs']),
        },

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
                this.update({
                    k: `tabs.${key}.url`,
                    v: url
                })
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
                    &__side {
                        width: 40px;
                        background: #2c2c2c;
                        height: 100%;
                        color: white;

                        &__tabs {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            padding: 5px 0;
                        }
                    }

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
