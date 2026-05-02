<template>
  <div class="content-tab-month column">
    <q-scroll-area :thumb-style="state.thumbStyle" :bar-style="state.barStyle" class="fit">
      <div class="content-tab-top full-width column">
        <ItemTitle title="报警类型分布" />
        <v-chart autoresize :option="distributionOption" class="col distributionChart" />
      </div>
      <div class="content-tab-fourColor full-width column">
        <ItemTitle title="安全风险四色图" />
        <div class="fourColor-content row justify-between items-center">
          <div class="fourColor-item cursor-pointer" v-for="item in state.fourColorData" :key="item.color"
            :style="{ backgroundImage: item.bg }" @click="showFourDialog(item.plotPoint)">
            <div class="fourColor-value">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="content-tab-administration-top full-width column">
        <ItemTitle title="高风险行政区Top3" />
        <div class="administration-top-content row justify-between items-center">
          <div class="dividing-line1"></div>
          <div class="dividing-line2"></div>
          <div class="administration-top-item column justify-center items-center" v-for="item in state.heightTOP"
            :key="item.name">
            <div class="administration-top-item-imgValue">
              <q-img :src="item.img" alt=""
                :class="{ 'administration-top-item-img1': item.name === 'TOP1', 'administration-top-item-img2': item.name === 'TOP2', 'administration-top-item-img3': item.name === 'TOP3' }" />
              <span class="administration-top-item-text-value">{{ item.value }}</span>
            </div>
            <div class="administration-top-item-text">
              <span class="administration-top-item-text-name" :style="{ background: item.bgColor }">
                {{ item.name }}</span>
              <span class="administration-top-item-text-district">{{ item.district }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-tab-administration-top full-width column">
        <ItemTitle title="低风险行政区Top3" />
        <div class="administration-top-content row justify-between items-center">
          <div class="dividing-line1"></div>
          <div class="dividing-line2"></div>
          <div class="administration-top-item column justify-center items-center" v-for="item in state.lowTOP"
            :key="item.name">
            <div class="administration-top-item-imgValue">
              <q-img :src="item.img" alt=""
                :class="{ 'administration-top-item-img1': item.name === 'TOP1', 'administration-top-item-img2': item.name === 'TOP2', 'administration-top-item-img3': item.name === 'TOP3' }" />
              <span class="administration-top-item-text-value">{{ item.value }}</span>
            </div>
            <div class="administration-top-item-text">
              <span class="administration-top-item-text-name" :style="{ background: item.bgColor }">
                {{ item.name }}</span>
              <span class="administration-top-item-text-district">{{ item.district }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-tab-administration-topPro full-width column">
        <ItemTitle title="高风险行政区Top3" />
        <div class="administration-topPro-content column">
          <div class="administration-topPro-item row justify-between items-center" v-for="item in state.heightPro"
            :key="item.name">
            <q-img :src="item.img" class="col-auto administration-topPro-content-img" alt="" />
            <div class="col administration-topPro-content-text column">
              <div class="topPro-content-text-heard full-width row justify-between">
                <span class="topPro-content-text-heard-name">
                  {{ item.name }}
                </span>
                <div class="topPro-content-text-heard-value" :style="{ background: item.valueColor }">
                  {{ item.value }}
                  <span class="topPro-content-text-heard-unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="topPro-content-text-foot full-width">
                <q-linear-progress rounded size="10px" :value="item.progress" class="foot-pro" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-tab-administration-lowPro full-width column">
        <ItemTitle title="低风险行政区Top3" />
        <div class="administration-topPro-content column">
          <div class="administration-topPro-item row justify-between items-center" v-for="item in state.lowPro"
            :key="item.name">
            <q-img :src="item.img" class="col-auto administration-topPro-content-img" alt="" />
            <div class="col administration-topPro-content-text column">
              <div class="topPro-content-text-heard full-width row justify-between">
                <span class="topPro-content-text-heard-name">
                  {{ item.name }}
                </span>
                <div class="topPro-content-text-heard-value" :style="{ background: item.valueColor }">
                  {{ item.value }}
                  <span class="topPro-content-text-heard-unit">{{ item.unit }}</span>
                </div>
              </div>
              <div class="topPro-content-text-foot full-width">
                <q-linear-progress rounded size="10px" :value="item.progress" class="foot-pro" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <FourDialog />
  </div>
</template>

<script setup lang="ts" name="">
import { ref, reactive, defineAsyncComponent } from 'vue'
import ItemTitle from "../../../components/itemTitle.vue";
import * as echarts from "echarts";
import img1 from 'src/assets/image/dialog/切图 549.png'
import img2 from 'src/assets/image/dialog/切图 552.png'
import img3 from 'src/assets/image/dialog/切图 553.png'
import img4 from 'src/assets/image/dialog/切图 554.png'
import img5 from 'src/assets/image/dialog/切图 555.png'
import img6 from 'src/assets/image/dialog/切图 556.png'
import img7 from 'src/assets/image/dialog/切图 557.png'
import img8 from 'src/assets/image/dialog/切图 560.png'
import img9 from 'src/assets/image/dialog/切图 561.png'
import img10 from 'src/assets/image/dialog/切图 562.png'
import img11 from 'src/assets/image/dialog/切图 568.png'
import img12 from 'src/assets/image/dialog/切图 569.png'
import img13 from 'src/assets/image/dialog/切图 570.png'
import img14 from 'src/assets/image/dialog/切图 573.png'
import img15 from 'src/assets/image/dialog/切图 574.png'
import img16 from 'src/assets/image/dialog/切图 575.png'

import { useTransportationDialogStore } from "../../../store/index";
const FourDialog = defineAsyncComponent(() => import("../../secondDialog/fourDialog.vue"));

const storeTransportationDialog = useTransportationDialogStore();

const showFourDialog = (color) => {
  storeTransportationDialog.setShowFourDialog(color);
}

const state = reactive({
  fourColorData: [
    {
      value: '78辆',
      bg: 'url("' + img1 + '")',
      plotPoint: 'fourColorOfRed',
    },
    {
      value: '173辆',
      bg: 'url("' + img2 + '")',
      plotPoint: 'fourColorOfYellow',
    },
    {
      value: '645辆',
      bg: 'url("' + img4 + '")',
      plotPoint: 'fourColorOfGreen',
    },
    {
      value: '947辆',
      bg: 'url("' + img3 + '")',
      plotPoint: 'fourColorOfBlue',
    }
  ],
  heightTOP: [
    {
      img: img5,
      name: 'TOP1',
      bgColor: 'linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%)',
      value: '158次',
      district: '兴隆县'
    },
    {
      img: img6,
      name: 'TOP2',
      bgColor: 'linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%)',
      value: '58次',
      district: '兴隆县'
    },
    {
      img: img7,
      name: 'TOP3',
      bgColor: 'linear-gradient(180deg, #FFDB79 0%, #FFFBB8 100%)',
      value: '25次',
      district: '兴隆县'
    },
  ],
  lowTOP: [
    {
      img: img8,
      name: 'TOP1',
      bgColor: 'linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%)',
      value: '5次',
      district: '兴隆县'
    },
    {
      img: img9,
      name: 'TOP2',
      bgColor: 'linear-gradient(180deg, #68EBFF 0%, #54C6FB 100%)',
      value: '10次',
      district: '兴隆县'
    },
    {
      img: img10,
      name: 'TOP3',
      bgColor: 'linear-gradient(180deg, #9679FF 0%, #C5B8FF 100%)',
      value: '15次',
      district: '兴隆县'
    },
  ],
  heightPro: [
    {
      img: img11,
      name: '客运企业XXX',
      value: '899',
      valueColor: 'linear-gradient(180deg, #FF7979 0%, #FFB8B8 100%)',
      unit: '次',
      progress: 0.75,
    },
    {
      img: img12,
      name: '客运企业XXX',
      value: '762',
      valueColor: 'linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%)',
      unit: '次',
      progress: 0.65,
    },
    {
      img: img13,
      name: '客运企业XXX',
      value: '543',
      valueColor: 'linear-gradient(180deg, #FFE479 0%, #FEFFDC 100%)',
      unit: '次',
      progress: 0.55,
    },
  ],
  lowPro: [
    {
      img: img14,
      name: '客运企业XXX',
      value: '899',
      valueColor: 'linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%)',
      unit: '次',
      progress: 0.75,
    },
    {
      img: img15,
      name: '客运企业XXX',
      value: '762',
      valueColor: 'linear-gradient(180deg, #68EBFF 0%, #54C6FB 100%)',
      unit: '次',
      progress: 0.65,
    },
    {
      img: img16,
      name: '客运企业XXX',
      value: '543',
      valueColor: 'linear-gradient(180deg, #92B2FF 0%, #CBD0FF 100%)',
      unit: '次',
      progress: 0.55,
    },
  ],
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
})

const distributionOption = ref({
  legend: {
    top: '45%',
    right: '5%',
    orient: 'vertical',
    textStyle: { color: 'rgba(163, 191, 216, 1)', fontSize: 42, },
    data: ['报警数'],
  },
  radar: {
    radius: '70%',
    center: ['45%', '52%'],
    startAngle: 0,
    triggerEvent: true,
    name: { textStyle: { color: 'rgba(195, 211, 226, 1)', fontSize: '38', padding: [10, 10] } },
    nameGap: '2',
    splitNumber: 5,
    axisLine: {
      // 坐标轴轴线样式，可设置颜色、宽度等
      lineStyle: { color: 'rgba(9,107,166, 0.2)' }
    },
    splitLine: {
      // 分割线样式，用于划分刻度区间
      lineStyle: {
        width: 1,
        color: ['#096ba6', '#096ba6', 'rgba(9,107,166, 0.3)', 'rgba(9,107,166, 0.7)'].reverse()
      }
    },
    axisTick: {
      // 坐标轴刻度样式，可控制是否显示、长度等
      show: false,
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    },
    axisLabel: {
      // 坐标轴标签（刻度值相关显示，这里可根据需要调整）
      show: true,
    },
    indicator: [
      { name: '超速', max: 650 },
      { name: '抽烟', max: 1600 },
      { name: '拨打电话', max: 3000 },
      { name: '疲劳驾驶', max: 3800 },
    ],
    splitArea: {
      areaStyle: {
        color: ['RGBA(28, 55, 82, 1)', 'RGBA(31, 66, 99, 1)', 'RGBA(20, 55, 91, 1)', 'rgba(9,107,166, 0.4)',].reverse(),
        shadowColor: 'rgba(9,107,166, 0.5)',
        shadowBlur: 30,
        shadowOffsetX: 10,
        shadowOffsetY: 10
      }
    },

  },
  series: [{
    name: '报警数',
    type: 'radar',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255, 107, 48, 1)',
          },
          {
            offset: 1,
            color: 'rgba(80, 194, 255, 1)',
          },
        ],
        global: false, //  缺省为  false
      }
    },
    symbol: 'circle',
    symbolSize: 12,
    itemStyle: { color: 'rgba(48, 176, 255, 1)', borderColor: 'rgba(255, 255, 255, 1)', borderWidth: 5, },
    lineStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255, 107, 48, 1)',
          },
          {
            offset: 1,
            color: 'rgba(80, 194, 255, 1)',
          },
        ],
        global: false, //  缺省为  false
      }
      , width: 3
    },
    label: { show: false, },
    data: [[460, 1300, 1500, 2350]]
  }
  ]
})
</script>

<style scoped>
.content-tab-month {
  width: 100%;
  height: 100%;
}

.content-tab-top {
  width: 100%;
  height: 434px;
}

.fourColor-content {
  padding: 47px 80px 47px 45px;
}

.fourColor-item {
  width: 283px;
  height: 85px;
  background-size: 100% 100%;
}

.fourColor-value {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 48px;
  color: #FFFFFF;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.administration-top-content {
  padding: 30px 114px 70px;
  position: relative;
}

.dividing-line1 {
  width: 6px;
  height: 184px;
  background-image: url("assets/image/dialog/切图 565.png");
  background-size: 100% 100%;
  position: absolute;
  left: 420px;
  top: 50px;
}

.dividing-line2 {
  width: 6px;
  height: 184px;
  background-image: url("assets/image/dialog/切图 565.png");
  background-size: 100% 100%;
  position: absolute;
  left: 860px;
  top: 50px;
}

.administration-top-item-img1 {
  width: 167px;
  height: 181px;
}

.administration-top-item-img2 {
  width: 156px;
  height: 169px;
}

.administration-top-item-img3 {
  width: 146px;
  height: 158px;
}

.administration-top-item-imgValue {
  position: relative;
}

.administration-top-item-text {
  padding-top: 10px;
}

.administration-top-item-text-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 33px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 20px;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.administration-top-item-text-value {
  width: 100%;
  height: 100%;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 46px;
  line-height: 155px;
  color: #FFFFFF;
  text-align: center;
  font-style: normal;
  text-transform: none;
  position: absolute;
  left: 0;
  top: 0;
}

.administration-top-item-text-district {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 38px;
  color: #FFFFFF;
  line-height: 38px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.administration-topPro-content {
  padding: 46px 77px;
}

.administration-topPro-item {
  padding-bottom: 30px;
}

.administration-topPro-content-img {
  width: 75px;
  height: 81px;
  margin-right: 40px;
}

.topPro-content-text-heard-name {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 41px;
  color: #E0E5FA;
  line-height: 41px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, rgba(224, 229, 250, 1) 20%, rgba(20, 158, 255, 0.56) 90%, rgba(239, 252, 254, 0.36) 100%);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.topPro-content-text-heard-value {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 58px;
  line-height: 45px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
}

.topPro-content-text-heard-unit {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 38px;
  line-height: 45px;
  color: #C3D3E2;
  text-align: right;
  font-style: normal;
  text-transform: none;
}

:deep(.q-linear-progress__model--determinate) {
  background: linear-gradient(180deg, #19AFD8 0%, #2ec9f3ae 100%);
}

:deep(.q-linear-progress__track--light) {
  background: #061726;
}
</style>
