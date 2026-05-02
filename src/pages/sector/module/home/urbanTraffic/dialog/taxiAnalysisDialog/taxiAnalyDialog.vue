<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">出租汽车行业综合分析</div>
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
              <ItemTitle title="订单对比分析"></ItemTitle>
              <v-chart :option="option" autoplay class="col" />
            </div>
            <div class="travel-compare-content column">
              <ItemTitle title="出行需求对比分析"></ItemTitle>
              <div class="radio-group">
                <q-radio v-model="state.radio1" val="line" label="天气" />
                <q-radio v-model="state.radio1" val="rectangle" label="区域" />
              </div>
              <v-chart :option="option1" autoplay class="col" />
              <v-chart :option="option2" autoplay class="col" />
            </div>
            <div class="enliven-compare-content column">
              <ItemTitle title="车辆活跃对比度分析"></ItemTitle>
              <v-chart :option="option3" autoplay class="col" />
            </div>
            <div class="operation-compare-content column">
              <ItemTitle title="运营效率对比分析"></ItemTitle>
              <div class="radio-group">
                <q-radio v-model="state.radio1" val="line" label="时间利用率" />
                <q-radio v-model="state.radio1" val="rectangle" label="里程利用率" />
              </div>
              <v-chart :option="option4" autoplay class="col" />
              <div class="content-box-footer-time">
                更新时间：2025/08/18 16:05:24
              </div>
            </div>
            <div class="service-compare-content column">
              <ItemTitle title="服务质量对比分析"></ItemTitle>
              <v-chart :option="option5" autoplay class="col" />
              <div class="content-box-footer-time">
                更新时间：2025/08/18 16:05:24
              </div>
            </div>
            <div class="travel-pro-compare-content column">
              <ItemTitle title="出行需求对比分析"></ItemTitle>
              <div class="radio-group">
                <q-radio v-model="state.radio1" val="line" label="天气" />
                <q-radio v-model="state.radio1" val="rectangle" label="区域" />
              </div>
              <v-chart :option="option6" autoplay class="col" />
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
const isDialogVisible = computed(() => showAnalyzeDialog.value === 'taxiAnalyze');
const selsectBtns = ['今日', '本月', '上月']
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

const option = ref({
  legend: {
    data: [{ name: '巡游车', icon: 'rect' }, { name: '网约车', icon: 'rect' },   // 修改为长方形图标
      ''],
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    top: '5%',
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '8%',
    top: '20%',
    containLabel: true
  },
  xAxis: {
    data: ['01:00', '02:00', '03:00', '04:00', '05:00'],
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
      name: '单位:单/车',
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
      name: '巡游车',
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
      data: [21, 19, 18, 17, 16],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '网约车',
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
                color: '#1EE7E7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [23, 21, 19, 18, 17],
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

const option1 = ref({
  legend: {
    data: [{ name: '巡游车订单数', icon: 'rect' }, { name: '网约车订单数', icon: 'rect' },   // 修改为长方形图标
      ''],
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    top: '5%',
    itemGap: 100, // 图例项之间的间距
    itemWidth: 20, // 图例标记的宽度
    itemHeight: 20 // 图例标记的高度
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '16%',
    containLabel: true
  },
  xAxis: {
    data: ['01:00', '02:00', '03:00', '04:00', '05:00'],
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
      name: '单位:单',
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
      name: '巡游车订单数',
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
                color: 'rgba(30, 231, 231, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [21, 19, 18, 17, 16],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '网约车订单数',
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
      data: [23, 21, 19, 18, 17],
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

const option2 = ref({
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
        color: "#3763cd", //显示竖线颜色
        type: "solid",
      },
    },
    textStyle: {
      color: "#ffffff"
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
        "晴",
        "阴",
        "雨",
        "雾霾",
        "大风",
      ],
    },
  ],
  yAxis: [
    {
      name: '单位:单/车',
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
      name: '巡游车车车均订单数',
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
        color: '#fff',
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
      data: [22, 41, 45, 48, 55],
    },
    {
      name: '网约车均订单数',
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
        color: '#fff',
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
      data: [41, 20, 48, 55, 33],
    }],
})

const option3 = ref({
  legend: {
    data: [{ name: '巡游车', icon: 'rect' }, { name: '网约车', icon: 'rect' },   // 修改为长方形图标
      ''],
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
    top: '5%',
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '8%',
    top: '20%',
    containLabel: true
  },
  xAxis: {
    data: ['01:00', '02:00', '03:00', '04:00', '05:00'],
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
      name: '单位:辆',
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
      name: '巡游车',
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
      data: [21, 19, 18, 17, 16],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '网约车',
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
                color: '#1EE7E7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [23, 21, 19, 18, 17],
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

const option4 = ref({
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
    top: '15%',
    bottom: '15%',
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      lineStyle: {
        color: "#3763cd", //显示竖线颜色
        type: "solid",
      },
    },
    textStyle: {
      color: "#ffffff"
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
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
      ],
    },
  ],
  yAxis: [
    {
      name: '单位:辆',
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
      name: '巡游车',
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
                color: "rgba(53, 176, 221, 0.30)",
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
      data: [22, 41, 45, 48, 55],
    },
    {
      name: '网约车',
      type: "line",
      smooth: true,
      showSymbol: true, //圆点显隐
      symbolSize: 10, // 设置为10px（默认通常是4-6px）
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(106, 252, 153, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(106, 252, 153, 1)',
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
                color: "rgba(106, 252, 153, 0.38)",
              },
              {
                offset: 1,
                color: "rgba(106, 252, 153, 0)",
              },
            ],
            false
          ),

        },
      },
      data: [41, 20, 48, 55, 33],
    }],
})

const option5 = ref({
  color: ['#2DD0FD', '#FFDD00', '#FFDE64', '#F6AD58', '#5F6BFE', '#44BEA1', '#60D539', '#0589BB', '#1B98FE'],
  tooltip: {
    show: true,
    backgroundColor: '#02132fC9',
    borderColor: '#0D97E460',
    formatter: ' {b}: {c} ({d}%)',
    textStyle: {
      color: '#A3BFD8',
      fontSize: 30,
    },
  },
  legend: {
    orient: 'vertical',
    top: "middle",
    right: "10%",
    icon: 'rect',
    type: 'scroll',
    pageIconColor: "#76b9ff",
    pageIconInactiveColor: "#ccc",
    pageTextStyle: {
      color: '#A3BFD8',
      fontSize: 30,
    },
    show: true,
    itemGap: 35, // 图例项之间的间距
    itemWidth: 30, // 图例标记的图形宽度。
    itemHeight: 30, //  图例标记的图形高度。
    textStyle: {
      color: '#A3BFD8',
      fontSize: 30,
      padding: [0, 8, 0, 8]
    }
  },
  series: [
    {
      name: '',
      type: 'pie',
      selectedMode: 'single',
      center: ['30%', '50%'],
      radius: [0, '40%'],
      label: {
        formatter: '{b} {c}',
        position: 'inner',
        textStyle: {
          color: '#FBFF00',
          fontSize: 35,
          fontWeight: 'bold',
        },
      },
      data: [
        // 默认和第一个数值相同
        { value: 66, name: '网约车' },
        { value: 10, name: '巡游车' },
      ]
    },
    {
      name: '',
      type: 'pie',
      center: ['30%', '50%'],
      radius: ['55%', '70%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          formatter: '{b}',
          textStyle: {
            backgroundColor: 'rgba(5,25,33,0.6)',
            color: '#5DC1FF',
            fontSize: 30,
            padding: [3, 3]
          },
        }
      },
      labelLine: {
        length: 10,
      },
      data: [
        { value: 5, name: '黑车非法营运', },
        { value: 5, name: '拒载', },
        { value: 2, name: '绕路', },
        { value: 2, name: '拼客', },
        { value: 2, name: '甩客', },
        { value: 2, name: '计价议价', },
        { value: 58, name: '不文明驾驶', },
      ]
    },

  ]

})

const option6 = ref({
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
    top: '3%',
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
      name: '单位:单',
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
    data: ['承德南站', '火车站', '承德东站', '万达广场', '避暑山庄', '实验小学', '普宁寺', '普宁机场', '南营子大街'], // 使用最近七天的日期
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
      name: '巡游车订单', // 修改为产能
      type: 'bar',
      barWidth: 20,
      data: [230, 180, 270, 250, 200, 210, 260, 170, 180], // 示例数据，根据实际情况调整
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
      name: '网约车订单', // 修改为能耗
      type: 'bar',
      barWidth: 20,
      data: [152, 120, 210, 150, 127, 175, 150, 150, 130], // 示例数据，根据实际情况调整
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
  height: 1018px;
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
  height: 509px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  position: relative;

}

.operation-compare-content {
  width: 100%;
  height: 587px;
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
