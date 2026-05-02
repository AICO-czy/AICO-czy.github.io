<template>
  <dialog-com v-model="show1" :tip="showtype" :positions="['2300px', '360px']" title="热门建议排名" size="lange"
    @clickTip="handleClick">

    <div class="con" v-if="showtype[0] == 'detile'">
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" :prefix-icon="Search" placeholder="请输入..." clearable />
          </el-form-item>
          <!-- <el-form-item>
            <div class="btn" @click="onSubmit">
              <span>
                查询
              </span>
            </div>
          </el-form-item> -->
          <el-form-item label="月份">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe height="1170px" style="width: 2080px;">
          <el-table-column label="序号" prop="index" width="150" align="center" />
          <el-table-column label="工单编号" prop="number" width="200" align="center" />
          <el-table-column label="业务类别" prop="type" width="200" align="center" />
          <el-table-column label="业务分类" prop="type2" width="200" align="center" />
          <el-table-column label="来电时间" prop="time" width="200" align="center" />
          <el-table-column label="受理时间" prop="time" width="200" align="center" />
          <el-table-column label="工单状态" prop="status" width="200" align="center" />
          <el-table-column label="办结时间" prop="time" width="200" align="center" />
          <el-table-column label="来电人" prop="des" width="200" align="center" />
          <el-table-column label="受理坐席" prop="des" width="200" align="center" />
          <el-table-column label="来电号码" prop="des" width="200" align="center" />
          <el-table-column label="反应内容" prop="des" width="200" />
          <el-table-column label="答复内容" prop="des" width="200" />
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="total,prev, pager, next" :total="396" size="large" />
      </div>
    </div>

    <div class="con" v-else="showtype[0] == 'chart'">
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="年份">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务分类">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe height="1250px">
          <el-table-column label="排名" prop="index" width="150" align="center" />
          <el-table-column label="投诉热点" prop="number" align="center" />
          <el-table-column label="业务分类" prop="type2" align="center" />
          <el-table-column label="投诉件次" prop="time" align="center" />
          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <div class="btn" @click="handleDetile(row)">清单</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="page">
        <el-pagination background layout="total,prev, pager, next" :total="396" size="large" />
      </div> -->
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

watch(() => dialogVisible.value,()=>{
  show1.value = dialogVisible.value == '热门建议'
},{deep:true,immediate:true})

const showtype = ref([''])
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
  if (type == 'detile') {
    showtype.value = ['']
  }
  if (type === 'close') {
    showtype.value = ['']
    dialogVisible.value = ''
  }
}

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
    height: 1220px;
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
