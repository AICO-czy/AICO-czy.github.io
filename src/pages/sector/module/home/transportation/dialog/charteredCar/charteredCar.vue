<template>
  <q-dialog seamless v-model="isAlarmDialogVisible">
    <div class="dialog-content">
      <div class="content-title">包车客运</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column">
        <div class="content-top-select row col-auto mt-[20px]">
          <div class="top-title"></div>
        </div>
        <div class="con-content">
          <div class="con-content-one">
            <!-- 百分比 -->
            <div class="flex items-center px-[30px] pt-[20px]">
              <div class="title-icon top-one-right-name">实时在线车辆数</div>
              <div class="slider-box">
                <div class="active-line line1" :style="{ width: '90%' }">
                  <div class="slider-icon icon1"></div>
                </div>
              </div>
              <div class="top-one-numb num1">65<span>辆</span></div>
            </div>
            <div class="flex items-center justify-between px-[32px]">
              <div class="top-item title-icon">
                市内:<span>23</span>辆
              </div>
              <div class="top-line"></div>
              <div class="top-item title-icon">
                市外:<span>35</span>辆
              </div>
              <div class="top-line"></div>
              <div class="top-item title-icon">
                省外:<span>24</span>辆
              </div>
            </div>
            <div class="content-top-select row col-auto mt-[20px] ml-[680px]">
              <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
                :class="{ 'active': activeTab === index + 1 }" @click="handleSelect1(index + 1)">
                {{ item }}
              </div>
            </div>
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="今日报警趋势" />
            <v-chart :option="option1" autoplay style="height: 400px; width: 100%;" />
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="今日报警分布" />
            <v-chart :option="option2" autoplay style="height: 400px; width: 100%;" />
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="车辆驻留地分布" />
            <div class="word-cloud-chart">
              <v-chart :option="option3" autoplay class="fit" />
            </div>
          </div>
          <div class="con-content-two">
            <div class="top-title1"></div>
            <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="车辆规模" />
            <v-chart :option="option4" autoplay style="height: 520px; width: 100%;" />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useCharteredCarStore, useTransportationDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import 'echarts-wordcloud'

const charteredCarStore = useCharteredCarStore();
const { isVisible, activeTab } = storeToRefs(charteredCarStore);

const storeTransportationDialog = useTransportationDialogStore();

const isAlarmDialogVisible = computed(() => storeTransportationDialog.showTransportationDialog === 'charteredCar');

const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

const selsectBtns = ['今日', '本周', '本月']

function handleSelect1(item: any) {
  charteredCarStore.setActiveTab(item)
}

// const handleClose = () => {
//   charteredCarStore.closeDialog(); // 假设store中有这样的方法
// };

const option1 = ref({
  // backgroundColor: '#1b1d21',
  legend: {
    // icon: "rect",
    textStyle: {
      fontSize: 14,
      color: "rgba(255,255,255,.8)"
    },
    data: [{
      name: "今日",
      itemStyle: {
        color: "#CE855C"
      }
    }]
  },
  grid: {
    top: "10%",
    left: "5%",
    right: "5%",
    bottom: "0%",
    containLabel: true,
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
      boundaryGap: false,
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
          color: "#fff",
          padding: 10,
          fontSize: 24,
        },

      },
      axisTick: {
        show: false,
      },
      data: [
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00'
      ],
    },
  ],
  yAxis: [
    {
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
          color: "#ffffff",
          padding: 10,
          fontSize: 24,
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
      // smooth: true,
      showSymbol: true, //圆点显隐
      lineStyle: {
        normal: {
          width: 5,
          color: "#CE855C", // 线条颜色
        },
      },
      itemStyle: {
        color: '#CE855C',
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
                color: "rgba(255, 101, 58, 0.20)",
              },
              {
                offset: 1,
                color: "rgba(255, 101, 58, 0)",
              },
            ],
            false
          ),

        },
      },
      data: [22, 41, 45, 48, 55, 33, 44],
    }],
})

const option2 = ref({
  legend: {
    data: ['超速', '疲劳驾驶', '抽烟', '接打电话'],
    top: '0%',
    right: "30%",
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
    left: "5%",
    right: "5%",
    bottom: "10%",
    top: "15%",
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
        textStyle: {
          color: "#AEC1C8",
          fontSize: 26,
        },
      },
      data: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "单位:次",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      splitLine: {
        show: true,
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
      name: '超速',
      type: 'bar',
      barWidth: 10,
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
                offset: 1,
                color: 'rgba(255, 189, 129, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120],
    },
    {
      name: '疲劳驾驶',
      type: 'bar',
      barWidth: 10,
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
      data: [180, 100, 170, 130, 150, 200, 120],
    },
    {
      name: '抽烟',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(69, 153, 237, 1)', // 100% 处的颜色
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
      data: [120, 60, 100, 90, 100, 120, 70],
    },
    {
      name: '接打电话',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(193, 198, 207, 1)', // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'rgba(164, 170, 182, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(141, 147, 158, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [80, 40, 70, 60, 70, 90, 50],
    }
  ],
})

const option3 = ref({
  tooltip: {
    show: true,
    position: 'top',
    textStyle: {
      fontSize: 30
    }
  },
  series: [{
    type: "wordCloud",
    // 网格大小，各项之间间距
    gridSize: 30,
    // 形状 circle 圆，cardioid  心， diamond 菱形，
    // triangle-forward 、triangle 三角，star五角星
    shape: 'circle',
    // 字体大小范围
    sizeRange: [20, 50],
    // 文字旋转角度范围
    rotationRange: [0, 90],
    // 旋转步值
    rotationStep: 90,
    // 自定义图形
    // maskImage: maskImage,
    left: 'center',
    top: 'center',
    right: null,
    bottom: null,
    // 画布宽
    width: '90%',
    // 画布高
    height: '80%',
    // 是否渲染超出画布的文字
    drawOutOfBound: false,
    textStyle: {
      color: function () {
        const colors = [
          'rgba(100, 206, 255, 1)',
          'rgba(11, 162, 255, 1)',
          'rgba(196, 235, 255, 1)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];

      },
      emphasis: {
        shadowBlur: 10,
        shadowColor: '#2ac'
      }
    },
    data: [
      { name: "秦皇岛", value: 30 },
      { name: "邯郸", value: 28 },
      { name: "唐山", value: 24 },
      { name: "石家庄", value: 23 },
      { name: "廊坊", value: 22 },
      { name: "哈尔滨", value: 21 },
      { name: "北京", value: 20 },
      { name: "沧州", value: 29 },
      { name: "天津", value: 28 },
      { name: "张家口", value: 27 },
      { name: "邢台", value: 26 },
      { name: "赤峰", value: 25 },
      { name: "衡水", value: 24 },
      { name: "洛阳", value: 30 },
      { name: "沈阳", value: 18 },
      { name: "济南", value: 14 },
      { name: "合肥", value: 13 },
      { name: "保定", value: 13 },
    ]
  }]
})

const option4 = ref({
  // backgroundColor: "#011a38",
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff",
      },
    },
    textStyle: {
      color: "#fff",
    },
    backgroundColor: "rgba(16, 123, 184, .52)", //设置背景颜色
    confine: true,
  },
  grid: {
    top: "16%",
    left: "2%",
    right: "2%",
    bottom: "4%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 14,
    itemHeight: 4,
    itemGap: 20,
    textStyle: {
      fontSize: 24,
      color: "#fff",
      padding: [0, 0, 0, 6],
    },
  },
  xAxis: [
    {
      type: "category",
      // axisLine: {
      //   lineStyle: {
      //     color: "#ffffff",
      //   },
      // },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#ffffff",
        },
      },
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "保有量:辆",
      splitNumber: 5,
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 20, 5, 0],
      },
      axisLabel: {
        formatter: "{value}",
        color: "rgba(95, 187, 235, 1)",
        textStyle: {
          fontSize: 24,
          color: "#fff",
          lineHeight: 16,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(28, 130, 197, .3)",
          type: "dashed",
        },
      },
    },
    {
      name: "月均出车率:%     ",
      splitNumber: 5,
      type: "value",
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 5, 0],
      },
      axisLabel: {
        show: true,
        fontSize: 24,
        color: "#fff",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "普通客车",
      type: "bar",
      // stack: "总量",
      barMaxWidth: 24,
      barGap: "10%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(160, 249, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(69, 153, 237, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p: any) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [350, 250, 320, 420, 380, 180, 280],
    },
    {
      name: "高级客车",
      type: "bar",
      // stack: "总量1",
      barMaxWidth: 24,
      barGap: "10%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(193, 198, 207, 1)",
              },
              {
                offset: 1,
                color: "rgba(164, 170, 182, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p: any) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [300, 200, 280, 350, 320, 150, 250],
    },
    {
      name: "普通客车",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "rgba(53, 176, 221, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(53, 176, 221, 1)",
        borderWidth: 6,
        shadowColor: "rgba(53, 176, 221, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: [300, 200, 280, 350, 320, 150, 250], // 折线图的数据
    },
    {
      name: "高级客车",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 6,
        shadowColor: "rgba(206, 133, 92, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: [350, 250, 320, 420, 380, 180, 280], // 折线图的数据
    },
  ],
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1430px !important;
  overflow: none !important;
  min-height: 1683px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.icon-map {
  background: url('assets/image/dialog/切图 58.png') no-repeat;
  width: 58px;
  height: 58px;
  position: absolute;
  top: -85px;
  left: 350px;
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

.slider-box {
  position: relative;
  width: 678px;
  background: #1e5386;
  height: 19px;
  border-radius: 94px;
  margin: 0 30px;

  .line1 {
    background: linear-gradient(90deg, #4F799A 0%, #4F99D3 50%, #9DC9EC 100%);

    &>.slider-icon {
      background: url('assets/component/道水路运输系统-首页_slices/切图 509.png') no-repeat center/cover;
    }
  }

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

.top-one-numb {
  flex: 1;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 52px;
  line-height: 71px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%);
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

.end-box {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 30px;
  color: #A3BFD8;
  line-height: 42px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  margin-right: 20px;
  margin-top: 20px;
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

.top-line {
  background: url('assets/component/道水路运输系统-首页_slices/切图 673.png') no-repeat center/cover;
  width: 6px;
  height: 92px;
}

.top-item {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  color: #A3D9FF;
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;

  &>span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 52px;
    line-height: 71px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 20px;
    margin-right: 10px;
  }
}

.title-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 42px;
  color: #A3D9FF;
  line-height: 71px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 40px;
}

.title-count {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 52px;
  line-height: 71px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 20px;
}

.title-unit {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 41px;
  color: #EEF8FF;
  line-height: 57px;
  text-align: left;
  font-style: normal;
  text-transform: none;
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

.dialog-content {
  width: 1430px;
  height: 1683px;
  background: url("assets/image/dialog/切图 284.png") no-repeat 100%/100%;
  background-size: 100% 100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 140px 50px 70px 50px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 55px;
  top: 80px;
}

.content-title {
  width: 500px;
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

  .top-title {
    background: url('assets/component/道水路运输系统-首页_slices/切图 328t.png') no-repeat center/cover;
    width: 369px;
    height: 58px;
  }

  .top-title1 {
    background: url('assets/component/道水路运输系统-首页_slices/切图 328t2.png') no-repeat center/cover;
    width: 370px;
    height: 58px;
    position: absolute;
    top: -60px;
  }
}

.con-content {
  height: 1375px;
  overflow-y: auto;
  overflow-x: hidden;
  // background: pink;
  margin-top: 20px;

  //滚动条样式
  &::-webkit-scrollbar {
    width: 12px;
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(125, 188, 255, 0.34);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
  }

  .con-content-one {
    background-image: url("assets/image/dialog/切图 547.png");
    background-size: 100% 100%;
  }

  .con-content-two {
    background-image: url("assets/image/dialog/切图 600.png");
    background-size: 100% 100%;
    width: 1309px;
    height: 669px;
    margin-top: 80px;
    position: relative;
    padding-top: 1px;
  }
}

.word-cloud-chart {
  margin: auto;
  width: 95%;
  height: 520px;
  background-image: url("assets/image/dialog/切图 602.png");
  background-size: 100% 100%;
}
</style>
