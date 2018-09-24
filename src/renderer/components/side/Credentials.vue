<template>

    <div class="side__credentials">
        <!--<a href="#" @click="open(repository)">PS</a>-->
        <a href="#" @click="open(releases)">v{{version}}</a>
    </div>

</template>

<script>

    import {version, repository} from './../../../../package'

    export default {

        computed: {

            /**
             * Get current version
             *
             * @returns {string}
             */
            version() {
                return version;
            },


            /**
             * Get repository url
             *
             * @returns {string}
             */
            repository() {
                return repository.url;
            },



            /**
             * Get all releases
             *
             * @returns {string}
             */
            releases() {
                return `${this.repository}/releases`
            }
        },


        methods: {

            /**
             * Open link in default OS browser
             *
             * @param link
             */
            open(link) {
                this.$electron.shell.openExternal(link);
            }
        }
    }

</script>

<style scoped lang="scss">

    .side {
        &__credentials {
            font-size: 9px;
            text-align: center;
            color: #6b6b6b;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 20px;
            padding-bottom: 10px;

            a {
                margin: 2px 0;
                color: inherit;
                text-decoration: none;
                cursor: pointer;
                transition: .2s ease;

                &:hover {
                    color: white;
                }
            }
        }
    }


</style>
