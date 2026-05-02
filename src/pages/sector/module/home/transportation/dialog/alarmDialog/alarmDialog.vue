<template>
  <q-dialog seamless v-model="isAlarmDialogVisible">
    <div class="dialog-content">
      <div class="content-title">两客一危车辆报警</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="content-main fit column">
          <div class="content-top-select row col-auto">
            <div class="content-top-select-item" v-for="item in state.selsectBtns" :key="item.name"
              :class="{ 'active': state.activeSelect === item.name }" @click="handleSelect(item)">
              {{ item.name }}
            </div>
          </div>
          <div class="content-top-statistics row items-center">
            <span class="content-top-statistics-text">{{ state.activeSelect1 }}报警统计</span>
            <q-icon :name="`img:${icon1}`" class="content-top-statistics-icon"
              @click="handleSelectTable(state.activeSelectTable)"></q-icon>
          </div>
          <div class="content-tab col">
            <Day v-if="state.activeSelect === '今日'"></Day>
            <Week v-if="state.activeSelect === '近7日'"></Week>
            <Month v-if="state.activeSelect === '本月'"></Month>
            <Table v-if="state.activeSelectTable === '统计'"></Table>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { defineAsyncComponent, ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useTransportationDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import icon1 from 'src/assets/image/dialog/切图 548.png'

const Day = defineAsyncComponent(() => import("./components/day.vue"));
const Week = defineAsyncComponent(() => import("./components/week.vue"));
const Month = defineAsyncComponent(() => import("./components/month.vue"));
const Table = defineAsyncComponent(() => import("./components/table.vue"));



const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

const state = reactive({
  selsectBtns: [
    {
      name: '今日',
    },
    {
      name: '近7日',
    },
    {
      name: '本月',
    },
  ],
  activeSelect: '今日',
  activeSelect1: '今日',
  activeSelectTable: '',
})


const isAlarmDialogVisible = computed(() => showTransportationDialog.value === 'alarm');
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

const handleSelect = (item: { name: string; active: boolean }) => {
  state.activeSelect = item.name;
  state.activeSelect1 = item.name;
}

const handleSelectTable = (item: string) => {
  if (state.activeSelectTable == '统计') {
    state.activeSelectTable = '';
    state.activeSelect = state.activeSelect1;
  } else {
    state.activeSelectTable = '统计';
    state.activeSelect = '';
  }
}
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2095px !important;
  overflow: none !important;
  min-height: 1706px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1706px;
  background-image: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 140px 70px 70px 60px;
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
  width: 450px;
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
  top: 40px;
}

.content-box {
  width: 100%;
  height: 100%;
  background-image: url("assets/image/dialog/切图 547.png");
  background-size: 100% 100%;
}

.content-main {
  padding: 28px 27px 10px;
}

.content-top-select-item {
  width: 192px;
  height: 65px;
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

.content-top-statistics {
  padding: 15px 36px 10px 36px;
}

.content-top-statistics-text {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  line-height: 64px;
  text-shadow: 0px 4px 2px rgba(0, 200, 255, 0.3);
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding-right: 60px;
  background: linear-gradient(90deg, #FFFFFF 0%, #B8DAFB 92%, #B8DAFB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content-top-statistics-icon {
  width: 66px;
  height: 64px;
}
</style>
