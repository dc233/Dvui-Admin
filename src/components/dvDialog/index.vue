<script setup lang="ts">
import type { Component } from 'vue';
import { ref, computed, unref } from 'vue';
import VuecmfDialog from '@/components/vuecmfDialog/index.vue';

export interface DvProps {
    title?: string;
    footer?: boolean;
    component?: Component;
    model_value?: boolean;
}
const componentRef = ref<any>();
const emit = defineEmits(['cancel', 'confirm', 'update:model_value']);

const props = withDefaults(defineProps<DvProps>(), {
    footer: true,
    component: undefined,
    model_value: false,
});
// const localProps = computed(() => {
//     return {
//         title: props.title,
//         model_value: unref(props.model_value),
//         onCancel: handleCancel,
//     };
// });
const handleConfirm = () => {
    const submit: () => Promise<any> =
        componentRef.value?.submit || (() => Promise.resolve(true));
    submit().then((data) => emit('confirm', data));
};

const handleCancel = () => {
    emit('update:model_value', false);
};

const updateVisible = (val: boolean) => {
    emit('update:model_value', val);
};
</script>

<template>
    <VuecmfDialog v-bind="props" @update-visible="updateVisible">
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
        <template #footer>
            <el-space wrap>
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" click="handleConfirm">确定</el-button>
            </el-space>
        </template>
    </VuecmfDialog>
</template>
