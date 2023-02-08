<!--
 * @Descripttion: 统计数值组件
 * @version: 1.0
 * @Author: Dingcong
 * @Date: 2022年11月5日16:06:01
 * @LastEditors:
 * @LastEditTime:
-->
<template>
    <div class="dv-statistic-content-value">
        {{ cmtValue }}<span class="unit">{{ porps.unit }}</span>
    </div>
</template>

<script setup lang="ts" name="dvStatistic">
import { computed } from 'vue';
import { groupSeparator } from '@/utils';
const porps = withDefaults(
    defineProps<{
        value?: number;
        unit?: string;
    }>(),
    {
        value: 0,
        unit: '',
    },
);
const cmtValue = computed(() => {
    return groupSeparator(porps.value);
});
</script>

<style lang="scss" scoped>
.dv-statistic-content-value {
    font-size: 26px;
    font-weight: 400;
    .unit {
        padding-left: 10px;
        font-size: 20px;
        font-weight: 300;
    }
}
</style>
