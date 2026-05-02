<template>
  <div class="chat-box">
    <div class="title"></div>
    <div class="flex h-full">
      <div class="h-[458px] w-full mt-[22px] flex pl-[20px] pr-[20px]">
        <div class="flex-1 mr-[22px]">
          <item-com title="新改建完成进度"
            style="width: 416px; height: 458px;background: url('src/assets/image/sector/切图 162.png') no-repeat center/cover;">
            <div class="title-item">规划3500公里</div>
            <v-chart :option="option1" autoresize style="height: 80%; width: 100%;" />
          </item-com>
        </div>
        <div class="flex-1 mr-[22px]">
          <item-com title="危桥危隧完成进度"
            style="width: 416px; height: 458px;background: url('src/assets/image/sector/切图 162.png') no-repeat center/cover;">
            <div class="title-item">规划49座</div>
            <v-chart :option="option2" autoresize style="height: 80%; width: 100%;" />
          </item-com>
        </div>
        <div class="flex-1">
          <item-com title="安防完成进度"
            style="width: 416px; height: 458px;background: url('src/assets/image/sector/切图 162.png') no-repeat center/cover;">
            <div class="title-item">规划97公里</div>
            <v-chart :option="option3" autoresize style="height: 80%; width: 100%;" />
          </item-com>
        </div>
      </div>
      <div class="h-[458px] w-full mt-[22px]">
        <item-com title="各行政区投资完成情况"
          style="width: 1301px; height: 458px; margin: 0 auto;position: relative; background: url('src/assets/image/sector/切图 159.png') no-repeat center/cover;">
          <div class='dw'>单位：亿元</div>
          <div class="arr-left" @click="handleClick('left')"></div>
          <div class="arr-right" @click="handleClick('right')"></div>
          <v-chart :option="option4" autoresize style="height: 100%; width: 100%;" />
        </item-com>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ItemCom from '../../module/planningProject/components/itemCom.vue'

function getGaugeOption(val) {
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
      center: ['50%', '81%'],
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
        center: ["50%", "85%"],
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
          formatter: function (v) { return v }
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
const option1 = ref(getGaugeOption(60))
const option2 = ref(getGaugeOption(73))
const option3 = ref(getGaugeOption(40))


const scale = 1;
const color = "#189cbb";
function getGaugeOption1(val) {
  return {
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
      data: val.xdata || [],
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
        data: val.yData1 || []
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
        data: val.yData2 || []
      }]
  }
}

const data = {
  xdata: ['丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县'],
  yData1: [300, 280, 450, 320, 380, 330],
  yData2: [250, 220, 380, 280, 320, 220]
}
const option4 = ref(getGaugeOption1(data))

function handleClick(arr) {
  // console.log('触发点击');
  switch (arr) {
    case 'left':
      alert('点击left')
      break;
    case 'right':
      alert('点击right')
      break;

    default:
      break;
  }
  // 赋值
  // option4.value = getGaugeOption1({})
}

</script>

<style lang="scss" scoped>
.chat-box {
  position: relative;
  height: 100%;

  .title {
    position: absolute;
    top: -60px;
    left: 0;
    background: url('assets/image/sector/切图 163.png') no-repeat;
    width: 450px;
    height: 58px;
  }

  .title-item {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 34px;
    color: #2FE3FF;
    line-height: 47px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.dw {
  position: absolute;
  top: 88px;
  left: 51px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 30px;
  color: #C6CECF;
  line-height: 41px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.arr-left {
  cursor: pointer;
  background: url('assets/image/sector/切图 152.png') no-repeat center/cover;
  width: 37px;
  height: 37px;
  position: absolute;
  bottom: 25px;
  left: 117px;
  pointer-events: all;
  z-index: 999;
}

.arr-right {
  cursor: pointer;
  background: url('assets/image/sector/切图 152.png') no-repeat center/cover;
  transform: rotate(180deg);
  width: 37px;
  height: 37px;
  position: absolute;
  bottom: 25px;
  right: 73px;
  pointer-events: all;
  z-index: 999;
}
</style>
