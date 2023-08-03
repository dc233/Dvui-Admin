<template>
    <div class="content-layout">
        <el-card class="diy-card m-b-10px">
            <template #header>
                <div class="card-header">
                    <span>工作台</span>
                    <!-- <el-button class="button" text>时间</el-button> -->
                </div>
            </template>
            <div class="flex flex-justify-between flex-items-center p-10px">
                <div class="flex flex-justify-start flex-items-center">
                    <el-avatar
                        :size="80"
                        src="https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image"
                    />
                    <div class="p-l-10px">
                        <p class="f-20">早安，Admin，开始您一天的工作吧！</p>
                        <p class="text-regular">
                            今日阴转大雨，15℃ - 25℃，出门记得带伞哦。
                        </p>
                    </div>
                </div>
                <div class="flex flex-justify-start flex-items-center">
                    <div class="flex flex-col flex-items-center">
                        <div
                            class="flex flex-justify-between flex-items-center p-r-10px"
                        >
                            <el-icon :size="30">
                                <svg-icon icon-class="project" />
                            </el-icon>
                            <span class="p-l-10px">项目数</span>
                        </div>

                        <div class="f-24 font-400 p-t-10px">16</div>
                    </div>
                    <div class="flex flex-col flex-items-center p-l-20px">
                        <div
                            class="flex flex-justify-between flex-items-center p-r-10px"
                        >
                            <el-icon :size="30">
                                <svg-icon icon-class="to-do" />
                            </el-icon>
                            <span class="p-l-10px">待办</span>
                        </div>

                        <div class="f-24 font-400 p-t-10px">10</div>
                    </div>
                    <div class="flex flex-col flex-items-center p-l-20px">
                        <div
                            class="flex flex-justify-between flex-items-center p-r-10px"
                        >
                            <el-icon :size="30">
                                <svg-icon icon-class="message" />
                            </el-icon>
                            <span class="p-l-10px">消息</span>
                        </div>

                        <div class="f-24 font-400 p-t-10px">35</div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-row :gutter="10">
            <el-col :span="14">
                <el-card class="diy-card m-b-10px">
                    <template #header>
                        <div class="card-header">
                            <span>项目技术栈</span>
                            <el-link type="primary">更多</el-link>
                        </div>
                    </template>
                    <div class="h-360px grid-three-layout p-10px">
                        <div class="p-10px project-box">
                            <a href="https://cn.vuejs.org/" target="_blank">
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon icon-class="vues" />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >Vue</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    一套用于构建用户界面的渐进式框架
                                </p>
                                <p class="author text-primary">
                                    尤雨溪 - Evan You
                                </p>
                            </a>
                        </div>
                        <div class="p-10px project-box">
                            <a
                                href="https://www.typescriptlang.org/"
                                target="_blank"
                            >
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon icon-class="typescript" />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >TypeScript</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    JavaScript类型的超集，它可以编译成纯JavaScript
                                </p>
                                <p class="author text-primary">
                                    微软 - Microsoft
                                </p>
                            </a>
                        </div>
                        <div class="p-10px project-box">
                            <a href="https://cn.vitejs.dev/" target="_blank">
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon icon-class="vite" />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >Vite</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    下一代前端开发与构建工具
                                </p>
                                <p class="author text-primary">
                                    尤雨溪 - Evan You
                                </p>
                            </a>
                        </div>
                        <div class="p-10px project-box">
                            <a
                                href="https://element-plus.gitee.io/zh-CN/"
                                target="_blank"
                            >
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon
                                            icon-class="element-plus-logo"
                                        />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >Element-Plus</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    基于 Vue 3，面向设计师和开发者的组件库
                                </p>
                                <p class="author text-primary">
                                    社区小伙伴支持
                                </p>
                            </a>
                        </div>
                        <div class="p-10px project-box">
                            <a
                                href="https://pinia.web3doc.top/"
                                target="_blank"
                            >
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon icon-class="pinia" />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >Pinia</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    vue状态管理框架，支持vue2、vue3
                                </p>
                                <p class="author text-primary">Posva</p>
                            </a>
                        </div>
                        <div class="p-10px project-box">
                            <a href="https://uno.antfu.me/" target="_blank">
                                <div class="techlog">
                                    <el-icon :size="40">
                                        <svg-icon icon-class="unocss" />
                                    </el-icon>
                                    <span
                                        class="f-18 font-bold p-l-10px text-primary"
                                        >UnoCss</span
                                    >
                                </div>
                                <p class="text-regular techlog-info">
                                    下一代实用优先的CSS框架
                                </p>
                                <p class="author text-primary">Anthony Fu</p>
                            </a>
                        </div>
                    </div>
                </el-card>
                <el-card>
                    <div class="card-header">
                        <span>消息</span>
                        <el-link type="primary">更多</el-link>
                    </div>
                    <div class="h-280px">
                        <el-scrollbar>
                            <div
                                v-for="(item, index) in messageList"
                                :key="index"
                                class="message-layout"
                            >
                                <el-avatar
                                    class="avatar"
                                    :size="50"
                                    :src="item.avatr"
                                />
                                <div class="message-info">
                                    <p class="message-title">
                                        {{ item.message }}
                                    </p>
                                    <p class="message-time text-regular">
                                        {{ item.time }}
                                    </p>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="diy-card m-b-10px">
                    <template #header>
                        <div class="card-header">
                            <span>快捷操作</span>
                        </div>
                    </template>
                    <div class="h-280px grid-three-layout p-10px">
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="k-zhitai" />
                            </el-icon>
                            <div class="p-t-10px">主控台</div>
                        </div>
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="x-gl" />
                            </el-icon>
                            <div class="p-t-10px">系统管理</div>
                        </div>
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="q-xian" />
                            </el-icon>
                            <div class="p-t-10px">权限管理</div>
                        </div>
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="z-jian" />
                            </el-icon>
                            <div class="p-t-10px">组件</div>
                        </div>
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="b-ge" />
                            </el-icon>
                            <div class="p-t-10px">表格</div>
                        </div>
                        <div class="action-item">
                            <el-icon :size="40">
                                <svg-icon icon-class="t-biao" />
                            </el-icon>
                            <div class="p-t-10px">图表</div>
                        </div>
                    </div>
                </el-card>
                <el-card>
                    <div class="h-380px">
                        <img
                            class="image-web"
                            src="@image/web_devices.png"
                            alt=""
                        />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="workplace">
import { ref } from 'vue';
const messageList = ref([
    {
        avatr: 'https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image',
        message: 'Admin 刚才把工作台页面随便写了一些，凑合能看了！',
        time: '2022-11-11',
    },
    {
        avatr: 'https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image',
        message: 'Admin 正在忙于为Dvui-admin写项目说明文档！',
        time: '2022-11-11',
    },
    {
        avatr: 'https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image',
        message: 'Admin  准备为Dvui-admin 1.0的发布做充分的准备工作！',
        time: '2022-11-11',
    },
    {
        avatr: 'https://p3-passport.byteacctimg.com/img/user-avatar/0b8f05ef7e7f67af2d09f86845ea5757~300x300.image',
        message: '@yanbowe 向Dvui-admin 提交了一个bug，多标签栏不会自适应。',
        time: '2022-11-11',
    },
]);
</script>
<style lang="scss">
.diy-card {
    .el-card__header {
        padding: 10px;
    }
    .el-card__body {
        padding: 0;
    }
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.project-box {
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    a {
        display: flex;
        flex-direction: column;
        text-decoration: none;
    }
    &:hover {
        transition: box-shadow 0.3s ease-in 0.1s;
        box-shadow: var(--el-box-shadow);
    }
    .techlog {
        display: flex;
        align-items: center;
    }
    .techlog-info {
        height: 40px;
    }
    .author {
        text-align: right;
        align-self: flex-end;
    }
}
.action-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
}
.image-web {
    width: 100%;
    height: 380px;
    object-fit: contain;
}
.message-layout {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color);
    margin-top: 10px;
    .message-info {
        width: 100%;
        padding-left: 20px;
        p {
            margin: 0;
        }
        .message-title {
            // padding: 10px 0;
        }
        .message-time {
            text-align: right;
            padding: 10px 0;
        }
    }
}
</style>
