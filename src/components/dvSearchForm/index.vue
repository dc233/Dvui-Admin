<script setup lang="ts" name="dvSearchForm">
import { computed, ref } from 'vue';
import { ColumnProps } from '@/components/dvTable/interface';
import { BreakPoint } from '@/components/dvGrid/interface';
import SearchFormItem from './components/dvSearchFormItem.vue';
import Grid from '@/components/dvGrid/index.vue';
import GridItem from '@/components/dvGrid/components/GridItem.vue';

interface ProTableProps {
    columns?: ColumnProps[]; // 搜索配置列
    searchParam?: { [key: string]: any }; // 搜索参数
    searchCol: number | Record<BreakPoint, number>;
    search: (params: any) => void; // 搜索方法
    reset: (params: any) => void; // 重置方法
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    searchParam: () => ({}),
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

// 是否默认折叠搜索项
const collapsed = ref(true);

// 获取响应式断点
const gridRef = ref();
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint);

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
    let show = false;
    props.columns.reduce((prev, current) => {
        prev +=
            (current.search![breakPoint.value]?.span ??
                current.search?.span ??
                1) +
            (current.search![breakPoint.value]?.offset ??
                current.search?.offset ??
                0);
        if (typeof props.searchCol !== 'number') {
            if (prev >= props.searchCol[breakPoint.value]) show = true;
        } else {
            if (prev >= props.searchCol) show = true;
        }
        return prev;
    }, 0);
    return show;
});
</script>

<template>
    <div v-if="columns.length" class="card table-search">
        <el-form ref="formRef" :model="searchParam">
            <Grid
                ref="gridRef"
                :collapsed="collapsed"
                :gap="[20, 0]"
                :cols="searchCol"
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
                    <div class="operation">
                        <el-button type="primary" @click="search">
                            <el-icon :size="14">
                                <svg-icon icon-class="search" />
                            </el-icon>
                            搜索
                        </el-button>
                        <el-button @click="reset">
                            <el-icon :size="14">
                                <svg-icon icon-class="delete" />
                            </el-icon>
                            重置
                        </el-button>
                        <!-- <el-button
                            type="primary"
                            :icon="Search"
                            @click="search"
                        >
                            搜索
                        </el-button> -->
                        <!-- <el-button :icon="Delete" @click="reset">
                            重置
                        </el-button> -->
                        <el-button
                            v-if="showCollapse"
                            type="primary"
                            link
                            class="search-isOpen"
                            @click="collapsed = !collapsed"
                        >
                            {{ collapsed ? '展开' : '合并' }}
                            <el-icon class="el-icon--right">
                                <!-- <component
                                    :is="collapsed ? ArrowDown : ArrowUp"
                                ></component> -->
                                <svg-icon
                                    :icon-class="collapsed ? 'down' : 'up'"
                                />
                            </el-icon>
                        </el-button>
                    </div>
                </GridItem>
            </Grid>
        </el-form>
    </div>
</template>
<style lang="scss" scoped>
.operation {
    text-align: right;
}
</style>
