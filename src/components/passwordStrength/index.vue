<!--
 * @Descripttion: 密码强度检测
 * @version: 1.0
 * @Author: Dingcong
 * @Date: 2022年11月4日14:42:01
 * @LastEditors:
 * @LastEditTime:
-->

<template>
    <div class="dv-password-strength">
        <div
            class="dv-password-strength-bar"
            :class="`dv-password-strength-level-${level}`"
        ></div>
    </div>
</template>

<script setup lang="ts" name="PasswordStrength">
import { ref, watch, onMounted } from 'vue';
const porps = withDefaults(
    defineProps<{
        modelValue?: string;
    }>(),
    {
        modelValue: '',
    },
);
const level = ref(0);

watch(
    () => porps.modelValue,
    (val) => {
        strength(val);
    },
);

onMounted(() => {
    console.log('ok');
    strength(porps.modelValue);
});
const strength = (v) => {
    var _level = 0;
    //长度
    var has_length = v.length >= 6;
    //包含数字
    var has_number = /\d/.test(v);
    //包含小写英文
    var has_lovercase = /[a-z]/.test(v);
    //包含大写英文
    var has_uppercase = /[A-Z]/.test(v);
    //没有连续的字符3位
    var no_continuity = !/(\w)\1{2}/.test(v);
    //包含特殊字符
    var has_special = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/.test(v);
    if (v.length <= 0) {
        _level = 0;
        level.value = _level;
        return false;
    }
    if (!has_length) {
        _level = 1;
        level.value = _level;
        return false;
    }
    if (has_number) {
        _level += 1;
    }
    if (has_lovercase) {
        _level += 1;
    }
    if (has_uppercase) {
        _level += 1;
    }
    if (no_continuity) {
        _level += 1;
    }
    if (has_special) {
        _level += 1;
    }
    level.value = _level;
};
</script>

<style scoped>
.dv-password-strength {
    height: 5px;
    width: 100%;
    background: var(--el-color-info-light-5);
    border-radius: 5px;
    position: relative;
    margin: 10px 0;
}
.dv-password-strength:before {
    left: 20%;
}
.dv-password-strength:after {
    right: 20%;
}
.dv-password-strength:before,
.dv-password-strength:after {
    position: absolute;
    content: '';
    display: block;
    width: 20%;
    height: inherit;
    border: 5px solid var(--el-bg-color-overlay);
    border-top: 0;
    border-bottom: 0;
    z-index: 1;
    background-color: transparent;
    box-sizing: border-box;
}
.dv-password-strength-bar {
    position: absolute;
    height: inherit;
    width: 0%;
    border-radius: inherit;
    transition: width 0.5s ease-in-out, background 0.25s;
    background: transparent;
}
.dv-password-strength-level-1 {
    width: 20%;
    background-color: var(--el-color-error);
}
.dv-password-strength-level-2 {
    width: 40%;
    background-color: var(--el-color-error);
}
.dv-password-strength-level-3 {
    width: 60%;
    background-color: var(--el-color-warning);
}
.dv-password-strength-level-4 {
    width: 80%;
    background-color: var(--el-color-success);
}
.dv-password-strength-level-5 {
    width: 100%;
    background-color: var(--el-color-success);
}
</style>
