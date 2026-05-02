<!-- 公路运营-基础概况-农村公路 -->
<template>
  <div class="rural-road column justify-between">
    <div class="rural-road-top">
      <div class="rural-road-top-item" v-for="item in state.roadTotal" :key="item.name">
        <div class="rural-road-top-item-icon">
          <q-icon class="fit" :name="item.icon"></q-icon>
        </div>
        <div class="rural-road-top-item-content">
          <div class="rural-road-top-item-name">
            {{ item.name }}
          </div>
          <div class="rural-road-top-item-distance">
            {{ item.distance }}
          </div>
        </div>
      </div>
    </div>
    <div class="rural-road-bottom row">
      <div class="rural-road-bottom-left">
        <v-chart ref="chartRef" :option="optionPie" class="fit" />
      </div>
      <div class="rural-road-bottom-right row">
        <div class="col column rural-road-bottom-right-item" v-for="item in state.roadCharts" :key="item.name">
          <div class="rural-road-bottom-right-item-title row items-center">
            <q-icon :name="item.icon" class="rural-road-bottom-right-item-title-icon"></q-icon>
            <div class="rural-road-bottom-right-item-title-name">
              {{ item.name }}
            </div>
            <div class="rural-road-bottom-right-item-title-value">
              {{ item.value }}
            </div>
          </div>
          <div class="col rural-road-bottom-right-item-content">
            <v-chart ref="chartRef" :option="item.option" class="fit" @click="handleChartClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, reactive, ref } from "vue";
import * as echarts from 'echarts'

import icon1 from 'src/assets/image/highwayOperation/ruralRoad/切图 447.png'
import icon2 from 'src/assets/image/highwayOperation/ruralRoad/切图 448.png'
import icon3 from 'src/assets/image/highwayOperation/ruralRoad/切图 449.png'
import icon4 from 'src/assets/image/highwayOperation/highwayNetwork/切图 242.png'
import icon5 from 'src/assets/image/highwayOperation/highwayNetwork/切图 243.png'


const state = reactive({
  roadTotal: [
    {
      icon: `img:${icon1}`,
      name: '县道',
      distance: '536公里'
    },
    {
      icon: `img:${icon2}`,
      name: '乡道',
      distance: '536公里',
    },
    {
      icon: `img:${icon3}`,
      name: '村道',
      distance: '536公里',
    }
  ],
  roadCharts: [
    {
      icon: `img:${icon4}`,
      name: '桥梁',
      value: '1689座',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '2%',
          top: '8%',
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
      icon: `img:${icon5}`,
      name: '隧道',
      value: '52座',
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
          left: '3%',
          right: '5%',
          bottom: '2%',
          top: '8%',
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
      state.roadCharts[1].option.series[0].itemStyle = {
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
      chart.setOption(state.roadCharts[1].option);
    }
  } else {
    if (params.componentType === 'series') {
      // 更新选中索引
      selectedIndex.value = params.dataIndex;
      // 获取图表实例
      const chart = chartRef.value[0];

      // 动态设置颜色
      state.roadCharts[0].option.series[0].itemStyle = {
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
      chart.setOption(state.roadCharts[0].option);
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
        width: 265,
        height: 265
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
            color: '#13314C',
          },
        },
      ],
    }
  ],
};
</script>

<style lang="scss" scoped>
.rural-road {
  width: 100%;
  height: 100%;
  padding: 17px 12px 10px;
  position: relative;
}

.rural-road-top {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;

  .rural-road-top-item {
    width: 460px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-image: url('assets/image/highwayOperation/内容背景大.png');
    background-size: 100% 100%;

    .rural-road-top-item-icon {
      width: 120px;
      height: 97px;
    }

    .rural-road-top-item-content {
      margin-left: 20px;
    }

    .rural-road-top-item-name {
      height: 46px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 10px;
    }

    .rural-road-top-item-distance {
      height: 62px;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 48px;
      line-height: 62px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.rural-road-bottom {
  width: 100%;
  height: 330px;
  background-image: url('assets/image/highwayOperation/内容背景大.png');
  background-size: 100% 100%;
  padding: 30px 0px 20px;

  .rural-road-bottom-left {
    width: 23%;
    height: 100%;
    // background-image: url('assets/image/highwayOperation/饼图背景.png');
    // background-size: 85% 95%;
    // background-position: center;
    // background-repeat: no-repeat;
  }

  .rural-road-bottom-right {
    width: 77%;
    height: 100%;

    .rural-road-bottom-right-item {
      .rural-road-bottom-right-item-title {
        margin-left: 30px;

        .rural-road-bottom-right-item-title-icon {
          width: 97px;
          height: 79px;
        }

        .rural-road-bottom-right-item-title-name {
          height: 58px;
          line-height: 58px;
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 42px;
          color: #A3D9FF;
          font-style: normal;
          text-transform: none;
          padding: 0px 20px;
        }

        .rural-road-bottom-right-item-title-value {
          height: 50px;
          line-height: 58px;
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .rural-road-bottom-right-item-content {
        width: 100%;
      }
    }
  }
}
</style>
