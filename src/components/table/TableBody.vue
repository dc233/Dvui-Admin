<template>
    <el-card class="box-card">
        <vxe-toolbar ref="vxetoolbar" size="mini">
            <template #buttons>
                <el-space wrap>
                    <slot name="topbar" />
                    <el-button v-if="porps.export" @click="exportdata">
                        <el-icon
                            class="mini-right"
                            color="var(--color)"
                            :size="15"
                        >
                            <svg-icon icon-class="export" />
                        </el-icon>
                        导出数据
                    </el-button>
                </el-space>
            </template>
            <template #tools>
                <el-button circle title="刷新" @click="handelRefreshdata">
                    <el-icon color="var(--el-text-color-regular)" :size="14">
                        <svg-icon icon-class="refresh" />
                    </el-icon>
                </el-button>
            </template>
        </vxe-toolbar>
        <vxe-table
            ref="vxetable"
            class="my-table"
            :height="porps.height"
            :data="data"
        >
            <slot name="table-cotent"></slot>
            <template #empty>
                <el-empty description="暂无数据" />
            </template>
        </vxe-table>
        <div class="paginationLayout">
            <slot name="footer" />
        </div>
    </el-card>
</template>

<script setup lang="ts" name="TableBody">
import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table';
import { ref, nextTick } from 'vue';
const porps = withDefaults(
    defineProps<{
        export?: boolean;
        height?: number | string;
        data?: any[];
        showOverflow?: string;
        exportFilename?: any[];
    }>(),
    {
        export: true,
        height: 500,
        data: [],
        showOverflow: 'tooltip',
        exportFilename: [],
    },
);
const emit = defineEmits(['serveExport', 'refreshData']);
const vxetable = ref<VxeTableInstance>();
const vxetoolbar = ref<VxeToolbarInstance>();
nextTick(() => {
    // 将表格和工具栏进行关联
    const $table = vxetable.value;
    const $toolbar = vxetoolbar.value;
    $table.connect($toolbar);
});

// 导出数据过滤的列
const columnFiltersMethod = ({ column }) => {
    // const filterVal = ['seq', 'checkbox'];
    return porps.exportFilename.includes(column.property);
};
// 前端导出数据
const exportdata = () => {
    const $table = vxetable.value;
    if (porps.exportFilename?.length)
        $table.exportData({
            type: 'csv',
            message: false,
            columnFilterMethod: porps.exportFilename?.length
                ? columnFiltersMethod
                : () => true,
        });
};
// 刷新数据
const handelRefreshdata = () => {
    emit('refreshData');
};
</script>

<style lang="scss" scoped>
.paginationLayout {
    display: flex;
    padding-top: 20px;
    height: 40px;
    justify-content: end;
    align-items: center;
}
</style>
