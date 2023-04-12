import { defineStore } from 'pinia';
import { staticRoutes } from '@/router/routes';
import { router } from '@/router';
import { routes } from '@/router/routes';
import { RouteRecordName } from 'vue-router';
import {
    transformAuthRoutesToVueRoutes,
    transforAuthhiddenRoutes,
    getConstantRouteNames,
} from '@/utils/router';
interface RouteState {
    authRouteMode: string;
    /** 是否初始化了权限路由 */
    isInitAuthRoute: boolean;
    /** 菜单 */
    menus: AuthRoute.Route[];
    // 缓存页面keepAlive
    cachePageList: RouteRecordName[];
}

type cacheType = {
    mode: string;
    name?: RouteRecordName;
};
export const useRouteStore = defineStore('route-store', {
    state: (): RouteState => {
        return {
            authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
            isInitAuthRoute: false,
            menus: [],
            cachePageList: [],
        };
    },
    actions: {
        /**处理权限路由 */
        handleAuthRoutes(routes: AuthRoute.Route[]) {
            this.menus = transforAuthhiddenRoutes(routes);
            const vueRoutes = transformAuthRoutesToVueRoutes(routes);
            console.log(routes);
            console.log(vueRoutes);
            vueRoutes.forEach((route) => {
                router.addRoute(route);
            });
        },
        /** 初始化动态路由 */
        async initDynamicRoute() {},
        /** 初始化静态路由 */
        async initStaticRoute() {
            this.handleAuthRoutes(staticRoutes);
        },
        /** 初始化权限路由 */
        async initAuthRoute() {
            const isDynamicRoute = this.authRouteMode === 'dynamic';
            if (isDynamicRoute) {
                await this.initDynamicRoute();
            } else {
                await this.initStaticRoute();
            }
            this.isInitAuthRoute = true;
        },
        // 动态缓存路由
        cacheOperate({ mode, name }: cacheType) {
            switch (mode) {
                case 'add':
                    this.cachePageList.push(name as RouteRecordName);
                    this.cachePageList = [...new Set(this.cachePageList)];
                    break;
                case 'delete':
                    const delIndex = this.cachePageList.findIndex(
                        (v) => v === name,
                    );
                    delIndex !== -1 && this.cachePageList.splice(delIndex, 1);
                    break;
            }
        },
        /**
         * 是否是固定路由
         * @param name 路由名称
         */
        isConstantRoute(name: AuthRoute.RouteKey) {
            const constantRouteNames = getConstantRouteNames(
                routes as AuthRoute.Route[],
            );
            return constantRouteNames.includes(name);
        },
        /** 重置路由数据，保留固定路由 */
        resetRoutes() {
            const allroutes = router.getRoutes();
            allroutes.forEach((route) => {
                const name: AuthRoute.RouteKey = (route.name ||
                    'root') as AuthRoute.RouteKey;
                if (!this.isConstantRoute(name)) {
                    router.removeRoute(name);
                }
            });
        },
        /** 重置路由的store */
        resetRouteStore() {
            this.resetRoutes();
            this.$reset();
        },
    },
});
