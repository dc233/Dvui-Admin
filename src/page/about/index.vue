<template>
    <div class="content-layout">
        <el-row :gutter="15">
            <el-col :lg="24">
                <el-card shadow="never" class="aboutTop">
                    <div class="aboutTop-info">
                        <img src="../../assets/img/logo.png" />
                        <h2>{{ packageJson.name }}</h2>
                        <p>{{ packageJson.version }}</p>
                    </div>
                </el-card>
                <el-card shadow="never" header="dependencies" class="decies">
                    <el-descriptions border :column="3">
                        <el-descriptions-item
                            v-for="(value, key) in packageJson.dependencies"
                            :key="key"
                            :label="key"
                            >{{ value }}</el-descriptions-item
                        >
                    </el-descriptions>
                </el-card>
                <el-card shadow="never" header="devDependencies">
                    <el-descriptions border :column="3">
                        <el-descriptions-item
                            v-for="(value, key) in packageJson.devDependencies"
                            :key="key"
                            :label="key"
                            >{{ value }}</el-descriptions-item
                        >
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="about">
import packageJson from '../../../package.json';
</script>

<style scoped>
.aboutTop {
    border: 0;
    background: linear-gradient(to right, #8ec8e9, #2b3c63);
    color: #fff;
    margin-bottom: 15px;
}
.decies {
    margin-bottom: 15px;
}
.aboutTop-info {
    text-align: center;
}
.aboutTop-info img {
    width: 100px;
}
.aboutTop-info h2 {
    font-size: 26px;
    margin-top: 15px;
}
.aboutTop-info p {
    font-size: 16px;
    margin-top: 10px;
}
</style>
