<template>
    <div id="app">


        <div class="app__side">
            <div class="app__side__head">

            </div>
            <div class="app__side__tabs">

                <div class="app__side__tabs__tab" v-for="(t, tk) in tabs" :key="tk" @click="tab = tk"></div>
                <div class="app__side__tabs__tab new" @click="addNewTab">+</div>

            </div>

        </div>
        <div class="app__views">
            <div class="app__views__search">
                <input type="text" placeholder="URL" @keyup.enter="setTabURL" :value="activeTab ? activeTab.url : null">
            </div>
            <div class="app__views__view">
                <w-view
                        v-show="k === tab"
                        v-for="(i,k) in tabs"
                        :ref="`view:${i.hash}`"
                        :key="k"
                        :src="i.url"
                        :id="`persist:${i.hash}`">
                </w-view>
            </div>

        </div>


    </div>
</template>

<script>

    import WView from './components/View'
    import get from 'lodash/get'
    import moment from 'moment'

    export default {
        name: 'electron-app',
        components: {
            WView
        },

        data() {
            return {
                tabs: [],
                tab: 0,

            }
        },

        computed: {

            /**
             * Get current web view instance
             * @returns {*}
             */
            webViewInstance() {
                return get(this, '$refs.view[0].$el', null);
            },


            activeTab() {
                return this.tabs[this.tab] || null
            }

        },

        methods: {

            setTabURL(e) {

                const url = e.target.value;
                this.tabs[this.tab].url = e.target.value;

                this.webViewInstance.loadURL(url);

            },

            addNewTab() {

                this.tabs.push({
                    url: 'http://google.com',
                    hash: moment().format('x'),
                    position: this.tabs.length
                });

                this.tab = this.tabs.length - 1;
            },

        },


        mounted() {
            this.$nextTick(() => {

                this.web.addEventListener('dom-ready', () => {
                    webview.openDevTools()
                })

            })
        }


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
                width: 60px;
                background: #2c2c2c;
                height: 100%;
                color: white;

                &__tabs {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &__tab {

                        background: #585858;
                        width: 40px;
                        height: 30px;
                        border-radius: 4px;
                        margin: 3px 0;
                        border: 1px solid transparent;
                        cursor: pointer;

                        &.new {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            background: transparent;

                            border: 1px dashed white;
                        }
                    }
                }
            }

            &__views {

                width: 100%;
                background: #eaeaea;

                display: flex;
                flex-direction: column;

                &__search {
                    height: 30px;
                    background: white;
                    border-bottom: 2px solid #eaeaea;

                    input {
                        height: 100%;
                        width: 100%;
                        border: none;
                        padding: 0 0 0 10px;
                        font-size: 12px;

                        color: #a8a8a8;
                    }
                }

                &__view {
                    height: 100%;
                }

            }
        }
    }


</style>
