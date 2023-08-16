<!--
 * @Descripttion: 图像裁剪组件
 * @version: 1.0
 * @Author: dvui-admin
 * @other: 代码完全开源，欢迎参考，也欢迎PR
-->
<template>
    <div class="dv-cropper">
        <div class="dv-cropper-img">
            <img ref="img" :src="src" />
        </div>
        <div class="dv-cropper-preview">
            <h4>图像预览</h4>
            <div ref="preview" class="dv-cropper-preview-img"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="dvCropper">
import { ref, onMounted, watch } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
interface dvCrooper {
    src?: string;
    compress?: number;
    aspectRatio?: string;
}
const img = ref();
const preview = ref();
const crop = ref();
// 接受父组件的参数
const props = withDefaults(defineProps<dvCrooper>(), {
    src: '',
    compress: 1,
});

function init() {
    crop.value = new Cropper(img.value, {
        viewMode: 2,
        dragMode: 'move',
        aspectRatio: props.aspectRatio,
        preview: preview.value,
    });
}

function setAspectRatio(val) {
    crop.value.setAspectRatio(val);
}

function getCropData(cb, type = 'image/jpeg') {
    cb(crop.value.getCroppedCanvas().toDataURL(type, props.compress));
}

function getCropBlob(cb, type = 'image/jpeg') {
    crop.value.getCroppedCanvas().toBlob(
        (blob) => {
            cb(blob);
        },
        type,
        props.compress,
    );
}
function getCropFile(cb, fileName = 'fileName.jpg', type = 'image/jpeg') {
    crop.value.getCroppedCanvas().toBlob(
        (blob) => {
            let file = new File([blob], fileName, { type: type });
            cb(file);
        },
        type,
        props.compress,
    );
}
// 监听图像的纵横比例
watch(
    () => props.aspectRatio,
    (val) => {
        crop.value.setAspectRatio(val);
    },
);
onMounted(() => {
    init();
});

// 暴露给外部的方法
defineExpose({
    setAspectRatio,
    getCropData,
    getCropBlob,
    getCropFile,
});
</script>
<style lang="scss" scoped>
.dv-cropper {
    height: 300px;
}
.dv-cropper-img {
    height: 100%;
    width: 400px;
    float: left;
    background: #ebeef5;
}
.dv-cropper-img img {
    display: none;
}
.dv-cropper-preview {
    width: 120px;
    margin-left: 20px;
    float: left;
}
.dv-cropper-preview h4 {
    font-weight: normal;
    font-size: 12px;
    color: #999;
    margin-bottom: 20px;
}
.dv-cropper-preview-img {
    overflow: hidden;
    width: 120px;
    height: 120px;
    border: 1px solid #ebeef5;
}
</style>
