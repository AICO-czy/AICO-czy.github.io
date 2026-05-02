<!-- 执法案件弹窗 -->
<template>
  <div class="law-case-dialog">
    <div class="content-title">执法案件</div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column">
      <div class="content-box-select row items-center">
        <div class="agency-select-title">执法机构</div>
        <el-select v-model="state.selectAgency" :teleported="false" class="agency-select">
          <el-option v-for="item in state.agencyOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="content-box-chart col column">
        <div class="chart-top col">
          <v-chart :option="option1" autoplay class="fit" />
        </div>
        <div class="chart-bottom col">
          <v-chart :option="option2" autoplay class="fit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
import * as echarts from "echarts";

const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}
const state = reactive({
  selectAgency: "agency0",
  agencyOptions: [
    {
      value: "agency0",
      label: "全部",
    },
    {
      value: "agency1",
      label: "市本级",
    },
    {
      value: "agency2",
      label: "丰宁县",
    },
    {
      value: "agency3",
      label: "围场县",
    },
  ],
});

const option1 = ref({
  grid: {
    left: "5%",
    right: "5%",
    top: "20%",
    bottom: "10%"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      label: {
        show: true
      }
    }
  },
  legend: {
    data: ["案件数", "同比", "环比"],
    top: "7%",
    right: "7%",
    // icon: 'line[30, 5]', // 关键配置：[线的长度, 线的粗细]，数值越大线越大
    itemWidth: 60,
    itemHeight: 30,
    lineStyle: {
      width: 6
    },
    textStyle: {
      color: "#ffffff",
      fontSize: 28
    }
  },
  xAxis: {
    data: [
      '2024.12', '2025.01', '2025.02', '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08', '2025.09', '2025.10', '2025.11'
    ],
    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: true //隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#9EC0CC", //X轴文字颜色
        fontSize: 28,
      },
      margin: 30,
      // rotate: 30, // 旋转角度（如45度，范围-90到90）
      interval: 0, // 强制显示所有标签（默认可能自动隐藏）
      align: 'center', // 水平对齐方式（center/left/right）
      verticalAlign: 'middle' // 垂直对齐方式（middle/top/bottom）
    },
  },
  yAxis: [{
    type: "value",
    name: "件",
    splitNumber: 5,
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "center",
      padding: [0, 20, 20, 0],
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
        width: 1,
        type: 'dashed'
      },
    },
    axisTick: {
      show: true
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
  },
  {
    type: "value",
    position: "right",
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
      show: true,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    }
  }
  ],
  series: [{
    name: "同比",
    type: "line",
    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
    smooth: false, //平滑曲线显示
    showAllSymbol: true, //显示所有图形。
    symbol: "circle", //标记的图形为实心圆
    symbolSize: 11, //标记的大小
    itemStyle: {
      //折线拐点标志的样式
      color: "#fff"
    },
    lineStyle: {
      color: "#35BEDD",
      width: 2
    },
    areaStyle: {
      color: "rgba(53, 176, 221, 0.19)"
    },
    data: [15, 18, 16, 14, 22, 18, 20, 28, 38, 30, 32, 34]
  }, {
    name: "环比",
    type: "line",
    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
    smooth: false, //平滑曲线显示
    showAllSymbol: true, //显示所有图形。
    symbol: "circle", //标记的图形为实心圆
    symbolSize: 11, //标记的大小
    itemStyle: {
      //折线拐点标志的样式
      color: "#fff"
    },
    lineStyle: {
      color: "#FFCD61",
      width: 2
    },
    areaStyle: {
      color: "rgba(255, 205, 97, 0.2)"
    },
    data: [10, 8, 6, 4, 12, 8, 10, 8, 8, 10, 12, 14]
  },
  {
    name: "案件数",
    type: "bar",
    barWidth: 20,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: "#A0F9FF"
      },
      {
        offset: 0.5,
        color: "#4599ED"
      },
      {
        offset: 1,
        color: "#33679A"
      }
      ])
    },
    data: [90, 55, 50, 15, 85, 40, 60, 15, 60, 60, 70, 80]
  }
  ]
})

const option2 = ref({
  legend: {
    data: ["道路运政", "公路路政", "水路运政", "质量安全监督"],
    top: '5%',
    right: "5%",
    itemGap: 25,
    textStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 32,
      fontFamily: "SourceHanSansRegular",
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    }
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "5%",
    top: "17%",
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        show: true,
        margin: 30,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 26,
        },
      },
      data: ['2024.12', '2025.01', '2025.02', '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08', '2025.09', '2025.10', '2025.11'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "件",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
          type: 'dashed'
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '道路运政',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 189, 129, 1)', // 0% 处的颜色
              },
              {
                offset: 0,
                color: 'rgba(255, 189, 129, 0.51)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 189, 129, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120, 100, 120, 140, 160, 180],
    },
    {
      name: '公路路政',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(160, 249, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(69, 153, 237, 0.75)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120, 100, 120, 140, 160, 180],
    },
    {
      name: '水路运政',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(111, 242, 164, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(41, 206, 211, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 151, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [120, 60, 100, 90, 100, 120, 70, 100, 120, 140, 160, 180],
    },
    {
      name: '质量安全监督',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(136, 165, 235, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(102, 130, 200, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [80, 40, 70, 60, 70, 90, 50, 80, 40, 70, 60, 70],
    }
  ],
})
</script>

<style scoped lang="scss">
.law-case-dialog {
  width: 2240px;
  height: 1446.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 606px;
  padding: 175px 120px 80px 120px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 60px;
}

.content-title {
  width: 350px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 25px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.agency-select {
  width: 362px;
  height: 72px;
}

.agency-select-title {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #A9CEE8;
  line-height: 44px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  margin-right: 30px;
}

.agency-select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #164370;
  box-shadow: none;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.agency-select :deep(.el-select__placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #9fe2fd 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.agency-select :deep(.el-popper) {
  background-color: #164370;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.agency-select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}

.agency-select :deep(.el-select-dropdown__item.is-selected) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #9fe2fd;
  // color: #3d7fff;
}

.agency-select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #48607c !important;
}

.agency-select :deep(.el-select-dropdown__item) {
  width: 362px;
  height: 72px;
  color: #9fe2fd;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.agency-select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}

:deep(.el-select__icon) {
  width: 34px;
  height: 34px;
}

:deep(.el-select__icon svg) {
  width: 34px;
  height: 34px;
}
</style>
