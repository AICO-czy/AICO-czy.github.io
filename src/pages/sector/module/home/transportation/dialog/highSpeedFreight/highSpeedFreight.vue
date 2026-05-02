<template>
  <q-dialog seamless v-model="isHighSpeedFreightDialogVisible">
    <div class="dialog-content">
      <div class="content-title">全市高速货运情况</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column">
        <div class="content-top-select row col-auto mt-[20px] ml-[650px]">
          <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
            :class="{ 'active': activeTab === index + 1 }" @click="handleSelect1(index + 1)">
            {{ item }}
          </div>
        </div>
        <div class="con-content">
          <div class="title-icon title-name">今日货运周转量：<span class='title-count'>2653.46</span><span
              class="title-unit">万吨·公里</span>
          </div>
          <div class="flex items-center justify-around px-[20px]">
            <div class="top-item">
              <div>
                <v-chart :option="pieOption" autoplay style="height: 238px; width: 100%;" />
              </div>
              <div class="top-count">1233万吨</div>
              <div class="top-name">入承货运量</div>
            </div>
            <div class="top-line"></div>
            <div class="top-item">
              <div>
                <v-chart :option="pieOption1" autoplay style="height: 238px; width: 100%;" />
              </div>
              <div class="top-count">1233万吨</div>
              <div class="top-name">出承货运量</div>
            </div>
            <div class="top-line"></div>
            <div class="top-item">
              <div>
                <v-chart :option="pieOption2" autoplay style="height: 238px; width: 100%;" />
              </div>
              <div class="top-count">1233万吨</div>
              <div class="top-name">穿境货运量</div>
            </div>
          </div>
          <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="今日小时货运量变化" />
          <v-chart :option="option1" autoplay style="height: 400px; width: 100%;" />
          <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="货运通道排名" />
          <div class="relative">
            <div class="icon-map"></div>
          </div>
          <v-chart :option="option2" autoplay style="height: 600px; width: 100%;" />
          <ItemTitle style="margin-left: 40px;margin-top: 40px;" title="货运通行站点top5" />
          <v-chart :option="option3" autoplay style="height: 500px; width: 100%;" />
          <div class="end-box">更新时间：2025/08/18 16:05:24</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="highSpeedFreight">
import { ref, onMounted, watch, computed } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useTransportationDialogStore, useHighSpeedFreightTransportStore } from "../../store/index";
import { storeToRefs } from "pinia";

const storeTransportationDialog = useTransportationDialogStore();
const { showTransportationDialog } = storeToRefs(storeTransportationDialog);

const highSpeedFreightStore = useHighSpeedFreightTransportStore();
const { isVisible, activeTab } = storeToRefs(highSpeedFreightStore);

const selsectBtns = ['今日', '本月', '上月']

function handleSelect1(item: any) {
  highSpeedFreightStore.setActiveTab(item)
}

const isHighSpeedFreightDialogVisible = computed(() => showTransportationDialog.value === 'highSpeedFreight');
const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

const pieOption = ref({
  // backgroundColor: '#121740',
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          // borderWidth: 3,
          // borderColor: '#e7b75a',
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(52, 212, 212, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(63, 243, 211, 1)'
            },
            {
              offset: 1,
              color: 'rgba(158, 220, 255, 1)'
            }
          ]),
        },
      },
      axisLine: {
        lineStyle: {
          width: 13,
          color: [[1, '#383e63']],
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [
        {
          value: 32,
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '0%'],
          },
        },
      ],
      title: {
        fontSize: 58,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 38,
        color: '#fff',
        formatter: '{value}%',
      },
    },
  ],

})
const pieOption1 = ref({
  // backgroundColor: '#121740',
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          // borderWidth: 3,
          // borderColor: '#e7b75a',
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(212, 150, 99, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(243, 209, 116, 1)'
            },
            {
              offset: 1,
              color: 'rgba(255, 253, 214, 1)'
            }
          ]),
        },
      },
      axisLine: {
        lineStyle: {
          width: 13,
          color: [[1, '#383e63']],
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [
        {
          value: 32,
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '0%'],
          },
        },
      ],
      title: {
        fontSize: 58,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 38,
        color: '#fff',
        formatter: '{value}%',
      },
    },
  ],

})
const pieOption2 = ref({
  // backgroundColor: '#121740',
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        itemStyle: {
          // borderWidth: 3,
          // borderColor: '#e7b75a',
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(212, 92, 52, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(243, 150, 63, 1)'
            },
            {
              offset: 1,
              color: 'rgba(255, 232, 158, 1)'
            }
          ]),
        },
      },
      axisLine: {
        lineStyle: {
          width: 13,
          color: [[1, '#383e63']],
        },
      },
      splitLine: {
        show: false,
        distance: 0,
        length: 10,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        distance: 50,
      },
      data: [
        {
          value: 32,
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '0%'],
          },
        },
      ],
      title: {
        fontSize: 58,
      },
      detail: {
        width: 50,
        height: 14,
        fontSize: 38,
        color: '#fff',
        formatter: '{value}%',
      },
    },
  ],

})

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
        color: "rgba(109, 255, 153, 1)"
      }
    }, {
      name: "上周同期",
      itemStyle: {
        color: "rgba(53, 176, 221, 1)"
      }
    }]
  },
  grid: {
    top: "10%",
    left: "5%",
    right: "5%",
    bottom: "5%",
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
          fontSize: 14,
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
          fontSize: 14,
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
      lineStyle: {
        normal: {
          width: 5,
          color: "rgba(109, 255, 153, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(109, 255, 153, 1)',
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
                color: "rgba(67, 216, 164, 0.16)",
              },
              {
                offset: 1,
                color: "rgba(67, 216, 164, 0)",
              },
            ],
            false
          ),

        },
      },
      data: [22, 41, 45, 48, 55, 33, 44],
    },
    {
      name: '上周同期',
      type: "line",
      smooth: true,
      showSymbol: true, //圆点显隐
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
                color: "rgba(53, 176, 221, 0.38)",
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
      data: [41, 20, 48, 55, 33, 44, 20],
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

import icon1 from "src/assets/component/道水路运输系统-首页_slices/切图 628.png";
const option2 = ref({
  // backgroundColor: '#0a142f',
  xAxis: {
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitArea: { show: false },
    axisLine: {
      show: false,
    },
  },
  grid: {
    top: 0,
    bottom: 0,
    left: '15%',
    right: '15%'
  },
  yAxis: {
    inverse: true,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        fontSize: 32,
        fontFamily: 'Bebas',
        color: '#6A93B9',
      },
      formatter(value: any) {
        return value
      },
      align: 'left',
      margin: 150,
      padding: [-35, 0, 0, 0],
    },
    data: lists.map((item) => item.name),
  },
  series: [
    {
      type: 'pictorialBar',
      symbol: 'image://' + icon1,
      // symbol: 'image://' + star,
      symbolRepeat: 'fixed',
      symbolClip: true,
      symbolSize: 60,
      label: {
        show: true,
        formatter(params: any) {
          return params.value
        },
        position: 'right',
        color: '#A3D9FF',
        fontSize: 42,
        fontFamily: 'Bebas',
      },
      // symbolBoundingData: 10,
      data: lists.map((item) => item.value),
    },

  ],
})
const option3 = ref({
  // backgroundColor: '#09224e',
  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params: any) {
      return params[0].name + ': ' + params[0].value;
    }
  },
  xAxis: {
    data: ['承德南收费站', '双峰寺收费站', 'XXXX收费站', 'XXXX收费站', 'XXXX收费站'],
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#37B6F2',
        opacity: 0.5,
      }
    },
    axisLabel: {
      textStyle: {
        color: '#AEC1C8',
        fontSize: 24
      },
    },
  },
  yAxis: {
    name: '单位:万吨',
    type: "value",
    position: "left",
    nameLocation: "end",
    nameTextStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 30,
      fontFamily: "SourceHanSansMedium",
      align: "center",
      padding: [0, 0, 15, 0],
    },
    splitLine: {
      show: true, lineStyle: {
        color: '#37B6F2',
        opacity: 0.1,
      }
    },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 32,
        color: '#AEB8C0',
      },
    }
  },
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '10%',
    symbolClip: true,
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      normal: {
        color: function (params: any) {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(83, 243, 228, 1)'
            },
            {
              offset: 0.25,
              color: 'rgba(0, 255, 198, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(11, 184, 212, 1)'
            },
            {
              offset: 0.75,
              color: 'rgba(17, 88, 126, 1)'
            },
            {
              offset: 1,
              color: 'rgba(13,8,16,0)'
            }
            ],
            global: false //  缺省为  false
          }
        }
      },
      emphasis: {
        opacity: 1
      },
    },
    // 图形上方描述文字
    label: {
      show: true,
      position: 'top',
      offset: [0, 0],
      color: '#5DE5B4',
      fontSize: 24,
      formatter: function (params: any) {
        return params.value;
      },
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: [54.47, 52.45, 50.00, 38.17, 29.62],
    z: 10
  }]
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
  height: 180px;
  margin-top: 120px;
}

.top-item {


  .top-count {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 50px;
    line-height: 70px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    height: 50px;
  }

  .top-name {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 40px;
    color: #A3D9FF;
    // line-height: 45px;
    text-align: center;
    font-style: normal;
    text-transform: none;
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
  padding: 140px 70px 70px 70px;
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
  background-image: url("assets/image/dialog/切图 547.png");
  background-size: 100% 100%;


}

.con-content {
  height: 1345px;
  overflow-y: auto;
  overflow-x: hidden;
  // background: pink;
  margin: 20px;

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
}
</style>
