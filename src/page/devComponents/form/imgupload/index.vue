<template>
    <div class="content-layout">
        <el-space direction="vertical" fill wrap style="width: 100%">
            <el-card shadow="never" header="文件示例">
                <dv-fileupload
                    v-model="fileurlArr"
                    :limit="3"
                    tip="最多上传3个文件,单个文件不要超过10M,请上传xlsx/csv格式文件"
                >
                    <el-button type="primary">
                        <el-icon :size="18" class="p-r-1">
                            <svg-icon icon-class="upload" />
                        </el-icon>
                        上传附件
                    </el-button>
                </dv-fileupload>
            </el-card>

            <el-card shadow="never" header="拖拽上传文件">
                <dv-fileupload
                    v-model="fileurlArr"
                    drag
                    :limit="3"
                    tip="最多上传3个文件,单个文件不要超过10M,请上传xlsx/csv格式文件"
                >
                    <el-icon :size="40" color="var(--el-text-color-regular)">
                        <svg-icon icon-class="upload-one" />
                    </el-icon>

                    <div class="el-upload__text">
                        将文件拖放到此处 <em>点击上传</em>
                    </div>
                </dv-fileupload>
            </el-card>
            <el-card shadow="never" header="单图上传">
                <div class="flex flex-wrap">
                    <dvImgupload v-model:image-url="avatar1" :file-size="3">
                        <template #tip> 上传图片最大为 3M </template>
                    </dvImgupload>
                    <div class="m-l-30px">
                        <dvImgupload
                            v-model:image-url="avatar2"
                            :drag="false"
                            border-radius="50%"
                        >
                            <template #empty>
                                <el-icon
                                    :size="40"
                                    color="var(--el-text-color-regular)"
                                >
                                    <svg-icon icon-class="avatar" />
                                </el-icon>
                                <span>请上传头像</span>
                            </template>
                            <template #tip> 圆形组件（禁止拖拽上传）</template>
                        </dvImgupload>
                    </div>
                    <div class="m-l-30px">
                        <dvImgupload v-model:image-url="avatar2" width="250px">
                            <template #empty>
                                <el-icon
                                    :size="20"
                                    color="var(--el-text-color-regular)"
                                >
                                    <svg-icon icon-class="pic" />
                                </el-icon>
                                <span>请上传 Banner 图</span>
                            </template>
                            <template #tip> 长方形组件（可拖拽上传）</template>
                        </dvImgupload>
                    </div>
                    <div class="m-l-30px">
                        <dvImgupload v-model:image-url="avatar2" disabled>
                            <template #tip> 无图（禁用上传）</template>
                        </dvImgupload>
                    </div>
                    <div class="m-l-30px">
                        <dvImgupload v-model:image-url="avatar3" disabled>
                            <template #tip> 有图（禁用上传）</template>
                        </dvImgupload>
                    </div>
                    <div class="m-l-30px">
                        <dvImgupload
                            v-model:image-url="avatar4"
                            aspect-ratio="1 / 1"
                            :cropper="true"
                            :auto-upload="false"
                        >
                            <template #tip> 带裁剪的图片上传</template>
                        </dvImgupload>
                    </div>
                </div>
            </el-card>
            <el-card shadow="never" header="多图上传">
                <dvImguploads v-model:file-list="fileList" :drag="false">
                </dvImguploads>
            </el-card>
            <el-card shadow="never" header="验证表单中使用">
                <el-form
                    ref="formRef"
                    :model="form"
                    label-width="auto"
                    :rules="rules"
                >
                    <el-form-item label="身份证正面" prop="img">
                        <dvImgupload v-model:image-url="form.img" width="250px">
                            <template #empty>
                                <el-icon
                                    :size="20"
                                    color="var(--el-text-color-regular)"
                                >
                                    <svg-icon icon-class="pic" />
                                </el-icon>
                                <span>请上传身份证正面</span>
                            </template>
                        </dvImgupload>
                    </el-form-item>
                    <el-form-item label="身份证反面" prop="img2">
                        <dvImgupload
                            v-model:image-url="form.img2"
                            width="250px"
                        >
                            <template #empty>
                                <el-icon
                                    :size="20"
                                    color="var(--el-text-color-regular)"
                                >
                                    <svg-icon icon-class="pic" />
                                </el-icon>
                                <span>请上传身份证正面</span>
                            </template>
                        </dvImgupload>
                    </el-form-item>
                    <el-form-item label="多图上传" prop="img3">
                        <dvImguploads
                            v-model:file-list="form.img3"
                            :drag="false"
                        >
                        </dvImguploads>
                    </el-form-item>
                    <el-form-item label="文件上传" prop="file">
                        <dv-fileupload
                            v-model="form.file"
                            :limit="3"
                            tip="最多上传3个文件,单个文件不要超过10M,请上传xlsx/csv格式文件"
                        >
                            <el-button type="primary">
                                <el-icon :size="18" class="p-r-1">
                                    <svg-icon icon-class="upload" />
                                </el-icon>
                                上传附件
                            </el-button>
                        </dv-fileupload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(formRef)">
                            验证
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-space>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import dvFileupload from '@/components/dvUpload/file.vue';
import dvImgupload from '@/components/dvUpload/img.vue';
import dvImguploads from '@/components/dvUpload/imgs.vue';
import type { FormInstance, FormRules } from 'element-plus';
interface FileList {
    name: string;
    url: string;
}
const fileList = ref([
    {
        name: 'img',
        url: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    },
]);
const formRef = ref<FormInstance>();
const fileurlArr = ref<FileList[]>([
    {
        name: '销售合同模板.xlsx',
        url: 'http://www.scuiadmin.com/files/220000198611262243.xlsx',
    },
    {
        name: '企业员工联系方式.xlsx',
        url: 'http://www.scuiadmin.com/files/350000201004261875.xlsx',
    },
]);

interface RuleForm {
    img: string;
    img2: string;
    img3: object[];
    file: object[];
}
const form = reactive<RuleForm>({
    img: '',
    img2: '',
    img3: [
        {
            name: 'img',
            url: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        },
    ],
    file: [
        // {
        //     name: '销售合同模板.xlsx',
        //     url: 'http://www.scuiadmin.com/files/220000198611262243.xlsx',
        // },
    ],
});
const rules = reactive<FormRules<RuleForm>>({
    img: [{ required: true, message: '请上传图片' }],
    img2: [{ required: true, message: '请上传图片' }],
    img3: [{ required: true, message: '请上传图片' }],
    file: [{ required: true, message: '请上传文件' }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('error submit!', fields);
        }
    });
};
const avatar1 = ref(
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
);
const avatar2 = ref('');

const avatar3 = ref(
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
);
const avatar4 = ref('');
</script>

<style lang="scss" scoped></style>
