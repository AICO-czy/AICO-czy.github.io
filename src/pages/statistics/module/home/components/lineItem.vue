<template>
  <div class="line-item">
    <img v-if="roundName && roundNum" :src="png1" alt="">
    <div v-if="roundName && roundNum" class="text-name">
      <div>{{ roundName }}</div>
      <div>&nbsp;&nbsp;&nbsp;桩号:{{ roundNum }}</div>
    </div>
  </div>
</template>

<script setup>
import png1 from "src/assets/component/statistics/切图 525.png";
const props = defineProps({
  roundName: {
    type: String,
    default: '交调站1'
  },
  roundNum: {
    type: String,
    default: 'K060+500'
  }
})
</script>

<style lang="scss" scoped>
.line-item {
  position: relative;
  width: 800px;
  display: flex;
  align-items: center;
  flex-direction: column;

  &>img {
    width: 119px;
    height: 119px;
  }

  &>.text-name {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 800px;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 50px;
    color: #A9CEE8;
    line-height: 72px;
  }
}
</style>
