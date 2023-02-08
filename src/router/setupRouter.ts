import type { App } from 'vue';
import { router } from './index';
import { createRouterGuard } from './permissionRouter';

// [安装vue路由]
export default async function setupRouter(app: App) {
    app.use(router);
    createRouterGuard(router);
    await router.isReady();
}
