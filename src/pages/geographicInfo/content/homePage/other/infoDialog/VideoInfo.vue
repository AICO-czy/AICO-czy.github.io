<!--公路运营-视频信息弹窗-->
<template>
  <div class="video-info">
    <div class="column fit">
      <div class="col-auto">
        <div class="row items-center title-content">
          <div class="col-auto">
            <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/头部左侧.svg" class="title-icon"></q-icon>
          </div>
          <div class="col-auto">
            <q-icon name="img:icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/视频图标.svg" class="info-icon"></q-icon>
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
        <div class="info-content">
          <div class="info-item">
            <div class="row items-center info-item-content">
              <div class="col">
                <div class="info-item-value">{{ state.subTitle }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="video-content" >
          <div class="column fit">
            <div class="col-auto">
              <div class="video-select-content">
                <el-select v-model="state.selectVideo" :teleported="false" class="video-select">
                  <el-option v-for="item in state.videoData" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>
            <div class="col">
              <div class="video-img">
                <q-img src="icons/cdsgl/monitoringAndEarlyWarning/highwayOperation/infoDialog/视频封面.png" class="fit"></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="videoInfo">
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
  title: "视频",
  subTitle:"京承高速K998+023 XX方向",
  selectVideo:"video1",
  videoData: [
    {
      value: "video1",
      label: "京承高速视频点位1",
    },
    {
      value: "video2",
      label: "京承高速视频点位2",
    },
    {
      value: "video3",
      label: "京承高速视频点位3",
    },
    {
      value: "video4",
      label: "京承高速视频点位4",
    },
  ],
});

/**关闭信息弹框 */
const closeClick = () => {
  props.tooltipThat.bubbleClose();
};
</script>
<style scoped>
.video-info {
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
