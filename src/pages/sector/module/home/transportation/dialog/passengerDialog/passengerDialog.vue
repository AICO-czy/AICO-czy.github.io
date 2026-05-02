<template>
  <q-dialog seamless v-model="isPassengerDialogVisible">
    <div class="dialog-content">
      <div class="content-title">公路客运</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <q-scroll-area class="fit" :thumb-style="state.thumbStyle" :bar-style="state.barStyle">
          <div class="box-basic">
            <div class="box-big-title">
              公路客运基本情况
            </div>
            <div class="row box-basic-content justify-between">
              <div class="basic-content-left column items-center">
                <q-img class="basic-img" :src="img1"></q-img>
                <span class="basic-value">22家</span>
                <span class="basic-name">公路客运企业</span>
              </div>
              <div class="basic-content-middle row">
                <div class="basic-point">
                  <q-img class="fit" :src="img2"></q-img>
                </div>
                <div class="basic-middle-left column items-center">
                  <q-img class="basic-img" :src="img3"></q-img>
                  <span class="basic-value">5个</span>
                  <span class="basic-name">客运站</span>
                </div>
                <div class="basic-middle-right column justify-evenly">
                  <div class="row items-center">
                    <q-icon class="basic-simg" :name="`img:${icon1}`"></q-icon>
                    <span class="basic-name">一级客运站:</span>
                    <div class="row items-center">
                      <span class="basic-value">3</span>
                      <span class="basic-unit">个</span>
                    </div>
                  </div>
                  <div class="row items-center">
                    <q-icon class="basic-simg" :name="`img:${icon1}`"></q-icon>
                    <span class="basic-name">二级客运站:</span>
                    <div>
                      <span class="basic-value">2</span>
                      <span class="basic-unit">个</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="basic-content-right column items-center">
                <q-img class="basic-img" :src="img4"></q-img>
                <span class="basic-value">24条</span>
                <span class="basic-name">经营路线</span>
              </div>
            </div>
          </div>
          <div class="box-service">
            <div class="box-service-top row justify-between">
              <div class="box-big-title">
                公路客运基本情况
              </div>
              <div class="box-service-toggle row">
                <div class="box-service-toggle-item"
                  :class="{ 'box-service-toggle-item-active': state.selectedToggle === item }"
                  v-for="item in state.selectedBtns" :key="item" @click="state.selectedToggle = item">
                  {{ item }}
                </div>
              </div>
            </div>
            <div class="box-service-content column">
              <div class="box-service-content-top col-auto">
                <ItemTitle title="总体运输趋势"></ItemTitle>
                <div class="row justify-evenly items-center">
                  <div class="row items-center">
                    <q-icon class="basic-simg" :name="`img:${icon1}`"></q-icon>
                    <span class="basic-name dividing-space">发车班次:</span>
                    <div class="row items-center">
                      <span class="basic-value">47</span>
                      <span class="basic-unit">班次</span>
                    </div>
                  </div>
                  <div class="dividing-line"></div>
                  <div class="row items-center">
                    <q-icon class="basic-simg" :name="`img:${icon1}`"></q-icon>
                    <span class="basic-name dividing-space">发车旅客:</span>
                    <div>
                      <span class="basic-value ">3371</span>
                      <span class="basic-unit">人次</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="box-service-content-chart col column">
                <ItemTitle title="站点旅客发送量"></ItemTitle>
                <v-chart autoresize :option="serviceOption" class="col full-width" />
              </div>
              <div class="box-service-content-chart col column">
                <ItemTitle title="站点发车趟次"></ItemTitle>
                <v-chart autoresize :option="serviceOption1" class="col full-width" />
              </div>
            </div>
          </div>

          <div class="box-whereabouts column">
            <ItemTitle title="旅客去向分布"></ItemTitle>
            <div class="box-whereabouts-content row col">
              <div class="chart-content-bottom-left col full-width">
                <v-chart autoresize :option="whereaboutsOptionLeft" class="fit" />
              </div>
              <v-chart autoresize :option="whereaboutsOptionRight" class="col full-width" />
            </div>
          </div>
          <div class="box-transport-capacity">
            <div class="box-big-title">
              公路运输运力供给分析
            </div>
            <div class="box-transport-capacity-content column">
              <div class="box-transport-capacity-content-top col column">
                <ItemTitle title="月度运力供给分析"></ItemTitle>
                <v-chart autoresize :option="transportCapacityOption1" class="col full-width" />
              </div>
              <div class="box-transport-capacity-content-bottom col column">
                <ItemTitle title="月度运力需求分析"></ItemTitle>
                <v-chart autoresize :option="transportCapacityOption2" class="col full-width" />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useTransportationDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";

import icon1 from 'src/assets/image/dialog/圆点.png'
import img1 from 'src/assets/image/dialog/切图 244.png'
import img2 from 'src/assets/image/dialog/切图 58.png'
import img3 from 'src/assets/image/dialog/切图 244 (1).png'
import img4 from 'src/assets/image/dialog/切图 244 (2).png'

const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);
const isPassengerDialogVisible = computed(() => showTransportationDialog.value === 'passenger');

const state = reactive({
  selectedToggle: '今日',
  selectedBtns: ['今日', '本月', '上月'],
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: 0.75,
  },
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: 0.2,
  },
});
const serviceOption = ref({
  grid: {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  tooltip: {
    // 格式化提示内容
    formatter: function (params) {
      return params.name +
        ' : ' + params.value
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: false,
        lineStyle: {
          color: 'rgb(41,188,245,.3)',
        },
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: 'rgba(174, 184, 192, 1)',
          fontSize: 30,
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#233653',
        },
      },
      axisTick: {
        show: false,
      },
      data: ['汽车东站', '客运总站', '汽车西站', 'xxxx', 'xxxx', 'xxxx'],
    },
  ],
  yAxis: [
    {
      name: "单位:人次",
      triggerEvent: true,
      nameTextStyle: {
        color: 'rgba(174, 184, 192, 1)',
        fontSize: 30,
        padding: [0, 0, 10, -30]
      },
      // interval: 10,
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(130, 144, 157, 0.34)',
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#233653',
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(174, 184, 192, 1)',
          fontSize: 30,
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "",
      type: 'bar',
      z: 1,
      data: [28, 25, 45, 32, 30, 15],
      barWidth: '23px',
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
                color: 'rgba(255, 189, 129, 1)',
              },
              {
                offset: 1,
                color: 'rgba(255, 189, 129, 0)',
              },
            ],
            global: false, //  缺省为  false
          } // 0% 处的颜色
        }
      },
    },
    {
      name: "",
      barGap: '-185%',
      type: 'bar',
      z: 0,
      data: [50, 50, 50, 50, 50, 50],
      barWidth: '63px',
      itemStyle: {
        normal: {
          color: 'rgba(255, 228, 200, 0.06)' // 0% 处的颜色
        }
      },
    },
  ]
})
const serviceOption1 = ref({
  grid: {
    top: '15%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true
  },
  tooltip: {
    // 格式化提示内容
    formatter: function (params) {
      return params.name +
        ' : ' + params.value
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: false,
        lineStyle: {
          color: 'rgb(41,188,245,.3)',
        },
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: 'rgba(174, 184, 192, 1)',
          fontSize: 30,
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#233653',
        },
      },
      axisTick: {
        show: false,
      },
      data: ['汽车东站', '客运总站', '汽车西站', 'xxxx', 'xxxx', 'xxxx'],
    },
  ],
  yAxis: [
    {
      name: "单位:班次",
      triggerEvent: true,
      nameTextStyle: {
        color: 'rgba(174, 184, 192, 1)',
        fontSize: 30,
        padding: [0, 0, 10, -30]
      },
      // interval: 10,
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(130, 144, 157, 0.34)',
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#233653',
        },
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgba(174, 184, 192, 1)',
          fontSize: 30,
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "",
      type: 'bar',
      z: 1,
      data: [28, 25, 45, 32, 30, 15],
      barWidth: '23px',
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
                color: 'rgba(111, 242, 164, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(41, 206, 211, 1)',
              },
              {
                offset: 1,
                color: 'rgba(255, 189, 129, 0)',
              },
            ],
            global: false, //  缺省为  false
          } // 0% 处的颜色
        }
      },
    },
    {
      name: "",
      barGap: '-185%',
      type: 'bar',
      z: 0,
      data: [50, 50, 50, 50, 50, 50],
      barWidth: '63px',
      itemStyle: {
        normal: {
          color: 'rgba(255, 228, 200, 0.06)' // 0% 处的颜色
        }
      },
    },
  ]
})
function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  k = typeof k !== 'undefined' ? k : 1 / 3;

  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  let hoverRate = isHovered ? 1.05 : 1;

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 * height : -1;
    }
  };
}
function getPie3D(pieData: any[], internalDiameterRatio: number) {
  let series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {};
      if (typeof pieData[i].itemStyle.color != 'undefined') itemStyle.color = pieData[i].itemStyle.color;
      if (typeof pieData[i].itemStyle.opacity != 'undefined') itemStyle.opacity = pieData[i].itemStyle.opacity;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }

  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: { show: false },
    itemStyle: { opacity: 0.05, color: '#E1E8EC' },
    parametricEquation: {
      u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
      v: { min: 0, max: Math.PI, step: Math.PI / 20 },
      x: function (u: number, v: number) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: number, v: number) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: number, v: number) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      }
    }
  });

  return series;
}

const pieData2 = [
  { name: '省内', value: 40, itemStyle: { color: 'rgba(120, 225, 255, 1)', opacity: 0.6 } },
  { name: '省外', value: 30, itemStyle: { color: 'rgba(14, 141, 121, 1)', opacity: 0.6 } },
  { name: '市内', value: 20, itemStyle: { color: 'rgba(234, 177, 97, 1)', opacity: 0.6 } },
];

const series2 = getPie3D(pieData2, 0.8);
const whereaboutsOptionLeft = ref({
  backgroundColor: 'transparent',
  animation: true,
  silent: false,
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: 'rgba(0, 15, 30, 0.9)',
    borderColor: '#00D4FF',
    borderWidth: 2,
    padding: [12, 16],
    borderRadius: 6,
    textStyle: {
      fontSize: 14,
      fontFamily: 'AlibabaPuHuiTiRegular',
      color: '#FFFFFF'
    },
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
    formatter: function (params: any) {
      if (params.seriesName === 'mouseoutSeries') return '';
      const color = params.color || '#00D4FF';
      const name = params.seriesName;
      const pieDataItem = pieData2.find(item => item.name === name);
      const value = pieDataItem ? pieDataItem.value : 0;
      return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
                </div>
            </div>`;
    }
  },
  xAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  yAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  zAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  grid3D: {
    show: false,
    boxHeight: 1,
    top: '15%',
    left: '5%',
    height: '60%',
    environment: 'none',
    light: {
      main: {
        intensity: 1.2,
        shadow: false
      },
      ambient: {
        intensity: 0.5
      }
    },
    viewControl: {
      distance: 100,
      alpha: 25,
      beta: 60,
      autoRotate: false,
      enableRotate: true,
      enableZoom: false,
      enablePan: false,
      mouseRotateSpeed: 1,
      mousePanSpeed: 0,
      mouseZoomSpeed: 0
    }
  },
  series: series2
});
var obj = {
  0: '1456人次',
  1: '1047人次',
  2: '748人次',
};
const whereaboutsOptionRight = ref({
  grid: {
    left: '10%',
    right: '10%',
    bottom: '25%',
    top: '20%'
  },
  xAxis: {
    axisLabel: {
      textStyle: {
        color: 'rgba(154, 203, 234, 1)',
        fontSize: 30
      },
      formatter: function (value) {
        // 将 "TOP1 石家庄市" 拆分成两行
        return value.replace(' ', '\n');
      }
    },
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    data: ['TOP1 石家庄市', 'TOP2 唐山市', 'TOP3 秦皇岛市'],
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    label: {
      show: true,
      position: 'top',
      distance: 4,
      fontSize: 30,
      color: 'rgba(154, 203, 234, 1)',
      formatter: function (params) {
        return obj[params.dataIndex];
      }
    },
    itemStyle: {
      normal: {
        color: function (params) {
          let colorList = [
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 90, 90, 1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 152, 104, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(110, 43, 12, 0.00)',
                },
              ],
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 207, 112, 1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(255, 212, 42, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(110, 43, 12, 0.00)',
                },
              ],
            },
            {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(88, 255, 238, 1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(88, 255, 238, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(110, 43, 12, 0.00)',
                },
              ],
            },
          ];
          return colorList[params.dataIndex];
        }
      },
      emphasis: {
        opacity: 1
      }
    },
    data: [1456, 1047, 748],
    z: 10
  }]
})

let numA = [350, 250, 320, 420, 380, 180, 200, 250, 300, 350, 400, 450];
let xse = [300, 200, 280, 350, 320, 150, 200, 250, 300, 350, 400, 450];
let xse1 = [300, 200, 280, 350, 320, 150, 200, 250, 300, 350, 400, 450];
let myData3 = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
const transportCapacityOption1 = ref({
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff",
      },
    },
    textStyle: {
      fontSize: 30,
      color: "rgba(174, 193, 200, 1)",
      fontWeight: 500,
    },
    backgroundColor: "rgba(16, 123, 184, .52)", //设置背景颜色
    confine: true,
  },
  grid: {
    top: "20%",
    left: "5%",
    right: "5%",
    bottom: "8%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 20,
    itemHeight: 20,
    itemGap: 20,
    textStyle: {
      fontSize: 30,
      color: "rgba(174, 193, 200, 1)",
      padding: [0, 0, 0, 6],
    },
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#ffffff",
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        fontSize: 32,
        color: "rgba(174, 193, 200, 1)",
        fontWeight: 500,
        rotate: 45, // 旋转角度（如45度，范围-90到90）
        interval: 0 // 强制显示所有标签（默认可能自动隐藏）
      },
      data: myData3,
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位:人次/个",
      splitNumber: 5,
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 30,
        align: "center",
        padding: [0, 20, 20, 0],
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 30,
          color: "rgba(174, 193, 200, 1)",
          fontWeight: 500,
          lineHeight: 16,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 129, 109, 0.9)',
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
        },
      },
    },
    {
      name: "单位:班次",
      splitNumber: 5,
      type: "value",
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 30,
        align: "center",
        padding: [0, 0, 20, 20],
      },
      axisLabel: {
        show: true,
        formatter: "{value}",
        textStyle: {
          fontSize: 30,
          color: "rgba(174, 193, 200, 1)",
          fontWeight: 500,
          lineHeight: 16,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 129, 109, 0.9)',
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#82909D',
          width: 1,
        },
      },
    },
  ],
  series: [
    {
      name: "投入运力/个",
      type: "bar",
      barMaxWidth: 24,
      barGap: "40%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(160, 249, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(69, 153, 237, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: numA,
    },
    {
      name: "旅客发送量/人次",
      type: "bar",
      // stack: "总量1",
      barMaxWidth: 24,
      barGap: "40%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(193, 198, 207, 1)",
              },
              {
                offset: 1,
                color: "rgba(164, 170, 182, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: xse1,
    },
    {
      name: "班次",
      yAxisIndex: 1,
      type: "line",
      showSymbol: true,
      symbol: "circle",
      smooth: true,
      symbolSize: 12,
      lineStyle: {
        width: 5,
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },
      itemStyle: {
        color: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 5,
      },
      label: {
        show: false,
      },
      data: xse, // 折线图的数据
    },
  ],
})
const transportCapacityOption2 = ref({
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff",
      },
    },
    textStyle: {
      fontSize: 30,
      color: "rgba(174, 193, 200, 1)",
      fontWeight: 500,
    },
    backgroundColor: "rgba(16, 123, 184, .52)", //设置背景颜色
    confine: true,
  },
  grid: {
    top: "22%",
    left: "5%",
    right: "5%",
    bottom: "8%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 20,
    itemHeight: 20,
    itemGap: 20,
    textStyle: {
      fontSize: 30,
      color: "rgba(174, 193, 200, 1)",
      padding: [0, 0, 0, 6],
    },
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#ffffff",
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        fontSize: 30,
        color: "rgba(174, 193, 200, 1)",
        fontWeight: 500,
        rotate: 45, // 旋转角度（如45度，范围-90到90）
        interval: 0 // 强制显示所有标签（默认可能自动隐藏）
      },
      data: myData3,
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位:人次/个",
      splitNumber: 5,
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 24,
        align: "center",
        padding: [0, 20, 20, 0],
      },
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: 30,
          color: "rgba(174, 193, 200, 1)",
          fontWeight: 500,
          lineHeight: 16,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 129, 109, 0.9)',
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
        },
      },
    },
    {
      name: "单位:班次",
      splitNumber: 5,
      type: "value",
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 20, 20],
      },
      axisLabel: {
        show: true,
        formatter: "{value}",
        textStyle: {
          fontSize: 30,
          color: "rgba(174, 193, 200, 1)",
          fontWeight: 500,
          lineHeight: 16,
        },
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 129, 109, 0.9)',
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#82909D',
          width: 1,
        },
      },
    },
  ],
  series: [
    {
      name: "投入运力/个",
      type: "bar",
      barMaxWidth: 24,
      barGap: "40%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(160, 249, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(69, 153, 237, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: numA,
    },
    {
      name: "旅客发送量/人次",
      type: "bar",
      // stack: "总量1",
      barMaxWidth: 24,
      barGap: "40%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(193, 198, 207, 1)",
              },
              {
                offset: 1,
                color: "rgba(164, 170, 182, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: xse1,
    },
    {
      name: "班次",
      yAxisIndex: 1,
      type: "line",
      showSymbol: true,
      symbol: "circle",
      smooth: true,
      symbolSize: 12,
      lineStyle: {
        width: 5,
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },
      itemStyle: {
        color: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 5,
      },
      label: {
        show: false,
      },
      data: xse, // 折线图的数据
    },
  ],
})
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1430px !important;
  overflow: none !important;
  min-height: 1684px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1430px;
  height: 1684px;
  background: url("assets/image/dialog/切图 284.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 150px 60px 60px 70px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 50px;
  top: 60px;
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
  top: 40px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.box-big-title {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  line-height: 58px;
  text-shadow: 0px 4px 2px rgba(0, 200, 255, 0.3);
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #FFFFFF 0%, #B8DAFB 92%, #B8DAFB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 20px;
  padding-bottom: 10px;
}

.box-basic-content {
  .basic-content-left {
    width: 301px;
    height: 251px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  }

  .basic-content-middle {
    width: 675px;
    height: 251px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 20px 0px #4DA3FF;
    position: relative;

    .basic-point {
      width: 53px;
      height: 69px;
      position: absolute;
      right: 10px;
      top: 5px;
    }

    .basic-middle-left {
      padding: 0px 30px;
    }

    .basic-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 40px;
      line-height: 55px;
      color: #A3D9FF;
      font-style: normal;
      text-transform: none;
      padding: 0px 20px;
    }
  }

  .basic-content-right {
    width: 301px;
    height: 251px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  }
}

.box-service {
  padding-top: 20px;
}

.box-service-toggle-item {
  width: 192px;
  height: 65px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 0px 0px 0px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #87ADD0;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.basic-value {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  font-style: normal;
  text-transform: none;
  line-height: 70px;
  // padding: 5px 0px;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.basic-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 55px;
  color: #A3D9FF;
  font-style: normal;
  text-transform: none;
}

.basic-unit {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  color: #EEF8FF;
  font-style: normal;
  text-transform: none;
}

.basic-img {
  width: 150px;
  height: 108px;
}

.basic-simg {
  width: 23px;
  height: 22px;
  margin-top: 10px;
}

.dividing-line {
  width: 6px;
  height: 92px;
  background-image: url("assets/image/dialog/切图 565.png");
  background-size: 100% 100%;
}

.dividing-space {
  padding: 0px 30px;
}

.box-service-toggle-item-active {
  width: 192px;
  height: 65px;
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 6px 6px 0px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #E3F1FF;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.box-service-content {
  width: 100%;
  height: 1082px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  padding: 20px 35px 25px;
}

.box-whereabouts {
  width: 100%;
  height: 540px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  padding: 20px 35px 25px;
  margin: 20px 0px;
}

.chart-content-bottom-left {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -55px;
    left: 0px;
    right: 120px;
    bottom: -60px;
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
    animation: circle-glow 3s ease-in-out infinite;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: -55px;
    left: 80px;
    right: 20px;
    bottom: -60px;
    border-radius: 50%;
    background: radial-gradient(circle,
        rgba(0, 255, 255, 0.15) 0%,
        rgba(0, 200, 255, 0.1) 30%,
        rgba(100, 150, 255, 0.08) 50%,
        rgba(0, 255, 255, 0.05) 70%,
        rgba(0, 255, 255, 0) 100%);
    z-index: 0;
    pointer-events: none;
    animation: circle-pulse 3s ease-in-out infinite;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg);
  }

  >* {
    position: relative;
    z-index: 2;
    pointer-events: auto;
  }
}

.box-transport-capacity {
  .box-transport-capacity-content {
    width: 100%;
    height: 1300px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 20px 0px #4DA3FF;
    padding: 20px 35px 25px;
  }
}
</style>
