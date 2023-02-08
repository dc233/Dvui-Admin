<template>
    <div class="tabs-layout">
        <el-tabs
            id="tagViewTab"
            v-model="currentTab"
            type="card"
            @tab-click="clickTab"
            @tab-remove="removeTab"
            @contextmenu.prevent="onContextMenu(currentTab, $event)"
        >
            <el-tab-pane
                v-for="item of tabsRoutes"
                :key="item.path"
                :label="item.meta ? item.meta.title : item.name"
                :name="item.fullPath"
                :closable="!isAffix(item)"
            />
        </el-tabs>
        <ul
            v-show="showContextMenu"
            class="contex-menu-wrapper"
            :style="contextMenuStyle"
        >
            <li>
                <el-button :underline="false" text @click="refreshRoute">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="padding-right: 4px"
                    >
                        <svg-icon icon-class="refresh" />
                    </el-icon>
                    刷新页面</el-button
                >
            </li>
            <li>
                <el-button :underline="false" text @click="currentRouter">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="padding-right: 4px"
                    >
                        <svg-icon icon-class="close-small" />
                    </el-icon>
                    关闭当前</el-button
                >
            </li>
            <li>
                <el-button :underline="false" text @click="closeLeft">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="padding-right: 4px"
                    >
                        <svg-icon icon-class="to-left" />
                    </el-icon>
                    关闭左侧</el-button
                >
            </li>
            <li>
                <el-button :underline="false" text @click="closeRight">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="padding-right: 4px"
                    >
                        <svg-icon icon-class="to-right" />
                    </el-icon>
                    关闭右侧</el-button
                >
            </li>
            <li>
                <el-button :underline="false" text @click="closeAll">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="padding-right: 4px"
                    >
                        <svg-icon icon-class="close-one" />
                    </el-icon>
                    关闭所有</el-button
                >
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="Tabs">
import { useRoute, useRouter } from 'vue-router';
import { useBasicLayout } from '@/composables/layouts';
import { ref, watch, reactive, unref } from 'vue';
import qs from 'qs';
import { handleAliveRoute, delAliveRoutes } from '@/utils/router/cachRouter';
import { setSession, getSession } from '@/utils/storage';
const { activePadding } = useBasicLayout();
const route = useRoute();
const router = useRouter();
const currentTab = ref(route.fullPath);
const tabsRoutes = ref(getSession('__tabsroute__') || []);
const selectRoute = ref(null);
const showContextMenu = ref(false);
const contextMenuStyle = reactive({
    left: 0,
    top: 0,
});
// 点击tab跳转路由
const clickTab = (tabval) => {
    const query = tabval.props.name.split('?')[1];
    router.push({ path: tabval.props.name, query: qs.parse(query) });
};
// 点击删除路由
const removeTab = (name: string) => {
    const findItem = tabsRoutes.value.findIndex(
        (item) => item.fullPath === name,
    );
    const currentItem = tabsRoutes.value.filter(
        (item) => item.fullPath === name,
    );
    if (findItem !== -1) {
        tabsRoutes.value.splice(findItem, 1);
        // 去除当前路由的缓存
        handleAliveRoute(currentItem, 'delete');
        if (currentTab.value === name) {
            currentTab.value =
                tabsRoutes.value[tabsRoutes.value.length - 1].fullPath;
            router.push(currentTab.value);
        }
    }
};

// 右键扩展菜单
const onContextMenu = (item, ctx) => {
    const { clientX } = ctx;
    const { x } = document
        .querySelector('.tabs-layout')
        .getBoundingClientRect();
    const parentElementRect = document
        .getElementById('tagViewTab')
        .getElementsByClassName('el-tabs__nav is-top')[0]
        .getBoundingClientRect();
    console.log(clientX, parentElementRect.x, parentElementRect.width);
    if (clientX < parentElementRect.x) return;
    if (clientX > parentElementRect.x + parentElementRect.width) return;
    selectRoute.value = null;
    selectRoute.value = tabsRoutes.value.find((it) => {
        const { x, width } = document
            .getElementById('tab-' + it.fullPath)
            .getBoundingClientRect();
        if (x < clientX && clientX < x + width) {
            return it;
        }
    });

    if (selectRoute.value) {
        const screenWidth = document.body.clientWidth;
        contextMenuStyle.left =
            (clientX + 130 > screenWidth
                ? clientX - 130 - x - 15
                : clientX - x + 15) + 'px';
        contextMenuStyle.top = '15px';
        showContextMenu.value = true;
    }
};

const isAffix = (itemroute) => {
    return itemroute.meta && itemroute.meta.affix;
};

// 监听路由存储菜单
const savetabsRoutes = (val) => {
    if (!tabsRoutes.value.some((item) => item.fullPath === val.fullPath)) {
        tabsRoutes.value.push(val);
    }
};
// 关闭右键菜单
const closeMenu = () => {
    showContextMenu.value = false;
};
// 刷新当前路由
const refreshRoute = () => {
    const { fullPath, query } = unref(route);
    router.replace({
        path: '/redirect' + fullPath,
        query: query,
    });
};
// 关闭当前路由
const currentRouter = () => {
    const { fullPath, meta } = route;
    if (meta.affix) return;
    removeTab(fullPath);
};
// 关闭左侧的路由
const closeLeft = () => {
    const findItem = tabsRoutes.value.findIndex(
        (item) => item.fullPath === currentTab.value,
    );
    const routes = tabsRoutes.value.slice(1, findItem);
    if (findItem <= 1) return;
    delAliveRoutes(routes);
    batchClosetag(1, findItem - 1);
};
// 关闭右侧的路由
const closeRight = () => {
    const findItem = tabsRoutes.value.findIndex(
        (item) => item.fullPath === currentTab.value,
    );
    const routes = tabsRoutes.value.slice(
        findItem + 1,
        tabsRoutes.value.length,
    );
    if (findItem === -1 || routes.length === 0) return;
    delAliveRoutes(routes);
    batchClosetag(findItem + 1, tabsRoutes.value.length);
};
// 关闭所有路由
const closeAll = () => {
    const currentRoute = tabsRoutes.value.find((route) => route.meta.affix);
    const routes = tabsRoutes.value.slice(1, tabsRoutes.value.length);
    console.log(currentRoute);
    if (routes.length === 0) return;
    if (!currentRoute) return;
    console.log('zz');
    delAliveRoutes(routes);
    batchClosetag(1, tabsRoutes.value.length);
    currentTab.value = currentRoute.fullPath;
    router.push(currentTab.value);
};
// 批量关闭Tag
const batchClosetag = (startIndex, legnth) => {
    tabsRoutes.value.splice(startIndex, legnth);
};
watch(
    () => route,
    (val) => {
        const { fullPath, meta, name } = val;
        // 重定向不增加tabs列
        if (name === 'Redirect') return;
        currentTab.value = fullPath;
        savetabsRoutes({ fullPath: fullPath, meta: meta, name: name });
    },
    {
        immediate: true,
        deep: true,
    },
);
// 监听存储tabs到session中
watch(
    tabsRoutes,
    (val) => {
        setSession('__tabsroute__', val);
    },
    {
        immediate: true,
        deep: true,
    },
);
watch(showContextMenu, (val) => {
    if (val) {
        document.body.addEventListener('click', closeMenu);
    } else {
        document.body.addEventListener('click', closeMenu);
    }
});
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.tabs-layout {
    position: fixed;
    top: 48px;
    left: 0;
    width: 100%;
    height: 32px;
    padding-left: v-bind(activePadding);
    box-sizing: border-box;
    background-color: var(--el-bg-color);
    z-index: 97;
    border-bottom: 1px solid var(--el-menu-border-color);

    .el-tabs {
        position: relative;
        height: 32px !important;
    }
}
.drown-menu {
    position: relative;
}
.contex-menu-wrapper {
    position: absolute;
    width: 130px;
    z-index: 999;
    list-style: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background-color: var(--el-bg-color);
    padding-left: 0;
    li {
        width: 100%;
        box-sizing: border-box;
        .el-button.is-text {
            width: 100%;
        }
    }
}
::v-deep(.el-tabs--card > .el-tabs__header) {
    border: none;
    margin: 0;
    padding: 0 10px;
    .el-tabs__nav-wrap {
        line-height: 27px;
    }
    .el-tabs__nav {
        border: none !important;
    }
    .el-tabs__item {
        height: calc(#{$tabHeight} - 8px);
        line-height: calc(#{$tabHeight} - 10px);
        border-radius: 12px;
        font-size: 12px;
        border: 1px solid var(--el-border-color-light);
        background-color: var(--el-bg-color);
        padding: 0 10px !important;
        font-weight: normal;
    }
    .el-tabs__item.is-active {
        color: var(--el-color-white);
        border: 1px solid var(--el-color-primary) !important;
        background-color: var(--el-color-primary);
    }
    // .el-tabs__item.is-active::before {
    //   content: "";
    //   width: 7px;
    //   height: 7px;
    //   display: inline-block;
    //   background-color: var(--el-color-white);
    //   border: 1px solid var(--el-color-primary-light-6);
    //   border-radius: 50%;
    //   margin-right: 5px;
    // }
    .el-tabs__item:hover {
        border: 1px solid var(--el-color-primary) !important;
    }
    .el-tabs__item + .el-tabs__item {
        margin-left: 4px;
    }
}
</style>
