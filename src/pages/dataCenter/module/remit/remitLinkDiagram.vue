<template>
  <div class="home-page-content">
    <div class="home-index-content">
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
          <div id="intro-xmofangnew" class="content-hui-center-img1"></div>
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
          <q-icon :name="`img:${Icon3}`" class="content-hui-bottom-btns-icon">
            <div class="content-hui-bottom-btns-badge">2</div>
          </q-icon>
        </div>
      </div>

      <div class="content-hui-link-road">
        <div class="content-close" @click="closeContent">
          <q-icon :name="`img:${Icon4}`" class="content-close-icon"></q-icon>
        </div>
        <div class="link-road-platform row">
          <div class="link-road-platform-item column" v-for="item in linkDataPlatform" :key="item.name">
            <div class="platform-item-top row items-center">
              <div class="platform-item-imgBox">
                <img :src="item.img" class="platform-item-img" alt="">
                <img :src="item.icon" class="platform-item-icon" alt="">
              </div>
              <div class="platform-item-name">{{ item.name }}</div>
            </div>
            <div class="platform-item-bottom">
              <div class="platform-item-num" :style="{ background: item.color }">{{ item.num }} {{ item.unit }}</div>
            </div>
          </div>
          <div class="link-road-platform-leftArr column"></div>
          <div class="link-road-platform-rigthArr column"></div>
        </div>
        <div class="link-road-item-center">
          <div id="intro-shuju" class="link-road-item-type-img"></div>
        </div>
        <div class="link-road-type-line">
          <div id="intro-gdld" class="link-road-item-type-img"></div>
        </div>
        <div class="link-road-type row">
          <div class="link-road-item-type column items-center" v-for="item in linkDataType" :key="item.name">
            <img :src="item.img" class="content-hui-link-road-item-img" alt="">
            <div class="content-hui-link-road-item-num">
              {{ item.num }} {{ item.unit }}
            </div>
            <div class="content-hui-link-road-item-text">{{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import { useActiveTypeStore } from "../../store/activeType";
import NubCom from '../../components/NubCom.vue'
import Icon1 from 'src/assets/image/dataCenter/切图 25.png';
import Icon2 from 'src/assets/image/dataCenter/切图 28.png';
import Icon3 from 'src/assets/image/dataCenter/切图 42.png';
import Icon4 from 'src/assets/image/dataCenter/切图 53.png';

import png1 from "src/assets/image/dataCenter/切图 26.png";
import png2 from "src/assets/image/dataCenter/切图 23.png";
import png3 from "src/assets/image/dataCenter/切图 24.png";


import png4 from "src/assets/image/dataCenter/切图 71.png";
import png5 from "src/assets/image/dataCenter/切图 72.png";
import png6 from "src/assets/image/dataCenter/切图 73.png";
import png7 from "src/assets/image/dataCenter/切图 74.png";

//动画json
import lottie from "lottie-web";
import xmofangJson from "assets/json/小魔方.json";
import gdJson from "assets/json/光点.json";
import shujuJson from "assets/json/数据.json";

const dialogRef = ref(null);
const activeTypeStore = useActiveTypeStore();
const { activeBtn, activeDialog } = toRefs(activeTypeStore);

const linkDataType = ref([
  {
    img: png7,
    name: '交通资产',
    num: '11',
    unit: '项'
  },
  {
    img: png7,
    name: '数据分类1',
    num: '12',
    unit: '项'
  },
  {
    img: png7,
    name: '数据分类2',
    num: '15',
    unit: '项'
  },
  {
    img: png7,
    name: '数据分类3',
    num: '13',
    unit: '项'
  },
  {
    img: png7,
    name: '数据分类4',
    num: '11',
    unit: '项'
  },
  {
    img: png7,
    name: '数据分类5',
    num: '10',
    unit: '项'
  }
])

const linkDataPlatform = ref([
  {
    img: png4,
    name: '普通干线公路隧道市级监测与管理平台',
    num: '11',
    unit: '项',
    color: 'linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%)',
    icon: png5
  },
  {
    img: png4,
    name: '普通干线公路隧道市级监测与管理平台',
    num: '17',
    unit: '项',
    color: 'linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%)',
    icon: png6
  },
  {
    img: png4,
    name: '河北省交通综合运行协调与应急指挥中心',
    num: '10',
    unit: '项',
    color: 'linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%)',
    icon: png5
  },
  {
    img: png4,
    name: '神龙GPS车辆监控指挥调度系统',
    num: '15',
    unit: '项',
    color: 'linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%)',
    icon: png5
  },
  {
    img: png4,
    name: '天地车辆监控指挥调度系统',
    num: '12',
    unit: '项',
    color: 'linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%)',
    icon: png5
  },
])

function closeContent() {
  activeTypeStore.setActiveBtn(1)
}
onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-shuju"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: shujuJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-gdld"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: gdJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-xmofangnew"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: xmofangJson,
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

.content-hui-link-road {
  width: 4705px;
  height: 1610px;
  background-image: url("assets/image/dataCenter/切图 69.png");
  background-size: 100% 100%;
  position: absolute;
  top: 98px;
  left: 1646px;
}

.content-close-icon {
  width: 102px;
  height: 102px;
  position: absolute;
  top: 102px;
  right: 81px;
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


.link-road-type {
  position: absolute;
  top: 983px;
  left: 284px;

  .link-road-item-type {
    margin-left: 500px;

    // 修正：选中自身的第一个元素（去掉空格，或明确父级下的第一个）
    &:first-child {
      margin-left: 0px;
    }
  }
}

.content-hui-link-road-item-img {
  width: 248px;
  height: 233px;
}

.content-hui-link-road-item-num {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 72px;
  line-height: 99px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content-hui-link-road-item-text {
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

.link-road-item-center {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 591px;
  left: 2143px;
}

.link-road-type-line {
  width: 4341px;
  height: 594px;
  position: absolute;
  top: 542px;
  left: 155px;
}

.link-road-platform {
  position: absolute;
  top: 304px;
  left: 160px;

  .link-road-platform-item {
    margin-left: 20px;

    // 修正：选中自身的第一个元素（去掉空格，或明确父级下的第一个）
    &:first-child {
      margin-left: 0px;
    }
  }
}

.platform-item-imgBox {
  width: 292px;
  height: 249px;
  position: relative;
}

.platform-item-img {
  width: 292px;
  height: 249px;
}

.platform-item-icon {
  width: 65px;
  height: 65px;
  position: absolute;
  top: 33px;
  right: 33px;
}

.platform-item-name {
  width: 557px;
  height: 160px;
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

.platform-item-bottom {
  .platform-item-num {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 72px;
    line-height: 72px;
    letter-spacing: 1px;
    text-align: left;
    text-transform: none;
    margin-left: 50px;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
}

.link-road-platform-leftArr {
  width: 108px;
  height: 77px;
  background: url('assets/image/dataCenter/切图 68.png') no-repeat center/cover;
  background-size: 100% 100%;
  position: absolute;
  top: 105px;
  left: -90px;
}

.link-road-platform-rigthArr {
  width: 108px;
  height: 77px;
  background: url('assets/image/dataCenter/切图 70.png') no-repeat center/cover;
  background-size: 100% 100%;
  position: absolute;
  top: 105px;
  right: -130px;
}
</style>
