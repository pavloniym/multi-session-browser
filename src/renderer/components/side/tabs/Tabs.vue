<template>

    <div class="sidebar__tabs">
        <slot />
    </div>

</template>

<style scoped lang="scss">

    @import "~@scss/scrollbars/_tabs.scss";

    .sidebar {
        &__tabs {
            -webkit-app-region: drag;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px 0;
            height: 100%;
            overflow-y: overlay;
        }


    }

</style>
