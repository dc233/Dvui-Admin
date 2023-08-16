<template>
    <div class="logincontainer">
        <div class="login-left">
            <div class="login-title">
                <div class="logintext-h">
                    <svg-icon icon-class="vue" />
                    <div>DVUI</div>
                </div>
                <div class="loginetext-f">开箱即用的中后台管理系统</div>
                <div class="logintext-b">
                    基于Vue3 + Element-Plus + vite3 的中后台前端解决方案
                </div>

                <div class="carousel">
                    <el-carousel height="440px" :autoplay="false">
                        <el-carousel-item>
                            <div class="carousel-text">
                                <h3>开箱即用的高质量模板</h3>
                                <p>丰富的的页面模板，覆盖大多数典型业务场景</p>
                                <img
                                    src="../../assets/img/experience.svg"
                                    alt=""
                                />
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="carousel-text">
                                <h3>内置了常见问题的解决方案</h3>
                                <p>路由配置，状态管理应有尽有</p>
                                <img
                                    src="../../assets/img/innovative.svg"
                                    alt=""
                                />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </div>
        <div class="login-rigth">
            <div class="login-config">
                <el-space wrap>
                    <el-dropdown>
                        <el-button circle>
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="text" />
                            </el-icon>
                        </el-button>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>简体中文</el-dropdown-item>
                                <el-dropdown-item>Englinsh</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-space>
            </div>
            <div class="form-layout">
                <img
                    src="../../assets/img/logo.png"
                    width="100"
                    height="100"
                    alt=""
                />
                <h2>账号登录</h2>
                <el-form ref="ruleFormRef" :model="form" :rules="rules">
                    <el-form-item prop="userName">
                        <el-input v-model="form.userName" placeholder="用户名">
                            <template #prefix>
                                <el-icon :size="15">
                                    <svg-icon icon-class="user" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            v-model="form.password"
                            type="password"
                            placeholder="密码"
                            show-password
                        >
                            <template #prefix>
                                <el-icon :size="15">
                                    <svg-icon icon-class="lock" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <div>
                        <div
                            class="flex flex-justify-between flex-items-center p-b-10px"
                        >
                            <el-checkbox label="24小时免登录" size="large" />
                            <router-link
                                v-slot="{ navigate }"
                                to="/reset_password"
                                custom
                            >
                                <el-link
                                    :underline="false"
                                    type="primary"
                                    @click="navigate"
                                    >忘记密码</el-link
                                >
                            </router-link>
                        </div>
                    </div>
                    <el-form-item>
                        <el-button
                            style="width: 100%; color: #fff"
                            type="primary"
                            :loading="user.loginLoading"
                            @click="submitForm(ruleFormRef)"
                            >登录</el-button
                        >
                    </el-form-item>
                    <el-form-item>
                        <div class="flex flex-justify-start flex-items-center">
                            还没有账号？
                            <router-link
                                v-slot="{ navigate }"
                                to="/create_account"
                                custom
                            >
                                <el-link
                                    :underline="false"
                                    type="primary"
                                    @click="navigate"
                                    >创建账号</el-link
                                >
                            </router-link>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { userStore } from '@/store/user';
const user = userStore();

const form = reactive({
    userName: 'admin',
    password: '123456',
});

const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid) => {
        if (valid) {
            user.login(form);
        }
    });
};
</script>

<style lang="scss" scoped>
.logincontainer {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: var(--el-bg-color);
    .login-left {
        width: 30%;
        background: linear-gradient(163deg, #294c70, #409eff);
        .login-title {
            padding: 20px;
            .logintext-h {
                display: flex;
                align-items: center;
                color: #fff;
                font-size: 36px;
                font-weight: bold;
                div {
                    padding-left: 10px;
                }
            }
            .loginetext-f {
                padding-top: 20px;
                font-size: 20px;
                color: #fff;
            }
            .logintext-b {
                padding-top: 20px;
                font-size: 18px;
                color: #d8d8d8;
            }
        }
    }
    .login-rigth {
        flex: 1;
        margin: auto;
        .login-config {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .form-layout {
            width: 360px;
            text-align: center;
            margin: auto;
            h2 {
                padding-bottom: 20px;
                color: var(--el-text-color-regular);
            }
        }
    }
    .carousel {
        padding-top: 30%;
    }
    .carousel-text {
        width: 100%;
        text-align: center;
        color: #fff;
        img {
            padding-top: 80px;
            width: 300px;
            height: auto;
        }
    }
}
</style>
