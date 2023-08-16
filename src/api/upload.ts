import { request } from '@/utils/request';

export function upload(data: any) {
    return request.post<any>('/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
