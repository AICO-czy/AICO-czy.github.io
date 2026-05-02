<template>
  <div class="navigation-index">
    <div class="items-center justify-center navigation-heard row">
      <span>承德市交通运行监测调度中心</span>
    </div>
    <div class="navigation-top"></div>
    <div class="navigation-third">
      <div class="navigation-system-one" @click="handleClick('sectorIndex/1')"></div>
      <div class="navigation-system-two"></div>
      <div class="navigation-system-three" @click="handleClick('VideoSurveillancePage')"></div>
      <div class="navigation-system-four"></div>
    </div>
    <div id="navigation-middle" class="navigation-middle">
      <div id="navigation-middle-dev" class="navigation-middle-dev full-width full-height"></div>
      <div class="middle-butn1" @click="handleClick('GeographicInfoPage')">
      </div>
      <div class="middle-butn2" @click="handleClick('digitalIntelligence')">
      </div>
    </div>
    <div class="navigation-second-mask"></div>
    <div class="navigation-second">
      <!-- <section>
        <div class="planet">
          <div class="ball">
            <img :src="onePhoto" class="navigation-moudle-one" />
          </div>
        </div>
        <div class="navigation-second-grouup">
          <div>
            <img :src="onePhoto" class="navigation-moudle-one" />
          </div>
          <div>
            <img :src="twoPhoto" class="navigation-moudle-two" />
          </div>
          <div>
            <img :src="threePhoto" class="navigation-moudle-three" />
          </div>
          <div @click="handleClick('SectorIndex')">
            <img :src="fourPhoto" class="navigation-moudle-four" />
          </div>
          <div>
            <img :src="fivePhoto" class="navigation-moudle-five" />
          </div>
          <div>
            <img :src="sixPhoto" class="navigation-moudle-six" />
          </div>
          <div>
            <img :src="sevenPhoto" class="navigation-moudle-seven" />
          </div>
          <div @click="handleClick('TrafficTravel')">
            <img :src="eightPhoto" class="navigation-moudle-eight" />
          </div>
        </div>
      </section> -->
      <div class="passenger-group">
        <div class="passenger-avater-container">
          <div class="passenger-avater" v-show="item.visible" :class="`passenger-avater${i + 1}`" :key="i"
            v-for="(item, i) in state.groupList" @click="selectItem(item)"></div>
        </div>
      </div>
    </div>
    <div class="navigation-bottom">
      <div class="bottom-btn" @click="handleClick('dataCenter')"></div>
    </div>
    <div class="navigation-return" @click="handleClick('IntroPage')"></div>
    <div class="navigation-switch">
      <el-dropdown placement="top" dark virtual-ref virtual-triggering :teleported="false"
        class="bottom-dropdown full-width full-height" trigger="click">
        <div class="full-width full-height"></div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleClick('cpsjjc')">承平高速异常事件检测系统</el-dropdown-item>
            <el-dropdown-item @click="handleClick('cpbpjc')">承平高速边坡监测系统平台</el-dropdown-item>
            <el-dropdown-item @click="handleClick('jcssjc')">承德市基础设施监测系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="">
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import lottie from "lottie-web";
const router = useRouter();

import onePhoto from "assets/component/navigation/城市交通.png";
import twoPhoto from "assets/component/navigation/道（水）路运输.png";
import threePhoto from "assets/component/navigation/公路运营.png";
import fourPhoto from "assets/component/navigation/工程建设.png";
import fivePhoto from "assets/component/navigation/交通执法.png";
import sixPhoto from "assets/component/navigation/投诉处理.png";
import sevenPhoto from "assets/component/navigation/安全生产.png";
import eightPhoto from "assets/component/navigation/交旅融合.png";
import secondMask from "assets/component/navigation/第二层遮挡.png";

import animationJson from "assets/json/箭头.json";

const state = reactive({
  groupList: [
    {
      title: "城市交通",
      code: `sectorIndex/${4}`,
      visible: false,
      selected: false,
    },
    {
      title: "道（水）路运输",
      code: `sectorIndex/${3}`,
      visible: false,
      selected: false,
    },
    {
      title: "公路运营",
      code: `sectorIndex/${2}`,
      visible: false,
      selected: false,
    },
    {
      title: "工程建设",
      code: `sectorIndex/${1}`,
      visible: false,
      selected: false,
    },
    {
      title: "交旅融合",
      code: "TrafficTravel",
      visible: true,
      selected: false,
    },
    {
      title: "安全生产",
      code: "",
      visible: true,
      selected: false,
    },
    {
      title: "投诉处理",
      code: "ComplaintHandling",
      visible: true,
      selected: false,
    },
    {
      title: "交通执法",
      code: "TrafficLawEnforcement",
      visible: true,
      selected: false,
    },
  ] as any,
});

// // 控制方法
// animation.play(); // 播放
// animation.pause(); // 暂停
// animation.stop(); // 停止
// animation.setSpeed(1.5); // 设置速度
const selectItem = (val: any) => {
  // console.log(val);
  router.push(val.code);
  // if (val.code.indexOf("sectorIndex") !== -1) {
  //   window.open(val.code, "_blank");
  // } else {
  //   const routeData = router.resolve({
  //     name: val.code,
  //   });
  //   window.open(routeData.href, "_blank");
  // }
};

const handleClick = (val: any) => {
  if (val == "jcssjc") {
    window.open("http://cdsd.seefar.com.cn/", "_blank");
  } else if (val == "cpsjjc") {
    window.open("http://172.16.32.22:32000", "_blank");
  } else if (val == "cpbpjc") {
    window.open("https://everiaction.com:182/zjlj/#/login", "_blank");
  } else {
    router.push(val);
  }
};
onMounted(() => {
  // 加载动画
  const animation = lottie.loadAnimation({
    container: document.getElementById("navigation-middle-dev"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: animationJson,
    // path: "src/assets/json/箭头.json", // JSON文件路径
  });
});
</script>

<style scoped lang="scss">
.navigation-index {
  width: 100%;
  height: 100%;
  background-image: url("assets/component/navigation/背景.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  pointer-events: auto;
  display: flex;
  justify-content: center;

  .navigation-heard {
    width: 100%;
    height: 320px;
    position: absolute;
    background-image: url("assets/component/intro/标题.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    top: -120px;
    left: 0;

    span {
      font-family: SourceHanSansBold;
      font-size: 100px;
      line-height: 100px;
      color: #ffffff;
      font-style: italic;
      background: linear-gradient(180deg,
          #ffffff 0.68359375%,
          #ffffff 50%,
          #6dc6ff 100%);
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 60px;
      letter-spacing: 20px;
    }
  }

  .navigation-top {
    width: 1275.3px;
    height: 380.1px;
    background-image: url("assets/component/navigation/顶层.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 334px;
  }

  .navigation-third {
    width: 100%;
    height: 387px;
    background-image: url("assets/component/navigation/第三层.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 777px;
    display: flex;
    // justify-content: center;
    z-index: 2;

    .navigation-system-one {
      width: 772px;
      height: 239px;
      background-image: url("assets/component/navigation/监测与预警.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
      margin-left: 1852px;
    }

    .navigation-system-two {
      width: 772px;
      height: 240px;
      background-image: url("assets/component/navigation/应急指挥.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: 384px;
      margin-top: 45px;
      z-index: 3;
      cursor: pointer;
    }

    .navigation-system-three {
      width: 772px;
      height: 240px;
      background-image: url("assets/component/navigation/视频监控.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: 421px;
      cursor: pointer;
    }

    .navigation-system-four {
      display: none;
      width: 772px;
      height: 240px;
      background-image: url("assets/component/navigation/运行报告.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-left: 421px;
      cursor: pointer;
    }
  }

  .navigation-middle {
    width: 1182.5px;
    height: 1200.8px;
    background-image: url("assets/component/navigation/中间箭头.png");
    background-size: 100% 100%;
    position: absolute;
    top: 563px;
    z-index: 1;

    .middle-butn1 {
      width: 300px;
      height: 700px;
      background: transparent;
      top: 60px;
      left: 306px;
      position: absolute;
      z-index: 1;
      cursor: pointer;
    }

    .middle-butn2 {
      width: 250px;
      height: 670px;
      background: transparent;
      top: 60px;
      left: 624px;
      position: absolute;
      z-index: 1;
      cursor: pointer;
    }
  }

  .navigation-second-mask {
    width: 1161px;
    height: 230px;
    background-image: url("assets/component/navigation/第二层遮挡.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 1293px;
    left: 2815px;
    z-index: 2;
  }

  .navigation-second {
    width: 100%;
    height: 1053px;
    background-image: url("assets/component/navigation/第二层.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 1130px;
    // padding: 0px 300px;

    section {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 10000px;
      z-index: 2;

      // .planet {
      //   position: absolute;
      //   border: 2px solid #fff;
      //   transform-style: preserve-3d;
      //   width: 4000px;
      //   height: 4000px;
      //   top: -1980px;
      //   border-radius: 50%;
      //   animation: planet-rotate 20s linear infinite;
      // }
      // .ball {
      //   width: 435px;
      //   height: 549px;
      //   top: 500px;
      //   position: absolute;
      //   transform: scale(0.2);
      //   animation: self-rotate 20s linear infinite;
      // }
      .navigation-second-grouup {
        width: 100%;
        top: -500px;
        position: relative;
        transform-style: preserve-3d;
        animation: three-dimensions-circle 30s linear infinite;

        &:hover {
          animation-play-state: paused;
        }

        div {
          width: 435px;
          height: 549px;
          left: 50%;
          position: absolute;
          cursor: pointer;
          // margin-left: 130px;
          // margin-top: -100px;

          &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(45deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(2) {
            transform: translate(-50%, -50%) rotate(90deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(3) {
            transform: translate(-50%, -50%) rotate(135deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(4) {
            transform: translate(-50%, -50%) rotate(180deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(5) {
            transform: translate(-50%, -50%) rotate(225deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(6) {
            transform: translate(-50%, -50%) rotate(270deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(7) {
            transform: translate(-50%, -50%) rotate(315deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }

          &:nth-child(8) {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-2400px) rotateX(90deg) scale(0.7);
          }
        }
      }
    }

    .passenger-group {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .passenger-avater-container {
      width: 5100px;
      height: 1100px;
      position: relative;
      top: -340px;
      left: 400px;
    }

    .passenger-avater {
      width: 500px;
      height: 520px;
      text-align: center;
      overflow: hidden;
      position: absolute;
      cursor: pointer;
    }

    .passenger-avater-container:hover {
      .passenger-avater {
        animation-play-state: paused;
      }
    }

    .passenger-avater:hover {
      transform: scale(1) !important;
    }

    // .passenger-avater1 {
    //   background-image: url("assets/component/navigation/城市交通.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -8s infinite alternate,
    //     animY 16s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate,
    //     scale 32s cubic-bezier(0.36, 0, 0.64, 1) 0s infinite alternate;
    // }

    // .passenger-avater2 {
    //   background-image: url("assets/component/navigation/道（水）路运输.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -9s infinite alternate,
    //     animY 16s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate,
    //     scale 32s cubic-bezier(0.36, 0, 0.64, 1) -3s infinite alternate;
    // }

    // .passenger-avater3 {
    //   background-image: url("assets/component/navigation/公路运营.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -12s infinite alternate,
    //     animY 16s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate,
    //     scale 32s cubic-bezier(0.36, 0, 0.64, 1) -6s infinite alternate;
    // }

    // .passenger-avater4 {
    //   background-image: url("assets/component/navigation/工程建设.png");
    //   background-size: 100% 100%;
    //   background-repeat: no-repeat;
    //   animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -15s infinite alternate,
    //     animY 16s cubic-bezier(0.36, 0, 0.64, 1) -9s infinite alternate,
    //     scale 32s cubic-bezier(0.36, 0, 0.64, 1) -9s infinite alternate;
    // }

    .passenger-avater5 {
      background-image: url("assets/component/navigation/交旅融合1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -8s infinite alternate,
        animY 16s cubic-bezier(0.36, 0, 0.64, 1) -0s infinite alternate,
        scale 32s cubic-bezier(0.36, 0, 0.64, 1) -0s infinite alternate;
    }

    .passenger-avater6 {
      background-image: url("assets/component/navigation/安全生产1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -16s infinite alternate,
        animY 16s cubic-bezier(0.36, 0, 0.64, 1) -8s infinite alternate,
        scale 32s cubic-bezier(0.36, 0, 0.64, 1) -8s infinite alternate;
    }

    .passenger-avater7 {
      background-image: url("assets/component/navigation/投诉处理1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -24s infinite alternate,
        animY 16s cubic-bezier(0.36, 0, 0.64, 1) -16s infinite alternate,
        scale 32s cubic-bezier(0.36, 0, 0.64, 1) -16s infinite alternate;
    }

    .passenger-avater8 {
      background-image: url("assets/component/navigation/交通执法1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      animation: animX 16s cubic-bezier(0.36, 0, 0.64, 1) -32s infinite alternate,
        animY 16s cubic-bezier(0.36, 0, 0.64, 1) -24s infinite alternate,
        scale 32s cubic-bezier(0.36, 0, 0.64, 1) -24s infinite alternate;
    }

    .avater-title {
      width: 100%;
      text-align: center;
      font-size: 48px;
      font-family: SourceHanSansRegular;
      font-weight: 400;
      color: #ffffff;
      line-height: 72px;
      position: absolute;
    }

    @keyframes three-dimensions-circle {
      0% {
        transform: rotateX(-95deg) rotate(0);
      }

      100% {
        transform: rotateX(-95deg) rotate(-360deg);
      }
    }

    @keyframes animX {
      0% {
        left: 0px;
      }

      100% {
        left: 3800px;
      }
    }

    @keyframes animY {
      0% {
        top: 0px;
      }

      100% {
        top: 300px;
      }
    }

    @keyframes scale {
      0% {
        z-index: 0;
        transform: scale(0.6);
      }

      50% {
        z-index: 3;
        transform: scale(1);
      }

      100% {
        z-index: 0;
        transform: scale(0.6);
      }
    }
  }

  .navigation-bottom {
    width: 100%;
    height: 761px;
    background-image: url("assets/component/navigation/底层.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 1423px;
    z-index: 3;
    cursor: pointer;

    .bottom-btn {
      width: 1500px;
      height: 250px;
      background: transparent;
      top: 220px;
      left: 2600px;
      position: absolute;
      z-index: 3;
      cursor: pointer;
    }
  }

  .navigation-return {
    width: 727px;
    height: 261px;
    background-image: url("assets/component/navigation/返回按钮.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 1871px;
    left: 367px;
    z-index: 3;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  .navigation-switch {
    width: 731px;
    height: 262px;
    background-image: url("assets/component/navigation/系统切换.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top: 1871px;
    right: 309px;
    z-index: 3;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }

    :deep(.el-dropdown__popper.el-popper) {
      background-color: transparent;
    }

    :deep(.el-popper.is-light,
      .el-popper.is-light>.el-popper__arrow:before) {
      border: unset !important;
      background: transparent !important;
    }

    :deep(.el-popper__arrow:before) {
      border: unset !important;
      background: transparent !important;
    }

    .el-dropdown-menu {
      background-color: transparent;
    }

    :deep(.el-dropdown-menu__item) {
      font-size: 48px !important;
      line-height: 56px !important
    }
  }
}
</style>
