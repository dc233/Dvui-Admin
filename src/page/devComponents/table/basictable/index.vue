<template>
    <div class="content-layout">
        <el-card
            shadow="never"
            header="Element-plus的表格经过二次封装的使用方法"
        >
            <el-tabs type="border-card">
                <el-tab-pane
                    v-for="(item, index) in tablist"
                    :key="index"
                    :label="item.name"
                >
                    <component :is="item.component" />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="basicTable">
import { shallowRef } from 'vue';
import base from './tableExample/base.vue';
import stripe from './tableExample/stripe.vue';
const tablist = shallowRef([
    {
        name: '基础表格',
        component: base,
    },
    {
        name: '带斑马纹表格',
        component: stripe,
    },
]);
</script>
