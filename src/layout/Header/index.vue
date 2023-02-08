<template>
    <header class="header_layout">
        <div class="flex-spacewent header-content">
            <div v-if="!layoutMode" class="left-header" @click="switchMenu">
                <el-icon color="var(--el-text-color-regular)" :size="20">
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
            <div class="right-header">
                <div class="header-circle">
                    <el-button circle>
                        <el-icon
                            color="var(--el-text-color-regular)"
                            :size="14"
                        >
                            <svg-icon icon-class="search" />
                        </el-icon>
                    </el-button>
                </div>
                <div class="header-circle">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        content="Bottom Center prompts info"
                        placement="bottom"
                    >
                        <template #content>
                            {{
                                gobalStore.theme === 'dark'
                                    ? '点击切换为亮色模式'
                                    : '点击切换为暗黑模式'
                            }}</template
                        >
                        <el-button circle @click="switchTheme()">
                            <el-icon
                                color="var(--el-text-color-regular)"
                                :size="14"
                            >
                                <svg-icon
                                    :icon-class="
                                        gobalStore.theme === 'dark'
                                            ? 'dark'
                                            : 'day'
                                    "
                                />
                            </el-icon>
                        </el-button>
                    </el-tooltip>
                </div>
                <div class="header-circle">
                    <el-badge is-dot class="item">
                        <el-button circle>
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
                    <el-button circle @click="openDrawer">
                        <el-icon
                            color="var(--el-text-color-regular)"
                            :size="14"
                        >
                            <svg-icon icon-class="setting-two" />
                        </el-icon>
                    </el-button>
                </div>
                <el-dropdown>
                    <div class="flex-spacewent header-avart">
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
import LevelSidebar from '../sidebar/levelSideBar.tsx';
import { useGlobaltheme } from '@/hook';
const { activePadding } = useBasicLayout();
const { switchTheme } = useGlobaltheme();
const gobalStore = useGlobalStore();
const user = userStore();
const layoutMode = computed(() => gobalStore.layoutMode === 'ttb');

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
    background-color: var(--el-bg-color);
    // box-shadow: 0 1px 2px #00152914;
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
        .left-header:hover {
            background-color: var(--el-fill-color-light);
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
                }
            }
            .header-circle {
                margin-left: 10px;
            }
        }
    }
}
</style>
