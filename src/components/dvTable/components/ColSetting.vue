<template>
    <!-- 列设置 -->
    <el-drawer
        v-model="drawerVisible"
        title="表格设置"
        size="800px"
        @open="handelOpen"
    >
        <div v-loading="loading">
            <div class="mb">
                <el-alert
                    show-icon
                    title="表格配置"
                    type="warning"
                    description="对表格进行配置后，请点击保存后才会缓存表格配置！如果想清除缓存，直接点击右下角的重置按钮即可"
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
                    <el-checkbox
                        v-model="setting.stripe"
                        label="斑马纹"
                        border
                    />
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
                    stripe
                    default-expand-all
                    :tree-props="{ children: '_children' }"
                    size="small"
                >
                    <el-table-column width="80" align="center">
                        <template #default="scope">
                            <el-icon
                                v-if="
                                    scope.row.prop !== 'operation' &&
                                    !['selection', 'index', 'expand'].includes(
                                        scope.row.type,
                                    )
                                "
                                class="cursor-move"
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="drag" />
                            </el-icon>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" align="center" label="列名">
                        <template #default="scope">
                            {{ scope.row.label || '复选框' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" align="center" label="列宽">
                        <template #default="scope">
                            <el-input-number
                                v-model="scope.row.width"
                                :min="0"
                                :max="600"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="isShow" align="center" label="显示">
                        <template #default="scope">
                            <el-switch
                                v-if="
                                    scope.row.prop !== 'operation' &&
                                    !['selection', 'index', 'expand'].includes(
                                        scope.row.type,
                                    )
                                "
                                v-model="scope.row.isShow"
                            ></el-switch>
                            <div v-else>
                                {{ scope.row.isShow ? '显示' : '不显示' }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-slot="scope"
                        prop="sortable"
                        align="center"
                        label="排序"
                    >
                        <el-switch
                            v-if="
                                scope.row.prop !== 'operation' &&
                                !['selection', 'index', 'expand'].includes(
                                    scope.row.type,
                                )
                            "
                            v-model="scope.row.sortable"
                        ></el-switch>
                        <div v-else>
                            {{ '无此操作' }}
                        </div>
                    </el-table-column>
                    <template #empty>
                        <el-empty
                            :image-size="100"
                            description="暂无配置的列数据"
                        />
                    </template>
                </el-table>
            </div>
        </div>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click="onSave">保存</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ref, computed, inject, onBeforeUnmount, nextTick } from 'vue';
import { ColumnProps } from '@/components/dvTable/interface';
import Sortable from 'sortablejs';
import { setLocal } from '@/utils';
import { useLoading } from '@/hook';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';
const { loading, startLoading, endLoading } = useLoading();
// table组件名称
const tablename = inject('tableName');
// SortableJS实例
const sortableInstance = ref(null);
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

const emit = defineEmits([
    'update:col-setting',
    'update:table-setting',
    'reset-table',
]);

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
    sortableInstance.value = new Sortable(el, {
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
// 表格配置缓存
const onSave = () => {
    if (!tablename) return ElMessage.error('缺少表格名称，无法缓存表格配置！');
    startLoading();
    // 深拷贝数组
    const newColumns = cloneDeep(props.colSetting);
    const colmuns = newColumns.map((item) => {
        if (item.render) {
            item.render = true;
        }
        return item;
    });
    setLocal(tablename, {
        tableColum: colmuns,
        tableSetting: props.tableSetting,
    });
    setTimeout(() => {
        ElMessage.success('保存成功');
        endLoading();
    }, 1000);
};
// 重置表格配置
const reset = () => {
    if (!tablename) return ElMessage.error('缺少表格名称，无法重置表格配置！');
    startLoading();
    emit('reset-table');
    setTimeout(() => {
        ElMessage.success('重置成功');
        endLoading();
    }, 1000);
};
// 表格配置框打开生成SortableJS实例
function handelOpen() {
    initDropTable();
}

onBeforeUnmount(() => {
    // 销毁SortableJS实例
    if (sortableInstance.value) {
        sortableInstance.value.destroy();
    }
});
defineExpose({
    openColSetting,
});
</script>

<style scoped lang="scss">
.cursor-move {
    cursor: move;
}
</style>
