<template>
    <div class="dv-upload">
        <el-upload
            v-bind="$attrs"
            v-model:file-list="filelist"
            :name="name"
            :before-upload="before"
            :http-request="request"
            :limit="limit"
            :on-exceed="handleExceed"
            :accept="fileType.join(',')"
        >
            <slot>
                <el-button type="primary" :disabled="disabled"
                    >Click to upload</el-button
                >
            </slot>
            <template #tip>
                <div v-if="tip" class="el-upload__tip">{{ tip }}</div>
            </template>
        </el-upload>
    </div>
</template>

<script setup lang="ts" name="dvUploadFile">
import { computed } from 'vue';
import { uploadconfig } from '@/config';
import { ElMessage } from 'element-plus';
import { request as axisorequest } from '@/utils/request';
import type { UploadProps } from 'element-plus';
interface UploadFileProps {
    modelValue: any[] | string;
    tip: string;
    disabled?: boolean;
    name?: string;
    maxSize?: number;
    limit?: number;
    fileType?: File.ExcelMimeType[];
}
// 接受父组件参数
const props = withDefaults(defineProps<UploadFileProps>(), {
    modelValue: () => [],
    tip: '',
    disabled: false,
    name: uploadconfig.filename,
    maxSize: uploadconfig.maxSize,
    limit: 0,
    fileType: () => [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
});
const emit = defineEmits(['update:modelValue']);
const filelist = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const before: UploadProps['beforeUpload'] = (file) => {
    const maxSize = file.size / 1024 / 1024 < props.maxSize;
    const imgType = props.fileType.includes(file.type as File.ExcelMimeType);
    if (!imgType) {
        ElMessage.warning(`上传文件不符合所需的格式!`);
        return false;
    }
    if (!maxSize) {
        ElMessage.warning(`上传文件大小不能超过${props.maxSize}MB!`);
        return false;
    }
};
const handleExceed = () => {
    ElMessage.warning(`当前设置最多上传 ${props.limit} 个文件，请移除后上传!`);
};
const request = (params: any) => {
    const data = new FormData();
    data.append(params.filename, params.file);
    axisorequest
        .post(uploadconfig.api, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (e) => {
                const complete = parseInt(((e.loaded / e.total) * 100) | 0, 10);
                params.onProgress({ percent: complete });
            },
        })
        .then((res) => {
            params.onSuccess(res);
        });
};
</script>
