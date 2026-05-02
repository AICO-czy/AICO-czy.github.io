<template>
  <div class="home-page-content">
    <div class="home-index-content">
      <div class="content-link">
        <div id="intro-ldd" class="fit"></div>
      </div>
      <div class="content-hui">
        <div class="content-hui-bg"></div>
        <div class="content-hui-text" @click="activeTypeStore.setActiveDialog(1)"><span>汇</span></div>
        <div class="content-hui-data">
          <div class="content-hui-data-item row items-center">
            <div class="glhy-name">今日接入数据总量</div>
            <div class="left-arr"></div>
            <nub-com :need="true" :formatLength="7" :unit="'条'" />
            <div class="right-arr"></div>
          </div>
          <div class="content-hui-data-item row items-center">
            <div class="glhy-name">累计接入数据总量</div>
            <div class="left-arr"></div>
            <nub-com :need="true" :formatLength="7" :unit="'万条'" />
            <div class="right-arr"></div>
          </div>
        </div>
        <div class="content-hui-center">
          <img :src="png1" class="content-hui-center-img" alt="">
          <div id="intro-xmofang" class="content-hui-center-img1"></div>
        </div>
        <div class="content-hui-department column justify-center items-center" @click="activeTypeStore.setActiveBtn(2)">
          <img class="content-hui-department-img" :src="png2" alt="">
          <span class="content-hui-department-text">数据对接部门</span>
          <div class="content-hui-department-bottom row justify-between items-center">
            <q-icon :name="`img:${Icon1}`" class="content-hui-department-bottom-icon"></q-icon>
            <span class="content-hui-department-bottom-text">(10个)</span>
          </div>
        </div>
        <div class="content-hui-enterprise column justify-center items-center" @click="activeTypeStore.setActiveBtn(3)">
          <img class="content-hui-enterprise-img" :src="png3" alt="">
          <span class="content-hui-enterprise-text">数据对接企业</span>
          <div class="content-hui-enterprise-bottom row justify-between items-center">
            <q-icon :name="`img:${Icon1}`" class="content-hui-enterprise-bottom-icon"></q-icon>
            <span class="content-hui-enterprise-bottom-text">(25个)</span>
          </div>
        </div>
        <div class="content-hui-bottom"><span>数据接入</span></div>
        <div class="content-hui-bottom-btns">
          <q-icon :name="`img:${Icon2}`" class="content-hui-bottom-btns-icon"
            @click="activeTypeStore.setActiveBtn(4)"></q-icon>
          <q-icon :name="`img:${Icon3}`" class="content-hui-bottom-btns-icon"
            @click="activeTypeStore.setActiveDialog(5)">
            <!-- <div class="content-hui-bottom-btns-badge" @click.stop="activeTypeStore.setActiveDialog(6)">2</div> -->
          </q-icon>
          <q-icon :name="`img:${Icon4}`" class="content-hui-bottom-btns-icon"
            @click="activeTypeStore.setActiveDialog(6)">
            <div class="content-hui-bottom-btns-badge">2</div>
          </q-icon>
        </div>
      </div>
      <div class="content-zhi">
        <div class="content-zhi-bg"></div>
        <div class="content-zhi-text" @click="activeTypeStore.setActiveDialog(2)"><span>治</span></div>
        <div class="content-zhi-data">
          <div class="content-zhi-data-item row items-center">
            <div class="glhy-name">今日治理数据总量</div>
            <div class="left-arr"></div>
            <nub-com :need="true" :formatLength="5" :unit="'条'" />
            <div class="right-arr"></div>
          </div>
        </div>
        <div class="content-zhi-center">
          <div class="content-zhi-center-left"></div>
          <div id="intro-shuzi" class="content-zhi-center-img1"></div>
          <div class="content-zhi-center-right"></div>
        </div>
        <div class="content-zhi-bottom"><span>数据治理</span></div>
        <div class="content-hui-bottom-btns">
          <q-icon :name="`img:${Icon3}`" class="content-hui-bottom-btns-icon"
            @click="activeTypeStore.setActiveDialog(7)">
            <!-- <div class="content-hui-bottom-btns-badge" @click.stop="activeTypeStore.setActiveDialog(8)">2</div> -->
          </q-icon>
          <q-icon :name="`img:${Icon4}`" class="content-hui-bottom-btns-icon"
            @click="activeTypeStore.setActiveDialog(8)">
            <div class="content-hui-bottom-btns-badge">4</div>
          </q-icon>
        </div>
      </div>
      <div class="content-chun">
        <div class="content-chun-bg"></div>
        <div class="content-chun-text" @click="activeTypeStore.setActiveDialog(3)"><span>存</span></div>
        <div class="content-chun-data">
          <div class="content-chun-data-item row items-center">
            <div class="glhy-name space-name1">资源目录</div>
            <div class="chun-data-text">
              <div class="chun-data-text-num">
                78
                <span>项</span>
              </div>
            </div>
          </div>
          <div class="content-chun-data-item row items-center">
            <div class="glhy-name space-name">累计存储</div>
            <div class="left-arr"></div>
            <NubCom1 :need="true" :formatLength="6" :unit="'GB'" />
            <div class="right-arr"></div>
          </div>
        </div>
        <div class="content-chun-center"></div>
        <div class="content-chun-bottom"><span>数据存储</span></div>
      </div>
      <div class="content-yong">
        <div class="content-yong-bg"></div>
        <div class="content-yong-text" @click="activeTypeStore.setActiveDialog(4)"><span>用</span></div>
        <div class="content-yong-data">
          <div class="content-yong-data-top row justify-between items-center">
            <div class="content-yong-data-item row items-center space-name3">
              <div class="glhy-name">今日数据调用</div>
              <div class="yong-data-text">
                <div class="yong-data-text-num">
                  136
                  <span>次</span>
                </div>
              </div>
            </div>
            <div class="content-yong-data-item row items-center">
              <div class="glhy-name">共享单位</div>
              <div class="yong-data-text1">
                <div class="yong-data-text-num">
                  2
                  <span>家</span>
                </div>
              </div>
            </div>
          </div>
          <div class="content-chun-data-bottom row justify-between items-center">
            <div class="content-chun-data-item row items-center space-name3">
              <div class="glhy-name">累计数据调用</div>
              <div class="yong-data-text">
                <div class="yong-data-text-num">
                  9,999,999
                  <span>次</span>
                </div>
              </div>
            </div>
            <div class="content-chun-data-item row items-center">
              <div class="glhy-name">共享数据</div>
              <div class="yong-data-text1">
                <div class="yong-data-text-num">
                  136
                  <span>项</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-yong-center">
          <div id="intro-zhuzi" class="content-yong-center-img"></div>
        </div>
        <div class="content-yong-bottom"><span>数据应用</span></div>
      </div>
    </div>
    <dialog-com v-if="activeDialog == 1">
      <RemitDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 2">
      <GovernDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 3">
      <SaveDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 4">
      <UseDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 5">
      <!--数据接入 -->
      <AccessDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 6">
      <!--数据接入异常 -->
      <AccessAnomalyDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 7">
      <!--数据治理 -->
      <GovernanceDialog />
    </dialog-com>
    <dialog-com v-if="activeDialog == 8">
      <!--数据治理异常 -->
      <GovernanceAnomalyDialog />
    </dialog-com>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import { useActiveTypeStore } from "../../../store/activeType";
import NubCom from '../../../components/NubCom.vue'
import NubCom1 from '../../../components/NubCom1.vue'
import dialogCom from '../../../components/dialogCom.vue'
import RemitDialog from '../../remit/remitDialog.vue'
import UseDialog from '../../use/useDialog.vue'
import GovernDialog from '../../govern/governDialog.vue'
import SaveDialog from '../../save/saveDialog.vue'
import AccessDialog from "../../remit/accessDialog.vue"
import AccessAnomalyDialog from '../../remit/accessAnomalyDialog.vue'
import GovernanceDialog from "../../govern/governanceDialog.vue"
import GovernanceAnomalyDialog from '../../govern/governanceAnomalyDialog.vue'

import Icon1 from 'src/assets/image/dataCenter/切图 25.png';
import Icon2 from 'src/assets/image/dataCenter/切图 28.png';
import Icon3 from 'src/assets/image/dataCenter/切图 42.png';
import Icon4 from 'src/assets/image/dataCenter/yujing.png';


import png1 from "src/assets/image/dataCenter/切图 26.png";
import png2 from "src/assets/image/dataCenter/切图 23.png";
import png3 from "src/assets/image/dataCenter/切图 24.png";
//动画json
import lottie from "lottie-web";
import lddJson from "assets/json/流动带.json";
import zhuziJson from "assets/json/柱子.json";
import xmofangJson from "assets/json/小魔方.json";
import shuziJson from "assets/json/数字.json";

const dialogRef = ref(null);

const activeTypeStore = useActiveTypeStore();
const { activeBtn, activeDialog } = toRefs(activeTypeStore);

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-ldd"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: lddJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-zhuzi"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: zhuziJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-xmofang"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: xmofangJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-shuzi"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: shuziJson,
  });
});
</script>

<style lang="scss" scoped>
.home-page-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.home-index-content {
  width: 6421px;
  height: 1813px;
  background-image: url("assets/image/dataCenter/切图 6.png");
  background-size: 100% 100%;
  position: absolute;
  top: 167px;
  left: 115px;
}

.content-link {
  width: 5740px;
  height: 694px;
  position: absolute;
  top: 748px;
  left: 404px;
}

.content-hui {
  width: 1504px;
  height: 1610px;
  background-image: url("assets/image/dataCenter/切图 7.png");
  background-size: 100% 100%;
  position: absolute;
  top: 98px;
  left: 71px;

  .content-hui-bg {
    width: 1307px;
    height: 1071px;
    background-image: url("assets/image/dataCenter/切图 108.png");
    background-size: 100% 100%;
    position: absolute;
    top: 355px;
    left: 151px;
  }

  .content-hui-text {
    width: 711px;
    height: 159px;
    background-image: url("assets/image/dataCenter/切图 10.png");
    background-size: 100% 100%;
    position: absolute;
    top: 131px;
    left: 463px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 86px;
      line-height: 112px;
      letter-spacing: 6px;
      text-shadow: 0px 10px 8px rgba(4, 21, 35, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-hui-data {
    position: absolute;
    top: 300px;
    left: 56px;
  }

  .content-hui-center {
    position: absolute;
    top: 808px;
    left: 690px;

    .content-hui-center-img {
      width: 412px;
      height: 333px;
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .content-hui-center-img1 {
      width: 415px;
      height: 415px;
      position: absolute;
      top: -180px;
      left: 0px;
    }
  }

  .content-hui-bottom {
    width: 670px;
    height: 206px;
    background-image: url("assets/image/dataCenter/切图 27.png");
    background-size: 100% 100%;
    position: absolute;
    bottom: 87px;
    left: 417px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 66px;
      line-height: 91px;
      text-shadow: 0px 7px 3px rgba(0, 0, 0, 0.22);
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(0deg, #17E0FF 0%, #FFFFFF 56%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: rotate(-5deg);
      margin-bottom: 50px;
    }
  }

  .content-hui-department {
    position: absolute;
    top: 528px;
    left: 108px;

    .content-hui-department-img {
      width: 226px;
      height: 234px;
    }

    .content-hui-department-text {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #9BE6FF;
      line-height: 80px;
      letter-spacing: 2px;
      text-shadow: 0px 6px 8px #042F4A;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .content-hui-department-bottom {
      .content-hui-department-bottom-icon {
        width: 62px;
        height: 62px;
        margin-right: 30px;
      }

      span {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 58px;
        color: #9BE6FF;
        line-height: 80px;
        letter-spacing: 2px;
        text-shadow: 0px 6px 8px #042F4A;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .content-hui-enterprise {
    position: absolute;
    top: 1068px;
    left: 108px;

    .content-hui-enterprise-img {
      width: 226px;
      height: 234px;
    }

    .content-hui-enterprise-text {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #9BE6FF;
      line-height: 80px;
      letter-spacing: 2px;
      text-shadow: 0px 6px 8px #042F4A;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .content-hui-enterprise-bottom {
      .content-hui-enterprise-bottom-icon {
        width: 62px;
        height: 62px;
        margin-right: 30px;
      }

      span {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 58px;
        color: #9BE6FF;
        line-height: 80px;
        letter-spacing: 2px;
        text-shadow: 0px 6px 8px #042F4A;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .content-hui-bottom-btns {
    position: absolute;
    bottom: 200px;
    right: 222px;

    .content-hui-bottom-btns-icon {
      width: 78px;
      height: 83px;
      margin-left: 40px;
      position: relative;

      .content-hui-bottom-btns-badge {
        position: absolute;
        background-color: red;
        border-radius: 50%;
        top: -15px;
        right: -15px;
        width: 47px;
        height: 47px;
        font-size: 34px;
        line-height: 45px;
        color: #FFFFFF;
      }
    }
  }
}

.content-zhi {
  width: 1542px;
  height: 1256px;
  background-image: url("assets/image/dataCenter/切图 34.png");
  background-size: 100% 100%;
  position: absolute;
  top: 310px;
  left: 1647px;

  .content-zhi-bg {
    width: 1307px;
    height: 1071px;
    background-image: url("assets/image/dataCenter/切图 108.png");
    background-size: 100% 100%;
    position: absolute;
    top: 143px;
    left: 113px;
  }

  .content-zhi-text {
    width: 705px;
    height: 97px;
    background-image: url("assets/image/dataCenter/切图 11.png");
    background-size: 100% 100%;
    position: absolute;
    top: 95px;
    left: 448px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 86px;
      line-height: 112px;
      letter-spacing: 6px;
      text-shadow: 0px 10px 8px rgba(4, 21, 35, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-zhi-data {
    position: absolute;
    top: 230px;
    left: 100px;
  }

  .content-zhi-center {
    width: 1176px;
    height: 922px;
    background-image: url("assets/image/dataCenter/组 131191.png");
    background-size: 100% 100%;
    position: absolute;
    top: 256px;
    left: 234px;

    .content-zhi-center-left {
      width: 303px;
      height: 606px;
      background-image: url("assets/image/dataCenter/切图 86.png");
      background-size: 100% 100%;
      position: absolute;
      top: 218px;
      left: -93px;
    }

    .content-zhi-center-img {
      width: 1176px;
      height: 929px;
      position: absolute;
      top: 50px;
      left: 0px;
    }

    .content-zhi-center-right {
      width: 303px;
      height: 606px;
      background-image: url("assets/image/dataCenter/切图 87.png");
      background-size: 100% 100%;
      position: absolute;
      top: 218px;
      right: -42px;
    }
  }

  .content-zhi-bottom {
    width: 670px;
    height: 206px;
    background-image: url("assets/image/dataCenter/切图 30.png");
    background-size: 100% 100%;
    position: absolute;
    bottom: 11px;
    left: 443px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-bottom: 50px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 66px;
      line-height: 91px;
      text-shadow: 0px 7px 3px rgba(0, 0, 0, 0.22);
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(0deg, #17E0FF 0%, #FFFFFF 56%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-hui-bottom-btns {
    position: absolute;
    bottom: 100px;
    right: 402px;

    .content-hui-bottom-btns-icon {
      width: 78px;
      height: 83px;
      margin-left: 40px;
      position: relative;

      .content-hui-bottom-btns-badge {
        position: absolute;
        background-color: red;
        border-radius: 50%;
        top: -15px;
        right: -15px;
        width: 47px;
        height: 47px;
        font-size: 34px;
        line-height: 45px;
        color: #FFFFFF;
      }
    }
  }
}

.content-chun {
  width: 1542px;
  height: 1256px;
  background-image: url("assets/image/dataCenter/切图 35.png");
  background-size: 100% 100%;
  position: absolute;
  top: 310px;
  left: 3234px;

  .content-chun-bg {
    width: 1307px;
    height: 1071px;
    background-image: url("assets/image/dataCenter/切图 108.png");
    background-size: 100% 100%;
    position: absolute;
    top: 95px;
    left: 113px;
  }

  .content-chun-text {
    width: 705px;
    height: 97px;
    background-image: url("assets/image/dataCenter/切图 11.png");
    background-size: 100% 100%;
    position: absolute;
    top: 95px;
    left: 448px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 86px;
      line-height: 112px;
      letter-spacing: 6px;
      text-shadow: 0px 10px 8px rgba(4, 21, 35, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-chun-data {
    position: absolute;
    top: 215px;
    left: 240px;

    .content-chun-data-item {
      margin-bottom: 20px;
    }

    .chun-data-text {
      background: url('assets/image/dataCenter/切图 36.png') no-repeat center/cover;
      width: 702px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;

      .chun-data-text-num {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 62px;
        line-height: 85px;
        letter-spacing: 3px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #FFB579 0%, #FFEFB8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        span {
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          color: rgba(220, 236, 255, 0.6);
          line-height: 76px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          /* 2. 清除渐变背景（避免继承父元素的渐变） */
          background: none;
          opacity: 0.967;
          -webkit-text-fill-color: rgba(220, 236, 255, 0.567);
          /* 同步覆盖兼容属性 */
          /* 3. 重置背景裁剪（恢复默认的边框盒） */
          -webkit-background-clip: border-box;
          background-clip: border-box;
        }
      }

    }
  }

  .content-chun-center {
    width: 1118px;
    height: 576px;
    background-image: url("assets/image/dataCenter/切图 39.png");
    background-size: 100% 100%;
    position: absolute;
    top: 457px;
    left: 224px;
  }

  .content-chun-bottom {
    width: 670px;
    height: 206px;
    background-image: url("assets/image/dataCenter/切图 30.png");
    background-size: 100% 100%;
    position: absolute;
    bottom: 11px;
    left: 443px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      margin-bottom: 50px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 66px;
      line-height: 91px;
      text-shadow: 0px 7px 3px rgba(0, 0, 0, 0.22);
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(0deg, #17E0FF 0%, #FFFFFF 56%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-hui-bottom-btns {
    position: absolute;
    bottom: 100px;
    right: 402px;

    .content-hui-bottom-btns-icon {
      width: 78px;
      height: 83px;
      margin-left: 40px;
      position: relative;

      .content-hui-bottom-btns-badge {
        position: absolute;
        background-color: red;
        border-radius: 50%;
        top: -15px;
        right: -15px;
        width: 47px;
        height: 47px;
        font-size: 34px;
        line-height: 45px;
        color: #FFFFFF;
      }
    }
  }
}

.content-yong {
  width: 1508px;
  height: 1611px;
  background-image: url("assets/image/dataCenter/切图 9.png");
  background-size: 100% 100%;
  position: absolute;
  top: 98px;
  right: 71px;

  .content-yong-bg {
    width: 1307px;
    height: 1071px;
    background-image: url("assets/image/dataCenter/切图 108.png");
    background-size: 100% 100%;
    position: absolute;
    top: 307px;
    left: 101px;
  }

  .content-yong-text {
    width: 711px;
    height: 159px;
    background-image: url("assets/image/dataCenter/切图 15.png");
    background-size: 100% 100%;
    position: absolute;
    top: 131px;
    left: 456px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 86px;
      line-height: 112px;
      letter-spacing: 6px;
      text-shadow: 0px 10px 8px rgba(4, 21, 35, 0.3);
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .content-yong-data {
    position: absolute;
    top: 334px;
    left: 42px;

    .content-yong-data-item {
      margin-bottom: 45px;
    }

    .yong-data-text1 {
      background: url('assets/image/dataCenter/切图 44.png') no-repeat center/cover;
      width: 246px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;

      .yong-data-text-num {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 62px;
        line-height: 85px;
        letter-spacing: 3px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #FF7979 0%, #FFB8B8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        span {
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          color: rgba(220, 236, 255, 0.6);
          line-height: 76px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          /* 2. 清除渐变背景（避免继承父元素的渐变） */
          background: none;
          opacity: 0.967;
          -webkit-text-fill-color: rgba(220, 236, 255, 0.567);
          /* 同步覆盖兼容属性 */
          /* 3. 重置背景裁剪（恢复默认的边框盒） */
          -webkit-background-clip: border-box;
          background-clip: border-box;
        }
      }

    }

    .yong-data-text {
      background: url('assets/image/dataCenter/切图 43.png') no-repeat center/cover;
      width: 494px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;

      .yong-data-text-num {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 62px;
        line-height: 85px;
        letter-spacing: 3px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(0deg, #68EBFF 0%, #54C6FB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        span {
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
          font-weight: 400;
          font-size: 50px;
          color: rgba(220, 236, 255, 0.6);
          line-height: 76px;
          letter-spacing: 1px;
          text-align: left;
          font-style: normal;
          /* 2. 清除渐变背景（避免继承父元素的渐变） */
          background: none;
          opacity: 0.967;
          -webkit-text-fill-color: rgba(220, 236, 255, 0.567);
          /* 同步覆盖兼容属性 */
          /* 3. 重置背景裁剪（恢复默认的边框盒） */
          -webkit-background-clip: border-box;
          background-clip: border-box;
        }
      }

    }
  }

  .content-yong-center {
    width: 1388px;
    height: 746px;
    background-image: url("assets/image/dataCenter/切图 48.png");
    background-size: 100% 100%;
    position: absolute;
    top: 600px;
    left: 80px;

    .content-yong-center-img {
      width: 452px;
      height: 452px;
      position: absolute;
      top: 80px;
      left: 451px;
    }
  }

  .content-yong-bottom {
    width: 670px;
    height: 206px;
    background-image: url("assets/image/dataCenter/切图 52.png");
    background-size: 100% 100%;
    position: absolute;
    bottom: 84px;
    left: 435px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 66px;
      line-height: 91px;
      text-shadow: 0px 7px 3px rgba(0, 0, 0, 0.22);
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(0deg, #17E0FF 0%, #FFFFFF 56%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: rotate(5deg);
      margin-bottom: 50px;
    }
  }

  .content-hui-bottom-btns {
    position: absolute;
    bottom: 135px;
    right: 305px;

    .content-hui-bottom-btns-icon {
      width: 78px;
      height: 83px;
      margin-left: 40px;
      position: relative;
      transform: rotate(5deg);

      .content-hui-bottom-btns-badge {
        position: absolute;
        background-color: red;
        border-radius: 50%;
        top: -15px;
        right: -15px;
        width: 47px;
        height: 47px;
        font-size: 34px;
        line-height: 45px;
        color: #FFFFFF;
      }
    }
  }
}

.glhy-name {
  font-family: DingTalk JinBuTi, DingTalk JinBuTi;
  font-weight: 400;
  font-size: 58px;
  line-height: 70px;
  letter-spacing: 2px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FFFFFF 29%, #D2F9FF 66%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 30px;
}

.left-arr {
  background: url('assets/component/道水路运输系统-首页_slices/切图 530.png') no-repeat center/cover;
  width: 35px;
  height: 81px;
  margin-right: 15px;
}

.right-arr {
  background: url('assets/component/道水路运输系统-首页_slices/切图 531.png') no-repeat center/cover;
  width: 35px;
  height: 81px;
}

.space-name1 {
  margin-right: 100px;
}

.space-name {
  margin-right: 80px;
}

.space-name3 {
  margin-right: 30px;
}
</style>
