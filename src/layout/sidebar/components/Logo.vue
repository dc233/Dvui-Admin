<template>
    <div class="logo">
        <img v-if="showLogo" src="@image/logo.png" alt="" />
        <div
            v-if="showTitle"
            :class="gobalStore.iScollapse ? 'no_title' : 'title'"
        >
            DVUI管理系统
        </div>
    </div>
</template>

<script setup lang="ts" name="Logo">
import { computed } from 'vue';
import { useGlobalStore } from '@/store/global';
const gobalStore = useGlobalStore();

const porps = withDefaults(
    defineProps<{ showLogo?: boolean; showTitle?: boolean }>(),
    {
        showLogo: false,
        showTitle: false,
    },
);
const menuBg = computed(() => {
    if (gobalStore.menuTheme === 'light') {
        return 'var(--el-bg-color)';
    } else if (gobalStore.menuTheme === 'dark') {
        return 'var(--dark-menu-bg)';
    } else {
        return '#020f1f';
    }
});

const logoText = computed(() => {
    if (gobalStore.menuTheme === 'light') {
        return 'var(--el-text-color-primary)';
    } else {
        return '#fff';
    }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.logo {
    height: $logoHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: v-bind(menuBg);
    img {
        width: 40px;
        height: auto;
    }
    span {
        font-weight: 700;
    }
    .title {
        transform: scale(1);
        transition: transform 0.4s ease-in;
        width: auto;
        padding-left: 8px;
        font-size: 18px;
        font-weight: 600;
        color: v-bind(logoText);
        overflow: hidden;
    }
    .no_title {
        transform: scale(0);
        width: 0;
        overflow: hidden;
    }
}
</style>
