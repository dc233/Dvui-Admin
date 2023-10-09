<template>
    <div class="content-layout">
        <el-space direction="vertical" fill wrap style="width: 100%">
            <el-card shadow="never" header="对话框示例🎉">
                <el-space wrap>
                    <el-button type="primary" @click="form.visbible = true"
                        >声明式对话框</el-button
                    >
                    <el-button type="primary" @click="devhookDialog"
                        >函数式对话框</el-button
                    >
                    <el-button type="primary" @click="devNotFooterDialog"
                        >函数式对话框无footer</el-button
                    >
                    <el-button type="primary" @click="devHookDialogtsx"
                        >函数式对话框tsx渲染内容</el-button
                    >
                    <el-button type="primary" @click="devformDialogHook"
                        >函数式带表单验证对话框</el-button
                    >
                    <el-button type="primary" @click="devPremiseeDialog"
                        >异步函数式带表单验证对话框</el-button
                    >
                </el-space>
            </el-card>
            <el-card shadow="never" header="MessageBox 消息弹框示例">
                <el-space wrap>
                    <el-button type="primary" @click="alertModal"
                        >ElMessageBox-Alert</el-button
                    >
                    <el-button type="primary" @click="confirmModal"
                        >ElMessageBox-confirm</el-button
                    >
                    <el-button type="primary" @click="iconModal"
                        >ElMessageBox自定义图标</el-button
                    >
                    <el-button type="primary" @click="vnodeModal"
                        >ElMessageBox-VNode</el-button
                    >
                    <el-button type="primary" @click="centerModal"
                        >内容居中的MessageBox框</el-button
                    >
                </el-space>
            </el-card>
        </el-space>
        <DvDialog v-model:model_value="form.visbible" title="声明式对话框">
            <div>I am declarative Dialog ✨</div>
        </DvDialog>
    </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import useDialog from '@/hook/useDialog';
import oneModal from './modalComponent/oneModal.vue';
import twoModal from './modalComponent/twoModal.vue';
import threeModal from './modalComponent//threeModal.vue';
// 二次封装的Element-plus Dialog
import DvDialog from '@/components/dvDialog/index.vue';

const { createDialog } = useDialog();

const form = ref({
    name: 'tsx',
    visbible: false,
});

// 函数式dialog
const devhookDialog = () => {
    createDialog({
        width: '600px',
        title: '函数式Dialog',
        footer: true,
        component: oneModal,
        onDialogopen() {
            ElMessage.success('打开dialog触发的回调');
        },
        onConfirm(data) {
            // 点击确认的回调函数
            console.log(data, 'oneMOdal');
        },
    });
};
// 函数式dialog无footer
const devNotFooterDialog = () => {
    createDialog({
        width: '600px',
        title: '函数式dialog无footer',
        footer: false,
        component: oneModal,
        onDialogopen() {
            ElMessage.success('打开dialog触发的回调');
        },
        onConfirm(data) {
            // 点击确认的回调函数
            console.log(data, 'oneMOdal');
        },
    });
};
// 函数式dialog tsx
const devHookDialogtsx = () => {
    createDialog({
        title: '函数式Dialog-tsx渲染内容',
        footer: true,
        component: () => {
            return (
                <div>
                    <p>我是tsx渲染出来的内容</p>
                    <el-input
                        vModel={form.value.name}
                        placeholder="请输入"
                    ></el-input>
                </div>
            );
        },
    });
};
// 函数式表单dialog
const devformDialogHook = () => {
    createDialog({
        title: '函数式表单Dialog',
        footer: true,
        component: twoModal,
        onConfirm(data) {
            console.log(data);
            ElMessage.success('提交成功');
        },
    });
};
// 异步函数式dialog
const devPremiseeDialog = () => {
    createDialog({
        title: '异步函数式表单Dialog',
        footer: true,
        component: threeModal,
        onConfirm(data) {
            console.log(data);
            ElMessage.success('提交成功');
        },
    });
};
const confirmModal = () => {
    ElMessageBox.confirm('ElMessageBox.confirm', 'warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            ElMessage({
                type: 'success',
                message: '确定回调函数',
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消回调函数',
            });
        });
};

const alertModal = () => {
    ElMessageBox.alert('ElMessageBox.alert', '标题', {
        confirmButtonText: '确定',
        callback: () => {
            ElMessage({
                type: 'success',
                message: 'ElMessageBox.alert的回调函数',
            });
        },
    });
};

const iconModal = () => {
    ElMessageBox.confirm(
        'It will permanently delete the file. Continue?',
        'Warning',
        {
            type: 'warning',
            icon: () => {
                return (
                    <el-icon size={24}>
                        <svg-icon icon-class="delete" />
                    </el-icon>
                );
            },
        },
    );
};

const vnodeModal = () => {
    ElMessageBox({
        title: 'ElMessageBox-vnode渲染',
        message: () => {
            return <div>ElMessageBox-vnode渲染内容</div>;
        },
        // message: '123123',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    })
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'ElMessageBox-vnode的回调函数',
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'ElMessageBox-vnode的回调函数',
            });
        });
};

const centerModal = () => {
    ElMessageBox.confirm(
        'proxy will permanently delete the file. Continue?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true,
        },
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            });
        });
};
</script>

<style lang="scss" scoped></style>
