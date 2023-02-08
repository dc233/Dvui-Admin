import { defineComponent, ref, watch, reactive, onMounted } from 'vue';
import ScrollerMenu from './components/ScrollerMenu.vue';
import Menue from './components/Menue.vue';
import { ElMenuItem, ElSubMenu, ElIcon, ElScrollbar } from 'element-plus';
import style from './sidebar.module.scss';
import { useGlobalStore } from '@/store/global';
import { useRoute, useRouter } from 'vue-router';
import { useRouteStore } from '@/store/route';
import logo from '@/assets/img/logo.png';
// 渲染右侧子级菜单
const rightChildrenMenu = (routes: AuthRoute.Route[]) => {
    return routes.map((item) => {
        if (!item.children || !item.children.length) {
            return (
                <>
                    <ElMenuItem index={item.path}>
                        {item.meta.icon ? (
                            <ElIcon color="var(--color)" size={18}>
                                <svg-icon iconClass={item.meta.icon} />
                            </ElIcon>
                        ) : (
                            <span></span>
                        )}
                        {item.meta.title}
                    </ElMenuItem>
                </>
            );
        }
        return (
            <ElSubMenu
                index={item.path}
                v-slots={{
                    title: () => (
                        <>
                            {item.meta.icon ? (
                                <ElIcon color="var(--color)" size={18}>
                                    <svg-icon iconClass={item.meta.icon} />
                                </ElIcon>
                            ) : (
                                <span></span>
                            )}
                            <span>{item.meta.title}</span>
                        </>
                    ),
                }}
            >
                {item.children && rightChildrenMenu(item.children)}
            </ElSubMenu>
        );
    });
};

export default defineComponent({
    name: 'TabSplitSideBar',
    components: {
        ScrollerMenu,
        Menue,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const gobalStore = useGlobalStore();
        const routes = useRouteStore();
        const activePath = ref(route.fullPath);
        const MenuTitle = ref('');
        const childrenRoutes = reactive({
            chilarr: [] as any[],
        });
        // 查找菜单的子级
        const treefindChildren = (val: any) => {
            const { path, meta } = val;
            activePath.value = path;
            MenuTitle.value = meta.title as string;
            routes.menus.forEach((item) => {
                if (item.path === path) {
                    if (item.children) {
                        childrenRoutes.chilarr = item.children;
                    } else {
                        childrenRoutes.chilarr = [];
                    }
                }
            });
        };
        // 点击父级菜单获取对应的子集菜单
        const changeTab = (val: AuthRoute.Route) => {
            console.log(val);
            findPath(val);
        };
        const findPath = (tab: AuthRoute.Route) => {
            if (tab.children) {
                // const firstItem = tab.children[0];
                // if (firstItem.children && firstItem.children.length > 0) {
                //     findPath(firstItem);
                // } else {
                //     router.push({
                //         path: firstItem.path,
                //     });
                // }
                treefindChildren(tab);
            } else {
                const { path, meta } = tab;
                activePath.value = path;
                MenuTitle.value = meta.title as string;
                childrenRoutes.chilarr = [];
                router.push({
                    path: tab.path,
                });
            }
        };
        watch(route, (val) => {
            if (val.meta.singleLayout) {
                treefindChildren(val.matched[1]);
            } else {
                treefindChildren(val.matched[0]);
            }
        });
        onMounted(() => {
            if (route.meta.singleLayout) {
                treefindChildren(route.matched[1]);
            } else {
                treefindChildren(route.matched[0]);
            }
        });
        return {
            gobalStore,
            activePath,
            childrenRoutes,
            changeTab,
            routes,
            MenuTitle,
        };
    },
    render() {
        return (
            <div
                class={[
                    style.sideWrapper,
                    this.gobalStore.iScollapse
                        ? style.closeStatus
                        : style.fllopenStatus,
                ]}
            >
                <div
                    class={[
                        style.tabSplitTabwrapper,
                        this.gobalStore.theme === 'dark'
                            ? style.darkTabSplitTabwrapper
                            : '',
                    ]}
                >
                    <div class={style.logo}>
                        <img src={logo} alt="" />
                    </div>
                    <ElScrollbar
                        class={style.scrollbar}
                        wrap-class="scrollbar-wrap-class"
                    >
                        <div class={style.tabSplitContentWrapper}>
                            {this.routes.menus.map((item: AuthRoute.Route) => {
                                return (
                                    <div
                                        class={[
                                            style.labelItemwrapper,
                                            item.path == this.activePath
                                                ? style.laberactive
                                                : 'nullactive',
                                        ]}
                                        onClick={() => this.changeTab(item)}
                                    >
                                        <ElIcon color="var(--color)" size={16}>
                                            <svg-icon
                                                iconClass={
                                                    item.meta.icon
                                                        ? item.meta.icon
                                                        : 'setting'
                                                }
                                            />
                                        </ElIcon>
                                        <span class={style.laber}>
                                            {item.meta
                                                ? item.meta.title
                                                : item.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </ElScrollbar>
                </div>
                <div class={style.tabSplitMenuWrapper}>
                    <div class={style.title}>{this.MenuTitle}</div>
                    <Menue>
                        {{
                            default: () => (
                                <>
                                    {rightChildrenMenu(
                                        this.childrenRoutes.chilarr,
                                    )}
                                </>
                            ),
                        }}
                    </Menue>
                </div>
            </div>
        );
    },
});
