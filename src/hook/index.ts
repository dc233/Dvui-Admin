import { ref } from 'vue';
import { useGlobalStore } from '@/store/global';
import { useDark, useToggle } from '@vueuse/core';
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
    const gobalStore = useGlobalStore();
    // 切换暗黑模式
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    function switchTheme() {
        const { value } = isDark;
        const theme = value ? 'light' : 'dark';
        toggleDark();
        gobalStore.updateTheme(theme);
        setTheme(theme);
    }
    return {
        gobalStore,
        switchTheme,
    };
}
