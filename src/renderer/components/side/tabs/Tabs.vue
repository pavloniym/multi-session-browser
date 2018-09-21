<template>

    <div class="sidebar__tabs">
        <slot />
    </div>

</template>

<style scoped lang="scss">

    .sidebar {
        &__tabs {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 5px 0;
        }
    }

</style>
