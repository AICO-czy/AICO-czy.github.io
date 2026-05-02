<!--数据查询-->
<template>
  <div class="search-view">
    <div class="row items-center search-data mb-[20px]">
      <div class="col-auto full-height">
        <div class="firm-Select-content">
          <el-select v-model="state.selectFirm" :teleported="false" class="firm-Select">
            <el-option v-for="item in state.firmOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
    </div>
    <div class="row items-center search-data">
      <div class="col full-height">
        <q-input dark outlined v-model="state.searchValue" placeholder="输入查询内容...." class="search-input">
          <template v-slot:prepend>
            <q-icon name="img:icons/cdsgl/geographicInfo/搜索.svg" />
          </template>
          <template v-slot:append>
            <q-icon v-if="state.searchValue !== ''" name="img:icons/cdsgl/geographicInfo/input-清除.svg"
              @click="clearData" />
          </template>
        </q-input>
      </div>
      <div class="col-auto">
        <div class="row items-center search-btn" @click="searchData">
          <!-- <div class="col-auto">
            <q-icon name="img:icons/cdsgl/geographicInfo/搜索.svg" class="search-btn-icon"></q-icon>
          </div> -->
          <div class="col">
            <div class="search-btn-label">查询</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-list" v-if="state.showList">
      <q-scroll-area :thumb-style="state.thumbStyle" :bar-style="state.barStyle" class="fit">
        <template v-if="state.searchList.length > 0">
          <div class="row items-center" v-for="(item, index) in state.searchList" :key="index">
            <div class="col-auto">{{ index + 1 }}</div>
            <div class="col">{{ item.label }}</div>
          </div>
        </template>
        <template v-if="state.searchList.length === 0 && !state.loading">
          <div class="no-data">未查询到数据</div>
        </template>
        <q-inner-loading dark :showing="state.loading">
          <q-spinner-tail color="primary" class="loading-icon" />
          <div class="loading-label">数据加载中...</div>
        </q-inner-loading>
      </q-scroll-area>
    </div>
  </div>
</template>
<script setup lang="ts" name="SearchData">
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  onUnmounted,
  watch,
} from "vue";

const state = reactive({
  selectFirm: "承德市",
  firmOptions: [
    {
      label: "承德市",
      value: "承德市",
    },
    {
      label: "双桥区",
      value: "双桥区",
    },
    {
      label: "双滦区",
      value: "双滦区",
    },
    {
      label: "‌承德县",
      value: "‌承德县",
    },
    {
      label: "兴隆县",
      value: "兴隆县",
    },
    {
      label: "滦平县",
      value: "滦平县",
    },
    {
      label: "‌隆化县",
      value: "‌隆化县",
    },
    {
      label: "‌平泉市",
      value: "‌平泉市",
    },
    {
      label: "丰宁满族自治县",
      value: "丰宁满族自治县",
    },
    {
      label: "鹰手营子矿区",
      value: "鹰手营子矿区",
    },
    {
      label: "宽城满族自治县",
      value: "宽城满族自治县",
    },
    {
      label: "围场满族蒙古族自治县",
      value: "围场满族蒙古族自治县",
    },
  ] as any,
  searchValue: "",
  searchList: [] as any,
  loading: false,
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
});

/**查询数据 */
const searchData = () => {
  if (state.searchValue !== "") {
    state.showList = true;
    state.loading = true;
    loadData();
  }
};

/**查询数据 */
const loadData = () => {
  setTimeout(() => {
    state.loading = false;
  }, 2000);
};

/**清除输入框数据 */
const clearData = () => {
  state.searchValue = "";
  state.showList = false;
};
</script>
<style scoped>
.search-view {
  position: fixed;
  top: 141px;
  left: 62px;
  z-index: 7000 !important;
}

.firm-Select-content {
  width: 300px;
  height: 100%;
  margin-right: 32px;
}

.firm-Select {
  width: 100%;
  height: 100%;
}

.firm-Select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #0a62b0;
  box-shadow: none;
  border-radius: 14px 14px 14px 14px;
  padding-left: 50px;
  padding-right: 30px;
}

.firm-Select :deep(.el-select__placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 41px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #b2e8ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.firm-Select :deep(.el-select__icon) {
  font-size: 40px;

}

.firm-Select :deep(.el-icon) {
  display: none;
}
.firm-Select :deep(.el-select__suffix) {
  position: relative;
  right: 30px;
}

.firm-Select :deep(.el-select__suffix)::after {
  position: absolute;
  content: '';
  background: url('assets/component/切图-地理信息全要素一张图_slices/形状_6.png') no-repeat center/cover;
  width: 20px;
  height: 10px;
  top: 5px;
  left: 0;
}

.firm-Select :deep(.el-select__suffix)::before {
  position: absolute;
  content: '';
  background: url('assets/component/切图-地理信息全要素一张图_slices/形状_6(1).png') no-repeat center/cover;
  width: 20px;
  height: 10px;
  bottom: 5px;
  left: 0;
}

.firm-Select :deep(.el-popper) {
  background-color: #093458;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}

.firm-Select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}

.firm-Select :deep(.el-select-dropdown__item.is-selected) {
  color: #3d7fff;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 41px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  height: 65px;
}

.firm-Select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #415b7a !important;
}

.firm-Select :deep(.el-select-dropdown__item) {
  color: #9fe2fd;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 41px;
  line-height: 65px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  height: 65px;
}

.firm-Select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}

.search-data {
  width: auto;
  height: 104px;
}

.search-input {
  width: 450px;
  height: 100%;
  padding-right: 34px;
}

.search-input :deep(.q-field__control) {
  width: 100%;
  height: 100%;
  background: #0E1F33;
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #265076;
}

.search-input :deep(.q-field__control:before) {
  border: none !important;
}

.search-input :deep(.items-center) {
  height: 100%;
}

.search-input :deep(.q-icon) {
  font-size: 47px;
  padding: 0 23px;
}

.search-input :deep(.q-placeholder) {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 32px;
  line-height: 73px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #b2e8ff;
}

.search-btn {
  width: 184px;
  height: 103px;
  padding: 0 21px;
  /* background: #093458; */
  background: linear-gradient(360deg, rgba(59, 119, 189, .2) 25%, rgba(59, 119, 189, 0) 50%, #3999DF 100%);
  border-radius: 10px 10px 10px 10px;
  border: 2px solid rgba(84, 167, 228, 0.5);
}

.search-btn-icon {
  font-size: 41px;
}

.search-btn-label {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 41px;
  line-height: 65px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #e4f7ff 0%, #b2e8ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.search-list {
  width: 100%;
  height: 500px;
  margin-top: 20px;
  background: #093458;
  border-radius: 14px 14px 14px 14px;
}

.no-data {
  padding-top: 200px;
  text-align: center;
  font-size: 47px;
  color: #b2e8ff;
}

.loading-icon {
  font-size: 90px;
}

.loading-label {
  padding-top: 20px;
  font-size: 40px;
  color: #b2e8ff;
}
</style>
