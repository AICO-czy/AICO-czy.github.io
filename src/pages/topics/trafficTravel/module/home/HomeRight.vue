<template>
  <div class="home-right-page">
    <div class="top-title-container">
      <span class="top-title">交通总览</span>
      <q-btn
        class="close-btn"
        round
        icon="img:icons/close.png"
        @click="handleClose()"
      ></q-btn>
    </div>
    <div class="top-content-container">
      <div class="top-content-one">
        <div class="top-content-one-header">
          <q-icon
            class="top-content-one-header-icon"
            name="img:icons/运行状况.png"
          ></q-icon>
          <span class="top-content-one-header-text">交通运行状况</span>
        </div>
        <div class="top-content-one-content">
          <div class="row full-height justify-around items-center">
            <div class="col-auto">
              <img src="icons/交通状态右.png" />
            </div>
            <div class="col-auto">
              <div class="top-content-one-content-state">
                <span class="top-content-one-content-state-text">优</span>
              </div>
            </div>
            <div class="col-auto">
              <img src="icons/交通状态左.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="top-content-one top-content-margin">
        <div class="top-content-one-header">
          <q-icon
            class="top-content-one-header-icon1"
            name="img:icons/交通枢纽站.png"
          ></q-icon>
          <span class="top-content-one-header-text">交通枢纽站</span>
        </div>
        <div class="top-content-two-content">
          <div class="row full-height justify-around items-center">
            <div class="col-auto">
              <div class="top-content-two-content-container">
                <div class="two-content-container-title">客运站</div>
                <div class="two-content-container-value">
                  10<span class="two-content-container-unit"> 个</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="top-content-two-content-container">
                <div class="two-content-container-title">高铁(火车)站</div>
                <div class="two-content-container-value">
                  45<span class="two-content-container-unit"> 个</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="top-content-two-content-container">
                <div class="two-content-container-title">机场</div>
                <div class="two-content-container-value">
                  3<span class="two-content-container-unit"> 个</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-content-one top-content-margin">
        <div class="top-content-one-header">
          <q-icon
            class="top-content-one-header-icon2"
            name="img:icons/公共交通服务.png"
          ></q-icon>
          <span class="top-content-one-header-text">公共交通服务</span>
        </div>
        <div class="top-content-three-content">
          <div class="row full-height justify-around items-center">
            <div class="col-auto">
              <div class="top-content-three-content-container">
                <div class="three-content-container-title">巡游出租车</div>
                <div class="three-content-container-value">
                  1348<span class="three-content-container-unit"> 辆</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="top-content-three-content-container">
                <div class="three-content-container-title">网约车</div>
                <div class="three-content-container-value">
                  1450<span class="three-content-container-unit"> 辆</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="top-content-three-content-container">
                <div class="three-content-container-title">公交车</div>
                <div class="three-content-container-value">
                  850<span class="three-content-container-unit"> 辆</span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <div class="top-content-three-content-container">
                <div class="three-content-container-title">班线客运</div>
                <div class="three-content-container-value">
                  260<span class="three-content-container-unit"> 辆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-title-container">
      <span class="bottom-title">旅游景区总览</span>
    </div>
    <div class="bottom-content-container">
      <div class="row full-height justify-around items-center">
        <div class="col-auto">
          <div class="bottom-content-container-one">
            <div class="one-content-img">
              <img src="icons/景区景点.png" />
            </div>
            <div class="one-content-container">
              <div class="one-content-container-title">A级以上</div>
              <div class="one-content-container-value">
                52<span class="one-content-container-unit"> 个</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="bottom-content-container-two">
            <div class="three-content-container-title">5A级</div>
            <div class="three-content-container-value">
              2<span class="three-content-container-unit"> 个</span>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="bottom-content-container-two">
            <div class="three-content-container-title">4A级</div>
            <div class="three-content-container-value">
              12<span class="three-content-container-unit"> 个</span>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <div class="bottom-content-container-two">
            <div class="three-content-container-title">3A级</div>
            <div class="three-content-container-value">
              25<span class="three-content-container-unit"> 个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { otherInfo } from "src/stores/otherInfo";
const storeOtherInfo = otherInfo();
const emit = defineEmits(["close-page"]);
const handleClose = () => {
  emit("close-page", "homeRightClose");
storeOtherInfo.setSelectArea("home");
};
</script>

<style scoped>
.home-right-page {
  width: 1560px;
  height: 1810px;
}

.top-title-container {
  width: 1449px;
  height: 102px;
  background-image: url("assets/component/一级标题.png");
  background-size: 100% 100%;
  margin-left: 60px;

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
}

.top-content-container {
  width: 1456px;
  height: 1115px;
  background-image: url("assets/component/外边框.png");
  background-size: 100% 100%;
  margin-top: 42px;
  padding: 50px 37px 45px 57px;
}

.top-content-margin {
  margin-top: 65px !important;
}

.top-content-one {
  width: 1362px;
  height: 269px;
  background-image: url("assets/component/内边框.png");
  background-size: 100% 100%;
  margin-top: 47px;
  position: relative;
}

.top-content-one-header {
  width: 1065px;
  height: 82px;
  background-image: url("assets/component/二级标题.png");
  background-size: 100% 100%;
  position: absolute;
  top: -26px;
  left: 29px;
}

.top-content-one-header-icon {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 20px;
}

.top-content-one-header-icon1 {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 26px;
}

.top-content-one-header-icon2 {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 26px;
}

.top-content-one-header-text {
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

.top-content-one-content {
  width: 1294px;
  height: 176px;
  background-image: url("assets/component/交通运行状态内容.png");
  background-size: 100% 100%;
  position: absolute;
  top: 60px;
  left: 29px;
  padding: 20px 150px;
}

.top-content-one-content-state {
  width: 400px;
  height: 132px;
  background-image: url("assets/component/交通运行状态.png");
  background-size: 100% 100%;
  text-align: center;
}

.top-content-one-content-state-text {
  font-family: AlibabaPuHuiTiBold;
  font-weight: bold;
  font-size: 92px;
  color: #13ff93;
  /* text-shadow: 12px 0px 24px #07673d; */
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(107deg, #03ce97 0%, #00ffa2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: breathing 2s infinite;
}

.top-content-two-content {
  width: 1294px;
  height: 176px;
  top: 60px;
  left: 29px;
  position: absolute;
}

.top-content-two-content-container {
  width: 400px;
  height: 136px;
  background-image: url("assets/component/交通枢纽站框.png");
  background-size: 100% 100%;
  text-align: center;
}

.two-content-container-title {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 32px;
  color: #a1e4eb;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.two-content-container-value {
  font-family: BebasNeue;
  font-size: 66px;
  /* color: #9ff6ff; */
  font-weight: bold;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #67d0f5 0%, #51f3e8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.two-content-container-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 28px;
  color: #7caeb3 !important;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.top-content-three-content {
  width: 1294px;
  height: 176px;
  top: 60px;
  left: 29px;
  position: absolute;
}

.top-content-three-content-container {
  width: 301px;
  height: 136px;
  background-image: url("assets/component/公共交通服务内容.png");
  background-size: 100% 100%;
  text-align: center;
}

.three-content-container-title {
  font-family: SourceHanSansRegular;
  font-size: 32px;
  color: #a1e4eb;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.three-content-container-value {
  font-family: BebasNeue;
  font-size: 66px;
  /* color: #9ff6ff; */
  font-weight: bold;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #67d0f5 0%, #51f3e8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.three-content-container-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 28px;
  color: #7caeb3 !important;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.bottom-title-container {
  width: 1449px;
  height: 102px;
  background-image: url("assets/component/一级标题.png");
  background-size: 100% 100%;
  margin-left: 60px;
  margin-top: 64px;

  .bottom-title {
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

.bottom-content-container {
  width: 1456px;
  height: 336px;
  background-image: url("assets/component/外边框1.png");
  background-size: 100% 100%;
  margin-top: 42px;
  padding: 40px;
}

.bottom-content-container-one {
  width: 389px;
  height: 174px;
  background-image: url("assets/component/景区总览.png");
  background-size: 100% 100%;
  position: relative;
}
.one-content-img {
  width: 133px;
  height: 149px;
  left: 33px;
  bottom: 58px;
  position: absolute;
}
.one-content-img img {
  width: 133px;
  height: 149px;
}
.one-content-container {
  top: 20px;
  left: 222px;
  position: absolute;
}
.one-content-container-title {
  font-family: SourceHanSansRegular;
  font-size: 34px;
  color: #a1e4eb;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.one-content-container-value {
  font-family: BebasNeue;
  font-size: 60px;
  /* color: #9ff6ff; */
  font-weight: bold;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(0deg, #67d0f5 0%, #51f3e8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.one-content-container-unit {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 28px;
  color: #7caeb3 !important;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
.bottom-content-container-two {
  width: 301px;
  height: 136px;
  background-image: url("assets/component/公共交通服务内容.png");
  background-size: 100% 100%;
  text-align: center;
}
</style>
