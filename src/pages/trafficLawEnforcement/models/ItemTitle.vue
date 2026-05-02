<template>
  <div class="bg" :style="{ width: width }">
    <div class="title" :title="title" :style="{ fontSize: size + 'px' }">
      {{ title }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  size: {
    type: Number,
    default: 36
  },
  width: {
    type: String,
    default: '100%'
  }
})
</script>

<style lang="scss" scoped>
.bg {
  background: url('assets/image/trafficLawEnforcement/itemTittle.png') no-repeat 100%/100%;
  height: 42.45px;
  width: 70%;

  text-transform: none;
  position: relative;

  .title {
    width: 100%;
    height: 100%;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 36px;
    color: #F2FEFF;
    line-height: 36px;
    text-align: left;
    font-style: normal;
    position: absolute;
    left: 40px;
    top: -5px;
    white-space: nowrap;
    /* 2. 隐藏超出容器的内容 */
    overflow: hidden;
    /* 3. 超出部分显示省略号 */
    text-overflow: ellipsis;
  }
}
</style>
