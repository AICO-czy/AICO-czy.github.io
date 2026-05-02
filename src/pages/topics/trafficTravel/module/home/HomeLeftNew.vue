<template>
  <div class="col home-left-page">
    <div class="column justify-between fit home-left-page-content">
      <div class="home-left-page-top">
        <div class="content-title-bg">
          <span>快进慢游公路网</span>
        </div>
        <div class="column no-wrap home-left-page-top-content">
          <div class="home-left-page-top-content-top">
            <div class="row travel-box-all">
              <div class="travel-box">
                <div class="travel-box-title">
                  <span>旅游快速环线</span>
                </div>
                <div class="travel-item-content">
                  <div class="travel-item-content-name">
                    {{ state.trafficHub.name }}
                  </div>
                  <div class="travel-item-content-value">
                    <span>{{ state.trafficHub.value }}</span>
                    <span class="travel-item-content-unit">{{ state.trafficHub.unit }}</span>
                  </div>
                </div>
                <div class="travel-box-title1">
                  <span>交通枢纽</span>
                </div>
              </div>
              <div class="travel-img-mov">
                <div class="travel-img-q"></div>
                <div class="travel-img-title">串联五大旅游组团</div>
                <div class="travel-img-item travel-img-item1 row justify-center items-center">
                  <span>草原风情度假区</span>
                  <!-- <img src="~assets/image/trafficTravel/left/草原.png" class="travel-img-item-img" alt=""> -->
                </div>
                <div class="travel-img-item travel-img-item2 row justify-center items-center">
                  <span>皇家康养度假区</span>
                  <!-- <img src="~assets/image/trafficTravel/left/皇家.png" class="travel-img-item-img" alt=""> -->
                </div>
                <div class="travel-img-item travel-img-item3 row justify-center items-center">
                  <span>金山岭国际旅游度假区</span>
                  <!-- <img src="~assets/image/trafficTravel/left/金山.png" class="travel-img-item-img" alt=""> -->
                </div>
                <div class="travel-img-item travel-img-item4 row justify-center items-center">
                  <span>塞上风光度假区</span>
                  <!-- <img src="~assets/image/trafficTravel/left/塞上.png" class="travel-img-item-img" alt=""> -->
                </div>
                <div class="travel-img-item travel-img-item5 row justify-center items-center">
                  <span>温泉养生度假区</span>
                  <!-- <img src="~assets/image/trafficTravel/left/温泉.png" class="travel-img-item-img" alt=""> -->
                </div>
              </div>
            </div>
            <div class="travel-bottom row justify-between items-center">
              <div class="transportation-Hub" v-for="item in state.transportationHub" :key="item.name">
                <div class="transportation-Hub-name">
                  {{ item.name }}
                </div>
                <div class="transportation-Hub-value">
                  <span>{{ item.value }}</span>
                  <span class="transportation-Hub-unit">{{ item.unit }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="scenic-area-box">
            <div class="nobg-title">
              辐射景区
            </div>
            <div class="under-title-line">
              <div class="under-title-line-before"></div>
              <div class="under-title-line-bottom"></div>
            </div>
            <div class="scenic-area row justify-between">
              <div class="row scenic-area-heard" @click="openDialog('5a旅游区')">
                <q-icon :name="`img:${icon4}`" class="scenic-area-icon"></q-icon>
                <div class="scenic-area-heardcontent">
                  <div class="scenic-area-total">
                    {{ state.scenicAreaTotal }}
                    <span class="scenic-area-total-unit">{{ state.scenicAreaTotalUnit }}</span>
                  </div>
                  <div class="scenic-area-total-name">
                    {{ state.scenicAreaTotalName }}
                  </div>
                </div>
              </div>
              <div class="scenic-area-indicator" v-for="item in state.scenicAreaIndicator" :key="item.name">
                <div class="scenic-area-indicator-name">
                  {{ item.name }}
                </div>
                <div class="scenic-area-indicator-value">
                  {{ item.value }}
                  <span class="scenic-area-indicator-unit">{{ item.unit }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="demonstration-road-box">
            <div class="nobg-title">
              典型慢游示范路
            </div>
            <div class="under-title-line">
              <div class="under-title-line-before"></div>
              <div class="under-title-line-bottom"></div>
            </div>
            <div class="row justify-between demonstration-road-content">
              <div class="row items-center demonstration-road-item" v-for="item in state.demonstrationRoad"
                :key="item.name" @click="openDialog(item.name)">
                <div>
                  <q-icon :name="item.icon" class="demonstration-road-item-icon"></q-icon>
                </div>
                <div class="column">
                  <div class="demonstration-road-item-value">
                    {{ item.value }}
                    <span class="demonstration-road-item-unit">{{ item.unit }}</span>
                  </div>
                  <div class="demonstration-road-item-name">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-left-page-middle">
        <div class="content-title-bg">
          <span>今日运行状况</span>
        </div>
        <div class="row justify-between home-left-page-middle-content" @click.stop="openDialog('道路状况')">
          <div class="middle-icon-big row justify-center items-center">
            <span>优</span>
          </div>
          <div>
            <q-img :src="img1" fit="cover" class="middle-icon" @click.stop="openDialog('道路预警')">
              <div class="middle-badge" floating>{{ state.roadWarningBadge }}</div>
            </q-img>
          </div>
          <div>
            <q-img :src="img2" fit="cover" class="middle-icon" @click.stop="openDialog('气象预警')">
              <!-- <div class="middle-badge" floating>{{ state.meteorologicalWarningBadge }}</div> -->
            </q-img>
          </div>
          <div>
            <q-img :src="img3" fit="cover" class="middle-icon" @click.stop="openDialog('信息服务')">
              <!-- <div class="middle-badge1" floating>{{ state.sendMsgBadge }}</div> -->
            </q-img>
          </div>
        </div>
      </div>
      <div class="home-left-page-bottom">
        <div class="content-title-bg">
          <span>热门线路</span>
        </div>
        <div class="home-left-page-bottom-content">
          <div class="bottom-content-heard row justify-between items-center">
            <span class="col-1">排名</span>
            <span class="col-2">路线名称</span>
            <span class="sort-flow-kong"></span>
            <span class="col-2.5">今日车流量</span>
          </div>
          <div class="list-scroll-content">
            <Vue3SeamlessScroll :list="state.sortList" :limitScrollNum="4" hover wheel :step="0.25">
              <div class="row justify-between items-center sort-item" v-for="item in state.sortList" :key="item.order">
                <div class="sort-num col-1">
                  {{ item.order }}
                </div>
                <div class="sort-name col-2">
                  {{ item.name }}
                </div>
                <div class="sort-flow">
                  <q-linear-progress rounded :value="item.flow" size="15px" track-color="teal-9" color="green-12"
                    class="line-pro" />
                </div>
                <div class="sort-traffic col-2">
                  {{ item.traffic }}
                </div>
              </div>
            </Vue3SeamlessScroll>
          </div>
        </div>
      </div>
    </div>
  </div>

  <CloudDialog :dialogTitle="'国家一号风景大道'" v-model:visible="nationIsVisible">
    <template #content>
      <div class="w-full h-full flex flex-col">
        <div class="cloud-content-header flex gap-x-[14px] flex-nowrap">
          <div class="total-mileage">
            <div class="total-mileage-icon"></div>
            <div class="tatal-mileage-content flex flex-col">
              <div class="flex items-end gap-x-[10px]">
                <div>180</div>
                <div>km</div>
              </div>
              <div>总里程数</div>
            </div>
          </div>
          <div class="roads-one">
            <div class="roads-title">林区专用及地方道路里程</div>
            <div class="roads-content">
              <div>42.851</div>
              <div>km</div>
            </div>
          </div>
          <div class="roads-two">
            <div class="roads-title">国道里程</div>
            <div class="roads-content">
              <div>137.149</div>
              <div>km</div>
            </div>
          </div>
        </div>
        <div class="cloud-content-acount">
          <div class="cloud-content-acount-item">
            <div>
              <div>服务设施</div>
            </div>
            <div>
              <div class="cloud-content-acount-item-server">
                <div class="cloud-content-acount-item-server-item">
                  <div>综合驿站</div>
                  <div>
                    <div>2</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>服务区</div>
                  <div>
                    <div>2</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>停车区</div>
                  <div>
                    <div>8</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>观景台</div>
                  <div>
                    <div>7</div>
                    <div>处</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cloud-content-acount-item">
            <div>
              <div>旅游产业</div>
            </div>
            <div class="cloud-content-acount-item-join">
              <div class="cloud-content-acount-item-join-item">
                <div>串联旅游团组</div>
                <div>
                  <div>6</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>旅游专业村</div>
                <div>
                  <div>112</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射景区</div>
                <div>
                  <div>20</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射乡镇</div>
                <div>
                  <div>49</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射行政村</div>
                <div>
                  <div>395</div>
                  <div>个</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cloud-content-char">
          <div class="cloud-content-char-title">
            <div class="text">品质提升工程</div>
            <div class="time-select">
              <div class="time-selector" @click="toggleDropdown">
                <span class="selected-year">{{ selectedYear }}年</span>
                <span class="dropdown-arrow" :class="{ 'rotate': showDropdown }">▼</span>
              </div>
              <div class="dropdown-menu" v-show="showDropdown">
                <div v-for="year in yearOptions" :key="year" class="dropdown-item"
                  :class="{ 'active': year === selectedYear }" @click="selectYear(year)">
                  {{ year }}年
                </div>
              </div>
            </div>
          </div>
          <div class="cloud-content-char-box w-full h-full">
            <!-- Tab切换按钮 -->
            <div class="chart-tab-container">
              <div class="chart-tab-buttons">
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'mileage' }"
                  @click="switchTab('mileage')">
                  里程
                </div>
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'investment' }"
                  @click="switchTab('investment')">
                  投资
                </div>
              </div>
            </div>
            <!-- 图表内容区域 -->
            <div class="char-columnar flex-1 w-full">
              <v-chart :option="barChartOption" style="height: 100%; width: 100%;" />
            </div>
            <div class="char-cylinder flex-1 w-full">
              <div class="cylinder-chart-title">历年投资情况</div>
              <div class="cylinder-chart-content">
                <v-chart :option="cylinderChartOption" style="height: 100%; width: 100%;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CloudDialog>

  <CloudDialog :dialogTitle="'绿色塞罕坝-红色旅游路'" v-model:visible="journeyIsVisible">
    <template #content>
      <div class="w-full h-full flex flex-col">
        <div class="cloud-content-header flex gap-x-[14px] flex-nowrap">
          <div class="total-mileage">
            <div class="total-mileage-icon"></div>
            <div class="tatal-mileage-content flex flex-col">
              <div class="flex items-end gap-x-[10px]">
                <div>180</div>
                <div>km</div>
              </div>
              <div>总里程数</div>
            </div>
          </div>
          <div class="roads">
            <div class="roads-title">国道<span class="ml-[50px] text-[#FFE600] text-[44px]">4</span><span
                class="text-[28px] ml-[5px]">条</span></div>
            <div class="roads-content">
              <div>42.851</div>
              <div>km</div>
            </div>
          </div>
          <div class="roads">
            <div class="roads-title">省道<span class="ml-[50px] text-[#FFE600] text-[44px]">4</span><span
                class="text-[28px] ml-[5px]">条</span></div>
            <div class="roads-content">
              <div>137.149</div>
              <div>km</div>
            </div>
          </div>
          <div class="roads">
            <div class="roads-title">市政道路<span class="ml-[20px] text-[#FFE600] text-[44px]">4</span><span
                class="text-[28px] ml-[5px]">条</span></div>
            <div class="roads-content">
              <div>137.149</div>
              <div>km</div>
            </div>
          </div>
        </div>
        <div class="cloud-content-acount">
          <div class="cloud-content-acount-item">
            <div>
              <div>服务设施</div>
            </div>
            <div>
              <div class="cloud-content-acount-item-server">
                <div class="cloud-content-acount-item-server-item">
                  <div>综合驿站</div>
                  <div>
                    <div>2</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>服务区</div>
                  <div>
                    <div>2</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>停车区</div>
                  <div>
                    <div>8</div>
                    <div>处</div>
                  </div>
                </div>
                <div class="cloud-content-acount-item-server-item">
                  <div>观景台</div>
                  <div>
                    <div>7</div>
                    <div>处</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cloud-content-acount-item">
            <div>
              <div>旅游产业</div>
            </div>
            <div class="cloud-content-acount-item-join">
              <div class="cloud-content-acount-item-join-item">
                <div>串联旅游团组</div>
                <div>
                  <div>6</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>旅游专业村</div>
                <div>
                  <div>112</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射景区</div>
                <div>
                  <div>20</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射乡镇</div>
                <div>
                  <div>49</div>
                  <div>个</div>
                </div>
              </div>
              <div class="cloud-content-acount-item-join-item">
                <div>辐射行政村</div>
                <div>
                  <div>395</div>
                  <div>个</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cloud-content-char">
          <div class="cloud-content-char-title">
            <div class="text">品质提升工程</div>
            <div class="time-select">
              <div class="time-selector" @click="toggleDropdown">
                <span class="selected-year">{{ selectedYear }}年</span>
                <span class="dropdown-arrow" :class="{ 'rotate': showDropdown }">▼</span>
              </div>
              <div class="dropdown-menu" v-show="showDropdown">
                <div v-for="year in yearOptions" :key="year" class="dropdown-item"
                  :class="{ 'active': year === selectedYear }" @click="selectYear(year)">
                  {{ year }}年
                </div>
              </div>
            </div>
          </div>
          <div class="cloud-content-char-box w-full h-full">
            <!-- Tab切换按钮 -->
            <div class="chart-tab-container">
              <div class="chart-tab-buttons">
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'mileage' }"
                  @click="switchTab('mileage')">
                  里程
                </div>
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'investment' }"
                  @click="switchTab('investment')">
                  投资
                </div>
              </div>
            </div>
            <!-- 图表内容区域 -->
            <div class="char-columnar flex-1 w-full">
              <v-chart :option="barChartOption" style="height: 100%; width: 100%;" />
            </div>
            <div class="char-cylinder flex-1 w-full">
              <div class="cylinder-chart-title">历年投资情况</div>
              <div class="cylinder-chart-content">
                <v-chart :option="cylinderChartOption" style="height: 100%; width: 100%;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CloudDialog>

  <CloudDialog :dialogTitle="'美丽燕塞路'" v-model:visible="roadIsVisible">
    <template #content>
      <div class="w-full h-full flex flex-col flex-nowrap">
        <div class="road-dialog-header">
          <div class="total-mileage">
            <div class="total-mileage-icon"></div>
            <div class="tatal-mileage-content flex flex-col">
              <div class="flex items-end gap-x-[10px]">
                <div>435</div>
                <div>km</div>
              </div>
              <div>总里程数</div>
            </div>
          </div>
          <div class="total-acount">
            <div class="text-[40px]">条数</div>
            <div><span class="text-[72px]">29</span><span
                class="text-[36px] text-[rgba(227,255,245,0.7)] ml-[40px]">条</span></div>
          </div>
        </div>
        <div class="road-dialog-content">
          <div class="road-dialog-content-title">
            <div class="text">县区获评</div>
          </div>
          <div class="flex-1 road-dialog-content-charone">
            <v-chart autoresize :option="countyChartOption" style="height: 100%; width: 100%;" />
          </div>
          <div class="flex-1 relative flex flex-col">
            <div class="road-dialog-content-title">
              <div class="text">年度获评</div>
            </div>
            <div class="chart-tab-container">
              <div class="chart-tab-buttons">
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'mileage' }"
                  @click="switchTab('mileage')">
                  里程
                </div>
                <div class="chart-tab-button" :class="{ 'active': activeTab === 'investment' }"
                  @click="switchTab('investment')">
                  数量
                </div>
              </div>
            </div>
            <div class="road-dialog-content-chartwo flex-1">
              <v-chart autoresize :option="yearlyChartOption" style="height: 100%; width: 100%;" />
            </div>
          </div>
          <div class="flex-1 relative flex flex-col">
            <div class="road-dialog-content-title">
              <div class="text">美丽农村精品示范路</div>
            </div>
            <div class="table-box w-full h-full p-[30px] box-border">
              <div class="demo-table">
                <div class="table-wrapper">
                  <table class="rural-road-table">
                    <thead>
                      <tr>
                        <th>标号</th>
                        <th>线路编号</th>
                        <th>线路名称</th>
                        <th>线路里程</th>
                        <th>所属区县</th>
                      </tr>
                    </thead>
                  </table>
                  <div class="table-body-container">
                    <table class="rural-road-table">
                      <tbody>
                        <tr v-for="(item, index) in ruralRoadData" :key="index">
                          <td>{{ item.label }}</td>
                          <td>{{ item.code }}</td>
                          <td>{{ item.name }}</td>
                          <td class="highlight distance-cell">
                            <span class="distance-number">{{ item.distanceNum }}</span>
                            <span class="distance-unit">{{ item.distanceUnit }}</span>
                          </td>
                          <td>{{ item.county }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CloudDialog>

  <!-- 5a旅游区 -->
  <TouristAttraction ref="TouristAttractionRef" :visible="touristAttractionIsVisible" />
  <!-- 道路预警 -->
  <RoadWarning ref="RoadWarningRef" :visible="roadWarningIsVisible" />
  <!-- 气象预警 -->
  <MeteorologicalWarning ref="MeteorologicalWarningRef" :visible="meteorologicalIsVisible" />
  <!-- 信息服务 -->
  <SendMsg ref="SendMsgRef" :visible="sendMsgIsVisible" />
  <!-- 道路状况 -->
  <RoadConditions ref="RoadConditionsRef" :visible="roadConditionsIsVisible" />
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import CloudDialog from "../../components/cloudDialog.vue";
import * as echarts from 'echarts';
import TouristAttraction from '../../components/touristAttraction.vue'
import MeteorologicalWarning from '../../components/MeteorologicalWarning.vue'
import RoadWarning from '../../components/RoadWarning.vue'
import SendMsg from '../../components/SendMsg.vue'
import RoadConditions from '../../components/roadConditions.vue'
import icon1 from 'src/assets/image/trafficTravel/left/风景大道.png'
import icon2 from 'src/assets/image/trafficTravel/left/红色旅游路.png'
import icon3 from 'src/assets/image/trafficTravel/left/燕塞路.png'
import icon4 from 'src/assets/image/trafficTravel/left/景区旗帜.png'

import img1 from 'src/assets/image/trafficTravel/left/道路预警.png'
import img2 from 'src/assets/image/trafficTravel/left/气象预警.png'
import img3 from 'src/assets/image/trafficTravel/left/信息服务.png'

import { open } from "fs";

const TouristAttractionRef = ref()
const RoadWarningRef = ref()
const MeteorologicalWarningRef = ref()
const SendMsgRef = ref()
const RoadConditionsRef = ref()

const storeOtherInfo = otherInfo();
const emit = defineEmits(["close-page"]);
storeOtherInfo.setSelectArea("home");
const handleClose = () => {
  emit("close-page", "homeRightClose");
  storeOtherInfo.setSelectArea("home");
};

const state = reactive({
  sortList: [
    {
      order: 1,
      name: '京沈线',
      flow: 0.9,
      traffic: 9000
    },
    {
      order: 2,
      name: '承围线',
      flow: 0.85,
      traffic: 8510
    },
    {
      order: 3,
      name: '京承线',
      flow: 0.8,
      traffic: 8102
    },
    {
      order: 4,
      name: 'xx线',
      flow: 0.75,
      traffic: 7800
    },
    {
      order: 5,
      name: 'xx线',
      flow: 0.7,
      traffic: 7600
    },
    {
      order: 6,
      name: 'xx线',
      flow: 0.65,
      traffic: 7200
    },
    {
      order: 7,
      name: 'xx线',
      flow: 0.75,
      traffic: 7100
    },
    {
      order: 8,
      name: 'xx线',
      flow: 0.7,
      traffic: 7000
    },
    {
      order: 9,
      name: 'xx线',
      flow: 0.65,
      traffic: 6800
    },
  ],
  demonstrationRoad: [
    {
      icon: `img:${icon1}`,
      value: 180,
      unit: 'km',
      name: '国家一号风景大道'
    },
    {
      icon: `img:${icon2}`,
      value: 322,
      unit: 'km',
      name: '绿色塞罕坝红色旅游路'
    },
    {
      icon: `img:${icon3}`,
      value: 435,
      unit: 'km',
      name: '美丽燕塞路'
    }
  ],
  roadWarningBadge: 4,
  meteorologicalWarningBadge: 2,
  sendMsgBadge: 1,
  scenicAreaTotal: 53,
  scenicAreaTotalUnit: '个',
  scenicAreaTotalName: 'A级以上',
  scenicAreaIndicator: [
    {
      name: '5A级',
      value: 2,
      unit: '个',
    },
    {
      name: '4A级',
      value: 12,
      unit: '个',
    },
    {
      name: '3A级',
      value: 25,
      unit: '个',
    },
  ],
  trafficHub: {
    name: '总里程',
    value: 558,
    unit: 'km',
  },
  transportationHub: [
    {
      name: '客运站',
      value: 10,
      unit: '座',
    },
    {
      name: '高铁(火车)站',
      value: 5,
      unit: '座',
    },
    {
      name: '机场',
      value: 1,
      unit: '座',
    },
  ]
})

// 弹窗相关数据
const openDialog = (name: string) => {
  if (name === '国家一号风景大道') {
    nationIsVisible.value = !nationIsVisible.value;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '绿色塞罕坝红色旅游路') {
    journeyIsVisible.value = !journeyIsVisible.value;
    nationIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '美丽燕塞路') {
    roadIsVisible.value = !roadIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '5a旅游区') {
    touristAttractionIsVisible.value = !touristAttractionIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '道路预警') {
    roadWarningIsVisible.value = !roadWarningIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '气象预警') {
    meteorologicalIsVisible.value = !meteorologicalIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    sendMsgIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '信息服务') {
    sendMsgIsVisible.value = !sendMsgIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    roadConditionsIsVisible.value = false;
  } else if (name === '道路状况') {
    roadConditionsIsVisible.value = !roadConditionsIsVisible.value;
    nationIsVisible.value = false;
    journeyIsVisible.value = false;
    roadIsVisible.value = false;
    touristAttractionIsVisible.value = false;
    roadWarningIsVisible.value = false;
    meteorologicalIsVisible.value = false;
    sendMsgIsVisible.value = false;
  }
};

// 国家一号风景大道
const nationIsVisible = ref(false);
// 绿色塞罕坝-红色旅游路
const journeyIsVisible = ref(false);
// 美丽燕塞路
const roadIsVisible = ref(false);
// 5a旅游区
const touristAttractionIsVisible = ref(false);
// 道路预警
const roadWarningIsVisible = ref(false);
// 气象预警
const meteorologicalIsVisible = ref(false);
// 信息服务
const sendMsgIsVisible = ref(false);
// 道路状况
const roadConditionsIsVisible = ref(false);


// 时间选择器相关数据
const selectedYear = ref('2025')
const showDropdown = ref(false)
const yearOptions = ['2023', '2024', '2025']

// 切换下拉框显示状态
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// 选择年份
const selectYear = (year: string) => {
  selectedYear.value = year
  showDropdown.value = false
}

// Tab切换相关数据
const activeTab = ref('mileage')

// 切换Tab
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// 美丽农村精品示范路数据
const ruralRoadData = ref([
  { label: '康原富路', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '丰宁县' },
  { label: '康原富路', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路', code: 'X502', name: '县道宁石线', distanceNum: '18.5', distanceUnit: 'km', county: '双桥区' },
  { label: '康原富路', code: 'X503', name: '县道宁石线', distanceNum: '22.3', distanceUnit: 'km', county: '围场县' },
  { label: '康原富路', code: 'X504', name: '县道宁石线', distanceNum: '15.8', distanceUnit: 'km', county: '隆化县' },
  { label: '康原富路', code: 'X505', name: '县道宁石线', distanceNum: '28.7', distanceUnit: 'km', county: '平泉市' },
  { label: '康原富路', code: 'X506', name: '县道宁石线', distanceNum: '19.2', distanceUnit: 'km', county: '滦平县' },
  { label: '康原富路', code: 'X507', name: '县道宁石线', distanceNum: '25.6', distanceUnit: 'km', county: '承德县' },
  { label: '康原富路', code: 'X508', name: '县道宁石线', distanceNum: '21.4', distanceUnit: 'km', county: '宽城县' }
])

// 3D柱状图配置
const barWidth = 30;
const barGap = 20;
const offsetX = 10;
const offsetY = 10;

const cube3D = {
  getCube(x: number, y: number, x2: number, y2: number, color1: string, color2: string) {
    return {
      type: 'group',
      children: [
        // 正面
        {
          type: 'rect',
          shape: { x, y, width: x2 - x, height: y2 - y },
          style: {
            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: color1 },
              { offset: 1, color: color2 }
            ]),
            stroke: '#ffffff88',
            lineWidth: 1
          }
        },
        // 顶面
        {
          type: 'polygon',
          shape: {
            points: [
              [x, y],
              [x2, y],
              [x2 + offsetX, y - offsetY],
              [x + offsetX, y - offsetY]
            ]
          },
          style: { fill: color1, stroke: '#ffffffaa', lineWidth: 1 }
        },
        // 右侧面
        {
          type: 'polygon',
          shape: {
            points: [
              [x2, y],
              [x2 + offsetX, y - offsetY],
              [x2 + offsetX, y2 - offsetY],
              [x2, y2]
            ]
          },
          style: { fill: color2, stroke: '#ffffff55', lineWidth: 1 }
        }
      ]
    };
  }
};

const barChartOption = ref({
  backgroundColor: 'transparent',
  tooltip: { trigger: 'axis' },
  grid: { left: '0', right: '5%', bottom: '0', top: '20%', containLabel: true },
  legend: {
    data: ['规划里程', '完成里程'],
    top: 0,
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Alibaba PuHuiTi 2.0',
      fontWeight: 400,
      fontSize: 28
    }
  },
  xAxis: {
    type: 'category',
    data: ['路况提升', '绿化提升', '安防提升', '服务设施提升'],
    axisLine: {
      show: true,
      lineStyle: {
        color: '#86FBFB',
      },
    },
    axisTick: {
      show: true,
      lineStyle: { color: '#fff' }
    },
    axisLabel: {
      fontWeight: 500,
      fontSize: 30,
      color: '#FFFFFF',
      align: 'center',
      interval: 0,
      rotate: 0,
      margin: 15,
      rich: {
        a: {
          fontWeight: 500,
          fontSize: 30,
          color: '#FFFFFF',
          lineHeight: 40,
          align: 'center'
        }
      }
    }
  },
  yAxis: {
    type: 'value',
    name: '(公里)',
    nameTextStyle: {
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: 28
    },
    axisLine: { lineStyle: { color: '#fff' } },
    axisLabel: {
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: 28,
      textStyle: {
        fontWeight: 400,
        fontSize: 28,
        color: '#FFFFFF'
      }
    },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
  },
  series: [
    {
      type: 'custom',
      name: '规划里程',
      renderItem: function (params: any, api: any) {
        const value = api.value(1);
        const coord = api.coord([api.value(0), value]);
        const bottom = api.coord([api.value(0), 0]);
        const groupCenter = coord[0];

        const x = groupCenter - barWidth - barGap / 2;
        const x2 = groupCenter - barGap / 2;
        const y = coord[1];
        const y2 = bottom[1];

        return cube3D.getCube(x, y, x2, y2, '#4ad9ff', '#0066ff');
      },
      data: [190, 150, 190, 149]
    },
    {
      type: 'custom',
      name: '完成里程',
      renderItem: function (params: any, api: any) {
        const value = api.value(1);
        const coord = api.coord([api.value(0), value]);
        const bottom = api.coord([api.value(0), 0]);
        const groupCenter = coord[0];

        const x = groupCenter + barGap / 2;
        const x2 = groupCenter + barWidth + barGap / 2;
        const y = coord[1];
        const y2 = bottom[1];

        return cube3D.getCube(x, y, x2, y2, '#7fffbd', '#00994d');
      },
      data: [208, 163, 208, 160]
    },
    // 数值标签 - 规划里程
    {
      type: 'bar',
      data: [190, 150, 190, 149],
      barWidth,
      itemStyle: { color: 'transparent' },
      label: {
        show: true,
        position: 'top',
        color: '#FFFFFF',
        fontFamily: 'Alibaba PuHuiTi 2.0',
        fontWeight: 400,
        fontSize: 28,
        offset: [0, -5]
      },
      z: 10
    },
    // 数值标签 - 完成里程
    {
      type: 'bar',
      data: [208, 163, 208, 160],
      barWidth,
      itemStyle: { color: 'transparent' },
      label: {
        show: true,
        position: 'top',
        color: '#FFFFFF',
        fontFamily: 'Alibaba PuHuiTi 2.0',
        fontWeight: 400,
        fontSize: 28,
        offset: [0, -5]
      },
      z: 10
    }
  ]
});

// 圆柱图配置
const cylinderChartOption = ref({
  backgroundColor: 'transparent',
  color: ['#0C65F6', '#00FFA6', '#F4DF58'],
  grid: {
    left: '8%',
    right: '10%',
    bottom: '15%',
    top: '25%',
  },
  legend: {
    icon: 'rect',
    x: '75%',
    y: '2%',
    orient: 'horizontal',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Alibaba PuHuiTi 2.0',
      fontWeight: 400,
      fontSize: 28
    },
    data: ['规划', '完成'],
  },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['2023', '2024', '2025'],
    axisLine: {
      lineStyle: {
        color: '#86FBFB',
      },
    },
    axisLabel: {
      fontFamily: 'Source Han Sans, Source Han Sans',
      fontWeight: 500,
      fontSize: 36,
      color: '#FFFFFF',
      lineHeight: 52,
      align: 'center',
      interval: 0,
      rotate: 0,
      margin: 15,
      fontStyle: 'normal',
      textTransform: 'none'
    },
    axisTick: {
      show: true,
      lineStyle: { color: '#FFFFFF' }
    },
  },
  yAxis: [{
    type: 'value',
    name: '(万元)',
    nameTextStyle: {
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: 28
    },
    axisLine: { lineStyle: { color: '#fff' } },
    axisLabel: {
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: 28,
      textStyle: {
        fontWeight: 400,
        fontSize: 28,
        color: '#FFFFFF'
      }
    },
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
  }, {
    type: 'value',
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      formatter: '{value}%',
      color: '#FFFFFF',
      fontFamily: 'Alibaba PuHuiTi 2.0',
      fontWeight: 500,
      fontSize: 36
    },
    splitArea: {
      show: false,
    },
  }],
  series: [
    {
      type: 'pictorialBar',
      symbolSize: [40, 12],
      z: 1,
      symbolOffset: [-22, 3],
      itemStyle: {
        color: '#00ABFF',
      },
      data: [512, 198, 766],
    },
    {
      name: '规划',
      type: 'bar',
      z: 2,
      barWidth: 40,
      barMinHeight: 10,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00D5FF' },
          { offset: 1, color: '#00ABFF' },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        color: '#FFFFFF',
        fontFamily: 'Alibaba PuHuiTi 2.0',
        fontWeight: 400,
        fontSize: 24,
        offset: [0, -5]
      },
      data: [512, 198, 766],
    },
    {
      type: 'pictorialBar',
      symbolSize: [40, 12],
      symbolOffset: [-22, -4],
      z: 3,
      symbolPosition: 'end',
      itemStyle: {
        color: '#008FDF',
      },
      data: [512, 198, 766],
    },
    {
      type: 'pictorialBar',
      symbolSize: [40, 12],
      z: 1,
      symbolOffset: [22, 3],
      itemStyle: {
        color: '#7C80BB',
      },
      data: [512, 198, 766],
    },
    {
      name: '完成',
      type: 'bar',
      z: 2,
      barWidth: 40,
      barMinHeight: 10,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#1D1D5D' },
          { offset: 1, color: '#393D7C' },
        ]),
      },
      label: {
        show: true,
        position: 'top',
        color: '#FFFFFF',
        fontFamily: 'Alibaba PuHuiTi 2.0',
        fontWeight: 400,
        fontSize: 24,
        offset: [0, -5]
      },
      data: [319, 998, 512],
    },
    {
      type: 'pictorialBar',
      symbolSize: [40, 12],
      symbolOffset: [22, -4],
      z: 3,
      symbolPosition: 'end',
      itemStyle: {
        color: '#5355A0',
      },
      data: [319, 998, 512],
    },
  ],
});

// 县区获评图表配置
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx: any, shape: any) {
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y]
    const c1 = [shape.x - 20, shape.y - 20]
    const c2 = [xAxisPoint[0] - 20, xAxisPoint[1] - 20]
    const c3 = [xAxisPoint[0], xAxisPoint[1]]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  }
})
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0
  },
  buildPath: function (ctx: any, shape: any) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y]
    const c2 = [xAxisPoint[0], xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 28, xAxisPoint[1] - 14]
    const c4 = [shape.x + 28, shape.y - 14]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
// 绘制顶面
const CubeTop = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape: any) {
    const c1 = [shape.x, shape.y]
    const c2 = [shape.x + 28, shape.y - 14]
    const c3 = [shape.x + 8, shape.y - 34]
    const c4 = [shape.x - 20, shape.y - 20]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  }
})
// 注册三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft)
echarts.graphic.registerShape('CubeRight', CubeRight)
echarts.graphic.registerShape('CubeTop', CubeTop)

// 数据
const VALUE = [170, 140, 168, 90, 169, 92, 171, 138, 140, 90, 143]

const countyChartOption = ref({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params: any) {
      const item = params[1]
      return item.name + "\n" + item.value;
    }
  },
  legend: {
    icon: 'rect',
    left: '85%',
    top: '15%',
    orient: 'horizontal',
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Alibaba PuHuiTi 2.0',
      fontWeight: 400,
      fontSize: 28
    },
    data: [{
      name: '里程',
      itemStyle: {
        color: 'rgba(17, 163, 28, 1)'
      }
    }],
  },
  grid: {
    left: 80,
    right: 80,
    bottom: 0,
    top: 100,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['丰宁县', '围场县', '隆化县', '平泉市', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区'],
    axisLine: {
      show: false,
      lineStyle: {
        color: 'white'
      }
    },
    axisTick: {
      show: false,
      length: 9,
      alignWithLabel: true,
      lineStyle: {
        color: '#7DFFFD'
      }
    },
    axisLabel: {
      show: true,
      fontSize: 24,
      rotate: 45,
      color: '#FFFFFF',
      fontFamily: 'Alibaba PuHuiTi 2.0',
      fontWeight: 400
    },
  },
  yAxis: [
    {
      min: 0,
      max: 250,
      interval: 50,
      type: 'value',
      name: '（公里）',
      nameTextStyle: {
        color: '#FFFFFF',
        fontWeight: 400,
        fontSize: 28
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'white'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(255,255,255,0.1)"
        },
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 24,
        color: '#FFFFFF',
        fontFamily: 'Alibaba PuHuiTi 2.0',
        fontWeight: 400
      },
      boundaryGap: ['20%', '20%']
    },
  ],
  series: [
    {
      name: '里程',
      type: 'custom',
      renderItem: (params: any, api: any) => {
        const location = api.coord([api.value(0), api.value(1)])
        return {
          type: 'group',
          children: [{
            type: 'CubeLeft',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(17, 163, 28, 1)'
              },
              {
                offset: 0.8,
                color: 'rgba(19, 186, 41, 1)'
              }
              ])
            }
          },
          {
            type: 'CubeRight',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(19, 186, 41, 1)'
              },
              {
                offset: 0.8,
                color: 'rgba(24, 208, 34, 1)'
              }
              ])
            }
          }, {
            type: 'CubeTop',
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0],
              y: location[1],
              xAxisPoint: api.coord([api.value(0), 0])
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(24, 208, 34, 1)'
              },
              {
                offset: 1,
                color: 'rgba(17, 163, 28, 1)'
              }
              ])
            }
          }]
        }
      },
      data: VALUE
    }
  ]
});

// 年度获评图表配置
const yearlyChartOption = ref({
  backgroundColor: 'transparent',
  tooltip: {
    backgroundColor: 'rgba(13, 64, 71, 0.50)',
    borderColor: 'rgba(143, 225, 252, 0.60)',
    padding: 8,
    textStyle: {
      color: '#fff',
    }
  },
  grid: {
    left: 80,
    right: 50,
    bottom: 80,
    top: 50,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
      offset: 10,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#C5C5C5",
          width: 1,
          type: "solid"
        }
      },
      axisLabel: {
        textStyle: {
          color: '#F5F5F5',
          fontSize: 24
        }
      },
    }
  ],
  yAxis: [
    {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#979797',
          type: [5, 10],
        },
      },
      name: '（公里）',
      nameTextStyle: {
        color: '#FFFFFF',
        fontWeight: 400,
        fontSize: 28
      },
      axisLabel: {
        textStyle: {
          color: '#F5F5F5',
          fontSize: 24
        }
      },
    },
  ],
  series: [
    // 数据1的柱状图1
    {
      name: '预计',
      type: 'bar',
      barWidth: 45,
      z: 1,
      label: {
        show: false
      },
      itemStyle: {
        opacity: 1,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(47, 104, 159, 1)'
            },
            {
              offset: 0.25,
              color: 'rgba(82, 159, 193, 1)'
            },
            {
              offset: 0.49,
              color: 'rgba(136, 238, 224, 1)'
            },
            {
              offset: 0.57,
              color: 'rgba(188, 245, 236, 1)'
            },
            {
              offset: 0.8,
              color: 'rgba(136, 238, 224, 1)'
            },
            {
              offset: 1,
              color: 'rgba(82, 159, 193, 1)'
            }
          ],
          global: false
        },
      },
      data: [150, 160, 150, 160, 150, 160, 160]
    },
    // 数据1顶部的样式
    {
      name: '',
      type: 'pictorialBar',
      symbolSize: [45, 20],
      symbolOffset: [0, -10],
      z: 2,
      itemStyle: {
        normal: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            1,
            0,
            [
              {
                offset: 1,
                color: 'rgba(188, 245, 236, 1)'
              }
            ],
            false
          ),
          label: {
            show: true,
            position: 'top',
            offset: [0, 0],
            textStyle: {
              color: '#FFFFFF',
              fontSize: 24,
              top: 50
            },
            formatter: function (param: any) {
              return param.data
            }
          }
        }
      },
      symbolPosition: 'end',
      data: [150, 160, 150, 160, 150, 160, 160]
    },
    // 数据1底部的样式
    {
      name: '',
      type: 'pictorialBar',
      symbolSize: [45, 20],
      symbolOffset: [0, -12],
      z: 1,
      itemStyle: {
        normal: {
          opacity: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(47, 104, 159, 1)'
              },
              {
                offset: 0.25,
                color: 'rgba(82, 159, 193, 1)'
              },
              {
                offset: 0.49,
                color: 'rgba(136, 238, 224, 1)'
              },
              {
                offset: 0.57,
                color: 'rgba(188, 245, 236, 1)'
              },
              {
                offset: 0.8,
                color: 'rgba(136, 238, 224, 1)'
              },
              {
                offset: 1,
                color: 'rgba(82, 159, 193, 1)'
              }
            ],
            global: false
          },
          label: {
            show: false,
          }
        }
      },
      symbolPosition: 'end',
      data: [0, 0, 0, 0, 0, 0, 0]
    },
  ]
});
</script>

<style lang="scss" scoped>
.home-left-page {
  width: 1335px;
  height: 100%;
  background-image: url("assets/image/trafficTravel/left/box.png");
  background-size: 100% 100%;
}

.home-left-page-content {
  padding: 100px 45px 60px 45px;
}


.home-left-page-top {
  width: 100%;
  height: 1138px;
  background-image: url("assets/image/trafficTravel/left/content_top.png");
  background-size: 100% 100%;
  position: relative;
}

.home-left-page-middle {
  width: 100%;
  height: 248px;
  background-image: url("assets/image/trafficTravel/left/content_middle.png");
  background-size: 100% 100%;
  position: relative;
}

.home-left-page-bottom {
  width: 100%;
  height: 304px;
  background-image: url("assets/image/trafficTravel/left/content_bottom.png");
  background-size: 100% 100%;
  position: relative;
}

.content-title-bg {
  width: 1238px;
  height: 77px;
  background-image: url("assets/image/trafficTravel/left/content_titleBg.png");
  background-size: 100% 100%;
  position: absolute;
  top: -48px;
  left: 30px;

}

.content-title-bg>span {
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 44px;
  color: #FFFFFF;
  line-height: 64px;
  letter-spacing: 8px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 42px;
}

.home-left-page-top-content {
  width: 100%;
  height: 100%;
  padding: 0px 54px 0px;
}

.home-left-page-middle-content {
  width: 100%;
  height: 100%;
  padding: 52px 42px 32px 32px;
}

.home-left-page-bottom-content {
  width: 100%;
  height: 100%;
  padding: 62px 125px 34px 116px;
  /* overflow: hidden; */
}

.middle-icon-big {
  width: 600px;
  height: 164px;
  background-image: url("assets/image/trafficTravel/left/优背景.png");
  background-size: 100% 100%;
}

.middle-icon-big>span {
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 60px;
  margin-bottom: 5px;
  /* line-height: 120px; */
  /* letter-spacing: 12px; */
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #00FFA5 0%, #00FFD4 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: breathing 2s infinite;
}

.middle-icon {
  width: 172px;
  height: 164px;
  position: relative;
  overflow: inherit;
}

.middle-badge {
  width: 56px;
  height: 56px;
  background: #FB2421;
  font-family: SourceHanSansMedium;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 100;
}

.middle-badge1 {
  width: 56px;
  height: 56px;
  background: #28d317;
  font-family: SourceHanSansMedium;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 26px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  z-index: 100;
}

.list-scroll-content {
  width: 100%;
  height: 85%;
  position: relative;
  overflow: hidden;
}

.sort-num {
  width: 32px;
  height: 32px;
  margin-left: 8px;
  border-radius: 50%;
  background: linear-gradient(180deg, #e3e1dc 0%, #0B4F46 100%);
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 22px;
  color: #FFFFFF;
  line-height: 30px;
  /* text-shadow: 2px 2px 6px rgba(74, 46, 12, 0.7); */
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.sort-item:nth-child(1) .sort-num {
  width: 32px;
  height: 32px;
  background: linear-gradient(180deg, #FFBB00 0%, #FFE600 100%);
}

.sort-item:nth-child(2) .sort-num {
  width: 32px;
  height: 32px;
  background: linear-gradient(180deg, rgba(142, 181, 229, 0.8) 0%, rgba(236, 243, 251, 0.8) 100%);
}

.sort-item:nth-child(3) .sort-num {
  width: 32px;
  height: 32px;
  background: linear-gradient(180deg, #B86C2F 0%, #FFD493 100%);
}

.bottom-content-heard {
  width: 100%;
}

.bottom-content-heard>span {
  font-family: SourceHanSansMedium;
  font-weight: 500;
  font-size: 34px;
  color: #FFFFFF;
  line-height: 24px;
  font-style: normal;
  text-transform: none;
  /* text-align: center; */
}

.sort-item {
  width: 100%;
  margin-top: 24px;
}

.sort-flow-kong {
  width: 500px;
  /* background: #379F87;
  border-radius: 272px 272px 272px 272px; */
  /* opacity: 0.4; */
}

.sort-flow {
  width: 554px;
  height: 12px;
  /* background: #379F87;
  border-radius: 272px 272px 272px 272px; */
  /* opacity: 0.4; */
}

.sort-name {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 32px;
  color: #D3D3D3;
  line-height: 32px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-left: 40px;
}

.sort-traffic {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 32px;
  color: #D3D3D3;
  line-height: 32px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 10px;
}

.line-pro {
  border-radius: 12px;
}

.nobg-title {
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 40px;
  color: #FFFFFF;
  line-height: 58px;
  letter-spacing: 8px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 26px;
  padding: 25px 0px 12px;
}

.under-title-line {
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 246, 0.2);
  position: relative;
}

.under-title-line-before {
  width: 358px;
  height: 6px;
  background: #00FFF6;
  position: absolute;
  top: -4px;
  left: 0;
}

.under-title-line-bottom {
  width: 10px;
  height: 4px;
  background: #00FFF6;
  position: absolute;
  top: -2px;
  right: 0;
}

.scenic-area-box {
  width: 100%;
}

.scenic-area {
  width: 100%;
  padding: 20px 0px 20px;
}

.scenic-area-heard {
  width: 362px;
  height: 166px;
  background-image: url("assets/image/trafficTravel/left/景区背景.png");
  background-size: 100% 100%;
}

.scenic-area-icon {
  width: 104px;
  height: 116px;
  border-radius: 0px 0px 0px 0px;
  margin-left: 45px;
  margin-top: 20px;
}

.scenic-area-total {
  font-family: BebasNeue;
  font-weight: 400;
  font-size: 60px;
  color: #00FED7;
  line-height: 72px;
  font-style: normal;
  text-transform: none;
  margin-top: 10px;
}

.scenic-area-total-unit {
  font-family: SourceHanSansNormal;
  font-weight: 350;
  font-size: 36px;
  color: rgba(227, 255, 245, 0.7);
  line-height: 52px;
  font-style: normal;
  text-transform: none;
}

.scenic-area-heardcontent {
  margin-left: 40px;
}

.scenic-area-total-name {
  font-family: SourceHanSansMedium;
  font-weight: 500;
  font-size: 36px;
  color: #D4EFEA;
  line-height: 52px;
  font-style: normal;
  text-transform: none;
}

.scenic-area-indicator {
  width: 250px;
  height: 166px;
  background-image: url("assets/image/trafficTravel/left/景区指标.png");
  background-size: 100% 100%;
}

.scenic-area-indicator-name {
  width: 250px;
  height: 70px;
  line-height: 60px;
  padding-left: 33px;
  font-family: AlibabaPuHuiTiHeavy;
  font-weight: 500;
  font-size: 36px;
  color: #E3FFF5;
  font-style: normal;
  text-transform: none;
}

.scenic-area-indicator-value {
  width: 250px;
  height: 90px;
  line-height: 90px;
  padding-left: 33px;
  font-family: BebasNeue;
  font-weight: 400;
  font-size: 60px;
  color: #01EFBA;
  font-style: normal;
  text-transform: none;
}

.demonstration-road-box {
  width: 100%;
}

.demonstration-road-content {
  width: 100%;
  padding: 20px 0px 20px;
}

.demonstration-road-item-icon {
  width: 165px;
  height: 140px;
  margin-right: 18px;
}

.scenic-area-indicator-unit {
  width: 64px;
  height: 52px;
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 36px;
  color: rgba(227, 255, 245, 0.7);
  font-style: normal;
  text-transform: none;
  margin-left: 5px;
}

.demonstration-road-item-value {
  font-family: AlibabaPuHuiTiHeavy;
  font-weight: 700;
  font-size: 55px;
  color: #EAFFFC;
  font-style: normal;
  text-transform: none;
}

.demonstration-road-item-unit {
  font-family: SourceHanSansNormal;
  font-weight: 350;
  font-size: 35px;
  color: rgba(227, 255, 245, 0.7);
  font-style: normal;
  text-transform: none;
}

.demonstration-road-item-name {
  width: 160px;
  font-family: BebasNeue;
  font-weight: 400;
  font-size: 32px;
  color: #02D4B4;
  font-style: normal;
  text-transform: none;
}

.demonstration-road-content :nth-of-type(1) .demonstration-road-item-name {
  width: 140px;
}

.travel-box-title {
  width: 368px;
  height: 62px;
  margin-top: 62px;
  background-image: url("assets/image/trafficTravel/left/content_stitle.png");
  background-size: 100% 100%;
}

.travel-box-title1 {
  width: 368px;
  height: 62px;
  margin-top: 25px;
  background-image: url("assets/image/trafficTravel/left/content_stitle.png");
  background-size: 100% 100%;
}

.travel-box-title>span {
  margin-left: 32px;
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 40px;
  color: #FFFFFF;
  line-height: 58px;
  letter-spacing: 6px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.travel-box-title1>span {
  margin-left: 32px;
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 40px;
  color: #FFFFFF;
  line-height: 58px;
  letter-spacing: 6px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.travel-item-content {
  width: 283px;
  height: 142px;
  background-image: url("assets/image/trafficTravel/left/旅游背景.png");
  background-size: 100% 100%;
  margin-top: 14px;
}

.travel-item-content-name {
  width: 283px;
  height: 54px;
  font-family: AlibabaPuHuiTiMedium;
  font-weight: 500;
  font-size: 37px;
  color: #E3FFF5;
  line-height: 54px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.travel-item-content-value {
  width: 283px;
  height: 89px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 70px;
  color: #01EFBA;
  line-height: 89px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.travel-item-content-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 37px;
  color: rgba(227, 255, 245, 0.7);
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 8px;
}

.travel-img-mov {
  width: 765px;
  height: 352px;
  margin-top: 33px;
  position: relative;
}

.travel-img-mov::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("assets/image/trafficTravel/left/旅游背景环形.png");
  background-size: 100% 100%;
  z-index: 0;
}

.travel-img-q {
  width: 112px;
  height: 138px;
  background-image: url("assets/image/trafficTravel/left/旗子.png");
  background-size: 100% 100%;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
}

.travel-img-title {
  font-family: AlibabaPuHuiTiBold;
  font-weight: 700;
  font-size: 38px;
  color: #89FFE1;
  font-style: normal;
  text-transform: none;
  position: absolute;
  top: 135px;
  left: 50%;
  transform: translateX(-50%);
}

.home-left-page-top-content-bottom {
  width: 100%;
  height: 128px;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #01EFBA;
}

.transportation-Hub {
  width: 375px;
  height: 128px;
  background-image: url("assets/image/trafficTravel/left/旅游背景.png");
  background-size: 100% 100%;
}

.transportation-Hub-name {
  width: 375px;
  height: 46px;
  font-family: AlibabaPuHuiTiMedium;
  font-weight: 500;
  font-size: 32px;
  color: #E3FFF5;
  line-height: 45px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.transportation-Hub-value {
  width: 375px;
  height: 76px;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 60px;
  color: #01EFBA;
  line-height: 78px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.transportation-Hub-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 32px;
  color: rgba(227, 255, 245, 0.7);
  line-height: 46px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: relative;
  margin-left: 10px;
}

.travel-img-mov>.travel-img-item {
  width: 163px;
  height: 163px;
  position: absolute;
}

.travel-img-item>span {
  width: 130px;
  font-family: AlibabaPuHuiTiBold;
  font-weight: 700;
  font-size: 30px;
  font-style: normal;
  text-transform: none;
  text-align: center;
  white-space: pre-line;
  background: linear-gradient(0deg, #ffffff 0%, #FFFFFF 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.travel-img-item-img {
  width: 100%;
  height: 100%;
}

.travel-img-mov>.travel-img-item1 {
  background-image: url("assets/image/trafficTravel/left/蓝色气泡.png");
  background-size: 100% 100%;
  animation: anmiteX 10s cubic-bezier(0.6, 0.6, 0.6, 0.6) -4s infinite alternate,
    anmiteY 10s cubic-bezier(0.6, 0.1, 0.3, 0.6) 0s infinite alternate,
    scale 20s cubic-bezier(0.6, 0.3, 0.3, 0.6) 0s infinite alternate;
}

.travel-img-mov>.travel-img-item2 {
  background-image: url("assets/image/trafficTravel/left/绿色气泡.png");
  background-size: 100% 100%;
  animation: anmiteX 10s cubic-bezier(0.6, 0.3, 0.3, 0.6) -8s infinite alternate,
    anmiteY 10s cubic-bezier(0.6, 0.1, 0.3, 0.6) -2s infinite alternate,
    scale 20s cubic-bezier(0.6, 0.3, 0.3, 0.6) -2s infinite alternate;
}

.travel-img-mov>.travel-img-item3 {
  background-image: url("assets/image/trafficTravel/left/蓝色气泡.png");
  background-size: 100% 100%;
  animation: anmiteX 10s cubic-bezier(0.6, 0.3, 0.3, 0.6) -12s infinite alternate,
    anmiteY 10s cubic-bezier(0.6, 0.1, 0.3, 0.6) -6s infinite alternate,
    scale 20s cubic-bezier(0.6, 0.3, 0.3, 0.6) -6s infinite alternate;
}

.travel-img-mov>.travel-img-item4 {
  background-image: url("assets/image/trafficTravel/left/蓝色气泡.png");
  background-size: 100% 100%;
  animation: anmiteX 10s cubic-bezier(0.6, 0.3, 0.3, 0.6) -16s infinite alternate,
    anmiteY 10s cubic-bezier(0.6, 0.1, 0.3, 0.6) -10s infinite alternate,
    scale 20s cubic-bezier(0.6, 0.3, 0.3, 0.6) -10s infinite alternate;
}

.travel-img-mov>.travel-img-item5 {
  background-image: url("assets/image/trafficTravel/left/绿色气泡.png");
  background-size: 100% 100%;
  animation: anmiteX 10s cubic-bezier(0.6, 0.3, 0.3, 0.6) -20s infinite alternate,
    anmiteY 10s cubic-bezier(0.6, 0.1, 0.3, 0.6) -14s infinite alternate,
    scale 20s cubic-bezier(0.6, 0.3, 0.3, 0.6) -14s infinite alternate;
}

/* 在X轴上的移动 */
@keyframes anmiteX {
  from {
    left: 0px;
  }

  to {
    left: 600px;
  }
}

/* 在轴上Y的移动 */
@keyframes anmiteY {
  from {
    top: 0px;
  }

  to {
    top: 180px;
  }
}

/* 对球进行放大和缩小在视觉上进行远近的模拟 */
@keyframes scale {
  0% {
    transform: scale(0.7, 0.7);
  }

  50% {
    transform: scale(1.2, 1.2);
  }

  100% {
    transform: scale(0.7, 0.7);
  }
}

.cloud-content-header {
  align-items: flex-end;

  .total-mileage {
    width: 460px;
    height: 214px;
    position: relative;
    background: url('assets/component/cloude_dialog_img/组 42960.png') no-repeat 100%/100%;

    .total-mileage-icon {
      width: 192px;
      height: 148px;
      background: url('assets/component/cloude_dialog_img/Frame.png') no-repeat 100%/100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 35px;
    }

    .tatal-mileage-content {
      position: absolute;
      right: 65px;
      top: 50%;
      transform: translateY(-50%);
    }

    .tatal-mileage-content div:first-child div:first-child {
      font-family: Bebas Neue, Bebas Neue;
      font-weight: bold;
      font-size: 64px;
      color: #00FED7;
      line-height: 77px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .tatal-mileage-content div:first-child div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 350;
      font-size: 40px;
      color: rgba(227, 255, 245, 0.7);
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .tatal-mileage-content div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 40px;
      color: #D4EFEA;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .roads-one {
    width: 390px;
    height: 174px;
    position: relative;
    background: url('assets/component/cloude_dialog_img/组 41522.png') no-repeat 100%/100%;
  }

  .roads-two {
    width: 368px;
    height: 174px;
    position: relative;
    background: url('assets/component/cloude_dialog_img/组 41519.png') no-repeat 100%/100%;
  }

  .roads {
    width: 246px;
    height: 174px;
    position: relative;
    background: url('assets/component/cloude_dialog_img/组 41519.png') no-repeat;

    .roads-content {
      left: 10px;
    }
  }

  .roads-title {
    position: absolute;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 32px;
    color: #E3FFF5;
    line-height: 45px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    top: 10px;
    left: 28px;
  }

  .roads-content {
    display: flex;
    align-items: end;
    position: absolute;
    bottom: 20px;
    left: 28px;
    gap: 10px;
  }

  .roads-content div:first-child {
    font-family: Bebas Neue, Bebas Neue;
    font-weight: 400;
    font-size: 56px;
    color: #01EFBA;
    line-height: 67px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .roads-content div:last-child {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 350;
    font-size: 36px;
    color: rgba(227, 255, 245, 0.7);
    line-height: 52px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.cloud-content-acount {
  display: flex;
  flex-direction: column;
  gap: 48px;
  margin-top: 48px;

  .cloud-content-acount-item {
    display: flex;
    gap: 20px
  }

  .cloud-content-acount-item>div:first-child {
    width: 189px;
    height: 168px;
    margin-left: 10px;
    background: url('assets/component/cloude_dialog_img/组 43018.png') no-repeat 116%/116%;
    background-position: 50% 50%;
    position: relative;
  }

  .cloud-content-acount-item>div:first-child>div {
    position: absolute;
    top: 20px;
    left: 45px;
    width: 112px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Bebas Neue, Bebas Neue;
    font-weight: 400;
    font-size: 48px;
    color: #00FFDD;
    font-style: normal;
    background: url('assets/component/cloude_dialog_img/服务 设施.png') no-repeat 100%/100%;
  }

  .cloud-content-acount-item>div:last-child {
    width: 1044px;
    height: 168px;
    background: url('assets/component/cloude_dialog_img/组 42995.png') no-repeat 100%/100%;
    background-position: 0% 43%;
  }

  .cloud-content-acount-item-server {
    display: flex;
    height: 100%;
    width: 100%;
    gap: 120px;
    padding-left: 90px;
    padding-top: 15px;
    box-sizing: border-box;

    .cloud-content-acount-item-server-item {
      display: flex;
      flex-direction: column;
      justify-content: start;
    }

    .cloud-content-acount-item-server-item>div:first-child {
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 500;
      font-size: 36px;
      color: #E3FFF5;
      line-height: 50px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .cloud-content-acount-item-server-item>div:last-child {
      display: flex;
      align-items: end;
      gap: 12px;
    }

    .cloud-content-acount-item-server-item>div:last-child>div:first-child {
      font-family: Bebas Neue, Bebas Neue;
      font-weight: bold;
      font-size: 64px;
      color: #01EFBA;
      line-height: 77px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .cloud-content-acount-item-server-item>div:last-child>div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 350;
      font-size: 36px;
      color: rgba(227, 255, 245, 0.7);
      line-height: 52px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .cloud-content-acount-item-join {
    display: flex;
    height: 100%;
    width: 100%;
    gap: 20px;
    padding-left: 60px;
    padding-top: 15px;
    box-sizing: border-box;

    .cloud-content-acount-item-join-item {
      display: flex;
      flex-direction: column;
      justify-content: start;
    }

    .cloud-content-acount-item-join-item>div:first-child {
      white-space: nowrap;
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 500;
      font-size: 36px;
      color: #E3FFF5;
      line-height: 50px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .cloud-content-acount-item-join-item>div:last-child {
      display: flex;
      align-items: end;
      gap: 12px;
    }

    .cloud-content-acount-item-join-item>div:last-child>div:first-child {
      font-family: Bebas Neue, Bebas Neue;
      font-weight: bold;
      font-size: 64px;
      color: #01EFBA;
      line-height: 77px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .cloud-content-acount-item-join-item>div:last-child>div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 350;
      font-size: 36px;
      color: rgba(227, 255, 245, 0.7);
      line-height: 52px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}

.cloud-content-char {
  width: 1242px;
  height: 938px;
  margin-top: 90px;
  background: rgba(8, 40, 37, 0.7);
  box-shadow: inset 0px -12px 49px 0px rgba(82, 174, 160, 0.7);
  border-radius: 21px 21px 21px 21px;
  position: relative;
  padding: 52px;
  box-sizing: border-box;

  .cloud-content-char-title {
    width: 1238px;
    height: 77px;
    background: url('assets/component/cloude_dialog_img/路径 5737.png') no-repeat 100%/100%;
    position: absolute;
    top: -40px;
    left: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;

    .text {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 700;
      font-size: 44px;
      color: #FFFFFF;
      line-height: 78px;
      letter-spacing: 8px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 45px;
    }

    .time-select {
      position: relative;
      margin-right: 50px;

      .time-selector {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        padding: 8px 16px;
        background: rgba(8, 40, 37, 0.8);
        border: 1px solid rgba(227, 255, 245, 0.3);
        border-radius: 8px;
        min-width: 120px;
        justify-content: space-between;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(8, 40, 37, 0.9);
          border-color: rgba(227, 255, 245, 0.5);
        }

        .selected-year {
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 500;
          font-size: 36px;
          color: #E3FFF5;
          line-height: 50px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .dropdown-arrow {
          font-size: 20px;
          color: #E3FFF5;
          transition: transform 0.3s ease;

          &.rotate {
            transform: rotate(180deg);
          }
        }
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(8, 40, 37, 0.95);
        border: 1px solid rgba(227, 255, 245, 0.3);
        border-radius: 8px;
        margin-top: 4px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

        .dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
          font-weight: 500;
          font-size: 36px;
          color: #E3FFF5;
          line-height: 50px;
          text-align: left;
          font-style: normal;
          text-transform: none;

          &:hover {
            background: rgba(227, 255, 245, 0.1);
          }

          &.active {
            background: rgba(1, 239, 186, 0.2);
            color: #01EFBA;
          }

          &:first-child {
            border-radius: 8px 8px 0 0;
          }

          &:last-child {
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }

  .cloud-content-char-box {
    display: flex;
    flex-direction: column;
  }

  .chart-tab-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px 0;
  }

  .chart-tab-buttons {
    display: flex;
  }

  .chart-tab-button {
    width: 156px;
    height: 57px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    // 默认未选中样式（投资）
    background: rgba(6, 140, 107, 0.05);
    box-shadow: inset 0px 0px 36px 0px #01634B;
    border-radius: 0px 10px 10px 0px;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 41px;
    text-align: center;
    font-style: normal;
    text-transform: none;

    &:first-child {
      border-radius: 10px 0px 0px 10px;
    }

    &:last-child {
      border-radius: 0px 10px 10px 0px;
    }

    // 选中样式（里程）
    &.active {
      background: rgba(6, 140, 107, 0.01);
      box-shadow: inset 0px 0px 27px 0px #068C6B;
      border: 2px solid #068C6B;
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 28px;
      color: #89FFE1;
      line-height: 39px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      &:first-child {
        border-radius: 10px 0px 0px 10px;
      }

      &:last-child {
        border-radius: 0px 10px 10px 0px;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }

  .char-cylinder {
    display: flex;
    flex-direction: column;
    height: 100%;

    .cylinder-chart-title {
      padding: 15px 0 15px 20px;
      text-align: left;
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 36px;
      color: #D4EFEA;
      line-height: 50px;
      font-style: normal;
      text-transform: none;
    }

    .cylinder-chart-content {
      flex: 1;
      width: 100%;
      min-height: 0;
    }
  }
}

.road-dialog-header {
  display: flex;
  align-items: center;
  gap: 230px;
  margin-left: 15%;
  margin-top: 40px;

  .total-mileage {
    width: 460px;
    height: 214px;
    position: relative;

    .total-mileage-icon {
      width: 192px;
      height: 148px;
      background: url('assets/component/cloude_dialog_img/Frame.png') no-repeat 100%/100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 35px;
    }

    .tatal-mileage-content {
      position: absolute;
      right: 65px;
      top: 50%;
      transform: translateY(-50%);
    }

    .tatal-mileage-content div:first-child div:first-child {
      font-family: Bebas Neue, Bebas Neue;
      font-weight: bold;
      font-size: 64px;
      color: #00FED7;
      line-height: 77px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .tatal-mileage-content div:first-child div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 350;
      font-size: 40px;
      color: rgba(227, 255, 245, 0.7);
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .tatal-mileage-content div:last-child {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 40px;
      color: #D4EFEA;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .total-acount {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 40px;
    color: #E3FFF5;
  }
}

.road-dialog-content {
  margin-top: 70px;
  width: 1230px;
  height: 1350px;
  background: rgba(8, 40, 37, 0.7);
  box-shadow: inset 0px -12px 49px 0px rgba(82, 174, 160, 0.7);
  border-radius: 21px 21px 21px 21px;
  display: flex;
  flex-direction: column;
  position: relative;

  .road-dialog-content-title {
    width: 1238px;
    height: 77px;
    background: url('assets/component/cloude_dialog_img/路径 5737.png') no-repeat 100%/100%;
    position: absolute;
    top: -40px;
    left: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 45px;

    .text {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 700;
      font-size: 44px;
      color: #FFFFFF;
      line-height: 78px;
      letter-spacing: 8px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 45px;
    }
  }

  .chart-tab-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0 10px 0;
    margin-top: 50px;
  }

  .chart-tab-buttons {
    display: flex;
  }

  .chart-tab-button {
    width: 156px;
    height: 57px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;

    // 默认未选中样式（投资）
    background: rgba(6, 140, 107, 0.05);
    box-shadow: inset 0px 0px 36px 0px #01634B;
    border-radius: 0px 10px 10px 0px;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 41px;
    text-align: center;
    font-style: normal;
    text-transform: none;

    &:first-child {
      border-radius: 10px 0px 0px 10px;
    }

    &:last-child {
      border-radius: 0px 10px 10px 0px;
    }

    // 选中样式（里程）
    &.active {
      background: rgba(6, 140, 107, 0.01);
      box-shadow: inset 0px 0px 27px 0px #068C6B;
      border: 2px solid #068C6B;
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 28px;
      color: #89FFE1;
      line-height: 39px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      &:first-child {
        border-radius: 10px 0px 0px 10px;
      }

      &:last-child {
        border-radius: 0px 10px 10px 0px;
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }
}

// 表格样式
.table-box {
  .demo-table {
    width: 100%;
    height: 380px;
    overflow: hidden;
  }

  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .table-body-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100% - 50px);

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(8, 40, 37, 0.5);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #52AEA0 0%, #208760 100%);
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(180deg, #7CBEB4 0%, #2A9A7A 100%);
      }
    }

    &::-webkit-scrollbar-corner {
      background: rgba(8, 40, 37, 0.5);
    }

    .rural-road-table {
      width: 100%;
    }
  }

  .rural-road-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: transparent;
    table-layout: fixed;

    th,
    td {
      &:nth-child(1) {
        width: 18%;
      }

      // 标号
      &:nth-child(2) {
        width: 18%;
      }

      &:nth-child(3) {
        width: 24%;
      }

      &:nth-child(4) {
        width: 18%;
      }

      &:nth-child(5) {
        width: 22%;
      }

      box-sizing: border-box;
    }

    thead {
      tr {
        background: rgba(1, 62, 60, 0.9);
        height: 50px;

        th {
          padding: 12px 20px;
          font-family: 'Alibaba PuHuiTi 2.0', sans-serif;
          font-weight: 600;
          font-size: 26px;
          color: #FFFFFF;
          text-align: center;
          border: none;
          background: rgba(1, 62, 60, 0.9);
          position: sticky;
          top: 0;
          z-index: 10;

          &:first-child {
            border-left: none;
          }

          &:last-child {
            border-right: none;
          }
        }
      }
    }

    tbody {
      tr {
        background: rgba(4, 65, 40, 0.3);
        border-radius: 0px 0px 0px 0px;
        transition: all 0.3s ease;
        height: 50px;

        &:hover {
          background: rgba(82, 174, 160, 0.3);
          transform: scale(1.01);
        }

        &:nth-child(even) {
          background: rgba(1, 62, 60, 0.9);

          &:hover {
            background: rgba(82, 174, 160, 0.2);
          }
        }

        td {
          padding: 12px 20px;
          font-family: 'Alibaba PuHuiTi 2.0', sans-serif;
          font-weight: 400;
          font-size: 24px;
          color: #E3FFF5;
          text-align: center;
          border: none;

          &.highlight {
            color: #FFE600;
            font-weight: 500;
          }

          &.distance-cell {
            text-align: center;

            .distance-number {
              font-weight: 500;
              font-size: 22px;
              color: #51C205;
              line-height: 32px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }

            .distance-unit {
              font-weight: 400;
              font-size: 22px;
              color: #D3D3D3;
              line-height: 32px;
              text-align: left;
              font-style: normal;
              text-transform: none;
              margin-left: 4px;
            }
          }

          &:first-child {
            border-left: none;
          }

          &:last-child {
            border-right: none;
          }
        }
      }

      tr:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
