<template>
  <div class="modle-index">
    <div class="top-btn">
      <div class="chat-btn" @click="activeTypeStore.setActiveBtn(1)">
        <span>交通智能助手</span>
      </div>
      <div class="large-model-btn active">
        <span>交通垂直大模型</span>
      </div>
    </div>
    <!-- 旋转模块 -->
    <div class="swiper-model">
      <swiper-model />
    </div>
    <!-- 魔方 -->
    <magic-cube class="top-[15%] left-[40%]" />
    <!-- 底部光效 -->
    <bottom-line class="bottom-[10%]" />
  </div>
</template>

<script setup lang="ts">
import { useActiveTypeStore } from "../../store/activeType";
import MagicCube from './components/magicCube.vue'
import BottomLine from './components/btnLine.vue'
import SwiperModel from './components/swiperModel.vue'

const activeTypeStore = useActiveTypeStore();
</script>

<style lang="scss" scoped>
.modle-index {
  position: relative;
  width: 3729px;
  height: 1894px;
  top: 12%;
  left: 50%;
  transform: translate(-50%);
  background: url('assets/image/digitalIntelligence/bg2.png') no-repeat center/cover;
  z-index: 99;
}

.top-btn {
  position: absolute;
  // background: skyblue;
  left: 50%;
  transform: translateX(-50%);
  width: 2800px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  pointer-events: all;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 66px;
    line-height: 106px;
    letter-spacing: 5px;
    font-style: normal;
    text-transform: none;
  }

  &>.chat-btn {
    width: 800px;
    height: 129px;
    background: url('assets/image/digitalIntelligence/topLeftBtn.png') no-repeat center/cover;

    span {
      text-shadow: 0px 4px 8px #0085D6;
      background: linear-gradient(180deg, #FFFFFF 80%, #B9EEFF 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  }

  &>.large-model-btn {
    width: 800px;
    height: 129px;
    background: url('assets/image/digitalIntelligence/topRightBtn.png') no-repeat center/cover;

    span {
      text-shadow: 0px 4px 8px #0085D6;
      background: linear-gradient(180deg, #FFFFFF 80%, #B9EEFF 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &.active {
      background: url('assets/image/digitalIntelligence/topRightBtnA.png') no-repeat center/cover;
      height: 153px;

      &>span {
        background: linear-gradient(180deg, #FFFFFF 30%, #FFDD8E 69%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0px 4px 8px #D68000;
      }
    }
  }
}

.swiper-model {
  z-index: 999;
}
</style>
