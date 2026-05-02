<template>
  <div class="trafficTravelRightIndex">
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog1">
      <div class="container-right-page1 no-shadow z-top">
        <div class="fit column">
          <div class="right-top">
            <div class="right-top-title">
              国家一号风景大道
            </div>
            <div class="right-top-close"></div>
          </div>
          <div class="right-bottom col column">
            <div class="right-bottom-content-top row justify-between">
              <div class="right-bottom-content-top-item" v-for="item in state.topData" :key="item.value">
                <div class="bottom-top-title row justify-evenly items-center">
                  <div class="bottom-top-title-left-icon"></div>
                  <div class="bottom-top-title-content">
                    {{ item.lable }}
                  </div>
                  <div class="bottom-top-title-right-icon"></div>
                </div>
                <div class="bottom-content row justify-center items-center">
                  <div class="bottom-content-value">{{ item.value }}
                    <span class="bottom-content-top-unit">{{ item.unit }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="right-bottom-content-bottom column col">
              <div class="right-bottom-content-bottom-heard">
                <q-icon name="img:icons/trafficTravel/bottom-title.png" size="160px" class="heard-icon"></q-icon>
                <span>品质提升工程</span>
                <div class="heard-select">
                  <el-select v-model="state.selectFirm" :teleported="false" class="firm-Select">
                    <el-option v-for="item in state.firmOptions" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </div>
              </div>
              <div class="right-bottom-content-bottom-item-info column">
                <div class="col row items-center">
                  <div class="col info-interval row items-center">
                    <q-icon name="img:icons/trafficTravel/lkts.png" class="info-icon"></q-icon>
                    <span class="info-title">路况提升:</span>
                    <span class="info-value">180.223
                      <span class="bottom-content-unit">公里</span>
                    </span>
                  </div>
                  <div class="col row items-center">
                    <q-icon name="img:icons/trafficTravel/lhts.png" class="info-icon"></q-icon>
                    <span class="info-title">绿化提升:</span>
                    <span class="info-value">137.149
                      <span class="bottom-content-unit">公里</span>
                    </span>
                  </div>
                </div>
                <div class="col row items-center info-color">
                  <div class="col info-interval row items-center">
                    <q-icon name="img:icons/trafficTravel/afts.png" class="info-icon"></q-icon>
                    <span class="info-title">安防提升:</span>
                    <span class="info-value">137.149
                      <span class="bottom-content-unit">公里</span>
                    </span>
                  </div>
                  <div class="col row items-center">
                    <q-icon name="img:icons/trafficTravel/fwssts.png" class="info-icon"></q-icon>
                    <span class="info-title">服务设施提升:</span>
                    <span class="info-value">16
                      <span class="bottom-content-unit">项</span>
                    </span>
                  </div>
                </div>
                <div class="col row items-center justify-center">
                  <span class="bottom-content-title">总投资:</span>
                  <span class="bottom-content-value">2.81</span>
                  <span class="bottom-content-unit-total">亿元</span>
                </div>
              </div>
              <div class="right-bottom-content-bottom-item-years-echarts column">
                <div class="echarts-title row items-center justify-center">历年投资情况</div>
                <div id="years-Echarts" class="echarts-size"></div>
              </div>
              <div class="right-bottom-content-bottom-item-sub-item-echarts column">
                <div class="echarts-title row items-center justify-center">分项投资情况</div>
                <div id="subItem-Echarts" class="echarts-size"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, ref, reactive, onMounted, watch, onUnmounted, nextTick } from "vue";
// import type * as echarts from "echarts";
import * as echarts from "echarts";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

const state = reactive({
  rightdialog: true,
  topData: [
    {
      lable: "总里程",
      value: "180",
      unit: '公里'
    },
    {
      lable: "综合驿站",
      value: "2",
      unit: '处'
    },
    {
      lable: "服务区",
      value: "2",
      unit: '处'
    },
    {
      lable: "停车区",
      value: "8",
      unit: '处'
    },
    {
      lable: "观景台",
      value: "7",
      unit: '处'
    },
    {
      lable: "串联旅游团组",
      value: "6",
      unit: '个'
    },
    {
      lable: "旅游专业村",
      value: "112",
      unit: '个'
    },
    {
      lable: "辐射景区",
      value: "20",
      unit: '个'
    },
    {
      lable: "辐射乡镇",
      value: "49",
      unit: '个'
    },
    {
      lable: "辐射行政村",
      value: "49",
      unit: '个'
    }
  ],
  selectFirm: "2023-2025",
  firmOptions: [
    {
      label: "2023-2025",
      value: "2023-2025",
    },
    {
      label: "2021-2023",
      value: "2021-2023",
    }
  ] as any,
  yearsChart: null,
  yearsChartOption: {},
  subItemChart: null,
  subItemChartOption: {},
});

const initChartData = () => {
  state.yearsChartOption = setBarChartOptions();
  state.yearsChart = initChart(
    "years-Echarts",
    state.yearsChart,
    state.yearsChartOption
  );
  state.subItemChartOption = setLineChartOptions();
  state.subItemChart = initChart(
    "subItem-Echarts",
    state.subItemChart,
    state.subItemChartOption
  );
};

//加载图表
const initChart = (domId: string, chart: any, option: any) => {
  if (chart !== null) {
    echarts.dispose(document.getElementById(domId) as HTMLElement);
    chart = null;
  }
  let chartDom = document.getElementById(domId);
  chart = echarts.init(chartDom);
  option && chart.setOption(option);
  return chart;
};

const setBarChartOptions = () => {
  let barOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(38, 49, 76, 1)",
      textStyle: {
        color: "rgba(205, 235, 249, 1)",
        fontSize: 32,
        fontFamily: "SourceHanSansBold",
      },
      formatter: (param: any) => {
        var title = param[0].name;
        var html = `<span style='font-weight:bolder'>${title}</span><br>`;
        param.forEach((item: any) => {
          html += `${item.marker} ${item.seriesName}<span style='font-weight:bolder;margin-left:15px;float:right'>${item.value}</span><br />`;
        });
        return html;
      },
    },
    grid: {
      bottom: 70,
      left: 250,
      top: 90,
      right: 150,
    },
    legend: {
      data: ["规划", "完成"],
      top: 20,
      right: 100,
      itemGap: 50,
      textStyle: {
        color: "#7CAEB3",
        fontSize: 32,
        fontFamily: "SourceHanSansRegular",
      },
    },
    xAxis: [
      {
        type: "category",
        // boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#7CAEB3",
          fontSize: 34,
          fontFamily: "SourceHanSansMedium",
          margin: 20,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: "#3C5787",
          },
        },
        data: ["2023", "2024", "2025"],
      },
    ],
    yAxis: [
      {
        name: "(万元)",
        type: "value",
        position: "left",
        nameLocation: "end",
        // max: 20,
        splitNumber: 6,
        nameTextStyle: {
          color: "#7CAEB3",
          fontSize: 28,
          fontFamily: "SourceHanSansRegular",
          align: "center",
          padding: [0, 0, 15, -50],
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: "rgba(192,215,252,0.1)",
          },
        },
        axisLabel: {
          color: "#7CAEB3",
          fontSize: 28,
          fontFamily: "SourceHanSansMedium",
        },
      },
    ],
    series: [
      {
        name: "规划",
        type: "bar",
        barWidth: "20%",
        itemStyle: {
          color: "#25E8CD",
        },
        data: [8745, 10152, 9532],
      },
      {
        name: "完成",
        type: "bar",
        barWidth: "20%",
        itemStyle: {
          color: "#8EB5E5",
        },
        data: [11555, 9635, 11111],
      }
    ],
  };
  return barOption;
};
const setLineChartOptions = () => {
  let lineOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(38, 49, 76, 1)",
      textStyle: {
        color: "#fff",
        fontSize: 32,
        fontFamily: "SourceHanSansRegular",
      },
      formatter: (param: any) => {
        var title = param[0].name;
        var html = `<span style='font-weight:bolder'>${title}</span><br>`;
        param.forEach((item: any) => {
          html += `${item.marker} ${item.seriesName}<span style='font-weight:bolder;margin-left:15px;float:right'>${item.value}</span><br />`;
        });
        return html;
      },
    },
    grid: {
      bottom: 70,
      left: 250,
      top: 90,
      right: 150,
    },
    legend: {
      top: 30,
      right: "5%",
      itemGap: 30,
      itemWidth: 40, // 图标宽度
      itemHeight: 20, // 图标高度
      textStyle: {
        color: "#7CAEB3",
        fontSize: 32,
        fontFamily: "SourceHanSansMedium",
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#7CAEB3",
          fontSize: 34,
          fontFamily: "SourceHanSansMedium",
          margin: 10,
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: "#3C5787",
          },
        },
        data: [
          2023,
          2024,
          2025
        ],
      },
    ],
    yAxis: [
      {
        name: "(万元)",
        type: "value",
        position: "left",
        nameLocation: "end",
        nameTextStyle: {
          color: "#7CAEB3",
          fontSize: 28,
          fontFamily: "SourceHanSansMedium",
          align: "center",
          padding: [0, 0, 15, -50],
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 3,
            color: "rgba(192,215,252,0.1)",
          },
        },
        axisLabel: {
          color: "#7CAEB3",
          fontSize: 28,
          fontFamily: "SourceHanSansMedium",
        },
      },
    ],
    series: [
      {
        name: "绿化提升",
        type: "line",
        smooth: true,
        symbol: 'none',
        itemStyle: {
          color: "#fff"
        },
        lineStyle: {
          width: 3,
          color: "#24C5B2 ",
        },
        data: [2100, 10010, 8032],
      },
      {
        name: "安防提升",
        type: "line",
        smooth: true,
        symbol: 'none',
        itemStyle: {
          color: "#fff"
        },
        lineStyle: {
          width: 3,
          color: "#784A17",
        },
        data: [2200, 5800, 2035],
      },
      {
        name: "路况提升",
        type: "line",
        smooth: true,
        symbol: 'none',
        itemStyle: {
          color: "#fff"
        },
        lineStyle: {
          width: 3,
          color: "#31AFFF",
        },
        data: [3010, 4021, 1560],
      },
      {
        name: "服务设施提升",
        type: "line",
        smooth: false,
        symbol: 'none',
        itemStyle: {
          color: "#fff"
        },
        lineStyle: {
          width: 3,
          color: "#5D7582"
        },
        data: [403, 1950, 300],
      }
    ],
  };
  return lineOption;
};
const resetChart = () => {
  let timeOut = setTimeout(() => {
    initChartData();
    clearTimeout(timeOut);
  }, 100);
};

//页面关闭
const close = () => {
  //关闭echart
  if (state.yearsChart !== null) {
    state.yearsChart.dispose();
    state.yearsChart = null;
  }
};
watch(
  () => themeConfig,
  () => {
    resetChart();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  nextTick(() => {
    initChartData();
  });
})
onUnmounted(() => {
  close();
})
</script>

<style scoped lang="scss">
.trafficTravelRightIndex {
  width: 100%;
  height: 100%;
  position: absolute;
}

.container-right-page1 {
  width: 1676px !important;
  max-width: 1522px !important;
  height: 100%;
  max-height: 100% !important;
}

.right-top {
  width: 100%;
  height: 102px;
  background-image: url("icons/trafficTravel/topTitle.png");
  background-size: 100% 100%;
}

.right-top-title {
  margin-left: 108px;
  font-family: AlibabaPuHuiTiExtraBold;
  font-size: 60px;
  color: #E1E8ED;
  font-style: italic;
  text-transform: none;
  // background: radial-gradient(0deg, #8AFFF0 0%, #FFFDE3 100%);
  background: linear-gradient(0deg, #8AFFF0 0%, #FFFDE3 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.right-top-close {
  width: 80px;
  height: 80px;
  background-image: url("icons/trafficTravel/delete.png");
  background-size: 100% 100%;
  position: absolute;
  top: 20px;
  right: 20px;
}

.right-bottom {
  width: 100%;
  background-image: url("icons/trafficTravel/rightDialogBg.png");
  background-size: 100% 100%;
}

.right-bottom-content-top {
  width: 100%;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 70px;
}

.right-bottom-content-top-item {
  width: 266px;
  height: 136px;
  background-image: url("icons/trafficTravel/topRight-item.png");
  background-size: 100% 100%;
  margin-bottom: 40px;
}

.bottom-top-title {
  width: 266px;
  height: 55px;
}

.bottom-content {
  width: 266px;
  height: 81px;
}

.bottom-top-title-left-icon {
  width: 18px;
  height: 15px;
  background-image: url("icons/trafficTravel/smalljiantou.png");
  background-size: 100% 100%;
}

.bottom-top-title-content {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 32px;
  color: #A1E4EB;
  font-style: normal;
  text-transform: none;
}

.bottom-top-title-right-icon {
  width: 18px;
  height: 15px;
  background-image: url("icons/trafficTravel/smalljiantou.png");
  background-size: 100% 100%;
  transform: scaleX(-1);
}

.bottom-content-value {
  font-family: BebasNeue;
  font-size: 66px;
  line-height: 81px;
  color: #9FF6FF;
  font-style: normal;
  text-transform: none;
}

.bottom-content-top-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 28px;
  color: #7CAEB3;
  font-style: normal;
  text-transform: none;
}

.right-bottom-content-bottom {
  margin: 80px 60px 40px;
  padding: 80px 60px 60px;
  background-image: url("icons/trafficTravel/bottomContentBg.png");
  background-size: 100% 100%;
  position: relative;
}

.right-bottom-content-bottom-heard {
  width: 70%;
  height: 82px;
  background-image: url("icons/trafficTravel/bottomTitleBg.png");
  background-size: 100% 100%;
  position: absolute;
  top: -30px;
  left: 50px;
}

.right-bottom-content-bottom-heard span {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 42px;
  color: #C5D8F6;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(0deg, #8AFFF0 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 140px;
}

.heard-icon {
  position: absolute;
  top: -80px;
  left: 0px;
}

.right-bottom-content-bottom-item-info {
  width: 100%;
  height: 25%;
  background: #112E2C;
  opacity: 0.6;
}

.right-bottom-content-bottom-item-years-echarts {
  width: 100%;
  height: 34%;
  margin-top: 40px;
  background-image: url("icons/trafficTravel/echartsBg.png");
  background-size: 100% 100%;
}

.right-bottom-content-bottom-item-sub-item-echarts {
  width: 100%;
  height: 34%;
  margin-top: 40px;
  background-image: url("icons/trafficTravel/echartsBg.png");
  background-size: 100% 100%;
}

.info-icon {
  width: 100px;
  height: 90px;
}

.info-interval {
  margin-left: 40px;
}

.info-color {
  background: radial-gradient(0% 0% at 0% 0%, #27484F 0%, #27484F 100%);
}

.info-title {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 34px;
  color: #7CAEB3;
  font-style: normal;
  text-transform: none;
  margin-left: 15px;
}

.info-value {
  font-family: YouSheBiaoTiHei;
  font-size: 49px;
  color: #9FF6FF;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #43DA7B 0%, #96E9D9 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 15px;
}

.bottom-content-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 28px;
  color: #7CAEB3;
  font-style: normal;
  text-transform: none;
  background: none;
  background: none;
  /* 去掉渐变背景 */
  -webkit-background-clip: initial;
  background-clip: initial;
  -webkit-text-fill-color: initial;
}

.bottom-content-title {
  font-family: SourceHanSansRegular;
  font-weight: bold;
  font-size: 39px;
  color: #7CAEB3;
  font-style: normal;
  text-transform: none;
}

.bottom-content-value {
  font-family: YouSheBiaoTiHei;
  font-size: 57px;
  margin-left: 30px;
  color: #FCCA00;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #FCCA00 0%, #FFDEA3 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bottom-content-unit-total {
  font-family: YouSheBiaoTiHei;
  font-size: 57px;
  margin-left: 30px;
  color: #FCCA00;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #FCCA00 0%, #FFDEA3 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.echarts-title {
  width: 100%;
  height: 17%;
  font-family: SourceHanSansCN, SourceHanSansCN;
  font-weight: 500;
  font-size: 36px;
  color: #C5D8F6;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #60c8ab 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.echarts-size {
  width: 100%;
  height: 83%;
}

.firm-Select {
  width: 280px;
  height: 65px;
  background: #082E2A;
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #5BF3DC;
  position: absolute;
  bottom: 0px;
  right: -300px;
}

.firm-Select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #082E2A;
  box-shadow: none;
  border-radius: 8px 8px 8px 8px;
}

.firm-Select :deep(.el-select__placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 34px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #b2e8ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.firm-Select :deep(.el-select__icon) {
  font-size: 34px;
}

.firm-Select :deep(.el-popper) {
  background-color: #082E2A;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #5BF3DC !important;
  inset: auto auto auto auto !important;
}

.firm-Select :deep(.el-popper__arrow) {
  background-color: #082E2A !important;
}

.firm-Select :deep(.el-select-dropdown__item.is-selected) {
  color: #3d7fff;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 34px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  height: 65px;
}

.firm-Select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #415b7a !important;
}

.firm-Select :deep(.el-select-dropdown__item) {
  color: #9fe2fd;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 34px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  height: 65px;
}

.firm-Select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}
</style>
<style>
.q-dialog__inner.flex {
  padding: 0 !important;
}

.q-dialog {
  max-width: 100% !important;
  max-height: 100% !important;
}

.right-page-dialog1>.fixed-right {
  top: 110px;
  bottom: 72px;
  right: 118px
}
</style>
