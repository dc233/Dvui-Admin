<template>
    <header class="header_layout">
        <div class="flex flex-justify-between flex-items-center header-content">
            <div v-if="!layoutMode" class="left-header" @click="switchMenu">
                <el-icon :size="20">
                    <svg-icon
                        :icon-class="
                            gobalStore.iScollapse ? 'menu-unfold' : 'menu-fold'
                        "
                    />
                </el-icon>
            </div>
            <div v-if="layoutMode" class="left-logo">
                <a href="#">
                    <img src="../../assets/img/logo.png" alt="" />
                    <span>DVUI管理系统</span>
                </a>
            </div>
            <div v-if="layoutMode" class="left-meneu">
                <LevelSidebar />
            </div>
            <div class="right-header pr-20px">
                <div class="header-circle">
                    <el-button circle dark :color="btnColor">
                        <el-icon
                            color="var(--el-text-color-regular)"
                            :size="14"
                        >
                            <svg-icon icon-class="search" />
                        </el-icon>
                    </el-button>
                </div>
                <div class="header-circle">
                    <el-badge is-dot class="item">
                        <el-button circle dark :color="btnColor">
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon icon-class="remind" />
                            </el-icon>
                        </el-button>
                    </el-badge>
                </div>
                <div class="header-circle">
                    <el-button
                        circle
                        dark
                        :color="btnColor"
                        @click="openDrawer"
                    >
                        <el-icon
                            color="var(--el-text-color-regular)"
                            :size="14"
                        >
                            <svg-icon icon-class="setting-two" />
                        </el-icon>
                    </el-button>
                </div>
                <el-dropdown>
                    <div
                        class="flex flex-justify-between flex-items-center header-avart"
                    >
                        <el-avatar
                            :size="30"
                            src="https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image"
                        />
                        <span class="avart-title">{{
                            user.userinfo.username
                        }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-icon :size="14">
                                    <svg-icon icon-class="user" />
                                </el-icon>
                                用户中心</el-dropdown-item
                            >
                            <el-dropdown-item @click="loginout">
                                <el-icon :size="14">
                                    <svg-icon icon-class="power" />
                                </el-icon>
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts" name="Header">
import { computed } from 'vue';
import { useGlobalStore } from '@/store/global';
import { userStore } from '@/store/user';
import { ElMessageBox } from 'element-plus';
import { useBasicLayout } from '@/composables/layouts';
import LevelSidebar from '../sidebar/levelSideBar.js';

const { activePadding } = useBasicLayout();
const gobalStore = useGlobalStore();
const user = userStore();
const layoutMode = computed(() => gobalStore.layoutMode === 'transverse');

// 切换菜单是否折叠
const switchMenu = () => {
    const iScollapse = !gobalStore.iScollapse;
    gobalStore.updateCollapse(iScollapse);
};
// 打开主题设置
const openDrawer = () => {
    gobalStore.updateShowdrawer(!gobalStore.showDrawer);
};
// 退出登录
const loginout = () => {
    ElMessageBox.confirm('您确定要退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            user.loginout();
        })
        .catch();
};

// 切换背景颜色
const bgColor = computed(() => {
    if (gobalStore.layoutMode === 'classic') {
        return 'var(--classic-bg)';
    } else {
        return 'var(--el-bg-color)';
    }
});
// 切换文字颜色
const textColor = computed(() => {
    if (gobalStore.layoutMode === 'classic') {
        return '#fff';
    } else {
        return 'var(--el-text-color-primary)';
    }
});
// 按钮背景颜色
const btnColor = computed(() => {
    if (gobalStore.theme === 'auto') {
        if (
            gobalStore.layoutMode === 'classic' &&
            gobalStore.preferScolorScheme === 'light'
        ) {
            return '#fff';
        } else {
            return '';
        }
    } else if (gobalStore.theme === 'dark') {
        return '';
    } else {
        if (gobalStore.layoutMode === 'classic') {
            return '#fff';
        } else {
            return '';
        }
    }
});
</script>

<style lang="scss" scoped>
.header_layout {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    min-width: 900px;
    height: 48px;
    padding-left: v-bind(activePadding);
    box-sizing: border-box;
    background-color: v-bind(bgColor);
    color: v-bind(textColor);
    // box-shadow: 0 1px 2px #00152914;
    // background-color: #fff;
    // webkit-backdrop-filter: saturate(50%) blur(4px);
    border-bottom: 1px solid var(--el-menu-border-color);
    z-index: 98;
    transition-property: padding-left;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    .header-content {
        height: 100%;
        .left-header {
            width: 40px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .left-logo {
            a {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200px;
                height: 100%;
                text-decoration: none;
                img {
                    width: 48px;
                    height: auto;
                }
                span {
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--el-text-color-primary);
                }
            }
        }
        .left-meneu {
            flex: 1;
            height: 46px;
            overflow: hidden;
        }
        .right-header {
            display: flex;
            align-items: center;
            height: 100%;
            cursor: pointer;
            .header-avart {
                height: 100%;
                padding-left: 10px;
                .avart-title {
                    display: inline-block;
                    width: 60px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-left: 6px;
                    color: v-bind(textColor);
                }
            }
            .header-circle {
                margin-left: 10px;
            }
        }
    }
}
</style>
