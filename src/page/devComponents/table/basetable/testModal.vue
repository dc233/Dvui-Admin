<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
// import { fetchGetStatus } from '@/api/login';
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    name: '',
});
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
        },
    ],
});
/**
 * 表单中的数据有时候需要从后端返回，可直接在onMounted周期中调取异步接口
 * 对于频繁需要用到数据接口可直接封装在hook函数里方便其它组件调用
 */
onMounted(() => {
    console.log('我是表单组件中的生命周期');
});
/**
 * CRUD表单组件一定要暴露的方法
 * HookDailog 表单验证暴露方法
 */
defineExpose({
    async submit() {
        return ruleFormRef.value
            .validate()
            .then(() => Promise.resolve(ruleForm));
    },
    editFormdata(value: object) {
        Object.assign(ruleForm, value);
    },
});
</script>
