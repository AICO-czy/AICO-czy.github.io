<template>
  <div class="expressway-construction column justify-between">
    <div class="expressway-construction-content-top-title">
    </div>
    <div class="col column expressway-construction-content-top">
      <titleBox title="项目规划投资及产值进度" />
      <v-chart :option="option1" class="full-width col" />
    </div>
    <div class="col column expressway-construction-content-bottom">
      <titleBox title="2025年承克高速投资情况" />
      <div class="row expressway-construction-content-select">
        <div class="select-item" :class="selectActive == 'month' ? 'select-item-active' : ''"
          @click="selectItemClick('month')">月投资</div>
        <div class="select-item" :class="selectActive == 'total' ? 'select-item-active' : ''"
          @click="selectItemClick('total')">累计投资</div>
      </div>
      <v-chart :option="option2" class="full-width col" />
    </div>
  </div>
</template>

<script setup lang="ts">
import titleBox from '../titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const selectActive = ref('month')

const selectItemClick = (type: string) => {
  selectActive.value = type
}

//柱状图
const option1 = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      fontSize: 30,
      fontFamily: 'AlibabaPuHuiTiRegular',
    },
  },
  legend: {
    data: ['规划投资（亿元）', '完成投资（亿元）'],
    align: 'left',
    itemGap: 50,
    right: '30%',
    top: '3%',
    y: '10%',
    icon: 'rect',
    itemWidth: 15, // 图例图形宽度
    itemHeight: 15, // 图例图形高度
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    }
  },
  grid: {
    top: '15%',
    left: '4%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['承平高速', '承克高速', '承德南互通', '全山岭互通', '茅荆坝互通'],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#AEC1C8",
        fontSize: 32
      }
    },
    axisTick: {
      inside: false,
      length: 8,
      lineStyle: {
        color: "#8c8c8c",
      }
    },
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    }
  }],
  yAxis: [{
    type: 'value',
    name: '单位：亿元',
    nameLocation: 'end',
    nameGap: 20,
    nameTextStyle: {
      color: '#AEC1C8',
      fontSize: 24,
      padding: [0, 0, 0, 0],
      // lineHeight: 50
    },
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 32
      }
    },
    axisTick: {
      lineStyle: {
        color: "#8c8c8c",
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "#82909D"
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(130, 144, 157, 0.34)"
      }
    },
  }],
  series: [
    {
      name: '规划投资（亿元）',
      type: 'bar',
      barWidth: 21,
      barGap: '40%',
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
          ], false),
        }
      },
      data: [80, 82, 85, 95, 70]
    },
    {
      name: '完成投资（亿元）',
      type: 'bar',
      barWidth: 21,
      barGap: '40%',
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
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
          ], false),
        }
      },
      data: [100, 110, 85, 55, 88]
    }]
};
//折线图
const option2 = {
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontSize: 30,
      fontFamily: 'AlibabaPuHuiTiRegular',
    },
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    show: false
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '15%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: "#AEC1C8"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30
        }
      },
      axisTick: {
        show: false
      },
      data: ['2025/02', '2025/03', '2025/04', '2025/05', '2025/06', '2025/07', '2025/08']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '单位：亿元',
      nameLocation: 'end',
      nameGap: 20,
      nameTextStyle: {
        color: '#AEC1C8',
        fontSize: 28,
        padding: [0, 0, 0, 0],
        // lineHeight: 50
      },
      axisLine: {
        show: false,
        lineStyle: {
          width: 2,
          color: "#82909D"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)"
        }
      },
    }
  ],
  series: [
    {
      name: '完成投资 (万元)',
      type: 'line',
      //  showAllSymbol: false,
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      // 确保数据点可见（默认可能只在鼠标hover时显示）
      showSymbol: true, // 强制显示所有数据点
      color: ['#CE855C'],
      lineStyle: {
        width: 6 // 设置线条宽度
      },
      areaStyle: {
        normal: {
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255,101,58,0.2)'
          },
          {
            offset: 1,
            color: 'rgba(255,101,58,0)'
          }
          ], false),
          shadowColor: 'rgba(118,168,248, 0.9)', // 阴影颜色
          shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      data: [78, 75, 40, 60, 76, 75, 18]
    }
  ]
}

</script>

<style scoped lang="scss">
.expressway-construction {
  width: 100%;
  height: 100%;
  position: relative;
}

.expressway-construction-content-top-title {
  width: 451px;
  height: 58px;
  background-image: url('assets/image/sector/高速公路建设项目分析.png');
  background-size: 100% 100%;
  position: absolute;
  top: -65px;
}

.expressway-construction-content-top {
  width: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 11px;
}

.expressway-construction-content-bottom {
  width: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-top: 11px;
  position: relative;
}

.expressway-construction-content-select {
  position: absolute;
  top: 20px;
  right: 54px;
}

.select-item {
  width: 202px;
  height: 60px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 6px 0px 0px 6px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #E3F1FF;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  z-index: 999;
  -webkit-text-fill-color: #E3F1FF !important;
}

.select-item-active {
  width: 202px;
  height: 60px;
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 6px 6px 0px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #E3F1FF;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  z-index: 999;
  -webkit-text-fill-color: #E3F1FF !important;

}
</style>
