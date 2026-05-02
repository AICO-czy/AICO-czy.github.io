<template>
  <div class="home-left-page">
    <div class="column full-width full-height">
      <div class="col">
        <div class="column full-width full-height">
          <div class="col-auto">
            <div class="image-container">
              <div class="image-list">
                <img class="image-div" :src="photo1" alt="" />
                <img class="image-div" :src="photo2" alt="" />
                <img class="image-div" :src="photo3" alt="" />
                <img class="image-div" :src="photo1" alt="" />
              </div>
            </div>
            <div class="text-container">
              <div class="text-div">
                <span class="text-state">畅通</span>
              </div>
              <div class="text-div text-lc">
                <span class="text-lc-title">全长里程</span>
                <span class="text-lc-value">
                  180<span class="text-lc-unit">km</span>
                </span>
              </div>
              <div class="text-div text-jtl">
                <span class="text-jtl-title">今日交通量</span>
                <span class="text-jtl-value">
                  <CountTo :startVal="0" :endVal="18000" :duration="3000" :autoplay="true" :decimals="0" /><span
                    class="text-jtl-unit">辆</span>
                </span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="title" :class="{
              'title-active': state.selectModel == 'oneRoad',
            }" @click="handleClick('oneRoad')">
              <span class="title-text">国家一号风景大道</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="column full-width full-height">
          <div class="col-auto">
            <div class="image-container">
              <div class="image-list">
                <img class="image-div" :src="photo2" alt="" />
                <img class="image-div" :src="photo3" alt="" />
                <img class="image-div" :src="photo1" alt="" />
                <img class="image-div" :src="photo2" alt="" />
              </div>
            </div>
            <div class="text-container">
              <div class="text-div">
                <span class="text-state">畅通</span>
              </div>
              <div class="text-div text-lc">
                <span class="text-lc-title">全长里程</span>
                <span class="text-lc-value">
                  322.41<span class="text-lc-unit">km</span>
                </span>
              </div>
              <div class="text-div text-jtl">
                <span class="text-jtl-title">今日交通量</span>
                <span class="text-jtl-value">
                  <CountTo :startVal="0" :endVal="21000" :duration="2000" :autoplay="true" :decimals="0" /><span
                    class="text-jtl-unit">辆</span>
                </span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="title1" :class="{ 'title1-active': state.selectModel == 'redRoad' }"
              @click="handleClick('redRoad')">
              <span class="title-text">绿色塞罕坝·红色旅游路</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="column full-width full-height">
          <div class="col-auto">
            <div class="image-container">
              <div class="image-list">
                <img class="image-div" :src="photo3" alt="" />
                <img class="image-div" :src="photo1" alt="" />
                <img class="image-div" :src="photo2" alt="" />
                <img class="image-div" :src="photo3" alt="" />
              </div>
            </div>
            <div class="text-container">
              <div class="text-div">
                <span class="text-state">畅通</span>
              </div>
              <div class="text-div text-lc">
                <span class="text-lc-title">全长里程</span>
                <span class="text-lc-value">
                  435<span class="text-lc-unit">km</span>
                </span>
              </div>
              <div class="text-div text-ts">
                <span class="text-ts-title">条数</span>
                <span class="text-ts-value">
                  29<span class="text-ts-unit">条</span>
                </span>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="title" :class="{ 'title-active': state.selectModel == 'ruralRoad' }"
              @click="handleClick('ruralRoad')">
              <span class="title-text">美丽燕塞路</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { reactive, watch } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import { storeToRefs } from "pinia";
import { CountTo } from "vue3-count-to";
import photo1 from "src/assets/image/国家一号风景大道.png";
import photo2 from "src/assets/image/绿色塞罕坝.png";
import photo3 from "src/assets/image/美丽燕塞路.png";
const state = reactive({
  selectModel: "",
});
const storeOtherInfo = otherInfo();
const { selectArea } = storeToRefs(storeOtherInfo);

storeOtherInfo.setSelectArea("home");

const handleClick = (val: any) => {
  if (state.selectModel !== "" && state.selectModel == val) {
    state.selectModel = "home";
    storeOtherInfo.setSelectArea("home");
  } else {
    state.selectModel = val;
    storeOtherInfo.setSelectArea(val);
  }
};
watch(
  () => selectArea.value,
  () => {
    state.selectModel = selectArea.value;
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss">
.home-left-page {
  width: 1050px;
  height: 1776px;
  // background: rgba(0, 0, 0, 0.5);
}

.image-container {
  width: 360px;
  height: 360px;
  border: 1px solid #fff;
  float: left;
  margin-left: 68px;
  margin-top: 20px;
  background-image: url("assets/image/imagebox.png");
  background-size: 100% 100%;
  padding: 8px;
  overflow: hidden;
  position: relative;

  .image-list {
    width: 1440px;
    height: 360px;
    animation: 8s carousel-animation infinite;
    /* 应用动画，持续10秒，无限循环 */

    img {
      width: 360px;
      height: 360px;
      float: left;
    }
  }

  // .image-div {
  //   width: 100%;
  //   height: auto;
  //   position: absolute;
  // }
}

.text-container {
  width: 600px;
  height: 386px;
  // border: 1px solid #fff;
  float: left;
  margin-left: 22px;

  .text-div {
    height: 126px;
    border-bottom: 1px solid #069291;
    padding: 30px 0px 0px 50px;
  }

  .text-state {
    font-size: 60px;
    color: #b1d31c;
    font-family: SourceHanSansNormal;
  }

  .text-lc {
    .text-lc-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-lc-value {
      font-size: 60px;
      color: #fcdd9c;
      font-family: YouSheBiaoTiHei;
      margin-left: 80px;
    }

    .text-lc-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }

  .text-jtl {
    .text-jtl-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-jtl-value {
      font-size: 60px;
      color: #1cc7d3;
      font-family: YouSheBiaoTiHei;
      margin-left: 60px;
    }

    .text-jtl-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }

  .text-ts {
    .text-ts-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-ts-value {
      font-size: 60px;
      color: #1cc7d3;
      font-family: YouSheBiaoTiHei;
      margin-left: 180px;
    }

    .text-ts-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }
}

.title {
  width: 536px;
  height: 108px;
  background: linear-gradient(90deg,
      rgba(7, 124, 117, 0) 0%,
      #077c75 48%,
      rgba(7, 124, 117, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  padding: 20px 30px;
  text-align: center;

  .title-text {
    font-weight: 400;
    font-size: 52px;
    color: #ffffff;
    line-height: 68px;
    letter-spacing: 10px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    font-family: YouSheBiaoTiHei;
  }
}

.title-active {
  .title-text {
    color: #00ebff;
  }
}

.title1 {
  width: 716px;
  height: 108px;
  background: linear-gradient(90deg,
      rgba(7, 124, 117, 0) 0%,
      #077c75 48%,
      rgba(7, 124, 117, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  padding: 20px 30px;
  text-align: center;

  .title-text {
    font-weight: 400;
    font-size: 52px;
    color: #ffffff;
    line-height: 68px;
    letter-spacing: 10px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    font-family: YouSheBiaoTiHei;
  }
}

.title1-active {
  .title-text {
    color: #00ebff;
  }
}
</style>
