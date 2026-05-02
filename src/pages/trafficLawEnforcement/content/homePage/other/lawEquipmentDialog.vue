<!-- 执法装备弹窗 -->
<template>
  <div class="law-equipment-dialog">
    <div class="content-title">执法装备</div>
    <div class="content-gotable cursor-pointer" v-show="state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-golist cursor-pointer" v-show="!state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box row" v-if="!state.showDetailed">
      <div class="col-4 pie-content full-height row items-center">
        <v-chart ref="chartRef" :option="optionPie" class="fit" />
      </div>
      <div class="col-8 full-height pillar-content">
        <v-chart ref="chartRef" :option="optionBar" class="fit" />
      </div>
    </div>
    <div class="content-table fit" v-if="state.showDetailed">
      <div class="content-box-table">
        <div class="column fit">
          <div class="col-auto">
            <div class="row items-center title-content">
              <div class="col-1">序号</div>
              <div class="col">执法机构</div>
              <div class="col">执法记录仪</div>
              <div class="col">移动执法终端</div>
              <div class="col">台式电脑</div>
              <div class="col">笔记本电脑</div>
              <div class="col">业务用车</div>
              <div class="col">制式执法车</div>
              <div class="col">执法服装</div>
            </div>
          </div>
          <div class="col">
            <q-scroll-area class="fit" ref="equipmentListScrollArea" :thumb-style="state.thumbStyle"
              :bar-style="state.barStyle">
              <q-list dark separator dense class="q-ml-none" ref="equipmentList">
                <q-item class="equipmentList-row" v-for="(item) in state.equipmentData" :key="item.index" clickable
                  v-ripple :data-id="item.id">
                  <div class="row items-center equipmentList-item">
                    <div class="col-1 equipmentList-item-style">{{ item.serialNo }}</div>
                    <div class="col equipmentList-item-style">{{ item.equipment }}</div>
                    <div class="col equipmentList-item-style">{{ item.recorder }}</div>
                    <div class="col equipmentList-item-style">{{ item.mobileTerminal }}</div>
                    <div class="col equipmentList-item-style">{{ item.desktop }}</div>
                    <div class="col equipmentList-item-style">{{ item.laptop }}</div>
                    <div class="col equipmentList-item-style">{{ item.businessCar }}</div>
                    <div class="col equipmentList-item-style">{{ item.standardLawCar }}</div>
                    <div class="col equipmentList-item-style">{{ item.lawUniform }}</div>
                  </div>
                </q-item>
              </q-list>
              <q-inner-loading :showing="state.loading">
                <q-spinner-dots size="3.5em" color="primary" />
              </q-inner-loading>
              <div v-if="state.equipmentData.length === 0 && !state.loading" class="text-center nodata-label">暂无数据！
              </div>
            </q-scroll-area>
          </div>
          <div class="col-auto">
            <div class="row items-center title-content">
              <div class="col-1"></div>
              <div class="col">承德市小计</div>
              <div class="col">290</div>
              <div class="col">36</div>
              <div class="col">352</div>
              <div class="col">27</div>
              <div class="col">56</div>
              <div class="col">135</div>
              <div class="col">1288</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
import * as echarts from "echarts";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);

const state = reactive({
  loading: false,
  selected: null as any,
  showDetailed: false,
  selectequipment: null as any,
  //   serialNo: '序号',
  // equipment: '执法机构',
  // recorder: '执法记录仪',
  // mobileTerminal: '移动执法终端',
  // desktop: '台式电脑',
  // laptop: '笔记本电脑',
  // businessCar: '业务用车',
  // standardLawCar: '制式执法车',
  // lawUniform: '执法服装'
  equipmentData: [
    {
      serialNo: '1',
      equipment: '市本级',
      recorder: '45',
      mobileTerminal: '0',
      desktop: '45',
      laptop: '1',
      businessCar: '9',
      standardLawCar: '16',
      lawUniform: '140'
    },
    {
      serialNo: '2',
      equipment: '丰宁县',
      recorder: '23',
      mobileTerminal: '0',
      desktop: '10',
      laptop: '1',
      businessCar: '0',
      standardLawCar: '75',
      lawUniform: '140'
    },
    {
      serialNo: '3',
      equipment: '围场县',
      recorder: '7',
      mobileTerminal: '0',
      desktop: '6',
      laptop: '0',
      businessCar: '0',
      standardLawCar: '3',
      lawUniform: '18'
    },
    {
      serialNo: '4',
      equipment: '隆化县',
      recorder: '31',
      mobileTerminal: '0',
      desktop: '4',
      laptop: '0',
      businessCar: '9',
      standardLawCar: '16',
      lawUniform: '169'
    },
    {
      serialNo: '5',
      equipment: '平泉市',
      recorder: '31',
      mobileTerminal: '0',
      desktop: '6',
      laptop: '0',
      businessCar: '4',
      standardLawCar: '16',
      lawUniform: '129'
    },
    {
      serialNo: '6',
      equipment: '滦平县',
      recorder: '9',
      mobileTerminal: '14',
      desktop: '7',
      laptop: '0',
      businessCar: '3',
      standardLawCar: '16',
      lawUniform: '96'
    }
  ] as any,
  showList: false,
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

// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

// 切换详细信息显示
function handleBlackClick() {
  state.showDetailed = !state.showDetailed
}

const chartData = [
  {
    value: 300,
    name: '移动执法终端'
  },
  {
    value: 435,
    name: '台式电脑'
  },
  {
    value: 340,
    name: '执法记录仪'
  },
  {
    value: 350,
    name: '笔记本电脑'
  },
  {
    value: 320,
    name: '业务用车'
  },
  {
    value: 180,
    name: '制式执法车'
  },
  {
    value: 220,
    name: '执法服装'
  }
];

// 定义颜色列表：用于区分不同数据系列的颜色
const colorList = ['#66C9E4', '#1AD6DD', '#57E9B6', '#71E886', '#669BEA', '#E99C7D', '#EAC866']

// 计算数据总和：用于后续百分比计算
const sum = chartData.reduce((per, cur) => per + cur.value, 0)

// 定义环形间隙大小：控制饼图环与环之间的间隙
const gap = (1 * sum) / 100

// 处理饼图数据：生成带间隙的环形数据
const pieData1 = []
const pieData2 = []
const gapData = {
  name: '',
  value: gap,
  itemStyle: {
    color: 'transparent' // 间隙部分设为透明
  }
}
for (let i = 0; i < chartData.length; i++) {
  // 第一圈数据：外层环形，带圆角样式
  pieData1.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 0 // 环形区块的圆角
    }
  })
  pieData1.push(gapData)

  // 第二圈数据：内层半透明环形，用于视觉层次
  pieData2.push({
    ...chartData[i],
    itemStyle: {
      color: colorList[i],
      opacity: 0.21 // 半透明效果
    }
  })
  pieData2.push(gapData)
}
const optionPie = {
  title: [
    {
      text: '执法装备',
      x: 'center',
      top: '25%',
      textStyle: {
        color: '#BADCE8',
        fontSize: 38,
        fontWeight: '500',
      },
    },
    {
      text: '7892',
      x: 'center',
      top: '32%',
      textStyle: {
        fontSize: 60,
        color: '#FFFFFF',
        foontWeight: '500',
      },
    },
  ],
  legend: {
    orient: 'horizontal',
    top: '65%',
    left: 'center',
    // align: 'center',
    itemGap: 40,
    itemWidth: 20,
    itemHeight: 20,
    textStyle: {
      color: '#D0DEEA',
      fontSize: 30,
      rich: {
        name: {
          width: 180, // 名称部分固定宽度（根据你的name长度调整）
          align: 'left',
          fontSize: 30,
        },
        value: {
          align: 'right',
          fontSize: 30,
        }
      }
    },
    formatter: name => {
      const item = chartData.find(item => item.name === name);
      // 用 | 分隔两段文本，对应 rich 中的 key
      return `{name|${name}}{value| ${item.value} 件}`;
    },
    data: chartData.map(item => item.name)
  },
  grid: {
    top: 35,
    right: 30,
    bottom: 20,
    left: 30
  },
  color: colorList, // 图表颜色列表
  series: [{
    name: '执法装备',
    type: 'pie', // 饼图类型
    roundCap: true, // 环形端点圆角
    radius: ['50%', '62%'], // 外层环形的内外半径
    center: ['50%', '32%'], // 饼图中心位置
    label: {
      show: false
    }, // 隐藏标签
    labelLine: {
      show: false
    }, // 隐藏标签线
    data: pieData1 // 绑定外层环形数据
  },
  {
    type: 'pie',
    radius: ['50%', '42%'], // 内层半透明环形的内外半径
    center: ['50%', '32%'],
    gap: 1.71, // 环形间隙
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    silent: true, // 禁止交互
    data: pieData2 // 绑定内层半透明环形数据
  }
  ]
}

const yAxisData = ['市本级', '丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县']
const optionBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {
    // data: ["辅助", "执政"],
    top: "4%",
    itemGap: 20,
    itemWidth: 20,
    itemHeight: 20,
    textStyle: {
      color: "#ffffff",
      fontSize: 30
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D8D8',
        width: 1,
        opacity: 0.2,
      },
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
        color: "#DAECF6",
        fontSize: 34,
      }
    }
  },
  yAxis: {
    type: 'category',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D8D8',
        width: 1,
        opacity: 0.2,
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
      margin: 30,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    data: yAxisData
  },
  series: [
    {
      name: '移动执法终端',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#2234D7"
        },
        {
          offset: 0.5,
          color: "#226AD7"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [45, 24, 41, 42, 36, 25, 46, 56, 32]
    },
    {
      name: '台式电脑',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#2DADFD"
        },
        {
          offset: 0.5,
          color: "#40B4FD"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 25, 34, 24, 52, 32, 32, 32, 23]
    },
    {
      name: '执法记录仪',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#22C4D7"
        },
        {
          offset: 0.5,
          color: "#22C4D7"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 45, 44, 44, 42, 42, 42, 42, 43]
    },
    {
      name: '笔记本电脑',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#A9FDE9"
        },
        {
          offset: 0.5,
          color: "#48FFD4"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 35, 34, 34, 32, 32, 32, 32, 33]
    },
    {
      name: '业务用车',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FEFFB1"
        },
        {
          offset: 0.5,
          color: "#FEFFB1"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 35, 34, 34, 32, 32, 32, 32, 33]
    },
    {
      name: '制式执法车',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFE0B1"
        },
        {
          offset: 0.5,
          color: "#FFE0B1"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 35, 34, 34, 32, 32, 32, 32, 33]
    },
    {
      name: '执法服装',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#FFBBB1"
        },
        {
          offset: 0.5,
          color: "#FFBBB1"
        },
        {
          offset: 1,
          color: "#FFFFFA"
        }
        ])
      },
      data: [32, 25, 24, 24, 22, 22, 22, 22, 23]
    }
  ]
}
</script>

<style scoped lang="scss">
.law-equipment-dialog {
  width: 2240px;
  height: 996.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 211px;
  padding: 115px 80px 55px 80px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 70px;
  top: 50px;
}

.content-title {
  width: 350px;
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
  top: 0px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.content-gotable {
  width: 52px;
  height: 52px;
  background: url("assets/component/tbIcon.png") no-repeat 100%/100%;
  position: absolute;
  right: 150px;
  top: 55px;
}

.content-golist {
  width: 52px;
  height: 52px;
  background: url("assets/component/listIcon.png") no-repeat 100%/100%;
  position: absolute;
  right: 150px;
  top: 55px;
}


.content-box-table {
  width: 100%;
  height: 100%;
}

.title-content {
  width: 100%;
  height: 96px;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 44px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.equipmentList-item-icon {
  width: 100px;
  text-align: center;
}

.equipmentList-row:nth-child(odd) {
  width: 100%;
  height: 136px;
  background: #183955;
  border-radius: 0px 0px 0px 0px;
  padding: 0px 0px;
}

.equipmentList-row:nth-child(even) {
  width: 100%;
  height: 136px;
  background: rgba(140, 178, 231, 0.06);
  border-radius: 0px 0px 0px 0px;
  padding: 0px 0px;
}

.equipmentList-item {
  width: 100%;
  height: 100%;
}

.equipmentList-item-style {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #FFFFFF;
  text-align: center;
  font-style: normal;
  text-transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 修复1：添加 display: -webkit-box（多行省略必需） */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 修复2：首行缩进用 em 单位，适配字体大小 */
}

.equipmentList-infoText {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #20FFF0;
  line-height: 135px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}

.nodata-label {
  padding-top: 100px;
  font-size: 35px;
}
</style>
