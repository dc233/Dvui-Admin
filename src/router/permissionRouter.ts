import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { whiteRoutes } from '@/utils/router';
import { handleAliveRoute } from '@/utils/router/cachRouter';
import { getToken } from '@/utils/auth';
import { ElNotification } from 'element-plus';
import { createDynamicRouteGuard } from './dynamic';
import NProgress from '@/library/nprogress';
//  路由守卫函数
export function createRouterGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        // NProgress 开始
        NProgress.start();
        // 动态路由
        const isLogin = Boolean(getToken());
        const permission = await createDynamicRouteGuard(to, from, next);
        if (!permission) return;
        if (to.meta?.keepAlive) {
            const newMatched = to.matched;
            handleAliveRoute(newMatched, 'add');
            // 页面整体刷新和点击标签页刷新
            if (from.name === undefined || from.name === 'Redirect') {
                handleAliveRoute(newMatched);
            }
        }
        // 判断是否存在token
        if (isLogin) {
            if (to.path === '/login') {
                next('/');
            } else {
                // 外链路由，从新标签打开，返回上一个路由
                if (to.meta.href) {
                    window.open(to.meta.href as string);
                    next({
                        path: from.fullPath,
                        replace: true,
                        query: from.query,
                    });
                    return;
                } else {
                    // 登录状态 异步请求动态路由
                    // if (!route.isInitAuthRoute) {
                    //     await route.initAuthRoute();
                    //     next(to.path);
                    // } else {
                    //     next();
                    // }
                    next();
                }
            }
        } else {
            if (whiteRoutes.includes(to.path)) {
                next();
            } else {
                next({ path: '/login', replace: true });
                return false;
            }
        }
    });
    router.afterEach((to) => {
        // 设置document title
        NProgress.done();
        useTitle(to.meta.title as string);
    });
    router.onError((error) => {
        ElNotification.error({
            title: '路由错误',
            message: error.message,
        });
    });
}
