<template>

    <input
        type="text"
        placeholder="URL"
        :value="value"
        @keyup.enter="(e) => $emit('navigate', getWebUri(e.target.value))">

</template>

<script>

    import URI from 'urijs'

    const props = {
        value: {
            type: String,
            default: null
        }
    };

    export default {
        props,
        methods: {

            /**
             * Get formatted uri with protocol
             *
             * @param value
             * @returns {*}
             */
            getWebUri(value) {
                return URI(value).protocol("http:").toString();
            }

        },

    }

</script>

<style scoped lang="scss">

    input {
        -webkit-app-region: drag;
        height: 100%;
        width: 100%;
        border: none;

        &:focus {
            outline: none;
        }
    }

</style>
