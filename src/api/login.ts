import { request } from '@/utils/request';

// 登录接口
export function fetchLogin(data: any) {
    return request.post<any>('/login', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

// 表格数据接口
export function fetchGetdata(data: any) {
    return request.get<any>('/gtetable', { params: data });
}
