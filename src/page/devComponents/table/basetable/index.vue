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
            :exportdata="true"
            table-name="basetable"
            :init-param="initParam"
            :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 5 }"
        >
            <!-- 按钮 -->
            <template #tableHeader="scope">
                <el-button type="primary" @click="collapsed = true"
                    >新增</el-button
                >
                <el-dropdown trigger="click">
                    <el-button :disabled="!scope.isSelected" class="ml-12px">
                        批量操作
                        <el-icon :size="14">
                            <svg-icon icon-class="down" />
                        </el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="clearAllCheckbox"
                                >清除复选框选中</el-dropdown-item
                            >
                            <el-dropdown-item>批量删除用户</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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
            <template #avater="scope">
                <el-avatar :size="30" :src="scope.row.avater" />
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
        <!-- <tableDialog :model_value="collapsed" title="新增">
            <template #content>
                <div style="height: 1000px">
                    这是一个可以最大化、最小化及还原的 对话框
                </div>
            </template>
        </tableDialog> -->
        <DvDialog
            v-model:model_value="collapsed"
            :component="TestModal"
            :width="600"
            title="新增用户"
            :auto_height="false"
        />
    </div>
</template>

<script setup lang="tsx" name="BaseTable">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import DvTable from '@/components/dvTable/index.vue';
import Grid from '@/components/dvGrid/index.vue';
import GrinItem from '@/components/dvGrid/components/GridItem.vue';
import { fetchGetdata, fetchGetStatus } from '@/api/login';
import { useHandleData } from '@/hook/useHandleData';
import DvDialog from '@/components/dvDialog/index.vue';
import TestModal from './testModal.vue';
// import tableDialog from '@/components/vuecmfDialog/index.vue';
const collapsed = ref(false);
// 表格ref
const duTable = ref();
// 表格初始化参数
const initParam = reactive({});
// 表格内容
const columns = [
    { type: 'selection', fixed: 'left', width: 50, isShow: true },
    { type: 'index', label: '#', width: 80, isShow: true },
    { type: 'expand', label: 'Expand', width: 100, isShow: true },
    {
        prop: 'name',
        label: '用户姓名',
        width: 243,
        search: { el: 'el-input', props: { placeholder: '请输入姓名' } },
        isShow: true,
    },
    {
        prop: 'avater',
        label: '头像',
        width: 100,
        isShow: true,
    },
    // 直接本地生成用户查询选择项
    // {
    //     prop: 'status',
    //     label: '状态',
    //     enum: [
    //         { label: '启用', value: 1 },
    //         { label: '禁用', value: 2 },
    //     ],
    //     search: {
    //         key: 'stau',
    //         el: 'el-select',
    //         props: { placeholder: '请选择状态', filterable: true },
    //         order: 0,
    //     },
    //     render: (scope) => {
    //         return (
    //             <el-switch
    //                 model-value={scope.row.status}
    //                 active-text={scope.row.status ? '启用' : '禁用'}
    //                 onClick={() => changeStatus(scope.row)}
    //             />
    //         );
    //     },
    // },
    // 接口获取用户查询项
    {
        prop: 'status',
        label: '状态',
        enum: fetchGetStatus,
        width: 200,
        fieldNames: { label: 'name', value: 'val' },
        isShow: true,
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
                    active-text={scope.row.status == 1 ? '启用' : '禁用'}
                    active-value={1}
                    inactive-value={2}
                    onClick={() => changeStatus(scope.row)}
                />
            );
        },
    },
    {
        prop: 'time',
        label: '更新时间',
        width: 200,
        isShow: true,
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
        width: 200,
        isShow: true,
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
    {
        prop: 'age',
        label: '年龄',
        width: 100,
        isShow: true,
        search: {
            // 自定义 search 显示内容
            render: ({ searchParam }) => {
                return (
                    <div class="flex">
                        <el-input
                            vModel_trim={searchParam.minAge}
                            placeholder="最小年龄"
                        />
                        <span class="mr2 ml2">-</span>
                        <el-input
                            vModel_trim={searchParam.maxAge}
                            placeholder="最大年龄"
                        />
                    </div>
                );
            },
        },
    },
    {
        prop: 'operation',
        label: '操作',
        fixed: 'right',
        isShow: true,
    },
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
