import { EnumStorageKey } from '@/enum';

/**
 * 缓存主题颜色
 * @param color
 */
export function setThemeColor(color: string) {
    window.localStorage.setItem(EnumStorageKey['theme-color'], color);
}

/**
 * 获取缓存的主题颜色
 */
export function getThemeColor() {
    return window.localStorage.getItem(EnumStorageKey['theme-color']);
}

/* 缓存布局模式 */
export function setThemeLayout(val: string) {
    window.localStorage.setItem(EnumStorageKey['theme-layout'], val);
}

/* 获取缓存布局模式  */
export function getThemeLayout() {
    return window.localStorage.getItem(EnumStorageKey['theme-layout']);
}

/* 缓存页面切换动画类型 */
export function setAnimateType(val: string) {
    window.localStorage.setItem(EnumStorageKey['animate-type'], val);
}

/* 获取页面切换动画  */
export function getAnimateType() {
    return window.localStorage.getItem(EnumStorageKey['animate-type']);
}

/* 缓存主题模式 */
export function setTheme(val: string) {
    window.localStorage.setItem(EnumStorageKey['theme'], val);
}

/* 获取缓存主题模式 */
export function getTheme() {
    return window.localStorage.getItem(EnumStorageKey['theme']);
}
