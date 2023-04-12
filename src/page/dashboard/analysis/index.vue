<template>
    <div class="content-layout">
        <el-row :gutter="10" class="mini-mb">
            <el-col :span="6">
                <MiniCard>
                    <template #header>
                        <div class="f-16-b text-primary">访问量</div>
                        <el-tag size="large">日</el-tag>
                    </template>
                    <template #content>
                        <dv-statistic :value="traffic"></dv-statistic>
                        <div class="mini-mt">
                            日同比 12.5%
                            <el-icon color="#5cb87a" :size="16">
                                <svg-icon icon-class="up-one" />
                            </el-icon>
                            周同比 5%
                            <el-icon color="#f56c6c" :size="16">
                                <svg-icon icon-class="down-one" />
                            </el-icon>
                        </div>
                    </template>
                    <template #footer>
                        <div class="text-regular">总访问量</div>
                        <div class="text-regular">280万</div>
                    </template>
                </MiniCard>
            </el-col>
            <el-col :span="6">
                <MiniCard>
                    <template #header>
                        <div class="f-16-b">销售额</div>
                        <el-tag size="large" type="success">月</el-tag>
                    </template>
                    <template #content>
                        <dv-statistic :value="sales" unit="元"></dv-statistic>
                        <div class="mini-mt">
                            <el-progress :percentage="80" :stroke-width="15" />
                        </div>
                    </template>
                    <template #footer>
                        <div class="text-regular">总销售额</div>
                        <div class="text-regular">1980万</div>
                    </template>
                </MiniCard>
            </el-col>
            <el-col :span="6">
                <MiniCard>
                    <template #header>
                        <div class="f-16-b">订单量</div>
                        <el-tag size="large" type="warning">周</el-tag>
                    </template>
                    <template #content>
                        <dv-statistic :value="2980"></dv-statistic>
                        <div class="mini-mt">
                            <el-progress
                                :percentage="40"
                                color="#e6a23c"
                                :stroke-width="15"
                            />
                        </div>
                    </template>
                    <template #footer>
                        <div class="text-regular">转化率</div>
                        <div class="text-regular">60%</div>
                    </template>
                </MiniCard>
            </el-col>
            <el-col :span="6">
                <MiniCard>
                    <template #header>
                        <div class="f-16-b">新增用户</div>
                        <el-tag size="large" type="danger">日</el-tag>
                    </template>

                    <template #content>
                        <dv-statistic :value="180" unit="位"></dv-statistic>
                        <div class="mini-mt">
                            日增长 3.5%
                            <el-icon color="#5cb87a" :size="16">
                                <svg-icon icon-class="up-one" />
                            </el-icon>
                            周增长 5%
                            <el-icon color="#f56c6c" :size="16">
                                <svg-icon icon-class="down-one" />
                            </el-icon>
                        </div>
                    </template>
                    <template #footer>
                        <div class="text-regular">总用户</div>
                        <div class="text-regular">100800人</div>
                    </template>
                </MiniCard>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="mini-mb">
            <el-col :span="16">
                <el-card>
                    <div class="h-400px">
                        <div ref="lineRef" class="wh-full"></div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div ref="pieRef" class="w-full h-400px"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="8">
                <el-card>
                    <template #header>
                        <div class="card-header">时间线</div>
                    </template>
                    <div class="h-360px">
                        <el-timeline>
                            <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp"
                            >
                                {{ activity.content }}
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">任务进度</div>
                    </template>
                    <div class="h-360px">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="时间" />
                            <el-table-column prop="name" label="任务名称" />
                            <el-table-column label="进度">
                                <template #default="scope">
                                    <el-progress
                                        :percentage="scope.row.address"
                                        :color="customColors"
                                    />
                                </template>
                            </el-table-column>
                        </el-table>
                    </div> </el-card
            ></el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="Analysis">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { type ECOption, useEcharts } from '@/composables';
import MiniCard from '@/components/miniCard/index.vue';
import DvStatistic from '@/components/dvStatistic/index.vue';
const lineOptions = ref<ECOption>({
    title: {
        text: '折线图',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985',
            },
        },
    },
    legend: {
        data: ['下载量', '注册数'],
        right: 10,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: [
                '06:00',
                '08:00',
                '10:00',
                '12:00',
                '14:00',
                '16:00',
                '18:00',
                '20:00',
                '22:00',
                '24:00',
            ],
            nameTextStyle: {
                fontSize: 24,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
        },
    ],
    series: [
        {
            color: '#66b8ff',
            name: '下载量',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0.25,
                            color: '#66b8ff',
                        },
                        {
                            offset: 1,
                            color: '#fff',
                        },
                    ],
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
        },
        {
            color: '#58d4a3',
            name: '注册数',
            type: 'line',
            smooth: true,
            stack: 'Total',
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0.25,
                            color: '#58d4a3',
                        },
                        {
                            offset: 1,
                            color: '#fff',
                        },
                    ],
                },
            },
            emphasis: {
                focus: 'series',
            },
            data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
        },
    ],
}) as Ref<ECOption>;
const { domRef: lineRef } = useEcharts(lineOptions);

const pieOptions = ref<ECOption>({
    title: {
        text: '饼图',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        bottom: '1%',
        left: 'center',
        itemStyle: {
            borderWidth: 0,
        },
    },
    series: [
        {
            color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
            name: '时间安排',
            type: 'pie',
            radius: ['45%', '75%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 1,
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '12',
                },
            },
            labelLine: {
                show: false,
            },
            data: [
                { value: 20, name: '学习' },
                { value: 10, name: '娱乐' },
                { value: 30, name: '工作' },
                { value: 40, name: '休息' },
            ],
        },
    ],
}) as Ref<ECOption>;
const { domRef: pieRef } = useEcharts(pieOptions);

const activities = [
    {
        content: '新增组件',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
    },
    {
        content: '修复一些已知问题',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
    },
    {
        content: 'bug修复',
        timestamp: '2018-04-03 20:46',
        size: 'large',
    },
    {
        content: '优化问题',
        timestamp: '2018-04-03 20:46',
        type: 'primary',
        hollow: true,
    },
    {
        content: '提交成功',
        timestamp: '2018-04-03 20:46',
    },
    {
        content: '提交成功',
        timestamp: '2018-04-03 20:46',
    },
];
const tableData = [
    {
        date: '2016-05-03',
        name: '学习Flutter',
        address: 50,
    },
    {
        date: '2016-05-02',
        name: '六块腹肌',
        address: 100,
    },
    {
        date: '2016-05-04',
        name: 'Golang',
        address: 30,
    },
    {
        date: '2016-05-01',
        name: '算法',
        address: 70,
    },
];
const customColors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
];

const traffic = 18980;
const sales = 298912362;
</script>
