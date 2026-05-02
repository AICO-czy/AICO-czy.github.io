<template>
  <q-dialog seamless v-model="isComprehensiveDialogVisible">
    <div class="dialog-content">
      <div class="content-title">综合管理</div>
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
            <RepairCom v-if="activeTab == 1" />
            <TrainingCom v-if="activeTab == 2" />
            <LeaseCom v-if="activeTab == 3" />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import * as echarts from "echarts";
import { useTransportationDialogStore, useComprehensiveStore } from "../../store/index";
import { storeToRefs } from "pinia";
import RepairCom from './components/repairCom.vue'
import TrainingCom from './components/trainingCom.vue'
import LeaseCom from './components/leaseCom.vue'
const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

const storeComprehensiveDialog = useComprehensiveStore();
const { isVisible, activeTab } = storeToRefs(storeComprehensiveDialog);

const isComprehensiveDialogVisible = computed(() => showTransportationDialog.value === 'comprehensive');
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

const selsectBtns = ['汽车维修', '驾驶培训', '小微汽车租赁']

function handleSelect(item: any) {
  activeTab.value = item
}

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  min-height: 1376px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1376px;
  background: url("assets/component/道水路运输系统-首页_slices/切图 664.png") no-repeat 100%/100%;
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

.content-top-select-item.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}
</style>
