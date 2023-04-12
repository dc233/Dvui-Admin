<template>
    <div class="content-layout">
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
        <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            size="small"
            border
        >
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>
</template>

<script setup lang="ts" name="BaseTable">
import { ref } from 'vue';
import Grid from '@/components/dvGrid/index.vue';
import GrinItem from '@/components/dvGrid/components/GridItem.vue';

const collapsed = ref(true);
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
];
</script>
