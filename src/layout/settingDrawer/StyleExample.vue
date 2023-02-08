<template>
    <el-row justify="space-between">
        <el-col v-for="item in themeList" :key="item.themeId" :span="8">
            <div
                class="style-example-container"
                :class="[
                    { 'circle-tip': item.value === value },
                    `${item.class}`,
                ]"
                @click="handleClik(item.value)"
            >
                <div
                    class="left"
                    :style="{
                        background: item.leftBg,
                        backgroundSize: 'cover',
                    }"
                ></div>
                <div class="right">
                    <div
                        class="right-top"
                        :style="{ 'background-color': item.rightTopBg }"
                    ></div>
                    <div
                        class="right-bottom"
                        :style="{ 'background-color': item.rightBottomBg }"
                    ></div>
                </div>
                <div
                    v-if="item.tipText"
                    style="
                        font-size: 12px;
                        text-align: center;
                        padding-top: 20px;
                    "
                >
                    {{ item.tipText }}
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'StyleExample',
    props: {
        themeList: {
            type: Array,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    methods: {
        handleClik(val) {
            this.$emit('change', val);
        },
    },
});
</script>

<style lang="scss" scoped>
$border-radius: 4px;
.style-example-container {
    width: 50px;
    height: 40px;
    margin: 0 auto;
    border-radius: $border-radius;
    background-color: transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .left {
        border-top-left-radius: $border-radius;
        border-bottom-left-radius: $border-radius;
        display: inline-block;
        width: 30%;
        height: 100%;
    }
    .right {
        border-top-right-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
        display: inline-block;
        width: 70%;
        height: 100%;
        .right-top {
            height: 20%;
            border-top-right-radius: $border-radius;
        }
        .right-bottom {
            height: 80%;
            border-bottom-right-radius: $border-radius;
        }
    }
}
.circle-tip::after {
    content: '';
    display: block;
    margin: 0 auto;
    margin-top: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--el-color-primary);
    text-align: center;
}
.extra-class {
    .right {
        width: 100%;
        .right-top {
            border-top-left-radius: $border-radius;
            border-top-right-radius: $border-radius;
        }
        .right-bottom {
            border-bottom-left-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
        }
    }
    .left {
        width: 0;
    }
}
.extra-class-1 {
    .left {
        width: 30%;
    }
    .left::after {
        position: relative;
        background-color: #828282;
        top: 0;
        left: 5px;
        content: '';
        display: inline-block;
        width: 10px;
        height: 100%;
    }
}
</style>
