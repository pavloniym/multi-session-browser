<template>
    <div id="app">


        <div class="app__side">
            <div class="app__side__head">

            </div>
            <div class="app__side__tabs">
                <div
                    class="app__side__tabs__tab"
                    v-for="(t, tk) in tabs"
                    :key="tk"
                    :style="{backgroundImage: `url('${t.favicon}')`}"
                    @click="tab = tk">
                </div>
                <div class="app__side__tabs__tab new" @click="addNewTab">+</div>

            </div>

        </div>
        <div class="app__views">

            <div class="app__views__controls">

                <div class="app__views__controls__button">
                    <i class="fa fa-chevron-left"></i>
                </div>

                <div class="app__views__controls__button">
                    <i class="fa fa-chevron-right"></i>
                </div>

                <div class="app__views__controls__button">
                    <i class="fa fa-refresh"></i>
                </div>
                <input type="text" placeholder="URL" @keyup.enter="setTabURL" :value="activeTab ? activeTab.url : null">
                <div class="app__views__controls__button right">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="app__views__view">
               <w-view
                    v-show="k === tab"
                    v-for="(i,k) in tabs"
                    :key="k"
                    :src="i.url"
                    :partition="`persist:${i.hash}`"
                    @favicon="tabs[i].favicon=$event">
                </w-view>
            </div>

        </div>


    </div>
</template>

<script>

    import WView from './components/View'
    import Vue from 'vue'

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
                favicons: [],
                tab: 0,
            }
        },

        computed: {

            activeTab() {
                return this.tabs[this.tab] || null
            }

        },

        methods: {



            setTabURL(e) {

                const url = e.target.value;
                this.tabs[this.tab].url = e.target.value;


            },

            addNewTab() {

                const hash = moment().format('x');
                const url = 'http://google.com';


                const index = this.tabs.push({url, hash}) - 1;
                this.tab = index;


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

                &__tabs {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &__tab {

                        width: 20px;
                        height: 20px;
                        border-radius: 4px;
                        margin: 3px 0;
                        border: 1px solid transparent;
                        cursor: pointer;
                        background-size: cover;
                        background-color: #585858;
                        background-repeat: no-repeat;

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

                        &:focus{
                            outline: none;
                        }
                    }
                }

                &__view {
                    height: 100%;
                }

            }
        }
    }


</style>
