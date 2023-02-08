<template>
    <div class="content-layout">
        <!-- <tabHeade
            :model="searchparms.searchform"
            @do-search="searchTabledata"
            @reset-search="resetSearch"
        >
            <el-form-item label="姓名">
                <el-input
                    v-model="searchparms.searchform.name"
                    class="w-280"
                    placeholder="姓名"
                />
            </el-form-item>
        </tabHeade> -->

        <!-- <tableBody
            v-loading="loading"
            element-loading-text="Loading..."
            height="600"
            :data="dataList"
            :show-overflow="true"
        >
            <template #topbar>
                <el-button type="primary" @click="getTabledata">
                    <el-icon class="mini-right" :size="15">
                        <svg-icon icon-class="add-one" />
                    </el-icon>
                    新增
                </el-button>
                <el-button @click="showDlg = true">
                    <el-icon class="mini-right" :size="15">
                        <svg-icon icon-class="file-editing" />
                    </el-icon>
                    编辑</el-button
                >
            </template>
            <template #table-cotent>
                <vxe-column type="seq" title="序号" width="60"></vxe-column>
                <vxe-column
                    type="checkbox"
                    width="60"
                    min-width="50"
                ></vxe-column>
                <vxe-column field="id" title="id"></vxe-column>
                <vxe-column field="name" title="姓名"></vxe-column>
                <vxe-column field="num" title="计数器"></vxe-column>
                <vxe-column field="urlImg" title="链接"></vxe-column>
            </template>
            <template #footer>
                <tabFooter ref="tableFooter" @page-changed="getTabledata" />
            </template>
        </tableBody> -->
        <div style="height: 500px">123</div>
        <vuecmf-dialog :model_value="showDlg" width="800px" title="标题">
            <template #content>
                <div>这是一个可以最大化、最小化及还原的 对话框</div>
            </template>

            <template #footer>
                <el-button type="primary" @click="showDlg = false"
                    >关闭</el-button
                >
            </template>
        </vuecmf-dialog>
    </div>
</template>

<script setup lang="ts" name="BaseTable">
// import tabHeade from '@/components/table/TableHeade.vue';
// import tableBody from '@/components/table/TableBody.vue';
// import tabFooter from '@/components/table/TableFooter.vue';
// import { ref, onMounted } from 'vue';
// import { fetchGetdata } from '@/api/login';
// import { useLoading } from '@/hook';
// import { useTabledata, useTablesearch } from '@/hook/tableData';
// const { loading, startLoading, endLoading } = useLoading();
// const { dataList, handleSuccess } = useTabledata();
// const { searchparms, resetSearch } = useTablesearch();
// const tableFooter = ref<InstanceType<typeof tabFooter> | null>(null);
// const showDlg = ref(false);
// //  获取数据
// async function getTabledata() {
//     startLoading();
//     const { data } = await fetchGetdata({
//         ...tableFooter.value?.withPageInfoData(),
//         ...searchparms.searchform,
//     });
//     if (data) {
//         await handleSuccess(data);
//         tableFooter.value?.setTotalSize(data.count);
//         endLoading();
//     }
// }
// // 搜索数据
// function searchTabledata() {
//     tableFooter.value?.setPage(1);
//     getTabledata();
// }
// // 生命周期调取数据
// onMounted(() => {
//     getTabledata();
// });
</script>
