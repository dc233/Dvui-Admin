<template>
    <div style="height: 850px">
        <PageSplit
            :distribute="0.2"
            :line-thickness="7"
            :is-vertical="false"
            :first-min-value="300"
            background-color="#e5e6eb"
            hover-color="#e5e6eb"
            :is-first-component-masked="true"
            @resizeLineStartMove="onresizeLineStartMove"
            @resizeLineMove="onResizeLineMove"
            @resizeLineEndMove="onresizeLineEndMove"
        >
            <template #first>
                <h1>A</h1>
                <div class="w-200px h-400px bg-blue"></div>
            </template>
            <template #second>
                <PageSplit
                    :distribute="0.5"
                    :line-thickness="8"
                    :is-vertical="true"
                    :first-min-value="300"
                    :second-min-value="300"
                    background-color="#e5e6eb"
                    hover-color="#e5e6eb"
                    :is-first-component-masked="true"
                    @resizeLineStartMove="onresizeLineStartMove"
                    @resizeLineMove="onResizeLineMove"
                    @resizeLineEndMove="onresizeLineEndMove"
                >
                    <template #first>
                        <h1>B</h1>
                    </template>
                    <template #second>
                        <h1>C</h1>
                    </template>
                </PageSplit>
            </template>
        </PageSplit>
    </div>
</template>

<script setup lang="ts">
import PageSplit from '@/components/dvPageSplit/index.vue';

const onresizeLineStartMove = () => {};

const onResizeLineMove = () => {};

const onresizeLineEndMove = () => {};
</script>

<style lang="scss" scoped></style>
