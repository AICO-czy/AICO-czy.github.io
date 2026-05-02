<template>
  <div class="tab-content-4">
    <!-- 顶部区域 -->
    <div class="top">
      <div class="left">
        <acountTitleBox text="总投资" value="600" unit="亿元" />
      </div>
      <div class="right">
        <div class="right-top justify-between">
          <acountTitleBox class="right-title-label" text="大、中修工程" value="1000" unit="公里" />
          <acountTitleBox text="投资" value="60" unit="亿元" />
        </div>
        <div class="right-bottom justify-between">
          <acountTitleBox class="right-title-label" text="精细化提升工程" value="600" unit="公里" />
          <acountTitleBox text="投资" value="20" unit="亿元" />
        </div>
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content-t">
      <div class="item item1">
        <titleBox title="总体完成情况" />
        <div class="chart-box">
          <div class="one">
            <div class="title">干线公路养护大、中修工程</div>
            <div class="char">
              <v-chart :option="getGaugeOption(value[0] ?? 0)" key="1" autoresize
                style="width: 100%; height: 280px;"></v-chart>
            </div>
          </div>
          <div class="two">
            <div class="title">干线公路养工程</div>
            <div class="char">
              <v-chart :option="getGaugeOption(value[1] ?? 0)" key="2" autoresize
                style="width: 100%; height: 320px;"></v-chart>
            </div>
          </div>
          <div class="three">
            <div class="title">安全设施精细化提升工程</div>
            <div class="char">
              <v-chart :option="getGaugeOption(value[2] ?? 0)" key="3" autoresize
                style="width: 100%; height: 280px;"></v-chart>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="top-box">
          <titleBox title="年度养护投资完成情况" />
          <div class="switch-row">
            <div class="years-row">
              <div class="year-item" v-for="y in years" :key="y" :class="{ current: y === currentYear }"
                @click="currentYear = y">{{ y }}
              </div>
            </div>
          </div>
        </div>
        <div class="chart-bar">
          <v-chart :option="option1" autoresize style="width: 100%; height: 100%;"></v-chart>
        </div>
      </div>
      <div class="item">
        <titleBox title="年度养护投资完成情况" />
        <div class="chart-bar">
          <v-chart :option="option2" autoresize style="width: 100%; height: 100%;"></v-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import acountTitleBox from './acountTitleBox.vue'
import titleBox from './titleBox.vue'
import * as echarts from 'echarts'

const years = ['全部', '大、中修工程', '精细化提升工程']
const currentYear = ref(2025)
// 环形图配置
const value = [84, 80, 72]

// 环形图配置
function getGaugeOption(val: number) {
  return {
    angleAxis: {
      show: false,
      max: (100 * 360) / 180, //-45度到225度，二者偏移值是270度除360度
      type: 'value',
      startAngle: 180, //极坐标初始角度
      splitLine: {
        show: false,
      },
    },
    barMaxWidth: 18, //圆环宽度
    radiusAxis: {
      show: false,
      type: 'category',
    },
    //圆环位置和大小
    polar: {
      center: ['50%', '66%'],
      radius: '170%',
    },
    series: [
      {
        //下层圆环，显示最大值
        type: 'bar',
        data: [
          {
            value: 100,
            itemStyle: {
              color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1, //从左到右 0-1
                y2: 0,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(27, 125, 227, 1)'
                }, {
                  offset: 0.2,
                  color: 'rgba(56, 201, 201, 1)'
                }, {
                  offset: 0.5,
                  color: 'rgba(56, 201, 201, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(249, 87, 87, 1)'
                }],
              },
            },
          },
        ],
        barGap: '-100%',
        coordinateSystem: 'polar',
        roundCap: true,
        z: 1,
      },
      {
        type: "gauge",
        radius: '100%',
        center: ["50%", "70%"],
        splitNumber: 4,
        startAngle: 180,
        endAngle: 0,
        axisLine: {
          show: false,
          lineStyle: {
            width: 18,
            color: [[1, 'rgba(0,0,0,0)']],
          },
        },
        //分隔线样式。
        splitLine: {
          show: false,
          length: 12,
          lineStyle: { color: 'rgba(255,255,255,0.3)' }
        },
        axisLabel: {
          show: true,
          fontSize: 32,
          distance: -66,
          color: '#CFE6F6',
          formatter: function (v: number) { return v }
        },
        axisTick: {
          show: true,
          length: 6,
          lineStyle: { color: 'rgba(255,255,255,0.3)' }
        },
        pointer: {
          show: true,
          length: "72%",
          width: 6,
          itemStyle: {
            color: '#E6EFFA',
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowBlur: 6
          }
        },
        itemStyle: { color: '#8280bc' },
        //仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: ['0', '20%'],
          textStyle: {
            fontSize: 34,
            color: '#E6EFFA',
          },
          formatter: function () { return val + '%' }
        },
        data: [{ value: val }],
        anchor: {
          show: true,
          showAbove: true,
          size: 10,
          itemStyle: {
            color: '#9FB8D6',
            shadowColor: 'rgba(0,0,0,0.45)',
            shadowBlur: 8
          }
        },
      }
    ],
  };
}

// 折线图
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
    top: '2%%',
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
    bottom: '0%',
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

// 柱状图
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
.tab-content-4 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .top {
    width: 100%;
    display: flex;
    flex-shrink: 0;

    .left {
      margin-right: 40px;
      display: flex;
      align-items: center;
    }

    .right {
      display: flex;
      flex-direction: column;

      .right-top {
        flex: 1;
        display: flex;
      }

      .right-bottom {
        flex: 1;
        display: flex;
      }

      .right-title-label {
        width: 500px !important;
      }
    }
  }

  .content-t {
    width: 100%;
    flex: 1;
    min-height: 0;
    background: url('assets/image/lefty/bg150.png') no-repeat 100% / 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;

      .top-box {
        width: 100%;
        display: flex;
        padding-right: 20px;
      }

      .chart-bar {
        width: 100%;
        flex: 1;
        min-height: 0;
        display: flex;

        >* {
          flex: 1;
        }
      }
    }

    .item1 {
      display: flex;

      .chart-box {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: end;
        gap: 10px;

        div {
          display: flex;
          flex-direction: column;

          .title {
            width: 100%;
            text-align: center;
            height: 80px;
            font-size: 28px;
            color: #BBD5EB;
            -webkit-text-fill-color: #BBD5EB;
          }

          .char {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 260px;
          }
        }
      }

      .one {
        width: 30%;
        height: 90%;
      }

      .two {
        width: 40%;
        height: 100%;
      }

      .three {
        width: 30%;
        height: 90%;
      }
    }

    .years-row {
      display: flex;
      margin-top: 14px;
      background: rgba(165, 203, 255, 0.1);
    }

    .year-item {
      padding: 4px 12px;
      color: #a8d7ff;
      cursor: pointer;
      font-size: 28px;
    }

    .year-item.current {
      background: rgba(60, 140, 220, .25);
      color: #eaffff;
    }

  }
}
</style>
