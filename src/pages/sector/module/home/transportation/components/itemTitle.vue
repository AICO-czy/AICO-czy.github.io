<template>
  <div class="bg">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>

<style lang="scss" scoped>
.bg {
  background: url('assets/image/lefty/切图 48.png') no-repeat 100%/100%;
  height: 80px;
  width: 628px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 40px;
  color: #F2FEFF;
  line-height: 55px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  position: relative;
  .title{
    position: absolute;
    left: 50px;
    width: 100%;
  }
}
</style>
