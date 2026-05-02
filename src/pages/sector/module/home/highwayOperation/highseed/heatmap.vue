<template>
  <q-dialog seamless v-model="heatmapStore.isDialogVisible">
    <div class="traffic-heatmap-container">
      <div class="traffic-heatmap-container-bg">
        <div class="content-header flex justify-between items-center">
          <ItemTitle :title="`${currentMonth}月交通量`" />
          <div class="content-close cursor-pointer" @click="handleClose"></div>
        </div>
        <div class="header">
          <div class="controls">
            <button @click="prevMonth" class="btn" :disabled="currentMonth === 1">
              上月
            </button>
            <div class="header-month">{{ currentYear }}年 {{ currentMonth }}月</div>
            <button @click="nextMonth" class="btn" :disabled="currentMonth === 12">
              下月
            </button>
          </div>
        </div>
        <div class="heatmap-grid">
          <div v-for="day in daysInMonth" :key="day" class="day-cell" :style="{
            backgroundColor: getColor(trafficData[`${currentYear}-${padZero(currentMonth)}-${padZero(day)}`] || 0)
          }
            " @mouseenter="showTooltip($event, day, trafficData[`${currentYear} -${padZero(currentMonth)} -${padZero(day)} `] || 0)"
            @mouseleave="hideTooltip()">
            <div class="day-number">{{ day }}</div>
            <div class="weekday">{{ getWeekday(currentYear, currentMonth, day) }}</div>
          </div>
        </div>
        <!-- 颜色图例 -->
        <div class="legend">
          <div class="legend-label">交通流量</div>
          <div class="legend-item row items-center">
            <div class="legend-label">
              0
            </div>
            <div class="color-scale">
              <div v-for="i in 10" :key="i" class="color-step" :style="{ backgroundColor: getColor(i * 10) }"></div>
            </div>
            <div class="legend-label">
              1000
            </div>
          </div>
        </div>
        <!-- 提示框 -->
        <div v-if="tooltipVisible" class="tooltip" :style="{
          left: `${tooltipX}px`,
          top: `${tooltipY}px`
        }
          ">
          <div class="tooltip-date">{{ tooltipDate }}</div>
          <div class="tooltip-value">交通量: {{ tooltipValue }}</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useHeatmapStore } from './store/index'
import ItemTitle from './components/itemTitle.vue'

const heatmapStore = useHeatmapStore()

const handleClose = () => {
  heatmapStore.closeDialog()
}
// 类型定义
interface TrafficData {
  [date: string]: number; // 每个日期对应一个交通量数值
}

// 状态变量
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1); // 月份从1开始
const trafficData = ref<TrafficData>({});
const tooltipVisible = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);
const tooltipDate = ref('');
const tooltipValue = ref(0);

// 计算当月天数
const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 0).getDate();
});

// 初始化生成随机交通数据（按天统计）
const generateTrafficData = () => {
  const data: TrafficData = {};

  for (let day = 1; day <= daysInMonth.value; day++) {
    const dateStr = `${currentYear.value}-${padZero(currentMonth.value)}-${padZero(day)}`;
    const date = new Date(currentYear.value, currentMonth.value - 1, day);
    const dayOfWeek = date.getDay();

    // 模拟交通流量，周末和工作日有差异
    let baseValue = 50; // 基础值
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseValue = 30; // 周末交通量较低
    }

    // 增加随机波动
    data[dateStr] = Math.floor(baseValue + Math.random() * 50);
  }

  trafficData.value = data;
};

// 辅助函数：数字补零
const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

// 获取颜色（根据交通量值，从浅蓝到深蓝变化）
const getColor = (value: number): string => {
  // 定义颜色范围和值范围
  const minValue = 0;    // 最小值
  const maxValue = 1000;  // 最大值，可根据实际数据范围调整

  // 限制value在有效范围内
  const clampedValue = Math.max(minValue, Math.min(maxValue, value));

  // 计算当前值在范围内的比例（0到1之间）
  const ratio = (clampedValue - minValue) / (maxValue - minValue);

  // 起始颜色: rgba(230, 249, 255, 1)
  const startR = 230;
  const startG = 249;
  const startB = 255;

  // 结束颜色: rgba(0, 184, 237, 1)
  const endR = 0;
  const endG = 184;
  const endB = 237;

  // 计算过渡色的RGB值
  const r = Math.round(startR + (endR - startR) * ratio * 10);
  const g = Math.round(startG + (endG - startG) * ratio * 10);
  const b = Math.round(startB + (endB - startB) * ratio * 10);

  return `rgba(${r}, ${g}, ${b}, 1)`;
};

// 获取星期几
const getWeekday = (year: number, month: number, day: number): string => {
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const date = new Date(year, month - 1, day);
  return `周${weekdays[date.getDay()]}`;
};

// 显示提示框
const showTooltip = (
  e: MouseEvent,
  day: number,
  value: number
) => {
  tooltipVisible.value = false;
  tooltipX.value = e.pageX + 10;
  tooltipY.value = e.pageY + 10;
  tooltipDate.value = `${currentYear.value}年${currentMonth.value}月${day}日 ${getWeekday(currentYear.value, currentMonth.value, day)}`;
  tooltipValue.value = value;
};

// 隐藏提示框
const hideTooltip = () => {
  tooltipVisible.value = false;
};

// 切换月份
const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  generateTrafficData();
};

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  generateTrafficData();
};

// 初始化数据
generateTrafficData();
</script>

<style scoped>
.q-dialog__inner--minimized>div {
  max-width: 1166px !important;
  overflow: none !important;
  min-height: 980px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.traffic-heatmap-container {
  width: 1166px;
  height: 980px;
  position: fixed;
  right: 1150px;
  top: 320px;
  padding: 75px 65px 50px 65px;
  box-sizing: border-box;
  background-image: url('./images/切图 303.png');
  background-size: 100% 100%;
}

.traffic-heatmap-container-bg {
  width: 1046px;
  height: 855px;
  background-image: url('./images/切图 304.png');
  background-size: 100% 100%;
  padding: 50px;
  padding-top: 40px;
  padding-bottom: 100px;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
}

.content-title {
  width: 369px;
  height: 58px;
}

.header {
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.btn {
  background-color: rgba(27, 123, 182, 0.80);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 1px;
  text-align: center;
  transition: background-color 0.2s;
}

.btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.day-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #1e293b;
  font-weight: 600;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.day-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  transition: opacity 0.2s;
}

.day-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.day-number {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 35px;
  color: #034476;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.weekday {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 32px;
  color: rgb(94, 97, 99);
  text-align: left;
  font-style: normal;
  text-transform: none;
  opacity: 0.8;
}

.legend {
  width: 100%;
  margin-top: 20px;
  gap: 15px;
}

.legend-item {
  gap: 30px;
}

.legend-label {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #AEB8C0;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.color-scale {
  flex-grow: 1;
  height: 20px;
  display: flex;
}

.color-step {
  flex: 1;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.legend-values {
  display: flex;
  justify-content: space-between;
  width: 150px;
  color: #64748b;
  font-size: 12px;
}

.tooltip {
  position: absolute;
  background-color: rgba(15, 23, 42, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 100;
  pointer-events: none;
  min-width: 150px;
}

.tooltip-date {
  font-weight: bold;
  margin-bottom: 4px;
}

.tooltip-value {
  color: #94a3b8;
  margin-top: 4px;
}

.header-month {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  color: #A3D9FF;
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
