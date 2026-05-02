<!--承德市交通运行监测调度中心-项目简介-->
<template>
  <div class="intro-page">
    <div class="items-center justify-center intro-heard row">
      <span>承德市交通运行监测调度中心</span>
    </div>
    <div class="intro-bggx"></div>
    <div id="intro-dl" class="intro-dl"></div>
    <div class="intro-dl-mask"></div>
    <div id="intro-sd" class="intro-sd"></div>
    <div class="intro-sdg"></div>
    <div class="intro-sdk"></div>
    <div class="intro-textbg">
      <p class="intro-text">
        承德市大力发展公路交通运输事业， 整体路网已实现市区到周边城市、
        市区到县城、县城到乡镇、县城到主要旅游景区运行时间不超过
        <span><span class="intro-text-num">2</span>小时</span>
        的交通圈， 以市区为中心,辐射各县区的高速公路主骨架已基本形成。 截至
        <span><span class="intro-text-num">2025</span>年<span class="intro-text-num">4</span>月</span>， 全市公路总里程达到
        <span><span class="intro-text-num">2.52</span>万公里</span>， 居
        <span>全省第一</span>。 建成高速公路 <span><span class="intro-text-num">816.7</span>公里</span>。
        普通干线公路里程达 <span><span class="intro-text-num">2919</span>公里</span>， 居
        <span>全省第二</span>
        。农村公路总里程突破
        <span><span class="intro-text-num">2.15</span>万公里</span>
        ，居全省第一。承德市正在全力打造以高速公路为主骨架、普通干线公路为主动脉、
        农村公路全覆盖的网状公路格局，进一步凸显
        <span>“一市连五省”</span>
        的独特区位优势。
      </p>
      <p class="intro-text">
        承德市交通运行监测调度中心，
        通过汇聚整合全市公路、水路、两客危一重、公交、出租、驾培、汽修等行业要素，
        构建
        <span>“123+N”</span>体系框架
        ，形成覆盖承德全行业治理能力智慧化应用。承担承德市交通运输局
        <span>“信息协同中枢、智慧赋能中枢”</span>
        作用。
      </p>
    </div>
    <div class="intro-sjd2019"></div>
    <div class="intro-sjd2020"></div>
    <div class="intro-sjd2021"></div>
    <div class="intro-sjd2022"></div>
    <div class="intro-sjd2023"></div>
    <div class="intro-sjd2024"></div>
    <div class="click-range z-top" @click="handleClick"></div>
  </div>
</template>
<script setup lang="ts" name="IntroPage">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import lottie from "lottie-web";
const router = useRouter();

const state = reactive({
  courseData: [
    {
      time: "2024.08",
      title: "立项",
      active: true,
      finally: false,
      icon: "img:icons/cdsgl/intro/时间轴.svg",
      describe: [],
    },
    {
      time: "2024.09",
      title: "招标",
      active: true,
      finally: false,
      icon: "img:icons/cdsgl/intro/时间轴.svg",
      describe: [],
    },
    {
      time: "2024.10",
      title: "建设",
      active: true,
      finally: false,
      icon: "img:icons/cdsgl/intro/时间轴.svg",
      describe: [
        "数据共享交换中心",
        "视频监控管理平台",
        "地理信息全要素一张图",
        "综合交通运行监测与预警系统",
        "协调联动与应急指挥系统",
      ],
    },
    {
      time: "2024.12",
      title: "上线",
      active: true,
      finally: false,
      icon: "img:icons/cdsgl/intro/时间轴.svg",
      describe: [],
    },
    {
      time: "2025.01",
      title: "验收",
      active: true,
      finally: false,
      icon: "img:icons/cdsgl/intro/时间轴.svg",
      describe: [],
    },
    // {
    //   time: "",
    //   title: "",
    //   active: false,
    //   finally: true,
    //   icon: "img:icons/cdsgl/intro/时间轴logo.svg",
    //   describe: [],
    // },
  ],
});

import daoluJson from "assets/json/道路liuguang.json";
// import daoluJson from "assets/json/屏幕旋转.json";
// import fofangJson from "assets/json/魔方.json";

import suidaoJson from "assets/json/隧道旋转.json";
const handleClick = () => {
  // const routeData = router.resolve({
  //   name: "Navigation",
  // });
  // window.open(routeData.href, "_blank");
  router.push({ name: "Navigation" });
};
onMounted(() => {
  // 加载动画
  lottie.loadAnimation({
    container: document.getElementById("intro-dl"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: daoluJson,
  });
  lottie.loadAnimation({
    container: document.getElementById("intro-sd"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: suidaoJson,
  });
});
</script>
<style scoped lang="scss">
.intro-page {
  width: 100%;
  height: 100%;
  background-image: url("assets/component/intro/项目简介背景.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  z-index: 1;
  pointer-events: auto;
}

.intro-bggx {
  width: 6123px;
  height: 100%;
  position: absolute;
  background-image: url("assets/component/intro/背景光线.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 0;
  top: 0;
  z-index: 2;
}

.intro-dl {
  width: 100%;
  height: 1723px;
  position: absolute;
  background-image: url("assets/component/intro/背景道路.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  bottom: 0;
  z-index: 6;
}

.intro-dl-mask {
  width: 1621px;
  height: 759px;
  position: absolute;
  background-image: url("assets/component/intro/道路遮挡.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  top: 746px;
  right: 290px;
  z-index: 5;
}

.intro-sd {
  width: 2961px;
  height: 2067px;
  position: absolute;
  // background-image: url("assets/component/intro/背景隧道.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  right: 0px;
  z-index: 4;
}

.intro-sdg {
  width: 2961px;
  height: 2067px;
  position: absolute;
  background-image: url("assets/component/intro/背景隧道光.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  right: 0px;
  bottom: 117px;
  z-index: 5;
}

.intro-sdk {
  width: 2961px;
  height: 2067px;
  position: absolute;
  background-image: url("assets/component/intro/背景隧道口.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  right: 0px;
  bottom: 117px;
  z-index: 6;
}

.intro-textbg {
  width: 1496px;
  height: 1639px;
  position: absolute;
  background-image: url("assets/component/intro/文字背板.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 371px;
  top: 545px;
  z-index: 7;
  padding: 140px 130px 691px 140px;
}

.intro-text {
  font-family: SourceHanSansRegular;
  // font-weight: 400;
  font-size: 35px;
  color: #E2F0FF;
  line-height: 68px;
  text-indent: 2em;
  letter-spacing: 4px;
}

.intro-text>span {
  font-family: SourceHanSansHeavy;
  // font-weight: 400;
  font-size: 35px;
  color: #4ECFEA;

  .intro-text-num {
    font-family: DDIN !important;
    font-weight: bold;
    font-size: 40px !important;
  }
}


.intro-sjd2019 {
  width: 856.2px;
  height: 893.3px;
  position: absolute;
  background-image: url("assets/component/intro/2019.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 2125px;
  bottom: 0;
  z-index: 8;
  // transform: rotateX(30deg);
}

.intro-sjd2020 {
  width: 1228.9px;
  height: 597.4px;
  position: absolute;
  background-image: url("assets/component/intro/2020.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 3485.7px;
  bottom: 0;
  z-index: 9;
  // transform: rotateX(30deg);
}

.intro-sjd2021 {
  width: 566.5px;
  height: 772.2px;
  position: absolute;
  background-image: url("assets/component/intro/2021.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 3861.9px;
  bottom: 428px;
  z-index: 10;
  // transform: rotateX(30deg);
}

.intro-sjd2022 {
  width: 1218px;
  height: 688px;
  position: absolute;
  background-image: url("assets/component/intro/2022.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 4575px;
  bottom: 378px;
  z-index: 11;
  // transform: rotateX(30deg);
}

.intro-sjd2023 {
  width: 468px;
  height: 579px;
  position: absolute;
  background-image: url("assets/component/intro/2023.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 4861px;
  bottom: 815px;
  z-index: 12;
  // transform: rotateX(30deg);
}

.intro-sjd2024 {
  width: 833px;
  height: 565px;
  position: absolute;
  background-image: url("assets/component/intro/2024.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  left: 5425px;
  bottom: 803px;
  z-index: 13;
  // transform: rotateX(30deg);
}

.intro-heard {
  width: 100%;
  height: 320px;
  position: absolute;
  background-image: url("assets/component/intro/标题.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  top: -120px;
  left: 0;
  z-index: 20;
}

.intro-heard>span {
  font-family: SourceHanSansBold;
  // font-weight: bold;
  font-size: 100px;
  line-height: 100px;
  color: #ffffff;
  font-style: italic;
  // text-shadow: 0px 8px 6px rgba(113, 189, 252, 0.6);
  background: linear-gradient(180deg,
      #ffffff 0.68359375%,
      #ffffff 50%,
      #6dc6ff 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 60px;
  letter-spacing: 20px;
}

/* 水平流光线条 */
.line-horizontal1 {
  width: 50%;
  height: 16px;
  background: linear-gradient(90deg,
      transparent,
      #00f1fb,
      #0485c2,
      transparent);
  background-size: 200% 100%;
  animation: 流光 4s linear infinite;
  transform: rotate(-37deg);
  position: absolute;
  right: 150px;
  bottom: 0;
  overflow: hidden;
  opacity: 0.4;
}

/* 水平流光线条 */
.line-horizontal2 {
  width: 60%;
  height: 16px;
  background: linear-gradient(90deg,
      transparent,
      #00f1fb,
      #0485c2,
      transparent);
  background-size: 200% 100%;
  position: absolute;
  transform: rotate(-30deg);
  animation: 流光 4s linear infinite;
  right: 290px;
  bottom: 210px;
  overflow: hidden;
  opacity: 0.4;
}

/* 水平流光线条 */
.line-horizontal3 {
  width: 150%;
  height: 16px;
  background: linear-gradient(90deg,
      transparent,
      #00f1fb,
      #0485c2,
      transparent);
  background-size: 200% 100%;
  animation: 流光 4s linear infinite;
  transform: rotate(-14deg);
  position: absolute;
  right: 400px;
  bottom: 100px;
  overflow: hidden;
  opacity: 0.4;
}

/* 动画定义 */
@keyframes 流光 {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.click-range {
  width: 500px;
  height: 500px;
  // border: 1px solid #0485c2;
  border-radius: 200px;
  background-color: transparent;
  position: absolute;
  right: 260px;
  top: 460px;
  cursor: pointer;
}
</style>
