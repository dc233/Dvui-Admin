import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useRouteStore } from '@/store/route';
import { getToken } from '@/utils/auth';
import { whiteRoutes } from '@/utils/router';

export async function createDynamicRouteGuard(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
) {
    const route = useRouteStore();
    const isLogin = Boolean(getToken());
    // 初始化权限路由
    if (!route.isInitAuthRoute) {
        // 未登录情况下直接回到登录页，登录成功后再加载权限路由
        if (!isLogin) {
            if (whiteRoutes.includes(to.path)) {
                next();
            } else {
                next({ path: '/login', replace: true });
            }
            return false;
        }
        await route.initAuthRoute();

        if (to.name === 'NotFound') {
            // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
            // 若路由是从根路由重定向过来的，重新回到根路由
            const ROOT_ROUTE_NAME = 'root';
            const path =
                to.redirectedFrom?.name === ROOT_ROUTE_NAME ? '/' : to.fullPath;
            next({ path, replace: true, query: to.query, hash: to.hash });
            return false;
        }
    }
    return true;
}
