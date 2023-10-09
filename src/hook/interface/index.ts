export namespace Table {
    export interface Pageable {
        pageNum?: number;
        pageSize?: number;
        total: number;
    }
    export interface StateProps {
        tableData: any[];
        pageable: Pageable;
        loading: boolean;
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

export namespace HandleData {
    export type MessageType = '' | 'success' | 'warning' | 'info' | 'error';
}

export interface DialogCrud {
    name?: string;
    doCreate(val: object): Promise<any>;
    doDelete(val: object): Promise<any>;
    doUpdate(val: object): Promise<any>;
    refresh(): Promise<any>;
    filtrationParams?: (val: object) => object;
}
