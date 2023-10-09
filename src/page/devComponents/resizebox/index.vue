<template>
    <div class="content-layout">
        <div>计数器: {{ num }}</div>
        <button @click="numadd">+</button>
    </div>
</template>

<script setup lang="ts" name="resizeBox">
import { ref } from 'vue';
const num = ref(1);

const numadd = () => {
    num.value += 1;
};
</script>

<style lang="scss" scoped></style>
