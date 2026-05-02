<template>
  <div class="access-anomaiy-dialog">
    <div class="access-anomaiy-dialog-content">
      <div class="remittance-department-content-close" @click="handleClose">
        <q-icon :name="`img:${closeIcon}`" class="remittance-department-content-close-icon"></q-icon>
      </div>
      <div class="access-anomaiy-dialog-box column justify-center items-center">
        <div class="access-anomaiy-dialog-box-title">
          <span>接入数据异常报警</span>
        </div>
        <div class="access-anomaiy-dialog-box-table col column justify-between">
          <q-table class="content-tab-table-content" flat dark :rows="state.tableData" :columns="state.columns"
            :pagination="state.pagination" row-key="index" bordered dense :loading="state.loading"
            table-class="table-class" table-header-class="table-header-class"
            card-container-class="card-container-class" card-class="card-class" rows-per-page-label="条/页"
            :no-data-label="state.message" :rows-per-page-options="[0, 5, 10, 15, 20]" hide-pagination>
            <template v-slot:no-data="{ message }">
              <div class="text-white full-width row flex-center q-gutter-sm">
                <span>
                  {{ message }}
                </span>
              </div>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="index" :props="props"
                  :class="{ 'text-green1': props.row.status === '待处理', 'text-gray1': props.row.status === '已处理' }">
                  {{ props.row.index }}
                </q-td>
                <q-td key="dataSource" :props="props"
                  :class="{ 'text-green1': props.row.status === '待处理', 'text-gray1': props.row.status === '已处理' }">
                  {{ props.row.dataSource }}
                </q-td>
                <q-td key="abnormaldataName" :props="props"
                  :class="{ 'text-green1': props.row.status === '待处理', 'text-gray1': props.row.status === '已处理' }">
                  {{ props.row.abnormaldataName }}
                </q-td>
                <q-td key="dataTime" :props="props"
                  :class="{ 'text-green1': props.row.status === '待处理', 'text-gray1': props.row.status === '已处理' }">
                  {{ props.row.dataTime }}
                </q-td>
                <q-td key="finallyTime" :props="props"
                  :class="{ 'text-green1': props.row.status === '待处理', 'text-gray1': props.row.status === '已处理' }">
                  {{ props.row.finallyTime }}
                </q-td>
                <q-td key="status" :props="props" class="table-actions row justify-center items-center">
                  {{ props.row.dataNum }}
                  <div class="text-center-status" v-if="props.row.status === '待处理'">
                    {{ props.row.status }}
                  </div>
                  <div class="text-center-status1" v-else>
                    {{ props.row.status }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <div class="table-foot row justify-between full-width">
            <div class="table-foot-total">共{{ state.tableData.length }}条数据</div>
            <div class="table-foot-pagination">
              <q-pagination v-model="state.current" :max="10" :max-pages="6" direction-links push />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, reactive, toRefs } from "vue";
import * as echarts from "echarts";
import { useActiveTypeStore } from "../../store/activeType";
import closeIcon from 'src/assets/image/dataCenter/切图 53.png';
const activeTypeStore = useActiveTypeStore();
const { activeBtn, activeDialog } = toRefs(activeTypeStore);

const state = reactive({
  message: '暂无数据',
  current: 1,
  // 表格数据
  tableData: [
    {
      index: '01',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '待处理',
    },
    {
      index: '02',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '待处理',
    },
    {
      index: '03',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '已处理',
    },
    {
      index: '04',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '已处理',
    },
    {
      index: '05',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '已处理',
    },
    {
      index: '06',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '已处理',
    },
    {
      index: '07',
      dataSource: '省TOCC',
      abnormaldataName: '高速ETC',
      dataTime: '2023-08-01 00:00:00',
      finallyTime: '2023-08-01 00:00:00',
      status: '已处理',
    },
  ],

  // 列定义
  columns: [
    {
      name: 'index',
      required: true,
      label: '序号',
      align: 'center',
      field: row => row.index,
    },
    {
      name: 'dataSource',
      required: true,
      label: '数据来源',
      align: 'center',
      field: row => row.dataSource,
    },
    {
      name: 'abnormaldataName',
      required: true,
      label: '异常数据名称',
      align: 'center',
      field: row => row.abnormaldataName,
    },
    {
      name: 'dataTime',
      required: true,
      label: '数据时间',
      align: 'center',
      field: row => row.dataTime,
    },
    {
      name: 'finallyTime',
      required: true,
      label: '最后接入数据时间',
      align: 'center',
      field: row => row.finallyTime,
    },
    {
      name: 'status',
      required: true,
      label: '状态',
      align: 'center',
      field: row => row.status,
    }
  ],

  // 分页配置
  pagination: {
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 100, // 总条数
    sortBy: 'alarmTime',
    descending: true
  },

  // 加载状态
  loading: false,
  // 选中行
  selectedRow: null,
  selectedRowIndex: null,
})

const handleClose = () => {
  activeDialog.value = 0;
}
</script>

<style scoped lang="scss">
.access-anomaiy-dialog {
  width: 100%;
  height: 100%;
  background: url("assets/image/dataCenter/遮罩.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  /* border-radius: 30px; */
  box-sizing: border-box;
}

.access-anomaiy-dialog-content {
  width: 5596px;
  height: 1786px;
  background: url("assets/image/dataCenter/切图 63.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  padding: 190px 318px 274px 289px;
  left: 515px;
  top: 221px;
}

.remittance-department-content-close-icon {
  width: 102px;
  height: 102px;
  position: absolute;
  top: 198px;
  right: 269px;
}

.access-anomaiy-dialog-box {
  width: 100%;
  height: 100%;
}

.access-anomaiy-dialog-box-title {
  width: 1147px;
  height: 119px;
  background: url("assets/image/dataCenter/切图 64.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;

  span {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 86px;
    line-height: 112px;
    letter-spacing: 6px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.access-anomaiy-dialog-box-table {
  width: 100%;
  background: url("assets/image/dataCenter/切图 65.png") no-repeat;
  background-size: 100% 100%;
}

.content-tab-table-content {
  width: 100%;
  height: 85%;
}

:deep(.q-table__container) {
  background: none;
  border: none;
  box-shadow: none;
}

:deep(.table-header-class) {
  width: 100%;
  height: 182px !important;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  /* position: sticky */
}

:deep(.table-header-class th) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 58px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
  position: sticky;
}

:deep(.text-center) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 54px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-table tbody tr) {
  width: 100%;
  height: 135px;
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table tbody .q-tr .q-td) {
  background: none;
}

:deep(.q-table tbody tr:nth-child(even)) {
  width: 100%;
  height: 135px;
  background: rgba(140, 178, 231, 0.06);
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table__bottom) {
  border: none;
}

:deep(.q-table__bottom-item) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(thead tr th) {
  position: sticky;
  z-index: 1;
}

.icon-location {
  width: 53px;
  height: 69px;
}

.table-foot-total {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 48px;
  color: #BBD5EB;
  line-height: 71px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 183px;
}

.table-foot-pagination {
  padding: 0px 103px 50px 0px;
}

:deep(.q-pagination__content .q-btn-item) {
  width: 85px;
  height: 85px;
  background: rgba(70, 120, 175, 0.4) !important;
}

:deep(.q-pagination__content .q-btn--standard .block) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 45px;
  color: #32D3FF;
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-table tbody tr.selected) {
  background-color: #32D3FF;
}

:deep(.text-center-select) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 45px;
  color: #6BDCFF;
  line-height: 49px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.text-center-status {
  width: 250px;
  height: 84px;
  background: linear-gradient(180deg, #6BC6FF 0%, #1A4776 100%);
  border-radius: 15px 15px 15px 15px;
}

.text-center-status1 {
  width: 250px;
  height: 84px;
  background: linear-gradient(180deg, #999999 0%, #474747 100%);
  border-radius: 15px 15px 15px 15px;
}

.text-green1 {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 56px;
  color: #6BDCFF;
  line-height: 81px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.text-gray1 {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 56px;
  color: #A9CEE8;
  line-height: 81px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.table-actions {
  height: 135px !important;
}
</style>
