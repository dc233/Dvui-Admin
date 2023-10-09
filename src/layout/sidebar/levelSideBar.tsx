import { defineComponent } from 'vue';
import HorizontalMenu from './components/Menue.vue';
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';
import { useRouteStore } from '@/store/route';
import style from './sidebar.module.scss';
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
                        {item.meta.tag ? (
                            <span class={style.menuTag}>{item.meta.tag}</span>
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
                            {item.meta.tag ? (
                                <span class={style.menuTag}>
                                    {item.meta.tag}
                                </span>
                            ) : (
                                <span></span>
                            )}
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
