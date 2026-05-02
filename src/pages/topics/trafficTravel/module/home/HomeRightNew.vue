<template>
  <div class="home-right-page-new">
    <LagerTitle title="交通旅游概览" />
    <q-btn class="close-btn" round icon="img:icons/close.png" @click="handleClose()"></q-btn>
    <div class="top-content-container">
      <div class="column full-width full-height">
        <div class="top-content-one">
          <div class="top-content-one-header">
            <span class="top-content-one-header-text">旅游公路网</span>
          </div>
          <div class="one-content">
            <div class="row full-height justify-around items-center">
              <div class="col-auto">
                <div class="bottom-content-container-one">
                  <div class="one-content-img">
                    <img src="icons/路网图标.png" alt="" />
                  </div>
                  <div class="one-content-container">
                    <div class="one-content-container-value">
                      25076<span class="one-content-container-unit"> km</span>
                    </div>
                    <div class="one-content-container-title">公路网里程</div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-two">
                  <div class="three-content-container-title">高速公路</div>
                  <div class="three-content-container-value">
                    758<span class="three-content-container-unit"> km</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-two">
                  <div class="three-content-container-title">干线公路</div>
                  <div class="three-content-container-value">
                    9520<span class="three-content-container-unit"> km</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-two">
                  <div class="three-content-container-title">农村公路</div>
                  <div class="three-content-container-value">
                    14798<span class="three-content-container-unit"> km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-content-two">
          <img :src="photo1" alt="" />
        </div>
        <div class="top-content-three">
          <div class="top-content-one-header">
            <span class="top-content-one-header-text">串联交通枢纽站</span>
          </div>
          <div class="three-content">
            <div class="row full-height justify-around items-center">
              <div class="col-auto">
                <div class="bottom-content-container-three">
                  <div class="three-content-container-title">客运站</div>
                  <div class="three-content-container-value">
                    10<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-three">
                  <div class="three-content-container-title">
                    高铁（火车）站
                  </div>
                  <div class="three-content-container-value">
                    45<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-three">
                  <div class="three-content-container-title">机场</div>
                  <div class="three-content-container-value">
                    3<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-content-four">
          <div class="top-content-one-header">
            <span class="top-content-one-header-text">旅游公路网</span>
          </div>
          <div class="four-content">
            <div class="row full-height justify-around items-center">
              <div class="col-auto">
                <div class="bottom-content-container-four1">
                  <div class="four-content-img">
                    <img src="icons/旅游景区.png" alt="" />
                  </div>
                  <div class="four-content-container">
                    <div class="four-content-container-value">
                      52<span class="four-content-container-unit"> 个</span>
                    </div>
                    <div class="four-content-container-title">A级以上</div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-four">
                  <div class="three-content-container-title">5A级</div>
                  <div class="three-content-container-value">
                    2<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-four">
                  <div class="three-content-container-title">4A级</div>
                  <div class="three-content-container-value">
                    12<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="bottom-content-container-four">
                  <div class="three-content-container-title">3A级</div>
                  <div class="three-content-container-value">
                    25<span class="three-content-container-unit"> 个</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-content-five">
          <div class="top-content-one-header">
            <span class="top-content-one-header-text">热门线路</span>
          </div>
          <div class="five-content">
            <dv-scroll-ranking-board :config="config" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { reactive, defineAsyncComponent, ref } from "vue";
const LagerTitle = defineAsyncComponent(() => import("./title/LargeTitle.vue"));
import photo1 from "assets/component/trafficTravel/旅游组团.png";
import { otherInfo } from "src/stores/otherInfo";
const storeOtherInfo = otherInfo();
const emit = defineEmits(["close-page"]);
const config = reactive({
  data: [
    {
      name: "京沈线",
      value: 9000,
    },
    {
      name: "承围线",
      value: 8510,
    },
    {
      name: "京承线",
      value: 8102,
    },
    {
      name: "承围线",
      value: 6666,
    },
    {
      name: "京承线",
      value: 8102,
    },
    {
      name: "承围线",
      value: 4510,
    },
  ],
  color: "#01FFB6",
  unit: "辆",
  fontSize: 24,
});

const handleClose = () => {
  emit("close-page", "overviewRightClose");
  storeOtherInfo.setSelectArea("home");
};
</script>

<style scoped lang="scss">
.home-right-page {
  width: 1350px;
  height: 2046px;
}

.top-title-container {
  width: 1109px;
  height: 105px;
  background-image: url("assets/component/一级标题.png");
  background-size: 100% 100%;

  s .top-title {
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
}

.close-btn {
  width: 65px;
  height: 65px;
  right: 0px;
  top: 0px;
  font-size: 48px;
  position: absolute;
}

.top-content-container {
  width: 1350px;
  height: 1892px;
  background-image: url("assets/component/右边概览弹窗.png");
  background-size: 100% 100%;
  padding: 70px 42px 24px 40px;

  .top-content-one-header {
    width: 1238px;
    height: 77px;
    background-image: url("assets/component/二级标题.png");
    background-size: 100% 100%;
    position: absolute;
    top: -26px;
    left: 29px;
    padding: 6px 0px 6px 44px;
  }

  .top-content-one-header-icon {
    width: 89px;
    height: 100px;
    top: -36px;
    margin-left: 20px;
  }

  .top-content-one-header-text {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 700;
    font-size: 44px;
    color: #ffffff;
    line-height: 64px;
    letter-spacing: 8px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .top-content-one {
    width: 1272px;
    height: 320px;
    background-image: url("assets/component/内边框1.png");
    background-size: 100% 100%;
    position: relative;
    padding-top: 60px;

    .one-content {
      width: 100%;
      height: 100%;

      .bottom-content-container-one {
        width: 524px;
        height: 236px;
        background-image: url("assets/component/trafficTravel/-h-8.png");
        background-size: 100% 100%;
        position: relative;
      }

      .one-content-img {
        width: 192px;
        height: 148px;
        top: 50px;
        left: 45px;
        position: absolute;
      }

      .one-content-img img {
        width: 192px;
        height: 148px;
      }

      .one-content-container {
        top: 28px;
        left: 253px;
        position: absolute;
      }

      .one-content-container-title {
        font-family: SourceHanSansRegular;
        font-size: 40px;
        color: #d4efea;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .one-content-container-value {
        font-family: BebasNeue;
        font-size: 72px;
        color: #00fed7;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .one-content-container-unit {
        font-family: SourceHanSansRegular;
        font-size: 40px;
        color: rgb(227, 255, 245, 0.7) !important;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .bottom-content-container-two {
        width: 217px;
        height: 167px;
        background-image: url("assets/component/路网内容框.png");
        background-size: 100% 100%;
        text-align: center;

        .three-content-container-title {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: #e3fff5;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }

        .three-content-container-value {
          font-family: BebasNeue;
          font-size: 60px;
          color: #01efba;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-top: 30px;
        }

        .three-content-container-unit {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: rgb(227, 255, 245, 0.7) !important;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .top-content-two {
    width: 100%;
    height: 382px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .top-content-three {
    width: 1272px;
    height: 266px;
    background-image: url("assets/component/内边框1.png");
    background-size: 100% 100%;
    position: relative;
    margin-top: 44px;
    padding-top: 60px;

    .three-content {
      width: 100%;
      height: 100%;

      .bottom-content-container-three {
        width: 372px;
        height: 168px;
        background-image: url("assets/component/串联交通枢纽内容框.png");
        background-size: 100% 100%;
        text-align: center;

        .three-content-container-title {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: #e3fff5;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }

        .three-content-container-value {
          font-family: BebasNeue;
          font-size: 60px;
          color: #01efba;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-top: 30px;
        }

        .three-content-container-unit {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: rgb(227, 255, 245, 0.7) !important;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .top-content-four {
    width: 1272px;
    height: 320px;
    background-image: url("assets/component/内边框1.png");
    background-size: 100% 100%;
    position: relative;
    margin-top: 80px;
    padding-top: 60px;

    .four-content {
      width: 100%;
      height: 100%;

      .bottom-content-container-four1 {
        width: 524px;
        height: 236px;
        background-image: url("assets/component/trafficTravel/-h-8.png");
        background-size: 100% 100%;
        position: relative;
      }

      .four-content-img {
        width: 148px;
        height: 166px;
        left: 65px;
        position: absolute;
      }

      .four-content-img img {
        width: 148px;
        height: 166px;
      }

      .four-content-container {
        top: 28px;
        left: 253px;
        position: absolute;
      }

      .four-content-container-title {
        font-family: SourceHanSansRegular;
        font-size: 40px;
        color: #d4efea;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .four-content-container-value {
        font-family: BebasNeue;
        font-size: 72px;
        color: #00fed7;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .four-content-container-unit {
        font-family: SourceHanSansRegular;
        font-size: 40px;
        color: rgb(227, 255, 245, 0.7) !important;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .bottom-content-container-four {
        width: 217px;
        height: 167px;
        background-image: url("assets/component/路网内容框.png");
        background-size: 100% 100%;
        text-align: center;

        .three-content-container-title {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: #e3fff5;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }

        .three-content-container-value {
          font-family: BebasNeue;
          font-size: 60px;
          color: #01efba;
          text-align: center;
          font-style: normal;
          text-transform: none;
          margin-top: 30px;
        }

        .three-content-container-unit {
          font-family: SourceHanSansRegular;
          font-size: 36px;
          color: rgb(227, 255, 245, 0.7) !important;
          text-align: center;
          font-style: normal;
          text-transform: none;
        }
      }
    }
  }

  .top-content-five {
    width: 1272px;
    height: 278px;
    background-image: url("assets/component/内边框1.png");
    background-size: 100% 100%;
    position: relative;
    margin-top: 80px;
    padding-top: 60px;

    .five-content {
      width: 100%;
      height: 100%;
      padding: 0px 30px;

      :deep(.dv-scroll-ranking-board .ranking-info .rank) {
        color: #d4efea;
        margin-left: 40px;
      }

      :deep(.dv-scroll-ranking-board .ranking-info .info-name) {
        margin-left: 80px;
      }

      :deep(.dv-scroll-ranking-board .ranking-info .ranking-value) {
        margin-right: 20px;
      }

      // :deep(.dv-scroll-board .header) {
      //   font-size: 36px !important;
      //   background-color: rgba(0, 0, 0, 0) !important;
      // }
      // :deep(.dv-scroll-board .rows .row-item) {
      //   font-size: 36px !important;
      // }
    }
  }
}
</style>
