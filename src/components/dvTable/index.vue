<template>
    <!-- 表格查询表单 -->
    <div>查询</div>
    <!-- 表格内容 -->
    <div>
        <!-- 表格的主体内容 -->
        <el-table
            ref="tableRef"
            :data="tableData"
            v-bind="$attrs"
            :border="border"
            :row-key="rowKey"
        >
            <!-- 默认插槽 -->
            <slot></slot>
            <template v-for="item in tableColumns" :key="item">
                <!-- selection || index -->
                <el-table-column
                    v-if="item.type == 'selection' || item.type == 'index'"
                    v-bind="item"
                    :align="item.align ?? 'center'"
                    :reserve-selection="item.type == 'selection'"
                >
                </el-table-column>
                <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
                <el-table-column
                    v-if="item.type == 'expand'"
                    v-slot="scope"
                    v-bind="item"
                    :align="item.align ?? 'center'"
                >
                    <component
                        :is="item.render"
                        v-if="item.render"
                        :row="scope.row"
                    >
                    </component>
                    <slot v-else :name="item.type" :row="scope.row"></slot>
                </el-table-column>
            </template>
        </el-table>
    </div>
    <!-- 表格分页 -->
    <div>分页</div>
    <!-- 表格设置 -->
    <div>setting</div>
</template>

<script setup lang="ts" name="DvTable">
import { ref } from 'vue';
import { ElTable, TableProps } from 'element-plus';
import { ColumnProps } from './interface/index';
interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
    columns: ColumnProps[]; // 列配置项
    border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
}

// 表格组件props
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    border: true,
    rowKey: 'id',
    pagination: true,
});

// 接受columns 并设置为响应式
const tableColumns = ref(props.columns);
</script>
