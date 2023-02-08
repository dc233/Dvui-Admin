<template>
    <el-scrollbar
        :class="mMode === 'vertical' ? 'scrollbar' : 'horizontal-scrollbar'"
        wrap-class="scrollbar-wrap-class"
    >
        <el-menu
            :default-active="activePath"
            :mode="mMode"
            active-text-color="var(--el-color-primary)"
            :style="{ height: mMode === 'vertical' ? '100%' : '48px' }"
            :collapse="gobalStore.iScollapse"
            :background-color="menuBg"
            :router="true"
            :text-color="
                gobalStore.menuTheme === 'light'
                    ? 'var(--el-text-color-primary)'
                    : '#bbbbbb'
            "
        >
            <slot></slot>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts" name="ScrollerMenu">
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/store/global';
import LeftBg from '@/assets/img/bg_img.webp';
const gobalStore = useGlobalStore();
const porps = withDefaults(
    defineProps<{ fullPath?: string; mode?: string; size?: string }>(),
    {
        mode: 'vertical',
        size: 'default',
    },
);

const route = useRoute();
const activePath = ref(route.fullPath);
const mMode = computed(() => {
    return porps.mode;
});
// 左右情况下的菜单背景颜色
const menuBg = computed(() => {
    if (gobalStore.menuTheme === 'light') {
        return 'var(--el-bg-color)';
    } else if (gobalStore.menuTheme === 'dark') {
        return 'var(--dark-menu-bg)';
    } else {
        if (gobalStore.layoutMode === 'lcr') {
            return 'transparent';
        } else {
            return `url(${LeftBg}) var(--dark-menu-bg)`;
        }
    }
});
const activBg = computed(() =>
    gobalStore.menuTheme === 'light'
        ? 'var(--el-color-primary-light-8)'
        : 'var(--el-menu-active-color)',
);
const textColor = computed(() =>
    gobalStore.menuTheme === 'light'
        ? 'var(--el-menu-active-color)'
        : '#ffffff',
);
const menuSize = computed(() =>
    porps.size === 'default'
        ? 'calc(var(--el-menu-item-height) - 6px)'
        : '40px',
);
watch(
    () => route.fullPath,
    () => {
        nextTick(() => {
            activePath.value = route.fullPath;
        });
    },
);
</script>

<style lang="scss" scope>
@import '@/styles/variables';
.scrollbar {
    background: v-bind(menuBg);
    height: calc(100% - #{$logoHeight}) !important;
    background-size: cover;
    .el-menu {
        border-right: none;
        .el-menu-item {
            height: v-bind(menuSize);
        }
        .el-menu-item:hover {
            color: var(--el-menu-active-color);
            background-color: transparent;
        }
        .el-menu-item.is-active {
            color: v-bind(textColor);
            background-color: v-bind(activBg);
            // background-color: var(--el-menu-hover-bg-color);
        }
    }
}
.el-popper {
    .el-menu {
        .el-menu-item:hover {
            background-color: transparent;
        }
    }
}
.scrollbar-wrap-class {
    // overflow-x: hidden !important;
}
</style>
