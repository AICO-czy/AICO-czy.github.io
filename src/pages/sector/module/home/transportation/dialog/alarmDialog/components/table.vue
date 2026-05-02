<template>
  <div class="content-tab-table">
    <q-table class="content-tab-table-content" flat dark :rows="state.tableData" :columns="state.columns"
      :pagination="state.pagination" row-key="index" bordered dense :loading="state.loading" table-class="table-class"
      table-header-class="table-header-class" card-container-class="card-container-class" card-class="card-class"
      rows-per-page-label="条/页" :no-data-label="state.message" :rows-per-page-options="[0, 5, 10, 15, 20]"
      hide-pagination>
      <template v-slot:no-data="{ message }">
        <div class="text-white full-width row flex-center q-gutter-sm">
          <span>
            {{ message }}
          </span>
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="selectList(props.row.index)">
          <q-td key="index" :props="props" :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.index }}
          </q-td>
          <q-td key="vehicleType" :props="props"
            :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.vehicleType }}
          </q-td>
          <q-td key="carNumber" :props="props"
            :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.carNumber }}
          </q-td>
          <q-td key="alarmTime" :props="props"
            :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.alarmTime }}
          </q-td>
          <q-td key="alarmType" :props="props"
            :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.alarmType }}
          </q-td>
          <q-td key="company" :props="props"
            :class="{ 'text-center-select': props.row.index == state.selectedRowIndex }">
            {{ props.row.company }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-icon v-if="props.row.index == state.selectedRowIndex" :name="`img:${icon1}`" class="icon-location"
              @click="handleIconClick(props.row)"></q-icon>
            <q-icon v-else :name="`img:${icon2}`" class="icon-location" @click="handleIconClick(props.row)"></q-icon>
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
</template>

<script setup lang="ts" name="table">
import { ref, reactive } from 'vue'
import icon1 from 'src/assets/image/dialog/切图 62.png'
import icon2 from 'src/assets/image/dialog/切图 58.png'
const state = reactive({
  message: '暂无数据',
  current: 1,
  // 表格数据
  tableData: [
    {
      index: '01',
      vehicleType: '班线客运',
      carNumber: '冀RN8501',
      alarmTime: '14:44',
      alarmType: '抽烟',
      company: '河北承德xx'
    },
    {
      index: '02',
      vehicleType: '危货运输',
      carNumber: '冀RN8502',
      alarmTime: '14:46',
      alarmType: '超速',
      company: '河北承德xx'
    },
    {
      index: '03',
      vehicleType: '包车客运',
      carNumber: '冀RN8503',
      alarmTime: '14:50',
      alarmType: '接打电话',
      company: '河北承德xx'
    },
    {
      index: '04',
      vehicleType: '包车客运',
      carNumber: '冀RN8504',
      alarmTime: '14:55',
      alarmType: '超速',
      company: '河北承德xx'
    },
    {
      index: '05',
      vehicleType: '班线客运',
      carNumber: '冀RN8505',
      alarmTime: '15:02',
      alarmType: '疲劳驾驶',
      company: '河北承德xx'
    },
    {
      index: '06',
      vehicleType: '班线客运',
      carNumber: '冀RN8501',
      alarmTime: '14:44',
      alarmType: '抽烟',
      company: '河北承德xx'
    },
    {
      index: '07',
      vehicleType: '危货运输',
      carNumber: '冀RN8502',
      alarmTime: '14:46',
      alarmType: '超速',
      company: '河北承德xx'
    },
    {
      index: '08',
      vehicleType: '包车客运',
      carNumber: '冀RN8503',
      alarmTime: '14:50',
      alarmType: '接打电话',
      company: '河北承德xx'
    },
    {
      index: '09',
      vehicleType: '包车客运',
      carNumber: '冀RN8504',
      alarmTime: '14:55',
      alarmType: '超速',
      company: '河北承德xx'
    },
    {
      index: '10',
      vehicleType: '班线客运',
      carNumber: '冀RN8505',
      alarmTime: '15:02',
      alarmType: '疲劳驾驶',
      company: '河北承德xx'
    }
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
      name: 'vehicleType',
      required: true,
      label: '车辆类型',
      align: 'center',
      field: row => row.vehicleType,
    },
    {
      name: 'carNumber',
      required: true,
      label: '车牌号',
      align: 'center',
      field: row => row.carNumber,
    },
    {
      name: 'alarmTime',
      required: true,
      label: '报警时间',
      align: 'center',
      field: row => row.alarmTime,
    },
    {
      name: 'alarmType',
      required: true,
      label: '报警类型',
      align: 'center',
      field: row => row.alarmType,
    },
    {
      name: 'company',
      required: true,
      label: '所属公司',
      align: 'center',
      field: row => row.company,
    },
    {
      name: 'actions',
      label: '操作',
      align: 'center',
      field: () => '操作'
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

const selectList = (index) => {
  state.selectedRowIndex = index
}

const handleIconClick = (row) => {
  state.selectedRow = row
}
</script>

<style scoped>
.content-tab-table {
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
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
