<template>
  <div class="bg">
    <div class="tab ml-[120px] mb-[50px]">
      <tabs v-model="activeTab" />
    </div>
    <div class="search"><search-com /></div>
    <div class="body-box">
      <el-table :data="tableData" style="width: 100%;height: 100%;" stripe>
        <el-table-column prop="cphm" label="车牌号码" width="400" />
        <el-table-column prop="jy" label="经营状态" width="300" />
        <el-table-column prop="cpys" label="车牌颜色" width="300" />
        <el-table-column prop="yh" label="业户名称" />
        <el-table-column prop="cj" label="车架号" />
        <el-table-column prop="cp" label="厂牌" />
        <el-table-column prop="zd" label="终端厂商" />
        <el-table-column prop="cl" label="车辆类别" width="350" />
        <el-table-column prop="zh" label="运输证字号" />
        <el-table-column prop="yxq" label="运输证有效期" />
        <el-table-column label="操作" width="350">
          <template #default="{row}">
            <div class="btn-info"  @click="handleDetil(row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <div class="total-text">共{{ tableData.length }}条数据</div>
      <el-pagination v-model:current-page="currentPage" background layout="prev, pager, next"
        :total="tableData.length" />
    </div>
    <detil-dialog ref="dialogref"/>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import SearchCom from './components/searchCom.vue'
import Tabs from './components/tabs.vue'
import DetilDialog from './components/detilDialog.vue'

const dialogref = ref(null)

const activeTab = ref('1')

const currentPage = ref(1)

const tableData = ref([
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
  { cphm: '渝A12345', jy: '营运', cpys: '蓝', yh: '张三', cj: 'LGBH1234567890', cp: '', zd: '', cl: '巡游车', zh: '002710811', yxq:'xxxx个月'},
])

function handleDetil(row){
  // console.log('查看详情',row);
  dialogref.value.handleOpen(row)
}

</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  pointer-events: all;


  .search {
    height: 103px;
    width: 100%;
    padding: 0 120px;
    margin-bottom: 49px;
    margin-top: 37px;
    display: flex;
  }


  .body-box {
    height: 1440px;
    overflow: hidden;
    margin: 50px 120px;
    // background: pink;


    .el-table {
      --el-table-bg-color: transparent;
      --el-table-tr-bg-color: transparent;
      --el-table-header-bg-color: transparent;
      --el-fill-color-lighter: #1a3151;
      --el-table-row-hover-bg-color: none;

      :deep(.el-table__header-wrapper) {
        background: url('assets/component/urbanTrafficTable/切图 742.png') no-repeat center/cover;
        height: 167px;

        .cell {
          height: 167px;
          line-height: 167px;
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 500;
          font-size: 50px;
          color: #A9CEE8;
          font-style: normal;
          text-transform: none;
          text-align: center;
        }
      }

      :deep(.el-table__body-wrapper) {
        .el-table__cell {
          border-bottom: 0px;

          .cell {
            height: 135px;
            font-family: Source Han Sans, Source Han Sans;
            font-weight: 500;
            font-size: 50px;
            color: #A9CEE8;
            line-height: 135px;
            text-align: center;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }


  }

  .btn-info{
    width: 200px;
    height: 72px;
    border-radius: 15px;
    background: linear-gradient(180deg, #6BFF7F 0%, #1A761C 100%);
    margin: auto;
    color: #FFFFFF;
    font-size: 50px;
    line-height: 70px;
    text-align: center;
    margin-top: 30px;
  }

  .pagination {
    margin: 50px 120px;
    display: flex;
    justify-content: space-between;

    .total-text {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 400;
      font-size: 51px;
      color: #BBD5EB;
      line-height: 70px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .el-pagination{
      --el-pagination-button-height:85px;
      --el-pagination-button-width:85px;
      --el-pagination-font-size:51px;
      --el-pagination-button-bg-color:rgba(70, 120, 175, 0.20);
      --el-pagination-button-color:#C9F3FF;
      --el-disabled-bg-color:rgba(70, 120, 175, 0.20);

      :deep(.el-icon){
        font-size: 51px;
      }
      :deep(.is-active){
        color: #32D3FF;
        background: rgba(70, 120, 175, 0.40);


        &::after{
          background: none;
        }
      }
    }
  }
}
</style>
