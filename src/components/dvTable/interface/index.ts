import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults';

export interface ColumnProps<T = any>
    extends Partial<
        Omit<TableColumnCtx<T>, 'children' | 'renderHeader' | 'renderCell'>
    > {
    render?: (scope: { row: T }) => any; // 自定义单元格内容渲染（tsx语法）
}
