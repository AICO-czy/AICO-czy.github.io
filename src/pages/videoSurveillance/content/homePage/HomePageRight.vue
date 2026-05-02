<!--主页-右边-->
<template>
  <div class="home-page-right">
    <div class="column home-page-right-content" v-if="!state.isShowSplitScreen">
      <div class="content-back" @click="goBack"></div>
      <div class="content-weather">
        <div class="mr-[45px] w-[88px] h-[72px] mt-[10px]">
          <img class="w-full h-full" :src="png1" alt="">
        </div>
        <div class="content-weather-icon"></div>
        <div style="margin-left: 22px;">18~28°C</div>
        <div style="margin-left: 42px;">晴转多云</div>
        <div style="margin-left: 82px;">2025.07.01</div>
        <div style="margin-left: 45px;">星期一</div>
        <div style="margin-left: 31px;">09:00:06</div>
      </div>
      <div class="col-auto full-width">
        <div class="right-page-title">
          <TitleLarge ref="titleLargeRef" title="重点区域监控"></TitleLarge>
          <div class="splice-bg" @click="splitScreen">
            <q-icon name="img:icons/cdsgl/button/分屏.svg" class="btn-icon"></q-icon>
            <div>分屏</div>
          </div>
        </div>
      </div>
      <div class="col fit video-list-bg">
        <SurveillanceContainer ref="SurveillanceContainerRef"></SurveillanceContainer>
      </div>
    </div>
  </div>
  <SplitScreen ref="splitScreenRef" @close="closeDialog" v-if="state.isShowSplitScreen"></SplitScreen>
</template>
<script setup lang="ts" name="homePageRight">
import { defineAsyncComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { get } from "src/utils/httpRequest";
import { useTableAccountStore } from 'src/pages/sector/store/tableAccount'
const tableAccountStore = useTableAccountStore()

const router = useRouter()

const png1 = ref("")
png1.value = new URL('../../../../assets/image/TransportationAndTravel/气象灾害预警信号图标_slices/Property 1=沙尘暴, Property 2=1级红色.png', import.meta.url).href;

//大标题
const TitleLarge = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/TitleLarge.vue")
);
//监控列表
const SurveillanceContainer = defineAsyncComponent(
  () => import("./right/SurveillanceContainer.vue")
);

const state = reactive({
  isShowSplitScreen: false,
  headerDialog: true,
  userName: "admin",
  weaterInfo: { weather: "", temperature: "" },
  timeInterval: null as any,
});

const goBack = () => {
  // tableAccountStore.openDialog()
  router.push({ name: "Navigation" });
}

function formatUrl() {
  let danger = 'Property 1=' + '暴雪'
  let end = '红色'
  let lv = ', Property 2=1级' + end
  return danger + lv
}

onMounted(() => { });

const SplitScreen = defineAsyncComponent(
  () => import("./right/SplitScreen.vue")
);

/**分屏 */
const splitScreen = () => {
  state.isShowSplitScreen = true;
};
/**关闭分屏 */
const closeDialog = () => {
  state.isShowSplitScreen = false;
};
</script>
<style scoped lang="scss">
.home-page-right {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 240px 130px 50px 28px;

  .weather-bg {
    position: absolute;
    top: 20px;
    right: 62px;
    width: 220px;
    height: 64px;
    background: linear-gradient(rgba(36, 77, 131, 0) 0%, #244d83 100%);
    border-radius: 0px 0px 0px 0px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
    font-weight: normal;
    font-size: 44px;
    color: #bae0ff;
    line-height: 44px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.weather-bg {
  :first-child {
    margin-left: 22px;
  }

  :nth-child(2) {
    margin-left: 36px;
  }
}

.home-page-right-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.right-page-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-left: 42px;
  padding-bottom: 20px;

  .splice-bg {
    width: 228px;
    height: 80px;
    margin-right: 40px;
    background: linear-gradient(55deg,
        #3e80bc 0%,
        #3e80bc 27%,
        rgba(62, 128, 188, 0) 100%,
        #3e80bc 100%),
      linear-gradient(69deg, #3e80bc 0%, #091a2e 100%), rgba(0, 0, 0, 0.3);
    border-radius: 12px 12px 12px 12px;
    border: 2px solid rgba(61, 115, 255, 0.3);
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .btn-icon {
      font-size: 40px;
      margin-left: 41px;
      margin-right: 20px;
    }

    div {
      height: 80px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: bold;
      font-size: 40px;
      color: #ffffff;
      line-height: 80px;
      letter-spacing: 6px;
      text-shadow: 17px 17px 88px rgba(0, 168, 255, 0.68),
        6px 6px 0px rgba(5, 64, 119, 0.43);
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
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

.content-weather {
  position: absolute;
  top: 100px;
  right: 155px;
  display: flex;
  align-items: center;
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: 550;
  font-size: 55px;
  color: #C0D1DE;
  line-height: 81px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  pointer-events: all;
  z-index: 9990;

  .content-weather-icon {
    width: 81.59px;
    height: 82px;
    background-image: url("assets/component/其他天气汇总_slices/切图 82.png");
    background-size: 100% 100%;
  }
}

.video-list-bg {
  background-image: url("assets/image/cdsgl/videoSurveillance/box-new (2).png");
  background-size: 100% 100%;
}
</style>
