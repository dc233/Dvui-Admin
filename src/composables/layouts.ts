import { computed } from 'vue';
import { useGlobalStore } from '@/store/global';

export function useBasicLayout() {
    const gobalStore = useGlobalStore();
    // 全局布局的padding计算
    const activePadding = computed(() => {
        if (gobalStore.layoutMode === 'ltr') {
            return gobalStore.iScollapse ? '65px' : '210px';
        } else if (gobalStore.layoutMode === 'ttb') {
            return '0px';
        } else if (gobalStore.layoutMode === 'lcr') {
            return gobalStore.iScollapse ? '65px' : '275px';
        } else {
            return gobalStore.iScollapse ? '65px' : '210px';
        }
    });

    return {
        activePadding,
    };
}
