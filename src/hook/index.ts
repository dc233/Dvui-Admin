import { ref, watchEffect } from 'vue';
import { setTheme } from '@/utils';
// hook 改变主题颜色
export function usePrimaryColor(color: string) {
    const el = document.documentElement as HTMLElement;
    el.style.setProperty('--el-color-primary', color);
    const tempColors = color.split('#')[1];
    const r = parseInt('0x' + tempColors.slice(0, 2));
    const g = parseInt('0x' + tempColors.slice(2, 4));
    const b = parseInt('0x' + tempColors.slice(4, 6));
    for (let i = 1; i <= 9; i++) {
        el.style.setProperty(
            '--el-color-primary-light-' + i,
            `rgba(${r}, ${g}, ${b}, ${1 - i * 0.1})`,
        );
    }
    el.style.setProperty('--el-color-primary-dark-2', color);
}
/**
 * boolean组合式函数
 * @param initValue 初始值
 */
export function useBoolean(initValue = false) {
    const bool = ref(initValue);

    function setBool(value: boolean) {
        bool.value = value;
    }
    function setTrue() {
        setBool(true);
    }
    function setFalse() {
        setBool(false);
    }
    function toggle() {
        setBool(!bool.value);
    }

    return {
        bool,
        setBool,
        setTrue,
        setFalse,
        toggle,
    };
}

// hook loading
export function useLoading(initValue = false) {
    const {
        bool: loading,
        setTrue: startLoading,
        setFalse: endLoading,
    } = useBoolean(initValue);

    return {
        loading,
        startLoading,
        endLoading,
    };
}

// 改变明亮暗黑模式
export function useGlobaltheme() {
    const element = document.querySelector('html');
    function switchTheme(val: string) {
        if (val === 'auto') {
            element?.setAttribute('class', 'auto');
            setTheme(val);
        } else if (val === 'light') {
            element?.setAttribute('class', 'light');
            setTheme(val);
        } else {
            element?.setAttribute('class', 'dark');
            setTheme(val);
        }
    }
    return {
        switchTheme,
    };
}

/**
 * 监听系统主题hook函数
 */
export function useTheme() {
    // 创建媒体查询对象
    const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
    // 根据查询结果设置对应的值
    const theme = ref(themeMedia.matches ? 'light' : 'dark');
    const onChange = (e: MediaQueryListEvent) =>
        (theme.value = e.matches ? 'light' : 'dark');
    watchEffect((onCleanup) => {
        // 监听事件
        if (typeof themeMedia.addEventListener === 'function') {
            themeMedia.addEventListener('change', onChange);
        }
        // 并且在退出时取消监听
        onCleanup(() => themeMedia.removeEventListener('change', onChange));
    });
    return theme;
}
