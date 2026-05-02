<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">巡游车重点关注车辆</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <q-table class="content-tab-table-content" flat dark :rows="state.tableData" :columns="state.columns"
          :pagination="state.pagination" row-key="index" bordered dense :loading="state.loading"
          table-class="table-class" table-header-class="table-header-class" card-container-class="card-container-class"
          card-class="card-class" rows-per-page-label="条/页" :no-data-label="state.message"
          :rows-per-page-options="[0, 5, 10, 15, 20]" hide-pagination>
          <template v-slot:no-data="{ message }">
            <div class="text-white full-width row flex-center q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props" @click="selectList(props.row.index)">
              <q-td key="carNumber" :props="props"
                :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
                {{ props.row.carNumber }}
              </q-td>
              <q-td key="penaltyNum" :props="props"
                :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
                {{ props.row.penaltyNum }}
              </q-td>
              <q-td key="company" :props="props"
                :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
                {{ props.row.company }}
              </q-td>
              <q-td key="positioning" :props="props">
                <q-icon v-if="props.row.index == state.selectedRowIndex" :name="`img:${icon2}`" class="icon-location"
                  @click="handleIconClick(props.row)"></q-icon>
                <q-icon v-else :name="`img:${icon1}`" class="icon-location"
                  @click="handleIconClick(props.row)"></q-icon>
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
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useAnalyzeDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import icon1 from 'src/assets/image/dialog/切图 58.png'
import icon2 from 'src/assets/image/dialog/切图 62.png'

const storeAnalyzeDialog = useAnalyzeDialogStore();
const { showAnalyzeDialog } = storeToRefs(storeAnalyzeDialog);
const isDialogVisible = computed(() => showAnalyzeDialog.value === 'keyVehicles');

const state = reactive({
  message: '暂无数据',
  current: 1,
  // 表格数据
  tableData: [
    {
      index: '01',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '02',
      carNumber: '冀RN8501',
      penaltyNum: '10',
      company: '河北承德xx'
    },
    {
      index: '03',
      carNumber: '冀RN8501',
      penaltyNum: '2',
      company: '河北承德xx'
    },
    {
      index: '04',
      carNumber: '冀RN8501',
      penaltyNum: '32',
      company: '河北承德xx'
    },
    {
      index: '05',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '06',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '07',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '08',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '09',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    },
    {
      index: '10',
      carNumber: '冀RN8501',
      penaltyNum: '12',
      company: '河北承德xx'
    }
  ],

  // 列定义
  columns: [
    {
      name: 'carNumber',
      required: true,
      label: '车牌号',
      align: 'center',
      field: row => row.carNumber,
    },
    {
      name: 'penaltyNum',
      required: true,
      label: '处罚次数/次',
      align: 'center',
      field: row => row.penaltyNum,
    },
    {
      name: 'company',
      required: true,
      label: '所属公司',
      align: 'center',
      field: row => row.company,
    },
    {
      name: 'positioning',
      label: '定位',
      align: 'center',
      field: () => '定位'
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
  storeAnalyzeDialog.setShowAnalyzeDialog(''); // 假设store中有这样的方法
};

const selectList = (index) => {
  state.selectedRowIndex = index
}

const handleIconClick = (row) => {
  state.selectedRow = row
}
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  min-height: 1376px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1376px;
  background: url("assets/image/dialog/切图 284.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 1850px;
  top: 330px;
  padding: 120px 70px 60px 70px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 50px;
  top: 60px;
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
  top: 20px;
}

.content-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 10px;
  padding: 20px 27px 40px;
}

.table-class {
  width: 1255px;
  height: 103px;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
}

.content-tab-table-content {
  width: 100%;
  height: 90%;
}

:deep(.q-table__container) {
  background: none;
  border: none;
  box-shadow: none;
}

:deep(.table-header-class) {
  width: 100%;
  height: 103px !important;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  /* position: sticky */
}

:deep(.table-header-class th) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
  position: sticky;
}

:deep(.text-center) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-table tbody tr) {
  width: 100%;
  height: 92px;
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table tbody tr:nth-child(even)) {
  width: 100%;
  height: 92px;
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
  font-size: 36px;
  color: #BBD5EB;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

:deep(.q-pagination__content .q-btn-item) {
  width: 57px;
  height: 57px;
  background: rgba(70, 120, 175, 0.4) !important;
}

:deep(.q-pagination__content .q-btn--standard .block) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
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
  font-size: 36px;
  color: #6BDCFF;
  line-height: 49px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
