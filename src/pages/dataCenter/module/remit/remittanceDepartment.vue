<template>
  <div class="remittance-department">
    <div class="remittance-department-content">
      <div class="remittance-department-content-close" @click="closeContent">
        <q-icon :name="`img:${closeIcon}`" class="remittance-department-content-close-icon"></q-icon>
      </div>
      <div class="content-hui">
        <div class="content-hui-text"><span>汇</span></div>
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
        <div class="content-hui-department column justify-center items-center">
          <img class="content-hui-department-img" :src="png1" alt="">
          <span class="content-hui-department-text">数据对接部门</span>
          <div class="content-hui-department-bottom row justify-between items-center">
            <q-icon :name="`img:${Icon1}`" class="content-hui-department-bottom-icon"></q-icon>
            <span class="content-hui-department-bottom-text">(10个)</span>
          </div>
        </div>
      </div>
      <div class="remittance-department-title">
        <span>数据对接部门</span>
      </div>
      <div class="access-top">
        <img :src="png2" alt="">
      </div>
      <div class="access-left">
        <img v-if="accessData[0] && accessData[0].status === '异常'" :src="png3" alt="">
        <img v-if="accessData[0] && accessData[0].status === '正常'" :src="png4" alt="">
        <img v-if="accessData[0] && accessData[0].status === '已导入'" :src="png5" alt="">
      </div>
      <div class="access-left1">
        <img v-if="accessData[1] && accessData[1].status === '异常'" :src="png3" alt="">
        <img v-if="accessData[1] && accessData[1].status === '正常'" :src="png4" alt="">
        <img v-if="accessData[1] && accessData[1].status === '已导入'" :src="png5" alt="">
      </div>
      <div class="access-middle">
        <img v-if="accessData[2] && accessData[2].status === '异常'" :src="png6" alt="">
        <img v-if="accessData[2] && accessData[2].status === '正常'" :src="png7" alt="">
        <img v-if="accessData[2] && accessData[2].status === '已导入'" :src="png8" alt="">
      </div>
      <div class="access-right">
        <img v-if="accessData[3] && accessData[3].status === '异常'" :src="png9" alt="">
        <img v-if="accessData[3] && accessData[3].status === '正常'" :src="png10" alt="">
        <img v-if="accessData[3] && accessData[3].status === '已导入'" :src="png11" alt="">
      </div>
      <div class="access-right1">
        <img v-if="accessData[4] && accessData[4].status === '异常'" :src="png9" alt="">
        <img v-if="accessData[4] && accessData[4].status === '正常'" :src="png10" alt="">
        <img v-if="accessData[4] && accessData[4].status === '已导入'" :src="png11" alt="">
      </div>
      <div class="access-animation">
        <div id="intro-gd" class="fit"></div>
      </div>

      <div class="access-items row justify-between">
        <div v-for="(item, index) in accessData" :key="index" class="access-item column justify-center items-center">
          <img :src="item.img" alt="" class="access-item-img">
          <div class="access-item-text">
            {{ item.count }}{{ item.unit }}
          </div>
          <div class="access-item-status">
            <span class="access-item-status-text"
              :class="{ 'text-red': item.status === '异常', 'text-gray': item.status === '已导入', 'text-green': item.status === '正常' }">{{
                item.status }}</span>
          </div>
          <div class="access-item-unit-name">
            <span class="access-item-unit-name-text">{{ item.unitName
              }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, watch, nextTick, toRefs } from "vue";

import NubCom from '../../components/NubCom.vue'

import { useActiveTypeStore } from "../../store/activeType";
import closeIcon from 'src/assets/image/dataCenter/切图 53.png';
import Icon1 from 'src/assets/image/dataCenter/切图 25.png';
import png1 from "src/assets/image/dataCenter/切图 23.png";
import png2 from "src/assets/image/dataCenter/切图 58.png";

import png3 from "src/assets/image/dataCenter/接入左-红.png";
import png4 from "src/assets/image/dataCenter/接入左-绿.png";
import png5 from "src/assets/image/dataCenter/接入左-灰.png";
import png6 from "src/assets/image/dataCenter/接入中-红.png";
import png7 from "src/assets/image/dataCenter/接入中-绿.png";
import png8 from "src/assets/image/dataCenter/接入中-灰.png";
import png9 from "src/assets/image/dataCenter/接入右-红.png";
import png10 from "src/assets/image/dataCenter/接入右-绿.png";
import png11 from "src/assets/image/dataCenter/接入右-灰.png";
import png12 from "src/assets/image/dataCenter/切图 57.png";
//动画json
import lottie from "lottie-web";
import gdJson from "assets/json/光点流动.json";
const activeTypeStore = useActiveTypeStore();

const accessData = ref([
  {
    img: png12,
    count: 12,
    unit: '项',
    status: '正常',
    unitName: '承德市交通运输局信访办'
  },
  {
    img: png12,
    count: 1,
    unit: '项',
    status: '已导入',
    unitName: '承德市交通运输局信访办'
  },
  {
    img: png12,
    count: 23,
    unit: '项',
    status: '正常',
    unitName: '承德市交通运输局信访办'
  },
  {
    img: png12,
    count: 18,
    unit: '项',
    status: '正常',
    unitName: '承德市交通运输局信访办'
  },
  {
    img: png12,
    count: 15,
    unit: '项',
    status: '异常',
    unitName: '承德市交通运输局信访办'
  }
])

function closeContent() {
  activeTypeStore.setActiveBtn(1)
}
onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-gd"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: gdJson,
  });
});
</script>

<style lang="scss" scoped>
.remittance-department {
  width: 100%;
  height: 100%;
  position: relative;
}

.remittance-department-content {
  width: 6430px;
  height: 1813px;
  background-image: url("assets/image/dataCenter/切图 55.png");
  background-size: 100% 100%;
  position: absolute;
  top: 167px;
  left: 100px;
}

.remittance-department-content-close-icon {
  width: 102px;
  height: 102px;
  position: absolute;
  top: 200px;
  right: 160px;
}

.remittance-department-title {
  width: 1044px;
  height: 97px;
  background-image: url("assets/image/dataCenter/切图 54.png");
  background-size: 100% 100%;
  position: absolute;
  top: 437px;
  left: 2731px;
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

.content-hui {
  width: 1504px;
  height: 1610px;
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

.access-top {
  width: 259px;
  height: 219px;
  position: absolute;
  top: 586px;
  left: 3163px;
}

.access-left {
  width: 1142px;
  height: 238px;
  position: absolute;
  top: 886px;
  left: 998px;
}

.access-left1 {
  width: 1142px;
  height: 238px;
  position: absolute;
  top: 886px;
  left: 2138px;
}

.access-middle {
  width: 24px;
  height: 178px;
  position: absolute;
  top: 809px;
  left: 3280px;
}

.access-right {
  width: 1142px;
  height: 238px;
  position: absolute;
  top: 886px;
  left: 3304px;
}

.access-right1 {
  width: 1142px;
  height: 238px;
  position: absolute;
  top: 886px;
  left: 4446px;
}

.access-animation {
  width: 4894px;
  height: 498px;
  position: absolute;
  top: 724px;
  left: 844px;
}

.access-items {
  width: 5700px;
  height: 498px;
  position: absolute;
  top: 953px;
  left: 434px;
}

.access-item-text {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 99px;
  line-height: 129px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.access-item-unit-name {
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

.access-item {
  width: 660px;
  height: 498px;
  position: relative;
}

.access-item-status {
  width: 217px;
  height: 87px;
  background: linear-gradient(270deg, #277BC0 0%, rgba(39, 123, 192, 0) 70%);
  position: absolute;
  top: 275px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  .access-item-status-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 58px;
    line-height: 76px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.text-red {
  color: #FF9B83;
}

.text-gray {
  color: #E7E7E7;
}

.text-green {
  color: #7AFFAB;
}
</style>
