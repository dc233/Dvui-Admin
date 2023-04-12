import {
    getThemeColor,
    getThemeLayout,
    getAnimateType,
    getTheme,
} from '@/utils';
export const themeColorList = [
    '#1890ff',
    '#409EFF',
    '#2d8cf0',
    '#007AFF',
    '#5ac8fa',
    '#5856D6',
    '#536dfe',
    '#9c27b0',
];

export const deflaultSetting = {
    theme: getTheme() || 'light',
    layoutMode: getThemeLayout() || 'lcr', // 左右模式 ltr  上下模式 ttb  分栏模式 lcr
    themeColor: getThemeColor() || themeColorList[1],
    animateMode: getAnimateType() || 'fade-slide',
};
