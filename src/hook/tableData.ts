import { Ref, ref, reactive } from 'vue';
/**
 * hook 通用的表格CRUD业务封装
 */
/* hook 表格请求的封装 */
export interface IDataTable<T = any> {
    dataList: Ref<T[] | undefined>;
    handleSuccess: ({ list, count }: { list: T[]; count: number }) => void;
}
export function useTabledata<T = any>(): IDataTable<T> {
    const dataList = ref<T[]>();
    const handleSuccess = ({ list = [] }: { list: T[]; count: number }) => {
        dataList.value = list;
    };
    return {
        dataList,
        handleSuccess,
    };
}

/* hook 表格查询的封装 */
export function useTablesearch() {
    const searchparms = reactive({
        searchform: {}, // 查询条件参数
        seachLock: false, // 是否允许带上查询条件
    });
    // 重置查询条件
    const resetSearch = () => {
        searchparms.searchform = {};
        searchparms.seachLock = false;
    };
    return {
        searchparms,
        resetSearch,
    };
}

/* hook  表格dialog */
export function useDialog() {
    const dialogConfig = reactive({
        form: {},
        showDlg: false,
        title: '新增',
    });
    const openDialog = (val: string) => {
        dialogConfig.showDlg = true;
        dialogConfig.title = val;
    };
    const editDialog = (val: any) => {
        dialogConfig.showDlg = true;
        dialogConfig.title = '编辑';
        dialogConfig.form = val;
    };
    const closeDialog = () => {
        dialogConfig.showDlg = false;
        dialogConfig.form = {};
    };
    const updateVisible = (val: any) => {
        dialogConfig.showDlg = val;
        dialogConfig.form = {};
    };
    return {
        dialogConfig,
        updateVisible,
        openDialog,
        closeDialog,
        editDialog,
    };
}
