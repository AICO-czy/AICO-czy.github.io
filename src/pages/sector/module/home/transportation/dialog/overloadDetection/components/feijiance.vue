<template>
  <div class="jiance-bg">
    <div class="base-top">
      <div class="top-item">
        <div class="top-icon1"></div>
        <div class="top-count">224辆</div>
        <div class="top-name">今日检测</div>
      </div>
      <div class="top-line"></div>
      <div class="top-item">
        <div class="top-icon2"></div>
        <div class="top-count">14辆</div>
        <div class="top-name">超限预警</div>
      </div>
    </div>
    <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="检测车辆数TOP5" />
    <div class="content-top-select row col-auto ml-[60px]">
      <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
        :class="{ 'active': activeDate === index + 1 }" @click="handleSelect1(index + 1)">
        {{ item }}
      </div>
    </div>
    <div class="administration-topPro-content column">
      <div class="administration-topPro-item row justify-between items-center" v-for="item in heightTOP"
        :key="item.name">
        <q-img :src="item.img" class="col-auto administration-topPro-content-img" alt="" />
        <div class="col administration-topPro-content-text column">
          <div class="topPro-content-text-heard full-width row justify-between">
            <span class="topPro-content-text-heard-name">
              {{ item.name }}
            </span>
            <div class="topPro-content-text-heard-value" :style="{ background: item.valueColor }">
              {{ item.value }}
              <span class="topPro-content-text-heard-unit">{{ item.unit }}</span>
            </div>
          </div>
          <div class="topPro-content-text-foot full-width">
            <q-linear-progress rounded size="10px" :value="item.progress" class="foot-pro" />
          </div>
        </div>
      </div>
    </div>
    <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="超限车辆分布情况" />
    <v-chart :option="option1" autoplay style="height: 500px; width: 100%;" />
    <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="超限预警车辆时间分布" />
    <v-chart :option="option2" autoplay style="height: 500px; width: 100%;" />
    <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="超限预警车辆时间分布" />
    <div class="content-top-select row col-auto ml-[60px]">
      <div class="content-top-select-item1" v-for="(item, index) in selsectBtns1" :key="item"
        :class="{ 'active': activeDate === index + 1 }" @click="handleSelect1(index + 1)">
        {{ item }}
      </div>
    </div>
    <v-chart :option="option3" autoplay style="height: 500px; width: 100%;" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemTitle from "../../../components/itemTitle.vue";
import * as echarts from "echarts";

import img1 from 'src/assets/image/dialog/切图 568.png'
import img2 from 'src/assets/image/dialog/切图 569.png'
import img3 from 'src/assets/image/dialog/切图 570.png'
import img4 from 'src/assets/image/dialog/切图 740.png'
import img5 from 'src/assets/image/dialog/切图 741.png'

const selsectBtns = ['站点', '线路', '县区']
const selsectBtns1 = ['县区', '线路']

const heightTOP = ref([
  {
    img: img1,
    name: '治超站名称1',
    value: '92830',
    valueColor: 'linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%)',
    unit: '次',
    progress: 0.75,
  },
  {
    img: img2,
    name: '治超站名称2',
    value: '87242',
    valueColor: 'linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%)',
    unit: '次',
    progress: 0.65,
  },
  {
    img: img3,
    name: '治超站名称3',
    value: '12536',
    valueColor: 'linear-gradient(180deg, #FFE479 0%, #FEFFDC 100%)',
    unit: '次',
    progress: 0.55,
  },
  {
    img: img4,
    name: '治超站名称4',
    value: '2899',
    valueColor: 'linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%)',
    unit: '次',
    progress: 0.2,
  },
  {
    img: img5,
    name: '治超站名称5',
    value: '1762',
    valueColor: ' linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%)',
    unit: '次',
    progress: 0.12,
  },
])

let myData3 = [
  "11-14",
  "11-15",
  "11-16",
  "11-17",
  "11-18",
  "11-19",
  "11-20",
];
let numA = [350, 250, 320, 420, 380, 180, 280];
let xse = [300, 200, 280, 350, 320, 150, 250];
let xse1 = [300, 200, 280, 350, 320, 150, 250];

const option1 = ref({
  // backgroundColor: "#011a38",
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
      color: "#fff",
    },
    backgroundColor: "rgba(16, 123, 184, .52)", //设置背景颜色
    confine: true,
  },
  grid: {
    top: "16%",
    left: "2%",
    right: "2%",
    bottom: "4%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 14,
    itemHeight: 4,
    itemGap: 20,
    textStyle: {
      fontSize: 24,
      color: "#fff",
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
        interval: 0,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#ffffff",
        },
      },
      data: myData3,
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位:辆",
      splitNumber: 5,
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 20, 5, 0],
      },
      axisLabel: {
        formatter: "{value}",
        color: "rgba(95, 187, 235, 1)",
        textStyle: {
          fontSize: 24,
          color: "#fff",
          lineHeight: 16,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(28, 130, 197, .3)",
          type: "dashed",
        },
      },
    },
    {
      name: "单位:%",
      splitNumber: 5,
      type: "value",
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 5, 0],
      },
      axisLabel: {
        show: true,
        fontSize: 24,
        color: "#fff",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "销量",
      type: "bar",
      // stack: "总量",
      barMaxWidth: 24,
      barGap: "10%",
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
      name: "销量1",
      type: "bar",
      // stack: "总量1",
      barMaxWidth: 24,
      barGap: "10%",
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
      name: "销售额",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 6,
        shadowColor: "rgba(206, 133, 92, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: xse, // 折线图的数据
    },
  ],
})

var data = [300, 250, 100, 70, 20];
const option2 = ref({
  // backgroundColor: 'black',
  grid: {
    left: "4%",
    right: "4%",
    bottom: "3%",
    top: "15%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 14,
    itemHeight: 4,
    itemGap: 20,
    textStyle: {
      fontSize: 24,
      color: "#fff",
      padding: [0, 0, 0, 6],
    },
  },
  xAxis: {
    data: ["01:00", "02:00", "03:00", "04:00", "05:00"],

    triggerEvent: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      padding: [3, 4, 5, 10],
      show: true,
      rotate: 0,
      interval: 0,
      textStyle: {
        fontSize: 24,
        color: "rgba(251,251,251,1)",
      },
    },
  },
  yAxis: [
    {
      name: "",
      triggerEvent: true,
      nameTextStyle: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        padding: [0, 0, 10, 0],
      },
      splitLine: {
        show: true,

        lineStyle: {
          type: "solid",
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "rgba(255,255,255,0)",
            },
            {
              offset: 0.5,
              color: "rgba(255,255,255,0.4)",
            },
            {
              offset: 1,
              color: "rgba(255,255,255,0)",
            },
          ]),
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "rgba(255,255,255,1)",
          fontSize: 14,
        },
      },
    },
    {
      type: "value",
      min: 0,
      offset: 90,
      max: 300,
      interval: 50,
      axisLine: {
        show: false,
      },

      axisLabel: {
        fontFamily: "PingFang-SC-Regular",
        fontSize: 14,
        color: "rgba(255,255,255,1)",
        fontWeight: 400,
        show: false
      },
      axisTick: {
        show: false,
      },
      splitLine: false,
    },
  ],
  // color: ["#e54035"],
  series: [
    {
      name: "检测车辆数",
      barMinHeight: 10,
      //barCateGoryGap:2,
      type: "pictorialBar",
      symbolOffset: ["0%", 0],
      barCategoryGap: "0%",
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",

      itemStyle: {
        normal: {
          //barBorderRadius: 5,
          //渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(0, 255, 198, 1)",
            },
            {
              offset: 0.3,
              color: "rgba(0, 255, 198, 1)",
            },
            {
              offset: 0.65,
              color: "rgba(18, 138, 222, 1)",
            },
            {
              offset: 1,
              color: "rgba(12, 101, 110, 0)",
            },
          ]),
        },
      },
      data: [300, 250, 100, 70, 20],
    },

    {
      name: "超限率",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,

      lineStyle: {
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 6,
        shadowColor: "rgba(206, 133, 92, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: [100, 200, 120, 80, 20], // 折线图的数据
    },
  ],
})

const dataend = [
  {
    name: "潞州区",
    value: 22,
  },
  {
    name: "潞城区",
    value: 43,
    percent: "20%",
  },
  {
    name: "上党区",
    value: 34,
    percent: "30%",
  },
  {
    name: "屯留区",
    value: 38,
    percent: "50%",
  },
  {
    name: "壶关县",
    value: 42,
    percent: "20%",
  },
  {
    name: "长子县",
    value: 26,
    percent: "30%",
  },

];

const option3 = ref({
  // backgroundColor: '#05172c',
  grid: {
    left: "5%",
    right: "5%",
    bottom: "15%",
    top: "15%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        color: "rgba(71, 153, 255, 0.60)",
        // type: "dashed",
      },
    },
    axisLabel: {
      fontSize: 30,
      color: "#fff",
      lineHeight: 20,
      margin: 8,
    },
  },
  yAxis: {
    type: "category",
    data: dataend.map((item) => item.name),
    axisTick: {
      show: false,
    },
    inverse: true,
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
        fontSize: 30,
      },
      margin: 13,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(71, 153, 255, 0.60)",
      },
    },
  },
  series: [
    {
      type: "bar",
      data: dataend,
      itemStyle: {
        color: {
          type: "linear",
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(160, 249, 255, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(69, 153, 237, 0)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      backgroundStyle: {
        color: "rgba(108, 128, 151, .2)",
      },
      barWidth: 8,
      z: 5,
      emphasis: {
        disabled: true,
      },
    },
  ],
})

</script>

<style lang="scss" scoped>
.jiance-bg {
  background: url("assets/component/道水路运输系统-首页_slices/切图 653.png") no-repeat 100%/100%;
  height: 1338px;
  width: 1311px;
  margin-top: 10px;
  overflow-y: auto;
  padding-right: 10px;


  //滚动条样式
  &::-webkit-scrollbar {
    width: 12px;
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(125, 188, 255, 0.34);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
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

  .base-top {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .top-line {
      background: url('assets/component/道水路运输系统-首页_slices/切图 673.png') no-repeat center/cover;
      width: 6px;
      height: 146px;
    }

    .top-item {
      .top-icon1 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc4.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon2 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc5.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon3 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc6.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon4 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc7.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-count {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 50px;
        // line-height: 70px;
        letter-spacing: 1px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        height: 50px;
      }

      .top-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 40px;
        color: #A3D9FF;
        // line-height: 45px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .administration-topPro-content {
    padding: 46px 77px;
    padding-bottom: 0;
  }

  .administration-topPro-item {
    margin-bottom: 30px;
  }

  .administration-topPro-content-img {
    width: 75px;
    height: 81px;
    margin-right: 40px;
  }

  .topPro-content-text-heard-name {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 41px;
    color: #E0E5FA;
    line-height: 41px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, rgba(224, 229, 250, 1) 20%, rgba(20, 158, 255, 0.56) 90%, rgba(239, 252, 254, 0.36) 100%);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  .administration-topPro-item {
    padding-bottom: 30px;
  }

  .topPro-content-text-heard-value {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 58px;
    line-height: 45px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }

  .topPro-content-text-heard-unit {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 38px;
    line-height: 45px;
    color: #C3D3E2 !important;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-text-fill-color: rgba(195, 211, 226, 1) !important;
  }

  :deep(.q-linear-progress__model--determinate) {
    background: linear-gradient(180deg, #19AFD8 0%, #2ec9f3ae 100%);
  }

  :deep(.q-linear-progress__track--light) {
    background: #061726;
  }

}
</style>
