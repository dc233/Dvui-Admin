<template>
    <div class="layout-container">
        <!-- header -->
        <div class="layout-heade">
            <Header />
            <!-- tabs -->
            <Tabs />
        </div>
        <!-- 分栏布局 -->
        <template v-if="gobalStore.layoutMode === 'columns'">
            <TabSplitSidebar />
        </template>
        <!-- 左右布局 -->
        <template v-if="gobalStore.layoutMode === 'vertical'">
            <SideBar />
        </template>
        <!-- 经典布局 -->
        <template v-if="gobalStore.layoutMode === 'classic'">
            <classicSidebar />
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
import SideBar from './sidebar/SideBar';
import Tabs from './tabs/index.vue';
import SettingDrawer from './settingDrawer/index.vue';
import TabSplitSidebar from './sidebar/TabSplitSideBar';
import classicSidebar from './sidebar/classicSideBar';
import { useGlobalStore } from '@/store/global';

const gobalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.layout-container {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    .layout-heade {
        width: 100%;
        height: 80px;
        background-color: var(--el-bg-color);
    }
}
</style>
