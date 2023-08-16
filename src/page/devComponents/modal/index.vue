<script setup lang="ts">
import Grid from '@/components/dvGrid/index.vue';
import GrinItem from '@/components/dvGrid/components/GridItem.vue';
</script>

<template>
    <h1>hooks modal组件</h1>
    <Grid ref="gridRef" :collapsed="collapsed" :gap="[10, 10]">
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
        <GrinItem>
            <el-input placeholder="查询条件" />
        </GrinItem>
    </Grid>
</template>
