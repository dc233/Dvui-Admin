<template>
    <el-drawer
        custom-class="drawer-class"
        :model-value="gobalStore.showDrawer"
        title="系统配置"
        size="15%"
        :lock-scroll="true"
        @close="closeDrawer"
    >
        <el-scrollbar height="90vh" class="wrapper">
            <!-- <el-divider content-position="center">菜单主题</el-divider>
            <div style="margin-bottom: 60px">
                <StyleExample
                    :theme-list="styleExampleList"
                    :value="gobalStore.menuTheme"
                    @change="switchMenuThmem"
                />
            </div> -->
            <el-divider content-position="center">布局模式</el-divider>
            <div>
                <StyleExample
                    :theme-list="layoutExampleList"
                    :value="gobalStore.layoutMode"
                    @change="switchLayoutmode"
                />
            </div>
            <div style="margin-top: 60px">
                <el-divider content-position="center">系统主题</el-divider>
                <div class="colors-wrapper">
                    <div
                        v-for="(item, index) of themeColorList"
                        :key="index"
                        class="color-wrapper"
                        :class="{ circle: item === gobalStore.color }"
                        :style="{ 'background-color': item }"
                        @click="switchColor(item)"
                    ></div>
                </div>
                <div class="color-diy">
                    <el-color-picker
                        :model-value="gobalStore.color"
                        size="small"
                        @change="switchColor"
                    />
                </div>
            </div>
            <div>
                <el-divider content-position="center">界面功能</el-divider>
                <!-- <div class="setting-item-wrapper">
                    <span>头部反转色</span>
                    <el-switch> </el-switch>
                </div>
                <div class="setting-item-wrapper">
                    <span>固定头部和多页签</span>
                    <el-switch> </el-switch>
                </div> -->
                <div class="setting-item-wrapper">
                    <span>标签页持久化</span>
                    <el-switch
                        v-model="settings.keepAlive"
                        active-text="开"
                        inactive-text="关"
                        inline-prompt
                        @change="cachepageChange"
                    >
                    </el-switch>
                </div>
                <!-- <div class="setting-item-wrapper">
                    <span>固定头部和多页签</span>
                    <el-switch
                        v-model="settings.keepAlive"
                        active-text="开"
                        inactive-text="关"
                        inline-prompt
                        @change="cachepageChange"
                    >
                    </el-switch>
                </div> -->
                <div class="setting-item-wrapper">
                    <span>左右布局侧边栏反转色</span>
                    <el-switch
                        v-model="settings.menuTheme"
                        active-text="开"
                        inactive-text="关"
                        active-value="dark"
                        inactive-value="light"
                        inline-prompt
                        @change="switchMenuThmem"
                    >
                    </el-switch>
                </div>
                <!-- <div class="setting-item-wrapper">
                    <span>固定底部</span>
                    <el-switch> </el-switch>
                </div> -->
            </div>
            <div>
                <el-divider content-position="center">界面显示</el-divider>
                <div class="setting-item-wrapper">
                    <span>页面切换动画</span>
                    <el-switch
                        v-model="settings.animate"
                        active-text="开"
                        inactive-text="关"
                        inline-prompt
                        @change="animateChange"
                    />
                </div>
                <div class="setting-item-wrapper">
                    <span>页面切换动画类型</span>
                    <el-select
                        v-model="settings.animateMode"
                        placeholder="请选择动画类型"
                        style="width: 100px"
                        @change="animateModeChange"
                    >
                        <el-option
                            v-for="item in gobalStore.page.animateModeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div style="padding-top: 20px">
                <el-button
                    type="danger"
                    style="width: 100%"
                    @click="clearStore"
                >
                    <el-icon class="mini-right" :size="15">
                        <svg-icon icon-class="clear" />
                    </el-icon>
                    清空缓存并返回登录页</el-button
                >
            </div>
        </el-scrollbar>
    </el-drawer>
</template>

<script setup lang="ts" name="SettingDrawer">
import { reactive } from 'vue';
import { useGlobalStore } from '@/store/global';
import { userStore } from '@/store/user';
import StyleExample from './StyleExample.vue';
import { themeColorList } from '@/setting/theme.ts';
import { usePrimaryColor } from '@/hook/index';
// import LeftBg from '@/assets/img/bg_img.webp';
import { setThemeColor, setThemeLayout, setAnimateType } from '@/utils';
const gobalStore = useGlobalStore();
const user = userStore();
// const styleExampleList = reactive([
//     {
//         leftBg: '#000000',
//         rightTopBg: '#ffffff',
//         rightBottomBg: '#f5f5f5',
//         checked: false,
//         themeId: 'dark-side',
//         tipText: '深色',
//         value: 'dark',
//     },
//     {
//         leftBg: '#ffffff',
//         rightTopBg: '#ffffff',
//         rightBottomBg: '#d4d4d4',
//         checked: true,
//         themeId: 'light',
//         tipText: '浅色',
//         value: 'light',
//     },
//     {
//         leftBg: `url(${LeftBg})`,
//         rightTopBg: '#ffffff',
//         rightBottomBg: '#d4d4d4',
//         checked: true,
//         themeId: 'diybg',
//         tipText: '背景',
//         value: 'diybg',
//     },
// ]);

const layoutExampleList = reactive([
    {
        leftBg: '#000000',
        rightTopBg: '#d4d4d4',
        rightBottomBg: '#d4d4d4',
        checked: true,
        value: 'ltr',
        tipText: '左右',
    },
    {
        leftBg: '#d4d4d4',
        rightTopBg: '#ffffff',
        rightBottomBg: '#d4d4d4',
        checked: false,
        value: 'ttb',
        class: 'extra-class',
        tipText: '上下',
    },
    {
        leftBg: '#000000',
        rightTopBg: '#d4d4d4',
        rightBottomBg: '#d4d4d4',
        checked: false,
        value: 'lcr',
        class: 'extra-class-1',
        tipText: '分栏',
    },
]);

const settings = reactive({
    animate: gobalStore.page.animate,
    animateMode: gobalStore.page.animateMode,
    keepAlive: gobalStore.keepAlive,
    menuTheme: gobalStore.menuTheme,
});

const closeDrawer = () => {
    gobalStore.updateShowdrawer(false);
};
// 改变菜单颜色
const switchMenuThmem = (val: string) => {
    console.log(val);
    gobalStore.updateMenuTheme(val);
};
// 改变布局模式
const switchLayoutmode = (val: string) => {
    gobalStore.updateLayoutmode(val);
    setThemeLayout(val);
};
// 改变系统主题颜色
const switchColor = (val: string) => {
    gobalStore.updateColor(val);
    usePrimaryColor(val);
    setThemeColor(val);
};
// 禁用系统动画
const animateChange = (value): void => {
    gobalStore.updateAnimate(value);
};
// 设置系统动画
const animateModeChange = (value): void => {
    gobalStore.updateAnimatemode(value);
    setAnimateType(value);
};
// 是否缓存页面
const cachepageChange = (value): void => {
    gobalStore.uodataCachepage(value);
};
// 清除所有缓存
const clearStore = (): void => {
    user.resetUserinfo(); // 清除全部缓存信息并回退到登录页
    gobalStore.updateShowdrawer(false);
};
</script>

<style lang="scss">
.drawer-class {
    .el-drawer__header {
        margin-bottom: 0;
    }
}

.setting-item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
}
.setting-flexlayout {
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    .setting-layout-drawer {
        width: 25%;
        p {
            text-align: center;
        }
        .active-border {
            border: 2px solid var(--el-color-primary) !important;
        }
        .drawer-bg {
            padding: 8px;
            border: 2px solid #e3e6eb;
            .drawer-icon {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
            }
        }
    }
}
.colors-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .color-wrapper {
        width: 20px;
        height: 20px;
        border-radius: 2px;
        margin: 10px 7px;
    }
    .circle::after {
        content: '';
        display: block;
        margin: 0 auto;
        margin-top: 25px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--el-color-primary);
        text-align: center;
    }
}
.color-diy {
    padding: 10px 7px;
}
</style>
