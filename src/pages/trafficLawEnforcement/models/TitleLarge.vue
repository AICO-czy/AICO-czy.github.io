<!--大标题-->
<template>
  <div class="row title-large">
    <div class="title-label">{{ props.title }}</div>
  </div>
</template>
<script setup lang="ts" name="titleLarge">
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>
<style scoped>
.title-large {
  width: 1030px;
  height: 68px;
  background-image: url('assets/image/trafficLawEnforcement/bigTittle.png');
  background-size: 100% 100%;
  position: relative;
}

.title-label {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 54px;
  line-height: 54px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: absolute;
  top: -15px;
  left: 105px;
}
</style>
