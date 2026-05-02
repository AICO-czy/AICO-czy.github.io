<template>
  <div class="data-center-index">
    <div class="travel-index">
      <div class="content-title">数据共享交换中心</div>
      <div class="content-back" @click="goBack"></div>
      <div class="content-container">
        <HomeIndex ref="homeIndexRef"></HomeIndex>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, reactive, ref, watch, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const HomeIndex = defineAsyncComponent(
  () => import("./module/home/homeIndex.vue")
);

const homeIndexRef = ref<InstanceType<typeof HomeIndex> | null>(null)

const goBack = () => {
  router.push({ name: "Navigation" });
}

</script>

<style scoped lang="scss">
.data-center-index {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("assets/image/dataCenter/bglittleimg.png");
  background-size: 100% 100%;
  background-position: center;
}

.travel-index {
  width: 100%;
  height: 100%;
  position: relative;
  // background-color: #092820;
  background-image: url("assets/image/digitalIntelligence/borderLine.png");
  background-size: 102.5% 109.5%;
  background-position: center;

  .buttom_box {
    position: fixed;
    width: 1000px;
    height: 140px;
    // background: pink;
    bottom: 0;
    left: 50%;
    transform: translatex(-50%);
    pointer-events: all;
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
    z-index: 1000;
  }

  .content-title {
    position: absolute;
    width: 1600px;
    height: 180px;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    font-family: SourceHanSansBold;
    // font-weight: 700;
    font-size: 100px;
    line-height: 200px;
    letter-spacing: 21px;
    font-style: italic;
    background: linear-gradient(180deg,
        #ffffff 0.68359375%,
        #ffffff 50%,
        #6dc6ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    // margin-top: 80px;
  }

  .content-weather {
    position: absolute;
    top: 144px;
    right: 203px;
    display: flex;
    align-items: center;
    font-family: PangMenZhengDao, PangMenZhengDao;
    font-weight: 550;
    font-size: 58px;
    color: #C0D1DE;
    line-height: 81px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    pointer-events: all;

    .content-weather-icon {
      width: 81.59px;
      height: 82px;
      background-image: url("assets/component/其他天气汇总_slices/切图 82.png");
      background-size: 100% 100%;
    }
  }

  .right-bottom-icon {
    position: absolute;
    width: 31.82px;
    height: 31.82px;
    background-image: url("assets/component/home_right_img/切图 34.png");
    background-size: 100% 100%;
    right: 80px;
    bottom: 58px;
    transform: rotate(180deg);
  }

  .content-container {
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: all;
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

  .legend-wrapper {}

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

  .robot-chat-icon {
    width: 80px;
    height: 80px;
    background: url("assets/image/lefty/bot.png") no-repeat 100%/100%;
    position: fixed;
    /* 脱离局部层叠上下文 */
    left: 80px;
    bottom: 50px;
    z-index: 2147483647;
    /* 置顶，超过大多数地图覆盖层 */
    pointer-events: auto;
    cursor: pointer;
  }
}

.notification {
  width: 2680px;
  height: 112px;
  background: linear-gradient(90deg, rgba(150, 23, 23, 0.2) 0%, rgba(150, 23, 23, 0.5) 24%, rgba(135, 23, 23, 0.8) 51%, rgba(135, 23, 23, 0.5) 72%, rgba(150, 23, 23, 0.2) 100%);
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
      border-image: linear-gradient(90deg, rgba(249.00000035762787, 163.00000548362732, 172.00000494718552, 0), rgba(248.92856419086456, 163.0151742696762, 171.60651326179504, 1), rgba(249.00000035762787, 163.00000548362732, 172.00000494718552, 0)) 1 1;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 400;
      font-size: 50px;
      line-height: 58px;
      letter-spacing: 2px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      color: #FFFCB3;
      flex-shrink: 0;
    }
  }
}

.highSpeed-name {
  width: 1134px;
  height: 132px;
  position: absolute;
  background: url('assets/image/切图 409.png') no-repeat 100%/100%;
  left: 50%;
  transform: translateX(-50%);
  top: 330px;
}

.icon {
  width: 108px;
  height: 112px;
  margin-right: 25px;
  background: url('assets/image/切图 269.png') no-repeat 100%/100%;
  flex-shrink: 0;
  pointer-events: all;
}

@keyframes smooth-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

:deep(.el-badge__content.is-fixed) {
  top: 20px !important;
  right: 55px !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50% !important;
  font-size: 28px !important;
  border-color: transparent;
}
</style>
