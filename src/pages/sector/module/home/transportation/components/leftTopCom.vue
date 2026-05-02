<template>
  <div class="top-box">
    <div class="kwz">
      <div class="top-title">
        <div class="icon">
          <img class="icon" :src="png1" alt="">
        </div>
        <div class="name mt-[10px] ml-[-20px]">
          <img class="name" :src="png2" alt="">
        </div>
      </div>
      <div class="top-one">
        <div class="warning cursor-pointer" @click="handleDialogClick('alarm')"></div>
        <div class="top-one-left">
          <div class="flex items-center">
            <div class="title-icon top-one-right-name">入网率</div>
            <div class="slider-box">
              <div class="active-line line1" :style="{ width: '100%' }">
                <div class="slider-icon icon1"></div>
              </div>
            </div>
            <div class="top-one-numb num1">100<span>%</span></div>
          </div>
          <div class="flex items-center">
            <div class="title-icon top-one-right-name">上线率</div>
            <div class="slider-box">
              <div class="active-line line2" :style="{ width: '90.3%' }">
                <div class="slider-icon"></div>
              </div>
            </div>
            <div class="top-one-numb num2">90.3<span>%</span></div>
          </div>
        </div>
        <div class="top-one-right">
          <div class="title-icon top-one-right-name">实时在线车辆数</div>
          <nub-com :need="false" :formatLength="5" />
        </div>
        <div></div>
      </div>
      <div class="top-two">
        <div class="top-left">
          <div class="tl-line"></div>
          <div class="tl-row"></div>
          <div class="tl-content">
            <div class="tl-item item1">
              <div class="tl-icon"></div>
              <div>
                <div class="flex items-center">
                  <div class="tl-name">企业</div>
                  <div class="tl-hand"></div>
                </div>
                <div class="tl-count">218<span>家</span></div>
              </div>
            </div>
            <div class="tl-item item2">
              <div class="tl-icon"></div>
              <div>
                <div class="flex items-center">
                  <div class="tl-name">人员</div>
                  <div class="tl-hand"></div>
                </div>
                <div class="tl-count">5357<span>人</span></div>
              </div>
            </div>
            <div class="tl-item item3">
              <div class="tl-icon"></div>
              <div>
                <div class="flex items-center">
                  <div class="tl-name">车辆</div>
                  <div class="tl-hand"></div>
                </div>
                <div class="tl-count">3538<span>辆</span></div>
              </div>
            </div>
            <div class="tl-item item4">
              <div class="tl-icon"></div>
              <div>
                <div class="flex items-center">
                  <div class="tl-name">平台</div>
                  <div class="tl-hand"></div>
                </div>
                <div class="tl-count">47<span>个</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-right">
          <v-chart :option="pieOption" style="height: 310px; width: 100%;" />
          <div class="arr right-[0] top-[13%]" @click="handleDialogClick('busTransportation')"></div>
          <div class="arr right-[0] top-[35%]" @click="handleDialogClick('charteredCar')"></div>
          <div class="arr right-[0] top-[55%]" @click="handleDialogClick('hazardousGoods')"></div>
          <div class="arr right-[0] top-[76%]" @click="handleDialogClick('heavyFreight')"></div>
        </div>
      </div>
    </div>
    <div class="glky">
      <div class="top-title">
        <div class="icon">
          <img class="icon" :src="png3" alt="">
        </div>
        <div class="name mt-[10px] ml-[-20px]">
          <img class="name" :src="png4" alt="">
        </div>
      </div>
      <div class="timer-box">
        <span>更新时间：</span>
        <span>2025/08/18 16:05:24</span>
      </div>
      <div class="arr top-[0] right-[0] cursor-pointer" @click="handleDialogClick('passenger')"></div>
      <div class="glky-box">
        <div class="glky-name title-icon">今日旅客发送量：</div>
        <div class="glky-content">
          <div class="glky-count">491837</div>
          <div class="glky-unit">人次</div>
        </div>
      </div>
    </div>
    <div class="glhy">
      <div class="top-title">
        <div class="icon">
          <img class="icon" :src="png5" alt="">
        </div>
        <div class="name mt-[10px] ml-[-20px]">
          <img class="name" :src="png6" alt="">
        </div>
      </div>
      <div class="timer-box">
        <span>更新时间：</span>
        <span>2025/08/18 16:05:24</span>
      </div>
      <div class="glhy-bg">
        <div class="glhy-content flex items-center top-[-30px]">
          <div class="glhy-name title-icon ">高速货运量：</div>
          <div class="left-arr"></div>
          <nub-com :need="true" :formatLength="7" unit="万吨" />
          <div class="right-arr"></div>
          <div class="arr right-[0] cursor-pointer" @click="handleDialogClick('highSpeedFreight')"></div>
        </div>
        <div class="glhy-content flex items-center top-[-25px]">
          <div class="glhy-name title-icon">车辆治超检测：</div>
          <div class="left-arr"></div>
          <nub-com :need="true" :formatLength="7" unit="辆" />
          <div class="right-arr"></div>
          <div class="arr right-[0] cursor-pointer" @click="handleDialogClick('overloadDetection')"></div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="arr"></div>
      <div class="btn cursor-pointer" @click="handleDialogClick('comprehensive')">修驾租</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NubCom from './NubCom.vue'
import * as echarts from 'echarts'
import { storeToRefs } from "pinia";
import { useOverloadDetectionStore, useComprehensiveStore, useHighSpeedFreightStore, useCharteredCarStore, useTransportationDialogStore } from '../store/index'
const OverloadDetectionStore = useOverloadDetectionStore()
const ComprehensiveStore = useComprehensiveStore()
const HighSpeedFreightStore = useHighSpeedFreightStore()
const charteredCarStore = useCharteredCarStore()
const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

import png1 from "src/assets/component/道水路运输系统-首页_slices/切图 503.png";
import png2 from "src/assets/component/道水路运输系统-首页_slices/切图 504.png";
import png3 from "src/assets/component/道水路运输系统-首页_slices/切图 523.png";
import png4 from "src/assets/component/道水路运输系统-首页_slices/切图 524.png";
import png5 from "src/assets/component/道水路运输系统-首页_slices/切图 532.png";
import png6 from "src/assets/component/道水路运输系统-首页_slices/切图 533.png";

const pieOption = ref({})

/**
  * 堆叠柱状图
  * @param dataSource 堆叠数据源,seriesDataLabel数据label,stack堆叠,colorArrow颜色渐变方向,isPositive是否是正数
  * @param yAxisData  y轴数据
  * @param unit 单位
  * @param colors 颜色
  * @param isPositive 是否是正数
  */
const seriesDataLabel = {
  show: true,
  position: 'inside',
  color: '#fff',
  formatter: function (params) {

    return -params.data.value;
  }
}
const {
  dataSource = [],
  yAxisData = [],
  unit = '',
  colors = [
    ['rgba(157, 236, 219, 1)', 'rgba(79, 147, 154, 1)'],
    ['rgba(154, 79, 79, 1)', 'rgba(236, 157, 157, 1)']
  ],
  isPositive = true,
} = {
  unit: "",
  dataSource: [
    {
      data: [
        { isPositive: true, value: 134 },
        { isPositive: true, value: 83 },
        { isPositive: true, value: 83 },
        { isPositive: true, value: 134 }
      ].map(i => {
        i.value = -i.value;
        return i
      }),
      name: '注册',
      stack: 'Total',
      seriesDataLabel,
      colorArrow: 'left',

    },
    {
      data: [94, 26, 36, 103],
      name: '实时',
      stack: 'Total',
    },
  ],
  yAxisData: ['班车客运', '包车客运', '危货运输', '重型货运']
};
let seriesData = [];
let legendNames = [];
dataSource && dataSource.forEach((item, index) => {
  legendNames.push(item.name);
  seriesData.push({
    name: item.name,
    type: 'bar',
    barWidth: 18,
    label: item.seriesDataLabel ? item.seriesDataLabel : {
      show: true,
      position: 'inside',
      color: '#fff',
      // fontSize: 11,
      // fontWeight: 500,
    },
    itemStyle: {
      barBorderRadius: 3,
      ...(Array.isArray(colors[index]) && colors[index].length > 1 ? {
        color: item.colorArrow && item.colorArrow === 'left' ?
          new echarts.graphic.LinearGradient(
            1, 0, 0, 0, [{
              offset: 1,
              color: colors[index][0]
            },
            {
              offset: 0,
              color: colors[index][1]
            }
          ]
          ) :
          new echarts.graphic.LinearGradient(
            0, 0, 1, 0, [{
              offset: 0,
              color: colors[index][0]
            },
            {
              offset: 1,
              color: colors[index][1]
            }
          ]
          )
      } : {}),
    },
    stack: item.stack ? item.stack : false,
    emphasis: {
      focus: 'series'
    },
    data: item.data
  })
})
pieOption.value = {
  // backgroundColor: 'rgba(19, 45, 85, 1)',
  dataZoom: dataZoomLS('y', yAxisData.length > 7 ? true : false, 6),
  color: colors,
  tooltip: deepMerge(tooltipLS(unit), {
    formatter: function (params) {
      let result = params.map(function (item, index) {
        return '<div><span style="display:inline-block;margin-right:5px;border-radius:2px;width:20px;height:10px;background:linear-gradient(90deg,' + colors[index][0] + ',' + colors[index][1] + ');' + '">' + '</span>' + item.seriesName + ': ' + ((typeof item.data === 'object' && item.data !== null) ? (item.data.isPositive ? item.data.value * -1 : item.data.value) : item.data) + unit + '</idv>';
      });
      result.unshift(`<div style="text-align: center">${params[0].name}</div>`);
      return result.join(' ');
    }
  }),
  legend: {
    textStyle: {
      color: '#EEE',
      fontSize: '20'
    },
    data: legendNames || []
  },
  grid: {
    left: '5%',
    right: 50,
    bottom: '3%',
    top: 30,
    containLabel: true
  },
  xAxis: deepMerge(xAxisLS('value', [], ''), {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
      formatter: function (value, index) {
        //把负数变成正数
        if (isPositive && (value < 0)) {
          value = Math.abs(value);
        }
        return value;
      }
    }
  }),
  yAxis: deepMerge(yAxisLS('category', yAxisData), {
    axisLine: {
      show: true
    }
  }),
  series: seriesData,
}
function tooltipLS(unit, trigger = 'axis') {
  return {
    trigger,
    padding: 15,
    axisPointer: {
      type: 'shadow',//cross
      label: {
        show: true,
        backgroundColor: '#333333',
      },
    },
    backgroundColor: 'rgba(10,26,52,0.7)', // 提示框浮层的背景颜色。
    borderRadius: 15,
    textStyle: { // 提示框浮层的文本样式。
    },
    extraCssText: 'box-shadow: 0 2px 25px #5cc0fd inset',
    formatter: function (params) {
      let result = params.map(function (item) {
        return '<div>' + item.marker + item.seriesName + ': ' + item.value + unit + '</idv>';
      });
      result.unshift(`<div style="text-align: center">${params[0].name}</div>`);
      return result.join(' ');
    }
  };
}
function xAxisLS(type = 'category', data, unit) {
  const axisLabel = {
    show: true,
    fontSize: 12,
    textStyle: {
      color: 'rgba(172, 201, 226, 1)',
    },
  };
  const axisTick = {
    show: true,

  };
  const axisLine = {
    show: true,
    lineStyle: {
      color: 'rgba(200, 225, 246, 1)',
      type: 'solid',
    },
  };
  const splitLine = {
    show: false,
    lineStyle: {
      color: 'rgba(160, 222, 255, 1)',
      type: 'dashed',
      opacity: 0.3
    },
  };
  const name = unit
  if (type == 'category') {
    return {
      name,
      data: data || [],
      type: 'category',
      axisLabel,
      axisTick,
      axisLine,
      splitLine,
    };
  } else {
    return {
      name,
      type: 'value',
      axisLabel,
      axisTick,
      axisLine,
      splitLine,
    };
  }
}
function yAxisLS(type = 'value', data, unit, inverse = true) {
  const axisLabel = {
    show: true,
    showMaxLabel: true,
    fontSize: 32,
    textStyle: {
      color: 'rgba(172, 201, 226, 1)',
    },
  };
  const nameTextStyle = {
    lineHeight: 20
  }
  const axisTick = {
    show: false,

  };
  const axisLine = {
    show: false,
    lineStyle: {
      color: 'rgba(200, 225, 246, 1)',
      type: 'solid',
    },
  };
  const splitLine = {
    show: false,
    lineStyle: {
      color: 'rgba(160, 222, 255, 1)',
      type: 'dashed',
      opacity: 0.3
    },
  };
  const name = unit
  if (type == 'category') {
    return {
      inverse,
      name,
      nameTextStyle,
      data: data || [],
      type: 'category',
      axisLabel,
      axisTick,
      axisLine,
      splitLine,
    };
  } else {
    return {
      name,
      nameTextStyle,
      type: 'value',
      axisLabel,
      axisTick,
      axisLine,
      splitLine,
    };
  }
}
function dataZoomLS(type = 'y', show = true, endValue = 6, start = 0) {
  const zoomLock = true //禁止拉伸
  const width = 8
  const yAxisIndex = 0
  const top = 20
  const right = 10
  const startValue = 0;
  const handleIcon = "M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z";
  const handleSize = "100%"
  const handleStyle = {
    color: "#066a7a",
  }
  const backgroundColor = "transparent"
  const fillerColor = "#066a7a"
  const textStyle = {
    color: "transparent",
  }
  const dataBackground = {
    lineStyle: {
      color: "transparent",
    },
    areaStyle: {
      color: "transparent",
    },
  }
  const borderColor = "transparent"
  if (type == 'y') {
    return {
      show,
      zoomLock, //禁止拉伸
      width,
      yAxisIndex,
      start,
      top,
      right,
      startValue,
      endValue,
      handleIcon,
      handleSize,
      handleStyle,
      backgroundColor,
      fillerColor,
      textStyle,
      dataBackground,
      borderColor,
    }
  } else {
    return {
      show,
      zoomLock, //禁止拉伸
      width,
      // bottom: 30,
      top,
      right,
      startValue,
      endValue,
      handleIcon,
      handleSize,
      handleStyle,
      backgroundColor,
      fillerColor,
      textStyle,
      dataBackground,
      borderColor,
    }
  }
}
function timelineLS(timeLineData = [], playInterval = 3000, currentIndex = 0, type = 'category', tooltipUnit = '') {
  return {
    show: true,
    axisType: type,
    tooltip: {
      show: true,
      formatter: function (params) {
        return params.name + tooltipUnit;
      }
    },
    autoPlay: true,
    currentIndex,
    playInterval,
    label: {
      show: true,
      interval: 'auto',
      color: '#B6D3FF',
      emphasis: {
        color: '#3686FF',
        borderColor: "#3686FF",
      }
    },
    itemStyle: {
      color: '#B6D3FF',
      borderColor: '#B6D3FF',
      emphasis: {
        color: '#3686FF',
        borderColor: "#3686FF",
      }
    },
    lineStyle: {
      // color: '#B6D3FF'
    },
    checkpointStyle: {
      color: '#3686FF',
      borderColor: "#3686FF",
      emphasis: {
        color: '#3686FF',
        borderColor: "#3686FF",
      }
    },
    controlStyle: {
      color: '#B6D3FF',
      borderColor: '#B6D3FF',
      emphasis: {
        color: '#3686FF',
        borderColor: "#3686FF",
      }
    },
    data: timeLineData
  }
}
function deepMerge(target, merged) {
  for (var key in merged) {
    if (target[key] && typeof target[key] === "object") {
      deepMerge(target[key], merged[key]);

      continue;
    }

    if (typeof merged[key] === "object") {
      target[key] = _.cloneDeep(merged[key]);

      continue;
    }

    target[key] = merged[key];
  }

  return target;
}

const handleDialogClick = (value) => {
  storeTransportationDialog.setShowTransportationDialog(value)
}
</script>

<style lang="scss" scoped>
.top-box {
  .top-title {
    display: flex;
    align-items: center;

    &>.icon {
      width: 154px;
      height: 126px;
    }

    &>.name {
      width: 369px;
      height: 58px;
    }
  }
}

.timer-box {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 30px;
  color: #A3BFD8;
  line-height: 42px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: absolute;
  top: 15px;
  left: 65%;
}

.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat 100%/100%;
  z-index: 99;
  pointer-events: all;
  position: absolute;
}

.kwz {
  width: 1436px;
  height: 667px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 513.png') no-repeat center/cover;
  margin-top: 30px;
  margin-left: 30px;

  .top-one {
    margin: 0 auto;
    width: 1405px;
    height: 196px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 512.png') no-repeat center/cover;
    position: relative;
    display: flex;
    align-items: center;

    .warning {
      position: absolute;
      width: 60px;
      height: 59px;
      background: url('assets/component/道水路运输系统-首页_slices/切图 511.png') no-repeat center/cover;
      top: 0;
      right: 0;
      z-index: 99;
    }

    .top-one-left {
      width: 60%;
      height: 100%;
      padding: 20px 0;
      padding-right: 50px;
      margin-left: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .slider-box {
        position: relative;
        width: 350px;
        background: #1e5386;
        height: 19px;
        border-radius: 94px;
        margin: 0 30px;

        .active-line {
          width: 0;
          height: 19px;
          position: absolute;
          border-radius: 94px;
          top: 0;
          left: 0;

          .slider-icon {
            position: absolute;
            width: 54px;
            height: 54px;
            top: 50%;
            transform: translateY(-50%) translateX(30%);
            right: 0;
          }
        }
      }

      .line1 {
        background: linear-gradient(90deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);

        &>.slider-icon {
          background: url('assets/component/道水路运输系统-首页_slices/切图 508.png') no-repeat center/cover;
        }
      }

      .line2 {
        background: linear-gradient(90deg, #4F799A 0%, #4F99D3 50%, #9DC9EC 100%);

        &>.slider-icon {
          background: url('assets/component/道水路运输系统-首页_slices/切图 509.png') no-repeat center/cover;
        }
      }

      .num1 {
        background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
      }

      .num2 {
        background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
      }

      .top-one-numb {
        flex: 1;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 52px;
        line-height: 71px;
        text-align: right;
        font-style: normal;
        text-transform: none;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &>span {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 41px;
          line-height: 57px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          -webkit-text-fill-color: #EEF8FF;
        }
      }
    }

    .top-one-right-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .top-one-right {}
  }

  .top-two {
    display: flex;
    justify-content: space-between;
    margin: 0 15px;
    margin-top: 15px;

    .top-left {
      width: 649px;
      height: 314px;
      background: url('assets/component/道水路运输系统-首页_slices/切图 515.png') no-repeat center/cover;
      position: relative;

      .tl-line {
        position: absolute;
        background: url('assets/component/道水路运输系统-首页_slices/切图 563.png') no-repeat center/cover;
        width: 606px;
        height: 6px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .tl-row {
        position: absolute;
        background: url('assets/component/道水路运输系统-首页_slices/切图 564.png') no-repeat center/cover;
        width: 6px;
        height: 224px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .tl-content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        .tl-item {
          height: 152px;
          display: flex;
          align-items: center;
          padding-left: 15px;
          padding-top: 10px;

          .tl-icon {
            width: 79px;
            height: 79px;
            margin-right: 10px;
          }

          .tl-name {
            font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
            font-weight: 500;
            font-size: 38px;
            color: #A3D9FF;
            line-height: 52px;
            text-align: left;
            font-style: normal;
            text-transform: none;
            margin-right: 20px;
          }

          .tl-hand {
            width: 46px;
            height: 45px;
            background: url('assets/component/道水路运输系统-首页_slices/切图 517.png') no-repeat center/cover;
          }

          .tl-count {
            font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
            font-weight: 400;
            font-size: 50px;
            line-height: 70px;
            letter-spacing: 1px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }

        .item1 {
          &>.tl-icon {
            background: url('assets/component/道水路运输系统-首页_slices/切图 518.png') no-repeat center/cover;
          }

          .tl-count {
            background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .item2 {
          &>.tl-icon {
            background: url('assets/component/道水路运输系统-首页_slices/切图 520.png') no-repeat center/cover;
          }

          .tl-count {
            background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .item3 {
          &>.tl-icon {
            background: url('assets/component/道水路运输系统-首页_slices/切图 519.png') no-repeat center/cover;
          }

          .tl-count {
            background: linear-gradient(141deg, #68EBFF 0%, #54C6FB 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        .item4 {
          &>.tl-icon {
            background: url('assets/component/道水路运输系统-首页_slices/切图 521.png') no-repeat center/cover;
          }

          .tl-count {
            background: linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }

    .top-right {
      width: 739px;
      height: 314px;
      background: url('assets/component/道水路运输系统-首页_slices/切图 516.png') no-repeat center/cover;
      position: relative;
    }
  }
}

.title-icon {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    width: 22.62px;
    height: 22.31px;
    background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.glky {
  width: 1436px;
  height: 220px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 526.png') no-repeat center/cover;
  // margin-top: 30px;
  margin-left: 30px;
  position: relative;

  .glky-box {
    margin-top: 20px;
    margin-left: 50px;
    display: flex;
    justify-content: space-between;

    // align-items: center;
    .glky-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .glky-content {
      margin-top: -65px;
      margin-right: 80px;
      padding-bottom: 15px;
      width: 836px;
      height: 115px;
      background: url('assets/component/道水路运输系统-首页_slices/切图 525.png') no-repeat center/cover;
      display: flex;
      align-items: end;
      justify-content: center;

      .glky-count {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 66px;
        line-height: 92px;
        letter-spacing: 5px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .glky-unit {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 47px;
        color: #A3D9FF;
        line-height: 85px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        margin-left: 40px;
      }
    }
  }
}

.glhy {
  width: 1436px;
  height: 351px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 528.png') no-repeat center/cover;
  // margin-top: 30px;
  margin-left: 30px;
  position: relative;

  .glhy-bg {
    width: 1436px;
    height: 221px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 529.png') no-repeat center/cover;
    position: relative;

    .glhy-content {
      position: relative;
      padding-left: 50px;

      .left-arr {
        background: url('assets/component/道水路运输系统-首页_slices/切图 530.png') no-repeat center/cover;
        width: 51px;
        height: 119px;
        margin-right: 30px;
      }

      .right-arr {
        background: url('assets/component/道水路运输系统-首页_slices/切图 531.png') no-repeat center/cover;
        width: 51px;
        height: 119px;

      }

      .glhy-name {
        width: 350px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 42px;
        color: #A3D9FF;
        line-height: 58px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

.bottom-btn {
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 30px;

  // width: 100%;
  &>.arr {
    width: 537px;
    height: 64px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 534.png') no-repeat center/cover;
    position: relative;
  }

  .btn {
    width: 187px;
    height: 53px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 535.png') no-repeat center/cover;
    margin-left: 20px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 38px;
    line-height: 52px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    color: rgba(236, 248, 255, 1);
  }
}
</style>
