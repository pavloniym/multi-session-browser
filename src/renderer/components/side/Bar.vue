<template>

    <div class="sidebar__container">
        <slot />
    </div>

</template>

<style scoped lang="scss">

    .sidebar {
        &__container {
            width: 40px;
            background: #2c2c2c;
            height: 100%;
            color: white;
        }
    }

</style>
