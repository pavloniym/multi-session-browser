<template>

    <div class="side__head">
        <i class="b b-tabs"></i>
    </div>

</template>

<style scoped lang="scss">

    $background: #2c2c2c;
    $color: #6b6a6a;

    .side {
        &__head {
            -webkit-app-region: drag;
            height: 40px;
            min-height: 40px;
            background: lighten($background, 10);
            display: flex;
            align-items: center;
            justify-content: center;
            color: $color;
        }
    }

</style>
