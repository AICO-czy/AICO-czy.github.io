<template>
  <div class="row items-center large-title">
    <div class="col large-title-val">{{ props.title }}</div>
  </div>
</template>
<script setup lang="ts" name="LargeTitle">

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<style scoped>
.large-title {
  width: 95%;
  height: 126px;
  padding-left: 12%;
  background: url('assets/image/trafficTravel/大标题背景.png');
  background-size: 100% 100%;
}

.large-title-val {
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 60px;
  color: #FFFFFF;
  line-height: 84px;
  letter-spacing: 12px;
  text-shadow: 0px 11px 8px rgba(0, 0, 0, 0.3);
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
