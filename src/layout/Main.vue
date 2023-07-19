<template>
    <main class="main-layout">
        <router-view v-slot="{ Component, route }">
            <transition
                :name="gobalStore.pageAnimateMode"
                mode="out-in"
                :appear="true"
            >
                <keep-alive
                    v-if="gobalStore.keepAlive"
                    :include="useroute.cachePageList"
                >
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component :is="Component" v-else :key="route.fullPath" />
            </transition>
        </router-view>

        <el-backtop :right="30" :bottom="50" />
    </main>
</template>

<script setup lang="ts" name="Main">
import { useGlobalStore } from '@/store/global';
import { useRouteStore } from '@/store/route';
import { useBasicLayout } from '@/composables/layouts';
const gobalStore = useGlobalStore();
const useroute = useRouteStore();
const { activePadding } = useBasicLayout();
</script>

<style lang="scss" scoped>
.main-layout {
    // padding-top: 80px;
    padding-left: v-bind(activePadding);
    overflow: hidden;
    height: calc(100vh - 80px);
    // overflow-x: hidden;
    // transition: all 0.5s;
}
</style>
