import DvDialog from '@/components/dvDialog/index.vue';
import { type Component } from 'vue';
import { ref, h, render } from 'vue';
/**
 * 函数式dialog
 * params  参数参考element-plus Dialog Attributes
 * 可自定义扩展其它方法和属性
 */
interface ICreateOptions {
    width?: string;
    title?: string;
    footer?: boolean;
    onConfirm?: (data: any) => void;
    onDialogopen?: () => void;
    defaultOpen?: boolean;
    component: Component;
}

export default () => {
    function createDialog(options?: ICreateOptions) {
        const container = document.createElement('div');
        document.body.appendChild(container);

        const openValue = ref(options?.defaultOpen ?? true);
        const btnLoading = ref(false);
        const close = () => {
            render(null, container);
            document.body.removeChild(container);
        };

        const closeHandler = (val: boolean) => {
            if (vNode.component) {
                vNode.component.props.model_value = val;
            }
        };

        const btnHandler = (val: boolean) => {
            if (vNode.component) {
                vNode.component.props.btn_loading = val;
            }
        };
        const vNode = h(DvDialog, {
            ...options,
            model_value: openValue.value,
            btn_loading: btnLoading.value,
            'onUpdate:model_value': closeHandler,
            onFormLoading: btnHandler,
            hook_invocations: true,
            onDialogclose: close,
        });
        render(vNode, container);
    }

    return {
        createDialog,
    };
};
