declare namespace Table {
    interface Pageable {
        pageNum: number;
        pageSize: number;
        total: number;
    }
    interface TableStateProps {
        tableData: any[];
        pageable: Pageable;
        searchParam: {
            [key: string]: any;
        };
        searchInitParam: {
            [key: string]: any;
        };
        totalParam: {
            [key: string]: any;
        };
        icon?: {
            [key: string]: any;
        };
    }
}
