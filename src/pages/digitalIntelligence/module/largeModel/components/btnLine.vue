<template>
  <div class="bottom-line">
    <div id="intro-gh" class="intro-gh"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import lottie from "lottie-web";
import fofangJson from "assets/json/光环.json";

onMounted(() => {
  lottie.loadAnimation({
    container: document.getElementById("intro-gh"), // DOM元素
    renderer: "svg", // 可选'svg'、'canvas'或'html'
    loop: true, // 循环播放
    autoplay: true, // 自动播放
    animationData: fofangJson,
  });
});

</script>

<style lang="scss" scoped>
.bottom-line {
  position: absolute;
  width: 100%;
  height: 72.5%;
  // background: pink;
}

.intro-gh {
  width: 100%;
  height: 100%;
}
</style>
