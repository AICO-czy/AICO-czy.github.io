<template>
  <div class="container w-full h-full p-[30px] box-border">
    <div class="content w-full h-full">
      <div class="grid grid-cols-4 gap-[13px] h-[157px]">
        <div class="content-button" :class="{ 'content-button-active': showRoad === item.showName }"
          v-for="(item, index) in buttons" :key="index" @click="handleBtnsClick(item.showName)">
          <div class="w-full h-full flex flex-col items-center justify-center">
            <div class="button-namebox">
              <div class="button-title">{{ item.title }}</div>
              <div class="top-icon column items-center justify-center">
                <span class="top-sheng">全省</span>
                <span class="top-ndo" :style="{ color: item.color }">{{ item.top }}</span>
              </div>
            </div>
            <div class="button-value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="flex-1 w-full content-content">
        <highwayNetwork v-if="showRoad === 'highwayNetwork'" @click-open="handleClick(showRoad)"></highwayNetwork>
        <highSpeed v-if="showRoad === 'highSpeed'"></highSpeed>
        <trunkLine v-if="showRoad === 'trunkLine'"></trunkLine>
        <ruralRoad v-if="showRoad === 'ruralRoad'"></ruralRoad>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, watch, reactive, ref } from "vue";
import { useBasicOverDialogStore } from '../basicOverDialog/store/index'
import { useBasicOverviewBtnStore } from './store/index'


const basicOverDialog = useBasicOverDialogStore()
const basicOverviewBtn = useBasicOverviewBtnStore()

const highwayNetwork = defineAsyncComponent(() => import("./highwayNetwork.vue"));
const highSpeed = defineAsyncComponent(() => import("./highSpeed.vue"));
const trunkLine = defineAsyncComponent(() => import("./trunkLine.vue"));
const ruralRoad = defineAsyncComponent(() => import("./ruralRoad.vue"));
const showRoad = ref('highwayNetwork');
const buttons = ref([
  {
    title: '承德市公路网',
    value: '24804公里',
    top: 'TOP1',
    color: '#FFA893',
    showName: 'highwayNetwork',
  },
  {
    title: '高速公路',
    value: '8条759公里',
    top: 'TOP4',
    color: '#FFC783',
    showName: 'highSpeed',
  },
  {
    title: '普通干线公路',
    value: '25条2875公里',
    top: 'TOP2',
    color: '#FFC783',
    showName: 'trunkLine',
  },
  {
    title: '农村公路',
    value: '21188公里',
    top: 'TOP1',
    color: '#FFA893',
    showName: 'ruralRoad',
  }
])

const handleBtnsClick = (name: string) => {
  showRoad.value = name;
  basicOverviewBtn.setShowRoadName(name);
  // console.log('basicOverviewBtn.showRoadName', basicOverviewBtn.showRoadName)
}

function handleClick(name: string) {
  // console.log('点击了', name);
  switch (name) {
    case 'highwayNetwork':
      basicOverDialog.openDialog();
      break;
    case 'highSpeed': ;
      break;
    case 'trunkLine':
      break;
    case 'ruralRoad':
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;

  .content-button {
    background: linear-gradient(180deg, rgba(0, 174, 255, 0.56) 0%, rgba(0, 114, 167, 0) 100%);
    border-radius: 8px 8px 0px 0px;

    .button-namebox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .top-icon {
        background: linear-gradient(270deg, #277BC0 0%, rgba(39, 123, 192, 0) 100%);
        opacity: 0.8;
      }

      .top-sheng {
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 26px;
        color: #BFD8FF;
        line-height: 45px;
        font-style: normal;
        text-transform: none;
      }

      .top-ndo {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 700;
        font-size: 26px;
        color: #FFA893;
        line-height: 36px;
        font-style: normal;
        text-transform: none;
      }
    }

    .button-title {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 400;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      font-style: normal;
      text-transform: none;
      position: relative;

      .top-icon {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 24px;
        line-height: 36px;
        color: #fff;
      }
    }

    .button-value {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 45px;
      line-height: 70px;
      letter-spacing: 1px;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-content {
    // background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    // box-shadow: inset 0px 0px 20px 0px #4DA3FF;
    border-radius: 10px;
    background-image: url('assets/image/highwayOperation/背景图虚化.png');
    background-size: 100% 100%;
  }

  .content-button-active {
    background: linear-gradient(180deg, rgba(0, 183, 255, 1) 0%, rgba(0, 120, 167, 0) 100%);
  }
}
</style>
