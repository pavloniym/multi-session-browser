<template>

    <div class="views__empty">
        <div class="views__empty__icon"><i class="b b-new-tab"></i></div>
        <div class="views__empty__text">Create new tab</div>
    </div>

</template>


<style scoped lang="scss">

    .views {
        &__empty {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &__icon {
                font-size: 75px;
                color: #dad8d8;
            }

            &__text {
                font-size: 11px;
                margin-top: 10px;
                color: #c7c7c7;
                text-transform: uppercase;
                user-select: none;
                cursor: default;
            }
        }
    }


</style>
