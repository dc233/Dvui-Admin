<template>
    <div class="content-layout">
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
                <el-button type="primary" @click="handleAdd">新增</el-button>
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
                    <el-link
                        :underline="false"
                        type="primary"
                        @click="editDialog(scope.row)"
                    >
                        <el-icon :size="14">
                            <svg-icon icon-class="edit" />
                        </el-icon>
                        编辑</el-link
                    >
                    <el-link
                        :underline="false"
                        type="danger"
                        @click="handleDelet(scope.row)"
                    >
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
            ref="duDialog"
            v-model:model_value="dialogVisible"
            :btn_loading="dialogLoading"
            :component="TestModal"
            width="600"
            :title="dialogTitle"
            @sucess-form-validation="handleSave"
        />
    </div>
</template>

<script setup lang="tsx" name="Basetable">
import { ref, reactive } from 'vue';
import { ElMessage, dayjs } from 'element-plus';
import DvTable from '@/components/dvTable/index.vue';
import { fetchGetdata, fetchGetStatus } from '@/api/login';
import { useHandleData } from '@/hook/useHandleData';
import useCRUD from '@/hook/useCRUD';
import DvDialog from '@/components/dvDialog/index.vue';
import TestModal from './testModal.vue';
// import tableDialog from '@/components/vuecmfDialog/index.vue';
// 表格ref
const duTable = ref();
// 弹框ref
const duDialog = ref();
// 表格默认查询初始化参数
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
            key: 'status',
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
            defaultValue: [
                dayjs().subtract(7, 'day').startOf('day').toDate(),
                dayjs().endOf('day').toDate(),
            ],
            props: {
                type: 'datetimerange',
                defaultTime: [
                    new Date(2000, 1, 1, 0, 0, 0),
                    new Date(2000, 2, 1, 23, 59, 59),
                ],
                clearable: true,
                // 限制所选时间
                disabledDate: (time) => {
                    // 当月第一天
                    const currentMonthStart = dayjs().startOf('month').toDate();
                    // 当月最后一天
                    const currentMonthEnd = dayjs().endOf('month').toDate();
                    return (
                        time.getTime() < currentMonthStart ||
                        time.getTime() > currentMonthEnd
                    );
                },
            },
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
            defaultValue: new Date(),
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
// CRUD
const {
    dialogVisible,
    dialogTitle,
    dialogLoading,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelet,
} = useCRUD({
    name: '用户',
    doCreate: fetchGetdata,
    doDelete: fetchGetdata,
    doUpdate: fetchGetdata,
    refresh: () => duTable.value?.getTableList(),
});
const editDialog = (val: object) => {
    console.log(val);
    handleEdit();
    duDialog.value.editDialog(val);
};
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
