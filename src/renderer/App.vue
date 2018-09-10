<template>
    <div id="app">


        <div class="app__side">
            <div class="app__side__head">

            </div>
            <div class="app__side__tabs">
                <div
                    v-for="(t, tk) in tabs"
                    class="app__side__tabs__tab"
                    :class="{'active' : tk === tab}"
                    :key="tk"
                    :style="{backgroundImage: t.favicon ? `url('${t.favicon}')` : null}"
                    @click="setActiveTab(tk)">

                    <i v-if="!t.favicon" class="fa fa-window-maximize"></i>

                </div>
                <div class="app__side__tabs__tab new" @click="setNewTab">+</div>

            </div>

        </div>
        <div class="app__views">

           <w-view
                v-show="k === tab"
                v-for="(i,k) in tabs"
                :key="i.hash"
                :url="i.url"
                :hash="i.hash"
                :session="i.session"
                :hostSession="session"
                @url="setURL(k, $event)"
                @close="removeThisTab(k)"
                @favicon="setFavicon(k, $event)">
            </w-view>

        </div>


    </div>
</template>

<script>

    import WView from './components/View'
    import moment from 'moment'

    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'electron-app',
        components: {
            WView
        },

        computed: {

            ...mapGetters('tabs', ['tab', 'tabs']),

        },
        data() {
            return {
                session: moment().format('x')
            }
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


            setURL(key, url) {
                this.update({
                    k: `tabs.${key}.url`,
                    v: url
                })
            },


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


            removeThisTab(index) {
                this.remove(index)
            }

        },

    }
</script>

<style lang="scss">

    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

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


                &__head {
                    height: 40px;
                    background: lighten(#2c2c2c, 10);

                }

                &__tabs {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 5px 0;

                    &__tab {

                        width: 20px;
                        height: 20px;
                        border-radius: 4px;
                        margin: 3px 0;
                        border: 1px solid transparent;
                        cursor: pointer;
                        background-size: cover;
                        background-repeat: no-repeat;
                        text-align: center;
                        transition: .2s ease;

                        &.new {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            background: transparent;
                            border: 1px dashed white;
                        }

                        i {
                            color: #575757;

                        }

                        &.active {
                            position: relative;

                            &:before {
                                content: "";
                                position: absolute;
                                width: 4px;
                                background: #3a539b;
                                top: -3px;
                                height: 130%;
                                left: -10px;
                            }
                        }


                    }
                }
            }

            &__views {

                width: 100%;
                background: #eaeaea;

            }
        }
    }


</style>
