import type { App } from 'vue';
import SvgIcon from '@/components/svgIcon/index.vue';
// import VuecmfDialog from '@/components/vuecmfDialog/index.vue';
import copy from '@/directives/copy';
export default {
    install(app: App) {
        // 注册全局组件
        app.component('SvgIcon', SvgIcon);
        // app.component('VuecmfDialog', VuecmfDialog);
        // 注册全局指令
        app.directive('copy', copy);
    },
};
