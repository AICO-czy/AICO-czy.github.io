<!--一张图-右侧-视频监控-->
<template>
  <div class="video-moniter">
    <!-- <titleSmall class="col-auto title-small-video-moniter" title="视频监控"></titleSmall> -->
    <div class="card-title">
      <div class="card-text">视频监控</div>
    </div>
    <div class="content-container">
      <div class="content-item row">
        <div class="w_h158">
          <!-- <q-icon class="w_h158" name="img:icons/cdsgl/geographicInfo/视频监控-监控分类.svg"></q-icon> -->
          <q-img src="icons/切图-地理信息全要素一张图_slices/组 43087.png" spinner-color="white" class="w_h158"></q-img>
        </div>
        <div class="ml20">
          <div class="item-number">
            <div class="number-box">
              {{ state.moniterClass.number }}
            </div>
            <div class="number-unit">{{ state.moniterClass.unit }}</div>
          </div>
          <div class="item-label">{{ state.moniterClass.name }}</div>
        </div>
      </div>
      <div class="content-item row">
        <div class="w_h158" @click="videoMoniterClick('videoSurveillance-geographicInfo')">
          <!-- <q-icon class="w_h158" name="img:icons/cdsgl/geographicInfo/视频监控-摄像头.svg"></q-icon> -->
          <q-img src="icons/切图-地理信息全要素一张图_slices/组 41430.png" spinner-color="white" class="w_h158"></q-img>
        </div>
        <div class="column ml20">
          <div class="item-number">
            <div class="number-box">{{ state.videoTotal.number }}</div>
            <div class="number-unit">{{ state.videoTotal.unit }}</div>
          </div>
          <div class="item-label">{{ state.videoTotal.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="VideoMoniter">
import { reactive, onMounted, defineAsyncComponent } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);
const titleSmall = defineAsyncComponent(
  () => import("pages/geographicInfo/models/TitleSmall.vue")
);
const state = reactive({
  moniterClass: {
    icon: "",
    name: "监控分类",
    number: 15,
    unit: '项'
  },
  videoTotal: {
    icon: "",
    name: "视频总数",
    number: 24804,
    unit: '个'
  },
});
const storeLegendInfo = legendInfo();

const videoMoniterClick = (type: any) => {
  storeLegendInfo.setSelectLegendType(type);
};
</script>
<style scoped>
.card-title {
  background: url('src/assets/component/切图-地理信息全要素一张图_slices/标题栏.png') no-repeat center/cover;
  width: 1028px;
  height: 63px;
  position: absolute;
  top: 65px;
  left: 30px;
}

.card-text {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 700;
  font-size: 54px;
  color: #F2FEFF;
  line-height: 23px;
  font-style: normal;
  text-transform: none;
  padding-left: 80px;
}

.video-moniter {
  position: relative;
  width: 100%;
  height: 100%;
}

.title-small-video-moniter {
  position: absolute;
  top: 0;
  left: 0;
}

.content-container {
  width: 100%;
  height: 100%;
  padding: 200px 98px 96px 98px;
  display: flex;
}

.content-item {
  flex: 1
}

.item-label {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 600;
  font-size: 36px;
  color: #40BCFF;
  line-height: 36px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.item-number {
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 63px;
  color: #66ffff;
  line-height: 94px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  width: 70px;
  height: 94px;
  display: flex;
  /* background-image: url("/icons/cdsgl/geographicInfo/数字背景.svg"); */
}

.number-box {
  font-family: Bahnschrift, Bahnschrift;
  font-weight: 400;
  font-size: 63px;
  color: #FFFFFF;
  line-height: 77px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.number-unit {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 28px;
  color: #FFFFFF;
  line-height: 88px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-left: 10px;
}

.w_h158 {
  width: 259.2px;
  height: 169.5px;
}

.ml20 {
  margin-left: 20px;
}
</style>
