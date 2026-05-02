<template>
  <div :class="btnType == 1 ? 'bg1' : 'bg2'">
    <div class="btn-item">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  btnType: {
    type: String,
    default: '1'
  },
  detail:{
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.bg1 {
  width: 456.16px;
  height: 451.3px;
  line-height: 430px;
  // background: url('assets/image/digitalIntelligence/btnBg2.png') no-repeat center/cover;
  position: absolute;
}

.bg2 {
  width: 481.65px;
  height: 478px;
  line-height: 460px;
  // background: url('assets/image/digitalIntelligence/btnBg1.png') no-repeat center/cover;
  position: absolute;
}

.btn-item {
  font-family: HarmonyOS Sans SC, HarmonyOS Sans SC;
  font-weight: 400;
  font-size: 83px;
  letter-spacing: 8px;
  text-shadow: 0px 6px 8px #042F4A;
  text-align: center;
  font-style: normal;
  text-transform: none;
  color: #D2F9FF
}
</style>
