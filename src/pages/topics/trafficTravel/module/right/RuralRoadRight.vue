<template>
  <div class="rightValue">
    <div class="top-title-container">
      <span class="top-title">美丽燕塞路</span>
      <!-- <div class="top-delete"></div> -->
      <q-btn
        class="close-btn"
        round
        icon="img:icons/close.png"
        @click="handleClose()"
      ></q-btn>
    </div>
    <div class="top-content-container">
      <div class="top-content-one">
        <div class="top-content-one-left" style="margin-right: 130px">
          <span class="top-content-one-left-title">总里程</span>
          <div class="minde"></div>
          <span class="top-content-one-left-value"
            >423<span class="text-lc-unit">公里</span></span
          >
        </div>
        <div class="top-content-one-left">
          <span class="top-content-one-left-title">公路条数</span>
          <div class="minde"></div>
          <span class="top-content-one-left-value"
            >29<span class="text-lc-unit">条</span></span
          >
        </div>
      </div>
      <div class="top-content-two" style="margin-bottom: 17px">
        <div class="top-content-two-header">
          <span class="top-content-two-header-text">县区分布</span>
        </div>
        <div class="top-content-two-body"><histogram></histogram></div>
      </div>
      <div class="top-content-two">
        <div class="top-content-two-header">
          <span class="top-content-two-header-text">历年统计</span>
        </div>
        <div class="top-content-two-body">
          <statiHistogram></statiHistogram>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { otherInfo } from "src/stores/otherInfo";
// import { storeToRefs } from "pinia";
const storeOtherInfo = otherInfo();
const histogram = defineAsyncComponent(
  () => import("./ruralRoad/histogram.vue")
);
const statiHistogram = defineAsyncComponent(
  () => import("./ruralRoad/statiHistogram.vue")
);
const emit = defineEmits(["close-page"]);
const handleClose = () => {
  emit("close-page", "ruralRoadClose");
storeOtherInfo.setSelectArea("home");
};
</script>

<style lang="scss" scoped>
.rightValue {
  width: 1560px;
  height: 1810px;
  .top-title-container {
    width: 1449px;
    height: 102px;
    background-image: url("assets/component/一级标题.png");
    background-size: 100% 100%;
    margin-left: 60px;
    position: relative;

    .top-title {
      margin-left: 112px;
      font-family: AlibabaPuHuiTiExtraBold;
      font-size: 60px;
      text-align: left;
      color: #e1e8ed;
      background: linear-gradient(180deg, #8bddda 0%, #dce7f9 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .close-btn {
      width: 65px;
      height: 65px;
      float: right;
      font-size: 48px;
    }
    .top-delete {
      width: 64px;
      height: 64px;
      background-image: url("assets/component/delete.png");
      background-size: 100% 100%;
      position: absolute;
      right: 50px;
      top: 70%;
      transform: translateY(-50%);
    }
  }
}

.top-content-container {
  width: 1456px;
  box-sizing: border-box;
  background-image: url("assets/component/外边框.png");
  background-size: 100% 100%;
  margin-top: 42px;
  padding: 50px 37px 45px 57px;
  .top-content-one {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .top-content-one-left {
      width: 501px;
      height: 200px;
      background-image: url("assets/component/美丽燕塞路.png");
      display: flex;
      align-items: center;
      justify-content: center;
      .top-content-one-left-title {
        font-size: 40px;
        color: #fff;
        font-family: SourceHanSansNormal;
        margin-right: 20px;
      }
      .minde {
        width: 6px;
        height: 50px;
        background: linear-gradient(
          to bottom,
          rgba(12, 154, 127, 0.1) 0%,
          rgba(12, 154, 127, 0.6) 50%,
          rgba(12, 154, 127, 0.1) 100%
        );
        border-radius: 1.5px;
      }
      .top-content-one-left-value {
        font-family: YouSheBiaoTiHei;
        font-size: 56px;
        margin-left: 10px;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(to bottom, #ffffff, #70ffe2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        .text-lc-unit {
          font-size: 30px;
          color: #93a0a8 !important;
          font-family: SourceHanSansNormal;
        }
      }
    }
  }
  .top-content-two {
    width: 1362px;
    height: 475px;
    background-image: url("assets/component/内边框.png");
    background-size: 100% 100%;
    margin-top: 47px;
    position: relative;
    margin-top: 65px !important;
    display: flex;
    align-items: flex-end;
    .top-content-two-header {
      width: 1065px;
      height: 82px;
      background-image: url("assets/component/二级标题.png");
      background-size: 100% 100%;
      position: absolute;
      top: -26px;
      left: 29px;
    }
    .top-content-two-header-text {
      font-family: SourceHanSansMedium;
      font-weight: 500;
      font-size: 48px;
      /* color: #c5d8f6; */
      text-align: left;
      text-transform: none;
      background: linear-gradient(180deg, #8bddda 0%, #dce7f9 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-left: 10px;
    }
    .top-content-two-body {
      width: 100%;
      height: 475px;
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>
