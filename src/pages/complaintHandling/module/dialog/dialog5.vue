<template>
  <dialog-com v-model="show1" :tip="showtype" :positions="['2960px', '360px']" title="信访考核指标情况" size="small"
    @clickTip="handleClick">
    <!-- <div class="con" v-if="showtype[0] == 'chart'">
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
    </div> -->

    <!-- <div class="con detile-box" v-else-if="showtype[0] == 'detile'">
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
    </div> -->

    <div class="con chart">
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
      <div class="h-[161px] tip-box">
        <div class="item">
          <div class="title">信访总数</div>
          <div class="count">1190 <span>件</span></div>
        </div>
        <div class="item">
          <div class="title">及时受理数</div>
          <div class="count">1190 <span>件</span></div>
        </div>
        <div class="item">
          <div class="title">按期答复数</div>
          <div class="count">1190 <span>件</span></div>
        </div>
      </div>
      <div class="chart-con df">
        <div class="flex-1 relative">
          <div class="bg"><span class="s1">{{ data1.value[0] }}%</span></div>
          <v-chart :option="option1" autoplay style="width: 100%;height: 100%;" />
        </div>
        <div class="flex-1 relative">
          <div class="bg"><span class="s2">{{ data2.value[0] }}%</span></div>
          <v-chart :option="option2" autoplay style="width: 100%;height: 100%;" />
        </div>
      </div>
    </div>
  </dialog-com>
</template>

<script setup lang="ts">
import { ref, toRefs ,watch} from 'vue';
import DialogCom from './components/dialogCom.vue'
import { Search } from '@element-plus/icons-vue'
import * as echarts from "echarts";
import { useDialogStore } from "../../store/index";

const dialogStore = useDialogStore();

const { dialogVisible } = toRefs(dialogStore);

const show1 = ref(false)

watch(() => dialogVisible.value, () => {
  show1.value = dialogVisible.value == '信访考核'
}, { deep: true, immediate: true })

const showtype = ref([''])
const formInline = ref({
  user: '',
  region: '',
  date: '',
})

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
    showtype.value = ['']
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
  'name': '及时受理率',
  'value': [75],
  'max': 100,
  color: ['rgba(95, 240, 250, 1)', 'rgba(76, 164, 247, 1)']
}
const option1 = ref(optionFormat(data1))
const data2 = {
  'name': '按期答复率',
  'value': [75],
  'max': 100,
  bg: 'rgba(111, 242, 164, 0.12)',
  color: ['rgba(164, 253, 156, 1)', 'rgba(111, 242, 164, 1)']
}
const option2 = ref(optionFormat(data2))
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
  overflow: hidden;

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
        z-index: 999;
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

  .tip-box {
    display: flex;
    justify-content: space-around;

    &>.item {
      height: 161px;
      width: 324.36px;
      background: url('assets/image/complaintHandling/组 43209.png') no-repeat center;
      z-index: 99;
      position: relative;

      &>.title {
        width: 100%;
        position: absolute;
        top: 10px;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 34px;
        color: #FFFFFF;
        line-height: 56px;
        text-shadow: 0px 15px 37px rgba(0, 0, 0, 0.3);
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .count {
        position: absolute;
        bottom: 32px;
        width: 100%;
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 36px;
        color: #FFFFFF;
        line-height: 36px;
        text-align: center;
        font-style: normal;
        text-transform: none;

        &>span {
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
    height: 600px;
    width: 100%;
    //background: pink;

    &>div {
      position: relative;

      .bg {
        position: absolute;
        width: 276px;
        height: 276px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        top: 27%;
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
