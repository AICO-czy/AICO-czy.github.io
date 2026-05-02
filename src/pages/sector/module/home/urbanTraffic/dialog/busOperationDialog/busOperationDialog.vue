<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">公交运行情况</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="content-top-select row col-auto mt-[20px] mb-[12px]">
          <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
            :class="{ 'active': selsectBtn === item }" @click="handleSelect1(item)">
            {{ item }}
          </div>
        </div>
        <div class="col full-width">
          <q-scroll-area :thumb-style="state.thumbStyle" :bar-style="state.barStyle" class="fit">
            <div class="order-compare-content column">
              <ItemTitle title="今日客运量变化趋势"></ItemTitle>
              <v-chart :option="option1" autoplay class="col" />
            </div>
            <div class="enliven-compare-content column">
              <ItemTitle title="今日发车频率规律分析"></ItemTitle>
              <v-chart :option="option2" autoplay class="col" />
            </div>
            <div class="operation-compare-content column">
              <ItemTitle title="今日线路发车班次TOP5"></ItemTitle>
              <v-chart :option="option3" autoplay class="col" />
            </div>
            <div class="service-compare-content column">
              <ItemTitle title="今日线路行驶里程TOP5"></ItemTitle>
              <v-chart :option="option4" autoplay class="col" />
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useAnalyzeDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";

const storeAnalyzeDialog = useAnalyzeDialogStore();
const { showAnalyzeDialog } = storeToRefs(storeAnalyzeDialog);
const isDialogVisible = computed(() => showAnalyzeDialog.value === 'busOperation');
const selsectBtns = ['今日', '本月']
const selsectBtn = ref('今日')

const state = reactive({
  radio1: 'line',
  radio2: 'line',
  radio3: 'line',
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: 0.75,
  },
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: 0.2,
  },
});

function handleSelect1(item: any) {
  selsectBtn.value = item
}
const handleClose = () => {
  storeAnalyzeDialog.setShowAnalyzeDialog(''); // 假设store中有这样的方法
};

const option1 = ref({
  legend: {
    textStyle: {
      fontSize: 30,
      color: "rgba(198, 206, 207, 1)"
    },
    top: '5%',
    itemGap: 100, // 图例项之间的间距
    itemWidth: 20, // 图例标记的宽度
    itemHeight: 20 // 图例标记的高度
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '8%',
    top: '20%',
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      lineStyle: {
        color: "#C6CECF", //显示竖线颜色
        type: "solid",
      },
    },
    textStyle: {
      color: "#C6CECF"
    }
  },
  xAxis: [
    {
      // boundaryGap: false,
      type: "category",
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "#485051",
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: '#C6CECF',
          fontSize: 30,
          padding: [10, 0, 0, 0]
        },
      },
      axisTick: {
        show: false,
      },
      data: [
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
      ],
    },
  ],
  yAxis: [
    {
      name: '单位:人次',
      nameLocation: 'end',
      nameGap: 30,
      nameTextStyle: {
        color: '#C6CECF',
        fontSize: 30,
      },
      splitLine: {
        lineStyle: {
          color: "#485051",
        },
      },
      axisLine: {
        show: false,

      },
      axisLabel: {
        textStyle: {
          color: '#C6CECF',
          fontSize: 30,
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '今日',
      type: "line",
      smooth: true,
      showSymbol: true, //圆点显隐
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(53, 176, 221, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(53, 176, 221, 1)',
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(53, 176, 221, 0.20)",
              },
              {
                offset: 1,
                color: "rgba(53, 176, 221, 0)",
              },
            ],
            false
          ),

        },
      },
      data: [170, 120, 120, 110, 160],
    },
    {
      name: '上周同期',
      type: "line",
      smooth: true,
      showSymbol: true, //圆点显隐
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(206, 133, 92, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(206, 133, 92, 1)',
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(206, 133, 92, 0.38)",
              },
              {
                offset: 1,
                color: "rgba(206, 133, 92, 0)",
              },
            ],
            false
          ),

        },
      },
      data: [150, 170, 100, 90, 180],
    }],
})

const option2 = ref({
  grid: {
    left: '5%',
    right: '5%',
    bottom: '10%',
    top: '18%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['今日发车班次', '上周同期'],
    top: '1%',
    itemWidth: 30,
    itemHeight: 30,
    itemGap: 100,
    textStyle: {
      fontSize: 30,
      color: "rgba(198, 206, 207, 1)"
    }
  },
  xAxis: {
    data: ['05:50', '06:00', '06:30', '07:00', '07:30'],
    axisLine: {
      show: false, // 隐藏X轴轴线
      lineStyle: {
        color: 'rgba(221, 221, 221, 1)',
        width: 1
      }
    },
    axisTick: {
      show: false // 隐藏X轴刻度
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#C6CECF',
        fontSize: 30,
        padding: [10, 30, 0, 0]
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:班次',
      nameLocation: 'end',
      nameGap: 30,
      nameTextStyle: {
        color: '#C6CECF',
        fontSize: 30,
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)",
          width: 1
        }
      },
      axisLabel: {
        show: true,
        color: '#C6CECF',
        fontSize: 30,
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name: '今日发车班次',
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(160, 249, 255, 1)' // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: 'rgba(69, 153, 237, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(51, 103, 154, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: [320, 400, 330, 400, 400],
      zlevel: 10
    },
    {
      name: '上周同期',
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(255, 189, 129, 1)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(255, 189, 129, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      data: [280, 280, 280, 280, 280],
      zlevel: 10
    },
    {
      name: 'maxdata',
      type: 'custom',
      itemStyle: {
        color: 'rgba(200, 255, 248, 0.06)'
      },
      renderItem: function (params, api) {
        //获取对应类目的axisTick中心点坐标
        var start = api.coord([api.value(0)])

        //通过坐标系的宽度和类目数，计算单个类目的背景
        var width = (params.coordSys.width / 7) * 0.4

        return {
          type: 'rect',
          shape: {
            // 相对左上角坐标
            x: start[0] - width / 2,
            y: params.coordSys.y,
            width: width,
            height: params.coordSys.height
          },
          style: api.style()
        }
      },
      data: [0, 0, 0, 0, 0]
    }
  ]
})

const option3 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    itemWidth: 30,
    itemHeight: 30,
    itemGap: 100,
    top: '2%',
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
  },
  grid: {
    left: '5%',
    right: '15%',
    top: '10%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'value', // 产能和能耗使用的 x 轴
      name: '单位:班次',
      nameLocation: 'end',
      nameGap: 30,
      nameTextStyle: {
        color: '#C6CECF',
        fontSize: 30,
        padding: [50, 0, 0, 0]
      },
      axisLabel: {
        textStyle: {
          color: '#AEB8C0',
          fontSize: 30,
        },
      },
      splitLine: { show: false },
    }
  ],
  yAxis: {
    type: 'category',
    data: ['8路', '32路', '5路', '2路', '11路'], // 使用最近七天的日期
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(130, 144, 157, 0.34)",
        width: 2
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#768594',
      },
    },
    axisLabel: {
      textStyle: {
        color: '#AEB8C0',
        fontSize: 30,
      },
    },
    axisTick: { show: false }
  },
  series: [
    {
      name: '今日', // 修改为产能
      type: 'bar',
      barWidth: 20,
      data: [40, 25, 20, 17, 15], // 示例数据，根据实际情况调整
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(160, 249, 255, 1)",
            },
            {
              offset: 0.5,
              color: "rgba(69, 153, 237, 1)",
            },
            {
              offset: 1,
              color: "rgba(51, 103, 154, 0)",
            },
          ],
          false
        ),
      },
      label: {
        show: true,
        position: 'right',
        color: 'white',
        fontSize: 30,
      },
    },
    {
      name: '上周同期', // 修改为能耗
      type: 'bar',
      barWidth: 20,
      data: [31, 22, 19, 16, 14], // 示例数据，根据实际情况调整
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(141, 147, 158, 0)",
            },
            {
              offset: 0.5,
              color: "rgba(164, 170, 182, 1)",
            },
            {
              offset: 1,
              color: "rgba(193, 198, 207, 1)",
            },
          ],
          false
        ),
      },
      label: {
        show: true,
        position: 'right',
        color: 'white',
        fontSize: 30,
      },
    }
  ]
})

const option4 = ref({
  legend: {
    itemWidth: 30,
    itemHeight: 30,
    itemGap: 100,
    data: [{ name: '今日发车班次', icon: 'rect' }, { name: '上周同期', icon: 'rect' },   // 修改为长方形图标
      ''],
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    top: '1%',
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '8%',
    top: '10%',
    containLabel: true
  },
  xAxis: {
    data: ['5路', '32路', '2路', '11路', '28路'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [10, 30, 0, 0]
    },
    splitLine: { show: false, lineStyle: { type: 'dashed' } }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:班次',
      nameLocation: 'end',
      nameGap: 30,
      nameTextStyle: {
        color: '#C6CECF',
        fontSize: 30,
      },
      position: 'left',
      axisLabel: {
        color: '#C6CECF',
        fontSize: 30,
        formatter: '{value}'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)",
          width: 2
        }
      },
      min: 0,  // ✅ 强制从0开始
      // max: 25  // ✅ 设置合适最大值
    }
  ],
  color: ['#478af2'],
  series: [
    // 柱状图系列（主Y轴）
    {
      name: '今日发车班次',
      type: 'pictorialBar',
      barCategoryGap: '10%', // ✅ 调整柱子间距
      symbol: 'triangle',
      itemStyle: {
        normal: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0095FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 200, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [500, 420, 320, 300, 200],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '上周同期',
      type: 'pictorialBar',
      barCategoryGap: '10%', // ✅ 调整柱子间距
      symbol: 'triangle',
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
                color: 'rgba(255, 133, 108, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 173, 150, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [400, 350, 320, 230, 180],
      z: 10,
      symbolOffset: [-10, 0] // ✅ 消除图标偏移
    },
    {
      name: 'glyph',
      type: 'pictorialBar',
      yAxisIndex: 0,
      barGap: '-40%',
      symbolPosition: 'end',
      symbolSize: 30,
      symbolOffset: [0, '-50%']
    }
  ]
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  min-height: 1706px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1706px;
  background: url("assets/image/dialog/切图 284.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 1850px;
  top: 330px;
  padding: 130px 70px 60px 70px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 50px;
  top: 60px;
}

.content-title {
  width: 700px;
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
  top: 40px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.content-top-select-item1 {
  width: 192px;
  height: 65px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 6px 6px 0px;
  text-align: center;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #87ADD0;
  line-height: 65px;
  font-style: normal;
  text-transform: none;
}

.content-top-select-item1.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}

.order-compare-content {
  width: 100%;
  height: 509px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
}

.travel-compare-content {
  width: 100%;
  height: 509px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;
}

.radio-group {
  position: absolute;
  top: 50px;
  right: 50px;
}

.enliven-compare-content {
  width: 100%;
  height: 526px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;

}

.operation-compare-content {
  width: 100%;
  height: 644px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;
}

.service-compare-content {

  width: 100%;
  height: 827px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;

}

.travel-pro-compare-content {
  width: 100%;
  height: 905px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;

}

.content-box-footer-time {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 30px;
  color: #A3BFD8;
  line-height: 45px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: absolute;
  bottom: 20px;
  right: 50px;
}

:deep(.q-radio__label) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #BBD5EB;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

:deep(.q-radio__bg) {
  top: 10%;
  left: 25%;
  width: 100%;
  height: 100%;
}

:deep(.q-radio) {
  margin-right: 30px;
}

:deep(.q-radio__inner) {
  margin-right: 20px;
}

:deep(.q-radio__bg path) {
  fill: #007FB9;
}
</style>
