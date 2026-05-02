<!--主页-左边-->
<template>
  <div class="home-page-left">
    <div class="home-page-left-content column">
      <div class="left-page-title">
        <TitleLarge ref="titleLargeRef" title="监控视频概览"></TitleLarge>
      </div>
      <div class="col home-page-page-body">
        <div class="row full-height">
          <div class="col full-height">
            <TypeTotal ref="TypeTotalRef"></TypeTotal>
          </div>
          <div class="col full-height">
            <SurveillanceList ref="SurveillanceListRef"></SurveillanceList>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--撒点图例-->
  <ServerLegendsNews ref="serverLegendsNewsRef"></ServerLegendsNews>
</template>
<script setup lang="ts" name="homePageLeft">
import { defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import ServerLegendsNews from './other/ServerLegendsNews.vue'
const router = useRouter();
//监控分类统计
const TypeTotal = defineAsyncComponent(() => import("./left/TypeTotal.vue"));
//监控列表
const SurveillanceList = defineAsyncComponent(
  () => import("./left/SurveillanceList.vue")
);
//大标题
const TitleLarge = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/TitleLarge.vue")
);

//撒点图例
// const PointLegends = defineAsyncComponent(
//   () => import("pages/videoSurveillance/content/homePage/other/PointLegends.vue")
// );

// const ServerLegendsNews = defineAsyncComponent(
//   () => import("pages/videoSurveillance/content/homePage/other/ServerLegendsNews.vue")
// );
</script>
<style scoped lang="scss">
.home-page-left {
  width: 100%;
  height: 100%;
  padding: 175px 290px 98px 190px;
}

.home-page-left-content {
  width: 100%;
  height: 100%;
}

.name-title {
  position: absolute;
  left: 94px;
  top: -20px;
  width: 104px;
  height: 104px;
  background: linear-gradient(rgba(36, 77, 131, 0) 0%, #244d83 100%);
  border-radius: 50%;

  .name-title-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 500;
    font-size: 48px;
    color: #d0e9ff;
    line-height: 48px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.left-page-title {
  width: 100%;
  padding-bottom: 30px;
}

.home-page-page-body {
  width: 100%;
}
</style>
