import { defineStore } from 'pinia';
import { deflaultSetting } from '@/setting/theme';
import { EnumThemeAnimateMode } from '@/enum';
export const useGlobalStore = defineStore({
    id: 'global',
    state: () => {
        return {
            theme: 'auto', // 主题模式
            iScollapse: false, // 折叠菜单
            showDrawer: false, // 显示隐藏设置
            menuTheme: 'light', // 菜单主题
            layoutMode: deflaultSetting.layoutMode, // 布局模式
            preferScolorScheme: '', // 用户系统默认主题颜色
            color: deflaultSetting.themeColor, // 系统默认颜色
            page: {
                animate: true,
                animateMode: deflaultSetting.animateMode,
                animateModeList: [
                    {
                        value: 'fade-slide',
                        label: EnumThemeAnimateMode['fade-slide'],
                    },
                    { value: 'fade', label: EnumThemeAnimateMode.fade },
                    {
                        value: 'fade-bottom',
                        label: EnumThemeAnimateMode['fade-bottom'],
                    },
                    {
                        value: 'fade-scale',
                        label: EnumThemeAnimateMode['fade-scale'],
                    },
                    {
                        value: 'zoom-fade',
                        label: EnumThemeAnimateMode['zoom-fade'],
                    },
                    {
                        value: 'zoom-out',
                        label: EnumThemeAnimateMode['zoom-out'],
                    },
                ],
            },
            keepAlive: false, // 标签页持久化
        };
    },
    getters: {
        pageAnimateMode(state) {
            return state.page.animate ? state.page.animateMode : undefined;
        },
    },
    actions: {
        // 切换ligth dark 主题模式
        updateTheme(val: string) {
            this.theme = val;
        },
        // 折叠收缩菜单
        updateCollapse(val: boolean) {
            this.iScollapse = val;
        },
        // 显示隐藏系统设置
        updateShowdrawer(val: boolean) {
            this.showDrawer = val;
        },
        // 切换菜单主题模式
        updateMenuTheme(val: string) {
            this.menuTheme = val;
        },
        // 切换页面布局模式
        updateLayoutmode(val: string) {
            this.layoutMode = val;
        },
        // 切换主题颜色
        updateColor(val: string) {
            this.color = val;
        },
        // 切换路由动画 打开 | 关闭
        updateAnimate(val: boolean) {
            this.page.animate = val;
        },
        // 切换路由动画方式
        updateAnimatemode(val: string) {
            this.page.animateMode = val;
        },
        // 切换页面缓存 打开 | 关闭
        uodataCachepage(val: boolean) {
            this.keepAlive = val;
        },
        // 监听用户系统默认设置的主题 windows mac
        uopataPrefersColorScheme(val: string) {
            this.preferScolorScheme = val;
        },
    },
});
