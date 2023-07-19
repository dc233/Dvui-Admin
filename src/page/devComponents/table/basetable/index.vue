<template>
    <div class="content-layout">
        <!-- <Grid ref="gridRef" :collapsed="collapsed" :gap="[10, 10]">
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
        </Grid> -->
        <DvTable
            ref="duTable"
            title="用户列表"
            :columns="columns"
            :request-api="fetchGetdata"
            table-name="basetable"
            :init-param="initParam"
            :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }"
        >
            <!-- 按钮 -->
            <template #tableHeader="scope">
                <el-button type="primary">新增</el-button>
                <el-button type="primary" @click="clearAllCheckbox"
                    >清除复选框选中</el-button
                >
                <el-button type="danger" plain :disabled="!scope.isSelected">
                    批量删除用户
                </el-button>
            </template>
            <!-- Expand -->
            <template #expand="scope">
                <div class="bg-lightblue">
                    {{ scope.row }}
                </div>
            </template>
            <!-- usernameHeader -->
            <template #nameHeader="scope">
                <el-button
                    type="primary"
                    @click="ElMessage.success('我是通过作用域插槽渲染的表头')"
                >
                    {{ scope.column.label }}
                </el-button>
            </template>
            <template #operation="scope">
                <el-space wrap>
                    <el-link :underline="false" type="primary">
                        <el-icon :size="14">
                            <svg-icon icon-class="edit" />
                        </el-icon>
                        编辑</el-link
                    >
                    <el-link :underline="false" type="danger">
                        <el-icon :size="14">
                            <svg-icon icon-class="delete" />
                        </el-icon>
                        删除</el-link
                    >
                </el-space>
            </template>
        </DvTable>
    </div>
</template>

<script setup lang="tsx" name="BaseTable">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import DvTable from '@/components/dvTable/index.vue';
import Grid from '@/components/dvGrid/index.vue';
import GrinItem from '@/components/dvGrid/components/GridItem.vue';
import { fetchGetdata } from '@/api/login';
import { useHandleData } from '@/hook/useHandleData';
const collapsed = ref(true);
// 表格ref
const duTable = ref();
// 表格初始化参数
const initParam = reactive({});
// 表格内容
const columns = [
    { type: 'selection', fixed: 'left', width: 80 },
    { type: 'index', label: '#', width: 80 },
    { type: 'expand', label: 'Expand', width: 100 },
    {
        prop: 'name',
        label: '用户姓名',
        search: { el: 'el-input', props: { placeholder: '请输入姓名' } },
    },
    {
        prop: 'avater',
        label: '头像',
        render: (scope) => {
            return <el-avatar size={30} src={scope.row.avater} />;
        },
    },
    {
        prop: 'status',
        label: '状态',
        enum: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 2 },
        ],
        search: {
            key: 'stau',
            el: 'el-select',
            props: { placeholder: '请选择状态', filterable: true },
            order: 0,
        },
        render: (scope) => {
            return (
                <el-switch
                    model-value={scope.row.status}
                    active-text={scope.row.status ? '启用' : '禁用'}
                    onClick={() => changeStatus(scope.row)}
                />
            );
        },
    },
    {
        prop: 'time',
        label: '更新时间',
        search: {
            key: 'create-time',
            el: 'el-date-picker',
            props: { type: 'datetimerange' },
        },
        render: (scope) => {
            return (
                <el-button
                    type="primary"
                    onClick={() =>
                        ElMessage.success('我是通过 tsx 语法渲染的内容')
                    }
                >
                    {scope.row.time}
                </el-button>
            );
        },
    },
    {
        prop: 'time',
        label: '时间',
        search: {
            el: 'el-date-picker',
            props: { type: 'datetime', placeholder: '请选择时间' },
        },
        render: (scope) => {
            return (
                <el-button
                    type="primary"
                    onClick={() =>
                        ElMessage.success('我是通过 tsx 语法渲染的内容')
                    }
                >
                    {scope.row.time}
                </el-button>
            );
        },
    },
    { prop: 'operation', label: '操作', width: 330, fixed: 'right' },
];
// 表格清除选中
const clearAllCheckbox = () => {
    duTable.value!.clearSelection();
};

const changeStatus = async (row) => {
    await useHandleData(
        fetchGetdata,
        { id: row.id, status: row.status == 1 ? 0 : 1 },
        `切换【${row.name}】用户状态`,
    );
    duTable.value?.getTableList();
};
</script>
