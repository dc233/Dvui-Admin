import { request } from '@/utils/request';
export default {
    getTable: (params = {}) => {
        request.post<any>('/gtetable', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    },
};
