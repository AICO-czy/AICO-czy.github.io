<template>
  <router-view />
</template>

<script setup lang="ts">
import autofit from "src/utils/autofit";
import { onMounted, provide, nextTick, ref } from "vue";
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
onMounted(() => {
  autofit.init({
    dh: 2184,
    dw: 6656,
    el: "body",
    resize: true,
  });
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #081452;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  transform: translate3d(0, 0, 0);
}

#q-app {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: space-between;
  pointer-events: none;
}

.q-notification {
  font-size: 48px !important;
}

.q-notification__actions {
  justify-content: space-around;
  .q-btn {
    min-height: 40px !important;
    width: 200px !important;
    font-size: 40px !important;
    border-radius: 20px !important;
  }
}
</style>
