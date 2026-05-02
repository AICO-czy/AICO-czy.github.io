<!-- 高速公路 -->
<template>
  <div class="tab-content-1">
    <!-- 顶部信息展示 -->
    <div class="top-info">
      <div class="container-header-item" v-for="item in topInfo" :key="item.label">
        <div></div>
        <div><span>{{ item.label }}</span><span>{{ item.total }}</span></div>
      </div>
    </div>
    <!-- echarts图表 -->
    <div class="echarts-container">
      <!-- 标题组件 -->
      <div class="echarts-title">
        <titleBox title="总体完成情况" />
      </div>
      <!-- 进度条echart -->
      <div class="echarts-progress">
        <v-chart :option="option" style="height: 100px; width: 100%;" />
      </div>
      <!-- 标题 -->
      <div class="echarts-title" style="margin-top: -20px;">
        <titleBox title="项目规划投资及产值进度" />
      </div>
      <!-- 轮播 echart -->
      <div class="carousel-container">
        <q-carousel :key="carouselKey" v-model="slide" vertical transition-prev="slide-down" transition-next="slide-up"
          swipeable animated infinite :autoplay="true" control-color="white" navigation-icon="radio_button_unchecked"
          navigation padding arrows height="500px" style="background: transparent;">
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <div class="chart-wrapper">
              <v-chart :option="option1" style="height: 450px; width: 100%;" />
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <div class="chart-wrapper">
              <v-chart :option="option2" style="height: 450px; width: 100%;" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import titleBox from './titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const slide = ref('style')
const carouselKey = ref(0)

// 组件挂载后重置轮播状态
onMounted(() => {
  nextTick(() => {
    // 确保轮播组件正确初始化
    slide.value = 'style'
    // 强制重新渲染
    carouselKey.value++
  })
})

// 监听slide变化，确保轮播正常工作
watch(slide, () => {
  nextTick(() => {
    // 触发窗口resize事件，让图表重新计算尺寸
    window.dispatchEvent(new Event('resize'))
  })
})

// 组件卸载时清理
onUnmounted(() => {
  // 清理可能的定时器或事件监听
})

const topInfo = [
  {
    label: '总投资：',
    total: '75亿元'
  },
  {
    label: '路段：',
    total: '1条'
  },
  {
    label: '里程：',
    total: '123公里'
  },
  {
    label: '互通：',
    total: '1座'
  },

]

// 进度条配置
const option = {
  grid: {
    top: 80,
    left: 80,
    right: 80
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    max: 100,
  },
  yAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
  },
  graphic: [
    {
      type: 'text',
      right: 80,
      top: '0%',
      style: {
        text: '80% 60亿元',
        fontSize: 30,
        fontWeight: 'bold',
        fill: '#DAECF6',
        textAlign: 'right'
      }
    }
  ],
  series: [
    {
      name: 'XXX',
      type: 'pictorialBar',
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhNJREFUeNq0llsoLVEcxme27ZJEPLimXJI4yaMQxZOkePN0IukQdZIXOiFFSrnkQUnigTydDkleSOLxpJRc6qBc6uSE3G8P+P71zWns9phlX776tWdmrzXfrFlrffPXt19fNQUlglLwBTjBM6/L8R1YA4vg6aOb6DZmOeAbOAYzYBO8uLQJA8V8mL9gCFx+xiwIdIFbMMhfFaWBFvALLKiYRYNuMAB2Nc9UD4I5yv9yuDSK4khavTASjYBD0G5lpoM+voYLzXvNglNQ4c6sBvwEJ5rvNArKQKTZLATkuptUH6gHNJvNKsGk5h8dcGQhhlkeWNX8J3ljJQ6mwCNQiZJkMAfuObdtIECh3wooEKMUsKfQIRQsgySeJ3DjSwB02PSVhwuUkcUwZuxUbjIy6zu3ja0cXImPCm3jLK5H8B5KZtdMDjutWVxfBw8K/XUH5ytFofFv16yDrkCD4orUZYGcc95U1ATmQRGNphUTRwZz5OTJDV+lSiYukc9IFte8sanlCav8tKHFIwtsG2YbIAOE+8HsKwP+Xer3cpP6UrEg3wh4s9k+V1ydj4wkcfrBD6sv9RQbVXtpJEXQMOgEZ1ZmGssC46sd5oFRNssCmZI/5j+cFh0mQCYYY3KMK6REKmhkGVfrLgJ1hSK1kB9X0Q4T54zVUyyXdbxsWpYB/zwtUl33Szprw3BWv2K69ZGBWW8CDAD7MHTPqrySXgAAAABJRU5ErkJggg==',
      symbolSize: [80, 80],
      symbolOffset: [40, 0],
      z: 12,
      itemStyle: {
        normal: {
          color: '#14b1eb',
          borderRadius: [10, 0, 0, 10]
        }
      },
      data: [{
        value: 80,
        symbolPosition: 'end'
      }]
    },
    {
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#14b1eb',
          opacity: .7,
          borderRadius: [10, 0, 0, 10]
        }
      },
      showBackground: true,
      backgroundStyle: {
        borderRadius: [0, 10, 10, 0]
      },
      silent: true,
      barWidth: 20,
      barGap: '-100%', // Make series be overlap
      data: [80]
    },
  ]
}

// 折线图配置
const option1 = {
  // title: {
  //   text: '堆叠区域图',
  //   textStyle: {
  //     align: 'center',
  //     color: '#fff',
  //     fontSize: 20,
  //   },
  //   top: '5%',
  //   left: 'center',
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    x: '70%',
    top: '0%',
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    itemWidth: 20,
    itemHeight: 20,
    borderRadius: 0,
    icon: 'rect',
    itemGap: 20,
    // 颜色
    itemStyle: {
      color: '#4DA3FF'
    },
    data: ['完成投资 (万元)']
  },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  grid: {
    left: '3%',
    right: '1%',
    bottom: '5%',
    top: '22%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8c8c8c",
          fontSize: 30
        }
      },
      axisTick: {
        show: false
      },
      // boundaryGap: false,
      data: ['2025/01', '2025/02', '2025/03', '2025/04', '2025/05']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '单位：万元',
      nameLocation: 'end',
      nameGap: 20,
      nameTextStyle: {
        color: '#8c8c8c',
        fontSize: 24,
        padding: [0, 0, 0, 0],
        lineHeight: 50
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#82909D"
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#8c8c8c",
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
      showSymbol: false, // 鼠标移入才显示圆点
      color: ['#35B0DD'],
      lineStyle: {
        width: 6 // 设置线条宽度
      },
      areaStyle: {
        normal: {
          // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(38,117,182,0.2052)'
          },
          {
            offset: 1,
            color: 'rgba(41,118,181,0.1242)'
          }
          ], false),
          shadowColor: 'rgba(118,168,248, 0.9)', // 阴影颜色
          shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        }
      },
      data: [40, 34, 30, 3, 24]
    }
  ]
}

// 柱状图配置
const scale = 1;
const color = "#189cbb";
const option2 = {
  tooltip: {
    show: false,
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['规划投资（亿元）', '完成投资（亿元）'],
    align: 'left',
    itemGap: 50,
    // x: 'right',
    right: '10%',
    y: '10%',
    icon: 'rect',
    itemWidth: 15 * scale, // 图例图形宽度
    itemHeight: 15 * scale, // 图例图形高度
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['承平高速', '承克高速', '承德南互通', '全山岭互通', '茅荆坝互通'],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#8c8c8c",
        fontSize: 30
      }
    },
    axisTick: {
      inside: false,
      length: 8 * scale,
      lineStyle: {
        color: color,
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
    max: 600,
    axisLabel: {
      textStyle: {
        color: "#8c8c8c",
        fontSize: 30
      }
    },
    axisTick: {
      lineStyle: {
        color: color,
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
      barGap: '10%',
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'rgba(94,218,255,0.8)',
        }
      },
      data: [300, 280, 450, 320, 380]
    },
    {
      name: '完成投资（亿元）',
      type: 'bar',
      barWidth: 21,
      barGap: '10%',
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          color: '#23aecb',
        }
      },
      data: [250, 220, 380, 280, 320]
    }]
};

</script>

<style scoped lang="scss">
.tab-content-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-info {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .container-header-item {
    display: flex;
    align-items: center;
    column-gap: 25px;
    margin-right: 40px;
  }

  .container-header-item div:first-child {
    width: 23px;
    height: 22px;
    background: linear-gradient(158deg, #D0E5E5 0%, rgba(208, 229, 229, 0) 100%);
    border-radius: 50%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: #60D9FF;
      border-radius: 50%;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .container-header-item div:last-child {
    display: flex;
    align-items: center;

    span:first-child {
      font-family: AlibabaPuHuiTi, PingFang SC, Microsoft YaHei, sans-serif;
      font-weight: 400;
      font-size: 30px;
      line-height: 42px;
      font-style: normal;
      text-transform: none;
      color: #FFFFFF;
      margin-right: 20px;
      white-space: nowrap;
    }

    span:last-child {
      font-family: YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif;
      font-weight: 400;
      font-size: 46px;
      line-height: 60px;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(to bottom, #FFB579 0%, #FFEFB8 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
      white-space: nowrap;
    }
  }

  .echarts-container {
    width: 100%;
    flex: 1;
    box-shadow: inset 0px 0px 12px 0px #4DA3FF;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);

    //  background: url('assets/image/lefty/bg188.png') no-repeat 100% / 100%;
    display: flex;
    flex-direction: column;
    padding: 0;

    // 进度条
    .echarts-progress {
      width: 100%;
      height: 100px;

      // 添加圆圈闪烁动画
      :deep(.echarts-for-vue) {
        .pictorialBar {
          animation: blink 2s infinite;
        }
      }
    }
  }

  // 闪烁动画
  @keyframes blink {

    0%,
    50% {
      opacity: 1;
      transform: scale(1);
    }

    25%,
    75% {
      opacity: 0.3;
      transform: scale(1.1);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  // 轮播容器样式
  .carousel-container {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 500px;

    .chart-wrapper {
      width: 100%;
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.q-carousel) {
      width: 100%;
    }

    :deep(.q-carousel__slide) {
      padding: 20px;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    :deep(.q-carousel__navigation) {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
