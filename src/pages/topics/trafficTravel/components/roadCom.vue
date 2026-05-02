<template>
  <div class="road-box">
    <img class="img" v-if="road.danger" :src="png1" alt="">
    <img class="img icon" v-if="road.icon" :src="png2" alt="">
    <div>{{ road.content }}</div>
    <div>{{ road.cold }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const png1 = ref("")
const road = {
  danger: '暴雪',
  lv: '4级',
  icon: 'icon_raod',
  content: '多云转阴',
  cold: '19℃-29℃'
}

png1.value = new URL('../../../../assets/image/TransportationAndTravel/气象灾害预警信号图标_slices/' + formatUrl() + '.png', import.meta.url).href;
import png2 from "src/assets/image/TransportationAndTravel/icon_raod.png";

function formatUrl() {
  let danger = 'Property 1=' + road.danger
  let end = '红色'
  switch (road.lv) {
    case '1级':
      end = '1级红色'
      break;
    case '2级':
      end = '2级橙色'
      break;
    case '3级':
      end = '3级黄色'
      break;
    case '4级':
      end = '4级蓝色'
      break;

    default:
      break;
  }
  let lv = ', Property 2=' + end
  return danger + lv
}

</script>
<style lang="scss" scoped>
.road-box {
  position: absolute;
  top: 106px;
  right: 6.5%;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 52px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  display: flex;
  align-items: end;

  &>div {
    margin-right: 40px;
    margin-bottom: 10px;
  }

  img {
    width: 106.8px;
    height: 90.7px;
    margin-right: 40px;
  }

  .icon {
    width: 68px;
    height: 58px;
    margin-bottom: 10px;
  }
}
</style>
