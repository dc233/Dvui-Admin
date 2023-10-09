<template>
    <div class="table-box">
        <!-- 表格查询表单 -->
        <SearchForm
            v-show="isShowSearch"
            :search="search"
            :reset="reset"
            :columns="searchColumns"
            :search-param="searchParam"
            :search-col="searchCol"
        />
        <!-- 表格内容 -->
        <div class="card table-main">
            <!-- 表格头部 操作按钮 -->
            <div class="table-header">
                <div class="header-button-lf">
                    <slot
                        name="tableHeader"
                        :selected-list-ids="selectedListIds"
                        :selected-list="selectedList"
                        :is-selected="isSelected"
                    />
                </div>
                <div v-if="toolButton" class="header-button-ri">
                    <slot name="toolButton">
                        <el-button circle title="刷新" @click="tableRefresh">
                            <el-icon
                                :class="{ 'rotate-center': isAnimating }"
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="refresh" />
                            </el-icon>
                        </el-button>
                        <el-button circle title="打印">
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="printer" />
                            </el-icon>
                        </el-button>
                        <el-button
                            circle
                            title="表格配置"
                            @click="openColSetting"
                        >
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="setting-config" />
                            </el-icon>
                        </el-button>
                        <el-button
                            v-if="exportdata"
                            circle
                            title="数据导出"
                            @click="exportDataExcel"
                        >
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="export" />
                            </el-icon>
                        </el-button>
                        <el-button
                            circle
                            title="搜索显隐"
                            @click="isShowSearch = !isShowSearch"
                        >
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="search" />
                            </el-icon>
                        </el-button>
                    </slot>
                </div>
            </div>
            <el-table
                ref="tableRef"
                v-loading.fullscreen.lock="loading"
                element-loading-text="加载数据中..."
                :data="data ?? tableData"
                v-bind="$attrs"
                :border="tableSetting.border"
                :size="tableSetting.size"
                :stripe="tableSetting.stripe"
                :row-key="rowKey"
                @selection-change="selectionChange"
            >
                <!-- 默认插槽 -->
                <slot></slot>
                <template v-for="item in tableColumns" :key="item">
                    <!-- selection || index || expand -->
                    <el-table-column
                        v-if="
                            item.type &&
                            ['selection', 'index', 'expand'].includes(item.type)
                        "
                        v-bind="item"
                        :align="item.align ?? 'center'"
                        :reserve-selection="item.type == 'selection'"
                    >
                        <template v-if="item.type == 'expand'" #default="scope">
                            <component
                                :is="item.render"
                                v-bind="scope"
                                v-if="item.render"
                            >
                            </component>
                            <slot
                                v-else
                                :name="item.type"
                                v-bind="scope"
                            ></slot>
                        </template>
                    </el-table-column>
                    <!-- other -->
                    <TableColumn
                        v-if="!item.type && item.prop && item.isShow"
                        :column="item"
                    >
                        <template
                            v-for="slot in Object.keys($slots)"
                            #[slot]="scope"
                        >
                            <slot :name="slot" v-bind="scope"></slot>
                        </template>
                    </TableColumn>
                </template>
                <!-- 插入表格最后一行之后的插槽 -->
                <template #append>
                    <slot name="append"> </slot>
                </template>
                <!-- 无数据 -->
                <template #empty>
                    <div class="table-empty">
                        <slot name="empty">
                            <el-empty
                                :image-size="100"
                                description="暂无数据"
                            />
                        </slot>
                    </div>
                </template>
            </el-table>
            <!-- 分页组件 -->
            <slot name="pagination">
                <Pagination
                    v-if="pagination"
                    :pageable="pageable"
                    :handle-size-change="handleSizeChange"
                    :handle-current-change="handleCurrentChange"
                />
            </slot>
        </div>
    </div>
    <!-- 列设置 -->
    <ColSetting
        v-if="toolButton"
        ref="colRef"
        v-model:table-setting="tableSetting"
        v-model:col-setting="tableColumns"
        @reset-table="handleResetTable"
    />
</template>

<script setup lang="ts" name="DvTable">
import { ref, watch, computed, provide, onMounted } from 'vue';
import { ElTable, TableProps, ElMessageBox } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { ColumnProps } from './interface/index';
import { BreakPoint } from '@/components/dvGrid/interface';
import { useSelection } from '@/hook/useSelection';
import { useTable } from '@/hook/useTable';
import {
    filterEnum,
    formatValue,
    handleProp,
    handleRowAccordingToProp,
    getLocal,
    removeLocal,
} from '@/utils';
import TableColumn from './components/TableColumn.vue';
import Pagination from './components/Pagination.vue';
import SearchForm from '@/components/dvSearchForm/index.vue';
import ColSetting from './components/ColSetting.vue';
export interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
    columns: ColumnProps[]; // 列配置项
    data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
    requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
    requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    exportdata?: boolean; // 表格数据导出功能 ===> 非必传 (默认为false )
    title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    tableName?: string; // 表格名称 ==> 非必传（默认为空） 当需要用到表格列存储设置,一定要指定tableName
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

interface DvTbaleSetting {
    size: 'default' | 'small' | 'large';
    stripe: boolean;
    border: boolean;
}
// 表格配置参数
const tableSetting = ref<DvTbaleSetting>({
    size: 'default',
    stripe: true,
    border: true,
});
// 表格组件props
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    requestAuto: true,
    pagination: true,
    initParam: {},
    toolButton: false,
    border: true,
    exportdata: false,
    rowKey: 'id',
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 4, xl: 5 }),
});

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格操作栏按钮刷新
const isAnimating = ref(false);
// 表格 DOM 元素
const tableRef = ref<InstanceType<typeof ElTable>>();

// 表格多选 Hooks
const { selectionChange, selectedList, selectedListIds, isSelected } =
    useSelection(props.rowKey);

/**
 * 表格操作 Hooks
 * ⚡如果遇到某些查询条件需要另外转换成其它格式的数据，需要前往useTable组合式函数里面的updatedTotalParam方法加上转换的判断条件
 */
const {
    tableData,
    loading,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
} = useTable(
    props.requestApi,
    props.initParam,
    props.pagination,
    props.dataCallback,
    props.requestError,
);

// 清空选中数据列表
const clearSelection = () => tableRef.value?.clearSelection();

// 接受columns 并设置为响应式
// const tableColumns = ref<ColumnProps[]>(props.columns);
const tableColumns = ref<ColumnProps[]>(cloneDeep(props.columns));

// 初始化请求
onMounted(() => {
    // 自动请求接口
    props.requestAuto && getTableList();

    // 判读是否有缓存的表格配置
    let columons = getLocal(props.tableName);
    if (columons) {
        const newColumns = columons.tableColum.map((item) => {
            const matchedItem = props.columns.find(
                (item2) => item2.prop === item.prop,
            );
            if (matchedItem) {
                if (item.render) {
                    item.render = matchedItem.render;
                }
                if (item.search) {
                    item.search = matchedItem.search;
                }
                return item;
            }
            return item;
        });
        // 存储缓存的表格配置
        tableColumns.value = newColumns;
        tableSetting.value = columons.tableSetting;
    }
});

// 监听页面 initParam 改化，重新获取表格数据
watch(() => props.initParam, getTableList, { deep: true });

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());

provide('enumMap', enumMap);
provide('tableName', props.tableName);
const setEnumMap = async (col: ColumnProps) => {
    if (!col.enum) return;
    // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
    if (typeof col.enum !== 'function')
        return enumMap.value.set(col.prop!, col.enum!);
    const { data } = await col.enum();
    enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (
    columns: ColumnProps[],
    flatArr: ColumnProps[] = [],
) => {
    columns.forEach(async (col) => {
        if (col._children?.length)
            flatArr.push(...flatColumnsFunc(col._children));
        flatArr.push(col);

        // 给每一项 column 添加 isShow && isFilterEnum 默认属性
        col.isShow = col.isShow ?? true;
        col.isFilterEnum = col.isFilterEnum ?? true;

        // 设置 enumMap
        setEnumMap(col);
    });
    return flatArr.filter((item) => !item._children?.length);
};

// flatColumns
const flatColumns = ref<ColumnProps[]>();

flatColumns.value = cloneDeep(flatColumnsFunc(tableColumns.value)); // 深拷贝表格配置

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter(
    (item) => item.search?.el || item.search?.render,
);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
    column.search!.order = column.search!.order ?? index + 2;
    if (
        column.search?.defaultValue !== undefined &&
        column.search?.defaultValue !== null
    ) {
        searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
            column.search?.defaultValue;
        searchParam.value[column.search.key ?? handleProp(column.prop!)] =
            column.search?.defaultValue;
    }
});

// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

// 列设置 ==> 过滤掉不需要设置的列
const colRef = ref();
// const colSetting = tableColumns.value!.filter(
//     (item) =>
//         !['selection', 'index', 'expand'].includes(item.type!) &&
//         item.prop !== 'operation' &&
//         item.isShow,
// );
const openColSetting = () => colRef.value.openColSetting();

/**
 * 表格数据导出
 * @param searchParam 表格查询的参数
 * @return excel格式
 */
function exportDataExcel() {
    ElMessageBox.confirm('是否要导出当前数据？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then((res) => {
        alert('导出成功');
    });
}

// 重置表格配置

function handleResetTable() {
    // props.columns.forEach((item) => {
    //     item.isShow = true;
    //     item.sortable = false;
    // });
    tableColumns.value = props.columns;
    tableSetting.value = {
        size: 'default',
        stripe: true,
        border: true,
    };
    removeLocal(props.tableName);
}
// 表格操作栏刷新事件
const tableRefresh = () => {
    isAnimating.value = true;
    getTableList();
    setTimeout(() => {
        isAnimating.value = false;
    }, 500);
};
// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
    element: tableRef,
    tableData,
    pageable,
    searchParam,
    searchInitParam,
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
    clearSelection,
    enumMap,
    isSelected,
    selectedList,
    selectedListIds,
});
</script>

<style lang="scss">
.table-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .card {
        box-sizing: border-box;
        padding: 10px;
        overflow-x: hidden;
        background-color: var(--el-bg-color);
        border: 1px solid var(--el-border-color-light);
        border-radius: 6px;
        box-shadow: 0 0 12px #0000000d;
    }
    .table-main {
        display: flex;
        flex: 1;
        flex-direction: column;
        width: 100%;
        height: 100%;
        // el-table 表格样式
        .el-table {
            flex: 1;

            // 修复 safari 浏览器表格错位 https://github.com/HalseySpicy/Geeker-Admin/issues/83
            table {
                width: 100%;
            }
            .el-table__header th {
                height: 45px;
                font-size: 15px;
                font-weight: bold;
                color: var(--el-text-color-primary);
                background: var(--el-fill-color-light);
            }
            .el-table__row {
                height: 45px;
                font-size: 14px;
            }

            // 设置 el-table 中 header 文字不换行，并省略
            .el-table__header .el-table__cell > .cell {
                white-space: nowrap;
            }

            // 解决表格数据为空时样式不居中问题(仅在element-plus中)
            .el-table__empty-block {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .table-empty {
                    line-height: 30px;
                }
            }

            // table 中 image 图片样式
            .table-image {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
    }
    .table-search {
        margin-bottom: 10px;
    }
    .table-header {
        .header-button-lf {
            float: left;
        }
        .header-button-ri {
            padding-bottom: 10px;
            float: right;
        }
    }
    .el-pagination,
    .table-main .el-pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }
}
</style>
