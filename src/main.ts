import { createApp } from 'vue';
import setupRouter from './router/setupRouter';
import App from './App.vue';
import { setupStore } from './store';
import SvgIcon from '@/components/svgIcon/index.vue';
import VuecmfDialog from '@/components/vuecmfDialog/index.vue';
import 'normalize.css';
import { useTable } from '@/library/vxe-table';
import './styles/index.scss';
import 'virtual:svg-icons-register';
import copy from '@/directives/copy';
async function setupApp() {
    // 创建vue实例
    const app = createApp(App);
    // 挂载piniaindex.vue
    setupStore(app);
    // 挂载vxe-table
    app.use(useTable);
    // 挂载路由
    await setupRouter(app);
    // 挂载全局组件
    app.component('SvgIcon', SvgIcon);
    app.component('VuecmfDialog', VuecmfDialog);
    // 挂载全局指令
    app.directive('copy', copy);
    // 挂载实例
    app.mount('#app');
}

setupApp();
