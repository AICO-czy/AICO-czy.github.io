<!-- 案件回访制度落实弹窗 -->
<template>
  <div class="law-equipment-dialog">
    <div class="content-title">案件回访制度落实</div>
    <div class="content-gotable cursor-pointer" v-show="state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-golist cursor-pointer" v-show="!state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column" v-if="!state.showDetailed">
      <div class="content-box-top row items-center">
        <div class="content-box-select row items-center">
          <div class="basic-management-select-title">年度</div>
          <el-select v-model="state.selectYear" :teleported="false" class="basic-management-select">
            <el-option v-for="item in state.yearOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="content-box-select row items-center">
          <div class="basic-management-select-title">月份</div>
          <el-select v-model="state.selectMonth" :teleported="false" class="basic-management-select">
            <el-option v-for="item in state.monthOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="col pie-content full-height row items-center">
        <v-chart ref="chartRef" :option="optionBar" class="fit" />
      </div>
    </div>
    <div class="content-table column fit" v-if="state.showDetailed">
      <div class="content-box-top row items-center">
        <div class="content-box-select row items-center">
          <div class="basic-management-select-title">年度</div>
          <el-select v-model="state.selectYear" :teleported="false" class="basic-management-select">
            <el-option v-for="item in state.yearOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="content-box-select row items-center">
          <div class="basic-management-select-title">月份</div>
          <el-select v-model="state.selectMonth" :teleported="false" class="basic-management-select">
            <el-option v-for="item in state.monthOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="content-box-table col">
        <div class="column fit">
          <div class="col-auto">
            <div class="row items-center title-content">
              <div class="col-1">序号</div>
              <div class="col">案件编号</div>
              <div class="col">案件类型</div>
              <div class="col">当事人</div>
              <div class="col">车辆（船）号</div>
              <div class="col">联系电话</div>
              <div class="col">违法行为</div>
              <div class="col">处理结果</div>
              <div class="col">回访形式</div>
            </div>
          </div>
          <div class="col">
            <q-scroll-area class="fit" ref="equipmentListScrollArea" :thumb-style="state.thumbStyle"
              :bar-style="state.barStyle">
              <q-list dark separator dense class="q-ml-none" ref="equipmentList">
                <q-item class="equipmentList-row" v-for="(item) in state.caseData" :key="item.index" clickable v-ripple
                  :data-id="item.id">
                  <div class="row items-center equipmentList-item">
                    <div class="col-1 equipmentList-item-style">{{ item.index }}</div>
                    <div class="col equipmentList-item-style">{{ item.caseNo }}</div>
                    <div class="col equipmentList-item-style">{{ item.caseType }}</div>
                    <div class="col equipmentList-item-style">{{ item.party }}</div>
                    <div class="col equipmentList-item-style">{{ item.vehicleNo }}</div>
                    <div class="col equipmentList-item-style">{{ item.contactPhone }}</div>
                    <div class="col equipmentList-item-style">{{ item.illegalAct }}</div>
                    <div class="col equipmentList-item-style">{{ item.handlingResult }}</div>
                    <div class="col equipmentList-item-style">{{ item.followUpMethod }}</div>
                  </div>
                </q-item>
              </q-list>
              <q-inner-loading :showing="state.loading">
                <q-spinner-dots size="3.5em" color="primary" />
              </q-inner-loading>
              <div v-if="state.caseData.length === 0 && !state.loading" class="text-center nodata-label">暂无数据！
              </div>
            </q-scroll-area>
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

const basicManagementText = ref('')
const state = reactive({
  loading: false,
  selected: null as any,
  showDetailed: false,
  selectequipment: null as any,
  caseData: [
    {
      index: 1,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "承德永运运输有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "电话回访"
    },
    {
      index: 2,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "河北永太环保工程有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "上门回访"
    },
    {
      index: 3,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "承德永运运输有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "电话回访"
    },
    {
      index: 4,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "承德永运运输有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "电话回访"
    },
    {
      index: 5,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "承德永运运输有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "电话回访"
    },
    {
      index: 6,
      caseNo: "HJ232424",
      caseType: "行政处罚",
      party: "承德永运运输有限公司",
      vehicleNo: "冀H44233",
      contactPhone: "18023020423",
      illegalAct: "未按规定制作和保存危险货物运输台账及运输清单",
      handlingResult: "罚款2000",
      followUpMethod: "电话回访"
    }
  ] as any[],
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
  selectYear: "2025",
  yearOptions: [
    {
      value: "2025",
      label: "2025年",
    },
    {
      value: "2024",
      label: "2024年",
    },
    {
      value: "2023",
      label: "2023年",
    },
    {
      value: "2022",
      label: "2022年",
    },
    {
      value: "2021",
      label: "2021年",
    },
  ],
  selectMonth: "0",
  monthOptions: [
    {
      value: "0",
      label: "全部",
    },
    {
      value: "8",
      label: "8月",
    },
    {
      value: "7",
      label: "7月",
    },
    {
      value: "6",
      label: "6月",
    },
    {
      value: "5",
      label: "5月",
    },
    {
      value: "4",
      label: "4月",
    },
    {
      value: "3",
      label: "3月",
    },
    {
      value: "2",
      label: "2月",
    },
    {
      value: "1",
      label: "1月",
    },
  ],
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

const xAxisData = ['市本级', '丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '营子区']

const optionBar = ref({
  legend: {
    show: false,
    // data: ["道路运政", "公路路政", "水路运政", "质量安全监督"],
    top: '5%',
    right: "5%",
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
    bottom: "5%",
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
        margin: 30,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 32,
        },
      },
      data: xAxisData,
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "单位/ 件",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 32,
        padding: [0, 50, 30, 0],
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
          type: 'dashed'
        },
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
      name: '审核制度',
      type: 'bar',
      barWidth: 30,
      label: {
        position: 'top',
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
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
                color: 'rgba(69, 153, 237, 0.75)', // 0% 处的颜色
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
      data: [32, 22, 32, 23, 23, 33, 45, 52, 34, 23],
    },
  ],
})
</script>

<style scoped lang="scss">
.law-equipment-dialog {
  width: 2240px;
  height: 1146.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 851px;
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
  top: 10px;
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


.content-box-top {
  width: 100%;
  height: 100px;
}

.content-box-select {
  width: 622px;
  height: 88px;
  margin-left: 30px;
}

.basic-management-select {
  width: 362px;
  height: 88px;
}

.basic-management-select-title {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #A9CEE8;
  line-height: 42px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  margin-right: 30px;
}

.basic-management-select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #164370;
  box-shadow: none;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.basic-management-select :deep(.el-select__placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #9fe2fd 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.basic-management-select :deep(.el-popper) {
  background-color: #164370;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.basic-management-select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}

.basic-management-select :deep(.el-select-dropdown__item.is-selected) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #9fe2fd;
  // color: #3d7fff;
}

.basic-management-select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #48607c !important;
}

.basic-management-select :deep(.el-select-dropdown__item) {
  width: 362px;
  height: 88px;
  color: #9fe2fd;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.basic-management-select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}

:deep(.el-select__icon) {
  width: 34px;
  height: 34px;
}

:deep(.el-select__icon svg) {
  width: 34px;
  height: 34px;
}


.input-box {
  width: 541px;
  height: 88px;
  background: rgba(14, 31, 51, 0.5);
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #3871A5;
}

.input-box :deep(.q-field__control) {
  width: 100%;
  height: 100%;
}

.input-box :deep(.q-field__native) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.input-box :deep(.q-field__native::placeholder) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}


.input-box:deep(.q-field__marginal) {
  height: 70px;
}

.search-icon {
  padding-right: 20px;
  font-size: 36px;
  color: #B1F3FD;
}
</style>
