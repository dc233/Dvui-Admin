import { defineComponent, PropType, computed, onMounted } from 'vue';
import HorizontalMenu from './components/Menue.vue';
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';
import { useRouteStore } from '@/store/route';
// 渲染菜单
const useRenderMenu = (routes: AuthRoute.Route[]) => {
    return routes.map((item) => {
        if (!item.children || !item.children.length) {
            return (
                <>
                    <ElMenuItem index={item.path}>
                        {item.meta.icon ? (
                            <ElIcon color="var(--color)" size={16}>
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
    name: 'LevelSideBar',
    components: {
        HorizontalMenu,
    },
    setup() {
        const routes = useRouteStore();
        return {
            routes,
        };
    },
    render() {
        return (
            <HorizontalMenu mode="horizontal">
                {{
                    default: () => <>{useRenderMenu(this.routes.menus)}</>,
                }}
            </HorizontalMenu>
        );
    },
});
