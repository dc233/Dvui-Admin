import axios from 'axios';
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import {
    transformRequestData,
    handleAxiosError,
    handleServiceResult,
    handleBackendError,
    handleResponseError,
} from '@/utils';
export default class CustomAxiosInstance {
    instance: AxiosInstance;
    backendConfig: Service.BackendResultConfig;

    /**
     *
     * @param axiosConfig - axios配置
     * @param backendConfig - 后端返回的数据配置
     */
    constructor(
        axiosConfig: AxiosRequestConfig,
        backendConfig: Service.BackendResultConfig = {
            codeKey: 'code',
            dataKey: 'data',
            msgKey: 'message',
            successCode: 200,
        },
    ) {
        this.backendConfig = backendConfig;
        this.instance = axios.create(axiosConfig);
        this.setInterceptor();
    }
    /** 设置请求拦截器 */
    setInterceptor() {
        // 请求request拦截器
        this.instance.interceptors.request.use(
            async (config) => {
                const handleConfig = { ...config };
                if (handleConfig.headers) {
                    // 数据转换
                    const contentType = handleConfig.headers[
                        'Content-Type'
                    ] as string;
                    handleConfig.data = await transformRequestData(
                        handleConfig.data,
                        contentType,
                    );
                }
                return handleConfig;
            },
            (axiosError: AxiosError) => {
                const error = handleAxiosError(axiosError);
                return handleServiceResult(error, null);
            },
        );
        // 请求response拦截器
        this.instance.interceptors.response.use(
            async (response) => {
                const { status } = response;
                if (status === 200 || status < 300 || status === 304) {
                    const backend = response.data;
                    const { codeKey, dataKey, successCode } =
                        this.backendConfig;
                    // 请求成功
                    if (backend[codeKey] === successCode) {
                        return handleServiceResult(null, backend[dataKey]);
                    }
                    const error = handleBackendError(
                        backend,
                        this.backendConfig,
                    );
                    return handleServiceResult(error, null);
                }
                const error = handleResponseError(response);
                return handleServiceResult(error, null);
            },
            (axiosError: AxiosError) => {
                const error = handleAxiosError(axiosError);
                return handleServiceResult(error, null);
            },
        );
    }
}
