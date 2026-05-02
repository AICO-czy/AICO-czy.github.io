<template>
  <div class="container">
    <q-btn
      class="close-btn"
      round
      icon="img:icons/close.png"
      @click="handleClose()"
    ></q-btn>
    <div class="red-tourism-road-right-title">
      <span class="red-tourism-road-right-title-text">
        绿色塞罕坝-红色旅游路
      </span>
    </div>
    <div class="red-tourism-road-right-content">
      <div class="red-tourism-road-right-content-top">
        <div
          class="red-tourism-road-right-content-top-item"
          v-for="item in source"
          :key="item.id"
        >
          <div class="red-tourism-road-right-content-top-item-title">
            {{ item.title }}
          </div>
          <div class="red-tourism-road-right-content-top-item-number">
            <span class="number">{{ item.number }}</span
            ><span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
      <div class="red-tourism-road-right-content-body">
        <div class="red-tourism-road-right-content-body-title">
          <div class="text">品质提升工程</div>
        </div>
        <div class="red-tourism-road-right-content-body-icon"></div>
        <div class="red-tourism-road-right-content-body-time">
          <div class="time">2023-2025</div>
          <div class="icon">
            <q-icon
              class="red-tourism-road-right-content-body-time-icon"
              name="img:icons/三角形 1.png"
            ></q-icon>
          </div>
        </div>
        <div class="red-tourism-road-right-content-body-info">
          <div class="red-tourism-road-right-content-body-info-one">
            <div
              class="red-tourism-road-right-content-body-info-item"
              v-for="(item, index) in source2.slice(0, 2)"
              :key="item.id"
            >
              <div
                :class="`red-tourism-road-right-content-body-info-item-icon-${
                  index === 0 ? 'a' : 'b'
                }`"
              ></div>
              <div class="red-tourism-road-right-content-body-info-item-text">
                <span>{{ item.title }}</span>
                <span>{{ item.number }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
          <div class="red-tourism-road-right-content-body-info-two">
            <div
              class="red-tourism-road-right-content-body-info-item"
              v-for="(item, index) in source2.slice(2, 4)"
              :key="item.id"
            >
              <div
                :class="`red-tourism-road-right-content-body-info-item-icon-${
                  index === 0 ? 'c' : 'd'
                }`"
              ></div>
              <div class="red-tourism-road-right-content-body-info-item-text">
                <span>{{ item.title }}</span>
                <span>{{ item.number }}</span>
                <span>{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="red-tourism-road-right-content-body-invest">
          <span>总投资: </span>
          <span>2.81 亿元</span>
        </div>
        <div class="red-tourism-road-right-content-body-history">
          <div class="red-tourism-road-right-content-body-history-title">
            历年情况
          </div>
          <div ref="historyChartRef" style="width: 100%; height: 320px"></div>
        </div>
        <div class="red-tourism-road-right-content-body-clothes">
          <div class="red-tourism-road-right-content-body-clothes-title">
            分项投资情况
          </div>
          <div ref="clothesChartRef" style="width: 100%; height: 320px"></div>
        </div>
      </div>
      <div class="red-tourism-road-right-content-footer">
        <div class="red-tourism-road-right-content-footer-title">
          <div class="text">热门线路</div>
        </div>
        <div class="red-tourism-road-right-content-footer-icon"></div>
        <div class="red-tourism-road-right-content-footer-item">
          <div>排名</div>
          <div>路线名称</div>
          <div>今日车流量</div>
        </div>
        <div class="red-tourism-road-right-content-footer-info">
          <div class="red-tourism-road-right-content-footer-ranking">
            <div
              class="red-tourism-road-right-content-footer-ranking-item"
              v-for="item in rankingData"
              :key="item.rank"
            >
              <div class="ranking-column">
                <div class="ranking-ball">{{ item.rank }}</div>
              </div>
              <div class="name-column">{{ item.name }}</div>
              <div class="value-column">
                <div
                  ref="rankingChartRef"
                  :style="`width:100%;height:16px;`"
                  :data-index="item.rank - 1"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";

const props = defineProps({});

const historyChartRef = ref<HTMLElement | null>(null);
const clothesChartRef = ref<HTMLElement | null>(null);
const rankingChartRef = ref<HTMLElement[]>([]);
let historyChart: echarts.ECharts | null = null;
let clothesChart: echarts.ECharts | null = null;
let rankingCharts: echarts.ECharts[] = [];

const source = ref([
  {
    id: 1,
    title: "总里程",
    number: 180,
    unit: "公里",
  },
  {
    id: 2,
    title: "综合驿站",
    number: 2,
    unit: "处",
  },
  {
    id: 3,
    title: "服务区",
    number: 2,
    unit: "处",
  },
  {
    id: 4,
    title: "停车区",
    number: 8,
    unit: "处",
  },
  {
    id: 5,
    title: "观景台",
    number: 7,
    unit: "处",
  },
]);

const source2 = ref([
  {
    id: 1,
    title: "路况提升: ",
    number: 180.223,
    unit: "公里",
  },
  {
    id: 2,
    title: "绿化提升: ",
    number: 137.149,
    unit: "公里",
  },
  {
    id: 3,
    title: "安防提升: ",
    number: 137.149,
    unit: "公里",
  },
  {
    id: 4,
    title: "服务设施提升: ",
    number: 16,
    unit: "项",
  },
]);

// 排行榜数据
const rankingData = ref([
  { name: "国家一号风景大道", value: 2680, rank: 1 },
  { name: "美丽燕塞路", value: 2340, rank: 2 },
]);

const historyOption = {
  grid: {
    top: "25%",
    left: "10%",
    right: "10%",
    bottom: "15%",
  },
  tooltip: {
    backgroundColor: "rgba(13, 64, 71, 0.50)",
    borderColor: "rgba(143, 225, 252, 0.60)",
    padding: 8,
    textStyle: {
      fontFamily: "AlibabaPuHuiTi_3_55_Regular",
      fontSize: 28,
      color: "#7CAEB3",
      lineHeight: 38,
      textAlign: "right",
      fontStyle: "normal",
      textTransform: "none",
    },
  },
  legend: {
    data: ["规划", "完成"],
    itemWidth: 14,
    itemHeight: 10,
    itemGap: 4,
    right: 50,
    top: 30,
    textStyle: {
      fontFamily: "AlibabaPuHuiTi_3_55_Regular",
      fontSize: 28,
      color: "#7CAEB3",
      lineHeight: 38,
      textAlign: "right",
      fontStyle: "normal",
      textTransform: "none",
    },
  },
  xAxis: [
    {
      type: "category",
      data: ["2023", "2024", "2025"],
      axisPointer: {
        type: "shadow",
      },
      axisLabel: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
      },
    },
  ],
  yAxis: [
    {
      name: "(万元)",
      nameTextStyle: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
      },
      type: "value",
      axisLabel: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#979797",
          type: [5, 10],
        },
      },
    },
  ],
  series: [
    {
      name: "规划",
      type: "bar",
      barWidth: 29,
      color: "#25E8CD",
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontFamily: "AlibabaPuHuiTi_3_55_Regular",
              fontSize: 28,
              color: "#7CAEB3",
              lineHeight: 38,
              textAlign: "right",
              fontStyle: "normal",
              textTransform: "none",
            },
          },
        },
      },
      data: [72, 65, 80, 70, 50],
    },
    {
      name: "完成",
      type: "bar",
      barWidth: 29,
      color: "#8EB5E5",
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: "top",
            textStyle: {
              fontFamily: "AlibabaPuHuiTi_3_55_Regular",
              fontSize: 28,
              color: "#7CAEB3",
              lineHeight: 38,
              textAlign: "right",
              fontStyle: "normal",
              textTransform: "none",
            },
          },
        },
      },
      data: [48, 30, 55, 60, 20],
    },
  ],
};

let colorList = ["#0783FA", "#FF2E2E", "#07D1FA", "#FFD15C"];
let areaColorList = [
  { to: "rgba(7, 131, 250, 0)", from: "rgba(7, 131, 250, 0.2)" },
  { to: "rgba(255, 46, 46, 0)", from: "rgba(255, 46, 46, 0.2)" },
  { to: "rgba(7, 209, 250, 0)", from: "rgba(7, 209, 250, 0.2)" },
  { to: "rgba(255, 209, 92, 0)", from: "rgba(255, 209, 92, 0.2)" },
];
let clothesData = [
  {
    name: "绿化提升",
    data: [
      { value: 45, name: "2023" },
      { value: 38, name: "2024" },
      { value: 52, name: "2025" },
    ],
  },
  {
    name: "安防提升",
    data: [
      { value: 32, name: "2023" },
      { value: 28, name: "2024" },
      { value: 35, name: "2025" },
    ],
  },
  {
    name: "路况提升",
    data: [
      { value: 58, name: "2023" },
      { value: 45, name: "2024" },
      { value: 62, name: "2025" },
    ],
  },
  {
    name: "服务设施提升",
    data: [
      { value: 25, name: "2023" },
      { value: 35, name: "2024" },
      { value: 42, name: "2025" },
    ],
  },
];

const clothesOption = {
  grid: {
    top: "25%",
    left: "10%",
    right: "10%",
    bottom: "15%",
  },
  color: colorList,
  legend: {
    top: "10%",
    right: "5%",
    icon: "circle",
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 12,
    textStyle: {
      fontFamily: "AlibabaPuHuiTi_3_55_Regular",
      fontSize: 28,
      color: "#7CAEB3",
      lineHeight: 38,
      textAlign: "right",
      fontStyle: "normal",
      textTransform: "none",
    },
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
      },
      data: ["2023", "2024", "2025"],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "(万元)",
      nameTextStyle: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
        padding: [0, 0, 0, -30],
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        lineHeight: 38,
        textAlign: "right",
        fontStyle: "normal",
        textTransform: "none",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#182D46",
          type: [2, 3],
          dashOffset: 2,
        },
      },
    },
  ],
  series: clothesData.map((item, index) => {
    return {
      name: item.name,
      type: "line",
      smooth: true,
      symbol: "none",
      symbolSize: 8,
      zlevel: 3,
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: areaColorList[index].from,
            },
            {
              offset: 1,
              color: areaColorList[index].to,
            },
          ],
          global: false,
        },
        shadowBlur: 0,
        shadowColor: "transparent",
      },
      data: item.data.map((item) => item.value),
    };
  }),
};

// 排行榜图表配置
const rankingOption = {
  grid: {
    top: "0%",
    left: "0%",
    right: "0%",
    bottom: "0%",
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(13, 64, 71, 0.50)",
    borderColor: "rgba(143, 225, 252, 0.60)",
    padding: 8,
    textStyle: {
      fontFamily: "AlibabaPuHuiTi_3_55_Regular",
      fontSize: 24,
      color: "#7CAEB3",
      lineHeight: 32,
    },
    formatter: function (params: any) {
      const dataIndex = params[0].dataIndex;
      const actualValue = dataIndex === 0 ? 2680 : 2340;
      return `今日车流量: ${actualValue}`;
    },
  },
  xAxis: {
    type: "value",
    show: false,
    max: 2680,
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
  },
  yAxis: {
    type: "category",
    data: ["0", "1"], // 简单的索引
    show: false,
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: "车流量",
      type: "bar",
      data: [2680, 2680],
      barHeight: 3,
      itemStyle: {
        color: function (params: any) {
          const actualValue = params.dataIndex === 0 ? 2680 : 2340;
          const maxValue = 2680;
          const percentage = actualValue / maxValue;

          return {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#1FC2AA" },
              { offset: percentage, color: "#1FC2AA" },
              { offset: percentage, color: "#243D49" },
              { offset: 1, color: "#243D49" },
            ],
          };
        },
      },
      label: {
        show: true,
        position: "right",
        offset: [15, 0],
        fontFamily: "AlibabaPuHuiTi_3_55_Regular",
        fontSize: 28,
        color: "#7CAEB3",
        formatter: function (params: any) {
          return params.dataIndex === 0 ? "2680" : "2340";
        },
      },
    },
  ],
};

function resizeCharts() {
  historyChart?.resize();
  clothesChart?.resize();
  rankingCharts.forEach((chart) => chart?.resize());
}

import { otherInfo } from "src/stores/otherInfo";
const storeOtherInfo = otherInfo();

import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);
const emit = defineEmits(["close-page"]);
const handleClose = () => {
  emit("close-page", "ruralRoadClose");
  storeOtherInfo.setSelectArea("home");
};

watch(
  () => themeConfig,
  () => {
    resizeCharts();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  if (historyChartRef.value) {
    historyChart = echarts.init(historyChartRef.value);
    historyChart.setOption(historyOption);
  }
  if (clothesChartRef.value) {
    clothesChart = echarts.init(clothesChartRef.value);
    clothesChart.setOption(clothesOption);
  }

  setTimeout(() => {
    const chartRefs = document.querySelectorAll("[data-index]");
    chartRefs.forEach((el, index) => {
      const element = el as HTMLElement;
      const dataIndex = parseInt(element.getAttribute("data-index") || "0");
      const chart = echarts.init(element);

      const singleRankingOption = {
        ...rankingOption,
        series: [
          {
            ...rankingOption.series[0],
            data: [2680],
            itemStyle: {
              color: function () {
                const currentItem = rankingData.value[dataIndex];
                const actualValue = currentItem?.value || 0;
                const maxValue = 2680;
                const percentage = actualValue / maxValue;

                return {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: "#1FC2AA" },
                    { offset: percentage, color: "#1FC2AA" },
                    { offset: percentage, color: "#243D49" },
                    { offset: 1, color: "#243D49" },
                  ],
                };
              },
            },
            label: {
              show: true,
              position: "right",
              offset: [15, 0],
              fontFamily: "AlibabaPuHuiTi_3_55_Regular",
              fontSize: 22,
              color: "#7CAEB3",
              formatter: function () {
                const currentItem = rankingData.value[dataIndex];
                return (currentItem?.value || 0).toString();
              },
            },
          },
        ],
      };

      chart.setOption(singleRankingOption);
      rankingCharts.push(chart);
    });
  }, 100);

  window.addEventListener("resize", resizeCharts);
});

onUnmounted(() => {
  historyChart?.dispose();
  clothesChart?.dispose();
  rankingCharts.forEach((chart) => chart?.dispose());
  window.removeEventListener("resize", resizeCharts);
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  position: relative;
}

.delete {
  width: 65px;
  height: 65px;
  position: absolute;
  right: 0;
  top: 0;
  background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/delete.png");
  background-size: 100% 100%;
}

.close-btn {
  width: 65px;
  height: 65px;
  font-size: 48px;
  position: absolute;
  right: 0;
  top: -20px;
}
.red-tourism-road-right-title {
  width: 1564px;
  height: 102px;
  background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 217.png");
  background-size: 100% 100%;

  &-text {
    font-family: AlibabaPuHuiTi_3_95_ExtraBold;
    font-size: 60px;
    color: #e1e8ed;
    text-align: left;
    font-style: italic;
    text-transform: none;
    background: linear-gradient(to bottom, #8afff0 0%, #fffde3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    margin-left: 108px;
    margin-bottom: 29px;
    padding-right: 15px;
  }
}

.red-tourism-road-right-content {
  width: 1517px;
  height: 1960px;
  // margin-bottom: 72px;
  box-sizing: border-box;
  padding: 50px;
  background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/弹框3.png");
  background-size: 100% 100%;

  .red-tourism-road-right-content-top {
    display: flex;

    justify-content: space-between;
    align-items: center;

    &-item {
      width: 243px;
      height: 160px;
      font-size: 60px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/1.png");
      background-size: 100% 100%;
      padding-top: 40px;
      padding-left: 30px;
      box-sizing: border-box;

      &-title {
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 400;
        font-size: 34px;
        color: #7caeb3;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      &-number {
        .number {
          font-family: YouSheBiaoTiHei;
          font-size: 62px;
          color: #9ff6ff;
          text-align: left;
          font-style: normal;
          text-transform: none;
          background: radial-gradient(0deg, #67d0f5 0%, #51f3e8 100%);
        }

        .unit {
          font-family: SourceHanSansCN, SourceHanSansCN;
          font-weight: 400;
          font-size: 22px;
          color: #7caeb3;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .red-tourism-road-right-content-body {
    background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 213.png");
    background-size: 100% 100%; // Changed from cover to 100% 100%
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    margin-top: 90px;
    padding: 89px 40px 20px 40px;
    box-sizing: border-box;
    width: 1428px;
    height: 1332px;

    .red-tourism-road-right-content-body-title {
      position: absolute;
      left: 26px;
      top: -26px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/形状 643.png");
      background-size: 100% 100%;
      width: 1060px;
      height: 77px;

      .text {
        position: relative;
        z-index: 1;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        font-size: 45px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        font-style: italic;
        margin-left: 139px;
        background: linear-gradient(to bottom, #30e4af 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .red-tourism-road-right-content-body-icon {
      position: absolute;
      left: 26px;
      top: -106px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 30 拷贝.png");
      background-size: 100% 100%;
      width: 160px;
      height: 161px;
      z-index: 99;
    }

    .red-tourism-road-right-content-body-time {
      width: 269px;
      height: 54px;
      top: -5px;
      background: #082e2a;
      border-radius: 8px 8px 8px 8px;
      border: 1px solid #5bf3dc;
      position: absolute;
      right: 82px;
      display: flex;

      .time {
        font-family: MicrosoftYaHei;
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        font-style: normal;
        text-transform: none;
        width: calc(100% - 55px);
        height: 100%;
        line-height: 45px;
      }

      .icon {
        width: 55px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #5bf3dc;
        border-radius: 8px;

        .red-tourism-road-right-content-body-time-icon {
          width: 19px;
          height: 16px;
          background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/三角形 1.png");
          background-size: 100% 100%;
        }
      }
    }

    .red-tourism-road-right-content-body-info {
      width: 100%;
      height: 180px;
      display: grid;
      grid-template-rows: repeat(2, 1fr);

      &-one {
        width: 100%;
        background-color: #0f2825;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      &-two {
        width: 100%;
        background-color: #1a393b;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }

      .red-tourism-road-right-content-body-info-item {
        display: flex;
        justify-content: start;
        align-items: center;

        .red-tourism-road-right-content-body-info-item-icon-a {
          margin-left: 21px;
          width: 90px;
          height: 80px;
          background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 217 拷贝.png");
          background-size: 100% 100%;
        }

        .red-tourism-road-right-content-body-info-item-icon-b {
          margin-left: 21px;
          width: 90px;
          height: 80px;
          background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 218.png");
          background-size: 100% 100%;
        }

        .red-tourism-road-right-content-body-info-item-icon-c {
          margin-left: 21px;
          width: 90px;
          height: 80px;
          background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 217 拷贝(1).png");
          background-size: 100% 100%;
        }

        .red-tourism-road-right-content-body-info-item-icon-d {
          margin-left: 21px;
          width: 90px;
          height: 80px;
          background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 217 拷贝(2).png");
          background-size: 100% 100%;
        }

        .red-tourism-road-right-content-body-info-item-text span:first-child {
          font-family: SourceHanSansCN, SourceHanSansCN;
          font-weight: 400;
          font-size: 34px;
          color: #7caeb3;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-left: 35px;
        }

        .red-tourism-road-right-content-body-info-item-text span:nth-child(2) {
          font-family: YouSheBiaoTiHei;
          font-size: 49px;
          color: #9ff6ff;
          text-align: left;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(to right, #43da7b 0%, #96e9d9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: 29px;
        }

        .red-tourism-road-right-content-body-info-item-text span:last-child {
          width: 38px;
          height: 18px;
          font-family: SourceHanSansCN, SourceHanSansCN;
          font-weight: 400;
          font-size: 20px;
          color: #7caeb3;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-left: 13px;
        }
      }
    }

    .red-tourism-road-right-content-body-invest {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .red-tourism-road-right-content-body-invest span:first-child {
      font-family: SourceHanSansCN, SourceHanSansCN;
      font-weight: bold;
      font-size: 39px;
      color: #7caeb3;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .red-tourism-road-right-content-body-invest span:last-child {
      margin-left: 40px;
      font-family: YouSheBiaoTiHei;
      font-size: 57px;
      color: #fcca00;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: radial-gradient(0deg, #fcca00 0%, #ffdea3 100%);
    }

    .red-tourism-road-right-content-body-history {
      margin-top: 20px;
      width: 100%;
      height: 445px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 218(1).png");
      background-size: 100% 100%;

      .red-tourism-road-right-content-body-history-title {
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        font-size: 36px;
        color: #c5d8f6;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: radial-gradient(0deg, #30e4af 0%, #ffffff 100%);
        text-align: center;
        padding-top: 9px;
      }
    }

    .red-tourism-road-right-content-body-clothes {
      margin-top: 24px;
      width: 100%;
      height: 445px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 218(1).png");
      background-size: 100% 100%;

      .red-tourism-road-right-content-body-clothes-title {
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        font-size: 36px;
        color: #c5d8f6;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: radial-gradient(0deg, #30e4af 0%, #ffffff 100%);
        text-align: center;
        padding-top: 9px;
      }
    }
  }

  .red-tourism-road-right-content-footer {
    background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 213.png");
    background-size: 100% 100%;
    position: relative;
    margin-top: 70px;
    padding: 40px 40px 15px 40px;
    box-sizing: border-box;
    height: 200px;

    .red-tourism-road-right-content-footer-title {
      position: absolute;
      left: 26px;
      top: -26px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/形状 643.png");
      background-size: 100% 100%;
      width: 1060px;
      height: 77px;

      .text {
        position: relative;
        z-index: 1;
        font-family: SourceHanSansCN, SourceHanSansCN;
        font-weight: 500;
        font-size: 45px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        font-style: italic;
        margin-left: 139px;
        background: linear-gradient(to bottom, #30e4af 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .red-tourism-road-right-content-footer-icon {
      position: absolute;
      left: 26px;
      top: -106px;
      background-image: url("assets/component/绿色塞罕坝-红色旅游路_slices/组 30 拷贝.png");
      background-size: 100% 100%;
      width: 160px;
      height: 161px;
      z-index: 99;
    }

    .red-tourism-road-right-content-footer-item {
      display: grid;
      grid-template-columns: 20% 40% 40%;
      padding: 0 4px;
      border-bottom: 1px solid #2a5a5d;
      font-family: SourceHanSansCN, SourceHanSansCN;
      font-weight: 400;
      font-size: 30px;
      color: #d7e9eb;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 8px;

      div:first-child {
        text-align: left;
      }

      div:nth-child(2) {
        text-align: left;
        padding-left: 77px;
      }

      div:last-child {
        text-align: right;
        padding-right: 8px;
      }
    }

    .red-tourism-road-right-content-footer-info {
      padding: 0px 4px;
      height: 80px;

      .red-tourism-road-right-content-footer-ranking {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 2px;

        &-item {
          display: grid;
          grid-template-columns: 20% 40% 40%;
          height: 32px;
          align-items: center;
          padding: 0 4px;
          margin-bottom: 4px;

          .ranking-column {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .ranking-ball {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: linear-gradient(135deg, #1fc2aa 0%, #0fa686 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: AlibabaPuHuiTi_3_55_Regular;
              font-size: 18px;
              color: #ffffff;
              font-weight: bold;
              box-shadow: 0 1px 4px rgba(31, 194, 170, 0.3);
            }
          }

          .name-column {
            padding-left: 77px;
            font-family: AlibabaPuHuiTi_3_55_Regular;
            font-size: 24px;
            color: #7caeb3;
            text-align: left;
            line-height: 1.2;
          }

          .value-column {
            padding-right: 80px;
            position: relative;
          }
        }
      }
    }
  }
}
</style>
