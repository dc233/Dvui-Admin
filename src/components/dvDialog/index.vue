<script setup lang="ts">
import type { Component } from 'vue';
import { ref, computed, unref, nextTick } from 'vue';
import VuecmfDialog from '@/components/vuecmfDialog/index.vue';

export interface DvProps {
    title?: string;
    footer?: boolean;
    component?: Component;
    model_value?: boolean;
    btn_loading?: boolean;
    hook_invocations?: boolean;
}
const componentRef = ref<any>();
const emit = defineEmits([
    'formLoading',
    'cancel',
    'dialogopen',
    'dialogclose',
    'confirm',
    'update:model_value',
    'sucessFormValidation',
]);

const props = withDefaults(defineProps<DvProps>(), {
    footer: true,
    component: undefined,
    model_value: false,
    btn_loading: false,
    hook_invocations: false,
});

const handleConfirm = () => {
    // 验证表单函数
    const submit: () => Promise<any> =
        componentRef.value?.submit || (() => Promise.resolve(true));
    // 判断是否是函数式弹框
    if (props.hook_invocations) {
        submit()
            .then((data) => {
                emit('confirm', data);
                emit('formLoading', true);
                setTimeout(() => {
                    emit('update:model_value', false);
                }, 500);
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        submit()
            .then((data) => {
                // 成功后执行异步语句
                emit('sucessFormValidation', data);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const handelOpen = () => {
    emit('dialogopen');
};
const handelClose = () => {
    emit('dialogclose');
};
const editDialog = (val: object) => {
    nextTick(() => {
        componentRef.value?.editFormdata(val);
    });
};
const handleCancel = () => {
    emit('update:model_value', false);
};

const updateVisible = (val: boolean) => {
    emit('update:model_value', val);
};

defineExpose({
    editDialog,
});
</script>

<template>
    <VuecmfDialog
        v-bind="props"
        @update-visible="updateVisible"
        @close="handelClose"
        @opened="handelOpen"
    >
        <!-- dialog渲染内容 -->
        <template #content>
            <slot>
                <component
                    :is="component"
                    ref="componentRef"
                    @confirm="handleConfirm"
                    @cancel="handleCancel"
                ></component>
            </slot>
        </template>
        <!-- dialog页脚渲染 -->
        <template v-if="footer" #footer>
            <el-space wrap>
                <el-button @click="handleCancel">取消</el-button>
                <el-button
                    type="primary"
                    :loading="btn_loading"
                    @click="handleConfirm"
                    >确定</el-button
                >
            </el-space>
        </template>
    </VuecmfDialog>
</template>
