import { defineStore } from 'pinia';
import { fetchLogin } from '@/api/login';
import { router } from '@/router/index';
import { ElMessage } from 'element-plus';
import {
    getToken,
    setToken,
    removeToken,
    setUserInfo,
    getUserInfo,
    removeUserInfo,
    clearSession,
    clearLocal,
} from '@/utils';
import { useRouteStore } from './route';
interface userState {
    /**  用户token */
    token: string;
    /** 用户信息 */
    userinfo: any;
    /** 登录的加载状态 */
    loginLoading: boolean;
}
export const userStore = defineStore('user-store', {
    state: (): userState => {
        return {
            token: getToken(),
            userinfo: getUserInfo(),
            loginLoading: false,
        };
    },
    getters: {
        /** 是否登录 */
        isLogin(state) {
            return Boolean(state.token);
        },
    },
    actions: {
        // 登录
        async login(value: { userName: string; password: string }) {
            this.loginLoading = true;
            const { data } = await fetchLogin(value);
            if (data) {
                setToken(data.userInfo.token);
                this.token = data.userInfo.token;
                setUserInfo(data.userInfo);
                this.userinfo = data.userInfo;
                router.push('/');
                ElMessage.success(`欢迎回来，${data.userInfo.username}`);
                this.loginLoading = false;
            } else {
                this.loginLoading = false;
            }
        },
        // 退出登录
        async loginout() {
            const routes = useRouteStore();
            removeToken(); // 清除token
            removeUserInfo(); // 清除用户信息
            clearSession(); // 清除seesion记录
            routes.resetRouteStore(); // 清除路由store
            this.resetUserstore();
            router.push('/login');
        },
        // 重置user的状态
        resetUserstore() {
            this.$reset();
        },
        // 重置用户所有缓存信息
        resetUserinfo() {
            const routes = useRouteStore();
            clearLocal();
            clearSession();
            routes.resetRouteStore(); // 清除路由store
            this.$reset();
            location.reload(true); // 强迫浏览器刷新从服务端拉取最新的页面
        },
    },
});
