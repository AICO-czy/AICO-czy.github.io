<template>
  <div class="magic-cube">
    <div id="intro-mf" class="intro-mf"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import lottie from "lottie-web";
import fofangJson from "assets/json/MOFANG.json";

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-mf"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: fofangJson,
  });
});

</script>

<style lang="scss" scoped>
.magic-cube {
  position: absolute;
  width: 711px;
  height: 711px;
  // background: skyblue;
  z-index: 101;
}

.intro-mf {
  width: 100%;
  height: 100%;
}
</style>
