<template>
  <dialog-com v-model="show1" :tip="showtype" :positions="['2105px', '360px']" title="信访工作法制化" size="lange"
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
      <div class="card-list">
        <div class="item" :class="chartActive == 1 ? 'active' : ''" @click="changeChart(1)">全部(168)</div>
        <div class="item" :class="chartActive == 2 ? 'active' : ''" @click="changeChart(2)">已办结(132)</div>
        <div class="item" :class="chartActive == 3 ? 'active' : ''" @click="changeChart(3)">待受理(12)</div>
        <div class="item" :class="chartActive == 4 ? 'active' : ''" @click="changeChart(4)">待答复(12)</div>
        <div class="item" :class="chartActive == 5 ? 'active' : ''" @click="changeChart(5)">待报告(12)</div>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe height="1100px">
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
        <div class="df">
          <div class="flex-1 relative">
            <div class="title">重复案件</div>
            <div class="bg"><span class="s1">{{ data1.value[0] }}</span>/{{ data1.max }}</div>
            <v-chart :option="option1" autoplay style="width: 100%;height: 100%;" />
          </div>
          <div class="flex-1 relative">
            <div class="title">交办案件</div>
            <div class="bg"><span class="s2">{{ data2.value[0] }}</span>/{{ data2.max }}</div>
            <v-chart :option="option2" autoplay style="width: 100%;height: 100%;" />
          </div>
          <div class="flex-1 relative">
            <div class="title">督办案件</div>
            <div class="bg"><span class="s3">{{ data3.value[0] }}</span>/{{ data3.max }}</div>
            <v-chart :option="option3" autoplay style="width: 100%;height: 100%;" />
          </div>
        </div>
        <div class="relative">
          <div class="title">案件状态分布</div>
          <v-chart :option="option4" autoplay style="width: 100%;height: 100%;" />
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
  show1.value = dialogVisible.value == '信访工作'
}, { deep: true, immediate: true })
const showtype = ref(['list'])
const formInline = ref({
  user: '',
  region: '',
  date: '',
})
const chartActive = ref(1)

function changeChart(index: number) {
  chartActive.value = index
}

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

function optionFormat(data: any) {
  return {
    title: {
      subtext: data.name,
      subtextStyle: {
        color: '#BCE0ED',
        fontSize: 38,
      },
      itemGap: 20,
      left: 'center',
      top: '40%'
    },
    angleAxis: {
      max: data.max,
      clockwise: true, // 逆时针
      // 隐藏刻度线
      show: false
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,

      },
      axisTick: {
        show: false
      },
    },
    polar: [{
      center: ['50%', '50%'], //中心点位置
      radius: '120%' //图形大小
    }],
    series: [
      {
        type: 'bar',
        data: data.value,
        showBackground: true,
        polarIndex: 0,
        backgroundStyle: {
          color: data.bg || 'rgba(110, 250, 250, 0.14)',
          borderWidth: 10,
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 48,
        itemStyle: {
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: data.color[0],
            }, {
              offset: 1,
              color: data.color[1],
            }]),
            // shadowBlur: 5,
            // shadowColor: '#2A95F9',
          }
        },
      },
    ]
  }
}

const data1 = {
  'name': '待办重复案件',
  'value': [5],
  'max': 10,
  color: ['rgba(95, 240, 250, 1)', 'rgba(76, 164, 247, 1)']
}
const option1 = ref(optionFormat(data1))
const data2 = {
  'name': '待办交办案件',
  'value': [5],
  'max': 10,
  bg: 'rgba(111, 242, 164, 0.12)',
  color: ['rgba(164, 253, 156, 1)', 'rgba(111, 242, 164, 1)']
}
const option2 = ref(optionFormat(data2))
const data3 = {
  'name': '待办督办案件',
  'value': [5],
  'max': 10,
  bg: 'rgba(253, 212, 74, 0.17)',
  color: ['rgba(249, 242, 107, 1)', 'rgba(253, 212, 74, 1)']
}
const option3 = ref(optionFormat(data3))

const chartData4 = {
  xAxisData: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'],
  seriesData: [{
    name: '已办结',
    color: ['rgba(179, 251, 232, 1)', 'rgba(121, 232, 204, 1)', 'rgba(29, 170, 152, 0.75)'],
    data: [20, 74, 90, 68, 75, 84, 74, 90, 68, 75, 84, 84]
  }, {
    name: '待受理',
    color: ['rgba(126, 193, 242, 1)', 'rgba(93, 168, 234, 1)', 'rgba(32, 120, 194, 0.69)'],
    data: [60, 80, 80, 74, 90, 80, 60, 80, 80, 74, 90, 80]
  }, {
    name: '待答复',
    color: ['rgba(250, 221, 174, 1)', 'rgba(246, 210, 148, 1)', 'rgba(199, 145, 30, 0.74)'],
    data: [68, 66, 84, 75, 68, 51, 60, 80, 80, 74, 90, 80]
  }, {
    name: '待报告',
    color: ['rgba(247, 203, 209, 1)', 'rgba(243, 133, 148, 1)', 'rgba(240, 68, 91, 0.68)'],
    data: [68, 66, 84, 75, 68, 51, 60, 80, 80, 74, 90, 80]
  }]
};

const seriesData4 = chartData4.seriesData.reduce((p: Array<any>, c: any, i: number) => {
  p.push({
    z: i,
    stack: '总量',
    type: 'bar',
    name: c.name,
    barWidth: c.width || 30,
    data: c.data,
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        x2: 0,
        y: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: c.color[0],
        }, {
          offset: .5,
          color: c.color[1],
        }, {
          offset: 1,
          color: c.color[2],
        }]
      },
    },
    label: {
      show: false,
    }
  },)
  return p
}, [])

const option4 = ref({
  grid: {
    left: 50,
    bottom: 50,
    right: 50,
    top: 140,
    containLabel: true,
  },
  legend: {
    width: '100%',
    right: 'center',
    top: 50,
    textStyle: {
      color: "#AEB8C0",
      fontSize: 28,
    },
    itemStyle: {
      borderWidth: 0,
    },
    itemWidth: 24,
    itemHeight: 12,
    itemGap: 35
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    data: chartData4.xAxisData,
    type: 'category',
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
  },
  yAxis: [{
    type: 'value',
    splitLine: {
      lineStyle: {
        color: '#82909D',
        width: 1,
        type: 'dashed'
      },
    },
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    name: "件",
    splitNumber: 5,
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "center",
      padding: [0, 20, 20, 0],
    },
  }],
  series: seriesData4
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

  .card-list {
    display: flex;
    margin-bottom: 10px;

    .item {
      background: #254E72;
      color: #87ADD0;
      font-size: 30px;
      font-weight: 400;
      width: 200px;
      height: 70px;
      line-height: 70px;
      text-align: center;
    }

    .active {
      background-color: #257DB8;
      color: #FFFFFF;
    }
  }

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
    height: 1154px;
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
    position: absolute;
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
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 5px;

    &>div {
      position: relative;

      .bg {
        position: absolute;
        width: 276px;
        height: 276px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        top: 29%;
        left: 50%;
        transform: translate(-50%);

        font-family: zihun143hao-zhengkuchaojihei, zihun143hao-zhengkuchaojihei;
        font-weight: 400;
        font-size: 48px;
        color: #BCE0ED;
        line-height: 380px;
        text-align: center;
        font-style: normal;
        text-transform: none;

        span {
          font-family: zihun143hao-zhengkuchaojihei, zihun143hao-zhengkuchaojihei;
          font-weight: 400;
          font-size: 66px;
          line-height: 92px;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }

        .s1 {
          color: #4CA5F8;
        }

        .s2 {
          color: #6FF2A4;
        }

        .s3 {
          color: #FDD54B;
        }
      }
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
