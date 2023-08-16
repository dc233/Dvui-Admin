<script setup lang="ts" name="dvSearchFormItem">
import { App, computed, inject, ref } from 'vue';
import { handleProp } from '@/utils';
import { ColumnProps } from '@/components/dvTable/interface';
import {
    ElInput,
    ElCalendar,
    ElSelect,
    ElOption,
    ElSelectV2,
    ElDatePicker,
    ElTreeSelect,
} from 'element-plus';

import { SearchType } from '@/components/dvTable/interface';
type SFCWithInstall<T> = T & { install(app: App): void };
interface SearchFormItem {
    column: ColumnProps;
    searchParam: { [key: string]: any };
}
const props = defineProps<SearchFormItem>();

// Re receive SearchParam
const _searchParam = computed(() => props.searchParam);

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
    return {
        label: props.column.fieldNames?.label ?? 'label',
        value: props.column.fieldNames?.value ?? 'value',
        children: props.column.fieldNames?.children ?? 'children',
    };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject('enumMap', ref(new Map()));
const columnEnum = computed(() => {
    let enumData = enumMap.value.get(props.column.prop);
    if (!enumData) return [];
    if (props.column.search?.el === 'el-select-v2' && props.column.fieldNames) {
        enumData = enumData.map((item: { [key: string]: any }) => {
            return {
                ...item,
                label: item[fieldNames.value.label],
                value: item[fieldNames.value.value],
            };
        });
    }
    return enumData;
});

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
    const label = fieldNames.value.label;
    const value = fieldNames.value.value;
    const children = fieldNames.value.children;
    const searchEl = props.column.search?.el;
    let searchProps = props.column.search?.props ?? {};
    if (searchEl === 'el-tree-select') {
        searchProps = {
            ...searchProps,
            props: { ...searchProps.props, label, children },
            nodeKey: value,
        };
    }
    if (searchEl === 'el-cascader') {
        searchProps = {
            ...searchProps,
            props: { ...searchProps.props, label, value, children },
        };
    }
    return searchProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
    const search = props.column.search;
    if (
        ['datetimerange', 'daterange', 'monthrange'].includes(
            search?.props?.type,
        ) ||
        search?.props?.isRange
    ) {
        return {
            rangeSeparator: '至',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
        };
    }
    const placeholder =
        search?.props?.placeholder ??
        (search?.el?.includes('input') ? '请输入' : '请选择');
    return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
    const search = props.column.search;
    return (
        search?.props?.clearable ??
        (search?.defaultValue == null || search?.defaultValue == undefined)
    );
});
// 渲染Element-plus组件
const is = computed(() => {
    const search = props.column.search;
    const elementTypeMap = {
        'el-input': ElInput,
        'el-select': ElSelect,
        'el-cascader': ElCalendar,
        'el-date-picker': ElDatePicker,
        'el-select-v2': ElSelectV2,
        'el-tree-select': ElTreeSelect,
    };

    // 默认 input 控件
    // let type = 'el-input';

    // 其他控件判断逻辑
    return elementTypeMap[`${search?.el as keyof typeof elementTypeMap}`];
});

// 渲染可控的Element-plus组件
function ElementComponents(el: SearchType) {
    const elementTypeMap = {
        'el-option': ElOption,
    };
    return elementTypeMap[el as keyof typeof elementTypeMap];
}

const eleStyle = computed(() => {
    const search = props.column.search;
    if (search?.el === 'el-date-picker') {
        return {
            width: '100%',
            display: 'inline-flex',
        };
    } else {
        return {
            width: '100%',
        };
    }
});
</script>

<template>
    <component
        :is="column.search?.render ?? is"
        v-bind="{
            ...handleSearchProps,
            ...placeholder,
            searchParam: _searchParam,
            clearable,
        }"
        v-model="_searchParam[column.search?.key ?? handleProp(column.prop!)]"
        :style="eleStyle"
        :data="column.search?.el === 'el-tree-select' ? columnEnum : []"
        :options="['el-cascader', 'el-select-v2'].includes(column.search?.el!) ? columnEnum : []"
    >
        <template
            v-if="column.search?.el === 'el-cascader'"
            #default="{ data }"
        >
            <span>{{ data[fieldNames.label] }}</span>
        </template>
        <template v-if="column.search?.el === 'el-select'">
            <component
                :is="ElementComponents('el-option')"
                v-for="(col, index) in columnEnum"
                :key="index"
                :label="col[fieldNames.label]"
                :value="col[fieldNames.value]"
            ></component>
        </template>
        <slot v-else></slot>
    </component>
</template>
