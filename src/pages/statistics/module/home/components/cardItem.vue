<template>
  <div class="bg-card">
    <div :class="title" v-if="title"></div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.bg-card {
  width: 1764px;
  height: 674px;
  background: url('assets/component/statistics/切图 524.png') no-repeat 100% 100%;
  padding: 38px 46px;
}

.交通量 {
  width: 249px;
  height: 71px;
  background: url('assets/component/statistics/切图 515.png') no-repeat 100% 100%;
}

.车型 {
  width: 198px;
  height: 71px;
  background: url('assets/component/statistics/切图 516.png') no-repeat 100% 100%;
}

.平均速度{
  width: 300px;
  height: 71px;
  background: url('assets/component/statistics/切图 517.png') no-repeat 100% 100%;

}
</style>
