<template>
  <div class="lawItem2">
    <div class="lawItem2-content column">
      <div class="lawItem2-content-top row justify-between items-center">
        <div class="lawItem2-content-top-item" :class="{ 'topS-item-active': activeItem === '1' }"
          @click="activeItem = '1'">规范执法行为</div>
        <div class="lawItem2-content-top-item" :class="{ 'topS-item-active': activeItem === '2' }"
          @click="activeItem = '2'">案件回访制度</div>
        <div class="lawItem2-content-top-item" :class="{ 'topS-item-active': activeItem === '3' }"
          @click="activeItem = '3'">首违不罚/轻微不罚</div>
      </div>
      <div class="lawItem2-content-bottom col" v-if="activeItem === '1'">
        <div class="card1-title row justify-between items-start">
          <ItemTitle title="典型案件：沈秀伟擅自超限运输行驶公路案" :size="34" width="70%" />
          <img src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = '说理式执法案件'" class="arrow"
            alt="">
        </div>
        <div class="card1-content" title="2024年10月25日，围场县交通运输综合执法大队 公安交警在半截塔联合执法巡查时，发现...">
          2024年10月25日，围场县交通运输综合执法大队，公安交警在半截塔联合执法巡查时，发现...
        </div>
      </div>
      <div class="lawItem2-content-bottom col" v-if="activeItem === '2'">
        <img src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = '案件回访制度'" class="arrow1"
          alt="">
        <v-chart autoresize :option="Option3D" class="fit" />
      </div>
      <div class="lawItem2-content-bottom col" v-if="activeItem === '3'">
        <div class="card3-content row justify-between">
          <img src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = '首违不罚/轻微不罚'"
            class="arrow1" alt="">
          <div class="card3-content-item" v-for="item in card3Data" :key="item.name">
            <div class="card3-content-item-top">{{ item.name }}</div>
            <div class="card3-content-item-bottom">
              {{ item.value }}
              <span>{{ item.unit }}</span>
              <!-- <img class="card3-content-item-bottom-img" src="images/cdsgl/trafficLawEnforcement/seebelowicon.png"
                alt=""> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogCom v-if="activeDialog === '说理式执法案件'">
      <LogicalReasoning :title="'说理式执法案件'" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '案件回访制度'">
      <ImplementationSystem :title="'案件回访制度落实'" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '首违不罚/轻微不罚'">
      <NoPunishment :title="'首违不罚/轻微不罚'" />
    </DialogCom>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, toRefs } from 'vue'
import { useLawActiveDialogStore } from "../../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
//项标题
const ItemTitle = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/ItemTitle.vue")
);
//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);

const NoPunishment = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/noPunishment.vue")
);
const ImplementationSystem = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/implementationSystem.vue")
);
const LogicalReasoning = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/logicalReasoning.vue")
);
const activeItem = ref('1')

const card3Data = ref([
  {
    name: "首违不罚",
    value: "87",
    unit: "件"
  },
  {
    name: "轻微不罚",
    value: "0",
    unit: "件"
  }
]);

function getPie3D(pieData: any[], internalDiameterRatio: number) {
  let series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {};
      if (typeof pieData[i].itemStyle.color != 'undefined') itemStyle.color = pieData[i].itemStyle.color;
      if (typeof pieData[i].itemStyle.opacity != 'undefined') itemStyle.opacity = pieData[i].itemStyle.opacity;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
  }

  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: { show: false },
    itemStyle: { opacity: 0.05, color: '#E1E8EC' },
    parametricEquation: {
      u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
      v: { min: 0, max: Math.PI, step: Math.PI / 20 },
      x: function (u: number, v: number) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: number, v: number) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: number, v: number) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      }
    }
  });

  return series;
}

function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  k = typeof k !== 'undefined' ? k : 1 / 3;

  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  let hoverRate = isHovered ? 1.05 : 1;

  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 1 * height : -1;
    }
  };
}

const pieData2 = [
  { name: '电话回访', value: 856, itemStyle: { color: '#2DB2C9', opacity: 0.8 } },
  { name: '上门回访', value: 406, itemStyle: { color: '#18DCDF', opacity: 0.8 } },
  { name: '邀请座谈', value: 223, itemStyle: { color: '#3DC67A', opacity: 0.8 } },
  { name: '问卷调查', value: 102, itemStyle: { color: '#EBB568', opacity: 0.8 } },
];

const series2 = getPie3D(pieData2, 0.7);
const Option3D = ref({
  backgroundColor: 'transparent',
  animation: true,
  silent: false,
  title: {
    text: '72项',
    top: '38%',
    left: '23%',
    textStyle: {
      fontFamily: 'AlibabaPuHuiTiRegular',
      fontWeight: 400,
      fontSize: 42,
      color: '#FFFFFF',
      textAlign: 'center',
      fontStyle: 'normal',
      textTransform: 'none'
    }
  },
  legend: [
    {
      data: pieData2.map(item => item.name),
      top: '14%',
      right: '15%',
      orient: 'vertical',
      itemWidth: 20,
      itemHeight: 20,
      itemGap: 15, // 图例项之间的间距
      // width: '48%',
      textStyle: {
        fontFamily: 'AlibabaPuHuiTiRegular',
        fontWeight: 400,
        fontSize: 30,
        color: '#CAE9FF',
        textAlign: 'left',
        fontStyle: 'normal',
        textTransform: 'none'
      }
    }
  ],
  tooltip: {
    show: true,
    trigger: 'item',
    backgroundColor: 'rgba(0, 15, 30, 0.9)',
    borderColor: '#00D4FF',
    borderWidth: 2,
    padding: [12, 16],
    borderRadius: 6,
    textStyle: {
      fontSize: 14,
      fontFamily: 'AlibabaPuHuiTiRegular',
      color: '#FFFFFF'
    },
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
    formatter: function (params: any) {
      if (params.seriesName === 'mouseoutSeries') return '';
      const color = params.color || '#00D4FF';
      const name = params.seriesName;
      const pieDataItem = pieData2.find(item => item.name === name);
      const value = pieDataItem ? pieDataItem.value : 0;
      return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
                </div>
            </div>`;
    }
  },
  xAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  yAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  zAxis3D: {
    min: -1,
    max: 1,
    show: false
  },
  grid3D: {
    show: false,
    boxHeight: 0.03,
    top: '-5%',
    left: '-20%',
    height: '100%',
    environment: 'none',
    light: {
      main: {
        intensity: 1.2,
        shadow: false
      },
      ambient: {
        intensity: 0.3
      }
    },
    viewControl: {
      distance: 110,
      alpha: 28,
      beta: 50,
      autoRotate: false,
      enableRotate: true,
      enableZoom: false,
      enablePan: false,
      mouseRotateSpeed: 1,
      mousePanSpeed: 0,
      mouseZoomSpeed: 0
    }
  },
  series: series2
});
</script>

<style scoped lang="scss">
.lawItem2 {
  width: 100%;
  height: 100%;
  padding: 30px 10px 20px;
}

.lawItem2-content {
  width: 100%;
  height: 100%;
}

.lawItem2-content-top {
  width: 100%;

  .lawItem2-content-top-item {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 30px;
    color: #C2D2D4;
    line-height: 42px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .topS-item-active {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 700;
    font-size: 30px;
    color: #FFFFFF;
    line-height: 42px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.lawItem2-content-bottom {
  padding-top: 25px;
  position: relative;
}

.card1-title {
  padding: 25px 0px 20px;
}

.card1-content {
  width: 668px;
  /* 修复：高度留余量，避免文字截断 */
  height: 102px;
  /* 或 min-height: 100px */
  font-family: "Alibaba PuHuiTi 3.0", "Alibaba PuHuiTi 30", sans-serif;
  /* 补充 sans-serif  fallback */
  font-weight: 400;
  font-size: 32px;
  color: #A9BEC8;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 修复1：添加 display: -webkit-box（多行省略必需） */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 修复2：首行缩进用 em 单位，适配字体大小 */
  text-indent: 2em;
  /* 32px × 2 = 64px，与原数值一致但更灵活 */
}

.card3-content {
  padding: 10px 10px 10px;
}

.card3-content-item {
  width: 328px;
  height: 193px;
  background-image: url("images/cdsgl/trafficLawEnforcement/ywbg.png");
  background-size: 100% 100%;

  .card3-content-item-top {
    width: 100%;
    height: 84px;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 32px;
    line-height: 84px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #9FE7FF 0%, #9FEAFF 25%, #EAFEFF 85%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card3-content-item-bottom {
    width: 100%;
    height: 109px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 64px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(57.40937470425966deg, #FFFFFF 23%, #AAD0FF 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;

    .card3-content-item-bottom-img {
      width: 34px;
      height: 33px;
      position: absolute;
      top: 0px;
      right: 17px;
    }

    span {
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 400;
      font-size: 32px;
      color: #E6F6FA;
      line-height: 44px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}

.arrow1 {
  width: 34px;
  height: 34px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow {
  width: 34px;
  height: 34px;
}

.arrow1 {
  width: 34px;
  height: 34px;
  position: absolute;
  right: 10px;
  top: 30px;
}
</style>
