<template>
    <div class="horizontal-menue">
        <el-menu
            :default-active="activePath"
            :mode="mMode"
            active-text-color="var(--el-color-primary)"
            :background-color="menuBg"
            :style="{ height: mMode === 'vertical' ? '100%' : '48px' }"
            :router="true"
        >
            <slot></slot>
        </el-menu>
    </div>
</template>

<script setup lang="ts" name="Menu">
import { ref, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useGlobalStore } from '@/store/global';
const gobalStore = useGlobalStore();
const porps = withDefaults(
    defineProps<{ fullPath?: string; mode?: string }>(),
    {
        mode: 'vertical',
    },
);

const route = useRoute();
const activePath = ref(route.fullPath);

const menuBg = computed(() => {
    if (gobalStore.theme === 'light') {
        return 'var(--el-bg-color)';
    } else if (gobalStore.theme === 'dark') {
        return 'var(--dark-menu-bg)';
    } else {
        return 'var(--el-bg-color)';
    }
});
const activBg = ref('var(--el-color-primary-light-8)');
const textColor = ref('var(--el-menu-active-color)');

const mMode = computed(() => {
    return porps.mode;
});

watch(
    () => route.fullPath,
    () => {
        nextTick(() => {
            activePath.value = route.fullPath;
        });
    },
);
</script>

<style lang="scss">
@import '@/styles/variables';
.horizontal-menue {
    height: calc(100% - #{$logoHeight});
    .el-menu {
        border-right: none;
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
    .el-menu--horizontal {
        border-bottom: none;
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
    overflow-x: hidden !important;
}
</style>
