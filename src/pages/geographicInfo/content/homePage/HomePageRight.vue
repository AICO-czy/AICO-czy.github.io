<!--主页-右边-->
<template>
  <div class="home-page-right column">
    <div class="col-auto home-page-right-top">
      <div class=" home-page-right-top-left">
        <highwayNetwork ref="highwayNetworkRef"></highwayNetwork>
      </div>
      <div class=" home-page-right-top-right">
        <water-transport ref="waterTransportRef"></water-transport>
      </div>
    </div>
    <div class="col home-page-right-bottom">
      <div class="home-page-right-bottom-left">
        <roadAsset ref="roadAssetRef"></roadAsset>
      </div>
      <div class="home-page-right-bottom-right column">
        <div class="col-auto home-page-right-bottom-right-top">
          <trafficStation ref="trafficStationRef"></trafficStation>
        </div>
        <div class="col home-page-right-bottom-right-bottom">
          <div class="col home-page-right-bottom-right-bottom-bg">
            <videoMoniter ref="videoMoniterRef"></videoMoniter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="homePageRight">
import { defineAsyncComponent } from 'vue'
const roadAsset = defineAsyncComponent(
  () => import("./right/RoadAsset.vue")
);
const trafficStation = defineAsyncComponent(
  () => import("./right/TrafficStation.vue")
);
const videoMoniter = defineAsyncComponent(
  () => import("./right/VideoMoniter.vue")
);
const WaterTransport = defineAsyncComponent(
  () => import("./right/WaterTransport.vue")
);
const HighwayNetwork = defineAsyncComponent(
  () => import("./right/HighwayNetwork.vue")
);

</script>
<style scoped>
.home-page-right {
  width: 100%;
  height: 100%;
  padding: 85px 60px 82px;
}

.home-page-right-top {
  height: 500px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.home-page-right-top-left {
  width: 2046px;
  height: 100%;
  background-image: url("assets/component/切图-地理信息全要素一张图_slices/box-new.png");
  background-size: 100% 100%;
}

.home-page-right-top-right {
  width: 858px;
  height: 100%;
  background-image: url("assets/component/切图-地理信息全要素一张图_slices/box-new(1).png");
  background-size: 100% 100%;
}

.home-page-right-bottom {
  padding-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.home-page-right-bottom-left {
  width: 1604px;
  height: 100%;
  background-image: url("assets/component/切图-地理信息全要素一张图_slices/Rectangle 289.png");
  background-size: 100% 100%;
}

.home-page-right-bottom-right {
  width: 1300px;
  height: 100%;
}

.home-page-right-bottom-right-top {
  width: 1300px;
  height: 800px;
  background-image: url("assets/component/切图-地理信息全要素一张图_slices/box-new(2).png");
  background-size: 100% 100%;
}

.home-page-right-bottom-right-bottom {
  padding-top: 40px;
  width: 1300px;
  height: 100%;
}

.home-page-right-bottom-right-bottom-bg {
  width: 100%;
  height: 100%;
  background-image: url("assets/component/切图-地理信息全要素一张图_slices/Rectangle 289.png");
  background-size: 100% 100%;
}
</style>
