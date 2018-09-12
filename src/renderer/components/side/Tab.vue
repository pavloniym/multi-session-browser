<template>

    <div
        class="side__tab"
        :class="{active}"
        :style="{backgroundImage: favicon ? `url('${favicon}')` : null}">
        <slot>
            <i v-if="!favicon" class="fa fa-window-maximize"></i>
        </slot>
    </div>


</template>

<script>

    const props = {
        active: {
            type: Boolean,
            default: false,
        },

        favicon: {
            type: String,
            default: null
        }
    };

    export default {
        props,

    }
</script>

<style scoped lang="scss">

    .side {
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

            &.tab--new {
                display: flex;
                align-items: center;
                justify-content: center;
                background: transparent;
                border: 1px dashed #a8a8a8;
                color: #a8a8a8;
                font-size: 10px;
                transition: .5s ease;

                i {
                    transition: .5s ease;
                }

                &:hover {
                    color: white;
                    border-color: white;
                    i {
                        color: white;
                    }
                }
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

</style>
