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
        <transition name="el-zoom-in-top">
            <ul
                v-show="showContextMenu"
                class="contex-menu-wrapper"
                :style="contextMenuStyle"
            >
                <li @click="refreshRoute">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="margin-right: 4px"
                    >
                        <svg-icon icon-class="refresh" />
                    </el-icon>
                    刷新页面
                </li>
                <hr />
                <li @click="currentRouter">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="margin-right: 4px"
                    >
                        <svg-icon icon-class="close-small" />
                    </el-icon>
                    关闭当前
                </li>
                <hr />
                <li @click="closeLeft">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="margin-right: 4px"
                    >
                        <svg-icon icon-class="to-left" />
                    </el-icon>
                    关闭左侧
                </li>
                <hr />
                <li @click="closeRight">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="margin-right: 4px"
                    >
                        <svg-icon icon-class="to-right" />
                    </el-icon>
                    关闭右侧
                </li>
                <hr />
                <li @click="closeAll">
                    <el-icon
                        color="var(--color)"
                        :size="14"
                        style="margin-right: 4px"
                    >
                        <svg-icon icon-class="close-one" />
                    </el-icon>
                    关闭所有
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts" name="Tabs">
import { useRoute, useRouter } from 'vue-router';
import type { LocationQueryRaw, RouteRecordNormalized } from 'vue-router';
import { useBasicLayout } from '@/composables/layouts';
import { ref, watch, reactive, unref } from 'vue';
import qs from 'qs';
import { handleAliveRoute, delAliveRoutes } from '@/utils/router/cachRouter';
import { setSession, getSession } from '@/utils/storage';
import { TabsPaneContext } from 'element-plus';
const { activePadding } = useBasicLayout();
type meatprops = {
    name: string;
    title: string;
    icon: string;
    affix: boolean;
    keepAlive: boolean;
};
interface TabsRouter extends Partial<Omit<RouteRecordNormalized, 'meta'>> {
    fullPath: string;
    meta: meatprops;
    name: string;
}
const route = useRoute();
const router = useRouter();
const currentTab = ref(route.fullPath);
const tabsRoutes = ref((getSession('__tabsroute__') as TabsRouter[]) || []);
const selectRoute = ref();
const showContextMenu = ref(false);
const contextMenuStyle = reactive({
    left: '0px',
    top: '0px',
});
// tab栏排除的路由菜单
const excludeRouter = ['Redirect', 'Login'];
// 点击tab跳转路由
const clickTab = (tabval: TabsPaneContext) => {
    const query = (tabval.props?.name as string).split('?')[1];
    router.push({
        path: tabval.props.name as string,
        query: qs.parse(query) as LocationQueryRaw,
    });
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
        handleAliveRoute(currentItem as RouteRecordNormalized[], 'delete');
        if (currentTab.value === name) {
            currentTab.value =
                tabsRoutes.value[tabsRoutes.value.length - 1].fullPath;
            router.push(currentTab.value);
        }
    }
};

// 右键扩展菜单
const onContextMenu = (item: string, ctx: MouseEvent) => {
    const { clientX } = ctx;
    const { x } = document
        ?.querySelector('.tabs-layout')
        ?.getBoundingClientRect() as DOMRect;
    const parentElementRect = document
        ?.getElementById('tagViewTab')
        ?.getElementsByClassName('el-tabs__nav is-top')[0]
        ?.getBoundingClientRect() as DOMRect;

    if (clientX < parentElementRect.x) return;
    if (clientX > parentElementRect.x + parentElementRect.width) return;
    selectRoute.value = null;
    selectRoute.value = tabsRoutes.value.find((it) => {
        const { x, width } = document
            ?.getElementById('tab-' + it.fullPath)
            ?.getBoundingClientRect() as DOMRect;
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

const isAffix = (itemroute: TabsRouter) => {
    return itemroute.meta && itemroute.meta.affix;
};

// 监听路由存储菜单
const savetabsRoutes = (val: TabsRouter) => {
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
    delAliveRoutes(routes as RouteRecordNormalized[]);
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
    delAliveRoutes(routes as RouteRecordNormalized[]);
    batchClosetag(findItem + 1, tabsRoutes.value.length);
};
// 关闭所有路由
const closeAll = () => {
    const currentRoute = tabsRoutes.value.find((route) => route.meta.affix);
    const routes = tabsRoutes.value.slice(1, tabsRoutes.value.length);
    console.log(currentRoute);
    if (routes.length === 0) return;
    if (!currentRoute) return;
    delAliveRoutes(routes as RouteRecordNormalized[]);
    batchClosetag(1, tabsRoutes.value.length);
    currentTab.value = currentRoute.fullPath;
    router.push(currentTab.value);
};
// 批量关闭Tag
const batchClosetag = (startIndex: number, legnth: number) => {
    tabsRoutes.value.splice(startIndex, legnth);
};
watch(
    () => route,
    (val) => {
        const { fullPath, meta, name } = val;
        console.log(val);
        //  排除tab栏不需要的路由
        if (excludeRouter.includes(name)) return;
        currentTab.value = fullPath;
        savetabsRoutes({
            fullPath: fullPath,
            meta: meta as meatprops,
            name: name as string,
        });
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
        // 判断tabs标签缓存
        console.log(val);
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
    // background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
    // background-size: 4px 4px;
    // backdrop-filter: saturate(50%) blur(4px);
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
    hr {
        // margin:5px 0;
        border: none;
        height: 1px;
        font-size: 0px;
        background-color: var(--el-border-color-light);
    }
    li {
        display: flex;
        align-items: center;
        margin: 0;
        cursor: pointer;
        line-height: 30px;
        padding: 0 17px;
        color: #606266;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        &:hover {
            background-color: #ecf5ff;
            color: var(--el-color-primary);
        }
    }
}
::v-deep(.el-tabs--card > .el-tabs__header) {
    border: none;
    margin: 0;
    padding: 0 10px;
    .el-tabs__nav-wrap {
        line-height: 27px;
        top: 3px;
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
