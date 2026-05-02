<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content column justify-between">
      <div class="dialog-conten-body">
        <div class="dialog-conten-body-content column">
          <div class="dialog-conten-body-content-header row justify-between">
            <ItemTitle title="巡游车跨区运行记录"></ItemTitle>
            <div class="content-close cursor-pointer" @click="handleClose"></div>
          </div>
          <div class="dialog-conten-body-content-table col column justify-between">
            <q-table class="content-tab-table-content" flat dark :rows="state.tableData" :columns="state.columns"
              :pagination="state.pagination" row-key="index" bordered dense :loading="state.loading"
              rows-per-page-label="条/页" :no-data-label="state.message" :rows-per-page-options="[0, 5, 10, 15, 20]"
              hide-pagination>
              <template v-slot:no-data="{ message }">
                <div class="text-white full-width row flex-center q-gutter-sm">
                  <span>
                    {{ message }}
                  </span>
                </div>
              </template>
              <template v-slot:header="props">
                <tr class="table-header-class">
                  <th rowspan="2" class="table-head">车牌号</th>
                  <th colspan="2" class="table-head">跨出</th>
                  <th colspan="2" class="table-head">跨入</th>
                </tr>
                <tr class="table-header-class">
                  <th class="table-head">跨出时间</th>
                  <th class="table-head">跨出区域</th>
                  <th class="table-head">跨入时间</th>
                  <th class="table-head">跨入前区域</th>
                </tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props" class="table-row">
                  <q-td key="carNumber" :props="props">
                    {{ props.row.carNumber }}
                  </q-td>
                  <q-td key="outTime" :props="props">
                    {{ props.row.outTime }}
                  </q-td>
                  <q-td key="outRegion" :props="props">
                    {{ props.row.outRegion }}
                  </q-td>
                  <q-td key="inTime" :props="props">
                    {{ props.row.inTime }}
                  </q-td>
                  <q-td key="inRegion" :props="props">
                    {{ props.row.inRegion }}
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
  </q-dialog>
</template>

<script setup lang="ts" name="FourDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useAnalyzeDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import ItemTitle from "../../components/itemTitle.vue";

const storeAnalyzeDialog = useAnalyzeDialogStore();
const { showOperationLogDialog } = storeToRefs(storeAnalyzeDialog);
const isDialogVisible = computed(() => storeAnalyzeDialog.showOperationLogDialog === 'operationLog');
const operationLog = ref('')
const state = reactive({
  // 表格数据
  tableData: [
    {
      rank: '01',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '02',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '03',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '04',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '05',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '06',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '07',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '08',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
    {
      rank: '09',
      carNumber: '冀RN8501',
      outTime: '2025-05-21 18:12:13',
      outRegion: '隆化县',
      inTime: '2025-05-21 18:12:13',
      inRegion: '隆化县',
    },
  ],
  // 列定义
  columns: [
    {
      name: 'carNumber',
      label: '车牌号',
      align: 'center',
    },
    {
      name: 'outTime',
      label: '跨出时间',
      align: 'center',
    },
    {
      name: 'outRegion',
      label: '跨出区域',
      align: 'center',
    },
    {
      name: 'inTime',
      label: '跨入时间',
      align: 'center',
    },
    {
      name: 'inRegion',
      label: '跨入前区域',
      align: 'center',
    }
  ],
  message: '暂无数据',
  current: 1,
  loading: false,
});

const handleClose = () => {
  storeAnalyzeDialog.setShowOperationLogDialog(''); // 假设store中有这样的方法
};
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
  max-width: 1600px !important;
  overflow: none !important;
  min-height: 1194px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1600px;
  height: 1194px;
  position: fixed;
  left: 3350px;
  top: 400px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
}

.dialog-conten-body {
  width: 100%;
  height: 100%;
  padding: 100px 60px 80px;
  background: url('assets/component/城市交通/切图 862.png');
  background-size: 100% 100%;
}

.dialog-conten-body-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 10px;
}

.dialog-conten-body-content-header {
  padding: 20px 20px 0px 45px;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
}

.dialog-conten-body-content-table {
  padding: 10px 26px 30px;
}

.content-tab-table-content {
  width: 100%;
  height: 90%;
}

.table-head {
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  position: sticky
}

:deep(.q-table__container) {
  background: none;
  // border: none;
  box-shadow: none;
}

:deep(.q-table__container thead th) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: #BBD5EB;
  line-height: 71px;
  font-style: normal;
  text-transform: none;
  position: sticky
}

:deep(.table-header-class) {
  width: 100%;
  height: 90px !important;
  position: sticky
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
  height: 97px;
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table tbody tr td) {
  border-right: 1px solid #568AB3;
}

:deep(.q-table tbody tr:nth-child(even)) {
  width: 100%;
  height: 97px;
  background: rgba(140, 178, 231, 0.06);
  border-radius: 0px 0px 0px 0px;
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
