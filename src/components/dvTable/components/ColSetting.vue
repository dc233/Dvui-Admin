<template>
    <!-- 列设置 -->
    <el-drawer
        v-model="drawerVisible"
        title="表格设置"
        size="800px"
        @open="handelOpen"
    >
        <div class="mb">
            <el-alert
                show-icon
                title="表格配置"
                type="warning"
                description="保存表格配置后，会缓存配置"
                :closable="false"
            />
        </div>

        <el-form :inline="true" :model="setting">
            <el-form-item label="表格尺寸">
                <el-radio-group v-model="setting.size">
                    <el-radio-button label="small"> 小</el-radio-button>
                    <el-radio-button label="default">中</el-radio-button>
                    <el-radio-button label="large">大</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="样式">
                <el-checkbox v-model="setting.stripe" label="斑马纹" border />
            </el-form-item>
            <el-form-item label="表格边框">
                <el-checkbox
                    v-model="setting.border"
                    label="是否带有纵向边框"
                    border
                />
            </el-form-item>
        </el-form>
        <div class="table-main">
            <el-table
                ref="myElement"
                :data="colSetting"
                :border="true"
                row-key="prop"
                default-expand-all
                :tree-props="{ children: '_children' }"
                size="small"
            >
                <el-table-column width="80" align="center">
                    <template #default>
                        <el-icon
                            class="cursor-move"
                            color="var(--el-text-color-regular)"
                            :size="14"
                        >
                            <svg-icon icon-class="drag" />
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="label" align="center" label="列名" />
                <el-table-column
                    v-slot="scope"
                    prop="isShow"
                    align="center"
                    label="显示"
                >
                    <el-switch v-model="scope.row.isShow"></el-switch>
                </el-table-column>
                <el-table-column
                    v-slot="scope"
                    prop="sortable"
                    align="center"
                    label="排序"
                >
                    <el-switch v-model="scope.row.sortable"></el-switch>
                </el-table-column>
                <template #empty>
                    <el-empty
                        :image-size="100"
                        description="暂无配置的列数据"
                    />
                </template>
            </el-table>
        </div>
        <template #footer>
            <div style="flex: auto">
                <el-button>重置</el-button>
                <el-button type="primary" @click="onSave">保存</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ref, computed, onMounted, nextTick } from 'vue';
import { ColumnProps } from '@/components/dvTable/interface';
import Sortable from 'sortablejs';

interface TableSetting {
    size: string;
    stripe: boolean;
    border: boolean;
}
interface ProTableSettingProps {
    colSetting: ColumnProps[];
    tableSetting: TableSetting;
}
const props = withDefaults(defineProps<ProTableSettingProps>(), {
    colSetting: () => [],
    tableSetting: () => ({
        size: 'default',
        stripe: true,
        border: true,
    }),
});

const emit = defineEmits(['update:col-setting', 'update:table-setting']);

const setting = computed({
    get() {
        return props.tableSetting;
    },
    set(setting: TableSetting) {
        emit('update:table-setting', setting);
    },
});

const myElement = ref();

const drawerVisible = ref<boolean>(false);

// 初始话拖拽插件
const initDropTable = () => {
    console.log(myElement);
    const el = myElement.value.$el.querySelector('.el-table__body tbody');
    Sortable.create(el, {
        handle: '.cursor-move', //设置指定列作为拖拽
        animation: 150,
        onEnd(evt: any) {
            const { newIndex, oldIndex } = evt;
            const tableData = props.colSetting;
            const currRow = tableData.splice(oldIndex, 1)[0];
            tableData.splice(newIndex, 0, currRow);
            emit('update:col-setting', tableData);
            console.log(tableData);
            // console.log(newIndex);
            // console.log(oldIndex);
            // console.log(props.colSetting);
        },
    });
};
const openColSetting = () => {
    drawerVisible.value = true;
};
const onSave = () => {
    console.log(myElement.value);
};

function handelOpen() {
    initDropTable();
}
// onMounted(() => {
//     nextTick(() => {
//         initDropTable();
//     });
// });
defineExpose({
    openColSetting,
});
</script>

<style scoped lang="scss">
.cursor-move {
    cursor: move;
}
</style>
