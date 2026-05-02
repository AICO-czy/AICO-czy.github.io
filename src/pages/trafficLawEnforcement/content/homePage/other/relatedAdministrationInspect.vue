<!-- 涉企行政检查工作事项 -->
<template>
  <div class="basic-management-dialog">
    <div class="content-title">{{ props.title }}</div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column">
      <div class="content-box-top row items-center">
        <!-- <q-input rounded v-model="basicManagementText" placeholder="请输入搜索内容" dense class="input-box">
          <template v-slot:append>
            <q-icon name="search" class="search-icon" />
          </template>
</q-input> -->
        <div class="content-box-select row items-center">
          <div class="basic-management-select-title">年度</div>
          <el-select v-model="state.selectYear" :teleported="false" class="basic-management-select">
            <el-option v-for="item in state.yearOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <div class="content-box-bottom col column justify-between">
        <div class="content-box-table">
          <div class="column fit">
            <div class="col-auto">
              <div class="row items-center title-content">
                <div class="col-1">序号</div>
                <div class="col">检查事项</div>
                <div class="col">检查对象</div>
                <div class="col">检查依据</div>
                <div class="col">检查频次</div>
                <div class="col">检查方式</div>
                <div class="col">检查主体</div>
                <div class="col">承办部门</div>
                <div class="col">是否跨部门联合检查</div>
              </div>
            </div>
            <div class="col">
              <q-scroll-area class="fit" ref="agencyListScrollArea" :thumb-style="state.thumbStyle"
                :bar-style="state.barStyle">
                <q-list dark separator dense class="q-ml-none" ref="agencyList">
                  <q-item class="agencyList-row" v-for="(item) in state.inspectionData" :key="item.index" clickable
                    v-ripple :data-id="item.id">
                    <div class="row items-center agencyList-item">
                      <div class="col-1 agencyList-item-style">{{ item.index }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionItem }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionObject }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionBasis }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionFrequency }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionMethod }}</div>
                      <div class="col agencyList-item-style">{{ item.inspectionSubject }}</div>
                      <div class="col agencyList-item-style">{{ item.undertakingDepartment }}</div>
                      <div class="col agencyList-item-style">{{ item.isCrossDepartmentJointInspection ? '是' : '否' }}
                      </div>
                    </div>
                  </q-item>
                </q-list>
                <q-inner-loading :showing="state.loading">
                  <q-spinner-dots size="3.5em" color="primary" />
                </q-inner-loading>
                <div v-if="state.inspectionData.length === 0 && !state.loading" class="text-center nodata-label">
                  暂无数据！
                </div>
              </q-scroll-area>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
const props = defineProps({
  title: {
    type: String,
    default: ""
  }
})
const basicManagementText = ref('')
const state = reactive({
  loading: false,
  selected: null as any,
  showDetailed: false,
  selectAgency: null as any,
  inspectionData: [
    {
      index: 1,
      inspectionItem: "国内水路运输及辅助业和国际船舶运输业监督检查",
      inspectionObject: "全市水路运输及辅助业和国际船舶运输企业",
      inspectionBasis: "1.《国内水路运输管理条例》第五条，经营水路运输及辅助业务，诚实信用，其第五条经营诚实信用...",
      inspectionFrequency: "水上运输（含辅助业）类企业8次",
      inspectionMethod: "现场检查",
      inspectionSubject: "承德市交通运输局",
      undertakingDepartment: "执法执法",
      isCrossDepartmentJointInspection: true
    },
    {
      index: 2,
      inspectionItem: "对公路工程（新改扩建）质量安全的监督检查",
      inspectionObject: "全市公路工程（新改扩建）建设项目",
      inspectionBasis: "1.《国内水路运输管理条例》第五条，经营水路运输及辅助业务，诚实信用，其第五条经营诚实信用...",
      inspectionFrequency: "公路建设工程类企业8次",
      inspectionMethod: "现场检查",
      inspectionSubject: "承德市交通运输局",
      undertakingDepartment: "执法执法",
      isCrossDepartmentJointInspection: false
    },
    {
      index: 3,
      inspectionItem: "国内水路运输及辅助业和国际船舶运输业监督检查",
      inspectionObject: "全市水路运输及辅助业和国际船舶运输企业",
      inspectionBasis: "1.《国内水路运输管理条例》第五条，经营水路运输及辅助业务，诚实信用，其第五条经营诚实信用...",
      inspectionFrequency: "水上运输（含辅助业）类企业8次",
      inspectionMethod: "现场检查",
      inspectionSubject: "承德市交通运输局",
      undertakingDepartment: "执法执法",
      isCrossDepartmentJointInspection: true
    },
    {
      index: 4,
      inspectionItem: "国内水路运输及辅助业和国际船舶运输业监督检查",
      inspectionObject: "全市水路运输及辅助业和国际船舶运输企业",
      inspectionBasis: "1.《国内水路运输管理条例》第五条，经营水路运输及辅助业务，诚实信用，其第五条经营诚实信用...",
      inspectionFrequency: "水上运输（含辅助业）类企业8次",
      inspectionMethod: "现场检查",
      inspectionSubject: "承德市交通运输局",
      undertakingDepartment: "执法执法",
      isCrossDepartmentJointInspection: true
    },
    {
      index: 5,
      inspectionItem: "国内水路运输及辅助业和国际船舶运输业监督检查",
      inspectionObject: "全市水路运输及辅助业和国际船舶运输企业",
      inspectionBasis: "1.《国内水路运输管理条例》第五条，经营水路运输及辅助业务，诚实信用，其第五条经营诚实信用...",
      inspectionFrequency: "水上运输（含辅助业）类企业8次",
      inspectionMethod: "现场检查",
      inspectionSubject: "承德市交通运输局",
      undertakingDepartment: "执法执法",
      isCrossDepartmentJointInspection: true
    }
  ] as any,
  showList: false,
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: 0.75,
  },
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: 0.2,
  },
  selectYear: "2025",
  yearOptions: [
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
});

// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

</script>

<style scoped lang="scss">
.basic-management-dialog {
  width: 2240px;
  height: 1246.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 806px;
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
  top: 15px;
}

.content-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  padding: 36px 35px 45px;
}

.content-box-top {
  width: 100%;
  height: 100px;
}

.content-box-select {
  width: 622px;
  height: 88px;
  // margin-left: 80px;
}

.basic-management-select {
  width: 362px;
  height: 88px;
}

.basic-management-select-title {
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

.basic-management-select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #164370;
  box-shadow: none;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.basic-management-select :deep(.el-select__placeholder) {
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

.basic-management-select :deep(.el-popper) {
  background-color: #164370;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.basic-management-select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}

.basic-management-select :deep(.el-select-dropdown__item.is-selected) {
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

.basic-management-select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #48607c !important;
}

.basic-management-select :deep(.el-select-dropdown__item) {
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

.basic-management-select :deep(.el-popper.is-light .el-popper__arrow::before) {
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


.content-box-table {
  width: 100%;
  height: 100%;
}

.title-content {
  width: 100%;
  height: 116px;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 44px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.agencyList-item-icon {
  width: 100px;
  text-align: center;
}

.agencyList-row:nth-child(odd) {
  width: 100%;
  height: 136px;
  background: #183955;
  border-radius: 0px 0px 0px 0px;
  padding: 0px 0px;
}

.agencyList-row:nth-child(even) {
  width: 100%;
  height: 136px;
  background: rgba(140, 178, 231, 0.06);
  border-radius: 0px 0px 0px 0px;
  padding: 0px 0px;
}

.agencyList-item {
  width: 100%;
  height: 100%;
}

.agencyList-item-style {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #FFFFFF;
  text-align: center;
  font-style: normal;
  text-transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 修复1：添加 display: -webkit-box（多行省略必需） */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 修复2：首行缩进用 em 单位，适配字体大小 */
}

.agencyList-infoText {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 34px;
  color: #20FFF0;
  line-height: 135px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  cursor: pointer;
}

.nodata-label {
  padding-top: 100px;
  font-size: 35px;
}
</style>
