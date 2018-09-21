<template>

    <div class="controls__bar">
        <slot />
    </div>

</template>

<style scoped lang="scss">

    .controls {
        &__bar {
            height: 40px;
            min-height: 40px;
            max-height: 40px;

            background: white;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #a8a8a8;
            border-bottom: 1px solid #eaeaea;
            z-index: 1;
            padding: 10px;

        }
    }

</style>
