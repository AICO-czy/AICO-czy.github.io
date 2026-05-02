<template>
  <q-dialog seamless v-model="isHeavyFreightDialogVisible">
    <div class="dialog-content">
      <div class="content-title">重型货运</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column">
        <div class="content-top-select row col-auto">
          <div class="top-title"></div>
        </div>
        <div class="con-content col column">
          <!-- 百分比 -->
          <div class="col-auto flex items-center px-[30px] pt-[20px]">
            <div class="title-icon top-one-right-name">实时在线车辆数</div>
            <div class="slider-box">
              <div class="active-line line1" :style="{ width: '90%' }">
                <div class="slider-icon icon1"></div>
              </div>
            </div>
            <div class="top-one-numb num1">1694<span>辆</span></div>
          </div>
          <div class="col-auto flex items-center justify-between px-[32px]">
            <div class="top-item title-icon">
              <div>
                市内:<span class="color1">23</span>辆
              </div>
              <div>
                占比:<span class="color2">16.7</span>%
              </div>
            </div>
            <div class="top-line"></div>
            <div class="top-item title-icon">
              <div>
                市外:<span class="color1">452</span>辆
              </div>
              <div>
                占比:<span class="color2">26.7</span>%
              </div>
            </div>
            <div class="top-line"></div>
            <div class="top-item title-icon">
              <div>
                省外:<span class="color1">1147</span>辆
              </div>
              <div>
                占比:<span class="color2">16.7</span>%
              </div>
            </div>
          </div>
          <ItemTitle class="col-auto" style="margin-left: 40px;margin-top: 20px;" title="今日报警趋势" />
          <v-chart ref="chartRef" class="col" :option="option1" autoplay style="width: 100%;"
            @click="handleChartClick" />
          <ItemTitle class="col-auto" style="margin-left: 40px;margin-top: 20px;" title="今日报警分布" />
          <div class="col">
            <div class="word-cloud-chart">
              <v-chart class="col full-width" :option="option2" autoplay />
            </div>
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

const storeTransportationDialog = useTransportationDialogStore();

const isHeavyFreightDialogVisible = computed(() => storeTransportationDialog.showTransportationDialog === 'heavyFreight');

const handleClose = () => {
  storeTransportationDialog.setShowTransportationDialog(''); // 假设store中有这样的方法
};

// 选中的柱子索引
const selectedIndex = ref(-1);
// 图表引用
const chartRef = ref(null);
const option1 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    data: ['车辆数'],
    itemWidth: 30,
    itemHeight: 30,
    icon: "rect",
    textStyle: {
      fontSize: 30,
      color: '#AEC1C8',
    },
  },
  grid: {
    left: '6%',
    right: '6%',
    bottom: '5%',
    top: '12%',
    containLabel: true,
  },
  xAxis: {
    data: ['常跑市内', '常跑市外', '常跑省外'],
    triggerEvent: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#70F5FE',
      },
    },
    axisLabel: {
      show: true,
      rotate: 0,
      interval: 0,
      textStyle: {
        fontSize: 30,
        color: '#AEC1C8',
      },
    },
  },
  yAxis: {
    name: '单位:辆',
    type: "value",
    position: "left",
    nameLocation: "end",
    nameTextStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 30,
      fontFamily: "SourceHanSansMedium",
      align: "center",
      padding: [0, 0, 15, -50],
    },
    triggerEvent: true,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
      },
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#AEC1C8',
        fontSize: 30,
      },
    },
  },
  series: [
    {
      name: '车辆数',
      type: 'pictorialBar',
      barCategoryGap: '20%',
      symbolOffset: [0, -5],
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

      itemStyle: {
        //渐变色
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#58FFEE',
          },
          {
            offset: 0.5,
            color: '#06D7CE',
          },
          {
            offset: 1,
            color: '#1180CC',
          },
        ]),
      },
      data: [300, 462, 400],
      z: 10,
    },
  ],
}) as any;
// 点击事件处理
const handleChartClick = (params:any) => {
  if (params.componentType === 'series') {
    // 更新选中索引
    selectedIndex.value = params.dataIndex;
    // 获取图表实例
    const chart: any = chartRef.value;
    // 动态设置颜色
    option1.value.series[0].itemStyle = {
      color: (itemParams:any) => {
        return itemParams.dataIndex === selectedIndex.value
          ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#8DFFC9',
            },
            {
              offset: 0.5,
              color: '#01F681',
            },
            {
              offset: 1,
              color: '#0C656E',
            },
          ])  // 选中颜色
          : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#58FFEE',
            },
            {
              offset: 0.5,
              color: '#06D7CE',
            },
            {
              offset: 1,
              color: '#1180CC',
            },
          ]); // 未选中颜色
      }
    };
    // 重新渲染图表
    chart.setOption(option1.value);
  }
}

const option2 = ref({
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
    // background: linear-gradient(90deg, #4F799A 0%, #4F99D3 50%, #9DC9EC 100%);
    background: linear-gradient(90deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);

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
  background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
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
  height: 149px;
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

  .color1 {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 52px;
    line-height: 71px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #FF7979 0%, #FFB8B8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: 20px;
    margin-right: 10px;
  }
  .color2 {
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
  margin-top: 20px;
  background-image: url("assets/image/dialog/切图 547.png");
  background-size: 100% 100%;
}

.word-cloud-chart {
  margin: auto;
  width: 95%;
  height: 100%;
  background-image: url("assets/image/dialog/切图 602.png");
  background-size: 100% 100%;
}
</style>
