<!--主页-左边-->
<template>
  <div class="home-page-left">
    <div class="home-page-left-content column items-end">
      <div class="home-page-left-content-top full-width">
        <TitleLarge title="执政执法概览" class="ml-[20px]"></TitleLarge>
        <div class="top-overview row justify-center items-center">
          <div class="top-overview-item column" v-for="item in topOverviewData">
            <div class="top-overview-item-top">
              <img :src="item.icon" alt="" class="top-item-icon">
              <span>{{ item.title }}</span>
            </div>
            <div class="top-overview-item-bottom col">
              <img @click="activeDialogStore.setActiveDialog(item.title)"
                src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" class="see-below-icon" alt="">
              <span class="value">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="home-page-left-content-middle pb-[20px] full-width">
        <TitleLarge title="执法案件统计" class="ml-[20px]"></TitleLarge>
        <div class="middle-overview row gap-[20px]">
          <div class="middle-overview-left column">
            <div class="middle-overview-title row justify-between items-start">
              <ItemTitle title="执法案件" width="328px"></ItemTitle>
              <img @click="activeDialogStore.setActiveDialog('执法案件')"
                src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" class="see-below-icon mb-[10px]" alt="">
            </div>
            <div class="middle-overview-left-topView row justify-between items-center gap-[15px]">
              <div class="topView-left">
                <div class="topView-left-top">
                  <span>执法案件数</span>
                </div>
                <div class="topView-left-bottom row">
                  <div class="col-auto topView-value">
                    197
                    <span class="unit">件</span>
                  </div>
                  <div class="topView-line"></div>
                  <div class="col topView-compare column justify-evenly">
                    <div class="row justify-between items-center">
                      <span class="compare-title">同比</span>
                      <span class="compare-value">-10.4%</span>
                      <img src="images/cdsgl/trafficLawEnforcement/arrd.png" alt="">
                    </div>
                    <div class="row justify-between items-center">
                      <span class="compare-title">环比</span>
                      <span class="compare-value1">+5.2%</span>
                      <img src="images/cdsgl/trafficLawEnforcement/arrup.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="topView-right col row gap-[9px]">
                <div class="topView-right-item" v-for="item in middleOverviewData" :key="item.title">
                  <div class="topView-right-item-top">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="topView-right-item-bottom column justify-evenly items-center">
                    <div class="topView-s-value">
                      {{ item.value }}
                      <span class="unit">{{ item.unit }}</span>
                    </div>
                    <div class="topView-s-percent row gap-[10px]">
                      <span>占比</span>
                      <span>{{ item.percent }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="middle-overview-left-bottomView col">
              <v-chart :option="option1" autoplay class="fit" />
            </div>
          </div>
          <div class="middle-overview-right column">
            <div class="middle-overview-title row justify-between items-start no-wrap">
              <ItemTitle title="行政处罚" width="70%"></ItemTitle>
              <img @click="activeDialogStore.setActiveDialog('行政处罚')"
                src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" class="see-below-icon mb-[10px]" alt="">
            </div>
            <div class="middle-overview-right-topView row justify-between items-center">
              <div class="topView-left">
                <div class="topView-left-top">
                  <span>行政处罚金额</span>
                </div>
                <div class="topView-left-bottom row">
                  <div class="col-auto topView-value">
                    197
                    <span class="unit">件</span>
                  </div>
                  <div class="topView-line"></div>
                  <div class="col topView-compare column justify-evenly">
                    <div class="row justify-between items-center">
                      <span class="compare-title">同比</span>
                      <span class="compare-value">-10.4%</span>
                      <img src="images/cdsgl/trafficLawEnforcement/arrd.png" alt="">
                    </div>
                    <div class="row justify-between items-center">
                      <span class="compare-title">环比</span>
                      <span class="compare-value1">+5.2%</span>
                      <img src="images/cdsgl/trafficLawEnforcement/arrup.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="middle-overview-right-bottomView col">
              <v-chart :option="option2" autoplay class="fit" />
            </div>
          </div>
        </div>
      </div>
      <div class="home-page-left-content-bottom full-width">
        <div class="bottom-overview row">
          <div class="bottom-overview-left col">
            <TitleSmall title="践行执法为民" class="ml-[20px]"></TitleSmall>
            <div class="bottom-overview-content">
              <LawEnforcement></LawEnforcement>
            </div>
          </div>
          <div class="bottom-overview-right col">
            <TitleSmall title="提升素质能力" class="ml-[20px]"></TitleSmall>
            <div class="bottom-overview-content">
              <Ability></Ability>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogCom v-if="activeDialog === '执法机构总数'">
      <LawAgencyDialog></LawAgencyDialog>
    </DialogCom>
    <DialogCom v-if="activeDialog === '执法人员总数'">
      <LawPersonDialog></LawPersonDialog>
    </DialogCom>
    <DialogCom v-if="activeDialog === '执法装备总数'">
      <LawEquipmentDialog></LawEquipmentDialog>
    </DialogCom>
    <DialogCom v-if="activeDialog === '执法案件'">
      <LawCaseDialog></LawCaseDialog>
    </DialogCom>
    <DialogCom v-if="activeDialog === '行政处罚'">
      <LawPenaltyDialog></LawPenaltyDialog>
    </DialogCom>
  </div>
</template>

<script setup lang="ts" name="homePageLeft">
import { defineAsyncComponent, ref, toRefs } from "vue";
import * as echarts from "echarts";
import { useLawActiveDialogStore } from "../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
//大标题
const TitleLarge = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/TitleLarge.vue")
);

//小标题
const TitleSmall = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/TitleSmall.vue")
);

//项标题
const ItemTitle = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/ItemTitle.vue")
);
//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);

//提升素质能力板块
const Ability = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/left/Ability.vue")
);
//践行执法为民板块
const LawEnforcement = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/left/LawEnforcement.vue")
);

//执法机构弹窗
const LawAgencyDialog = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lawAgencyDialog.vue")
);

//执法人员弹窗
const LawPersonDialog = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lawPersonDialog.vue")
);

//执法装备弹窗
const LawEquipmentDialog = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lawEquipmentDialog.vue")
);

//执法案件弹窗
const LawCaseDialog = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lawCaseDialog.vue")
);

//行政处罚弹窗
const LawPenaltyDialog = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lawPenaltyDialog.vue")
);


const topOverviewData = ref([
  {
    icon: "images/cdsgl/trafficLawEnforcement/icon3.png",
    title: "执法机构总数",
    value: "34",
    unit: "个",
  },
  {
    icon: "images/cdsgl/trafficLawEnforcement/icon2.png",
    title: "执法人员总数",
    value: "216",
    unit: "人",
  },
  {
    icon: "images/cdsgl/trafficLawEnforcement/icon1.png",
    title: "执法装备总数",
    value: "2412",
    unit: "项",
  },
])

const topDialog = ref('执法机构总数');

const middleOverviewData = ref([
  {
    title: "道路运政",
    value: "1190",
    unit: "件",
    percent: "77.2%"
  },
  {
    title: "公路路政",
    value: "1190",
    unit: "件",
    percent: "77.2%"
  },
  {
    title: "水路运政",
    value: "1190",
    unit: "件",
    percent: "77.2%"
  },
  {
    title: "质量安全监督",
    value: "1190",
    unit: "件",
    percent: "77.2%"
  },
])

const option1 = ref({
  grid: {
    left: "7%",
    right: "7%",
    top: "20%",
    bottom: "22%"
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
    textStyle: {
      color: "#ffffff",
      fontSize: 28
    }
  },
  xAxis: {
    data: [
      '市本级', '丰宁县', '围场县', '隆化县', '平泉市', '滦平县', '承德县', '宽城县', '兴隆县', '营子区'
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
      rotate: 30, // 旋转角度（如45度，范围-90到90）
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
    data: [15, 18, 16, 14, 22, 18, 20, 28, 38, 30]
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
    data: [10, 8, 6, 4, 12, 8, 10, 8, 8, 10]
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
    data: [90, 55, 50, 15, 85, 40, 60, 15, 60, 60]
  }
  ]
})

const option2 = ref({
  grid: {
    left: "16%",
    right: "16%",
    top: "20%",
    bottom: "22%"
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
    top: "5%",
    textStyle: {
      color: "#ffffff",
      fontSize: 26
    }
  },
  xAxis: {
    data: [
      '市本级', '丰宁县'
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
      rotate: 30, // 旋转角度（如45度，范围-90到90）
      interval: 0, // 强制显示所有标签（默认可能自动隐藏）
      align: 'center', // 水平对齐方式（center/left/right）
      verticalAlign: 'middle' // 垂直对齐方式（middle/top/bottom）
    },
  },
  yAxis: [{
    type: "value",
    // name: "件",
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
    data: [15, 18]
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
    data: [10, 8]
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
    data: [90, 55]
  }
  ]
})

</script>
<style scoped lang="scss">
.home-page-left {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  // padding: 112px 0px 96px 136px;
  padding: 112px 0px 0px 136px;
}

.home-page-left-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.top-overview {
  width: 100%;
  height: 446px;
  background-image: url('assets/image/trafficLawEnforcement/topbg.png');
  background-size: 100% 100%;
  padding: 65px 50px 75px 77px;
  gap: 42px;

  .top-overview-item {
    width: 478px;
    height: 235px;
    background-image: url('assets/image/trafficLawEnforcement/topItemBg.png');
    background-size: 100% 100%;

    .top-overview-item-top {
      width: 100%;
      height: 88.61px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 40px;
        color: #FFFFFF;
        line-height: 56px;
        text-shadow: 0px 15px 37px rgba(0, 0, 0, 0.3);
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .top-item-icon {
        width: 43.98px;
        height: 48.31px;
      }
    }

    .top-overview-item-bottom {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      position: relative;

      .see-below-icon {
        width: 36px;
        height: 36px;
        position: absolute;
        top: 12px;
        right: 12px;
      }

      .value {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 76px;
        line-height: 99px;
        text-shadow: 0px 50px 31px rgba(181, 213, 248, 0.06);
        text-align: center;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(57.40937470425966deg, #FFFFFF 23%, #AAD0FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .unit {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 30px;
        color: #5385C4;
        line-height: 26px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

.middle-overview {
  width: 100%;
  height: 835px;
  background-image: url('assets/image/trafficLawEnforcement/middlebg.png');
  background-size: 100% 100%;
  padding: 62px 60px 66px 80px;

  .middle-overview-left {
    width: 1170px;
    height: 100%;
    background: rgba(39, 79, 121, 0.2);
    box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
    border-radius: 10px 10px 10px 10px;
    padding: 20px 25px;
  }

  .middle-overview-right {
    width: 355px;
    height: 100%;
    background: rgba(39, 79, 121, 0.2);
    box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
    border-radius: 10px 10px 10px 10px;
    padding: 20px 15px;
  }
}

.bottom-overview-content {
  width: 100%;
  height: 509px;
  background-image: url('assets/image/trafficLawEnforcement/bottombg.png');
  background-size: 100% 100%;
}

.middle-overview-left-topView {
  width: 100%;
  height: 161px;
  margin-top: 23px;
}

.middle-overview-right-topView {
  width: 100%;
  height: 161px;
  margin-top: 20px;
}

.topView-right {
  height: 100%;
}

.topView-right-item {
  width: 181px;
  height: 100%;
  background-image: url('assets/image/trafficLawEnforcement/itemSbg.png');
  background-size: 100% 100%;

  .topView-right-item-top {
    width: 100%;
    height: 60.7px;
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
    font-weight: 500;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 56px;
    text-shadow: 0px 15px 37px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .topView-right-item-bottom {
    width: 100%;
    height: 100.3px;

    .topView-s-value {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 36px;
      color: #FFFFFF;
      line-height: 36px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 400;
        font-size: 28px;
        color: #5385C4;
        line-height: 26px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }

    .topView-s-percent {
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 400;
      font-size: 28px;
      line-height: 39px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #47D7FF 0%, #DAFDFF 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.topView-left {
  width: 354px;
  height: 100%;
  background-image: url('assets/image/trafficLawEnforcement/itemBIGbg.png');
  background-size: 100% 100%;

  .topView-left-top {
    width: 100%;
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
    font-weight: 700;
    font-size: 30px;
    color: #FFFFFF;
    line-height: 61px;
    font-style: normal;
    text-transform: none;
  }

  .topView-left-bottom {
    width: 100%;
    height: 100px;

    .topView-line {
      width: 0px;
      height: 76px;
      border: 2px solid;
      border-image: linear-gradient(180deg, rgba(110.86700052022934, 182.47671157121658, 202.28365033864975, 0), rgba(110.86700052022934, 182.47671157121658, 202.28365033864975, 0.9100000262260437), rgba(110.86700052022934, 182.47671157121658, 202.28365033864975, 0)) 2 2;
      margin: 10px 10px 0px;
    }

    .topView-value {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 46px;
      color: #FFFFFF;
      line-height: 100px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      text-align: center;

      span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 30px;
        color: #5385C4;
        line-height: 26px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }

    .topView-compare {
      img {
        width: 10px;
        height: 15px;
        margin-right: 5px;
      }

      .compare-title {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 30px;
        line-height: 42px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(180deg, #47D7FF 0%, #DAFDFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .compare-value {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 500;
        font-size: 30px;
        color: #E54E4E;
        line-height: 42px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .compare-value1 {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 500;
        font-size: 30px;
        color: #32F48A;
        line-height: 42px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

.middle-overview-title {
  position: relative;
}

.see-below-icon {
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  top: -5px;
  right: 0px;
}
</style>
