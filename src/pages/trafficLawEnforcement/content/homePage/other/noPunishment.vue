<!-- 首违不罚、轻微不罚弹窗 -->
<template>
  <div class="law-equipment-dialog">
    <div class="content-title">首违不罚、轻微不罚</div>
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
              <div class="col-1">被处罚对象名称</div>
              <div class="col">违法行为(案由)</div>
              <div class="col">不予处罚条件</div>
              <div class="col-1">涉及金额（元）</div>
              <div class="col-1">采取柔性执法措施</div>
            </div>
          </div>
          <div class="col">
            <q-scroll-area class="fit" ref="equipmentListScrollArea" :thumb-style="state.thumbStyle"
              :bar-style="state.barStyle">
              <q-list dark separator dense class="q-ml-none" ref="equipmentList">
                <q-item class="equipmentList-row" v-for="(item) in state.lawEnforcementData" :key="item.index" clickable
                  v-ripple :data-id="item.id">
                  <div class="row items-center equipmentList-item">
                    <div class="col-1 equipmentList-item-style">{{ item.index }}</div>
                    <div class="col-1 equipmentList-item-style">{{ item.penalizedObjectName }}</div>
                    <div class="col equipmentList-item-style">{{ item.illegalActCase }}</div>
                    <div class="col equipmentList-item-style">{{ item.nonPenaltyConditions }}</div>
                    <div class="col-1 equipmentList-item-style">{{ item.involvedAmountYuan }}</div>
                    <div class="col-1 equipmentList-item-style">{{ item.flexibleLawEnforcementMeasures }}</div>
                  </div>
                </q-item>
              </q-list>
              <q-inner-loading :showing="state.loading">
                <q-spinner-dots size="3.5em" color="primary" />
              </q-inner-loading>
              <div v-if="state.lawEnforcementData.length === 0 && !state.loading" class="text-center nodata-label">暂无数据！
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

const state = reactive({
  loading: false,
  selected: null as any,
  showDetailed: false,
  selectequipment: null as any,
  lawEnforcementData: [
    {
      index: 1,
      penalizedObjectName: "刘某某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "首违不罚"
    },
    {
      index: 2,
      penalizedObjectName: "李某某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "轻罚不罚"
    },
    {
      index: 3,
      penalizedObjectName: "田某某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "首违不罚"
    },
    {
      index: 4,
      penalizedObjectName: "李某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "首违不罚"
    },
    {
      index: 5,
      penalizedObjectName: "郝某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "首违不罚"
    },
    {
      index: 6,
      penalizedObjectName: "郝某",
      illegalActCase: "使用卫星定位装置出现故障不能保持在线的运输车辆从事经营活动方...",
      nonPenaltyConditions: "1.首次实施违法行为；2.违法行为调查过程中，不...",
      involvedAmountYuan: 200,
      flexibleLawEnforcementMeasures: "首违不罚"
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

const xAxisData = ['市本级', '丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '营子区']

const optionBar = ref({
  legend: {
    // show: false,
    data: ["首违不罚", "轻微不罚"],
    top: '5%',
    // right: "5%",
    itemGap: 35,
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
      name: '首违不罚',
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
    {
      name: '轻微不罚',
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
      data: [0, 21, 12, 42, 21, 21, 22, 12, 3, 3],
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
  height: 115px;
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
