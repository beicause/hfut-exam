<script setup>
import { Icon } from '@iconify/vue2'

const props = defineProps({
    canBack: {
        type:Boolean,
        default:false
    }
})

</script>

<template>
    <div class="title flex items-center justify-center">
        <div v-if="canBack" @click="$router.back()" class="left-0 flex items-center absolute">
            <icon style="width: 40px;height: 40px;" icon="eva:arrow-ios-back-fill"></icon>
        </div>
        <slot></slot>
    </div>
</template>

<style>
.title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    background: #a9e2f3;
    color: white;
}
</style>