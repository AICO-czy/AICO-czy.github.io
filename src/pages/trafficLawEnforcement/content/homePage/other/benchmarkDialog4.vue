<!-- 行政处罚裁量权基准 -->
<template>
  <div class="benchmark-dialog">
    <div class="content-title">{{ title }}</div>
    <div class="content-black cursor-pointer" v-show="state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column" v-show="!state.showDetailed">
      <div class="content-box-top row items-center">
        <q-input rounded v-model="benchmarkText" placeholder="请输入搜索内容" dense class="input-box">
          <template v-slot:append>
            <q-icon name="search" class="search-icon" />
          </template>
        </q-input>
        <div class="content-box-select row items-center">
          <div class="benchmark-select-title">年度</div>
          <el-select v-model="state.selectbenchmark" :teleported="false" class="benchmark-select">
            <el-option v-for="item in state.benchmarkOptions" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="content-box-bottom col column justify-between">
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
            <q-tr :props="props">
              <q-td key="index" :props="props" class="text-index">
                {{ props.row.index }}
              </q-td>
              <q-td key="illegalAct" :props="props" class="text-tab-content">
                {{ props.row.illegalAct }}
              </q-td>
              <q-td key="specific" :props="props" class="text-tab-content">
                {{ props.row.specific }}
              </q-td>
              <!-- <q-td key="legalBasis" :props="props" class="text-tab-content">
                {{ props.row.legalBasis }}
              </q-td> -->
              <q-td key="actions" :props="props" class="table-actions row justify-center items-center">
                <div class="table-operation" @click="showDetails(props.row)">详情</div>
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
    <AdministrationDetails4 v-if="state.showDetailed" :item="state.selectAgency" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
import AdministrationDetails4 from "./administrationDetails4.vue";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);

const props = defineProps({
  title: {
    type: String,
    default: ""
  }
})
const benchmarkText = ref('')
const state = reactive({
  message: '暂无数据',
  current: 1,
  showDetailed: false,
  selectAgency: null as any,
  // 表格数据
  tableData: [
    {
      index: '01',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
    },
    {
      index: '02',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
    },
    {
      index: '03',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
    },
    {
      index: '04',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
    },
    {
      index: '05',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
    },
    {
      index: '06',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
    },
    {
      index: '07',
      illegalAct: '未取得道路客运经营许可，擅自从事 道路客运经营',
      specific: '在公路上及公路用地范围内摆摊设点、堆放物品、倾倒垃圾、设置障...',
      legalBasis: '《中华人民共和国道路运输条例》 第六十三条',
      dataNum: '435,554'
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
      name: 'illegalAct',
      required: true,
      label: '强制事项',
      align: 'center',
      field: row => row.index,
    },
    {
      name: 'specific',
      required: true,
      label: '法定依据',
      align: 'center',
      field: row => row.index,
    },
    // {
    //   name: 'legalBasis',
    //   required: true,
    //   label: '法律依据',
    //   align: 'center',
    //   field: row => row.index,
    // },
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

  selectbenchmark: "2025",
  benchmarkOptions: [
    {
      value: "2025",
      label: "2025年",
    },
    {
      value: "2024",
      label: "2024年",
    },
    {
      value: "2023",
      label: "2023年",
    },
    {
      value: "2022",
      label: "2022年",
    },
    {
      value: "2021",
      label: "2021年",
    },
  ],
})

// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}
/**列表行详细 */
const showDetails = (item: any) => {
  if (state.showDetailed) {
    state.showDetailed = false;
  }
  state.showDetailed = true;
  state.selectAgency = item;
};
/**关闭详细弹窗 */
const handleBlackClick = () => {
  state.showDetailed = false;
};
</script>

<style scoped lang="scss">
.benchmark-dialog {
  width: 2240px;
  height: 1446.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 606px;
  padding: 135px 80px 60px 80px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 60px;
}

.content-title {
  width: 500px;
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
  top: 25px;
}

.content-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  padding: 46px 35px 45px;
}

.content-box-top {
  width: 100%;
  height: 100px;
}

.content-box-select {
  width: 622px;
  height: 88px;
  margin-left: 80px;
}

.benchmark-select {
  width: 362px;
  height: 88px;
}

.benchmark-select-title {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #A9CEE8;
  line-height: 42px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  margin-right: 30px;
}

.benchmark-select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #164370;
  box-shadow: none;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.benchmark-select :deep(.el-select__placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #9fe2fd 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.benchmark-select :deep(.el-popper) {
  background-color: #164370;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.benchmark-select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}

.benchmark-select :deep(.el-select-dropdown__item.is-selected) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #9fe2fd;
  // color: #3d7fff;
}

.benchmark-select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #48607c !important;
}

.benchmark-select :deep(.el-select-dropdown__item) {
  width: 362px;
  height: 88px;
  color: #9fe2fd;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  line-height: 44px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.benchmark-select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}

:deep(.el-select__icon) {
  width: 34px;
  height: 34px;
}

:deep(.el-select__icon svg) {
  width: 34px;
  height: 34px;
}


.input-box {
  width: 541px;
  height: 88px;
  background: rgba(14, 31, 51, 0.5);
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #3871A5;
}

.input-box :deep(.q-field__control) {
  width: 100%;
  height: 100%;
}

.input-box :deep(.q-field__native) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.input-box :deep(.q-field__native::placeholder) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}


.input-box:deep(.q-field__marginal) {
  height: 70px;
}

.search-icon {
  padding-right: 20px;
  font-size: 36px;
  color: #B1F3FD;
}

.content-box-bottom {
  margin-top: 30px;
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
  height: 105px !important;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;

  // &>.text-center {
  //   width: 33.33%;
  // }

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
  font-size: 32px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
  overflow: hidden;
  white-space: wrap;
}

:deep(.q-table tbody tr) {
  width: 100%;
  height: 144px;
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table tbody tr:nth-child(even)) {
  width: 100%;
  height: 144px;
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
  margin-left: 13px;
  margin-top: 30px;
}

.table-foot-pagination {
  padding: 30px 15px 0px 0px;
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

.table-actions {
  height: 124px !important;
}

.table-operation {
  width: 183px;
  height: 144px;
  // border-radius: 15px 15px 15px 15px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  color: #20FFF0;
  line-height: 144px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}

.text-index {
  width: 183px;
  height: 144px;
}

.text-tab-content {
  width: 40%;
  height: 144px;
}

.content-black {
  width: 36px;
  height: 30px;
  background: url("assets/component/blackIcon.png") no-repeat 100%/100%;
  position: absolute;
  right: 170px;
  top: 70px;
}
</style>
