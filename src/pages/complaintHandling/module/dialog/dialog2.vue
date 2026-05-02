<template>
  <dialog-com v-model="show1" :tip="showtype" :positions="['2300px', '360px']" title="服务质量情况" size="lange"
    @clickTip="handleClick">
    <div class="con" v-if="showtype[0] == 'chart'">
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" :prefix-icon="Search" placeholder="请输入..." clearable />
          </el-form-item>
          <el-form-item>
            <div class="btn" @click="onSubmit">
              <span>
                查询
              </span>
            </div>
          </el-form-item>
          <el-form-item label="责任单位">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="年度">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务类别">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务领域">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe height="1180px">
          <el-table-column label="序号" prop="index" width="150" align="center" />
          <el-table-column label="工单编号" prop="number" width="200" align="center" />
          <el-table-column label="业务类别" prop="type" width="200" align="center" />
          <el-table-column label="业务分类" prop="type2" width="200" align="center" />
          <el-table-column label="受理时间" prop="time" width="200" align="center" />
          <el-table-column label="受理状态" prop="status" width="200" align="center" />
          <el-table-column label="反应内容" prop="des" />
          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <div class="btn" @click="handleDetile(row)">详情</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="total,prev, pager, next" :total="396" size="large" />
      </div>
    </div>

    <div class="con detile-box" v-else-if="showtype[0] == 'detile'">
      <div class="grid">
        <div>工单编号：<span>HYL2342345</span></div>
        <div>业务类型：<span>信息咨询</span></div>
        <div>业务分类：<span>道路运输</span></div>
        <div>来电人：<span>群众</span></div>
        <div>来电时间：<span>2025-02-23 13:00:12</span></div>
        <div>受理坐席：<span>周某</span></div>
        <div>回电时间：<span>2025-02-23 13:00:12</span></div>
        <div>来电号码：<span>12345678901</span></div>
      </div>
      <div>反应内容：</div>
      <div><span>2025-02-23 13:00:12 来电咨询从业资格证</span></div>
      <div>答复内容</div>
      <div><span>告知现有信息</span></div>
    </div>

    <div class="con chart" v-else>
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="年度">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="月份">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-con">
        <div>
          <div class="title">承办单位业务办理考核情况统计</div>
          <v-chart :option="option1" autoplay style="width: 100%;height: 100%;" />
        </div>
        <div>
          <div class="title">近半年承办单位服务质量统计</div>
          <v-chart :option="option3" autoplay class="fit" />
        </div>
      </div>
    </div>
  </dialog-com>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import DialogCom from './components/dialogCom.vue'
import { Search } from '@element-plus/icons-vue'
import * as echarts from "echarts";
import { useDialogStore } from "../../store/index";

const dialogStore = useDialogStore();

const { dialogVisible } = toRefs(dialogStore);

const show1 = ref(false)

watch(() => dialogVisible.value, () => {
  show1.value = dialogVisible.value == '服务质量'
}, { deep: true, immediate: true })

const showtype = ref(['list'])
const chartActive = ref(1)
const formInline = ref({
  user: '',
  region: '',
  date: '',
})

function onSubmit() {

}

const tableData = [
  {
    index: 1,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '办理中',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 2,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 3,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
]

function handleClick(type: string) {
  console.log(type)
  if (type === 'list') {
    showtype.value = ['chart']
  }
  if (type === 'chart') {
    showtype.value = ['list']
  }
  if (type == 'detile') {
    showtype.value = ['chart']
  }
  if (type === 'close') {
    showtype.value = ['list']
    dialogVisible.value = ''
  }
}

function changeChart(type: number) {
  chartActive.value = type
}

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
    show: false,
    data: ["工单数量", "同比", "环比"],
    top: "7%",
    textStyle: {
      color: "#ffffff",
      fontSize: 28
    }
  },
  xAxis: {
    data: [
      '市执法支队', '市公交集团', '平泉市局', '承德县局', '丰宁县局', '宽城县局', '隆化县局', '滦平县局', '围场县局', '兴隆县局', '营子区', '其他'
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
    name: "分",
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
    name: "",
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "right",
      padding: [0, -40, 20, 0],
    },
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
  series: [
    {
      name: "工单数量",
      type: "bar",
      barWidth: 20,
      itemStyle: {
        normal: {
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
        }
      },
      data: [90, 55, 50]
    }
  ]
})
const option3 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: "7%",
    textStyle: {
      color: "#ffffff",
      fontSize: 28
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08'
      ],
      axisTick: {
        alignWithLabel: true
      },
      // 设置所有标签都显示
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#AEB8C0",
          fontSize: 28,
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: "#AEB8C0",
          fontSize: 28,
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
          type: 'dashed'
        },
      },
      name: "分",
      splitNumber: 5,
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 30,
        align: "center",
        padding: [0, 20, 20, 0],
      },
    }
  ],
  series: [
    {
      name: '市执法支队',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 189, 129, 1)' },
          { offset: .7, color: 'rgba(255, 189, 129, 0.51)' },
          { offset: 1, color: 'rgba(255, 189, 129, 0)' },
        ])
      }
    },
    {
      name: '市公交集团',
      data: [180, 250, 160, 90, 100, 120],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(160, 249, 255, 1)' },
          { offset: .7, color: 'rgba(69, 153, 237, 0.75)' },
          { offset: 1, color: 'rgba(51, 103, 154, 0)' },
        ])
      }
    },
    {
      name: '平泉市局',
      data: [110, 190, 170, 75, 85, 135],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(111, 242, 164, 1)' },
          { offset: .7, color: 'rgba(41, 206, 211, 1)' },
          { offset: 1, color: 'rgba(51, 151, 154, 0)' },
        ])
      }
    },
    {
      name: '承德县局',
      data: [145, 210, 155, 88, 72, 105],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(136, 165, 235, 1)' },
          { offset: 1, color: 'rgba(102, 130, 200, 0)' },
        ])
      }
    },
    {
      name: '丰宁县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(219, 142, 223, 1)' },
          { offset: .7, color: 'rgba(175, 109, 189, 0.85)' },
          { offset: 1, color: 'rgba(162, 78, 161, 0)' },
        ])
      }
    },
    {
      name: '宽城县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 125, 125, 1)' },
          { offset: .7, color: 'rgba(247, 145, 145, 0.71)' },
          { offset: 1, color: 'rgba(233, 141, 141, 0)' },
        ])
      }
    },
    {
      name: '隆化县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 230, 129, 1)' },
          { offset: .7, color: 'rgba(255, 226, 129, 0.51)' },
          { offset: 1, color: 'rgba(255, 230, 129, 0)' },
        ])
      }
    },
    {
      name: '滦平县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(63, 255, 95, 1)' },
          { offset: .7, color: 'rgba(63, 255, 95, 0.75)' },
          { offset: 1, color: 'rgba(63, 255, 95, 0)' },
        ])
      }
    },
    {
      name: '围场县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(61, 132, 255, 1)' },
          { offset: 1, color: 'rgba(61, 132, 255, 0)' },
        ])
      }
    },
    {
      name: '兴隆县局',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(243, 98, 219, 1)' },
          { offset: 1, color: 'rgba(243, 98, 219, 0)' },
        ])
      }
    },
    {
      name: '营子区',
      data: [125, 220, 140, 95, 78, 115],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(91, 228, 255, 1)' },
          { offset: .7, color: 'rgba(91, 228, 255, 0.85)' },
          { offset: 1, color: 'rgba(91, 228, 255, 0)' },
        ])
      }
    },
  ]
})

function handleDetile(row: any) {
  showtype.value = ['detile']
}

</script>

<style scoped lang="scss">
.df {
  display: flex;
}

.con {
  width: 100%;
  height: 100%;
  padding: 22px;

  .search {
    width: 100%;
    height: 130px;
    padding-top: 20px;

    .btn {
      width: 90px;
      height: 62px;
      background: linear-gradient(180deg, #487DB8 4%, #0E1F33 100%);
      border-radius: 10px 10px 10px 10px;
      border: 3px solid #3871A5;
      opacity: 0.74;
      line-height: 60px;
      text-align: center;
      pointer-events: all;

      &>span {
        color: #FFFFFF;
        font-size: 28px;
        font-weight: 500;
      }
    }

    :deep(.el-form) {
      --el-form-label-font-size: 34px;

      .el-form-item {
        --font-size: 34px;
        align-items: center;
      }

      .el-form-item__label {
        color: #A9CEE8;
      }

      .el-input {
        --el-input-inner-height: 72px;
        --el-input-text-color: #91A1BB;
        width: 220px;

        .el-input__wrapper {
          background: transparent;
        }

        .el-input__prefix-inner {
          font-size: 30px;
        }

        .el-input__inner {
          font-size: 34px;
        }
      }

      .el-select {
        width: 200px;

        .el-select__wrapper {
          background: transparent;
          line-height: 70px;
          font-size: 34px;
          min-height: 72px;
        }

        .el-select__suffix {
          .el-select__icon {
            font-size: 40px;
          }
        }
      }
    }
  }

  .table {
    width: 100%;
    height: 1234px;
    margin-bottom: 18px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    border-radius: 10px;
    padding: 23px;

    .btn {
      color: #20FFF0;
    }

    :deep(.el-table) {
      --el-table-header-bg-color: transparent;
      --el-table-tr-bg-color: transparent;
      --el-table-header-text-color: #FFFFFF;
      --el-table-expanded-cell-bg-color: transparent;
      --el-table-row-hover-bg-color: none;
      --el-table-border: 0;
      --el-fill-color-lighter: rgba(140, 178, 231, 0.06);
      background-color: transparent;

      .tr {
        background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
      }

      .cell {
        line-height: 44px;
        padding: 20px 0;
        color: #FFFFFF;
        font-weight: 400px;
      }

      font-size: 36px;

      .el-table__header {
        height: 56px;

        .el-table__cell {
          background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);

          .cell {
            line-height: 44px;
            padding: 20px 0;
          }
        }
      }
    }
  }

  .page {
    height: 44px;
    width: 100%;

    :deep(.el-pagination) {
      --el-text-color-regular: #487DB8;
      --el-pagination-font-size: 34px;
      padding: 0 50px;

      .el-pagination__total {
        flex: 1;
      }

      .btn-prev,
      .btn-next {
        background-color: #275686;
        color: #91BDED;
        width: 54px;
        height: 54px;

        &>.el-icon {
          font-size: 34px;
        }
      }

      .el-pager {

        .number,
        .more {
          width: 54px;
          height: 54px;
          background-color: #275686;
          color: #91BDED;
          font-size: 34px;
          margin: 0 8px;
        }
      }
    }
  }
}

.chart {

  .title {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 32px;
    line-height: 45px;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3);
    text-align: left;
    font-style: normal;
    text-transform: none;
    color: #FFFFFF;
    margin-left: 50px;
  }

  .search {
    display: flex;
    justify-content: space-between;

    :deep(.el-form) {
      .el-select {
        width: 273px;
      }
    }

    .card-list {
      display: flex;

      .item {
        background: #254E72;
        color: #87ADD0;
        font-size: 30px;
        font-weight: 400;
        width: 121px;
        height: 70px;
        line-height: 70px;
        text-align: center;
      }

      .active {
        background-color: #257DB8;
        color: #FFFFFF;
      }
    }
  }

  .chart-con {
    // background: pink;
    height: 1300px;
    display: flex;
    flex-direction: column;

    &>div {
      flex: 1;
    }
  }
}

.detile-box {
  padding: 90px;

  &>div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    grid-template-rows: auto;
    color: #FFFFFF;
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 700px;

    span {
      font-size: 32px;
      font-weight: 400px;
      color: #ccc;
    }
  }
}
</style>

<style>
.el-select__popper {
  z-index: 9999 !important;
  background: red;
  --el-bg-color-overlay: #0d2b5e;
}

.el-select-dropdown__item {
  font-size: 32px;
  height: 60px;
  color: #fff;
  line-height: 60px;
  background: #0d2b5e;
}

.el-select-dropdown__item.is-hovering {
  background: #0d2b5e;
}
</style>
