<template>

    <div class="side__controls">

        <div class="side__controls__action" ><i class="fa fa-cog"></i></div>
        <div class="side__controls__action" @click="reload"><i class="fa fa-refresh"></i></div>

        <span></span>

        <div class="side__controls__action" @click="close"><i class="fa fa-times"></i></div>
        <div class="side__controls__action small" @click="minimize"><i class="fa fa-window-minimize"></i></div>
        <div class="side__controls__action small" @click="maximize"><i class="fa fa-window-maximize"></i></div>

        <span></span>

    </div>

</template>

<script>
    export default {


        methods: {

            close() {
                this.$electron.remote.getCurrentWindow().close();
            },


            maximize() {
                this.$electron.remote.BrowserWindow.getFocusedWindow().maximize();
            },


            minimize() {
                this.$electron.remote.BrowserWindow.getFocusedWindow().minimize();
            },


            reload() {
                location.reload();
            }

        }
    }
</script>

<style scoped lang="scss">

    .side {
        &__controls {
            margin-top: auto;
            margin-bottom: 10px;

            span {
                border-bottom: 1px solid #383838;
                height: 1px;
                display: block;
                margin: 2px 8px;
            }

            &__action {
                text-align: center;
                font-size: 12px;
                padding: 4px 0;
                color: #5b5b5b;
                transition: .2s ease;
                cursor: pointer;
                user-select: none;
                height: 22px;

                &.small {
                    font-size: 9px;
                }

                &:hover {
                    color: white;
                }
            }
        }
    }

</style>
