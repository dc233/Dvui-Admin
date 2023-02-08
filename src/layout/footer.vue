<template>
    <footer class="footer">
        <div class="footer-text">
            <span>Copyright ©2022 element-admin-vite</span>
        </div>
    </footer>
</template>

<script setup lang="ts" name="Main">
import { useBasicLayout } from '@/composables/layouts';
const { activePadding } = useBasicLayout();
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: var(--el-bg-color);
    padding-left: v-bind(activePadding);
    .footer-text {
        display: flex;
        justify-content: center;
    }
}
</style>
