<template>
  <q-dialog seamless v-model="isAlarmDialogVisible">
    <div class="dialog-content">
      <div class="content-title">危货运输</div>
      <div class="content-close" @click="handleClose"></div>
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
            <div class="flex items-center px-[30px] pt-[20px]">
              <div class="title-icon top-one-right-name">实时载货车辆数</div>
              <div class="slider-box">
                <div class="active-line line2" :style="{ width: '50%' }">
                  <div class="slider-icon icon2"></div>
                </div>
              </div>
              <div class="top-one-numb num2">65<span>辆</span></div>
            </div>
            <div class="flex items-center justify-between px-[250px]">
              <div class="top-item title-icon">
                市内:<span>23</span>辆
              </div>
              <div class="top-line"></div>
              <div class="top-item title-icon">
                市外:<span>35</span>辆
              </div>
            </div>
            <div class="content-top-select row col-auto mt-[20px] ml-[680px]">
              <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
                :class="{ 'active': activeTab === index + 1 }" @click="handleSelect1(index + 1)">
                {{ item }}
              </div>
            </div>
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="危货运输品类分析" />
            <v-chart :option="option3" autoplay style="height: 400px; width: 100%;" />
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="报警趋势" />
            <v-chart :option="option1" autoplay style="height: 400px; width: 100%;" />
            <ItemTitle style="margin-left: 40px;margin-top: 20px;" title="报警分布" />
            <v-chart :option="option2" autoplay style="height: 500px; width: 100%;" />
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
import { useHazardousGoodsStore, useTransportationDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import 'echarts-wordcloud'

const charteredCarStore = useHazardousGoodsStore();
const { isVisible, activeTab } = storeToRefs(charteredCarStore);


const storeTransportationDialog = useTransportationDialogStore();

const isAlarmDialogVisible = computed(() => storeTransportationDialog.showTransportationDialog === 'hazardousGoods');

const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

const selsectBtns = ['今日', '本周', '本月']

function handleSelect1(item: any) {
  charteredCarStore.setActiveTab(item)
}

const option1 = ref({
  // backgroundColor: '#1b1d21',
  legend: {
    // icon: "rect",
    textStyle: {
      fontSize: 14,
      color: "rgba(198, 206, 207, 1)"
    },
    data: [{
      name: "报警数",
      itemStyle: {
        color: "rgba(53, 176, 221, 1)"
      }
    }]
  },
  grid: {
    top: "20%",
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
      name: "      单位:次",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
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
      name: '报警数',
      type: "line",
      // smooth: true,
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

const dataList = [
  { name: '爆炸性物质和物品', value: '15', count: '18' },
  { name: '气体', value: '32', count: '13' },
  { name: '易燃液体', value: '15', count: '23' },
  { name: '易燃固体、易于自燃的物质、遇水放出易燃气体的物质', value: '47', count: '50' },
  { name: '氧化性物质和有机过氧化物', value: '27', count: '49' },
  { name: '毒性物质和感染性物质', value: '18', count: '47' },
  { name: '放射性物质', value: '45', count: '40' },
  { name: '腐蚀性物质', value: '22', count: '33' },
  { name: '杂项', value: '18', count: '20' },
];

const option3 = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: [
    {
      orient: 'vertial', // 图例列表的布局朝向
      itemWidth: 16, // 图例标记的图形宽度
      itemHeight: 16, // 图例标记的图形高度
      right: 50, // 图例组件离容器右侧的距离
      bottom: '0%', // 图例组件离容器下侧的距离
      align: 'right',
      textStyle: {
        // 图例的公用文本样式
        color: '#CDEBF9', // 文字的颜色
        fontSize: 30
      },
      formatter: (name: any) => {
        if (name.length > 15) {
          return `${name.slice(0, 15)}\n${name.slice(15)}`
        } else {
          return `${name}`;
        }
      },
      data: dataList
    },
  ],
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['30%', '50%'],
      label: {
        show: true, // 是否显示
        formatter: function (params: any) {
          let count = dataList.find(item => item.name == params.name)!.count
          return `{a|${count}辆}\n{b|${params.value}吨}`;
        },
        backgroundColor: "#051921",
        padding: [10, 6, 5, 6],
        rich: {
          a: {
            color: '#5DC1FF',
            fontSize: 32,
            fontWeight: 500,
            textAlign: 'center'
          },
          b: {
            color: '#7FEDEB',
            fontSize: 32,
            fontWeight: 500,
            textAlign: 'center'
          },
        },
      },
      labelLine: {
        show: false, // 是否显示视觉引导线
        normal: {
          length: 40, // 视觉引导线第一段的长度
          length2: 80, // 视觉引导线第一段的长度
          align: 'right',
          maxSurfaceAngle: 80,
          lineStyle: {
            width: 2, // 线宽
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(192, 231, 255, 0)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(192, 231, 255, 1)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
          }
        },

      },
      itemStyle: {
        borderWidth: 0, // 描边线宽
        borderColor: '#fff' // 图形的描边颜色
      },
      data: dataList
    }
  ]
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
  // background: linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%);
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
}
</style>
