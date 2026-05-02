<template>
  <q-dialog seamless v-model="isFourColorDialog">
    <div class="dialog-content column justify-between">
      <div class="dialog-conten-heard row justify-between items-center">
        <div class="dialog-conten-heard-select row items-center">
          <div class="select-red" @click="fourColor = 'fourColorOfRed'"><span class="text-red">红色风险</span></div>
          <div class="select-yellow" @click="fourColor = 'fourColorOfYellow'"><span class="text-yellow">黄色风险</span>
          </div>
          <div class="select-green" @click="fourColor = 'fourColorOfGreen'"><span class="text-green">绿色风险</span></div>
          <div class="select-blue" @click="fourColor = 'fourColorOfBlue'"><span class="text-blue">蓝色风险</span></div>
        </div>
        <div class="dialog-conten-heard-close">
          <div class="content-close cursor-pointer" @click="handleClose"></div>
        </div>
      </div>
      <div class="dialog-conten-body column justify-between" :class="`${fourColor}Bg`">
        <div class="col-auot content-body-top full-width row justify-around items-center">
          <div class="body-top-item" v-for="item in state.totalData" :key="item.name">
            <span class="body-top-item-name">{{ item.name }}</span>
            <span class="body-top-item-value">{{ item.value }} {{ item.unit }}</span>
          </div>
        </div>
        <div class="col content-body-center">
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
              <tr :class="`${fourColor}-table-heard`">
                <th rowspan="2">排名</th>
                <th rowspan="2">车牌号</th>
                <th rowspan="2">所属企业</th>
                <th rowspan="2">所属企业平台</th>
                <th colspan="5">报警次数</th>
              </tr>
              <tr :class="`${fourColor}-table-heard`">
                <th>合计</th>
                <th>超速</th>
                <th>疲劳驾驶</th>
                <th>吸烟</th>
                <th>接打电话</th>
              </tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" class="table-row">
                <q-td key="rank" :props="props">
                  {{ props.row.rank }}
                </q-td>
                <q-td key="carNumber" :props="props">
                  {{ props.row.carNumber }}
                </q-td>
                <q-td key="company" :props="props">
                  {{ props.row.company }}
                </q-td>
                <q-td key="platform" :props="props">
                  {{ props.row.platform }}
                </q-td>
                <q-td key="total" :props="props">
                  {{ props.row.total }}
                </q-td>
                <q-td key="overSpeed" :props="props">
                  {{ props.row.overSpeed }}
                </q-td>
                <q-td key="fatigueDrive" :props="props">
                  {{ props.row.fatigueDrive }}
                </q-td>
                <q-td key="smoke" :props="props">
                  {{ props.row.smoke }}
                </q-td>
                <q-td key="makeCall" :props="props">
                  {{ props.row.makeCall }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div class="col-auot content-body-bottom row justify-between full-width">
          <div class="table-foot-total">共{{ state.tableData.length }}条数据</div>
          <div class="table-foot-pagination">
            <q-pagination v-model="state.current" :max="10" :max-pages="6" direction-links push />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts" name="FourDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useTransportationDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";

const storeTransportationDialog = useTransportationDialogStore();
const { showFourDialog } = storeToRefs(storeTransportationDialog);
const isFourColorDialog = computed(() => {
  return showFourDialog.value.includes('fourColor');
});

const fourColor = ref('')
const state = reactive({
  totalData: [
    {
      name: '报警总数',
      value: 713,
      unit: '次',
    },
    {
      name: '超速',
      value: 73,
      unit: '次',
    },
    {
      name: '疲劳驾驶',
      value: 73,
      unit: '次',
    },
    {
      name: '抽烟',
      value: 73,
      unit: '次',
    },
    {
      name: '接打电话',
      value: 73,
      unit: '次',
    },
  ],
  // 表格数据
  tableData: [
    {
      rank: '01',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '02',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '03',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '04',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '05',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '06',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '07',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '08',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '09',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    },
    {
      rank: '10',
      carNumber: '冀RN8501',
      company: '河北承德xxx',
      platform: '神龙',
      total: 17,
      overSpeed: 2,
      fatigueDrive: 5,
      smoke: 5,
      makeCall: 5,
    }
  ],
  // 列定义
  columns: [
    {
      name: 'rank',
      // required: true,
      label: '排名',
      align: 'center',
      // field: row => row.index,
    },
    {
      name: 'carNumber',
      // required: true,
      label: '车牌号',
      align: 'center',
      // field: row => row.carNumber,
    },
    {
      name: 'company',
      // required: true,
      label: '所属企业',
      align: 'center',
      // field: row => row.alarmTime,
    },
    {
      name: 'platform',
      // required: true,
      label: '企业平台',
      align: 'center',
      // field: row => row.alarmType,
    },
    {
      name: 'total',
      // required: true,
      label: '合计',
      align: 'center',
      // field: row => row.company,
    },
    {
      name: 'overSpeed',
      // required: true,
      label: '超速',
      align: 'center',
      // field: () => '操作'
    },
    {
      name: 'fatigueDrive',
      // required: true,
      label: '疲劳驾驶',
      align: 'center',
      // field: row => row.alarmType,
    },
    {
      name: 'smoke',
      // required: true,
      label: '吸烟',
      align: 'center',
      // field: row => row.company,
    },
    {
      name: 'makeCall',
      // required: true,
      label: '接打电话',
      align: 'center',
      // field: () => '操作'
    }
  ],
  message: '暂无数据',
  current: 1,
  loading: false,
});

const handleClose = () => {
  storeTransportationDialog.setShowFourDialog(''); // 假设store中有这样的方法
};

watch(() => showFourDialog.value, (newVal) => {
  if (newVal.includes('fourColor')) {
    fourColor.value = newVal;
  }
})


</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
  max-width: 1537px !important;
  overflow: none !important;
  min-height: 1182px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1537px;
  height: 1182px;
  position: fixed;
  left: 3200px;
  top: 400px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
}

.dialog-conten-body {
  width: 1537px;
  height: 1097px;
  padding: 42px 28px 38px;
}

.fourColorOfRedBg {
  background-image: url("assets/image/dialog/fourColorRedBg.png");
  background-size: 100% 100%;
}

.fourColorOfYellowBg {
  background-image: url("assets/image/dialog/fourColorYellowBg.png");
  background-size: 100% 100%;
}

.fourColorOfGreenBg {
  background-image: url("assets/image/dialog/fourColorGreenBg.png");
  background-size: 100% 100%;
}

.fourColorOfBlueBg {
  background-image: url("assets/image/dialog/fourColorBlueBg.png");
  background-size: 100% 100%;
}

.select-red {
  width: 386px;
  height: 75px;
  margin-right: -150px;
  background-image: url("assets/image/dialog/切图 576.png");
  background-size: 100% 100%;
}

.select-yellow {
  width: 430px;
  height: 75px;
  margin-right: -150px;
  background-image: url("assets/image/dialog/切图 577.png");
  background-size: 100% 100%;

}

.select-green {
  width: 430px;
  height: 75px;
  margin-right: -150px;
  background-image: url("assets/image/dialog/切图 579.png");
  background-size: 100% 100%;
}

.select-blue {
  width: 430px;
  height: 75px;
  margin-right: -150px;
  background-image: url("assets/image/dialog/切图 580.png");
  background-size: 100% 100%;
}

.text-red {
  margin-left: 40px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 41px;
  line-height: 75px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C6E1FF 0%, #FAFDFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-yellow {
  margin-left: 80px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 41px;
  line-height: 75px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C6E1FF 0%, #FAFDFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-green {
  margin-left: 80px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 41px;
  line-height: 75px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C6E1FF 0%, #FAFDFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-blue {
  margin-left: 80px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 41px;
  line-height: 75px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C6E1FF 0%, #FAFDFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.body-top-item-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 38px;
  line-height: 62px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #9FC7DD 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.body-top-item-value {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 38px;
  line-height: 62px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #9FC7DD 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content-body-top {
  width: 100%;
  height: 62px;
  background: #040c1792;
  border-radius: 0px 0px 0px 0px;
}

.content-body-center {
  padding: 16px 0px 26px;
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
  background: rgba(71, 72, 73, 0.466) !important;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: rgba(63, 48, 42, 1);
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin: 0px 8px !important;
}

:deep(.q-pagination__content .q-btn-item::before) {
  box-shadow: none;
}

:deep(.q-table__container) {
  background: none !important;
}

:deep(.q-pagination__content .q-btn--standard .block) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: rgb(187, 187, 187);
  // background-color: rgba(255, 239, 184, 1);
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-pagination__content .q-btn--push .block) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: rgb(175, 151, 125);
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.text-header-th {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: #BBD5EB;
  line-height: 71px;
  font-style: normal;
  text-transform: none;
}

.table-row {
  width: 100%;
  height: 68px !important;
  border-radius: 0px 0px 0px 0px;
  background-color: rgba(4, 12, 23, 0.2);
}

.table-row>.q-td {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.content-tab-table-header {
  width: 1537px;
  height: 168px !important;
}

:deep(.q-table__container thead th) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 36px;
  color: #BBD5EB;
  line-height: 71px;
  font-style: normal;
  text-transform: none;
}

.fourColorOfRed-table-heard {
  width: 100%;
  height: 84px !important;
  background-image: url("assets/image/dialog/切图 582.png");
  background-size: 100% 100%;
}

.fourColorOfYellow-table-heard {
  width: 100%;
  height: 84px !important;
  background-image: url("assets/image/dialog/切图 584.png");
  background-size: 100% 100%;
}

.fourColorOfGreen-table-heard {
  width: 100%;
  height: 84px !important;
  background-image: url("assets/image/dialog/切图 587.png");
  background-size: 100% 100%;
}

.fourColorOfBlue-table-heard {
  width: 100%;
  height: 84px !important;
  background-image: url("assets/image/dialog/切图 589.png");
  background-size: 100% 100%;
}
</style>
