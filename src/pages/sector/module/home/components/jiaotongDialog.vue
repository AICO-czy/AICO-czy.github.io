<!-- 交通强市弹窗 -->
<template>
  <q-dialog v-model="dialog" seamless>
    <div class="cont">
      <!-- 关闭按钮 -->
      <div class="chat-close" @click="close"></div>
      <!-- 切换弹窗按钮 -->
      <div class="switch-b" @click="switchBtn"></div>
      <!-- 标题 -->
      <div class="chat-title">交通强市</div>
      <div style="display: flex; flex-direction: column; height: 100%" v-if="!showTabel">
        <!-- 顶部：规划年限与合计 -->
        <div class="top-bar">
          <div class="dot"></div>
          <div class="label">规划年限：</div>
          <div class="range">2017年-2027年</div>
          <div class="split"></div>
          <div class="label">合计：</div>
          <div class="total">575亿元</div>
        </div>
        <div class="bob">
          <!-- 五个统计卡片 -->
          <div class="cards-wrap">
            <div class="cards-row row-top">
              <div class="card" v-for="(c, i) in topCards" :key="'top-' + i">
                <div class="card-header">
                  <div class="icon">
                    <div class="title">{{ c.title }}</div>
                  </div>
                  <div class="money-wrap">计划投资：</div>
                  <div class="money">{{ c.money }}</div>
                </div>
                <div class="card-body">
                  <div class="left-icon">
                    <img :src="icons[i]" style="width: 100%; height: 100%" alt="" />
                  </div>
                  <div class="right-desc">{{ c.desc }}</div>
                </div>
              </div>
            </div>
            <div class="cards-row row-bottom">
              <div class="card" v-for="(c, i) in bottomCards" :key="'bottom-' + i">
                <div class="card-header" style="padding-left: 30px">
                  <div class="icon" :class="c.icon">
                    <div class="title">{{ c.title }}</div>
                  </div>
                  <div class="money-wrap">计划投资：</div>
                  <div class="money">{{ c.money }}</div>
                </div>
                <div class="card-body">
                  <div class="left-icon">
                    <img :src="icons[3 + i]" alt="" style="width: 100%; height: 100%" />
                  </div>
                  <div class="right-desc">{{ c.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分析切换 -->
          <div class="switch-row">
            <div class="switch-btn-wrap">
              <div class="switch-btn" :class="{ active: activeTab === 'invest' }" @click="activeTab = 'invest'">
                投资占比分析
              </div>
              <div class="switch-btn" :class="{ active: activeTab === 'year' }" @click="activeTab = 'year'">
                年度投资分析
              </div>
            </div>
            <div class="years-row">
              <div class="year-item" v-for="y in years" :key="y" :class="{ current: y === currentYear }"
                @click="currentYear = y">
                {{ y }}
              </div>
            </div>
          </div>
          <!-- 柱状图（原生 ECharts） -->
          <div class="chart">
            <div ref="chartRef" class="chart-canvas"></div>
          </div>
        </div>
      </div>
      <div v-if="showTabel" style="display: flex; flex-direction: column; height: 100%">
        <!-- 交通强市表格 -->
        <div class="title-table">交通强市项目投资情况表</div>
        <q-markup-table class="table-box" separator="cell" flat bordered wrap-cells>
          <thead>
            <tr>
              <th class="cell-box table-header" v-for="item in tableHeader">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr v-for="(it, ind) in tableData">
              <td class="cell-box" v-if="it.showType" :rowspan="it.rowspan" @click="handleClick(it)">
                <div>
                  {{ it.type }}
                </div>
              </td>
              <td class="cell-box" v-for="item in tableHeader.slice(1)">
                <div>
                  {{ it[item.value] }}
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  computed, toRefs
} from "vue";
import * as echarts from "echarts";

import { useTableAccountStore } from '../../../store/tableAccount'

const tableAccountStore = useTableAccountStore()

const { activeTab : dialogTag } = toRefs(tableAccountStore)

const dialog = ref(false);

const showTabel = ref(false)

const tableHeader = ref([
  { name: '类型', value: 'type' },
  { name: '序号', value: 'index' },
  { name: '县级行政区', value: 'xzq' },
  { name: '项目名称', value: 'xmmc' },
  { name: '长度/面积', value: 'cd' },
  { name: '总投资', value: 'ztz' },
  { name: '工作任务', value: 'work' },
])

const tableData = ref([
  { type: '高速公路', showType: true, rowspan: '2', index: 1, xzq: '兴隆', xmmc: '承平高速', 'cd': '59', ztz: '146.1', work: '双向六车道标准，里程59公里 已通车' },
  { type: '高速公路', showType: false, index: 2, xzq: '占地', xmmc: 'xx高速', 'cd': '66', ztz: '146.1', work: '双向六车道标准，里程66公里 已通车' },
  { type: '普通干线路', showType: true, rowspan: '2', index: 3, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '普通干线路', showType: false, index: 4, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '农村公路', showType: true, rowspan: '2', index: 5, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '农村公路', showType: false, index: 6, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '公路养护工程', showType: true, rowspan: '1', index: 7, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '公路运输枢纽工程', showType: true, rowspan: '2', index: 8, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
  { type: '公路运输枢纽工程', showType: false, index: 9, xzq: '围场', xmmc: '承克高速', 'cd': '106', ztz: '141.5', work: '双向四车道标准，里程106公里' },
])

const $emit = defineEmits(["closeEve"]);

const open = () => {
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  showTabel.value = false;
  $emit("closeEve");
};

function handleClick(data: any) {
  // alert(`按钮点击${data.type}`)
  switch (data.type) {
    case '高速公路':
      dialogTag.value = 0
      break;
    case '普通干线路':

      dialogTag.value = 1
      break;
    case '农村公路':

      dialogTag.value = 2
      break;
    case '公路养护工程':

      dialogTag.value = 3
      break;
    case '公路运输枢纽工程':

      dialogTag.value = 4
      break;

    default:
      break;
  }
  tableAccountStore.openDialog()
}

const activeTab = ref<"invest" | "year">("year");
const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
const currentYear = ref(2025);

const cards = [
  {
    icon: "item-1",
    title: "高速公路",
    money: "292亿元",
    desc: "任务：5条段，其中：公路2条、165公里、互通3座",
  },
  {
    icon: "pg73",
    title: "普通干线公路",
    money: "27亿元",
    desc: "任务：23条段，543公里",
  },
  {
    icon: "nc73",
    title: "农村公路",
    money: "27亿元",
    desc: "任务：新改建3500公里",
  },
  {
    icon: "gx73",
    title: "干线公路养护",
    money: "11亿元",
    desc: "任务：大、中修工程1000公里，安防设施500公里",
  },
  {
    icon: "ys73",
    title: "公路运输枢纽",
    money: "24亿元",
    desc: "任务：客运场站8个",
  },
];

// 使用静态导入的方式，更可靠
import item1Icon from "assets/image/lefty/item-1.png";
import pg73Icon from "assets/image/lefty/pg73.png";
import nc73Icon from "assets/image/lefty/nc73.png";
import gx73Icon from "assets/image/lefty/gx73.png";
import ys73Icon from "assets/image/lefty/ys.png";

const iconMap = {
  "item-1": item1Icon,
  pg73: pg73Icon,
  nc73: nc73Icon,
  gx73: gx73Icon,
  ys73: ys73Icon,
};

const icons = cards.map((c) => iconMap[c.icon as keyof typeof iconMap] || "");

const topCards = computed(() => cards.slice(0, 3));
const bottomCards = computed(() => cards.slice(3, 5));

const bars = [
  { name: "高速公路", plan: 35, done: 28 },
  { name: "普通干线公路", plan: 30, done: 24 },
  { name: "农村公路", plan: 32, done: 25 },
  { name: "公路养护工程", plan: 40, done: 31 },
  { name: "公路运输枢纽工程", plan: 38, done: 30 },
];

// 原生 ECharts 渲染
const chartRef = ref<HTMLDivElement | null>(null);
let chart: echarts.ECharts | null = null;

function buildOption() {
  return {
    grid: { left: 70, right: 20, top: 60, bottom: 10, containLabel: true },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(6,19,33,0.9)",
      borderColor: "rgba(120,190,255,.35)",
      textStyle: { color: "#D7EDFF" },
    },
    animation: true,
    animationDuration: 600,
    legend: {
      data: ["计划投资（亿元）", "完成投资（亿元）"],
      top: 6,
      left: "center",
      itemWidth: 20,
      itemHeight: 20,
      textStyle: { color: "#C9DBEA", fontSize: 32 },
    },
    xAxis: {
      type: "category",
      axisLine: { lineStyle: { color: "rgba(165,203,255,.35)" } },
      axisTick: { show: false },
      axisLabel: { color: "#D7EDFF", fontSize: 32, margin: 12 },
      data: bars.map((b) => b.name),
    },
    yAxis: {
      type: "value",
      name: "单位：亿元",
      nameTextStyle: { color: "#86C8FF", padding: [0, 0, 0, 20], fontSize: 32 },
      splitLine: { lineStyle: { color: "rgba(165,203,255,.25)" } },
      axisLine: { show: false },
      axisLabel: { color: "#CFE8FF", fontSize: 24 },
    },
    series: [
      {
        name: "计划投资（亿元）",
        type: "bar",
        barWidth: 18,
        barGap: "35%",
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#A8E2FF" },
            { offset: 0.4, color: "#67BFF5" },
            { offset: 1, color: "#1F5E9A" },
          ]),
          shadowColor: "rgba(70,160,255,.35)",
          shadowBlur: 8,
          shadowOffsetY: 3,
          borderRadius: [4, 4, 0, 0],
        },
        data: bars.map((b) => b.plan),
      },
      {
        name: "完成投资（亿元）",
        type: "bar",
        barWidth: 18,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#E5FFFE" },
            { offset: 0.4, color: "#79E1DD" },
            { offset: 1, color: "#2AA2A7" },
          ]),
          shadowColor: "rgba(90,220,210,.35)",
          shadowBlur: 8,
          shadowOffsetY: 3,
          borderRadius: [4, 4, 0, 0],
        },
        data: bars.map((b) => b.done),
      },
    ],
  };
}

function renderChart() {
  if (!chartRef.value) return;
  if (chart) chart.dispose();
  chart = echarts.init(chartRef.value, undefined, { renderer: "canvas" });
  chart.setOption(buildOption());
}

onMounted(async () => {
  await nextTick();
  renderChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  if (chart) chart.dispose();
  chart = null;
});

function resizeChart() {
  if (chart) chart.resize();
}

/**
 * @description 切换弹窗内容按钮
 */
const switchBtn = () => {
  // console.log("switchBtn");
  showTabel.value = !showTabel.value
  if (!showTabel.value) {
    nextTick(renderChart)
  }
};

// 当对话框打开时渲染（避免容器为0导致计算错误）
watch(dialog, (v) => {
  if (v) nextTick(renderChart);
});

defineExpose({ open, close });
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
  max-width: 2037px !important;
  min-height: 1136px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.cont {
  width: 2037px;
  height: 1136px;
  position: relative;
  z-index: 9999;
  padding: 120px 90px 90px 90px;
  box-sizing: border-box;
  background: rgba(2, 24, 40, 0.85);
  border-radius: 8px;
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  background: url("assets/image/lefty/jt-bg.png") no-repeat 60% / 98%;
  position: absolute;
  top: 438px;
  left: 1857px;

  .chat-close {
    width: 42px;
    height: 42px;
    background: url("assets/image/lefty/close-btn.png") no-repeat 100%/100%;
    position: absolute;
    right: 75px;
    top: 80px;
  }

  .chat-title {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 50px;
    line-height: 69px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    letter-spacing: 10px;
    left: 145px;
    top: 30px;
    color: #fff;
    // 文字倾斜
    transform: skewX(-10deg);
  }

  .switch-b {
    width: 66px;
    height: 64px;
    background: url("assets/image/lefty/diachange.png") no-repeat 100% / 100%;
    position: absolute;
    right: 160px;
    top: 75px;
  }
}

.bob {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: url("assets/image/lefty/img142.png") no-repeat 50% / 98%;
  padding: 28px 60px;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a8d7ff;
  font-size: 28px;
  padding-left: 40px;
}

.top-bar .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #54b7ff;
  box-shadow: 0 0 8px #54b7ff;
}

.top-bar .label {
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 38px;
  color: #c3d3e2;
  line-height: 53px;
  text-align: left;
  font-style: normal;
}

.top-bar .range {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 46px;
  line-height: 60px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #ffb579 0%, #ffefb8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.top-bar .split {
  width: 2px;
  height: 20px;
  background: rgba(120, 180, 255, 0.4);
  margin: 0 10px 0 4px;
}

.top-bar .total {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 46px;
  line-height: 60px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #5de5b4 0%, #a7ece8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.title-table {
  font-family: AlibabaPuHuiTiRegular;
  text-align: center;
  width: 100%;
  font-size: 48px;
  color: #A3D9FF;


}

.table-box {
  background-color: transparent;
  border-color: #999 !important;

  .q-table {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .table-header {
    font-size: 42px;
    line-height: 100px;
    height: 100px;
    flex: none
  }

  .table-body {
    flex: 1;
    overflow-y: scroll;
  }
}

.cell-box {
  line-height: 50px;
  text-align: center;
  color: #A3D9FF;
  font-size: 40px;
  border-color: #999 !important;
  border-width: 2px;
  min-width: 250px;
}

.cards-wrap {
  margin-top: 18px;
}

.cards-row {
  display: flex;
  gap: 24px;
}

.row-top {
  justify-content: space-between;
  margin-bottom: 16px;
}

.row-bottom {
  justify-content: space-between;
  gap: 40px;
  height: 182px;

  .card {
    background: url("assets/image/lefty/card-it.png") no-repeat 100% / 100%;
  }
}

.card {
  width: 600px;
  height: 182px;
  background: url("assets/image/lefty/jt-item.png") no-repeat 100% / 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  height: 76px;
}

.card-header .icon {
  width: 190px;
  height: 76px;
  background: url("assets/image/lefty/text-bg.png") no-repeat 100% / 100%;
}

.money-wrap {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 30px;
  color: #e3f1ff;
  line-height: 41px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.money {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 40px;
  line-height: 52px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #5de5b4 0%, #a7ece8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.icon {
  background: url("assets/image/lefty/text-bg.png") no-repeat 100% / 100%;
  width: 190px;
  height: 76px;
}

.title {
  width: 100%;
  height: 100%;
  display: flex;
  line-height: 78px;
  justify-content: center;
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 30px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #d2f4ff 0%, #ffffff 71%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
}

.title .num {
  color: #6de8ff;
  margin-left: 8px;
  font-weight: 800;
}

.card-body {
  display: flex;

  .left-icon {
    width: 147px;
    height: 120px;
    margin-top: -24px;
  }

  .right-desc {
    flex: 1;
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 500;
    font-size: 30px;
    color: #e3f1ff;
    line-height: 41px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding-left: 20px;
  }
}

/* 第二行两卡各占50% */
.row-bottom .card {
  width: 50%;
}

.switch-row {
  display: flex;
  gap: 16px;
  margin-top: 18px;
  justify-content: space-between;
}

.switch-btn-wrap {
  display: flex;
}

.switch-btn {
  padding: 8px 16px;
  border: 1px solid rgba(120, 190, 255, 0.6);
  color: #bfe2ff;
  cursor: pointer;
  font-size: 32px;
}

.switch-btn.active {
  background: rgba(60, 140, 220, 0.25);
  color: #e9f6ff;
  box-shadow: 0 0 8px rgba(60, 140, 220, 0.35) inset;
}

.years-row {
  display: flex;
  margin-top: 14px;
  background: rgba(165, 203, 255, 0.1);
}

.year-item {
  padding: 8px 14px;
  color: #a8d7ff;
  cursor: pointer;
  font-size: 30px;
}

.year-item.current {
  background: rgba(60, 140, 220, 0.25);
  color: #eaffff;
}

.chart {
  position: relative;
  margin-top: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  flex: 1;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}
</style>
