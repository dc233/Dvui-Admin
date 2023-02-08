<template>
    <el-config-provider :locale="locale">
        <RouterView />
    </el-config-provider>
</template>
<script setup lang="ts" name="App">
import { onMounted } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { getThemeColor } from '@/utils';
import { usePrimaryColor } from '@/hook/index';
const locale = zhCn;
// 读取缓存中的主题颜色
const initColor = () => {
    const theme = getThemeColor();
    if (theme) {
        usePrimaryColor(theme);
    }
};
onMounted(() => {
    initColor();
});
</script>
