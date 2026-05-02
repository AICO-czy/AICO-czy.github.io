<!--视频监控管理平台-->
<template>
  <div class="traffic-law-enf-indexPage">
    <!-- 地图视图-->
    <div class="map-wrapper">
      <MapViewer />
    </div>
    <div class="content-back" @click="goBack"></div>
    <div class="content-weather">
      <WeatherMain />
    </div>
    <!--左右内容-->
    <PageMain ref="pageMainRef"></PageMain>
  </div>
</template>

<script setup lang="ts" name="indexPage">
import {
  defineAsyncComponent,
  reactive,
  nextTick,
  onBeforeMount,
  onMounted,
} from "vue";
import MapViewer from "components/MapViewer.vue";
import WeatherMain from "components/weather/WeatherMain.vue";
import { useRouter } from "vue-router";

const router = useRouter()
//左/右/上/下侧内容组件
const PageMain = defineAsyncComponent(() => import("./main/PageMain.vue"));

const goBack = () => {
  router.push({ name: "Navigation" });
}
</script>
<style scoped lang="scss">
.traffic-law-enf-indexPage {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-image: url("assets/image/sector/borderLine.png");
  background-size: 100% 100%;
  overflow: hidden;
}

.map-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: auto;
  z-index: -1;
}

.content-back {
  position: absolute;
  width: 62px;
  height: 62px;
  right: 90px;
  top: 50px;
  background-image: url("assets/component/其他天气汇总_slices/back.png");
  background-size: 100% 100%;
  cursor: pointer;
  pointer-events: auto;
  z-index: 9990;
}
</style>
