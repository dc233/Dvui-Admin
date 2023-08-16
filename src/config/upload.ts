type uploadfile = {
    fileName: string;
    src: string;
    msg: string;
    message: string;
};

interface UploadParms {
    code: number;
    fileName: string;
    data: uploadfile;
    message: string;
}
// 上传配置
export const uploadconfig = {
    api: '/admin/upload', // 上传请求api
    filename: 'file', //form请求时文件的key
    successCode: 200, //请求完成代码
    maxSize: 10, //最大文件大小 默认10MB
    parseData: function (res: UploadParms) {
        return {
            code: res.code, //分析状态字段结构
            fileName: res.data.fileName, //分析文件名称
            src: res.data.src, //分析图片远程地址结构
            msg: res.message, //分析描述字段结构
        };
    },
};
