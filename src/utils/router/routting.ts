import { getLayoutComponent, getViewComponent } from './components';
import type { RouteRecordRaw } from 'vue-router';

type ComponentAction = Record<AuthRoute.RouteComponent, () => void>;
// 白名单路由
export const whiteRoutes: string[] = [
    '/login',
    '/reset_password',
    '/create_account',
];
// 过滤隐藏的路由
export function transforAuthhiddenRoutes(
    routes: AuthRoute.Route[],
): AuthRoute.Route[] {
    const globalMenu: AuthRoute.Route[] = [];
    routes.forEach((route) => {
        const itemRoute = { ...route } as unknown as AuthRoute.Route;
        // 剔除菜单带有权限的childern
        if (route.meta?.auth) {
            delete itemRoute.children;
            console.log(itemRoute);
        }
        if (route.children) {
            const menuChildren = transforAuthhiddenRoutes(route.children);
            itemRoute.children = menuChildren;
        }

        // 左侧菜单过滤隐藏的路由和功能按钮
        if (!hideInMenu(route) && hasComponent(route)) {
            globalMenu.push(itemRoute);
        }
    });
    return globalMenu;
}
// 将权限路由转换成vue路由
export function transformAuthRoutesToVueRoutes(routes: AuthRoute.Route[]) {
    return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

// 将单个权限的路由转换成vue路由
export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
    const resultRoute: RouteRecordRaw[] = [];

    const itemRoute = { ...item } as unknown as RouteRecordRaw;
    // 路由组件
    if (hasComponent(item)) {
        const action: ComponentAction = {
            // 全局布局组件
            layout() {
                itemRoute.component = getLayoutComponent('layout');
            },
            // iframe布局组件
            iframe() {
                itemRoute.component = getLayoutComponent('iframe');
            },
            // 二级子路由
            multi() {
                // 多级路由一定有子路由
                if (hasChildren(item)) {
                    Object.assign(itemRoute, {
                        meta: { ...itemRoute.meta, multi: true },
                    });
                    delete itemRoute.component;
                } else {
                    window.console.error('多级路由缺少子路由: ', item);
                }
            },
            // 外链
            notfound() {
                itemRoute.component = getLayoutComponent('notfound');
            },
            self() {
                itemRoute.component = getViewComponent(item.name as string);
            },
        };
        try {
            if (item.component) {
                action[item.component]();
            } else {
                window.console.error('路由组件解析失败: ', item);
            }
        } catch {
            window.console.error('路由组件解析失败: ', item);
        }
    }
    // 注意：单独路由没有children
    if (isSingleRoute(item)) {
        if (hasChildren(item)) {
            window.console.error('单独路由不应该有子路由: ', item);
        }
        const parentPath = `${itemRoute.path}-parent`;
        const parentName = `parent-${String(itemRoute.name)}`;
        const layout = getLayoutComponent('layout');
        const parentRoute = {
            path: parentPath,
            component: layout,
            name: parentName,
            redirect: item.path,
            children: [itemRoute],
        };
        return [parentRoute];
    }
    // 是否有子路由
    if (hasChildren(item)) {
        const children = (item.children as AuthRoute.Route[])
            .map((child) => transformAuthRouteToVueRoute(child))
            .flat();

        if (item.component === 'multi') {
            // 多级路由，将子路由提取出来变成同级
            resultRoute.push(...children);
            delete itemRoute.children;
        } else {
            // 判断是否有权限按钮
            if (itemRoute.meta?.auth) {
                itemRoute.meta.button = itemRoute.children;
                delete itemRoute.children;
            } else {
                itemRoute.children = children;
            }
        }
    }
    resultRoute.push(itemRoute);

    return resultRoute;
}
/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes: AuthRoute.Route[]) {
    return routes.map((route) => getConstantRouteName(route)).flat(1);
}

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route: AuthRoute.Route) {
    const names = [route.name];
    if (hasChildren(route)) {
        names.push(
            ...(route.children
                ?.map((item) => getConstantRouteName(item))
                .flat(1) ?? []),
        );
    }
    return names;
}
/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(item: AuthRoute.Route) {
    return Boolean(item.component);
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
export function hasChildren(item: AuthRoute.Route) {
    return Boolean(item.children && item.children.length);
}

/** 路由不转换菜单 */
function hideInMenu(route: AuthRoute.Route) {
    return Boolean(route?.meta?.hidden);
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(item: AuthRoute.Route) {
    return Boolean(item?.meta?.singleLayout);
}
