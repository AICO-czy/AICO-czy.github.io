<!-- 执法机构弹窗 -->
<template>
  <div class="law-agency-dialog">
    <div class="content-title">执法机构</div>
    <div class="content-black cursor-pointer" v-show="state.showDetailed" @click="handleBlackClick"></div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box" v-if="!state.showDetailed">
      <div class="content-box-table">
        <div class="column fit">
          <div class="col-auto">
            <div class="row items-center title-content">
              <div class="col-1">序号</div>
              <div class="col">机构名称</div>
              <div class="col">机构规格</div>
              <div class="col">内设机构</div>
              <div class="col-1">操作</div>
            </div>
          </div>
          <div class="col">
            <q-scroll-area class="fit" ref="agencyListScrollArea" :thumb-style="state.thumbStyle"
              :bar-style="state.barStyle">
              <q-list dark separator dense class="q-ml-none" ref="agencyList">
                <q-item class="agencyList-row" v-for="(item) in state.agencyData" :key="item.index" clickable v-ripple
                  :data-id="item.id">
                  <div class="row items-center agencyList-item">
                    <div class="col-1 agencyList-item-style">{{ item.index }}</div>
                    <div class="col agencyList-item-style">{{ item.name }}</div>
                    <div class="col agencyList-item-style">{{ item.type }}</div>
                    <div class="col agencyList-item-style">{{ item.sub_agency }}</div>
                    <div class="col-1 agencyList-item-style agencyList-infoText" @click="showDetails(item)">详情</div>
                  </div>
                </q-item>
              </q-list>
              <q-inner-loading :showing="state.loading">
                <q-spinner-dots size="3.5em" color="primary" />
              </q-inner-loading>
              <div v-if="state.agencyData.length === 0 && !state.loading" class="text-center nodata-label">暂无数据！</div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>
    <lawAgencyDetails v-if="state.showDetailed" :item="state.selectAgency" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
import lawAgencyDetails from "./lawAgencyDetails.vue";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

const state = reactive({
  loading: false,
  selected: null as any,
  showDetailed: false,
  selectAgency: null as any,
  agencyData: [
    {
      index: 1,
      name: '承德市交通运输综合行政执法支队',
      type: '副处级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 2,
      name: '丰宁满足自治县交通运输综合执法大队',
      type: '副处级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 3,
      name: '围场满族蒙古族自治县交通运输综合执法大队',
      type: '副科级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 4,
      name: '隆化县交通运输综合执法大队',
      type: '副科级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 5,
      name: '平泉市交通运输综合执法大队',
      type: '副科级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 6,
      name: '平泉市交通运输综合执法大队',
      type: '副科级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
    {
      index: 7,
      name: '平泉市交通运输综合执法大队',
      type: '副科级',
      sub_agency: '综合指挥中心、执法一队、执法二队、执法三队、执法四队、执法五队、执法六队、双滦执法大队',
    },
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
});

/**列表行详细 */
const showDetails = (item: any) => {
  if (state.showDetailed) {
    state.showDetailed = false;
  }
  state.showDetailed = true;
  state.selectAgency = item;
};

/**关闭弹窗 */
const handleBlackClick = () => {
  state.showDetailed = false;
};
</script>

<style scoped lang="scss">
.law-agency-dialog {
  width: 2211.48px;
  height: 975.23px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 211px;
  padding: 115px 95px 55px 95px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 70px;
  top: 50px;
}

.content-black {
  width: 36px;
  height: 30px;
  background: url("assets/component/blackIcon.png") no-repeat 100%/100%;
  position: absolute;
  right: 150px;
  top: 60px;
}

.content-title {
  width: 350px;
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
  top: 0px;
}

.content-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  padding: 27px 25px;
}

.content-box-table {
  width: 100%;
  height: 100%;
}

.title-content {
  width: 100%;
  height: 96px;
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
