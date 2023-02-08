import { defineComponent } from 'vue';
import ScrollerMenu from './components/ScrollerMenu.vue';
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';
import style from './sidebar.module.scss';
import { useGlobalStore } from '@/store/global';
import { useRouteStore } from '@/store/route';
import Logo from './components/Logo.vue';
// 渲染菜单
const useRenderMenu = (routes: AuthRoute.Route[]) => {
    return routes.map((item) => {
        if (!item.children || !item.children.length) {
            return (
                <>
                    <ElMenuItem
                        index={item.path}
                        v-slots={{
                            title: () => <>{item.meta.title}</>,
                        }}
                    >
                        {item.meta.icon ? (
                            <ElIcon color="var(--color)" size={16}>
                                <svg-icon iconClass={item.meta.icon} />
                            </ElIcon>
                        ) : (
                            <span></span>
                        )}
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
                                <ElIcon color="var(--color)" size={16}>
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
                {item.children && useRenderMenu(item.children)}
            </ElSubMenu>
        );
    });
};
export default defineComponent({
    name: 'SideBar',
    components: {
        ScrollerMenu,
        Logo,
    },
    setup() {
        const gobalStore = useGlobalStore();
        const routes = useRouteStore();
        return {
            gobalStore,
            routes,
        };
    },
    render() {
        return (
            <div
                class={[
                    style.sideWrapper,
                    this.gobalStore.iScollapse
                        ? style.closeStatus
                        : style.openStatus,
                ]}
            >
                <Logo showLogo={true} showTitle={true} />
                <ScrollerMenu>
                    {{
                        default: () => <>{useRenderMenu(this.routes.menus)}</>,
                    }}
                </ScrollerMenu>
            </div>
        );
    },
});
