<!--综合交通地理信息全要素“一张图”-->
<template>
  <div class="cdsgl-indexPage">
    <div class="content-back" @click="goBack"></div>
    <!--地图视图-->
    <div class="row map-content">
      <div class="col-auto map-left">
        <MapViewer v-if="state.isLoadData" @isLoading="viewerLoadingEnd" />
      </div>
      <div class="col-auto">
        <div class="map-right"></div>
      </div>
    </div>
    <!-- <div class="map-wrapper">c
    </div> -->
    <!--头部-->
    <HeaderPage ref="headerPageRef" :title="state.title"></HeaderPage>
    <!--左右内容-->
    <PageMain ref="pageMainRef"></PageMain>
    <!--底部-->
    <FootPage ref="footPageRef"></FootPage>
  </div>
</template>

<script setup lang="ts" name="indexPage">
import { defineAsyncComponent, reactive, nextTick, onBeforeMount } from "vue";
import { otherInfo } from "stores/otherInfo";
import { get } from "src/utils/httpRequest";
import { useRouter } from "vue-router";
import MapViewer from "components/MapViewer.vue";
//地图组件
// const MapViewer = defineAsyncComponent(() => import("./models/MapViewer.vue"));
//头部组件
const HeaderPage = defineAsyncComponent(
  () => import("./header/HeaderPage.vue")
);
//左/右/上/下侧内容组件
const PageMain = defineAsyncComponent(() => import("./main/PageMain.vue"));
//底部组件
const FootPage = defineAsyncComponent(() => import("./foot/FootPage.vue"));

const state = reactive({
  title: "地理信息全要素一张图",
  isLoadData: false, //是否成功加载配置数据
  sceneLoginEnd: false, //场景是否加载完成
});

//路由
const router = useRouter();
const storesOtherInfo = otherInfo();

/** 获取数据服务配置*/
const getDataConfig = async () => {
  await get("data/json/cdsgl/geographicInfo/dataConfig.json", {})
    .then((resulet: any) => {
      storesOtherInfo.setDataConfig(resulet.data);
      state.isLoadData = true;
    })
    .catch((err) => {
      console.log("获取数据配置服务出错！");
    });
};


const goBack = () => {
  router.push({ name: "Navigation" });
}


/**场景初始化成功 */
const viewerLoadingEnd = () => {
  console.log("场景加载完成");
  state.sceneLoginEnd = true;
};
//判断路由是否有值传进来，根据传值并打开相应的页面
/* nextTick(() => {
  let timeOut = setTimeout(() => {
    if (!router.currentRoute.value.query.model) {
      router.push("IndexPage");
    } else {
      var model = router.currentRoute.value.query.model;
    }
    clearTimeout(timeOut);
  }, 2000);
}); */

onBeforeMount(() => {
  getDataConfig();
});
</script>
<style scoped lang="scss">
.cdsgl-indexPage {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  pointer-events: fill;
}

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

.map-content {
  width: 100%;
  height: 100%;
  position: absolute;
}

.map-left {
  width: 3652px;
  height: 100%;
  position: relative;
}

.map-right {
  width: 3004px;
  height: 100%;
  background: #103B64;
  // background: linear-gradient(90deg, rgba(19, 62, 84, 0) 3%, rgba(9, 19, 45, 0.3) 100%);
}
</style>
