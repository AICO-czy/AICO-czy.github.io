<template>
  <div class="btn-legend" @click="handleClick">
    <div v-if="btntype == 'circle'" class="btn-wapper-bg1 btn-wapper" :class="modelValue ? 'active' : ''">
      <div class="btn-icon info-icon1">
        <q-img :src="`icons/切图-地理信息全要素一张图_slices/${icon}.png`" spinner-color="white" class="info-icon1"></q-img>
      </div>
      <div class="btn-text">
        <slot />
      </div>
    </div>
    <div v-else-if="btntype == 'square'" class="btn-wapper-bg2 btn-wapper" :class="modelValue ? 'active' : ''">
      <div class="btn-line info-icon2">
        <q-img v-if="imgType == 'img'" :src="`icons/切图-地理信息全要素一张图_slices/${icon}.png`" spinner-color="white"
          class="info-icon"></q-img>
        <div v-else :style="{ background: icon, width: '59px', height: '8px', marginTop: '6px' }"></div>
      </div>
      <div class="btn-text">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  btntype: {
    type: String,
    default: 'circle'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  imgType: {
    type: Boolean,
    default: 'img'
  },
  icon: {
    type: String,
    default: ''
  }
})

const $emit = defineEmits([
  'update:modelValue'
])

function handleClick() {
  // console.log('事件触发');

  $emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
.btn-legend {
  width: 370px;
  height: 90px;
  margin-bottom: 20px;
  pointer-events: all;

  .btn-wapper {
    display: flex;
    align-items: center;
  }

  .btn-wapper-bg1 {
    width: 100%;
    height: 100%;
    background: url('assets/component/切图-地理信息全要素一张图_slices/组 43026.png') no-repeat center/cover;

    &.active {
      background: url('assets/component/切图-地理信息全要素一张图_slices/组 43023.png') no-repeat center/cover;
    }
  }

  .btn-wapper-bg2 {
    width: 100%;
    height: 100%;
    background: url('assets/component/切图-地理信息全要素一张图_slices/组 43041.png') no-repeat center/cover;

    &.active {
      background: url('assets/component/切图-地理信息全要素一张图_slices/组 43065.png') no-repeat center/cover;
    }
  }

  .btn-icon {
    // width: 40px;
    // height: 40px;
    // background: skyblue;
    margin-left: 43px;
  }

  .info-icon1 {
    width: 40px;
    height: 40px;
  }

  .info-icon2 {
    width: 48px;
    height: 55.38px;
    min-height: 20px;
    ;
  }

  .btn-line {
    display: flex;
    align-items: center;
    width: 59px;
    height: 20px;
    margin-left: 43px;
  }

  .btn-text {
    flex: 1;
    // font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    // font-weight: 700;
    // font-size: 36px;
    // line-height: 90px;
    // text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
    // text-align: center;
    // font-style: normal;
    // text-transform: none;
    // background: linear-gradient(180deg, #FAFDFF 0%, #AEE3F5 100%);
    // background-clip: text;
    // -webkit-text-fill-color: transparent;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 700;
    font-size: 32px;
    color: #FAFCFF;
    line-height: 46px;
    letter-spacing: 12px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
