<template>
    <el-config-provider :locale="locale">
        <RouterView />
    </el-config-provider>
</template>
<script setup lang="ts" name="App">
import { onMounted, watchEffect } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { getThemeColor } from '@/utils';
import { usePrimaryColor, useTheme, useGlobaltheme } from '@/hook/index';
import { useGlobalStore } from '@/store/global';
const locale = zhCn;
const gobalStore = useGlobalStore();
const { switchTheme } = useGlobaltheme();
// 读取缓存中的主题颜色
const initColor = () => {
    const theme = getThemeColor();
    if (theme) {
        usePrimaryColor(theme);
    }
};
// 获取用户系统默认的主题颜色
const theme = useTheme();
watchEffect(() => {
    console.log(theme.value, 'theme');
    if (gobalStore.theme === 'auto') {
        switchTheme(theme.value ?? 'light');
    }
    gobalStore.uopataPrefersColorScheme(theme.value);
});
onMounted(() => {
    initColor();
});
</script>
