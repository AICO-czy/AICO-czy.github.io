<template>
  <q-dialog seamless v-model="isBusTransportationDialogVisible">
    <div class="dialog-content">
      <div class="content-title">班线客运</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column">
        <div class="content-top-select row justify-between items-center col-auto">
          <div class="top-title"></div>
          <div class="content-top-select row col-auto mr-[60px]">
            <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
              :class="{ 'active': activeTab === index + 1 }" @click="handleSelect1(index + 1)">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="con-content col">
          <div class="con-content-one fit column">
            <ItemTitle class="col-auto" style="margin-left: 40px;margin-top: 40px;" title="今日报警趋势" />
            <v-chart class="col" :option="option1" autoplay style="width: 100%;" />
            <ItemTitle class="col-auto" style="margin-left: 40px;margin-top: 40px;" title="今日报警分布" />
            <v-chart class="col" :option="option2" autoplay style="width: 100%;" />
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

const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

const charteredCarStore = useCharteredCarStore();
const { isVisible, activeTab } = storeToRefs(charteredCarStore);

const selsectBtns = ['今日', '本周', '本月']

function handleSelect1(item: any) {
  charteredCarStore.setActiveTab(item)
}

const isBusTransportationDialogVisible = computed(() => showTransportationDialog.value === 'busTransportation');
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};


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

let lists = [
  {
    name: '京承高速',
    value: 7426.23,
  },
  {
    name: '承赤高速',
    value: 5325.34,
  },
  {
    name: '津承高速',
    value: 4723.30,
  },
  {
    name: '承唐高速',
    value: 3736.74,
  },
  {
    name: '承朝高速',
    value: 1953.26,
  },
  {
    name: '承秦高速',
    value: 793.84,
  },
  {
    name: '承围高速',
    value: 583.53,
  },
  {
    name: '张承高速',
    value: 258.37,
  },
]
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
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  min-height: 1376px !important;
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
  width: 1462px;
  height: 1376px;
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
  // height: 1375px;
  // overflow-y: auto;
  // overflow-x: hidden;
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
}
</style>
