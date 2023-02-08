/** 权限路由相关类型 */
declare namespace AuthRoute {
    type RouteComponent = 'layout' | 'iframe' | 'self' | 'notfound' | 'multi';
    /* 固定路由的key */
    type RouteKey =
        | 'root'
        | 'Login'
        | 'parantRedirect'
        | 'Redirect'
        | 'NotFound';
    interface RouteMeta {
        title?: string;
        icon?: string;
        affix?: boolean;
        hidden?: boolean;
        keepAlive?: boolean;
        requireAuth?: boolean;
        href?: string;
        frameSrc?: string;
        /** 作为单级路由的父级路由布局组件 */
        singleLayout?: string;
    }
    /** 单个路由的类型结构(动态路由模式：后端返回此类型结构的路由) */
    interface Route {
        /** 路由名称(路由唯一标识) */
        name: string;
        /** 路由路径 */
        path: string;
        /** 路由重定向 */
        redirect?: string;
        /**
         * 路由组件
         * - layout: 基础布局，具有公共部分的布局
         * - blank: 空白布局
         * - iframe: IFrame标签页面布局
         * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
         */
        component?: RouteComponent;
        /** 子路由 */
        children?: Route[];
        /** 路由描述 */
        meta: RouteMeta;
        /** 路由属性 */
        props?:
            | boolean
            | Record<string, any>
            | ((to: any) => Record<string, any>);
    }
}
