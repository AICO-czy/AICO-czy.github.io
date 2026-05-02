<template>
  <div class="vertical-legend">
    <div class="legend-item cursor-pointer" v-for="item in imgList" :key="item.icon"
      @click="openLegendDialog(item.title)">
      <q-img :src="item.icon" class="legend-img" alt=""></q-img>
      <div class="legend-text">{{ item.title }}</div>
    </div>
  </div>
  <div class="vertical-legend-diglog1" v-if="activeDialog === '枢纽'">
    <div class="fit column">
      <div class="legend-diglog-item cursor-pointer col row justify-center items-center" v-for="item in dataDiglog1"
        :key="item.icon" @click="selectItem(item.label)">
        <!-- <q-img :src="`src/assets/component/城市交通/切图 ${item.icon}.png`" class="legend-img" alt=""></q-img> -->
        <div class="legend-text1" :class="{ 'active-legend-text1': activeItem === item.label }">{{ item.label }}</div>
      </div>
    </div>
  </div>
  <div class="vertical-legend-diglog2" v-if="activeDialog === '景区'">
    <div class="fit column">
      <div class="legend-diglog-item cursor-pointer col row justify-center items-center" v-for="item in dataDiglog2"
        :key="item.icon" @click="activeItem = item.label">
        <!-- <q-img :src="`src/assets/component/城市交通/切图 ${item.icon}.png`" class="legend-img" alt=""></q-img> -->
        <div class="legend-text1" :class="{ 'active-legend-text1': activeItem === item.label }">{{ item.label }}</div>
      </div>
    </div>
  </div>
  <div class="vertical-legend-diglog3" v-if="activeDialog === '商圈'">
    <div class="fit column">
      <div class="legend-diglog-item cursor-pointer col row justify-center items-center" v-for="item in dataDiglog3"
        :key="item.icon" @click="activeItem = item.label">
        <!-- <q-img :src="`src/assets/component/城市交通/切图 ${item.icon}.png`" class="legend-img" alt=""></q-img> -->
        <div class="legend-text1" :class="{ 'active-legend-text1': activeItem === item.label }">{{ item.label }}</div>
      </div>
    </div>
  </div>
  <div class="vertical-legend-diglog4" v-if="activeDialog === '学校'">
    <div class="fit column">
      <div class="legend-diglog-item cursor-pointer col row justify-center items-center" v-for="item in dataDiglog4"
        :key="item.icon" @click="activeItem = item.label">
        <!-- <q-img :src="`src/assets/component/城市交通/切图 ${item.icon}.png`" class="legend-img" alt=""></q-img> -->
        <div class="legend-text1" :class="{ 'active-legend-text1': activeItem === item.label }">{{ item.label }}</div>
      </div>
    </div>
  </div>
  <div class="vertical-legend-diglog5" v-if="activeDialog === '医院'">
    <div class="fit column">
      <div class="legend-diglog-item cursor-pointer col row justify-center items-center" v-for="item in dataDiglog5"
        :key="item.icon" @click="activeItem = item.label">
        <!-- <q-img :src="`src/assets/component/城市交通/切图 ${item.icon}.png`" class="legend-img" alt=""></q-img> -->
        <div class="legend-text1" :class="{ 'active-legend-text1': activeItem === item.label }">{{ item.label }}</div>
      </div>
    </div>
  </div>
  <div class="vertical-legend-echart" v-if="activeItem && activeDialog">
    <div class="vertical-legend-echart-content column">
      <div class="content-top-select row col-auto">
        <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
          :class="{ 'active': selsectBtn === item }" @click="handleSelect1(item)">
          {{ item }}
        </div>
      </div>
      <v-chart :option="option" autoplay class="col" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { log } from 'console';
import { open } from 'fs';
import { label } from 'three/tsl';
import { ref } from 'vue';
import img1 from 'src/assets/image/urbanTraffic/切图 777.png'
import img2 from 'src/assets/image/urbanTraffic/切图 778.png'
import img3 from 'src/assets/image/urbanTraffic/切图 779.png'
import img4 from 'src/assets/image/urbanTraffic/切图 780.png'
import img5 from 'src/assets/image/urbanTraffic/切图 781.png'


const imgList = ref([
  { icon: img1, title: '枢纽', check: true, btntype: 'circle' },
  { icon: img2, title: '景区', check: true, btntype: 'circle' },
  { icon: img3, title: '商圈', check: false, btntype: 'circle' },
  { icon: img4, title: '学校', check: false, btntype: 'circle' },
  { icon: img5, title: '医院', check: false, btntype: 'circle' },
])
const activeDialog = ref('');

const activeItem = ref('');
const selsectBtns = ['今日', '近7日']
const selsectBtn = ref('今日')
const dataDiglog1 = ref([
  { icon: '58', label: '承德南站' },
  { icon: '58', label: '火车站' },
  { icon: '58', label: '承德东站' },
  { icon: '58', label: '普宁机场' },
])

const dataDiglog2 = ref([
  { icon: '58', label: '避暑山庄' },
  { icon: '58', label: '普陀宗乘之庙' },
  { icon: '58', label: '磬棰峰' },
  { icon: '58', label: '普宁寺' },
])

const dataDiglog3 = ref([
  { icon: '58', label: '万达广场' },
  { icon: '58', label: '金龙购物广场' },
  { icon: '58', label: '南营子大街' },
  { icon: '58', label: '双百购物广场' },
])

const dataDiglog4 = ref([
  { icon: '58', label: '实验小学' },
  { icon: '58', label: '南营子小学' },
  { icon: '58', label: '河北民族师范学院附属中学' },
  { icon: '58', label: '承德市民族小学' },
])

const dataDiglog5 = ref([
  { icon: '58', label: '承德医学附属医院' },
  { icon: '58', label: '承德医学附属医院南院' },
  { icon: '58', label: '承德市中心医院' },
  { icon: '58', label: '中国人民解放军联勤保障部队九八一医院' },
])

const openLegendDialog = (title: string) => {
  if (title === activeDialog.value) {
    activeDialog.value = '';
    return;
  }
  activeDialog.value = title;
}

const selectItem = (title: string) => {
  activeItem.value = title;
}

const option = ref({
  legend: {
    data: [{ name: '巡游车车均送运距离', icon: 'rect' }, { name: '网约车车均送运距离', icon: 'rect' },   // 修改为长方形图标
      ''],
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    itemGap: 100, // 图例项之间的间距
    itemWidth: 20, // 图例标记的宽度
    itemHeight: 20, // 图例标记的高度
    top: '5%',
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '8%',
    top: '20%',
    containLabel: true
  },
  xAxis: {
    data: ['01:00', '02:00', '03:00', '04:00', '05:00'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [10, 30, 0, 0]
    },
    splitLine: { show: false, lineStyle: { type: 'dashed' } }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:km',
      nameLocation: 'end',
      nameGap: 30,
      nameTextStyle: {
        color: '#C6CECF',
        fontSize: 30,
      },
      position: 'left',
      axisLabel: {
        color: '#C6CECF',
        fontSize: 30,
        formatter: '{value}'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)",
          width: 2
        }
      },
      min: 0,  // ✅ 强制从0开始
      // max: 25  // ✅ 设置合适最大值
    }
  ],
  color: ['#478af2'],
  series: [
    // 柱状图系列（主Y轴）
    {
      name: '巡游车车均送运距离',
      type: 'pictorialBar',
      barCategoryGap: '10%', // ✅ 调整柱子间距
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0095FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 200, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [210, 190, 180, 170, 160],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '网约车车均送运距离',
      type: 'pictorialBar',
      barCategoryGap: '10%', // ✅ 调整柱子间距
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#1EE7E7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [230, 210, 190, 180, 170],
      z: 10,
      symbolOffset: [-10, 0] // ✅ 消除图标偏移
    },
    {
      name: 'glyph',
      type: 'pictorialBar',
      yAxisIndex: 0,
      barGap: '-50%',
      symbolPosition: 'end',
      symbolSize: 30,
      symbolOffset: [0, '-50%']
    }
  ]
})
</script>

<style scoped>
.vertical-legend {
  position: fixed;
  top: 1257px;
  left: 1710px;
  z-index: 7000 !important;
}

.legend-item {
  margin-bottom: 30px;
  position: relative;
}

.legend-img {
  width: 128px;
  height: 133px;
}

.legend-text {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 40px;
  line-height: 55px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #CCFAFF 0%, #F2FEFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: absolute;
  left: 20px;
  bottom: -10px;
}

.vertical-legend-diglog1 {
  width: 434px;
  height: 500px;
  padding: 20px 23px 20px 53px;
  background: url('assets/component/城市交通/切图 870.png');
  background-size: 100% 100%;
  position: fixed;
  top: 1257px;
  left: 1850px;
  z-index: 7000 !important;
}

.vertical-legend-diglog2 {
  width: 434px;
  height: 500px;
  padding: 20px 23px 20px 53px;
  background: url('assets/component/城市交通/切图 871.png');
  background-size: 100% 100%;
  position: fixed;
  top: 1407px;
  left: 1850px;
  z-index: 7000 !important;
}

.vertical-legend-diglog3 {
  width: 434px;
  height: 500px;
  padding: 20px 23px 20px 53px;
  background: url('assets/component/城市交通/切图 872.png');
  background-size: 100% 100%;
  position: fixed;
  top: 1407px;
  left: 1850px;
  z-index: 7000 !important;
}

.vertical-legend-diglog4 {
  width: 434px;
  height: 500px;
  padding: 20px 23px 20px 53px;
  background: url('assets/component/城市交通/切图 873.png');
  background-size: 100% 100%;
  position: fixed;
  top: 1587px;
  left: 1850px;
  z-index: 7000 !important;
}

.vertical-legend-diglog5 {
  width: 434px;
  height: 703px;
  padding: 20px 23px 20px 53px;
  background: url('assets/component/城市交通/切图 874.png');
  background-size: 100% 100%;
  position: fixed;
  top: 1407px;
  left: 1850px;
  z-index: 7000 !important;
}

.legend-diglog-item {
  width: 100%;
  background: rgba(4, 12, 23, 0.5);
  border-radius: 0px 0px 0px 0px;
  text-align: center;
  border-bottom: 1px solid #6eaeea9d;
}

.legend-text1 {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.active-legend-text1 {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #EFFFFD 0%, #40FFEC 66%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.vertical-legend-echart {
  width: 1420px;
  height: 632px;
  padding: 60px;
  background: url('assets/component/城市交通/切图 862.png');
  background-size: 100% 100%;
  position: fixed;
  top: 492px;
  left: 3984px;
  z-index: 7000 !important;
}

.vertical-legend-echart-content {
  width: 100%;
  height: 100%;

  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
}

.content-top-select {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 20px;
  padding-right: 40px;
}

.content-top-select-item1 {
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

.content-top-select-item1.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}
</style>
