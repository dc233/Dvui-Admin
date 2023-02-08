import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from 'vue-router';
import { routes } from './routes';

// 创建vue-router的实例
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [...routes],
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            if (savedPosition) {
                return savedPosition;
            } else {
                if (from.meta.saveSrollTop) {
                    const top: number =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop;
                    resolve({ left: 0, top });
                }
            }
        });
    },
});
