<template>
    <el-pagination
        :current-page="pageModel.currentPage"
        :page-size="pageModel.pageSize"
        background
        layout="total,sizes, prev, pager, next, jumper"
        :total="pageModel.totalSize"
        @size-change="pageSizeChanged"
        @current-change="currentChanged"
    />
</template>

<script setup lang="ts" name="TableFooter">
import { ref, reactive } from 'vue';
const emit = defineEmits(['pageChanged']);
const pageModel = reactive({
    currentPage: 1,
    pageSize: 20,
    totalSize: 0,
});

const pageSizeChanged = (pageSize: number) => {
    pageModel.pageSize = pageSize;
    pageModel.currentPage = 1;
    emit('pageChanged', pageModel);
};
const currentChanged = (currentPage: number) => {
    pageModel.currentPage = currentPage;
    emit('pageChanged');
};

const withPageInfoData = (otherParams = {}) => {
    return {
        ...otherParams,
        page: pageModel.currentPage,
        pageSize: pageModel.pageSize,
    };
};
const setTotalSize = (totalSize: number) => {
    pageModel.totalSize = totalSize;
};
const setPageSize = (pageSize: number) => {
    pageModel.pageSize = pageSize;
};
const setPage = (page: number) => {
    pageModel.currentPage = page;
};
defineExpose({
    pageModel,
    withPageInfoData,
    setTotalSize,
    setPageSize,
    setPage,
});
</script>
