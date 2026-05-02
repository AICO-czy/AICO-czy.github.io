<template>
  <q-dialog seamless v-model="isOverloadDetectionDialogVisible">
    <div :class="activeTab == 1 ? 'dialog-content' : 'dialog-content1'">
      <div class="content-title">车辆治超检测</div>
      <div class="content-close" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="content-main fit column">
          <div class="content-top-select row col-auto">
            <div class="content-top-select-item" v-for="(item, index) in selsectBtns" :key="item"
              :class="{ 'active': activeTab === index + 1 }" @click="handleSelect(index + 1)">
              {{ item }}
            </div>
          </div>
          <div class="content-tab col">
            <div v-if="activeTab == 1">
              <img class="img" :src="png1" alt="">
              <base-info />
            </div>
            <div v-if="activeTab == 2">
              <div class="flex items-center">
                <div class="flex-1">
                  <img class="img" :src="png2" alt="">
                </div>
                <div class="content-top-select row col-auto">
                  <div class="content-top-select-item1" v-for="(item, index) in selsectBtns1" :key="item"
                    :class="{ 'active': activeDate === index + 1 }" @click="handleSelect1(index + 1)">
                    {{ item }}
                  </div>
                </div>
              </div>
              <jiance />
            </div>
            <div v-if="activeTab == 3">
              <div class="flex items-center">
                <div class="flex-1">
                  <img class="img" :src="png3" alt="">
                </div>
                <div class="content-top-select row col-auto">
                  <div class="content-top-select-item1" v-for="(item, index) in selsectBtns1" :key="item"
                    :class="{ 'active': activeDate === index + 1 }" @click="handleSelect1(index + 1)">
                    {{ item }}
                  </div>
                </div>
              </div>
              <feijiance />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import * as echarts from "echarts";
import { useTransportationDialogStore, useOverloadDetectionStore } from "../../store/index";
import { storeToRefs } from "pinia";
import BaseInfo from './components/baseInfo.vue'
import Jiance from './components/jiance.vue'
import Feijiance from './components/feijiance.vue'

import png1 from "src/assets/component/道水路运输系统-首页_slices/切图 328.png";
import png2 from "src/assets/component/道水路运输系统-首页_slices/切图 3281.png";
import png3 from "src/assets/component/道水路运输系统-首页_slices/切图 3282.png";


const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

const overloadDetectionStore = useOverloadDetectionStore();
const { isVisible, activeTab, activeDate } = storeToRefs(overloadDetectionStore);

const isOverloadDetectionDialogVisible = computed(() => showTransportationDialog.value === 'overloadDetection');
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};


const selsectBtns = ['基础信息一览', '治超站检测', '非现治超检测']
const selsectBtns1 = ['今日', '本月']

function handleSelect(item: any) {
  overloadDetectionStore.setActiveTab(item)
}
function handleSelect1(item: any) {
  overloadDetectionStore.setActiveDate(item)
}

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  max-height: 1706px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1142px;
  background: url("assets/component/道水路运输系统-首页_slices/切图 643.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 130px 70px 50px 70px;
  box-sizing: border-box;
}

.dialog-content1 {
  width: 1462px;
  height: 1706px;
  background: url("assets/image/dialog/切图 284.png") no-repeat 100%/100%;
  background-size: 100% 100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 130px 70px 50px 70px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 60px;
  top: 70px;
}

.content-title {
  width: 350px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 30px;
}

.img {
  height: 58px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.content-main {
  padding: 10px;
}

.content-tab {
  margin-top: 20px;
}

.content-top-select-item {
  width: 340px;
  height: 70px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 6px 6px 0px;
  text-align: center;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #87ADD0;
  line-height: 65px;
  font-style: normal;
  text-transform: none;
}

.content-top-select-item1 {
  width: 192px;
  height: 70px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 6px 6px 0px;
  text-align: center;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #87ADD0;
  line-height: 65px;
  font-style: normal;
  text-transform: none;
}

.content-top-select-item.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}

.content-top-select-item1.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}
</style>
