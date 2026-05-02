<!-- 公路运营-基础概况-高速公路 -->
<template>
  <div class="highSpeed column justify-between">
    <div class="highSpeed-top row">
      <div class="highSpeed-total-box column">
        <div class="highSpeed-total-title row no-wrap items-center">
          <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
          <span class="top-name">
            全市高速公路网
          </span>
        </div>
        <div class="highSpeed-total-s row items-center">
          <q-icon class="highSpeed-icon" :name="`img:${icon2}`"></q-icon>
          <div class="highSpeed-value-box column items-center">
            <span class="highSpeed-name">收费站</span>
            <span class="highSpeed-value">26个</span>
          </div>
        </div>
        <div class="highSpeed-total-f row items-center">
          <q-icon class="highSpeed-icon" :name="`img:${icon3}`"></q-icon>
          <div class="highSpeed-value-box column items-center">
            <span class="highSpeed-name">服务区</span>
            <span class="highSpeed-value">9个</span>
          </div>
        </div>
      </div>
      <div class="highSpeed-isolation1"></div>
      <div class="highSpeed-total-chart">
        <v-chart ref="chartRefPie" :option="optionPie" class="fit" />
      </div>
      <div class="highSpeed-top-chartBox column">
        <div class="chart-title row items-center">
          <q-icon class="chart-title-icon" :name="`img:${icon4}`"></q-icon>
          <span class="chart-title-name">
            桥梁
          </span>
          <span class="chart-title-value">16座</span>
        </div>
        <div class="col chart-content">
          <v-chart ref="chartRef" :option="optionBar" class="fit" @click="handleChartClick" />
        </div>
      </div>
      <div class="highSpeed-top-chartBox1 column">
        <div class="chart-title row items-center">
          <q-icon class="chart-title-icon" :name="`img:${icon5}`"></q-icon>
          <span class="chart-title-name">
            隧道
          </span>
          <span class="chart-title-value">52座</span>
        </div>
        <div class="col chart-content">
          <v-chart ref="chartRef1" :option="optionBar1" class="fit" @click="handleChartClick" />
        </div>
      </div>
    </div>
    <div class="highSpeed-bottom row">
      <div class="highSpeed-arrow" @click="handleOpen('basicOverDialog')"></div>
      <div class="highSpeed-bottom-left">
        <div class="highSpeed-bottom-left-top row items-center">
          <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
          <span class="top-name">
            市管高速
          </span>
        </div>
        <div class="highSpeed-bottom-left-bottom row items-center">
          <q-icon class="highSpeed-icon" :name="`img:${icon6}`"></q-icon>
          <div class="highSpeed-value-box column items-center">
            <span class="highSpeed-value">2条</span>
            <span class="highSpeed-value">165公里</span>
          </div>
        </div>
      </div>
      <div class="highSpeed-isolation"></div>
      <div class="highSpeed-bottom-middle column justify-around items-center">
        <div class="highSpeed-bottom-middle-item row items-center">
          <q-icon class="highSpeed-bottom-middle-icon" :name="`img:${icon7}`"></q-icon>
          <span class="highSpeed-bottom-middle-name">承平高速</span>
          <span class="highSpeed-bottom-middle-value">
            <span>已建</span>
          </span>
        </div>
        <div class="highSpeed-bottom-middle-item row items-center">
          <q-icon class="highSpeed-bottom-middle-icon" :name="`img:${icon8}`"></q-icon>
          <span class="highSpeed-bottom-middle-name">
            承克高速
          </span>
          <span class="highSpeed-bottom-middle-value under-construction">
            <span>在建</span>
          </span>
        </div>
      </div>
      <div class="col highSpeed-bottom-right row items-center">
        <div class="highSpeed-bottom-right-item row items-center">
          <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
          <span class="highSpeed-bottom-name">
            通车里程:
          </span>
          <span class="highSpeed-bottom-value">
            59公里
          </span>
        </div>
        <div class="highSpeed-bottom-right-item row items-center">
          <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
          <span class="highSpeed-bottom-name">
            桥隧比:
          </span>
          <span class="highSpeed-bottom-value">
            68%
          </span>
        </div>
        <div class="highSpeed-bottom-right-item row items-center">
          <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
          <span class="highSpeed-bottom-name">
            规划里程:
          </span>
          <span class="highSpeed-bottom-value1">
            106公里
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, reactive, ref } from "vue";
import * as echarts from 'echarts'
import { useBaiseInfoDialogStore } from '../highseed/store/index'
import icon1 from 'src/assets/image/highwayOperation/highwayNetwork/切图 240.png'
import icon2 from 'src/assets/image/highwayOperation/highSpeed/切图 411.png'
import icon3 from 'src/assets/image/highwayOperation/highSpeed/切图 412.png'
import icon4 from 'src/assets/image/highwayOperation/highSpeed/切图 413.png'
import icon5 from 'src/assets/image/highwayOperation/highSpeed/切图 414.png'
import icon6 from 'src/assets/image/highwayOperation/highwayNetwork/切图 243.png'
import icon7 from 'src/assets/image/highwayOperation/highSpeed/切图 420.png'
import icon8 from 'src/assets/image/highwayOperation/highSpeed/切图 419.png'

const baiseInfoDialogStore = useBaiseInfoDialogStore()
// 选中的柱子索引
const selectedIndex = ref(-1);
// 图表引用
const chartRef = ref(null);
const chartRef1 = ref(null);

const optionPie = {
  title: [
    {
      text: '桥隧比',
      x: 'center',
      top: '32%',
      textStyle: {
        color: '#A8C4D8',
        fontSize: 38,
        fontWeight: '500',
      },
    },
    {
      text: '45%',
      x: 'center',
      top: '52%',
      textStyle: {
        fontSize: 50,
        color: '#FFFFFF',
        foontWeight: '500',
      },
    },
  ],
  graphic: { // 这个属性可以在饼图内部填充图片,文字等
    elements: [{
      type: 'image',//需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
      style: {
        image: 'src/assets/image/highwayOperation/饼图背景.png', //这里添加图片地址
        width: 200,
        height: 200
      },
      left: 'center',//
      top: '0%' //配置图片居中
    }]
  },
  polar: {
    radius: ['44%', '60%'],
    center: ['50%', '48%'],
  },
  angleAxis: {
    max: 100,
    show: false,
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      type: 'pie',
      startAngle: 180,
      radius: ['77%', '85%'],
      center: ['50%', '48%'],
      data: [
        {
          hoverOffset: 1,
          value: 45,
          name: '',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#34A9D4',
                },
                {
                  offset: 1,
                  color: '#7DCFFA',
                },
              ])
            },
          },
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          hoverAnimation: false,
        },
        {
          label: {
            show: false,
          },
          labelLine: {
            normal: {
              smooth: true,
              lineStyle: {
                width: 0,
              },
            },
          },
          value: 100 - 45,
          hoverAnimation: false,
          itemStyle: {
            color: '#13314c1f',
          },
        },
      ],
    }
  ],
};

const optionBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params: any) {
      let dot =
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
      return params[0].name + '<br>' + '办结率 ：' + params[0].value + '%';
    },
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '3%',
    top: '10%',
    containLabel: true,
  },
  xAxis: {
    data: ['特大桥', '大桥', '中桥', '小桥'],
    triggerEvent: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#70F5FE',
      },
    },
    axisLabel: {
      show: true,
      rotate: 0,
      interval: 0,
      textStyle: {
        fontSize: 30,
        color: '#AEC1C8',
      },
    },
  },
  yAxis: {
    triggerEvent: true,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#AEC1C8',
        fontSize: 30,
      },
    },
  },
  series: [
    {
      type: 'pictorialBar',
      barCategoryGap: '20%',
      symbolOffset: [0, -5],
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        //渐变色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#58FFEE',
          },
          {
            offset: 0.5,
            color: '#06D7CE',
          },
          {
            offset: 1,
            color: '#1180CC',
          },
        ]),
      },
      data: [40, 30, 33, 37],
      z: 10,
    },
  ],
}
const optionBar1 = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params: any) {
      let dot =
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
      return params[0].name + '<br>' + '办结率 ：' + params[0].value + '%';
    },
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '10%',
    containLabel: true,
  },
  xAxis: {
    data: ['特长隧道', '长隧道', '中隧道', '短隧道'],
    triggerEvent: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#70F5FE',
      },
    },
    axisLabel: {
      show: true,
      rotate: 0,
      interval: 0,
      textStyle: {
        fontSize: 25,
        color: '#AEC1C8',
      },
    },
  },
  yAxis: {
    triggerEvent: true,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#AEC1C8',
        fontSize: 30,
      },
    },
  },
  series: [
    {
      type: 'pictorialBar',
      barCategoryGap: '20%',
      symbolOffset: [0, -5],
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        //渐变色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#58FFEE',
          },
          {
            offset: 0.5,
            color: '#06D7CE',
          },
          {
            offset: 1,
            color: '#1180CC',
          },
        ]),
      },
      label: {
        normal: {
          show: false,
        },
      },
      data: [40, 30, 33, 37],
      z: 10,
    },
  ],
}

// 点击事件处理
const handleChartClick = (params: any) => {
  if (params.name.indexOf('隧道') !== -1) {
    if (params.componentType === 'series') {
      // 更新选中索引
      selectedIndex.value = params.dataIndex;
      // 获取图表实例
      const chart = chartRef1.value;

      // 动态设置颜色
      optionBar1.series[0].itemStyle = {
        color: (itemParams) => {
          return itemParams.dataIndex === selectedIndex.value
            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#8DFFC9',
              },
              {
                offset: 0.5,
                color: '#01F681',
              },
              {
                offset: 1,
                color: '#0C656E',
              },
            ])  // 选中颜色
            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#58FFEE',
              },
              {
                offset: 0.5,
                color: '#06D7CE',
              },
              {
                offset: 1,
                color: '#1180CC',
              },
            ]); // 未选中颜色
        }
      };

      // 重新渲染图表
      chart.setOption(optionBar1);
    }
  } else {
    if (params.componentType === 'series') {
      // 更新选中索引
      selectedIndex.value = params.dataIndex;
      // 获取图表实例
      const chart = chartRef.value;

      // 动态设置颜色
      optionBar.series[0].itemStyle = {
        color: (itemParams) => {
          return itemParams.dataIndex === selectedIndex.value
            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#8DFFC9',
              },
              {
                offset: 0.5,
                color: '#01F681',
              },
              {
                offset: 1,
                color: '#0C656E',
              },
            ])  // 选中颜色
            : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#58FFEE',
              },
              {
                offset: 0.5,
                color: '#06D7CE',
              },
              {
                offset: 1,
                color: '#1180CC',
              },
            ]); // 未选中颜色
        }
      };

      // 重新渲染图表
      chart.setOption(optionBar);
    }
  }

};

// 定义一个状态变量跟踪对话框是否打开
let isDialogOpen = false;

function handleOpen(params: String) {
  if (params === 'basicOverDialog') {
    // 切换对话框状态：如果打开则关闭，反之则打开
    if (isDialogOpen) {
      baiseInfoDialogStore.closeDialog();
    } else {
      baiseInfoDialogStore.openDialog();
    }
    // 更新状态变量
    isDialogOpen = !isDialogOpen;
  } else {
    // 其他参数情况下关闭对话框并重置状态
    baiseInfoDialogStore.closeDialog();
    isDialogOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.highSpeed {
  width: 100%;
  height: 100%;
  padding: 17px 12px 10px;
  position: relative;
}

.highSpeed-top {
  width: 100%;
  height: 290px;
  padding: 15px 0px 10px 30px;
  background-image: url('assets/image/highwayOperation/highSpeed/切图 415.png');
  background-size: 100% 100%;
  position: relative;

  .highSpeed-total-box {
    width: 27%;
    height: 100%;
  }

  .highSpeed-total-s {
    width: 100%;
    height: 85px;
  }

  .highSpeed-total-f {
    width: 100%;
    height: 85px;
  }

  .highSpeed-isolation1 {
    width: 10px;
    height: 170px;
    background-image: url('assets/image/highwayOperation/线.png');
    background-size: 100% 100%;
    margin-top: 10px;
    position: absolute;
    top: 80px;
    left: 280px;
  }

  .highSpeed-total-chart {
    width: 240px;
    height: 212px;
    position: absolute;
    top: 70px;
    left: 300px;
  }

  .highSpeed-top-chartBox {
    width: 30%;
    height: 100%;
    margin-left: 140px;

    .chart-title {
      height: 80px;

      .chart-title-icon {
        width: 97px;
        height: 79px;
      }

      .chart-title-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 42px;
        color: #A3D9FF;
        line-height: 58px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin: 0px 20px;
      }

      .chart-title-value {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 50px;
        line-height: 65px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #5DE5B4 0%, #A7ECE8 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-top: 10px;
      }
    }

    .chart-content {
      width: 100%;
    }
  }

  .highSpeed-top-chartBox1 {
    width: 32%;
    height: 100%;

    .chart-title {
      margin-left: 20px;
      height: 80px;

      .chart-title-icon {
        width: 97px;
        height: 79px;
      }

      .chart-title-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 42px;
        color: #A3D9FF;
        line-height: 58px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin: 0px 20px;
      }

      .chart-title-value {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 50px;
        line-height: 65px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #5DE5B4 0%, #A7ECE8 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-top: 10px;
      }
    }

    .chart-content {
      width: 100%;
    }
  }
}

.highSpeed-bottom {
  width: 100%;
  height: 220px;
  padding: 15px 30px 20px;
  background-image: url('assets/image/highwayOperation/highSpeed/切图 415.png');
  background-size: 100% 100%;
  position: relative;

  .highSpeed-arrow {
    width: 60px;
    height: 60px;
    background-image: url('assets/image/highwayOperation/双箭头.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }

  .highSpeed-bottom-left-bottom {
    margin-top: 10px;
  }

  .highSpeed-bottom-left {
    width: 282px;
    height: 100%;

    .highSpeed-bottom-left-top {
      width: 248px;
      height: 58px;
    }
  }

  .highSpeed-bottom-middle {
    margin-left: 20px;

    .highSpeed-bottom-middle-item {
      width: 100%;
    }

    .highSpeed-bottom-middle-icon {
      width: 52px;
      height: 52px;
      margin-top: 10px;
    }



    .highSpeed-bottom-middle-name {
      width: 155px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 36px;
      color: #A3D9FF;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin: 0px 10px;
    }

    .highSpeed-bottom-middle-value {
      width: 105px;
      height: 44px;
      margin-top: 10px;
      background: rgba(45, 255, 175, 0.4);
      border-radius: 4px 4px 4px 4px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 700;
        font-size: 30px;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #9FC7DD 0%, #FFFFFF 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .under-construction {
      background: rgba(255, 124, 104, 0.4);
    }
  }

  .highSpeed-bottom-right {

    .highSpeed-bottom-right-item {

      .highSpeed-bottom-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 36px;
        color: #A3D9FF;
        line-height: 49px;
        font-style: normal;
        text-transform: none;
        margin: 0px 10px;
      }

      .highSpeed-bottom-value {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 45px;
        line-height: 65px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #5DE5B4 0%, #A7ECE8 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .highSpeed-bottom-value1 {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 45px;
        line-height: 65px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(51.63670243993558deg, #6BDCFF 0%, #54FBF1 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

.top-icon {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-top: 10px;
}

.top-name {
  margin-left: 20px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  text-shadow: 0px 4px 2px rgba(0, 200, 255, 0.3);
  font-style: normal;
  line-height: 58px;
  text-transform: none;
  background: linear-gradient(331.1009569376939deg, #FFFFFF 0%, #B8DAFB 92%, #B8DAFB 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highSpeed-icon {
  width: 105px;
  height: 85px;
}

.highSpeed-value {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 40px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #5DE5B4 0%, #A7ECE8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.highSpeed-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 32px;
  color: #A3D9FF;
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding-top: 10px;
}

.highSpeed-isolation {
  width: 10px;
  height: 170px;
  margin-top: 10px;
  background-image: url('assets/image/highwayOperation/线.png');
  background-size: 100% 100%;
}
</style>
