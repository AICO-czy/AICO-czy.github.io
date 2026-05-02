<template>
  <div class="content-weather">
    <div class="mr-[45px] w-[88px] h-[72px] mt-[10px]">
      <img class="w-full h-full" :src="png1" alt="">
    </div>
    <div class="content-weather-icon"></div>
    <div style="margin-left: 22px;">18~28°C</div>
    <div style="margin-left: 42px;">晴转多云</div>
    <div style="margin-left: 82px;">2025.07.01</div>
    <div style="margin-left: 45px;">星期一</div>
    <div style="margin-left: 31px;">09:00:06</div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  defineAsyncComponent,
  reactive,
  nextTick,
  onBeforeMount,
  onMounted,
} from "vue";
const png1 = ref("images/cdsgl/weather/气象灾害预警信号图标_slices/Property 1=大风, Property 2=3级黄色.png");

</script>
<style scoped lang="scss">
.content-weather {
  position: absolute;
  top: 100px;
  right: 155px;
  display: flex;
  align-items: center;
  font-family: PangMenZhengDao, PangMenZhengDao;
  font-weight: 550;
  font-size: 55px;
  color: #C0D1DE;
  line-height: 81px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  pointer-events: all;
  z-index: 9990;

  .content-weather-icon {
    width: 81.59px;
    height: 82px;
    background-image: url("assets/component/其他天气汇总_slices/切图 82.png");
    background-size: 100% 100%;
  }
}
</style>
