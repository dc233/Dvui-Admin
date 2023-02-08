import { EnumStorageKey } from '@/enum';

import { getLocal, removeLocal, setLocal } from '../storage';
interface AuthUserinfo {
    [propName: string]: any;
}
// 设置token
export function setToken(token: string) {
    setLocal(EnumStorageKey.token, token);
}

/** 获取token */
export function getToken() {
    return getLocal<string>(EnumStorageKey.token) || '';
}

/** 去除token */
export function removeToken() {
    removeLocal(EnumStorageKey.token);
}

/* 获取用户信息 */
export function getUserInfo() {
    const emptyInfo: AuthUserinfo = {
        token: '',
        username: '',
    };
    const userInfo: AuthUserinfo =
        getLocal<AuthUserinfo>(EnumStorageKey['user-info']) || emptyInfo;
    return userInfo;
}

/** 设置用户信息 */
export function setUserInfo(userInfo: AuthUserinfo) {
    setLocal(EnumStorageKey['user-info'], userInfo);
}

/** 去除用户信息 */
export function removeUserInfo() {
    removeLocal(EnumStorageKey['user-info']);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
    removeToken();
    removeUserInfo();
}
