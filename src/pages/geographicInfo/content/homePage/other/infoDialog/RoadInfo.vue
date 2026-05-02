<!--公路运营-公路信息弹窗-->
<template>
  <div class="road-info">
    <div class="column fit">
      <div class="col-auto">
        <div class="row items-center title-content">
          <div class="col-auto">
            <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/头部左侧.svg" class="title-icon"></q-icon>
          </div>
          <div class="col-auto">
            <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/公路详情图标.svg" class="info-icon"></q-icon>
          </div>
          <div class="col">
            <div class="title-val">{{state.title}}</div>
          </div>
          <div class="col-auto" @click="closeClick">
            <q-icon name="close" class="close-icon" />
          </div>
        </div>
      </div>
      <div class="col-auto">
        <div class="btn-group">
          <div class="row items-center">
            <div class="col">
              <div class="row q-gutter-md">
                <template v-for="(btn,index) in state.btnGroups" :key="index">
                  <div class="col-auto btn-item" :class="{'btn-item-active':btn.code===state.selectBtn}" @click="selectbtn(btn)">
                    <div class="btn-label">{{ btn.label }}</div>
                  </div>
                </template>
              </div>
            </div>
            <div class="col-auto">
              <div class="archives-btn">公路档案
                <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/icons/历史事件图标.svg" class="archives-btn-icon"></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="info-content" v-if="state.selectBtn==='basicInfo'">
          <div class="info-item" v-for="(info,index) in state.basicInfo" :key="index">
            <div class="row items-center info-item-content">
              <div class="col-auto">
                <div class="info-item-name">{{ info.name }}:</div>
              </div>
              <div class="col">
                <div class="info-item-value">{{ info.value }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="info-content" v-if="state.selectBtn==='roadPerformance'">
          <div class="info-item" v-for="(info,index) in state.roadPerformance" :key="index">
            <div class="row items-center info-item-content">
              <div class="col-auto">
                <div class="info-item-name">{{ info.name }}:</div>
              </div>
              <div class="col">
                <div class="info-item-value">{{ info.value }}</div>
              </div>
              <div class="col-auto" v-if="info.scale">
                <div class="info-item-scale">环比:</div>
              </div>
              <div class="col-auto" v-if="info.scale">
                <div class="scale-value-up" v-if="info.scale>0">{{ Math.abs(info.scale) }}%
                  <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/redUp.svg" class="scale-icon"></q-icon>
                </div>
                <div class="scale-value-down" v-else>{{ Math.abs(info.scale) }}%
                  <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/greenDown.svg" class="scale-icon"></q-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="roadInfo">
import { reactive, onMounted, onUnmounted, watch } from "vue";
const props = defineProps({
  tooltipThat: {
    type: Object,
    default: {},
  },
  data: {
    type: Object,
    default: {},
  },
});
const state = reactive({
  title: "公路详情",
  selectBtn: "basicInfo",
  btnGroups: [
    {
      label: "基本信息",
      code: "basicInfo",
    },
    {
      label: "公路动态",
      code: "roadPerformance",
    },
  ],
  basicInfo: [
    {
      name: "公路名称",
      value: "S358北凌线",
    },
    {
      name: "公路等级",
      value: "省道",
    },
    {
      name: "公路里程",
      value: "24433公里",
    },
    {
      name: "竣工时间",
      value: "2024/12/27",
    },
    {
      name: "通车时间",
      value: "2025/10/25",
    },
    {
      name: "养护单位",
      value: "营子区养护中心",
    },
    {
      name: "联系人",
      value: "王明洋",
    },
    {
      name: "联系方式",
      value: "19878288135",
    },
  ],
  roadPerformance: [
    {
      name: "今日交通量",
      value: "3526辆",
    },
    {
      name: "今日客运交通量",
      value: "1000辆",
      scale: 13.45,
    },
    {
      name: "今日货运交通量",
      value: "2000辆",
      scale: -25.24,
    },
    {
      name: "今日入承交通量",
      value: "243辆",
      scale: 13.45,
    },
    {
      name: "今日出承交通量",
      value: "236辆",
      scale: -13.45,
    },
  ],
});

/**按钮选中事件 */
const selectbtn = (btn: any) => {
  if (btn.code !== state.selectBtn) {
    state.selectBtn = btn.code;
  }
};

/**关闭信息弹框 */
const closeClick = () => {
  props.tooltipThat.bubbleClose();
};
</script>
<style scoped>
.road-info {
  width: 913px;
  height: 797px;
  background-image: url("assets/image/cdsgl/monitoringAndEarlyWarning/小弹窗背景.png");
  background-size: 100% 100%;
}
.title-content {
  width: 100%;
  height: 97px;
}
.title-icon {
  width: 10px !important;
  height: 47px !important;
}
.info-icon {
  font-size: 45px;
  padding-left: 22px;
}
.title-val {
  padding-left: 15px;
  font-family: SourceHanSansBold;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: bottom;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #ffffff 28%, #66d2ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.close-icon {
  color: #ffffff;
  font-size: 25px;
  padding-right: 50px;
}
.btn-group {
  padding: 0 40px 21px 40px;
}
.btn-item {
  height: 54px;
  background: linear-gradient(
    180deg,
    #2a69b5 0%,
    rgba(21, 66, 121, 0.77) 51%,
    rgba(42, 105, 181, 0.769) 100%,
    #315b8f 100%
  );
}
.btn-item-active {
  background: linear-gradient(
    180deg,
    #00aaed 0%,
    rgba(22, 91, 123, 0.77) 51%,
    rgba(0, 170, 237, 0.769) 100%,
    #315b8f 100%
  );
}
.btn-label {
  padding: 10px 43px;
  font-family: SourceHanSansNormal;
  font-weight: 500;
  font-size: 30px;
  color: #bfdefc;
  line-height: 34px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.archives-btn {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 30px;
  color: #bfdefc;
  line-height: 34px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.archives-btn-icon {
  padding-left: 10px;
  font-size: 25px;
}
.info-content {
  width: 100%;
  height: 100%;
}
.info-item {
  width: 100%;
  height: 68px;
  padding: 0 0 8px 40px;
}
.info-item-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(1, 22, 55, 0.45) 0%,
    rgba(1, 22, 55, 0.31) 47%,
    rgba(1, 22, 55, 0) 100%
  );
  border-radius: 0px 0px 0px 0px;
}
.info-item-name {
  padding-left: 21px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 28%, #66d2ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.info-item-value {
  padding-left: 30px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 28%, #66d2ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.info-item-scale {
  padding-right: 20px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 28%, #66d2ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.scale-value-up {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #ff8f74;
}
.scale-value-down {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  line-height: 39px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #29e8bc;
}
.scale-icon {
  font-size: 23px;
  padding: 0 46px 8px 0;
}
.video-content {
  width: 100%;
  height: 100%;
  padding: 0 41px 55px 41px;
}
.video-select-content {
  width: 100%;
  height: 86px;
  padding-bottom: 19px;
  display: flex;
  justify-content: flex-end;
}
.video-select {
  width: 338px;
  height: 100%;
}
.video-select :deep(.el-select__wrapper) {
  min-height: 100%;
  background-color: #164370;
  box-shadow: none;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}
.video-select :deep(.el-select__placeholder) {
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
.video-select :deep(.el-popper) {
  background-color: #164370;
  border-radius: 4px 4px 4px 4px !important;
  border: 2px solid #1e68a7 !important;
}
.video-select :deep(.el-popper__arrow) {
  background-color: #164370 !important;
}
.video-select :deep(.el-select-dropdown__item.is-selected) {
  color: #3d7fff;
}
.video-select :deep(.el-select-dropdown__item.is-hovering) {
  background-color: #415b7a !important;
}
.video-select :deep(.el-select-dropdown__item) {
  color: #9fe2fd;
}
.video-select :deep(.el-popper.is-light .el-popper__arrow::before) {
  background: #164370 !important;
  border-left: 2px solid #1e68a7 !important;
  border-top: 2px solid #1e68a7 !important;
}
.video-img {
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 0px 0px;
  border: 3px solid #24d0ea;
}
</style>
