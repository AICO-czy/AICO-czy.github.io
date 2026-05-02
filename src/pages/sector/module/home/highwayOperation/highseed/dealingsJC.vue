<!-- 京承往来分析 -->
<template>
  <q-dialog seamless v-model="dealingsJCStore.isDialogVisible">
    <div class="dialog-content">
      <div class="dialog-content-chart-bg">
        <div class="content-close cursor-pointer" @click="handleClose"></div>
        <div class="fit column">
          <item-title title="今日交通量小时变化趋势" />
          <v-chart autoresize :option="option1" class="col full-width" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts" name="dealingsJC">
import { ref, onMounted, watch } from 'vue'
import { useBaiseInfoDialogStore, useHighseedStore, useDealingsJCStore } from './store/index'
import ItemTitle from './components/itemTitle.vue'
import * as echarts from 'echarts'
const highseedStore = useHighseedStore()

const dealingsJCStore = useDealingsJCStore()

const handleClose = () => {
  dealingsJCStore.closeDialog()
  highseedStore.openDialog()
}

const option1 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: function (params) {
      let html = '';
      params.forEach(item => {
        if (item.seriesName === '交通量') {
          html += `${item.name}：${item.value} 辆<br/>`;
        } else {
          html += `${item.seriesName}：${item.value}%<br/>`;
        }
      });
      return html;
    }
  },
  legend: {
    data: ['小客车', '大客车'],
    left: 'center',
    top: '20px',
    itemGap: 80,
    textStyle: {
      color: "#C6CECF",
      fontSize: 30,
    }
  },
  xAxis: {
    type: 'category',
    data: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'], // 补充 10/02 保证日期连续
    axisLine: {
      lineStyle: {
        color: '#666'
      }
    },
    axisLabel: {
      textStyle: {
        color: "#AEC1C8",
        fontSize: 30,
      },
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:辆',
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisLabel: {
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)"
        }
      }
    }
  ],
  series: [
    {
      name: '小客车',
      type: 'bar',
      barGap: '50%',
      data: [120, 100, 140, 110, 130, 150, 130, 120, 110], // 模拟交通量数据
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(160, 249, 255, 1)',
          },
          {
            offset: 0.5,
            color: 'rgba(69, 153, 237, 1)',
          },
          {
            offset: 1,
            color: 'rgba(51, 103, 154, 0)',
          },
        ])
      },
      barWidth: '25px'
    },
    {
      name: '大客车',
      type: 'bar',
      barGap: '50%',
      data: [100, 120, 160, 90, 120, 140, 150, 110, 120], // 模拟交通量数据
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(193, 198, 207, 1)',
          },
          {
            offset: 0.5,
            color: 'rgba(164, 170, 182, 1)',
          },
          {
            offset: 1,
            color: 'rgba(141, 147, 158, 0)',
          },
        ])
      },
      barWidth: '25px'
    }
  ],
  grid: {
    left: '3%',
    right: '3%',
    bottom: '8%',
    containLabel: true
  },
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2429px !important;
  overflow: none !important;
  min-height: 630px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 2429px;
  height: 630px;
  background: url("./images/切图 389.png") no-repeat 100%/100%;
  position: fixed;
  right: 50%;
  transform: translateX(50%);
  bottom: 150px;
  padding: 55px 60px 55px 60px;
  box-sizing: border-box;
}

.dialog-content-chart-bg {
  background: url("./images/切图 390.png") no-repeat 100%/100%;
  width: 2305px;
  height: 511px;
  padding: 20px;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 80px;
}
</style>
