<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">巡游出租车综合分析</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="col full-width">
          <q-scroll-area :thumb-style="state.thumbStyle" :bar-style="state.barStyle" class="fit">
            <div class="mb-[20px] mt-[10px]">
              <q-img :src="img1" class="w-[369px] h-[58px]" alt=""></q-img>
            </div>
            <div class="compare-content h-[387px] cruise-taxi-base">
              <!-- <div class="bg-[pink]"> -->
              <v-chart :option="option1" style="height: 265px; width: 600px;" />
              <!-- </div> -->
              <div>
                <q-img :src="img2" class="w-[6px] h-[250px]" alt=""></q-img>
              </div>
              <div>
                <div class="title-icon cs-title">新能源占比</div>
                <div>
                  <v-chart :option="option2" style="height: 271px; width: 266px;" />
                </div>
              </div>
            </div>
            <div class="mb-[20px] mt-[10px]">
              <q-img :src="img3" class="w-[369px] h-[58px]" alt=""></q-img>
            </div>
            <div class="compare-content h-[804px] relative">
              <div class="h-full t-list">
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img4" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">4785</span><span class="t-unit">单</span></div>
                    <div class="cs-title">今日订单量</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img5" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">5.3</span><span class="t-unit">单/车</span></div>
                    <div class="cs-title">车均订单量</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img6" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">17.30</span><span class="t-unit">公里</span></div>
                    <div class="cs-title">平均行驶里程</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img7" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">5.3</span><span class="t-unit">公里</span></div>
                    <div class="cs-title">平均载客里程</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img8" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div class="cs-title">里程利用率</div>
                  </div>
                  <div class="t-item-right">
                    <div class="t-red">49.5%</div>
                    <div class="slider-box">
                      <div class="active-line line2" :style="{ width: '80%' }">
                        <div class="slider-icon icon2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img9" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div class="cs-title">时间利用率</div>
                  </div>
                  <div class="t-item-right ">
                    <div class="t-yellow">49.5%</div>
                    <div class="slider-box">
                      <div class="active-line line1" :style="{ width: '80%' }">
                        <div class="slider-icon icon1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row-line top-[37%]"></div>
              <div class="cloum-line"></div>
              <div class="row-line bottom-[27%]"></div>
            </div>
            <div class="content-top-select row col-auto mt-[30px] mb-[20px]">
              <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
                :class="{ 'active': selsectBtn === item }" @click="handleSelect1(item)">
                {{ item }}
              </div>
            </div>
            <div class="order-compare-content">
              <ItemTitle title="订单小时变化情况">
              </ItemTitle>
              <v-chart :option="option3" style="height: 500px; width: 100%;" />
            </div>
            <div class="order-compare-content">
              <ItemTitle title="里程利用率小时变化情况"></ItemTitle>
              <v-chart :option="option4" style="height: 500px; width: 100%;" />
            </div>
            <div class="order-compare-content">
              <ItemTitle title="时间利用率小时变化情况">
              </ItemTitle>
              <v-chart :option="option5" style="height: 500px; width: 100%;" />
            </div>
            <div class="operation-compare-content">
              <ItemTitle title="跨区运行情况"></ItemTitle>
              <div class="arr cursor-pointer top-[1%] right-[0%] w-[60px] h-[59px]"
                @click="handleSecondDialogClick('operationLog')">
              </div>
              <div style="display: flex; align-items: center;">
                <q-img :src="img10" class="w-[102px] h-[102px] mr-[20px]" alt=""></q-img>
                <v-chart :option="option6" style="height: 200px; width: 1100px;" />
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup name="cruiseTaxiDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useAnalyzeDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import img1 from 'src/assets/component/城市交通/切图 328.png'
import img2 from 'src/assets/component/城市交通/切图 823.png'
import img3 from 'src/assets/component/城市交通/切图 3281.png'
import img4 from 'src/assets/component/城市交通/切图 2441.png'
import img5 from 'src/assets/component/城市交通/切图 2442.png'
import img6 from 'src/assets/component/城市交通/切图 2443.png'
import img7 from 'src/assets/component/城市交通/切图 2444.png'
import img8 from 'src/assets/component/城市交通/切图 2445.png'
import img9 from 'src/assets/component/城市交通/切图 2446.png'
import img10 from 'src/assets/component/城市交通/切图 834.png'




const storeAnalyzeDialog = useAnalyzeDialogStore();
const isDialogVisible = computed(() => storeAnalyzeDialog.showAnalyzeDialog === 'cruiseTaxi');
const { showAnalyzeDialog } = storeToRefs(storeAnalyzeDialog);

const selsectBtns = ['今日', '本月', '上月']
const selsectBtn = ref('今日')

const state = reactive({
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: "0.75",
  },
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: "0.2",
  },
});

function handleSelect1(item) {
  selsectBtn.value = item
}

const handleSecondDialogClick = (value) => {
  storeAnalyzeDialog.setShowOperationLogDialog(value)
}

const handleClose = () => {
  storeAnalyzeDialog.setShowAnalyzeDialog(''); // 假设store中有这样的方法
};


const option1 = ref({})

function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {

  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
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

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < - Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 2 * height : -1;
    }
  };
};

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {

  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {

    sumValue += pieData[i].value;

    let seriesItem = {
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

      let itemStyle = {};

      typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    // console.log(series[i]);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value);

    startValue = endValue;

    legendData.push(series[i].name);
  }


  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: .31,
      color: '#348399',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? 0 : -5;
      },
    },
  });
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.5,
      color: '#0ff',

    },

    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -15 : -20;
      },
    },
  });
  return series;
}
let colors = ['#EAB161', '#32B2CC', '#17EFCA']
let xData = ['燃油车', '新能源车', '双燃料车']
let yData = [18, 32, 45]
// 传入数据生成 option
let optionsData = [];
for (let i = 0; i < xData.length; i++) {
  optionsData.push(
    {
      name: xData[i],
      value: yData[i],
      itemStyle: {
        color: colors[i],
      }
    }
  );
}

const series = getPie3D(optionsData, 0.8);

series.push({
  name: 'pie2d',
  type: 'pie',

  label: {
    opacity: 1,
    fontSize: 12,
    lineHeight: 20,
    textStyle: {
      fontSize: 12,
    },
  },
  labelLine: {

    length: 60,
    length2: 60,
  },
  startAngle: -50, //起始角度，支持范围[0, 360]。
  clockwise: true, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
  radius: ['0', '0'],

  center: ['20%', '20%'],
  data: optionsData,
  itemStyle: {
    opacity: 1,
  },
});
// 准备待返回的配置项，把准备好的 legendData、series 传入。
option1.value = {
  legend: {
    tooltip: {
      show: true,
    },
    data: xData,
    right: '5%',
    top: 'center',
    itemGap: 20,
    orient: "vertical",
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
  animation: false,
  tooltip: {
    formatter: params => {
      if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
        return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option1.value.series[params.seriesIndex].pieData.value}`;
      }
    },
    textStyle: {
      fontSize: 12
    },
  },
  title: {

    x: 'center',
    top: '20',
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
  },
  // backgroundColor: '#333',
  labelLine: {
    show: false,
    lineStyle: {
      color: 'transparent',
    },
  },
  label: {
    show: false,
    color: 'transparent',
    position: 'outside',
    formatter: '{b} \n{c} {d}%',
  },
  xAxis3D: {
    min: -1,
    max: 1,
  },
  yAxis3D: {
    min: -1,
    max: 1,
  },
  zAxis3D: {
    min: -1,
    max: 1,
  },
  grid3D: {
    show: false,
    boxHeight: 0.5,
    //top: '30%',
    bottom: '20%',
    left: '-10%',
    viewControl: {
      autoRotate: false, // 自动旋转
      rotateSensitivity: 0, // 设置为0无法旋转
      zoomSensitivity: 0, // 设置为0无法缩放
      panSensitivity: 0, // 设置为0无法平移
      beta: 90,
      alpha: 30,
    },

  },

  series: series,
};


const value2 = 21.18
const option2 = ref({
  // backgroundColor: '#243252',
  title: {
    text: `${value2}%`,
    textStyle: {
      color: '#ffffff',
      fontSize: 40
    },
    itemGap: 5,
    left: 'center',
    top: 'center',

  },
  tooltip: {
    show: false,
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    show: false,
  },
  series: {
    name: '',
    type: 'pie',
    radius: ['65%', '80%'],
    avoidLabelOverlap: true,
    startAngle: 405 - 1.8 * value2,
    hoverAnimation: false,
    label: {
      normal: {
        show: false,
        position: 'center',
      },
      emphasis: {
        show: false,
      },
    },
    labelLine: {
      normal: {
        show: false,
      },
    },
    data: [
      {
        value: 100 - value2,
        name: '背景',
        itemStyle: {
          normal: { color: 'rgba(255,255,255,0.2)' },
        },
      },
      {
        value: value2,
        name: '设备完好率',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [
              { offset: 0, color: 'rgba(255, 145, 111, 1)' },
              { offset: .35, color: 'rgba(243, 146, 126, 1)' },
              { offset: .7, color: 'rgba(255, 225, 154, 1)' },
              { offset: 1, color: 'rgba(255, 225, 154, 1)' },
            ]),
            borderColor: 'none',
            borderWidth: 1,
          },

        },
      },
    ],
  },
})
const option3 = ref({
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
        "1时",
        "2时",
        "3时",
        "4时",
        "5时",
        "6时",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位:单",
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
      name: "单位:单/车 ",
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
      name: "今日订单",
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
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [350, 250, 320, 420, 380, 180],
    },
    {
      name: "上周同期",
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
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [300, 200, 280, 350, 320, 150],
    },
    {
      name: "车均订单",
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
      data: [350, 250, 320, 420, 380, 180], // 折线图的数据
    },
  ],
})
const option4 = ref({
  // backgroundColor: '#1b1d21',
  legend: {
    // icon: "rect",
    textStyle: {
      fontSize: 14,
      color: "rgba(255,255,255,.8)"
    },
    data: [
      {
        name: "里程利用率",
        itemStyle: {
          color: "rgba(53, 176, 221, 1)"
        }
      }, {
        name: "上周同期",
        itemStyle: {
          color: "#CE855C"
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
        "1时",
        "2时",
        "3时",
        "4时",
        "5时",
        "6时",
      ],
    },
  ],
  yAxis: [
    {
      name: "单位:%",
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 5, 0],
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
      name: '上周同期',
      type: "line",
      smooth: true,
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
      data: [22, 41, 45, 48, 55, 33],
    },
    {
      name: '里程利用率',
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
      data: [41, 20, 48, 55, 33, 44],
    }],
})
const option5 = ref({
  // backgroundColor: '#1b1d21',
  legend: {
    // icon: "rect",
    textStyle: {
      fontSize: 14,
      color: "rgba(255,255,255,.8)"
    },
    data: [
      {
        name: "时间里程利用率",
        itemStyle: {
          color: "rgba(53, 176, 221, 1)"
        }
      }, {
        name: "上周同期",
        itemStyle: {
          color: "rgba(109, 255, 153, 1)"
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
        "1时",
        "2时",
        "3时",
        "4时",
        "5时",
        "6时",
      ],
    },
  ],
  yAxis: [
    {
      name: "单位:%",
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 5, 0],
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
      name: '上周同期',
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
      data: [22, 41, 45, 48, 55, 33],
    },
    {
      name: '时间里程利用率',
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
      data: [41, 20, 48, 55, 33, 44],
    }],
})
const option6 = ref({
  // backgroundColor: '#000416',
  grid: { left: '0%', right: '0%', top: '80%' },
  xAxis: { type: 'value', show: false, },
  yAxis: {
    type: 'category',
    show: false,
    axisTick: {
      show: false
    },
  },
  series: [{
    type: 'bar',
    name: '实时:',
    data: [2],
    stack: 'income',
    barWidth: 17,
    itemStyle: {
      normal: {
        color: '#19C5D8',
        // barBorderRadius: [100, 0, 0, 100],
      }
    },
    label: {
      show: true,
      position: 'insideTopLeft',
      offset: [0, -80],
      color: "#fff",
      formatter: '{a|{a}}   {c|{c}辆}',
      rich: {
        a: {
          fontFamily: 'AlibabaPuHuiTi, AlibabaPuHuiTi',
          fontWeight: 500,
          fontSize: 40,
          color: '#A3D9FF',
          lineHeight: 55,
          textAlign: 'left',
          fontStyle: 'normal',
          textTransform: 'none',
        },
        c: {
          fontFamily: 'YouSheBiaoTiHei, YouSheBiaoTiHei',
          fontWWeight: 400,
          fontSize: 50,
          lineHeight: 70,
          textAlign: 'center',
          fontStyle: 'normal',
          textTransform: 'none',
          color: '#19C5D8'
          // background: 'linearGradient('90deg', '#FFB579' , '#FFEFB8')'
        }
      }
    },
  },
  {
    type: 'bar',
    name: '今日累计:',
    data: [14],
    stack: 'income',
    barWidth: 17,
    itemStyle: {
      normal: {
        color: 'rgba(255, 210, 152, 0.70)',
        // barBorderRadius: [0, 100, 100, 0],
      }
    },
    label: {
      show: true,
      position: 'insideTopRight',
      color: "#fff",
      offset: [0, -80],
      formatter: '{a|{a}}   {c|{c}辆}',
      rich: {
        a: {
          fontFamily: 'AlibabaPuHuiTi, AlibabaPuHuiTi',
          fontWeight: 500,
          fontSize: 40,
          color: '#A3D9FF',
          lineHeight: 55,
          textAlign: 'left',
          fontStyle: 'normal',
          textTransform: 'none',
        },
        c: {
          fontFamily: 'YouSheBiaoTiHei, YouSheBiaoTiHei',
          fontWWeight: 400,
          fontSize: 50,
          lineHeight: 70,
          textAlign: 'center',
          fontStyle: 'normal',
          textTransform: 'none',
          color: 'rgba(255, 210, 152, 0.70)'
          // background: 'linearGradient('90deg', '#FFB579' , '#FFEFB8')'
        }
      }
    },
  }]
})

</script>

<style lang="scss" scoped>
.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat !important;
  background-size: 100% 100%;
  z-index: 99;
  pointer-events: all;
  position: absolute;
}

.slider-box {
  position: relative;
  width: 284px;
  background: #1e5386;
  height: 14px;
  border-radius: 94px;
  margin-top: 5px;

  .active-line {
    width: 0;
    height: 19px;
    position: absolute;
    border-radius: 94px;
    top: 0;
    left: 0;

    &>.slider-icon {
      position: absolute;
      width: 54px;
      height: 54px;
      top: 50%;
      transform: translateY(-50%) translateX(30%);
      right: 0;
    }
  }

}

.line1 {
  background: linear-gradient(90deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 508.png') no-repeat center/cover;
  }
}

.line2 {
  background: linear-gradient(270deg, #9A4F4F 0%, #D3614F 46%, #EC9D9D 100%);
  ;

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 509.png') no-repeat center/cover;
  }
}


.t-blue {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.t-unit {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 500;
  font-size: 42px;
  color: rgba(220, 236, 255, 0.6);
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.t-up {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #FF9B83;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 20px;
  // background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 66%, rgba(0, 0, 0, 0.15) 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.t-down {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #7AFFAB;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 20px;
}

.t-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 5fr 5fr 4fr;
  gap: 10px;
}

.t-item {
  // background: pink;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .t-item-left {
    margin-left: 30px;
    text-align: center;
  }

  .t-item-right {
    margin-right: 20px;
  }
}

.t-yellow {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.t-red {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #FF7979 0%, #FFB8B8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.row-line {
  position: absolute;
  width: 1109px;
  height: 6px;
  background: url('assets/component/城市交通/切图 826.png') no-repeat center/cover;
  transform: translateX(-50%);
  left: 50%;
}

.cloum-line {
  position: absolute;
  width: 6px;
  height: 694px;
  background: url('assets/component/城市交通/切图 825.png') no-repeat center/cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cs-title {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  color: #A3D9FF;
  line-height: 55px;
  text-align: center;
  font-style: normal;
  text-transform: none;
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
  top: 80px;
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

.cruise-taxi-base {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

.compare-content {
  width: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  border-radius: 20px;
}

.order-compare-content {
  width: 100%;
  height: 618px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  border-radius: 20px;
}

.operation-compare-content {
  width: 100%;
  height: 309px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  border-radius: 20px;
  position: relative;
}
</style>
