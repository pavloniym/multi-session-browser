<template>

    <webview
        v-bind="{partition}"
        ref="view"
        autosize
        src="about:blank"
        style="height:100%;width: 100%">
    </webview>

</template>

<script>

    import get from 'lodash/get'

    export default {
        props: ['src', 'partition'],
        data() {
            return {
                view: null
            }
        },


        methods: {

            /**
             * Set view src
             *
             */
            setURL(url) {
                this.view.loadURL(url);
                this.$emit('setURL', url);
            },


            getFavicon(r) {
                return this.$emit('favicon', get(r, 'favicons.0', null));
            }

        },

        mounted() {

            this.view = this.$refs.view;
            const load = () => {
                this.view.removeEventListener('did-finish-load', load);
                this.setURL(this.src)
            };


            this.view.addEventListener('did-finish-load', load);
            this.view.addEventListener('page-favicon-updated', this.getFavicon)
        },


    }
</script>

<style scoped>

</style>
