<!--小标题-->
<template>
  <div class="row items-center title-small">
    <div class="col">
      <div class="title-label"> {{ props.title }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="titleSmall">
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>
<style scoped>
.title-small {
  width: 100%;
  height: 64px;
  background-image: url("assets/image/cdsgl/title/小标题5.png");
  background-size: 100% 100%;
}

.title-label {
  padding-left: 20px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 48px;
  color: #ffffff;
  line-height: 56px;
  letter-spacing: 4px;
  text-shadow: 0px 8px 8px rgba(0, 0, 0, 0.25);
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: url('');
}
</style>
