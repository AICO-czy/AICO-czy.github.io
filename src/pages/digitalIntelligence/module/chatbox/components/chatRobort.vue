<template>
  <div class="robort-box">
    <div id="intro-jqr" class="intro-jqr"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import lottie from "lottie-web";
import fofangJson from "assets/json/jiqiren.json";
onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-jqr"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: fofangJson,
  });
});
</script>

<style lang="scss" scoped>
.robort-box {
  width: 416px;
  height: 583px;
  // background: skyblue;
  position: relative;
  transform: translate(-50%);
}

.intro-jqr {
  width: 100%;
  height: 100%;
}
</style>
