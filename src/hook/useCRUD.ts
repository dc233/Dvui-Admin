import { ref, computed } from 'vue';
import { EnumAction } from '@/enum';
import { DialogCrud } from './interface';
import { ElMessage } from 'element-plus';
import { useHandleData } from '@/hook/useHandleData';
type action = 'add' | 'edit' | 'view';
export default function ({
    name,
    doCreate,
    doDelete,
    doUpdate,
    refresh,
    filtrationParams,
}: DialogCrud) {
    const dialogVisible = ref(false);
    const dialogAction = ref<action>('add');
    const dialogTitle = computed(() => EnumAction[dialogAction.value] + name);
    const dialogLoading = ref(false);

    /** 新增 */
    function handleAdd() {
        dialogAction.value = 'add';
        dialogVisible.value = true;
    }
    /** 编辑 */
    function handleEdit() {
        dialogAction.value = 'edit';
        dialogVisible.value = true;
    }
    /**查看 */
    function handleView() {
        dialogAction.value = 'view';
        dialogVisible.value = true;
    }
    /**保存 */
    async function handleSave(value: object) {
        if (!['edit', 'add'].includes(dialogAction.value)) {
            dialogVisible.value = false;
            return;
        }
        console.log(dialogAction.value);
        const actions: action = {
            add: {
                api: () =>
                    doCreate(
                        filtrationParams ? filtrationParams(value) : value,
                    ),
                cb: (msg: string) => ElMessage.success(msg || '新增成功'),
            },
            edit: {
                api: () =>
                    doUpdate(
                        filtrationParams ? filtrationParams(value) : value,
                    ),
                cb: (msg: string) => ElMessage.success(msg || '编辑成功'),
            },
        };

        const action = actions[dialogAction.value];
        try {
            dialogLoading.value = true;
            const { data } = await action.api();
            const { msg } = data;
            action.cb(msg);
            dialogLoading.value = dialogVisible.value = false;
            data && refresh();
        } catch (error) {
            dialogLoading.value = false;
        } finally {
            dialogLoading.value = false;
        }
    }
    /**删除 */
    async function handleDelet(value: object) {
        await useHandleData(
            doDelete,
            {
                id: value.id,
            },
            `要删除当前数据吗？`,
        );
        refresh();
    }
    return {
        dialogVisible,
        dialogTitle,
        dialogLoading,
        handleAdd,
        handleEdit,
        handleView,
        handleSave,
        handleDelet,
    };
}
