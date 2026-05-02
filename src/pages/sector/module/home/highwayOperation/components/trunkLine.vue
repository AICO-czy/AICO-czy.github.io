<!-- 公路运营-基础概况-普通干线 -->
<template>
  <div class="trunkLine column justify-between">
    <div class="trunkLine-top row">
      <div class="trunkLine-top-left column justify-around">
        <div class="trunkLine-top-left-item row items-center" v-for="item in state.roadTotal" :key="item.name">
          <q-icon class="top-icon" :name="item.icon"></q-icon>
          <div class="trunkLine-top-left-item-nameBox column">
            <span class="trunkLine-top-left-item-name">{{ item.name }}</span>
            <span class="trunkLine-top-left-item-value">{{ item.value }}</span>
            <span class="trunkLine-top-left-item-value">{{ item.distance }}</span>
          </div>
        </div>
      </div>
      <div class="trunkLine-isolation"></div>
      <div class="trunkLine-top-middle">
        <v-chart ref="chartRef" :option="optionPie" class="fit" />
      </div>
      <div class="col row trunkLine-top-right">
        <div class="column col highSpeed-top-chartBox" v-for="item in state.chartData" :key="item.name">
          <div class="chart-title row items-center">
            <q-icon class="top-icon" :name="item.icon"></q-icon>
            <span class="chart-title-name">
              {{ item.name }}
            </span>
            <span class="chart-title-value">{{ item.value }}{{ item.unit }}</span>
          </div>
          <div class="col chart-content">
            <v-chart ref="chartRef" :option="item.option" class="fit" @click="handleChartClick" />
          </div>
        </div>
      </div>
    </div>
    <div class="trunkLine-bottom row">
      <!-- <div class="highSpeed-arrow"></div> -->
      <el-carousel class="fit" interval="5000">
        <el-carousel-item class="fit">
          <div class="trunkLine-bottom-box1 row">
            <div class="trunkLine-bottom-left  row items-center justify-evenly">
              <div class="trunkLine-bottom-left-total column items-center">
                <q-icon class="trunkLine-bottom-left-total-icon" :name="`img:${icon6}`"></q-icon>
                <span class="trunkLine-bottom-left-total-value">79个</span>
                <span class="trunkLine-bottom-left-total-name">机电设备</span>
              </div>
              <div class="trunkLine-bottom-item column" v-for="item in state.equipmentTatol" :key="item.name">
                <span class="trunkLine-bottom-item-name">{{ item.name }}</span>
                <span class="trunkLine-bottom-item-value">{{ item.value }}</span>
              </div>
            </div>
            <div class="trunkLine-isolation"></div>
            <div class="trunkLine-bottom-right  row items-center justify-evenly">
              <div class="trunkLine-bottom-left-total column items-center">
                <q-icon class="trunkLine-bottom-left-total-icon" :name="`img:${icon7}`"></q-icon>
                <span class="trunkLine-bottom-left-total-value">31处</span>
                <span class="trunkLine-bottom-left-total-name">结构物健康监测</span>
              </div>
              <div class="trunkLine-bottom-item column" v-for="item in state.detectionTatol" :key="item.name">
                <span class="trunkLine-bottom-item-name">{{ item.name }}</span>
                <span class="trunkLine-bottom-item-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
        <el-carousel-item class="fit">
          <div class="trunkLine-bottom-box2 row">
            <div class="trunkLine-bottom-left1 row items-center">
              <q-icon class="trunkLine-bottom-left-total-icon" :name="state.riskLevelTotal.icon"></q-icon>
              <div class="trunkLine-bottom-left-total-nameBox column">
                <span class="trunkLine-bottom-left-total-value">{{ state.riskLevelTotal.value }}</span>
                <span class="trunkLine-bottom-left-total-name">{{ state.riskLevelTotal.name }}</span>
              </div>
            </div>
            <div class="trunkLine-isolation1"></div>
            <div class="trunkLine-bottom-right1 row justify-evenly">
              <div class="trunkLine-bottom-right1-item row items-center" v-for="item in state.riskLevel"
                :key="item.name">
                <q-icon :name="item.icon" class="trunkLine-bottom-right-total-icon"></q-icon>
                <div class="trunkLine-bottom-bameBox column">
                  <span class="trunkLine-bottom-item-name">{{ item.name }}</span>
                  <span class="trunkLine-bottom-item-value" :style="{ background: item.background }">{{ item.value
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, reactive, ref } from "vue";
import * as echarts from 'echarts'

import icon1 from 'src/assets/image/highwayOperation/groundline/普通干线-国道.png'
import icon2 from 'src/assets/image/highwayOperation/groundline/普通干线-省道.png'
import icon3 from 'src/assets/image/highwayOperation/highSpeed/切图 413.png'
import icon4 from 'src/assets/image/highwayOperation/highSpeed/切图 414.png'
import icon5 from 'src/assets/image/highwayOperation/圆点.png'
import icon6 from 'src/assets/image/highwayOperation/groundline/切图 428.png'
import icon7 from 'src/assets/image/highwayOperation/groundline/切图 429.png'
import icon8 from 'src/assets/image/highwayOperation/groundline/切图 434.png'



const state = reactive({
  roadTotal: [
    {
      icon: `img:${icon1}`,
      name: '国道',
      value: '2条',
      distance: '536公里'
    },
    {
      icon: `img:${icon2}`,
      name: '省道',
      value: '26条',
      distance: '852公里'
    },
  ],
  chartData: [
    {
      icon: `img:${icon3}`,
      name: '桥梁',
      value: 16,
      unit: '座',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let dot =
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
            return params[0].name + '<br>' + '办结率 ：' + params[0].value + '%';
          },
        },
        grid: {
          left: '5%',
          right: '7%',
          bottom: '5%',
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
    },
    {
      icon: `img:${icon4}`,
      name: '隧道',
      value: 52,
      unit: '座',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            let dot =
              '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
            return params[0].name + '<br>' + '办结率 ：' + params[0].value + '%';
          },
        },
        grid: {
          left: '2%',
          right: '8%',
          bottom: '5%',
          top: '11%',
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
    }
  ],
  equipmentTatol: [
    {
      name: '视频监控',
      value: '11个',
    },
    {
      name: '交通设备',
      value: '36个',
    },
  ],
  detectionTatol: [
    {
      name: '桥梁监测',
      value: '11处',
    },
    {
      name: '隧道监测',
      value: '11个',
    },
    {
      name: '高边坡监测',
      value: '11个',
    }
  ],
  riskLevelTotal: {
    icon: `img:${icon8}`,
    name: '风险点',
    value: '47处',
  },
  riskLevel: [
    {
      icon: `img:${icon5}`,
      name: 'A级',
      value: '15处',
      background: 'linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%)'
    },
    {
      icon: `img:${icon5}`,
      name: 'B级',
      value: '13处',
      background: 'linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%)'
    },
    {
      icon: `img:${icon5}`,
      name: 'C级',
      value: '12处',
      background: 'linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%)'
    },
    {
      icon: `img:${icon5}`,
      name: 'D级',
      value: '10处',
      background: 'linear-gradient(180deg, #6BDCFF 0%, #54FBF1 100%)'
    },
  ]
});

// 选中的柱子索引
const selectedIndex = ref(-1);
// 图表引用
const chartRef = ref(null);
// 点击事件处理
const handleChartClick = (params) => {
  if (params.name.indexOf('隧道') !== -1) {
    if (params.componentType === 'series') {
      // 更新选中索引
      selectedIndex.value = params.dataIndex;
      // 获取图表实例
      const chart = chartRef.value[1];

      // 动态设置颜色
      state.chartData[1].option.series[0].itemStyle = {
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
      chart.setOption(state.chartData[1].option);
    }
  } else {
    if (params.componentType === 'series') {
      // 更新选中索引
      selectedIndex.value = params.dataIndex;
      // 获取图表实例
      const chart = chartRef.value[0];

      // 动态设置颜色
      state.chartData[0].option.series[0].itemStyle = {
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
      chart.setOption(state.chartData[0].option);
    }
  }

};
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
        width: 245,
        height: 245
      },
      left: 'center',//
      top: 'center' //配置图片居中
    }]
  },
  polar: {
    radius: ['44%', '60%'],
    center: ['50%', '50%'],
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
      center: ['50%', '50%'],
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
</script>

<style lang="scss" scoped>
.trunkLine {
  width: 100%;
  height: 100%;
  padding: 17px 12px 10px;
  position: relative;
}

.trunkLine-top {
  width: 100%;
  height: 290px;
  background-image: url('assets/image/highwayOperation/内容背景大.png');
  background-size: 100% 100%;
  position: relative;
}

.top-icon {
  width: 97px;
  height: 79px;
}

.trunkLine-top-left {
  .trunkLine-top-left-item-name {
    height: 40px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 40px;
    line-height: 40px;
    color: #A3D9FF;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .trunkLine-top-left-item-value {
    height: 47px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 45px;
    line-height: 47px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.trunkLine-top-middle {
  width: 250px;
  height: 100%;
}

.trunkLine-isolation {
  width: 6px;
  height: 80%;
  margin: 20px 0px 20px 10px;
  background-image: url('assets/image/highwayOperation/线.png');
  background-size: 100% 100%;
}

.trunkLine-isolation1 {
  width: 6px;
  height: 100%;
  margin: 20px 0px 20px 10px;
  background-image: url('assets/image/highwayOperation/线.png');
  background-size: 100% 100%;
}

.trunkLine-top-right {
  height: 100%;

  .highSpeed-top-chartBox {
    .chart-content {}

    .chart-title {
      padding-left: 20px;
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
      margin: 20px;
    }

    .chart-title-value {
      margin-top: 5px;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      line-height: 65px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.trunkLine-bottom {
  width: 100%;
  height: 220px;
  background-image: url('assets/image/highwayOperation/内容背景大.png');
  background-size: 100% 100%;
  position: relative;

  .trunkLine-bottom-box1 {
    width: 100%;
    height: 100%;

    .trunkLine-bottom-left {
      width: 37%;
      height: 100%;

      .trunkLine-bottom-left-total {
        height: 100%;

        .trunkLine-bottom-left-total-icon {
          width: 147px;
          height: 110px;
        }

        .trunkLine-bottom-left-total-value {
          height: 45px;
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 45px;
          line-height: 50px;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .trunkLine-bottom-left-total-name {
          height: 35px;
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 35px;
          line-height: 40px;
          color: #A3D9FF;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }

      .trunkLine-bottom-item {
        .trunkLine-bottom-item-name {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 36px;
          color: #A3D9FF;
          line-height: 49px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .trunkLine-bottom-item-value {
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          line-height: 65px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .trunkLine-bottom-right {
      width: 61%;
      height: 100%;

      .trunkLine-bottom-left-total {
        height: 100%;

        .trunkLine-bottom-left-total-icon {
          width: 147px;
          height: 110px;
        }

        .trunkLine-bottom-left-total-value {
          height: 45px;
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 45px;
          line-height: 50px;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .trunkLine-bottom-left-total-name {
          height: 35px;
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 35px;
          line-height: 40px;
          color: #A3D9FF;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }

      .trunkLine-bottom-item {
        .trunkLine-bottom-item-name {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 36px;
          color: #A3D9FF;
          line-height: 49px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .trunkLine-bottom-item-value {
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          line-height: 65px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  .trunkLine-bottom-box2 {
    width: 100%;
    height: 100%;
    padding: 44px 73px 40px 0px;

    .trunkLine-bottom-left1 {
      width: 23%;
      height: 100%;

      .trunkLine-bottom-left-total-icon {
        width: 147px;
        height: 120px;
        margin-left: 10px;
      }

      .trunkLine-bottom-left-total-nameBox {
        margin-left: 15px;
      }

      .trunkLine-bottom-left-total-value {
        height: 60px;
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 52px;
        line-height: 60px;
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .trunkLine-bottom-left-total-name {
        height: 40px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 40px;
        color: #A3D9FF;
        line-height: 48px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .trunkLine-bottom-right1 {
      width: 75%;
      height: 100%;

      .trunkLine-bottom-right-total-icon {
        width: 25px;
        height: 25px;
      }

      .trunkLine-bottom-bameBox {
        margin-left: 36px;
      }

      .trunkLine-bottom-item-name {
        height: 45px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 45px;
        color: #A3D9FF;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .trunkLine-bottom-item-value {
        height: 60px;
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 52px;
        font-style: normal;
        text-transform: none;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
    }
  }

  .highSpeed-arrow {
    width: 60px;
    height: 60px;
    background-image: url('assets/image/highwayOperation/双箭头.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }


}

:deep(.el-carousel__arrow) {
  width: 60px;
  height: 60px;
}

:deep(.el-carousel__arrow .el-icon) {
  width: 60px;
  height: 60px;
}

:deep(.el-carousel__arrow .el-icon svg) {
  width: 60px;
  height: 60px;
}

:deep(.el-carousel__container) {
  height: 100%;
}
</style>
