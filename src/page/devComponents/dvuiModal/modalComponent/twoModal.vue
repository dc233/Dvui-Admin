<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
    >
        <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Activity zone" prop="region">
            <el-select
                v-model="ruleForm.region"
                placeholder="please select your zone"
            >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
// import { fetchGetStatus } from '@/api/login';
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    name: '',
    region: '',
});
const rules = reactive<FormRules>({
    name: [
        {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
        },
    ],
    region: [
        {
            required: true,
            message: '请输入地址',
            trigger: 'change',
        },
    ],
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

onMounted(() => {
    console.log('hookDialog表单组件中的生命周期');
});
</script>
