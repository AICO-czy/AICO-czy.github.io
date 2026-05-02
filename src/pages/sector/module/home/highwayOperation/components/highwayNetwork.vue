<!-- 公路运营-基础概况-承德市公路网 -->
<template>
  <div class="highwayNetwork row justify-between">
    <div class="highwayNetwork-arrow" @click="handleClick">&nbsp;</div>
    <div class="highwayNetwork-left column justify-between">
      <div class="highwayNetwork-left-top row items-center">
        <q-icon class="top-icon" :name="`img:${icon1}`"></q-icon>
        <div class="top-title">公路网密度:</div>
        <div class="top-value-box row justify-center items-center">
          <span class="top-value">60.8</span>
          <span class="top-unit">公里/百平方公里</span>
        </div>
      </div>
      <div class="row highwayNetwork-left-bottom">
        <div class="column highwayNetwork-left-bottom-chart1">
          <div class="chart-title row items-center">
            <!-- <q-icon class="chart-title-icon" :name="`img:${icon2}`"></q-icon> -->
            <span class="chart-title-name">
              桥隧比
            </span>
          </div>
          <div class="col chart-content">
            <v-chart ref="chartRefPie" :option="optionPie" class="fit" />
          </div>
        </div>
        <div class="highSpeed-isolation"></div>
        <div class="column highwayNetwork-left-bottom-chart2">
          <div class="chart-title row items-center">
            <!-- <q-icon class="chart-title-icon" :name="`img:${icon3}`"></q-icon> -->
            <span class="chart-title-name">
              桥梁：
            </span>
            <span class="chart-title-value">1689座</span>
          </div>
          <div class="col chart-content">
            <v-chart ref="chartRefPie" :option="optionPie1" class="fit" />
          </div>
        </div>
        <div class="column highwayNetwork-left-bottom-chart3">
          <div class="chart-title row items-center">
            <!-- <q-icon class="chart-title-icon" :name="`img:${icon4}`"></q-icon> -->
            <span class="chart-title-name">
              隧道：
            </span>
            <span class="chart-title-value">52座</span>
          </div>
          <div class="col chart-content1">
            <v-chart autoresize :option="pieOption2" class="fit" />
          </div>
        </div>
      </div>
    </div>
    <div class="highwayNetwork-right column justify-between">
      <div class="column highwayNetwork-right-top items-center justify-center no-wrap">
        <!-- <q-icon class="right-icon" :name="`img:${icon5}`"></q-icon> -->
        <div class="right-value">
          79个
        </div>
        <div class="right-name">
          机电设备
        </div>
      </div>
      <div class="column items-center justify-center no-wrap highwayNetwork-right-bottom">
        <!-- <q-icon class="right-icon" :name="`img:${icon6}`"></q-icon> -->
        <div class="right-value">
          31处
        </div>
        <div class="right-name">
          结构物健康监测
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch, reactive, ref } from "vue";
import * as echarts from 'echarts'
import icon1 from 'src/assets/image/highwayOperation/highwayNetwork/切图 240.png'
// import icon2 from 'src/assets/image/highwayOperation/highwayNetwork/切图 241.png'
// import icon3 from 'src/assets/image/highwayOperation/highwayNetwork/切图 242.png'
// import icon4 from 'src/assets/image/highwayOperation/highwayNetwork/切图 243.png'
// import icon5 from 'src/assets/image/highwayOperation/highwayNetwork/切图 244.png'
// import icon6 from 'src/assets/image/highwayOperation/highwayNetwork/切图 245.png'

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
        color: '#B7C4CC',
        foontWeight: '500',
      },
    },
  ],
  graphic: { // 这个属性可以在饼图内部填充图片,文字等
    elements: [{
      type: 'image',//需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
      style: {
        image: 'src/assets/image/highwayOperation/饼图背景.png', //这里添加图片地址
        width: 230,
        height: 230
      },
      left: 'center',//
      top: 'center' //配置图片居中
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
      radius: ['60%', '67%'],
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
            color: '#13314c',
          },
        },
      ],
    }
  ],
};
const optionPie1 = {
  title: [
    {
      text: '特大桥',
      left: '15%',
      top: '32%',
      textStyle: {
        color: '#A8C4D8',
        fontSize: 40,
        fontWeight: '500',
      },
    },
    {
      text: '67座',
      left: '18%',
      top: '52%',
      textStyle: {
        fontSize: 40,
        color: '#B7C4CC',
        foontWeight: '400',
      },
    },
  ],
  tooltip: {
    trigger: 'item',
  },
  // 图例
  legend: {
    orient: 'vertical',
    right: '2%',
    top: '20%',
    data: ['特大桥', '大桥', '中桥', '小桥'],
    textStyle: {
      color: '#A3BFD8',
      fontSize: 30
    },
    itemGap: 20, // 图例项之间的间距
    itemWidth: 20, // 图例标记的宽度
    itemHeight: 20 // 图例标记的高度
  },
  series: [
    // 左饼图
    {
      // 饼图圈
      hoverAnimation: false,
      type: 'pie',
      zlevel: 3,
      padAngle: 7,
      radius: ['50%', '60%'],
      center: ['30%', '50%'],
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
      data: [
        {
          name: '特大桥',
          value: 30,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#FFBD81',
                },
                {
                  offset: 1,
                  color: '#FFD763',
                },
              ])
            },
          }
        },
        {
          name: '大桥',
          value: 35,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#17ECEF',
                },
                {
                  offset: 1,
                  color: '#25A9C7',
                },
              ])
            },
          }
        },
        {
          name: '中桥',
          value: 40,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#6FD19E',
                },
                {
                  offset: 1,
                  color: '#93EB85',
                },
              ])
            },
          }
        },
        {
          name: '小桥',
          value: 35,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#B0FAFF',
                },
                {
                  offset: 1,
                  color: '#18DDDF',
                },
              ])
            },
          }
        },
      ]
    },
    {
      // 最外圆圈
      type: 'pie',
      zlevel: 1,
      silent: true, //取消高亮
      radius: ['70%', '75%'],
      center: ['30%', '50%'],
      itemStyle: {
        normal: {
          show: false,
          color: '#4F6375',
        },
      },
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
      data: [100],
    }
  ],
};

function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  k = typeof k !== 'undefined' ? k : 1 / 3;

  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  let hoverRate = isHovered ? 1.05 : 1;

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 * height : -1;
    }
  };
}
function getPie3D(pieData: any[], internalDiameterRatio: number) {
  let series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {};
      if (typeof pieData[i].itemStyle.color != 'undefined') itemStyle.color = pieData[i].itemStyle.color;
      if (typeof pieData[i].itemStyle.opacity != 'undefined') itemStyle.opacity = pieData[i].itemStyle.opacity;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }

  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: { show: false },
    itemStyle: { opacity: 0.05, color: '#E1E8EC' },
    parametricEquation: {
      u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
      v: { min: 0, max: Math.PI, step: Math.PI / 20 },
      x: function (u: number, v: number) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: number, v: number) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: number, v: number) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      }
    }
  });

  return series;
}

const pieData2 = [
  { name: '特长隧道', value: 9, itemStyle: { color: '#F6E1B9', opacity: 0.6 } },
  { name: '长隧道', value: 20, itemStyle: { color: '#25A9C7', opacity: 0.6 } },
  { name: '中隧道', value: 13, itemStyle: { color: '#18DDDF', opacity: 0.6 } },
  { name: '短隧道', value: 10, itemStyle: { color: '#2C8E58', opacity: 0.6 } }
];

const series2 = getPie3D(pieData2, 0.7);
const pieOption2 = ref({
  backgroundColor: 'transparent',
  animation: true,
  silent: false,
  legend: [
    {
      data: [pieData2[0]?.name || ''],
      top: '15%',
      right: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[1]?.name || ''],
      top: '35%',
      right: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[2]?.name || ''],
      top: '55%',
      right: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    },
    {
      data: [pieData2[3]?.name || ''],
      top: '75%',
      right: '5%',
      orient: 'horizontal',
      itemWidth: 20,
      itemHeight: 12,
      width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 500,
        fontSize: 30,
        color: '#C6CECF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    }
  ],
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: 'rgba(0, 15, 30, 0.9)',
    borderColor: '#00D4FF',
    borderWidth: 2,
    padding: [12, 16],
    borderRadius: 6,
    textStyle: {
      fontSize: 14,
      fontFamily: 'AlibabaPuHuiTiRegular',
      color: '#FFFFFF'
    },
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
    formatter: function (params: any) {
      if (params.seriesName === 'mouseoutSeries') return '';
      const color = params.color || '#00D4FF';
      const name = params.seriesName;
      const pieDataItem = pieData2.find(item => item.name === name);
      const value = pieDataItem ? pieDataItem.value : 0;
      return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
                </div>
            </div>`;
    }
  },
  xAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  yAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  zAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  grid3D: {
    show: false,
    boxHeight: 0.8,
    top: '20%',
    left: '-15%',
    height: '60%',
    environment: 'none',
    light: {
      main: {
        intensity: 1.2,
        shadow: false
      },
      ambient: {
        intensity: 0.3
      }
    },
    viewControl: {
      distance: 120,
      alpha: 25,
      beta: 60,
      autoRotate: false,
      enableRotate: true,
      enableZoom: false,
      enablePan: false,
      mouseRotateSpeed: 1,
      mousePanSpeed: 0,
      mouseZoomSpeed: 0
    }
  },
  series: series2
});

const $emit = defineEmits(['openDialog', 'clickOpen']);

function handleClick() {
  // console.log('点击了');
  $emit('clickOpen');
}
</script>

<style lang="scss" scoped>
.highwayNetwork {
  width: 100%;
  height: 100%;
  padding: 17px 12px 16px;
  position: relative;

  .highwayNetwork-arrow {
    width: 60px;
    height: 60px;
    background-image: url('assets/image/highwayOperation/双箭头.png');
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    pointer-events: auto;
  }
}

.highwayNetwork-left {
  width: 79%;
  height: 100%;

  .highwayNetwork-left-top {
    width: 100%;
    height: 17%;
    background-image: url('assets/image/highwayOperation/内容背景长.png');
    background-size: 100% 100%;

    .top-icon {
      width: 24px;
      height: 24px;
      margin-left: 20px;
    }

    .top-title {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 20px;
    }

    .top-value-box {
      width: 714px;
      height: 66px;
      background-image: url('assets/image/highwayOperation/highwayNetwork/切图 239.png');
      background-size: 100% 100%;
      margin-left: 40px;

      .top-value {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 50px;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .top-unit {
        margin-left: 10px;
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 40px;
        color: #A3D9FF;
        line-height: 56px;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .highwayNetwork-left-bottom {
    width: 100%;
    height: 81%;
    background-image: url('assets/image/highwayOperation/内容背景大.png');
    background-size: 100% 100%;

    .chart-title {
      padding-top: 20px;
      padding-left: 10px;
    }

    .chart-title-icon {
      width: 109px;
      height: 89px;
    }

    .chart-title-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 35px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .chart-title-value {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 40px;
      letter-spacing: 1px;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .highwayNetwork-left-bottom-chart1 {
      width: 28%;
      height: 100%;
    }

    .highwayNetwork-left-bottom-chart2 {
      width: 35%;
      height: 100%;
    }

    .highwayNetwork-left-bottom-chart3 {
      width: 36%;
      height: 100%;
    }
  }
}

.highwayNetwork-right {
  width: 20%;
  height: 100%;

  .right-icon {
    width: 137px;
    height: 110px;
  }

  .right-value {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 600;
    font-size: 45px;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .right-name {
    width: 200px;
    font-family: AlibabaPuHuiTiRegular;
    font-size: 35px;
    color: #A3D9FF;
    font-style: normal;
    text-transform: none;
    text-align: center;
    margin-bottom: 20px;
  }

  .highwayNetwork-right-top {
    width: 100%;
    height: 240px;
    background-image: url('assets/image/highwayOperation/内容背景方.png');
    background-size: 100% 100%;
  }

  .highwayNetwork-right-bottom {
    width: 100%;
    height: 260px;
    background-image: url('assets/image/highwayOperation/内容背景方.png');
    background-size: 100% 100%;
  }
}

.chart-content1 {
  position: relative;
  width: 100%;
  height: 300px;

  &::before {
    content: '';
    position: absolute;
    top: -55px;
    left: 0px;
    right: 120px;
    bottom: -60px;
    border-radius: 50%;
    z-index: 1;
    pointer-events: none;
    animation: circle-glow 3s ease-in-out infinite;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: -55px;
    left: 0px;
    right: 120px;
    bottom: -60px;
    border-radius: 50%;
    background: radial-gradient(circle,
        rgba(0, 255, 255, 0.15) 0%,
        rgba(0, 200, 255, 0.1) 30%,
        rgba(100, 150, 255, 0.08) 50%,
        rgba(0, 255, 255, 0.05) 70%,
        rgba(0, 255, 255, 0) 100%);
    z-index: 0;
    pointer-events: none;
    animation: circle-pulse 3s ease-in-out infinite;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg);
  }

  >* {
    position: relative;
    z-index: 2;
    pointer-events: auto;
  }
}


@keyframes circle-pulse {

  0%,
  100% {
    opacity: 0.3;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1);
  }

  50% {
    opacity: 1;
    transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1.02);
    box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.5);
  }
}

.highSpeed-isolation {
  width: 10px;
  height: 300px;
  margin-top: 80px;
  background-image: url('assets/image/highwayOperation/线.png');
  background-size: 100% 100%;
}
</style>
