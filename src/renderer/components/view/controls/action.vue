<template>


    <div class="controls__button" >
        <slot>
            <i v-if="icon" :class="icon"></i>
        </slot>

    </div>

</template>

<script>

    const props = {
        icon: {
            type: String,
            default: null
        }
    };


    export default {
        props,
    }

</script>

<style scoped lang="scss">

    .controls {
        &__button {
            height: 25px;
            display: flex;
            align-items: center;
            cursor: pointer;
            justify-content: center;
            width: 25px;
            margin: 0 5px;
            font-size: 12px;
            min-width: 25px;
            border-radius: 50%;
            background: transparent;
            transition: .2s ease;

            &:hover {
                background: #f7f7f7;

            }

            &.not-interactive {
                background: transparent;
                cursor: default;
                color: #eaeaea;
            }
        }
    }

</style>
