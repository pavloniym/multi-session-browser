<template>

    <webview :src="src" autosize style="height:100%;width: 100%" :partition="id"></webview>

</template>

<script>
    export default {
        props: ['src', 'id'],

    }
</script>

<style scoped>

</style>