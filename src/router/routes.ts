const Login = () => import('@/page/login/index.vue');
const ResetPassword = () => import('@/page/resetPassword/index.vue');
const CreateAccount = () => import('@/page/createAccount/index.vue');
const Layout = () => import('@/layout/Layout.vue');
const notFound = () => import('@/page/error/notFound.vue');
import type { RouteRecordRaw } from 'vue-router';

type RouteConfig = RouteRecordRaw & {
    hidden?: boolean;
    keepAlive?: boolean;
    requireAuth?: boolean;
};

// 初始化路由
export const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'root',
        redirect: '/dashboard/analysis',
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true,
        },
        component: Login,
    },
    {
        path: '/reset_password',
        name: 'reset_password',
        meta: {
            title: '重置密码',
            hidden: true,
        },
        component: ResetPassword,
    },
    {
        path: '/create_account',
        name: 'create_account',
        meta: {
            title: '注册账号',
            hidden: true,
        },
        component: CreateAccount,
    },
    {
        path: '/redirect',
        component: Layout,
        name: 'parantRedirect',
        meta: {
            title: '重定向',
            hidden: true,
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/layout/redirect.vue'),
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: notFound,
        meta: {
            title: '未找到页面',
            hidden: true,
        },
    },
];
// 静态路由
export const staticRoutes: AuthRoute.Route[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: 'layout',
        meta: {
            title: '仪表盘',
            icon: 'dashboard',
        },
        children: [
            {
                path: '/dashboard/analysis',
                name: 'dashboard_analysis',
                component: 'self',
                meta: {
                    title: '分析页',
                    icon: 'analysis',
                    affix: true,
                    keepAlive: true,
                },
            },
            {
                path: '/dashboard/workplace',
                name: 'dashboard_workplace',
                component: 'self',
                meta: {
                    title: '工作台',
                    icon: 'workbench',
                    keepAlive: true,
                },
            },
        ],
    },
    {
        path: '/document',
        name: 'document',
        component: 'layout',
        meta: {
            title: '文档',
            icon: 'notes',
        },
        children: [
            {
                path: '/document/element-plus',
                name: 'element-plus',
                component: 'iframe',
                meta: {
                    title: 'Element-plus',
                    icon: 'element-plus-logo',
                    frameSrc: 'https://element-plus.gitee.io/zh-CN/',
                },
            },
            {
                path: '/document/vue',
                name: 'vue',
                component: 'notfound',
                meta: {
                    title: 'vue3文档',
                    icon: 'vues',
                    href: 'https://cn.vuejs.org/',
                },
            },
            {
                path: '/document/vite',
                name: 'vite',
                component: 'notfound',
                meta: {
                    title: 'vite文档',
                    icon: 'vite',
                    href: 'https://cn.vitejs.dev/',
                },
            },
        ],
    },
    {
        path: '/test',
        name: 'test',
        component: 'layout',
        meta: {
            title: '测试',
            icon: 'table-file',
        },
        children: [
            {
                path: '/test/testone',
                name: 'test_testOne',
                component: 'self',
                meta: {
                    title: '测试页面一',
                    icon: 'aiming',
                },
            },
        ],
    },
    {
        path: '/devComponents',
        name: 'devComponents',
        component: 'layout',
        meta: {
            title: '组件',
            icon: 'components',
        },
        children: [
            {
                path: '/devComponents/table',
                name: 'devComponents_table',
                component: 'multi',
                redirect: '/devComponents/table/basetable',
                meta: {
                    title: '表格',
                    icon: 'table-file',
                },
                children: [
                    {
                        path: '/devComponents/table/basetable',
                        name: 'devComponents_table_basetable',
                        component: 'self',
                        meta: {
                            title: '普通表格',
                            icon: 'table-file',
                            keepAlive: false,
                        },
                    },
                    {
                        path: '/devComponents/table/advacetable',
                        name: 'devComponents_table_advacetable',
                        component: 'self',
                        meta: {
                            title: '高级表格',
                            icon: 'table-file',
                        },
                    },
                ],
            },
            {
                path: '/devComponents/modal',
                name: 'devComponents_modal',
                component: 'self',
                meta: {
                    title: '函数弹框组件',
                    icon: 'components',
                },
            },
            {
                path: '/devComponents/form',
                name: 'devComponents_form',
                component: 'multi',
                meta: {
                    title: 'Form数据录入',
                    icon: 'edit',
                },
                redirect: '/devComponents/form/imgupload',
                children: [
                    {
                        path: '/devComponents/form/imgupload',
                        name: 'devComponents_form_imgupload',
                        component: 'self',
                        meta: {
                            title: '图片上传',
                            icon: 'upload',
                        },
                    },
                ],
            },
            {
                path: '/devComponents/resizebox',
                name: 'devComponents_resizebox',
                component: 'self',
                meta: {
                    title: '伸缩框',
                    icon: 'components',
                },
            },
        ],
    },
    {
        path: '/authority',
        name: 'authority',
        component: 'layout',
        meta: {
            title: '权限管理',
            icon: 'permissions',
        },
        children: [
            {
                path: '/authority/menuAuth',
                name: 'authority_menuAuth',
                component: 'self',
                meta: {
                    title: '菜单权限',
                    icon: 'hamburger-button',
                },
            },
            {
                path: '/authority/buttonAuth',
                name: 'authority_buttonAuth',
                component: 'self',
                meta: {
                    title: '按钮权限',
                    icon: 'hamburger-button',
                },
            },
        ],
    },
    {
        name: 'about',
        path: '/about',
        component: 'self',
        meta: {
            title: '关于',
            icon: 'tips-one',
            singleLayout: 'layout',
        },
    },
];

// {
//     path: '/test',
//     name: 'test',
//     meta: { title: '测试', icon: 'aiming' },
//     component: 'layout',
//     children: [
//         {
//             path: '/test/test-1',
//             name: 'testone',
//             component: 'self',
//             meta: { title: '测试页面一', icon: 'aiming' },
//         },
//     ],
// },
// {
//     path: '/childrenroute',
//     name: 'children',
//     component: 'layout',
//     meta: { title: '多级嵌套菜单', icon: 'aiming' },
//     children: [
//         {
//             path: '/childrenroute/route1',
//             name: 'route1',
//             meta: { title: '路由一', icon: 'aiming' },
//             component: 'self',
//             children: [
//                 {
//                     path: '/childrenroute/route1/route1-1',
//                     name: 'route1-1',
//                     component: 'self',
//                     meta: { title: '路由一的子菜单1' },
//                 },
//             ],
//         },
//     ],
// },
// {
//     path: '/document',
//     name: 'document',
//     component: 'layout',
//     meta: {
//         title: '外部页面',
//         icon: 'aiming',
//     },
//     children: [
//         {
//             path: '/document/baidu',
//             name: 'baidy',
//             component: 'notfound',
//             meta: {
//                 title: '外链测试',
//                 icon: 'aiming',
//                 href: 'http://www.baidu.com',
//             },
//         },

//         {
//             path: '/document/vue',
//             name: 'vue',
//             component: 'iframe',
//             meta: {
//                 title: '内嵌vue3文档',
//                 icon: 'aiming',
//                 frameSrc: 'https://staging-cn.vuejs.org/',
//             },
//         },
//     ],
// },
