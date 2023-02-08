<template>
    <div class="layout-container">
        <!-- header -->
        <Header />
        <!-- tabs -->
        <Tabs />
        <!-- 分栏布局 -->
        <template v-if="gobalStore.layoutMode === 'lcr'">
            <TabSplitSidebar />
        </template>
        <!-- 左右布局 -->
        <template v-if="gobalStore.layoutMode === 'ltr'">
            <SideBar />
        </template>

        <!-- 主界面布局 -->
        <Main />

        <!-- 主题设置 -->
        <SettingDrawer />
    </div>
</template>

<script setup lang="ts">
import Header from './Header/index.vue';
import Main from './Main.vue';
import SideBar from './sidebar/SideBar.tsx';
import Tabs from './tabs/index.vue';
import SettingDrawer from './settingDrawer/index.vue';
import TabSplitSidebar from './sidebar/TabSplitSideBar.tsx';
import { useGlobalStore } from '@/store/global';

const gobalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.layout-container {
    max-height: 100%;
    max-width: 100%;
}
</style>
