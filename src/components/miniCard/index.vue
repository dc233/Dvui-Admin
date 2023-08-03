<!--
 * @Descripttion: 小卡片组件
 * @version: 1.0
 * @Author: Dingcong
 * @Date: 2022年11月5日15:06:01
 * @LastEditors:
 * @LastEditTime:
-->

<template>
    <div class="mini-card">
        <div class="flex flex-col">
            <div class="header flex flex-justify-between flex-items-center">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="footer flex flex-justify-between flex-items-center">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="miniCard"></script>

<style lang="scss" scoped>
.mini-card {
    height: 220px;
    background-color: var(--card-bg);
    border-radius: 6px;
    border: 1px solid var(--card-line);
    box-shadow: var(--el-box-shadow-light);
    .header {
        height: 50px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--el-border-color);
    }
    .content {
        height: 120px;
        padding: 16px;
    }
    .footer {
        height: 50px;
        padding: 10px 16px;
        border-top: 1px solid var(--el-border-color);
    }
}
</style>
