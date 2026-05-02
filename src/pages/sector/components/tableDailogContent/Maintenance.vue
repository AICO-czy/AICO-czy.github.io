<template>
  <div class="column maintenance">
    <div class="maintenance-select row">
      <div class="maintenance-select-road" :class="selectActive == 'road' ? 'select-active' : ''"
        @click="selectItemClick('road')">
        <span>公路养护工程</span>
      </div>
      <div class="maintenance-select-trunk" :class="selectActive == 'trunk' ? 'select-active' : ''"
        @click="selectItemClick('trunk')">
        <span>干线公路养护大、中修工程</span>
      </div>
      <div class="maintenance-select-safe" :class="selectActive == 'safe' ? 'select-active' : ''"
        @click="selectItemClick('safe')">
        <span>安全设施精细化提升工程</span>
      </div>
    </div>
    <div class="col maintenance-content row justify-between">
      <div class="column maintenance-content-left">
        <titleBox title="养护投资占比分析" />
        <div class="maintenance-content-right-ball"></div>
        <v-chart :option="option1" autoresize class="full-width col maintenance-content-left-chart" />
      </div>
      <div class="column maintenance-content-right">
        <titleBox title="总里程完成情况" />
        <v-chart :option="option2" autoresize class="full-width col maintenance-content-right-chart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import titleBox from '../titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const selectActive = ref('road')

const selectItemClick = (type: string) => {
  selectActive.value = type
}

const option1 = {
  title: {
    text: '安全提升',
    // 副标题
    subtext: "12亿元",
    // 主副标题间距
    itemGap: 40,
    x: 'center',
    y: 'center',
    top: '33%',
    left: '15%',
    // 主标题样式
    textStyle: {
      fontSize: '30',
      color: '#A3BFD8'
    },
    // 副标题样式
    subtextStyle: {
      fontSize: '36',
      color: '#A3BFD8'
    }
  },
  // 提示框（鼠标悬浮时显示的信息，可根据需要调整）
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}%',
    textStyle: {
      fontSize: 30,
      fontFamily: 'AlibabaPuHuiTiRegular',
    },
  },
  // 图例
  legend: {
    orient: 'vertical',
    right: '10%',
    top: '20%',
    data: [/*'安全提升',*/ '路面养护', '隧道养护', '桥梁养护'],
    textStyle: {
      color: '#A3BFD8',
      fontSize: 30
    },
    itemGap: 30, // 图例项之间的间距
    itemWidth: 16, // 图例标记的宽度
    itemHeight: 16 // 图例标记的高度
  },
  // 系列（核心：环形图）
  series: [
    {
      name: '资金占比',
      type: 'pie',
      padAngle: 7,
      radius: ['50%', '60%'], // 环形的内外半径，实现环形效果
      center: ['27%', '50%'], // 图表中心位置
      data: [
        // { value: 30, name: '安全提升' },
        { value: 20, name: '路面养护' },
        { value: 20, name: '隧道养护' },
        { value: 30, name: '桥梁养护' }
      ],
      color: ['#B0FAFF', '#FFD763', '#18C6C8', '#93EB85'], // 各部分颜色
      label: {
        show: true,
        position: "center",
        formatter: [
          "{a|状态分布}" // 使用富文本标记设置文字样式和背景图片
        ].join("\n"),
        rich: {
          a: {
            color: "#333",
            fontSize: 14,
            width: 90, // 设置背景图片宽度
            height: 90, // 设置背景图片高度
          }
        }
      },
      labelLine: {
        show: false // 隐藏标签引导线
      },
      emphasis: {
        scale: true, // 鼠标悬浮时是否放大
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ],
};

const option2 = {
  tooltip: {
    show: true,
    trigger: 'axis',
    textStyle: {
      fontSize: 30,
      fontFamily: 'AlibabaPuHuiTiRegular',
    },
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['计划里程（公里）', '完成里程（公里）'],
    align: 'left',
    itemGap: 50,
    right: '27%',
    top: '0%',
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
    bottom: '10%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['2021年', '2022年', '2023年', '2024年', '2025年'],
    nameGap: 15,
    axisLabel: {
      show: true,
      textStyle: {
        color: "#AEC1C8",
        fontSize: 30,
        padding: [10, 0, 0, 0]
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
    name: '单位：公里',
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
      name: '计划里程（公里）',
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
      name: '完成里程（公里）',
      type: 'bar',
      barWidth: 21,
      barGap: '40%',
      label: {
        show: false,
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
</script>

<style scoped lang="scss">
.maintenance {
  width: 100%;
  height: 100%;
}

.maintenance-select {
  width: 100%;
  height: 79px;
  padding-left: 24px;
  border-radius: 0px 0px 0px 0px;
}

.maintenance-select span {
  font-family: Roboto, Roboto;
  font-weight: 400;
  font-size: 36px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.maintenance-select-road {
  width: 268px;
  height: 79px;
  background-image: url('assets/image/sector/bg-noSelect.png');
  background-size: 100% 100%;
}

.maintenance-select-trunk {
  width: 476px;
  height: 79px;
  background-image: url('assets/image/sector/bg-noSelect.png');
  background-size: 100% 100%;
  margin: 0px 24px;
}

.maintenance-select-safe {
  width: 476px;
  height: 79px;
  background-image: url('assets/image/sector/bg-noSelect.png');
  background-size: 100% 100%;
}

.select-active {
  background-image: url('assets/image/sector/bg-select.png');
  background-size: 100% 100%;
}

.maintenance-content {
  padding: 22px 24px 22px;
}

.maintenance-content-left {
  width: 28%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 12px;
  position: relative;
}

.maintenance-content-left-chart {
  z-index: 777;
}

.maintenance-content-right {
  width: 70%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 12px;
  z-index: 777;
}


.maintenance-content-right-ball {
  width: 250px;
  height: 250px;
  border: 2px solid #5F666C;
  border-radius: 50%;
  z-index: 1;
  position: absolute;
  top: 132px;
  left: 14px;
}
</style>
