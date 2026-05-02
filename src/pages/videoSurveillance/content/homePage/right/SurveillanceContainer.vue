<!--视频播放区域-->
<template>
  <div class="surveillance-container">
    <div class="surveillance-list-body">
      <div class="surveillance-item" v-for="(surveillance, index) in state.surveillanceData" :key="index">
        <div class="surveillance-item-content column">
          <div class="type-title col-auto">
            <TitleSmall :title="surveillance.type"></TitleSmall>
          </div>
          <div class="surveillance-item-media col">
            <div class="surveillance-item-media-content">
              <q-img class="fit surveillance-item-media-content-img" :src="surveillance.surveillanceList[0].img"
                fit="cover"></q-img>
            </div>
          </div>
          <div class="surveillance-label col-auto">{{ surveillance.surveillanceList[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="surveillanceContainer">
import { defineAsyncComponent, reactive } from "vue";
//小标题
const TitleSmall = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/TitleSmall.vue")
);

const state = reactive({
  surveillanceData: [
    {
      type: "高速公路",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频1.png",
        },
      ] as any,
    },
    {
      type: "国省干线重点路段",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频2.png",
        },
      ] as any,
    },
    {
      type: "城市重要路段",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频3.png",
        },
      ] as any,
    },
    {
      type: "重点景区",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频4.png",
        },
      ] as any,
    },
    {
      type: "客运场站",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频5.png",
        },
      ] as any,
    },
    {
      type: "水路运输",
      surveillanceList: [
        {
          name: "XXX路段监控",
          img: "images/cdsgl/videoSurveillance/监控视频6.png",
        },
      ] as any,
    },
  ] as any,
});
</script>
<style scoped lang="scss">
.surveillance-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px 30px 30px;
  overflow: hidden;
}

.control-btn {
  position: absolute;
  width: 100%;
}

.btn-content {
  width: auto;
  height: 72px;
  margin-right: 48px;
  background: linear-gradient(90deg, #072658 0%, #0459af 58%, #073067 100%);
  box-shadow: 0px 0px 37px 0px rgba(65, 208, 255, 0.06);
  border-radius: 2px 2px 2px 2px;
  border: 1px solid;
  border-image: linear-gradient(71deg,
      rgba(0, 48, 148, 1),
      rgba(16, 115, 222, 1),
      rgba(14, 66, 123, 1)) 1 1;
}

.btn-icon {
  font-size: 40px;
  padding-left: 42px;
}

.btn-label {
  padding: 0 40px 0 20px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 500;
  font-size: 40px;
  color: #ffffff;
  line-height: 47px;
  letter-spacing: 3px;
  text-shadow: 4px 4px 22px rgba(0, 168, 255, 0.68),
    2px 2px 0px rgba(0, 78, 255, 0.43);
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.surveillance-list-body {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px 30px;

}

.surveillance-list-content {
  width: 100%;
  height: 100%;
  background: rebeccapurple;
}

.surveillance-item-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.type-title {
  width: 100%;
  padding-left: 20px;
  padding-bottom: 5px;
}

.surveillance-item-media {
  background-image: url("assets/image/cdsgl/videoSurveillance/组 43092.png");
  background-size: 100% 100%;
}

.surveillance-item-media-content {
  width: 100%;
  height: 100%;
  padding: 25px 12px 15px 18px;
}

.surveillance-item-media-content-img {
  border-radius: 20px;
}

.surveillance-label {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 34px;
  color: #D6E7F7;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background-image: url("assets/image/cdsgl/videoSurveillance/组 43091.png");
  background-size: 100% 100%;
  border-radius: 0px 0px 10px 10px;
}
</style>
