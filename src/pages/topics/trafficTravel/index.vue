<template>
  <div class="travel-index">
    <div class="content-back" @click="goBack"></div>
    <div class="notification" @click="handleClick">
      <div class="icon"></div>
      <div class="scrolling-text">
        <div class="scrolling-container">
          <span class="text-content">目前XX路段交通己临时阻断，无法正常通行。为避免交通拥堵，请各位司机朋友选择其他路线通行。感谢您的配合！</span>
          <span class="text-content">目前XX路段交通己临时阻断，无法正常通行。为避免交通拥堵，请各位司机朋友选择其他路线通行。感谢您的配合！</span>
        </div>
      </div>
    </div>
    <div class="content-container z-top">
      <HomeIndex></HomeIndex>
    </div>
    <div class="warning-wrapper z-top">
      <!-- <q-btn class="close-btn z-top" round icon="img:icons/close.png" @click="state.showWarning = false"></q-btn> -->
      <!-- <img :src="state.photo" v-if="state.showWarning" /> -->
    </div>
    <div class="legend-wrapper z-top"></div>
    <div class="tool-wrapper z-top">
      <!-- <q-btn round class="tool-btn" icon="img:icons/总览.png"></q-btn> -->
    </div>
    <div class="map-wrapper">
      <!-- <Map3D /> -->
      <!-- <ThreeMap /> -->
      <ThreeMapNew ref="mapSceneRef"></ThreeMapNew>
    </div>
  </div>
  <!-- 道路预警 -->
  <RoadWarning ref="RoadWarningRef" />
</template>

<script setup>
import {
  onMounted,
  defineAsyncComponent,
  onBeforeUnmount,
  reactive,
  ref,
  shallowRef,
  watch
} from "vue";
import { useRouter } from "vue-router";
import { Assets } from "components/ThreeMap/assets.js";
import emitter from "src/utils/emitter";
import gsap from "gsap";
import { elRectification, offelRectification } from "src/utils/autofit";

import MapViewer from "components/MapViewer.vue";
import RoadWarning from "./components/RoadWarning.vue";

const mapSceneRef = ref(null);
const assets = shallowRef(null);

const HomeIndex = defineAsyncComponent(() =>
  import("./module/home/homeIndex.vue")
);
const Map3D = defineAsyncComponent(() => import("components/Map3D.vue"));
const Three3DMap = defineAsyncComponent(() =>
  import("components/Three3DMap.vue")
);
const ThreeMap = defineAsyncComponent(() => import("components/ThreeMap.vue"));

import ThreeMapNew from "components/ThreeMap/index.vue";

const state = reactive({
  showWarning: true,
  photo: "src/assets/image/预警信息.png",
  progress: 0,
});

const RoadWarningRef = ref();
const router = useRouter();

function handleClick() {
  // console.log("弹窗");
  RoadWarningRef.value.show(true);
}

const goBack = () => {
  router.push({ name: "Navigation" });
}
watch(router, (to, from) => {
  router.go(0)
})
onMounted(() => {
  elRectification(".map-wrapper");
  // 初始化资源
  initAssets(async () => {
    // 加载地图
    emitter.$emit("loadMap", assets.value);
    // 播放场景
    mapSceneRef.value.play();
  });
});

onBeforeUnmount(() => {
  offelRectification();
});
// 初始化加载资源
function initAssets(onLoadCallback) {
  assets.value = new Assets();
  // 资源加载进度
  let params = {
    progress: 0,
  };
  assets.value.instance.on("onProgress", (path, itemsLoaded, itemsTotal) => {
    let p = Math.floor((itemsLoaded / itemsTotal) * 100);
    gsap.to(params, {
      progress: p,
      onUpdate: () => {
        state.progress = Math.floor(params.progress);
      },
    });
  });
  // 资源加载完成
  assets.value.instance.on("onLoad", () => {
    onLoadCallback && onLoadCallback();
  });
}
</script>

<style scoped lang="scss">
.travel-index {
  width: 100%;
  height: 100%;
  position: relative;
  // background-color: #092820;
  background-image: url("assets/image/borderLine.png");
  background-size: 100% 100%;

  .content-back {
    position: absolute;
    width: 62px;
    height: 62px;
    right: 91px;
    top: 59px;
    background-image: url("assets/component/其他天气汇总_slices/back.png");
    background-size: 100% 100%;
    cursor: pointer;
    pointer-events: auto;
    z-index: 7001;
  }

  .content-container {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
  }

  .map-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: auto;
    z-index: -1;
  }

  .warning-wrapper {
    width: 852px;
    height: 501px;
    top: 207px;
    right: 1642px;
    position: absolute;
    pointer-events: none;
    z-index: 9999;

    // background-image: url("assets/image/预警信息.png");
    // background-size: 100% 100%;
    .close-btn {
      width: 65px;
      height: 65px;
      float: right;
      font-size: 48px;
      position: absolute;
      top: -40px;
      right: 0px;
    }
  }

  .tool-wrapper {
    width: 1560px;
    height: 150px;
    right: 50px;
    bottom: 70px;
    pointer-events: none;
    position: absolute;

    .tool-btn {
      width: 119px;
      height: 120px;
      font-size: 60px;
      z-index: 7000;
    }
  }
}

.notification {
  width: 1300px;
  height: 84px;
  background: linear-gradient(90deg,
      rgba(150, 23, 23, 0.2) 0%,
      rgba(150, 23, 23, 0.5) 24%,
      rgba(135, 23, 23, 0.8) 51%,
      rgba(135, 23, 23, 0.5) 72%,
      rgba(150, 23, 23, 0.2) 100%);
  border-radius: 0px 0px 0px 0px;
  border: 1px solid transparent;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 220px;
  display: flex;
  align-items: center;
  overflow: hidden;
  pointer-events: all;

  .icon {
    width: 40px;
    height: 40px;
    margin-right: 25px;
    background: url("assets/image/warning.png") no-repeat 100%/100%;
    flex-shrink: 0;
  }

  .scrolling-text {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    position: relative;

    .scrolling-container {
      display: inline-flex;
      animation: smooth-scroll 20s linear infinite;
      will-change: transform;
    }

    .text-content {
      display: inline-block;
      padding-right: 150px;
      border-image: linear-gradient(90deg,
          rgba(249.00000035762787, 163.00000548362732, 172.00000494718552, 0),
          rgba(248.92856419086456, 163.0151742696762, 171.60651326179504, 1),
          rgba(249.00000035762787, 163.00000548362732, 172.00000494718552, 0)) 1 1;
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 36px;
      line-height: 52px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(to bottom, #ffffff 0%, #fddad9 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      flex-shrink: 0;
    }
  }
}

@keyframes smooth-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
