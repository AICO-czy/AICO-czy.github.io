<!--大标题-->
<template>
  <div class="row items-center title-large">
    <div class="title-label">{{ props.title }}</div>
    <q-icon name="img:icons/cdsgl/videoSurveillance/组 43090.png" class="title-icon"></q-icon>
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
.title-label {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 58px;
  letter-spacing: 10px;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 42%, #83e0ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 20px;
}

.title-icon {
  width: 34px;
  height: 40px;
  margin-left: 36px;
}
</style>
