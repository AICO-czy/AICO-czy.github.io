<!--视频监控管理平台-->
<template>
  <div class="cdsgl-indexPage">
    <!--地图视图-->
    <div class="map-wrapper">
      <MapViewer v-if="state.isLoadData" @isLoading="viewerLoadingEnd" />
    </div>
    <!--左右内容-->
    <PageMain ref="pageMainRef" v-if="state.sceneLoginEnd"></PageMain>
    <!--底部-->
    <FootPage ref="footPageRef"></FootPage>
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
import { otherInfo } from "stores/otherInfo";
import { get } from "src/utils/httpRequest";
import { useRouter } from "vue-router";
//左/右/上/下侧内容组件
const PageMain = defineAsyncComponent(() => import("./main/PageMain.vue"));
//底部组件
const FootPage = defineAsyncComponent(() => import("./foot/FootPage.vue"));

const state = reactive({
  title: "视频监控管理平台",
  isLoadData: false, //是否成功加载配置数据
  sceneLoginEnd: false, //场景是否加载完成
});

//路由
const router = useRouter();
const storesOtherInfo = otherInfo();

/** 获取数据服务配置*/
const getDataConfig = async () => {
  await get("data/json/cdsgl/videoSurveillance/dataConfig.json", {})
    .then((resulet: any) => {
      storesOtherInfo.setDataConfig(resulet.data);
      state.isLoadData = true;
    })
    .catch((err) => {
      console.log("获取数据配置服务出错！");
    });
};


/**场景初始化成功 */
const viewerLoadingEnd = () => {
  // console.log("场景加载完成");
  state.sceneLoginEnd = true;
};

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
}

.map-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: auto;
  z-index: -1;
}

.loading-view {
  background: #0009 !important;
}

.loading-icon {
  font-size: 90px;
  color: #2ac2e8;
}

.loading-label {
  padding-top: 20px;
  font-size: 45px;
  letter-spacing: 3px;
  color: #2ac2e8;
}
</style>
