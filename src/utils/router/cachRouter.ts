import { RouteRecordNormalized } from 'vue-router';
import { useRouteStore } from '@/store/route';
import { useTimeoutFn } from '@vueuse/core';
// 处理缓存路由（添加、删除、刷新）
export function handleAliveRoute(
    matched: RouteRecordNormalized[],
    mode?: string,
) {
    switch (mode) {
        case 'add':
            matched.forEach((v) => {
                useRouteStore().cacheOperate({ mode: 'add', name: v.name });
            });
            break;
        case 'delete':
            useRouteStore().cacheOperate({
                mode: 'delete',
                name: matched[matched.length - 1].name,
            });
            break;
        default:
            useRouteStore().cacheOperate({
                mode: 'delete',
                name: matched[matched.length - 1].name,
            });
            useTimeoutFn(() => {
                matched.forEach((v) => {
                    useRouteStore().cacheOperate({ mode: 'add', name: v.name });
                });
            }, 100);
    }
}
/* 批量删除缓存路由  */
export function delAliveRoutes(delAliveRouteList: RouteRecordNormalized[]) {
    delAliveRouteList.forEach((route) => {
        useRouteStore().cacheOperate({
            mode: 'delete',
            name: route?.name,
        });
    });
}
