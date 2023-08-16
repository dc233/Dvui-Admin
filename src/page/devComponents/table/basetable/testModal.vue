<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
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
 * CRUD表单组件一定要暴露的方法
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
