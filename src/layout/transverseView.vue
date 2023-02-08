<template>
    <el-container>
        <el-header class="dv-header" style="height: 50px">
            <div class="common-header-left">
                <div class="common-header-logo">
                    <img :alt="porps.name" src="@image/logo.png" />
                    <label>{{ porps.name }}</label>
                </div>
                <div class="common-header-title">{{ title }}</div>
            </div>
            <div class="common-header-right">
                <router-link v-slot="{ navigate }" to="/login" custom>
                    <el-link :underline="false" @click="navigate"
                        >返回登录</el-link
                    >
                </router-link>
            </div>
        </el-header>
        <el-main>
            <div class="common-container">
                <h2 class="common-title">{{ porps.title }}</h2>
                <div class="common-main">
                    <slot></slot>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts" name="TransverseView">
const porps = withDefaults(
    defineProps<{
        title: string;
        name?: string;
    }>(),
    {
        title: '',
        name: import.meta.env.VITE_APP_NAME,
    },
);
</script>
<style lang="scss">
.dv-header {
    display: flex;
    align-items: center;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 13px 15px;
    justify-content: space-between;
}
.common-header-left,
.common-header-logo {
    display: flex;
    align-items: center;
}
.common-header-logo {
    img {
        height: 30px;
        margin-right: 10px;
        vertical-align: bottom;
    }
    label {
        font-size: 20px;
    }
}
.common-header-title {
    font-size: 16px;
    border-left: 1px solid var(--el-border-color-light);
    margin-left: 15px;
    padding-left: 15px;
}
.common-header-right {
    display: flex;
    align-items: center;
}
.common-title {
    font-size: 26px;
    margin-bottom: 20px;
    font-weight: 400;
}
.common-container {
    max-width: 1240px;
    margin: 30px auto 30px auto;
}
.common-main {
    padding: 20px;
    border-radius: var(--el-border-radius-base);
    border: 1px solid var(--el-border-color);
    background-color: var(--el-bg-color);
    overflow: hidden;
    color: var(--el-text-color-primary);
    transition: var(--el-transition-duration);
    .el-form {
        width: 500px;
        margin: 30px auto;
    }
    .el-form-item-msg {
        font-size: 12px;
        color: #999;
        clear: both;
        width: 100%;
    }
    .yzm {
        display: flex;
        width: 100%;
        .el-button {
            margin-left: 10px;
        }
    }
}
</style>
