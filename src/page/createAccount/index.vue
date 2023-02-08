<template>
    <TransverseView title="注册新账号">
        <div style="height: 500px">
            <el-steps :active="stepActive" simple finish-status="success">
                <el-step title="基础信息" />
                <el-step title="信息信息" />
                <el-step title="完成注册" />
            </el-steps>
            <el-form
                v-if="stepActive == 0"
                ref="stepForm_0"
                :model="form"
                :rules="rules"
                :label-width="120"
            >
                <el-form-item label="登录账号" prop="user">
                    <el-input
                        v-model="form.user"
                        placeholder="请输入登录账号"
                    ></el-input>
                    <div class="el-form-item-msg">
                        登录账号将作为登录时的唯一凭证
                    </div>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input
                        v-model="form.password"
                        show-password
                        placeholder="请输入登录密码"
                    ></el-input>
                    <dvPasswordStrength
                        v-model="form.password"
                    ></dvPasswordStrength>
                    <div class="el-form-item-msg">
                        请输入包含英文、数字的8位以上密码
                    </div>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input
                        v-model="form.password2"
                        show-password
                        placeholder="请再一次输入登录密码"
                    ></el-input>
                </el-form-item>
                <el-form-item label="" prop="agree">
                    <el-checkbox v-model="form.agree" label=""
                        >已阅读并同意</el-checkbox
                    ><span class="link">《平台服务协议》</span>
                </el-form-item>
            </el-form>
            <el-form
                v-if="stepActive == 1"
                ref="stepForm_1"
                :model="form"
                :rules="rules"
                :label-width="120"
            >
                <el-form-item label="真实姓名" prop="userName">
                    <el-input
                        v-model="form.userName"
                        placeholder="请输入真实姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input
                        v-model="form.email"
                        placeholder="请输入邮箱地址"
                    ></el-input>
                </el-form-item>
                <el-form-item label="账号类型" prop="userType">
                    <el-radio-group v-model="form.userType">
                        <el-radio-button label="1">企业开发者</el-radio-button>
                        <el-radio-button label="2">企业开发者</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开通类别" prop="open">
                    <el-checkbox-group v-model="form.open">
                        <el-checkbox label="1">云存储API</el-checkbox>
                        <el-checkbox label="2">云检索API</el-checkbox>
                        <el-checkbox label="3">Javescript API</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div v-if="stepActive == 2">
                <el-result
                    icon="success"
                    title="注册成功"
                    sub-title="可以使用登录账号以及手机号登录系统"
                >
                    <template #extra>
                        <el-button type="primary" @click="goLogin"
                            >前去登录</el-button
                        >
                    </template>
                </el-result>
            </div>
            <el-form style="text-align: center">
                <el-button v-if="stepActive > 0 && stepActive < 2" @click="pre"
                    >上一步</el-button
                >
                <el-button
                    v-if="stepActive < 1"
                    type="primary"
                    @click="next(stepForm_0)"
                    >下一步</el-button
                >
                <el-button
                    v-if="stepActive == 1"
                    type="primary"
                    @click="save(stepForm_1)"
                    >提交</el-button
                >
            </el-form>
        </div>
    </TransverseView>
</template>

<script setup lang="ts" name="createAccount">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import TransverseView from '@/layout/transverseView.vue';
import { useRouter } from 'vue-router';
import dvPasswordStrength from '@/components/passwordStrength/index.vue';
const router = useRouter();
const stepActive = ref(0);
const stepForm_0 = ref<FormInstance>();
const stepForm_1 = ref<FormInstance>();
const form = reactive({
    user: '',
    password: '',
    password2: '',
    agree: false,
    userName: '',
    email: '',
    userType: '1',
    open: [],
});
const rules = reactive<FormRules>({
    user: [{ required: true, message: '请输入账号名' }],
    password: [{ required: true, message: '请输入密码' }],
    password2: [
        { required: true, message: '请再次输入密码' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            },
        },
    ],
    agree: [
        {
            validator: (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请阅读并同意协议'));
                } else {
                    callback();
                }
            },
        },
    ],
    userName: [{ required: true, message: '请输入真实姓名' }],
    email: [{ required: true, message: '请输入邮箱地址' }],
    userType: [{ required: true, message: '请选择账户类型' }],
    open: [{ required: true, message: '请选择开通类别' }],
});

const pre = () => {
    stepActive.value -= 1;
};
const next = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            stepActive.value += 1;
        } else {
            return false;
        }
    });
};
const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            stepActive.value += 1;
        } else {
            return false;
        }
    });
};
const goLogin = () => {
    router.push({ path: '/login' });
};
</script>
