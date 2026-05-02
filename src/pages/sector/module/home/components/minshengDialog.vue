<!-- 民生工程弹窗 -->
<template>
  <q-dialog v-model="dialog" seamless>
    <div class="cont">
      <!-- 关闭按钮 -->
      <div class="chat-close" @click="close"></div>
      <!-- 标题 -->
      <div class="chat-title">民生工程</div>
      <div class="content">
        <div class="cont-tit">
          <!-- 标签切换 -->
          <div class="tab-container">
            <div
              class="tab-item"
              :class="{ active: activeTab === 'total' }"
              @click="switchTab('total')"
            >
              总专项
            </div>
            <div
              class="tab-item"
              :class="{ active: activeTab === 'sub' }"
              @click="switchTab('sub')"
            >
              分列专项
            </div>
          </div>

          <!-- 年份选择器 -->
          <div class="year-selector">
            <div
              v-for="year in years"
              :key="year"
              class="year-item"
              :class="{ current: currentYear === year }"
              @click="selectYear(year)"
            >
              {{ year }}
            </div>
          </div>
        </div>
        <!-- 图表容器 -->
        <div class="chart-container">
          <div ref="chartRef" class="chart-canvas"></div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import * as echarts from 'echarts'
import {cancelGet} from "src/utils/httpRequest";

const dialog = ref(false);
const $emit = defineEmits(['closeEve'])

const open = () => { dialog.value = true };
const close = () => {
  dialog.value = false
  $emit('closeEve')
};

const props = withDefaults(defineProps<{
  period: string
}>(), {
  period: '十四五'
})

// 标签状态
const activeTab = ref<'total' | 'sub'>('sub')

// 年份选择
const years = [2021, 2022, 2023, 2024, 2025]
const currentYear = ref(2025)

// 定义数据类型
interface ChartItem {
  generalName: string
  plannedInvestment: number
  completeInvestment: number
  completionRatio: number
  desc: string
}

type YearData = Record<number, ChartItem[]>

// 数据配置
const chartData: Record<'total' | 'sub', YearData> = {
  total: {
    2021: [
      { generalName: '四好农村路提升工程', plannedInvestment: 85000, completeInvestment: 100000, completionRatio: 118, desc: '全市建设改造农村公路950公里' },
      { generalName: '中心城区道路更新改造', plannedInvestment: 85000, completeInvestment: 90000, completionRatio: 100, desc: '对安远路进行道路更新改造' }
    ],
    2022: [
      { generalName: '农村公路建设', plannedInvestment: 90000, completeInvestment: 95000, completionRatio: 106, desc: '新建农村公路800公里' },
      { generalName: '城市道路改造', plannedInvestment: 80000, completeInvestment: 82000, completionRatio: 103, desc: '改造城市主干道' }
    ],
    2023: [
      { generalName: '乡村道路提升', plannedInvestment: 95000, completeInvestment: 98000, completionRatio: 103, desc: '提升乡村道路质量' },
      { generalName: '城区道路维护', plannedInvestment: 85000, completeInvestment: 87000, completionRatio: 102, desc: '城区道路日常维护' }
    ],
    2024: [
      { generalName: '农村路网完善', plannedInvestment: 100000, completeInvestment: 105000, completionRatio: 105, desc: '完善农村路网结构' },
      { generalName: '城市道路升级', plannedInvestment: 90000, completeInvestment: 92000, completionRatio: 102, desc: '城市道路技术升级' }
    ],
    2025: [
      { generalName: '综合交通建设', plannedInvestment: 110000, completeInvestment: 115000, completionRatio: 105, desc: '综合交通体系建设' },
      { generalName: '智慧道路建设', plannedInvestment: 95000, completeInvestment: 98000, completionRatio: 103, desc: '智慧交通道路建设' }
    ]
  },
  sub: {
    2021: [
      { generalName: '四好农村路提升工程(省定土建)', plannedInvestment: 85000, completeInvestment: 100000, completionRatio: 118, desc: '全市建设改造农村公路950公里' },
      { generalName: '中心城区道路更新改造提升工程', plannedInvestment: 85000, completeInvestment: 90000, completionRatio: 100, desc: '对安远路进行道路更新改造' }
    ],
    2022: [
      { generalName: '农村公路建设(省定)', plannedInvestment: 90000, completeInvestment: 95000, completionRatio: 106, desc: '新建农村公路800公里' },
      { generalName: '城市道路改造工程', plannedInvestment: 80000, completeInvestment: 82000, completionRatio: 103, desc: '改造城市主干道' }
    ],
    2023: [
      { generalName: '乡村道路提升工程', plannedInvestment: 95000, completeInvestment: 98000, completionRatio: 103, desc: '提升乡村道路质量' },
      { generalName: '城区道路维护工程', plannedInvestment: 85000, completeInvestment: 87000, completionRatio: 102, desc: '城区道路日常维护' }
    ],
    2024: [
      { generalName: '农村路网完善工程', plannedInvestment: 100000, completeInvestment: 105000, completionRatio: 105, desc: '完善农村路网结构' },
      { generalName: '城市道路升级工程', plannedInvestment: 90000, completeInvestment: 92000, completionRatio: 102, desc: '城市道路技术升级' }
    ],
    2025: [
      { generalName: '综合交通建设工程', plannedInvestment: 110000, completeInvestment: 115000, completionRatio: 105, desc: '综合交通体系建设' },
      { generalName: '智慧道路建设工程', plannedInvestment: 95000, completeInvestment: 98000, completionRatio: 103, desc: '智慧交通道路建设' }
    ]
  }
}

onMounted(() => {
  getData()
})

const getData = async () => {
  const res = await cancelGet(
    '/publicNetworkApi/gl/project/civilEngineering/get-stat-overview',
    {
      year: currentYear.value,
      period: props.period
    }
  )
  console.log(res)
  if (res.data) {
    console.log(JSON.parse(JSON.stringify(res.data)))
  }
}

// 当前数据
const currentData = computed(() => {
  return chartData[activeTab.value][currentYear.value] || []
})

// 图表相关
const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

/**
 * @description 切换标签 会重新请求数据 并重新渲染图表
 * @param tab 标签
 */
const switchTab = (tab: 'total' | 'sub') => {
  if (activeTab.value === tab) return
  activeTab.value = tab
  nextTick(() => {
    renderChart()
  })
}

/**
 * @description 选择年份 会重新请求数据 并重新渲染图表
 * @param year 年份
 */
const selectYear = (year: number) => {
  if (currentYear.value === year) return
  currentYear.value = year
  nextTick(() => {
    renderChart()
  })
}

// 构建图表配置
function buildOption() {
  const data = currentData.value
  const names = data.map(item => item.generalName)
  const plans = data.map(item => item.plannedInvestment)
  const dones = data.map(item => item.completeInvestment)
  const ratios = data.map(item => item.completionRatio)
  const descriptions = data.map(item => item.desc)

  return {
    grid: {
      left: 80,
      right: 80,
      top: 80,
      bottom: 10,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6,19,33,0.9)',
      borderColor: 'rgba(120,190,255,.35)',
      textStyle: { color: '#D7EDFF' },
      formatter: function(params: any) {
        const dataIndex = params[0].dataIndex
        const item = data[dataIndex]
        if (!item) return ''
        return `
          <div style="padding: 8px;">
            <div style="margin-bottom: 8px; font-weight: bold;">${item.generalName}</div>
            <div style="margin-bottom: 4px;">${item.desc}</div>
            <div style="margin-bottom: 4px;">年度计划投资: ${item.plannedInvestment}万元</div>
            <div style="margin-bottom: 4px;">年度完成投资: ${item.completeInvestment}万元</div>
            <div style="margin-bottom: 4px;">完成比例: ${item.completionRatio}%</div>
          </div>
        `
      }
    },
    legend: {
      data: ['年度计划投资', '年度完成投资额', '全年任务进度完成比例(%)'],
      top: 20,
      left: 'center',
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {
        color: '#C9DBEA',
        fontSize: 34
      },
      itemGap: 30
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
              axisLabel: {
          show: true,
          backgroundColor: 'rgba(140, 178, 231, .2)',
          color: '#C9DBEA',
          fontSize: '36px',
          fontWeight: '400',
          lineHeight: '20px',
          textAlign: 'center',
          padding: [40,80,40,80],
          borderRadius: 4,
          formatter: function (value: any, index: any) {
            const desc = descriptions[index]
            return `{title|${value}}\n{desc|${desc}}`
          },
          rich: {
            title: {
              color: '#C9DBEA',
              fontSize: 36,
              fontWeight: 'bold',
              lineHeight: 60,
              align: 'center'
            },
            desc: {
              color: '#2FE3FF',
              fontSize: 30,
              lineHeight: 32,
              align: 'center',
              borderWidth: 1,
              borderRadius: 3,
              padding: [4, 8, 4, 8]
            }
          }
        }
    },
    yAxis: [
      {
        type: 'value',
        generalName: '单位:万元',
        nameTextStyle: {
          color: '#86C8FF',
          padding: [0, 0, 20, 20],
          fontSize: 30
        },
        splitLine: {
          lineStyle: { color: 'rgba(165,203,255,.25)' }
        },
        axisLine: { show: false },
        axisLabel: { color: '#CFE8FF', fontSize: 24 },
        max: 120000,
      },
      {
        type: 'value',
        generalName: '单位: %',
        nameTextStyle: {
          color: '#86C8FF',
          padding: [0, 0, 0, 20],
          fontSize: 30
        },
        splitLine: { show: false },
        axisLine: { show: false },
        axisLabel: { color: '#CFE8FF' },
        max: 120
      }
    ],
    series: [
      {
        generalName: '年度计划投资',
        type: 'bar',
        yAxisIndex: 0,
        barWidth: 26,
        barGap: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#4A90E2' },
            { offset: 1, color: '#357ABD' }
          ]),
          borderRadius: [4, 4, 0, 0],
        },
        data: plans
      },
      {
        generalName: '年度完成投资额',
        type: 'bar',
        yAxisIndex: 0,
        barWidth: 26,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#7FB3E3' },
            { offset: 1, color: '#5A9BD6' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        data: dones
      },
    ]
  }
}

// 渲染图表
function renderChart() {
  if (!chartRef.value) return
  if (chart) chart.dispose()

  chart = echarts.init(chartRef.value, undefined, {
    renderer: 'canvas'
  })

  chart.setOption(buildOption())
}

// 生命周期
onMounted(async () => {
  await nextTick()
  renderChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (chart) chart.dispose()
  chart = null
})

function resizeChart() {
  if (chart) chart.resize()
}

// 切换弹窗内容按钮
const switchBtn = () => {
  // console.log('switchBtn')
}

// 当对话框打开时渲染
watch(dialog, (v) => {
  if (v) nextTick(renderChart)
})

defineExpose({ open, close })
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 2037px !important;
  min-height: 1136px !important;
}
.q-dialog__inner > div {
  overflow: visible !important;
}

.cont {
  width: 2037px;
  height: 1136px;
  position: relative;
  z-index: 9999;
  padding: 120px 90px 20px 90px;
  box-sizing: border-box;
  background: rgba(2, 24, 40, 0.85);
  border-radius: 8px;
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  background: url('assets/image/lefty/jt-bg.png') no-repeat 60% / 98%;
  position: absolute;
  top: 438px;
  left: 1857px;
  .chat-close {
    width: 42px;
    height: 42px;
    background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
    position: absolute;
    right: 75px;
    top: 80px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1) rotate(90deg);
      filter: brightness(1.2);
    }

    &:active {
      transform: scale(0.95);
      transition: all 0.1s ease;
    }
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
    transform: skewX(-10deg);
  }

  .switch-b {
    width: 66px;
    height: 64px;
    background: url('assets/image/lefty/diachange.png') no-repeat 100% / 100%;
    position: absolute;
    right: 160px;
    top: 75px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1) rotate(180deg);
      filter: brightness(1.2);
    }

    &:active {
      transform: scale(0.95);
      transition: all 0.1s ease;
    }
  }
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background: url('assets/image/lefty/img142.png') no-repeat 50% / 98%;
  padding: 60px 60px 80px 60px;
  height: 100%;
  .cont-tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

// 标签切换样式
.tab-container {
  display: flex;
  margin-bottom: 30px;
  margin-top: 20px;

  .tab-item {
    width: 291px;
    height: 70px;
    padding: 12px 24px;
    background: rgba(120, 190, 255, 0.1);
    color: #bfe2ff;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.3s ease;
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 400;
    font-size: 36px;
    color: #99BDDF;
    line-height: 53px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: rgba(120, 190, 255, 0.2);
      border-color: rgba(120, 190, 255, 0.5);
      transform: translateY(-2px);
    }

    &.active {
      background: rgba(120, 190, 255, 0.3);
      border-color: rgba(120, 190, 255, 0.8);
      color: #ffffff;
      box-shadow: 0 0 15px rgba(120, 190, 255, 0.3);
    }
  }
}

// 年份选择器样式
.year-selector {
  display: flex;
  margin-top: 100px;

  .year-item {
    width: 175px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(165, 203, 255, 0.1);
    color: #a8d7ff;
    cursor: pointer;
    font-size: 35px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(165, 203, 255, 0.2);
      border-color: rgba(165, 203, 255, 0.4);
      transform: translateY(-1px);
    }

    &.current {
      background: rgba(120, 190, 255, 0.3);
      border-color: rgba(120, 190, 255, 0.8);
      color: #ffffff;
      box-shadow: 0 0 10px rgba(120, 190, 255, 0.3);
    }
  }
}

// 图表容器样式
.chart-container {
  flex: 1;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  margin-top: 36px;
  width: 100%;
  .chart-canvas {
    width: 100%;
    height: 100%;
    min-height: 600px;
  }
}
</style>
