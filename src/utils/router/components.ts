import type { Component } from 'vue';
const Layout = () => import('@/layout/Layout.vue');
const IFrame = () => import('@/layout/frameView.vue');
const notFound = () => import('@/page/error/notFound.vue');
import { views } from '@/page';
type LayoutComponent = Record<
    EnumType.LayoutComponentName,
    () => Promise<Component>
>;

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
    const layoutComponent: LayoutComponent = {
        layout: Layout,
        iframe: IFrame,
        notfound: notFound,
    };
    return layoutComponent[layoutType];
}

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: string) {
    if (!views[routeKey]) {
        window.console.error(`路由“${routeKey}”没有对应的组件文件！`);
    }
    // console.log();
    return () =>
        setViewComponentName(views[routeKey], routeKey) as Promise<Component>;
}

/** 给页面组件设置名称 */
async function setViewComponentName(
    asyncComponent: () => Promise<Component>,
    name: string,
) {
    const component = (await asyncComponent()) as { default: Component };
    Object.assign(component.default, { name });
    return component;
}
