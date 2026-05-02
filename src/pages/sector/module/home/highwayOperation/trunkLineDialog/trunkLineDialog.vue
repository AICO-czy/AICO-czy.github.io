<template>
  <q-dialog seamless v-model="trunkLineStore.isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">普通干线公路</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="dialog-content-top column items-center justify-between">
          <div class="dialog-content-top-title row justify-between">
            <item-title title="交通量TOP5分析" />
            <div class="dialog-content-top-title-right row items-center justify-evenly" @click="handleMore">
              <q-icon class="title-icon" :name="`img:${icon1}`"></q-icon>
              <span class="icon-text">更多</span>
            </div>
          </div>
          <v-chart :option="option1" class="col full-width" />
        </div>
        <div class="dialog-content-middle column justify-between">
          <div class="dialog-content-top-title row items-center justify-between">
            <item-title title="主要货运走廊" />
            <q-icon class="title-icon1" :name="`img:${icon2}`"></q-icon>
          </div>
          <div class="dialog-content-bottom-btnContrnt column col full-width" :class="{
            'select-box1': selectBtn === 0,
            'select-box2': selectBtn === 1,
            'select-box3': selectBtn === 2,
          }">
            <div class="row justify-between">
              <div class="btnContrnt-item" v-for="(item, index) in freightBtnContrnt" :key="index"
                @click="selectBtn = index">
                <div class="btnContrnt-item-title row">
                  <div class="btnContrnt-item-title-left row justify-center items-center" :style="{
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  }">
                    <span class="sort">{{ item.sort }}</span>
                  </div>
                  <div class="btnContrnt-item-title-center" :class="{
                    'btnContrnt-item-title-center-active':
                      selectBtn === index,
                  }">
                    {{ item.road }}
                  </div>
                  <div class="btnContrnt-item-title-right" :class="{
                    'btnContrnt-item-title-center-active':
                      selectBtn === index,
                  }">
                    {{ item.station }}
                  </div>
                </div>
                <div class="btnContrnt-item-valueBox row justify-between">
                  <div class="btnContrnt-item-valueBox-left">
                    <span class="carName" :class="{ 'carName-active': selectBtn === index }">{{ item.carName }}</span>
                    <span class="carNum" :class="{ 'carNum-active': selectBtn === index }">{{ item.carNum }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn === index }">{{ item.unit }}</span>
                  </div>
                  <div class="btnContrnt-item-valueBox-center">
                    <span class="carNum" :class="{ 'carNum-active': selectBtn === index }">{{ item.carNum1 }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn === index }">{{ item.unit1 }}</span>
                  </div>
                  <div class="btnContrnt-item-valueBox-right">
                    <span class="carNum2">{{ item.carNum2 }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn === index }">{{ item.unit2 }}</span>
                  </div>
                </div>
                <div class="btnContrnt-item-pro">
                  <q-linear-progress rounded size="10px" :class="{ 'progress-active': selectBtn === index }"
                    :value="item.progress" class="fit" />
                </div>
              </div>
            </div>
            <div class="chart-content col full-width">
              <div class="chart-content-top row">
                <div class="chart-content-top-type row justify-center items-center" :class="{
                  'chart-type-active': chartType === chartTypes[index],
                }" v-for="(item, index) in chartTypes" :key="index" @click="chartType = item">
                  <span>{{ item }}</span>
                </div>
              </div>
              <div class="chart-content-bottom fit">
                <div class="fit row" v-if="selectBtn == 0">
                  <div class="chart-content-bottom-left full-height">
                    <v-chart :option="optionPie" class="fit" />
                  </div>
                  <div class="chart-content-bottom-right full-height">
                    <v-chart :option="freightOptionBar" class="fit" />
                  </div>
                </div>
                <div class="fit" v-if="selectBtn == 1">
                  <v-chart autoresize :option="option3" class="fit" />
                </div>
                <div class="fit" v-if="selectBtn == 2">
                  <v-chart autoresize :option="option3" class="fit" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-content-bottom column justify-between">
          <div class="dialog-content-top-title row items-center justify-between">
            <item-title title="主要客运走廊" />
            <q-icon class="title-icon1" :name="`img:${icon2}`"></q-icon>
          </div>
          <div class="dialog-content-bottom-btnContrnt column col full-width" :class="{
            'select-box1': selectBtn1 === 0,
            'select-box2': selectBtn1 === 1,
            'select-box3': selectBtn1 === 2,
          }">
            <div class="row justify-between">
              <div class="btnContrnt-item" v-for="(item, index) in ptBtnContrnt" :key="index"
                @click="selectBtn1 = index">
                <div class="btnContrnt-item-title row">
                  <div class="btnContrnt-item-title-left row justify-center items-center" :style="{
                    color: item.color,
                    backgroundColor: item.backgroundColor,
                  }">
                    <span class="sort">{{ item.sort }}</span>
                  </div>
                  <div class="btnContrnt-item-title-center" :class="{
                    'btnContrnt-item-title-center-active':
                      selectBtn1 === index,
                  }">
                    {{ item.road }}
                  </div>
                  <div class="btnContrnt-item-title-right" :class="{
                    'btnContrnt-item-title-center-active':
                      selectBtn1 === index,
                  }">
                    {{ item.station }}
                  </div>
                </div>
                <div class="btnContrnt-item-valueBox row justify-between">
                  <div class="btnContrnt-item-valueBox-left">
                    <span class="carName" :class="{ 'carName-active': selectBtn1 === index }">{{ item.carName }}</span>
                    <span class="carNum" :class="{ 'carNum-active': selectBtn1 === index }">{{ item.carNum }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn1 === index }">{{ item.unit }}</span>
                  </div>
                  <div class="btnContrnt-item-valueBox-center">
                    <span class="carNum" :class="{ 'carNum-active': selectBtn1 === index }">{{ item.carNum1 }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn1 === index }">{{ item.unit1 }}</span>
                  </div>
                  <div class="btnContrnt-item-valueBox-right">
                    <span class="carNum2">{{ item.carNum2 }}</span>
                    <span class="unit" :class="{ 'unit-active': selectBtn1 === index }">{{ item.unit2 }}</span>
                  </div>
                </div>
                <div class="btnContrnt-item-pro" :class="{ 'progress-active': selectBtn1 === index }">
                  <q-linear-progress rounded size="10px" :value="item.progress" class="fit" />
                </div>
              </div>
            </div>
            <div class="chart-content col full-width">
              <div class="chart-content-top row">
                <div class="chart-content-top-type row justify-center items-center" :class="{
                  'chart-type-active': chartType1 === chartTypes1[index],
                }" v-for="(item, index) in chartTypes1" :key="index" @click="chartType1 = item">
                  <span>{{ item }}</span>
                </div>
              </div>
              <div class="chart-content-bottom fit">
                <div class="fit row" v-if="selectBtn1 == 0">
                  <div class="chart-content-bottom-left1 full-height">
                    <v-chart :option="pieOption3D" class="fit" />
                  </div>
                  <div class="chart-content-bottom-right full-height">
                    <v-chart :option="ptOptionBar" class="fit" />
                  </div>
                </div>
                <div class="fit" v-if="selectBtn1 == 1">
                  <v-chart autoresize :option="option3" class="fit" />
                </div>
                <div class="fit" v-if="selectBtn1 == 2">
                  <v-chart autoresize :option="option3" class="fit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="trunkLineDialog">
import { ref, onMounted, watch } from "vue";
import { useTrunkLineStore } from "../highseed/store/index";
import ItemTitle from "./components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";

import icon1 from 'src/pages/sector/module/home/highwayOperation/trunkLineDialog/images/切图 373.png'
import icon2 from 'src/pages/sector/module/home/highwayOperation/trunkLineDialog/images/切图 58.png'

const $router = useRouter()

function handleMore() {
  $router.push({ path: `/Statistics`, query: { type: '出入口交通流量监测' } })
}

const trunkLineStore = useTrunkLineStore();
const freightBtnContrnt = ref([
  {
    sort: "TOP1",
    color: "rgba(255, 168, 147, 1)",
    backgroundColor: "rgba(192, 65, 39, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "货车",
    carNum: "88",
    unit: "%",
    carNum1: "13723",
    unit1: "辆",
    carNum2: "15957",
    unit2: "辆",
    progress: 0.75,
  },
  {
    sort: "TOP2",
    color: "rgba(255, 199, 131, 1)",
    backgroundColor: "rgba(231, 143, 61, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "货车",
    carNum: "75",
    unit: "%",
    carNum1: "7826",
    unit1: "辆",
    carNum2: "10675",
    unit2: "辆",
    progress: 0.75,
  },
  {
    sort: "TOP3",
    color: "rgba(147, 255, 165, 1)",
    backgroundColor: "rgba(39, 192, 95, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "货车",
    carNum: "65",
    unit: "%",
    carNum1: "6385",
    unit1: "辆",
    carNum2: "9821",
    unit2: "辆",
    progress: 0.75,
  },
]);
const ptBtnContrnt = ref([
  {
    sort: "TOP1",
    color: "rgba(255, 168, 147, 1)",
    backgroundColor: "rgba(192, 65, 39, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "客车",
    carNum: "88",
    unit: "%",
    carNum1: "13723",
    unit1: "辆",
    carNum2: "15957",
    unit2: "辆",
    progress: 0.75,
  },
  {
    sort: "TOP2",
    color: "rgba(255, 199, 131, 1)",
    backgroundColor: "rgba(231, 143, 61, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "客车",
    carNum: "75",
    unit: "%",
    carNum1: "7826",
    unit1: "辆",
    carNum2: "10675",
    unit2: "辆",
    progress: 0.75,
  },
  {
    sort: "TOP3",
    color: "rgba(147, 255, 165, 1)",
    backgroundColor: "rgba(39, 192, 95, 0.5)",
    road: "AAA公路",
    station: "交调站3",
    carName: "客车",
    carNum: "65",
    unit: "%",
    carNum1: "6385",
    unit1: "辆",
    carNum2: "9821",
    unit2: "辆",
    progress: 0.75,
  },
]);
const chartTypes = ref(["货车构成", "小时趋势", "月趋势"]);
const chartType = ref("货车构成");

const chartTypes1 = ref(["货车构成", "小时趋势", "月趋势"]);
const chartType1 = ref("货车构成");

const selectBtn = ref(0);
const selectBtn1 = ref(0);
const handleClose = () => {
  trunkLineStore.closeDialog();
};
const option1 = ref({
  tooltip: {
    trigger: "axis",
    formatter: function (params: any) {
      let res = params[0].axisValue + "<br>";
      params.forEach((item: any) => {
        let color = item.seriesName === "人数" ? "#ff0000" : "#000";
        res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${item.color};"></span>`;
        res += `${item.seriesName}: `;
        res += `<span style="color:${color}">${item.data}</span><br>`;
      });
      return res;
    },
    axisPointer: { type: "shadow" },
  },
  legend: {
    data: [
      { name: "客车", icon: "rect" },
      { name: "货车", icon: "rect" }, // 修改为长方形图标
      "",
    ],
    top: 0,
    right: "40%",
    itemGap: 100,
    textStyle: {
      color: "#7CAEB3",
      fontSize: 32,
      fontFamily: "SourceHanSansRegular",
    },
  },
  grid: {
    left: "3%",
    right: "2%",
    bottom: "4%",
    top: "20%",
    containLabel: true,
  },
  xAxis: {
    data: ["交调站1", "交调站2", "交调站3", "交调站4", "交调站5"],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#AEC1C8",
        fontSize: 30,
      },
    },
    splitLine: { show: false, lineStyle: { type: "dashed" } },
  },
  yAxis: [
    {
      type: "value",
      name: "单位：辆",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      position: "left",
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      min: 0, // ✅ 强制从0开始
      // max: 25  // ✅ 设置合适最大值
    },
  ],
  color: ["#478af2"],
  series: [
    // 柱状图系列（主Y轴）
    {
      name: "客车",
      type: "pictorialBar",
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: "50%", // ✅ 调整柱子间距
      symbol: "triangle",
      itemStyle: {
        normal: {
          opacity: 0.5,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#0095FF", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(114, 201, 246, 0.9)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 },
      },
      data: [200, 200, 130, 120, 200],
      z: 10,
      symbolOffset: [10, 0], // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: "货车",
      type: "pictorialBar",
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: "50%", // ✅ 调整柱子间距
      symbol: "triangle",
      itemStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(30, 231, 231, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(90, 231, 178, 0.7)", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 },
      },
      data: [160, 170, 200, 200, 160],
      z: 10,
      symbolOffset: [-10, 0], // ✅ 消除图标偏移
    },
    {
      name: "glyph",
      type: "pictorialBar",
      yAxisIndex: 0,
      barGap: "-20%",
      symbolPosition: "end",
      symbolSize: 50,
      symbolOffset: [0, "-120%"],
    },
  ],
});

let color = ['#D2AE46', '#398EEC', '#4BADE3', '#6FD19E', '#5076D4'];
let chartData = [
  {
    name: "小货车",
    value: 400
  },
  {
    name: "中货车",
    value: 200
  },
  {
    name: "大货车",
    value: 300
  },
  {
    name: "特大货车",
    value: 400
  },
  {
    name: "集装箱",
    value: 200
  }
];
let arrName = [];
let arrValue = [];
let sum = 0;
let pieSeries = [],
  lineYAxis = [];

// 数据处理
chartData.forEach((v, i) => {
  arrName.push(v.name);
  arrValue.push(v.value);
  sum = sum + v.value;
})

// 图表option整理
chartData.forEach((v, i) => {
  let chartnewData = chartData.slice(0, i)
  pieSeries.push({
    name: '学历',
    type: 'pie',
    clockWise: false,
    hoverAnimation: false,
    radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
    center: ["40%", "50%"],
    label: {
      show: false
    },
    data: [{
      value: v.value,
      name: v.name
    }, {
      value: sum - v.value,
      name: '',
      itemStyle: {
        color: "rgba(0,0,0,0)"
      }
    }]
  });
  pieSeries.push({
    name: '',
    type: 'pie',
    silent: true,
    z: 1,
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [75 - i * 15 + '%', 68 - i * 15 + '%'],
    // radius: ['50%', '70%'],
    center: ["40%", "50%"],
    label: {
      show: false
    },
    data: [{
      value: sum,
      itemStyle: {
        color: "#013561" //圆环颜色
      }
    },
    {
      value: 0,
      name: '',
      itemStyle: {
        color: "red"
      }
    }
    ]
  });
  v.percent = (v.value / sum * 100).toFixed(0) + "%";
  lineYAxis.push({
    value: i,
    textStyle: {
      rich: {
        circle: {
          color: color[i],
          padding: [0, 5]
        }
      }
    }
  });
})

const optionPie = ref({
  color: color,
  legend: {
    itemWidth: 14,
    itemHeight: 8,
    show: true,
    itemGap: 15,
    // icon: "circle",
    // top: "center",
    left: "65%",
    top: "10%",
    formatter: (name) => {
      return (
        // {name|' + item.name + '}
        "{name|" + name + "} {percent|" + chartData.find((item) => {
          return item.name == name
        }).percent + "}"
      );
    },
    textStyle: {
      color: "rgba(163, 191, 216, 1)", //元字颜色
      fontSize: 30,
      rich: {
        name: {
          color: 'rgba(218, 236, 246, 1)',
          fontSize: 30,
        },
        percent: {
          color: 'rgba(218, 236, 246, 1)',
          fontSize: 30,
        }
      }
    },
  },
  series: pieSeries
});

const freightOptionBar = ref({
  legend: {
    data: ['小货车', '中货车', '大货车', '特大货车', '集装箱'],
    top: '20%',
    right: "10%",
    itemGap: 25,
    textStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 32,
      fontFamily: "SourceHanSansRegular",
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    }
  },
  grid: {
    left: "5%",
    right: "5%",
    bottom: "6%",
    top: "35%",
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      data: ['0:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "单位：辆",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '小货车',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(255, 189, 129, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 189, 129, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120, 160, 140],
    },
    {
      name: '中货车',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(160, 249, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 151, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [120, 60, 100, 90, 100, 120, 70, 100, 90],
    },
    {
      name: '大货车',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(111, 242, 164, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [80, 40, 70, 60, 70, 90, 50, 80, 70],
    },
    {
      name: '特大货车',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(193, 198, 207, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [120, 60, 100, 90, 100, 120, 70, 100, 90],
    },
    {
      name: '集装箱',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(136, 165, 235, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [50, 30, 40, 50, 60, 70, 40, 60, 50],
    },
  ],
});

const ptOptionBar = ref({
  legend: {
    data: ['中小客车', '大客车'],
    top: '20%',
    right: "25%",
    itemGap: 50,
    textStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 32,
      fontFamily: "SourceHanSansRegular",
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    }
  },
  grid: {
    left: "5%",
    right: "5%",
    bottom: "5%",
    top: "35%",
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      data: ['0:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "单位：辆",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '中小客车',
      type: 'bar',
      barWidth: 20,
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
                color: 'rgba(160, 249, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(69, 153, 237, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120, 160, 140],
    },
    {
      name: '大客车',
      type: 'bar',
      barWidth: 20,
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
                color: 'rgba(111, 242, 164, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(41, 206, 211, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 151, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [120, 60, 80, 90, 100, 50, 70, 20, 90],
    }
  ],
});

const chartLegends = ref([]);
const chartLegends1 = ref(["今年货车车流量", "去年同期货车流量"]);
const chartLegends2 = ref(["今年货车车流量", "去年同期货车流量"]);
const xAxisData = ref([]);
const xAxisData1 = ref(['0:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00']);
const xAxisData2 = ref(['0:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00']);
const yAxisData = ref([]);
const yAxisData1 = ref([20000, 20000, 17000, 12000, 16000, 15000, 12000, 10000, 12000, 13000, 8000]);
const yAxisData2 = ref([8000, 12000, 10000, 9000, 12000, 15000, 16000, 14000, 18000, 20000, 20000]);
const updateChartData = () => {
  // 根据选择更新对应的数据
  if (selectBtn.value === 1) {
    chartLegends.value = chartLegends1.value;
    xAxisData.value = xAxisData1.value;

  } else if (selectBtn.value === 2) {
    chartLegends.value = chartLegends2.value;
    xAxisData.value = xAxisData2.value;
  } else {
    chartLegends.value = [];
    xAxisData.value = [];
    yAxisData.value = [];
  }
  // 更新图表配置
  option3.legend.data = chartLegends.value;
  option3.xAxis[0].data = xAxisData.value;
  option3.series[0].data = yAxisData1.value;
  option3.series[1].data = yAxisData2.value;
}

const updateChartData1 = () => {
  // 根据选择更新对应的数据
  if (selectBtn1.value === 1) {
    chartLegends.value = chartLegends1.value;
    xAxisData.value = xAxisData1.value;

  } else if (selectBtn1.value === 2) {
    chartLegends.value = chartLegends2.value;
    xAxisData.value = xAxisData2.value;
  } else {
    chartLegends.value = [];
    xAxisData.value = [];
    yAxisData.value = [];
  }
  // 更新图表配置
  option3.legend.data = chartLegends.value;
  option3.xAxis[0].data = xAxisData.value;
  option3.series[0].data = yAxisData1.value;
  option3.series[1].data = yAxisData2.value;
}
const option3 = {
  // backgroundColor: '#1b1d21',
  legend: {
    top: '5%',
    left: '20%',
    itemGap: 40,
    itemWidth: 15,
    itemHeight: 15,
    lineStyle: {
      color: 'inherit',
      width: 5,
    },
    textStyle: {
      fontSize: 30,
      color: "#C6CECF"
    },
    data: [],
  },
  grid: {
    top: "25%",
    left: "5%",
    right: "5%",
    bottom: "10%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      lineStyle: {
        color: "#3763cd", //显示竖线颜色
        type: "solid",
      },
    },
    textStyle: {
      color: "#ffffff"
    }
  },
  xAxis: [
    {
      boundaryGap: false,
      type: "category",
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: false,
        lineStyle: {
          color: "#485051",
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: "#AEC1C8",
          padding: 10,
          fontSize: 30,
        },
      },
      axisTick: {
        show: false,
      },
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: '单位:辆',
      nameTextStyle: {
        color: '#C6CECF',
        fontWeight: 400,
        fontSize: 28,
        padding: [0, 40, 0, 0],
      },
      splitLine: {
        lineStyle: {
          color: "#82909D",
        },
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        textStyle: {
          color: "#AEB8C0",
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
      name: '今年货车车流量',
      type: "line",
      // smooth: true,
      showSymbol: true, //圆点显隐
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      lineStyle: {
        normal: {
          width: 5,
          color: "#7573F4", // 线条颜色
        },
      },
      itemStyle: {
        color: '#FFFFFF',
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#8D74FD",
              },
              {
                offset: 1,
                color: "rgba(56, 222, 153,0)",
              },
            ],
            false
          ),

        },
      },
      data: [],
    },
    {
      name: '去年同期货车流量',
      type: "line",
      // smooth: true,
      showSymbol: true, //圆点显隐
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      lineStyle: {
        normal: {
          width: 5,
          color: "#38DE99", // 线条颜色
        },
      },
      itemStyle: {
        color: '#FFFFFF',
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#2DCB6C",
              },
              {
                offset: 1,
                color: "rgba(255, 160, 108,0)",
              },
            ],
            false
          ),

        },
      },
      data: [],
    }
  ],
}

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
  { name: '大货车', value: 30, itemStyle: { color: '#32B2CC', opacity: 0.6 } },
  { name: '中小货车', value: 20, itemStyle: { color: '#0E8D79', opacity: 0.6 } },
];

const series2 = getPie3D(pieData2, 0.8);
const pieOption3D = ref({
  backgroundColor: 'transparent',
  animation: true,
  silent: false,
  legend: [
    {
      data: [pieData2[0]?.name || ''],
      top: '30%',
      right: '0%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        fontStyle: 'normal',
        textTransform: 'none',
        padding: [0, 0, 0, 10]
      }
    },
    {
      data: [pieData2[1]?.name || ''],
      top: '50%',
      right: '0%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        fontStyle: 'normal',
        textTransform: 'none',
        padding: [0, 0, 0, 10]
      }
    }
  ],
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
    left: '-10%',
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

watch(selectBtn, (newVal, oldVal) => {
  updateChartData();
})

watch(selectBtn1, (newVal, oldVal) => {
  updateChartData1();
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2095px !important;
  overflow: none !important;
  min-height: 1614px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1869px;
  height: 1614px;
  background: url("./images/切图 284.png") no-repeat 100%/100%;
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

.dialog-content-top {
  width: 100%;
  height: 25%;
  background-image: url("assets/image/highwayOperation/切图 374.png");
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4da3ff;
  border-radius: 20px;
  padding: 8px 20px 10px;
}

.dialog-content-middle {
  width: 100%;
  height: 36.5%;
  background-image: url("assets/image/highwayOperation/切图 374.png");
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4da3ff;
  border-radius: 20px;
  padding: 8px 20px 10px;
}

.dialog-content-bottom {
  width: 100%;
  height: 36.5%;
  background-image: url("assets/image/highwayOperation/切图 374.png");
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4da3ff;
  border-radius: 20px;
  padding: 8px 20px 10px;
}

.dialog-content-top-title {
  width: 100%;
  padding: 0px 20px;
}

.dialog-content-top-title-right {
  width: 185px;
  height: 66px;
  background-image: url("./images/切图 372.png");
  background-size: 100% 100%;
}

.title-icon {
  width: 28px;
  height: 40px;
}

.title-icon1 {
  width: 53px;
  height: 69px;
}

.icon-text {
  height: 48px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #f4f8ff 0%, #96cded 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.select-box1 {
  background-image: url("./images/切图 378.png");
  background-size: 100% 100%;
}

.select-box2 {
  background-image: url("./images/切图 380.png");
  background-size: 100% 100%;
}

.select-box3 {
  background-image: url("./images/切图 381.png");
  background-size: 100% 100%;
}

.btnContrnt-item {
  width: 555px;
  height: 135px;
  background: linear-gradient(180deg,
      rgba(0, 174, 255, 0.56) 0%,
      rgba(0, 114, 167, 0) 100%);
  border-radius: 8px 8px 0px 0px;
  padding: 7px 16px 0px;
}

.btnContrnt-item-pro {
  width: 100%;
  height: 10px;
  background: rgba(65, 160, 255, 0.14);
  border-radius: 21px 21px 21px 21px;
}

.btnContrnt-item-title-left {
  width: 79px;
  height: 42px;
}

.sort {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 26px;
  line-height: 36px;
}

.btnContrnt-item-title-center {
  height: 47px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 34px;
  color: #a3d9ff;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding: 0px 20px;
}

.btnContrnt-item-title-right {
  height: 47px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 34px;
  color: #a3d9ff;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.carName {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 30px;
  color: #a3d9ff;
  line-height: 41px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.carNum {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 39px;
  line-height: 53px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68ebff 0%, #54c6fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0px 10px;
}

.carName-active {
  color: #eef8ff;
}

.carNum-active {
  background: linear-gradient(90deg, #ffb579 0%, #ffefb8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.carNum2 {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 600;
  font-size: 39px;
  line-height: 53px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #ff7979 0%, #ffb8b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0px 10px;
}

.unit {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 30px;
  color: #a3d9ff;
  line-height: 41px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.unit-active {
  color: #eef8ff;
}

.btnContrnt-item-title-center-active {
  color: #eef8ff;
}

:deep(.q-linear-progress__track) {
  background: rgba(65, 160, 255, 0.14) !important;
}

:deep(.q-linear-progress__model) {
  background: linear-gradient(180deg, #4f799a 0%, #4f99d3 50%, #9dc9ec 100%);
}

.progress-active :deep(.q-linear-progress__model) {
  background: linear-gradient(270deg, #9a694f 0%, #d3944f 50%, #ecc89d 100%);
}

.chart-content {
  position: relative;
}

.chart-content-top {
  position: absolute;
  top: 13px;
  right: 38px;
  z-index: 7000;
}

.chart-content-top-type {
  width: 198px;
  height: 42px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 0px 0px 0px;
}

.chart-content-top-type span {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 30px;
  height: 42px;
  line-height: 42px;
  color: #87add0;
  font-style: normal;
  text-transform: none;
}

.chart-type-active {
  width: 198px;
  height: 42px;
  background: rgba(0, 229, 229, 0.25);
  border-radius: 6px 0px 0px 6px;
}

.chart-type-active span {
  height: 42px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 30px;
  color: #e3f1ff;
  line-height: 42px;
  text-transform: none;
}

.chart-content-bottom-left {
  position: relative;
  width: 35%;
}

.chart-content-bottom-left1 {
  position: relative;
  width: 35%;

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
    left: 40px;
    right: 150px;
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

.chart-content-bottom-right {
  width: 65%;
}

@keyframes circle-pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1);
  }

  50% {
    opacity: 1;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1.02);
    box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.5);
  }
}
</style>
