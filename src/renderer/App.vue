<template>
    <div id="app">


        <div class="app__side">
            <div class="app__side__head">

            </div>
            <div class="app__side__tabs">
                <div
                    v-for="(t, tk) in tabs"
                    class="app__side__tabs__tab"
                    :key="tk"
                    :style="{backgroundImage: t.favicon ? `url('${t.favicon}')` : null}"
                    @click="tab = tk">

                    <i v-if="!t.favicon" class="fa fa-window-maximize"></i>

                </div>
                <div class="app__side__tabs__tab new" @click="addTab">+</div>

            </div>

        </div>
        <div class="app__views">

           <w-view
                v-show="k === tab"
                v-for="(i,k) in tabs"
                :key="i.hash"
                @close="(tabs.splice(k, 1), tab = null)"
                @favicon="i.favicon = $event">
            </w-view>

        </div>


    </div>
</template>

<script>

    import WView from './components/View'
    import moment from 'moment'

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'electron-app',
        components: {
            WView
        },

        computed: {
            
            ...mapGetters('tabs', ['tab', 'tabs']),

        },
        methods: {


            /**
             * Set favicon to tab
             *
             * @param favicon
             * @param tab
             */
            setFavicon(favicon, tab) {
                tab.favicon = favicon
            },



            /**
             * Add new tab to stack
             *
             */
            addTab() {
                this.tab = this.tabs.push({
                    favicon: null,
                    hash: moment().format('x')
                }) - 1;
            },

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
                    height: 30px;
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
