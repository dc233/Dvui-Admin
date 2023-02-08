<template>
    <el-card class="tableheadr-card">
        <el-form :inline="true" :model="model" label-width="auto">
            <Grid
                ref="gridRef"
                :collapsed="collapsed"
                :gap="[20, 0]"
                :cols="colConfig"
            >
                <GridItem
                    v-for="(item, index) in columns"
                    :key="item.prop"
                    v-bind="getResponsive(item)"
                    :index="index"
                >
                    <el-form-item :label="`${item.label} :`">
                        <SearchFormItem
                            :column="item"
                            :search-param="searchParam"
                        />
                    </el-form-item>
                </GridItem>
                <GridItem suffix>
                    <el-form-item>
                        <el-button type="primary" @click="doSearch">
                            <el-icon
                                class="mini-right"
                                color="var(--color)"
                                :size="15"
                            >
                                <svg-icon icon-class="search-new" />
                            </el-icon>
                            搜索</el-button
                        >
                        <el-button type="success" @click="doResetSearch">
                            <el-icon
                                class="mini-right"
                                color="var(--color)"
                                :size="15"
                            >
                                <svg-icon icon-class="delete" />
                            </el-icon>
                            重置</el-button
                        >
                    </el-form-item>
                </GridItem>
            </Grid>
        </el-form>
    </el-card>
</template>

<script setup lang="ts" name="TableHeade">
import { computed, ref } from 'vue';
import Grid from '@/components/dvGrid/index.vue';
import GridItem from '@/components/dvGrid/components/GridItem.vue';
import { BreakPoint } from '@/components/Grid/interface';
import SearchFormItem from '@/components/dvSearchForm/index.vue';
interface TableSearch {
    columns?: [];
    model?: { [key: string]: any };
    colConfig: number | Record<BreakPoint, number>;
}

// 默认值
const porps = withDefaults(defineProps<TableSearch>(), {
    columns: () => [],
    model: () => ({}),
});

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
    return {
        span: item.search?.span,
        offset: item.search?.offset ?? 0,
        xs: item.search?.xs,
        sm: item.search?.sm,
        md: item.search?.md,
        lg: item.search?.lg,
        xl: item.search?.xl,
    };
};

const emit = defineEmits(['resetSearch', 'doSearch']);

// 是否默认折叠搜索项
const collapsed = ref(true);
// 获取响应式断点
const gridRef = ref();

const doResetSearch = () => {
    emit('resetSearch');
};

const doSearch = () => {
    emit('doSearch');
};
</script>

<style lang="scss" scoped>
.tableheadr-card {
    margin-bottom: 10px;
}
</style>
