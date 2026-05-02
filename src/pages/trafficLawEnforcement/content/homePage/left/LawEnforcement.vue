<template>
  <div class="lawEnforcement-content">
    <div class="lawEnforcement-content-box column gap-[10px]">
      <div class="lawEnforcement-content-topS row justify-evenly items-center">
        <div class="lawEnforcement-content-topS-item" :class="{ 'topS-item-active': activeItem === '1' }"
          @click="activeItem = '1'">规范执法行为</div>
        <div class="lawEnforcement-content-topS-line"></div>
        <div class="lawEnforcement-content-topS-item" :class="{ 'topS-item-active': activeItem === '2' }"
          @click="activeItem = '2'">优化执法方式</div>
        <div class="lawEnforcement-content-topS-line"></div>
        <div class="lawEnforcement-content-topS-item" :class="{ 'topS-item-active': activeItem === '3' }"
          @click="activeItem = '3'">细化行政裁量</div>
      </div>
      <div class="lawEnforcement-content-item col" v-if="activeItem === '1'">
        <LawItem1 />
      </div>
      <div class="lawEnforcement-content-item col" v-if="activeItem === '2'">
        <LawItem2 />
      </div>
      <div class="lawEnforcement-content-item col" v-if="activeItem === '3'">
        <LawItem3 />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const LawItem1 = defineAsyncComponent(() => import("./components/LawItem1.vue"));
const LawItem2 = defineAsyncComponent(() => import("./components/LawItem2.vue"));
const LawItem3 = defineAsyncComponent(() => import("./components/LawItem3.vue"));

const activeItem = ref("1");

</script>

<style scoped lang="scss">
.lawEnforcement-content {
  width: 100%;
  height: 100%;
  padding: 68px 65px 52px;
}

.lawEnforcement-content-box {
  width: 100%;
  height: 100%;
}

.lawEnforcement-content-topS {
  width: 100%;

  .lawEnforcement-content-topS-item {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 36px;
    color: #C2D2D4;
    line-height: 45px;
    text-shadow: 2px 4px 8px #0D5E6C;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .topS-item-active {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 700;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 50px;
    text-shadow: 2px 4px 8px #0D5E6C;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(270deg, rgba(45, 162, 224, 0) 3%, rgba(45, 162, 224, 0.6) 52%, rgba(45, 162, 224, 0) 100%);
    border-radius: 0px 0px 0px 0px;
  }

  .lawEnforcement-content-topS-line {
    width: 0px;
    height: 30px;
    border: 4px solid rgba(111, 182, 202, 0.91);
  }
}

.lawEnforcement-content-item {
  width: 100%;
}
</style>
