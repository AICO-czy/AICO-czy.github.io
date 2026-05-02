<!-- 右边按钮组 -->
<template>
  <!-- <q-dialog :model-value="true" seamless> -->
  <div class="right-btn-box">
    <div class="bg">
      <div class="item" v-for="item in data1">
        <div class="icon" :style="{ '--selfColor': item.color }"></div>
        <div class="name">{{ item.name }}</div>
        <div><check-com v-model="item.value" /></div>
      </div>
    </div>
    <div class="bg2">
      <div class="item" v-for="item in data2">
        <div class="img">
          <img class="img" :src="item.icon" alt="">
        </div>
        <div class="name">{{ item.name }}</div>
        <div><check-com v-model="item.value" /></div>
      </div>
      <!-- <div><check-com /></div> -->
    </div>
  </div>
  <!-- </q-dialog> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CheckCom from './checkCom.vue'

let data1 = ref([
  {
    name: "1号风景大道",
    value: true,
    color: '#03FFB8'
  }, {
    name: "旅游环线",
    value: false,
    color: '#61FCFF'
  }, {
    name: "红色旅游路",
    value: false,
    color: '#F9FF41'
  }, {
    name: "美丽乡村路",
    value: false,
    color: '#05BDF0'
  }
])

import png1 from 'src/assets/image/TransportationAndTravel/icon.png';
import png2 from 'src/assets/image/TransportationAndTravel/icon_1.png';
import png3 from 'src/assets/image/TransportationAndTravel/icon_2.png';
import png4 from 'src/assets/image/TransportationAndTravel/icon_3.png';
import png5 from 'src/assets/image/TransportationAndTravel/icon_4.png';
import png6 from 'src/assets/image/TransportationAndTravel/icon_5.png';
import png7 from 'src/assets/image/TransportationAndTravel/icon_6.png';

let data2 = ref([
  {
    name: '五大旅游团',
    value: false,
    icon: png1
  },
  {
    name: '典型示范路',
    value: false,
    icon: png2
  },
  {
    name: '服务设施',
    value: false,
    icon: png3
  },
  {
    name: '旅游资源',
    value: false,
    icon: png4
  },
  {
    name: '公路预警',
    value: false,
    icon: png5
  },
  {
    name: '交通路况',
    value: false,
    icon: png6
  },
  {
    name: '交调站',
    value: false,
    icon: png7
  },
])


</script>

<style lang="scss" scoped>
// .q-dialog__inner--minimized>div {
//   max-width: 316px !important;
//   overflow: none !important;
//   min-height: 242px !important;
// }

// .q-dialog__inner>div {
//   overflow: visible !important;
// }

.right-btn-box {
  position: absolute;
  right: 958px;
  bottom: 154px;
  width: 316px;
  height: 720px;
  transition: all 0.2s ease;
  z-index: 99999 !important;
  pointer-events: all;
}

.bg {
  width: 316px;
  height: 250px;
  background-color: rgba(#018C87, .4);
  border-radius: 8px;
  position: absolute;
  right: 0%;
  top: 0;
  padding: 20px 15px;
  box-shadow: inset 0px 8px 14px 0px rgba(5, 175, 207, 0.48), 0px 0px 18px 0px rgba(0, 0, 0, 0.35);
}

.bg2 {
  width: 316px;
  height: 436px;
  background-color: rgba(#018C87, .4);
  border-radius: 8px;
  position: absolute;
  right: 0%;
  bottom: 0%;
  padding: 20px 15px;
  box-shadow: inset 0px 8px 14px 0px rgba(5, 175, 207, 0.48), 0px 0px 18px 0px rgba(0, 0, 0, 0.35);
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 55px;

  .icon {
    width: 48px;
    height: 10px;
    background-color: var(--selfColor)
  }

  .img {
    // background: url(val(--selfIcon)) no-repeat center/cover;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 40px;
    height: 40px;
  }

  .name {
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 500;
    font-size: 32px;
    color: #FAFCFF;
    // line-height: 45px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>
