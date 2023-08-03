import { createApp } from 'vue';
import setupRouter from './router/setupRouter';
import App from './App.vue';
import { setupStore } from './store';
import 'normalize.css';
import './styles/index.scss';
import 'virtual:svg-icons-register';
import 'virtual:uno.css'; // 原子化CSS
import dvui from './dvui';

async function setupApp() {
    // 创建vue实例
    const app = createApp(App);
    // 挂载pinia
    setupStore(app);
    // 挂载路由
    await setupRouter(app);
    // 注册全局组件 ||指令
    app.use(dvui);
    // 挂载实例
    app.mount('#app');
}

setupApp();
