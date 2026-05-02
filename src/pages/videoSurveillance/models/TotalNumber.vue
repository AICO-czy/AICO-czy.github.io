<template>
    <div class="total-number">
        <div class="title">监控总数</div>
        <div class="number-container">
            <div v-for="i in numbers" :key="i" class="number-item">{{ i }}</div>
        </div>
    </div>
</template>
<script setup lang="ts" name="totalNumber">
import { ref } from 'vue'
const numbers = ref(["3", "1", "2", "6", "个"])
</script>

<style lang="scss" scoped>
.total-number {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.title {
    height: 40px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: bold;
    font-size: 40px;
    color: #FFFFFF;
    line-height: 40px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-left: 26px;
}

.number-container {
    flex: 1;
    height: 100%;
    margin-left: 20px;
    margin-right: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.number-item {
    height: 100%;
    width: 80px;
    margin-left: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("assets/image/cdsgl/videoSurveillance/video_number_bg.png");
    background-size: 100% 100%;


    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
    font-weight: normal;
    font-size: 56px;
    color: #66FFFF;
    line-height: 59px;
    text-align: center;
    font-style: normal;
    text-transform: none;

    &:last-child {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: normal;
        font-size: 28px;
        color: #66FFFF;
        line-height: 59px;
        text-align: center;
        font-style: normal;
        text-transform: none;
    }
}
</style>