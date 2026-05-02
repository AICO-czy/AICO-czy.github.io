<template>
  <div class="project-overview">
    <!-- 标题区域 -->
    <title-box>
      在建项目总览
    </title-box>
    <!-- 表格区域 -->
    <div class="table-section">
      <div class="table-wrapper" ref="tableWrapperRef">
        <div class="content-frame" ref="contentRef">
          <!-- 固定表头 -->
          <table class="project-table header-table" ref="headerTableRef" :style="{ width: wrapperWidthPx + 'px' }">
            <colgroup>
              <col :style="{ width: col1 + 'px' }" />
              <col :style="{ width: col2 + 'px' }" />
              <col :style="{ width: col3 + 'px' }" />
              <col :style="{ width: col4 + 'px' }" />
              <col :style="{ width: col5 + 'px' }" />
              <col :style="{ width: col6 + 'px' }" />
              <col :style="{ width: col7 + 'px' }" />
            </colgroup>
            <thead>
              <tr>
                <th>序号</th>
                <th>县区</th>
                <th>项目名称</th>
                <th>类型</th>
                <th>里程/面积</th>
                <th>开工时间</th>
                <th>计划完工时间</th>
              </tr>
            </thead>
          </table>

          <!-- 可视窗口：只在此容器内滚动渲染体，避免越过表头显示 -->
          <div class="viewport" ref="viewportRef"
            :style="{ height: viewportHeightPx + 'px', '--row-height': rowHeightPx + 'px' }">
            <!-- 滚动体：渲染两份数据用于无缝循环 -->
            <div class="scroll-body" :style="{ transform: `translate3d(0, ${-scrollOffsetPx}px, 0)` }"
              ref="scrollBodyRef">
              <table class="project-table" :style="{ width: wrapperWidthPx + 'px' }">
                <colgroup>
                  <col :style="{ width: col1 + 'px' }" />
                  <col :style="{ width: col2 + 'px' }" />
                  <col :style="{ width: col3 + 'px' }" />
                  <col :style="{ width: col4 + 'px' }" />
                  <col :style="{ width: col5 + 'px' }" />
                  <col :style="{ width: col6 + 'px' }" />
                  <col :style="{ width: col7 + 'px' }" />
                </colgroup>
                <tbody>
                  <tr v-for="(row, idx) in renderRows" :key="`a-` + idx">
                    <td class="center">{{ row.index }}</td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.areaName }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.projectName }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.projectType }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.constructionScale ? row.constructionScale : '-' }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.startDate ? row.startDate : '-' }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.endDate ? row.endDate : '-' }}</div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="shouldScroll" v-for="(row, idx) in renderRows" :key="`b-` + idx">
                    <td class="center">{{ row.index }}</td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.areaName }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.projectName }}</div>
                      </div>
                    </td>
                    <td>
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.projectType }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.constructionScale ? row.constructionScale : '-' }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.startDate ? row.startDate : '-' }}</div>
                      </div>
                    </td>
                    <td class="center">
                      <div class="cell-marquee" v-auto-marquee>
                        <div class="cell-content">{{ row.endDate ? row.endDate : '-' }}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部交互元素区域 -->
    <div class="bottom-section">
      <div class="title df" :class="active == 1 ? 'title_active' : ''" @click="handleCheck(1)">
        <div class="img_icon"></div>
        <div class="title-text">
          "交通强市"
        </div>
      </div>

      <div class="title df" :class="active == 2 ? 'title_active' : ''" @click="handleCheck(2)">
        <div class="img_ms"></div>
        <div class="title-text">
          "民生工程"
        </div>
      </div>
    </div>

    <!-- 交通信息弹窗 -->
    <jiaotong-dialog ref="jiaotongDialogRef" @closeEve="handleCloseEve" />

    <!-- 民生工程弹窗 -->
    <minsheng-dialog ref="minshengDialogRef" @closeEve="handleCloseEve" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch, nextTick } from 'vue'
import titleBox from './titleBox.vue'
import jiaotongDialog from './jiaotongDialog.vue'
import minshengDialog from './minshengDialog.vue'
import { cancelGet, cancelFun } from "src/utils/httpRequest";

const $emit = defineEmits(['check', 'closeJt'])

// 交通强市弹窗
const jiaotongDialogRef = ref<InstanceType<typeof jiaotongDialog> | null>(null)

// 民生工程弹窗
const minshengDialogRef = ref<InstanceType<typeof minshengDialog> | null>(null)

const props = defineProps({
  period: {
    typeof: String,
    default: "十四五"
  }
})
type Row = {
  index: number
  district: string
  project: string
  type: string
  scale: string
  startAt: string
  endAt: string
}

// 示例数据，你可替换为接口返回
const rows = ref<any[]>([
  {
    id: 1,
    projectName: "承平高速",
    areaName: "兴隆",
    projectType: "高速公路",
    constructionScale: 59.179,
    startDate: "2021年04月",
    endDate: "2024年12月",
    index: 1
  },
  {
    id: 2,
    projectName: "承克高速",
    areaName: "围场",
    projectType: "高速公路",
    constructionScale: 106.33,
    startDate: "2024年09月",
    endDate: "",
    index: 2
  },
  {
    id: 3,
    projectName: "京承高速承德南互通",
    areaName: "双桥",
    projectType: "互通",
    constructionScale: 2,
    startDate: "2022年08月",
    endDate: "2023年12月",
    index: 3
  },
  {
    id: 4,
    projectName: "金山岭互通",
    areaName: "滦平",
    projectType: "互通",
    constructionScale: null,
    startDate: "2024年06月",
    endDate: "",
    index: 4
  },
  {
    id: 6,
    projectName: "省道S214塞罕坝至长山峪公路国道112至国道101段改建工程",
    areaName: "滦平",
    projectType: "普通干线公路",
    constructionScale: 21.7,
    startDate: "2016年05月",
    endDate: "2021年10月",
    index: 5
  },
  {
    id: 8,
    projectName: "国道G233棋盘山至围场北段改建工程",
    areaName: "围场",
    projectType: "普通干线公路",
    constructionScale: 19.628,
    startDate: "2020年05月",
    endDate: "2022年10月",
    index: 6
  },
  {
    id: 9,
    projectName: "省道S209线赤峰至曹妃甸公路下板城至石灰窑段改建工程",
    areaName: "承德县",
    projectType: "普通干线公路",
    constructionScale: 26.3,
    startDate: "2015年03月",
    endDate: "2023年10月",
    index: 7
  },
  {
    id: 10,
    projectName: "国道G112线西八品叶至二道河子、庙岭至黄门子、南岭至三岔口段改建工程",
    areaName: "兴隆",
    projectType: "普通干线公路",
    constructionScale: 15.4,
    startDate: "2019年03月",
    endDate: "2022年10月",
    index: 8
  },
  {
    id: 11,
    projectName: "国道G101古北口（京冀界）至偏桥段改建工程",
    areaName: "滦平",
    projectType: "普通干线公路",
    constructionScale: 16.7,
    startDate: "2020年04月",
    endDate: "2022年10月",
    index: 9
  },
  {
    id: 12,
    projectName: "国道G508峪耳崖至大地段改建工程",
    areaName: "宽城",
    projectType: "普通干线公路",
    constructionScale: 12,
    startDate: "2020年05月",
    endDate: "2022年10月",
    index: 10
  },
  {
    id: 13,
    projectName: "省道S214塞长线半截塔至白虎沟段改建工程",
    areaName: "围场、隆化",
    projectType: "普通干线公路",
    constructionScale: 44.3,
    startDate: "2022年07月",
    endDate: "2024年10月",
    index: 11
  },
  {
    id: 14,
    projectName: "国道G112线承德八里庄至红石砬段改建工程",
    areaName: "双滦、滦平",
    projectType: "普通干线公路",
    constructionScale: 13.7,
    startDate: "2017年03月",
    endDate: "2026年",
    index: 12
  },
  {
    "id": 15,
    "projectName": "省道S504西地至双峰寺公路（原省道京承线）西地至狮子园",
    "areaName": "双滦",
    "projectType": "普通干线公路",
    "constructionScale": 22.4,
    "startDate": "2018年11月",
    "endDate": "2026年",
    "index": 13
  }
]
)

const renderRows = computed(() => rows.value)

const tableWrapperRef = ref<HTMLDivElement | null>(null)
const contentRef = ref<HTMLDivElement | null>(null)
const headerTableRef = ref<HTMLTableElement | null>(null)
const viewportRef = ref<HTMLDivElement | null>(null)
const scrollBodyRef = ref<HTMLDivElement | null>(null)

const visibleRowCount = 2 // 可视区显示的行数

// 列宽（像素）和总宽
const wrapperWidthPx = ref(0)
const col1 = ref(100)
const col2 = ref(180)
const col3 = ref(0) // 动态剩余
const col4 = ref(220)
const col5 = ref(220)
const col6 = ref(220)
const col7 = ref(260)

// 是否需要滚动（数据条数大于可视行数）
const shouldScroll = computed(() => renderRows.value.length > visibleRowCount)

// 连续上滚：逐帧累加，超过单份高度时减去单份高度，避免闪跳
const scrollSpeedPxPerSec = 30
let rafId: number | null = null
let lastTs = 0
const scrollOffsetPx = ref(0)
let singleListHeight = 0
const viewportHeightPx = ref(0)
const rowHeightPx = ref(0)

const rafLoop = (ts: number) => {
  if (!shouldScroll.value) return // 不需要滚动时直接返回
  if (!lastTs) lastTs = ts
  const delta = ts - lastTs
  lastTs = ts
  const deltaPx = (delta / 1000) * scrollSpeedPxPerSec
  let next = scrollOffsetPx.value + deltaPx
  if (singleListHeight > 0 && next >= singleListHeight) {
    next -= singleListHeight * Math.floor(next / singleListHeight)
  }
  scrollOffsetPx.value = next
  rafId = requestAnimationFrame(rafLoop)
}

const computeColumns = () => {
  const fixedSum = col1.value + col2.value + col4.value + col5.value + col6.value + col7.value
  const w = contentRef.value?.clientWidth || 0
  wrapperWidthPx.value = w
  const rest = Math.max(0, w - fixedSum)
  col3.value = rest
}

const measure = () => {
  // 视窗 = 内层内容框高度 - 表头高度
  const wrapH = contentRef.value?.clientHeight || 0
  const headH = headerTableRef.value?.clientHeight || 0
  viewportHeightPx.value = Math.max(0, wrapH - 122)
  // 行高 = 视窗高度 / 可视行数
  rowHeightPx.value = visibleRowCount > 0 ? viewportHeightPx.value / visibleRowCount : 0
  // 单份列表总高度 = 行高 * 数据行数
  singleListHeight = rowHeightPx.value * renderRows.value.length
  // 重置偏移，防止尺寸变化造成闪跳
  scrollOffsetPx.value = 0
  // 列宽
  computeColumns()
}

const start = () => {
  stop()
  lastTs = 0
  rafId = requestAnimationFrame(rafLoop)
}

const stop = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
}
//获取在建项目列表
const getStatOverview = async () => {
  const res = await cancelGet(
    '/hbcdToccApi/gl/project/annualSituations/get-stat-overview',
    {
      period: props.period
    }
  )
  if (res.data.data) {
    rows.value = res.data.data.allList
  }
}

onMounted(async () => {
  await nextTick()
  measure()
  start()
  window.addEventListener('resize', measure)
  getStatOverview()
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', measure)
})

watch(rows, async () => {
  await nextTick()
  measure()
})

watch(() => props.period, () => {
  getStatOverview()
}, { deep: true })
// 单元格文字超出宽度时左右滚动指令
const autoMarquee = {
  mounted(el: HTMLElement) {
    const content = el.querySelector('.cell-content') as HTMLElement | null
    if (!content) return
    const apply = () => {
      const wrapWidth = el.clientWidth
      const contentWidth = content.scrollWidth
      if (contentWidth > wrapWidth) {
        const distance = contentWidth - wrapWidth
        const duration = Math.max(6, Math.min(20, distance / 20))
        content.style.setProperty('--marquee-distance', `${distance}px`)
        content.style.setProperty('--marquee-duration', `${duration}s`)
        content.classList.add('marquee-anim')
      } else {
        content.classList.remove('marquee-anim')
        content.style.removeProperty('--marquee-distance')
        content.style.removeProperty('--marquee-duration')
      }
    }
    apply()
    const ro = new ResizeObserver(() => apply())
    ro.observe(el)
  }
}

const vAutoMarquee = autoMarquee

//激活类型
const active = ref(0)

function handleCheck(type: number) {
  active.value = type
  if (type === 1) {
    jiaotongDialogRef.value?.open()
  } else {
    minshengDialogRef.value?.open()
  }
  $emit('check', type)
  getStatOverview()
}


/**
 * @description 关闭弹窗事件 用于触发首页按钮组数据恢复
 */
const handleCloseEve = () => {
  active.value = 0
  $emit('closeJt')
}

</script>

<style scoped>
/* 保持原有自定义尺寸 */
.table-section {
  width: 1569px;
  height: 432.31px;
  background: url('assets/image/lefty/table-bg.png') no-repeat 100% / 100%;
  padding: 20px 10px;
}

/* 表格容器：表头固定，滚动体在 viewport 内 */
.table-wrapper {
  position: relative;
  height: 350.75px;
  /* 固定整体高度 */
  display: flex;
  flex-direction: column;
}

/* 内层内容框：给四周留白，避免内容撑满背景 */
.content-frame {
  width: 92%;
  height: 90%;
  margin: 0 auto;
  /* 居中 */
  padding: 8px 12px;
  box-sizing: border-box;
}

.header-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  height: 122px;
}

.viewport {
  overflow: hidden;
}

.project-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.project-table th,
.project-table td {
  padding: 8px 12px;
}

thead th {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 38px;
  color: #A3D9FF;
  line-height: 53px;
  text-align: center;
  /* 用户调整为居中 */
  font-style: normal;
  text-transform: none;
}

tbody td {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 38px;
  color: #A3D9FF;
  line-height: normal;
  text-align: center;
  vertical-align: middle;
  font-style: normal;
  text-transform: none;
  height: 100%;
  box-sizing: border-box;
}

/* 行分割线：渐变效果 */
tbody tr {
  position: relative;
  height: var(--row-height);
}

tbody tr:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(0, 180, 255, 0) 0%, rgba(0, 180, 255, 0.7) 50%, rgba(0, 180, 255, 0) 100%);
}

.center {
  text-align: center;
}

/* 滚动体：通过 transform 位移连续上滚 */
.scroll-body {
  will-change: transform;
}

/* 单元格文字溢出时左右滚动 */
.cell-marquee {
  overflow: hidden;
}

.cell-content {
  white-space: nowrap;
}

.cell-content.marquee-anim {
  display: inline-block;
  animation: marqueeX var(--marquee-duration, 8s) linear infinite alternate;
}

@keyframes marqueeX {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-1 * var(--marquee-distance, 80px)));
  }
}

.title-text {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 700;
  font-size: 53px;
  line-height: 180px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.img_icon {
  width: 179px;
  height: 172px;
  margin-right: 20px;
  margin-top: -20px;
  background: url("assets/image/lefty/jt.png") no-repeat 100%/100%;
}

.img_ms {
  width: 179px;
  height: 172px;
  margin-right: 20px;
  margin-top: -20px;
  background: url("assets/image/lefty/ms.png") no-repeat 100%/100%;
}

.title {
  width: 649px;
  height: 185px;
  padding: 0 40px;
  background: url("assets/image/lefty/check_bg.png") no-repeat 100%/100%;
}

.title_active {
  background: url("assets/image/lefty/check_active_bg.png") no-repeat 100%/100%;
}

.title_bg {
  width: 1106px;
  height: 111px;
  background: url('assets/image/lefty/title_bg.png') no-repeat 100%/100%;
}

.title_name {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 54px;
  line-height: 74px;
  letter-spacing: 2px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 114px;
}

.df {
  display: flex;
}

.aic {
  align-items: center;
}

.jcc {
  justify-content: center;
}

.jcsb {
  justify-content: space-between;
}

.jcsa {
  justify-content: space-around;
}

.fdc {
  flex-direction: column;
}

.f1 {
  flex: 1;
}

.bottom-section {
  margin-top: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
