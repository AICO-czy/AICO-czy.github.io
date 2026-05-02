<template>
  <div class="hub-content column">
    <div class="hub-content-title">
    </div>
    <titleBox title="项目规划投资及产值进度" />
    <v-chart :option="option1" autoresize class="full-width col" />
  </div>
</template>

<script setup lang="ts">
import titleBox from '../titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

//横向柱状图
const option1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    textStyle: {
      fontSize: 30,
      fontFamily: 'AlibabaPuHuiTiRegular',
    },
    formatter: '{b}<br/>{a0}: {c0} 亿元<br/>{a1}: {c1} 亿元'
  },
  legend: {
    data: ['规划投资（亿元）', '完成投资（亿元）'],
    top: '3%',
    left: '30%',
    itemGap: 50,
    icon: 'rect',
    itemWidth: 30, // 图例图形宽度
    itemHeight: 20, // 图例图形高度
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    top: '10%',
    bottom: '7%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLabel: {
      color: '#A4AAB6',
      fontSize: 34,
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  yAxis: {
    type: 'category',
    name: '单位:亿元',
    nameLocation: 'start',
    nameGap: 20,
    nameTextStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [-10, 200, 0, 0],
    },
    data: [
      '鸿兆商贸物流园区',
      '双滦客运枢纽',
      '虎什哈客运站',
      '双滦物流云仓',
      '平泉百步兴物流园区',
      '兴隆汇丰物流园二期工程项目',
      '乡镇综合运输服务站',
      '兴隆大宗商品仓储配送基地',
    ],
    axisLine: {
      lineStyle: {
        width: 2,
        color: "#82909D"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#AEB8C0',
      fontSize: 34,
    }
  },
  series: [
    {
      name: '规划投资（亿元）',
      type: 'bar',
      barWidth: 20,
      barGap: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#A0F9FF'
          },
          {
            offset: 0.5,
            color: '#4599ED'
          },
          {
            offset: 1,
            color: 'rgba(51,103,154,0)'
          }
        ], false)
      },
      data: [5, 3, 6, 4, 8, 3, 4, 5]
    },
    {
      name: '完成投资（亿元）',
      type: 'bar',
      barWidth: 20,
      barGap: '20%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: '#C1C6CF'
          },
          {
            offset: 0.5,
            color: '#A4AAB6'
          },
          {
            offset: 1,
            color: 'rgba(141,147,158,0)'
          }
        ], false)
      },
      data: [3, 2, 4, 3, 10, 2, 3, 4]
    }
  ]
}
</script>

<style scoped lang="scss">
.hub-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  position: relative;
}

.hub-content-title {
  width: 451px;
  height: 58px;
  background-image: url('assets/image/sector/公路运输枢纽工程指标.png');
  background-size: 100% 100%;
  position: absolute;
  top: -65px;
}
</style>
