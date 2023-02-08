import type { App } from 'vue';
import 'xe-utils';
import {
    VXETable,
    Column,
    Table,
    Export,
    Colgroup,
    Toolbar,
    Button,
} from 'vxe-table';
import 'vxe-table/lib/style.css';
VXETable.setup({
    // 表格全局配置
    table: {
        size: 'small',
        border: true,
        stripe: true,
        columnConfig: {
            resizable: true,
            width: 'auto',
            minWidth: '60px',
        },
        checkboxConfig: {
            highlight: true,
        },
        rowConfig: {
            isHover: true,
        },
    },
});

export function useTable(app: App) {
    // 表格功能
    app.use(Column)
        .use(Colgroup)
        .use(Export)
        .use(Toolbar)
        .use(Button)
        .use(Table);
}
