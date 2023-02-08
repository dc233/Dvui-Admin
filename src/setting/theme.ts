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
    '#AF52DE',
    '#0096c7',
    '#00C1D4',
    '#34C759',
    '#43a047',
    '#7cb342',
    '#c0ca33',
    '#78DEC7',
    '#e53935',
    '#d81b60',
    '#f4511e',
    '#fb8c00',
    '#ffb300',
    '#fdd835',
    '#6d4c41',
    '#546e7a',
];

export const deflaultSetting = {
    theme: getTheme() || 'light',
    layoutMode: getThemeLayout() || 'lcr', // 左右模式 ltr  上下模式 ttb  分栏模式 lcr
    themeColor: getThemeColor() || themeColorList[1],
    animateMode: getAnimateType() || 'fade-slide',
};
