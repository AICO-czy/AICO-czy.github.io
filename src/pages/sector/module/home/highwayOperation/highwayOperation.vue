<template>
  <div class="home-left-page">
    <div class="top-box">
      <div class="text">
        <div class="" @click="handleClick">公路运营</div>
      </div>
      <div class="search">
        <img :src="png1" alt="" @click="showSearch = !showSearch">
        <div class="search-input" v-if="showSearch">
          <input class="input-box" v-model="searchText" name="search" type="text">
          <div class="search-btn" @click="handleSearch"></div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div class="title">
          <div>基础概况</div>
        </div>
        <div class="content-box w-full h-full p-[40px] box-border">
          <basicOverview class="w-full h-full" />
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        <div>运行动态</div>
      </div>
      <div class="content-box w-full h-full p-[40px] box-border">
        <RunningDynamics />
      </div>
    </div>
    <basicOverDialog />
    <HighseedDialog />
    <TrunkLineDialog />
    <BaiseInfo />
    <TransactionAnalysis />
    <Heatmap />
    <dealingsJC />
    <Cascader :meunList="menuList" v-model="menuShow" @changeCascader="handleRouter"/>
  </div>
</template>

<script setup lang="ts" name="highwayOperation">
import { defineAsyncComponent, reactive, ref, watch } from "vue";
import basicOverDialog from './basicOverDialog/index.vue'
import BaiseInfo from './highseed/baiseInfo.vue'
import Cascader from './components/cascader.vue'


const basicOverview = defineAsyncComponent(() => import("./components/basicOverview.vue"));
import RunningDynamics from '../../RunningDynamics/index.vue'
import HighseedDialog from "./highseed/highseedDialog.vue";
import TrunkLineDialog from "./trunkLineDialog/trunkLineDialog.vue";
import dealingsJC from "./highseed/dealingsJC.vue";
import TransactionAnalysis from "./highseed/transactionAnalysis.vue";
import Heatmap from './highseed/heatmap.vue'

import png1 from "src/assets/component/公路运营系统-承德市公路网_slices/切图 228.png";
import { useRouter } from "vue-router";

const $router = useRouter();

const showSearch = ref(false)
const searchText = ref('')
function handleSearch() {

}


//下拉菜单列表
const menuList = ref([
  { title: '公路运营全景', icon: '1', id: '1', children: [] },
  {
    title: '公路资产监测', icon: '1', id: '2', children: [
      { title: '养护巡检情况', icon: '', id: '2-1', children: [] },
      { title: '病害处治情况', icon: '', id: '2-2', children: [] },
      { title: '主要病害分布', icon: '', id: '2-3', children: [] },
      { title: '病害统计分析', icon: '', id: '2-4', children: [] },
      { title: '桥梁结构物健康监测', icon: '', id: '2-5', children: [] },
      { title: '隧道结构物健康监测', icon: '', id: '2-6', children: [] },
      { title: '边坡结构物健康监测', icon: '', id: '2-7', children: [] },
    ]
  },
  {
    title: '实时路况监测', icon: '1', id: '3', children: [
      { title: '实时路况监测', icon: '', id: '3-1', children: [] },
    ]
  },
  {
    title: '交通量监测', icon: '1', id: '4', children: [
      {
        title: '交通流量实时监测', icon: '1', id: '4-1', children: [
          { title: '出入口交通流量监测', icon: '', id: '4-1-1', children: [] },
          { title: '交调站交通量监测', icon: '', id: '4-1-2', children: [] },
          { title: '交通量统计分析', icon: '', id: '4-1-3', children: [] },
        ]
      },
      {
        title: '交通流量状况查询', icon: '1', id: '4-2', children: [
          { title: '交通流量状况查询', icon: '', id: '4-2-1', children: [] },
        ]
      },
      {
        title: '交通流量分析', icon: '1', id: '4-3', children: [
          { title: '交通流量分析', icon: '', id: '4-3-1', children: [] },
        ]
      },
    ]
  },
  {
    title: '风险隐患点监测', icon: '1', id: '5', children: [
      { title: '风险隐患点更新维护', icon: '', id: '5-1', children: [] },
      { title: '风险隐患点统计分析', icon: '', id: '5-2', children: [] },
      { title: '风险隐患点可视化查询', icon: '', id: '5-3', children: [] },
    ]
  },
  {
    title: '交通气象监测', icon: '1', id: '6', children: [
      { title: '气象监测', icon: '', id: '6-1', children: [] },
      { title: '气象预警', icon: '', id: '6-2', children: [] },
      { title: '路网环境查询', icon: '', id: '6-3', children: [] },
    ]
  },
  {
    title: '养护工区监测', icon: '1', id: '7', children: [
      {
        title: '养护工区概况', icon: '1', id: '7-1', children: [
          { title: '养护工区总览', icon: '', id: '7-1-1', children: [] },
          { title: '养护工区地图分布', icon: '', id: '7-1-2', children: [] },
          { title: '养护工区基本信息查询', icon: '', id: '7-1-3', children: [] },
        ]
      },
      {
        title: '养护工区运行监测', icon: '1', id: '7-2', children: [
          { title: '养护工区资源配置情况', icon: '', id: '7-2-1', children: [] },
          { title: '养护工区任务开展情况', icon: '', id: '7-2-2', children: [] },
          { title: '养护工区视频监控查询', icon: '', id: '7-2-3', children: [] },
        ]
      },
    ]
  },
  {
    title: '服务区监测', icon: '1', id: '8', children: [
      {
        title: '服务区概况', icon: '1', id: '8-1', children: [
          { title: '服务区总览', icon: '', id: '8-1-1', children: [] },
          { title: '服务区地图分布', icon: '', id: '8-1-2', children: [] },
          { title: '服务区基本信息查询', icon: '', id: '8-1-3', children: [] },
        ]
      },
      {
        title: '服务区运行监测', icon: '1', id: '8-2', children: [
          { title: '服务区视频监控查询', icon: '', id: '8-2-1', children: [] },
          { title: '服务区流量监测', icon: '', id: '8-2-1', children: [] },
          { title: '服务区设施运行监测', icon: '', id: '8-2-1', children: [] },
        ]
      },
    ]
  },
])

const menuShow = ref(false)
//下拉菜单
function handleClick(){
  console.log('下拉菜单' ,menuShow.value);
  menuShow.value = !menuShow.value
}

//选中跳转
function handleRouter(params:any) {
  console.log('选中菜单触发跳转',params);
  $router.push({ path: `/Statistics`,query: { type: params.id }});
}

</script>

<style scoped lang="scss">
.home-left-page {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.top-box {
  background: url('assets/image/lefty/top_title.png') no-repeat 100%/100%;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 58px;
    line-height: 160px;
    letter-spacing: 4px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #79BFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: 200px;
  }

  .search {
    width: 110px;
    height: 88px;
    display: flex;
    align-items: center;
    position: relative;
    // background: pink;

    .search-input {
      width: 621px;
      height: 83px;
      background: url('assets/component/公路运营系统-承德市公路网_slices/切图 229.png') no-repeat center/cover;
      display: flex;
      position: absolute;
      top: 0;
      right: 100px;
      z-index: 9999999 !important;

      .input-box {
        background: transparent;
        flex: 1;
        color: #fff;
        font-size: 32px;
        padding-left: 10px;
      }

      .search-btn {
        width: 88px;
        height: 83px;
        // background: pink;
      }
    }
  }
}

.content-box {
  width: 1569px;
  height: 846px;
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 225.png') no-repeat 100%/100%;
  margin-top: -70px;
}

.title {
  width: 1106px;
  height: 111px;
  margin-top: 22px;
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 227.png') no-repeat 100%/100%;
}

.title>div {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 800;
  font-size: 54px;
  line-height: 60px;
  letter-spacing: 2px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 114px;
}
</style>
