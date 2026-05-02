<template>
    <q-dialog seamless v-model="showVisible" transition-hide="none" transition-show="none">
        <div class="dialog-content">
            <div class="content-close cursor-pointer" @click="handleClose"></div>
            <div class="dialog-content-box">
                <div class="flex items-end">
                    <div class="mr-[45px] w-[88px] h-[72px] mt-[10px]">
                        <img class="w-full h-full"
                            :src="png1"
                            alt="">
                    </div>
                    <div class="text">暴雪四级预警</div>
                </div>
                <div class="content-text">
                    <span>承德市气象台2025年08月23日08时19分继续发布雷电黄色预警信号：预计未来6小时内，我市全部县（市、区）仍将出现雷阵雨天气，雷雨时可能版友短时强降水、雷暴大风、冰雹等强对流天气，请注意防范。</span>
                </div>
                <div class="content-footer">
                    <div class="content-footer-button">
                        <span>信息发布</span>
                    </div>
                </div>
            </div>
        </div>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showVisible = defineModel<boolean>('visible', { default: false })

const road = {
    danger: '暴雪',
    lv: '4级',
    icon: 'icon_raod',
    content: '多云转阴',
    cold: '19℃-29℃'
}
const png1 = ref("")
png1.value = new URL('../../../assets/image/TransportationAndTravel/气象灾害预警信号图标_slices/' + formatUrl() + '.png', import.meta.url).href;

function formatUrl() {
    let danger = 'Property 1=' + road.danger
    let end = '红色'
    switch (road.lv) {
        case '1级':
            end = '1级红色'
            break;
        case '2级':
            end = '2级橙色'
            break;
        case '3级':
            end = '3级黄色'
            break;
        case '4级':
            end = '4级蓝色'
            break;

        default:
            break;
    }
    let lv = ', Property 2=' + end
    return danger + lv
}

const handleClose = () => {
    showVisible.value = false
}
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
    max-width: 2095px !important;
    overflow: none !important;
}

.q-dialog__inner>div {
    overflow: visible !important;
}

.dialog-content {
    width: 1105px;
    height: 574px;
    background-image: url("assets/image/TransportationAndTravel/切图 264.png");
    background-size: 100% 100%;
    position: fixed;
    top: 236px;
    right: 764px;
    padding: 40px;
    box-sizing: border-box;
}

.dialog-content-box {
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 20px 0px #4DA3FF;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 48px 51px;
    box-sizing: border-box;
    gap: 25px;
}

.text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 42px;
    line-height: 58px;
    text-shadow: 0px 4px 2px rgba(0, 200, 255, 0.3);
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(to right, #FFFFFF 0%, #B8DAFB 92%, #B8DAFB 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.content-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 36px;
    color: #BBD5EB;
    line-height: 52px;
    text-align: left;
    font-style: normal;
    text-transform: none;
}

.content-footer {
    display: flex;
    justify-content: flex-end;
}

.content-footer-button {
    width: 228px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("assets/image/TransportationAndTravel/切图 268.png");
    background-size: 100% 100%;
    margin-top: -50px;
}

.content-footer-button>span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(to bottom, #C6EAFF 0%, #ECF8FF 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.content-close {
    width: 52px;
    height: 52px;
    background: url("assets/component/切图 261.png") no-repeat 100%/100%;
    position: absolute;
    right: 40px;
}
</style>
