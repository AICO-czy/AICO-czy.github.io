<template>
  <div class="title-section">
    <div class="title-text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* 标题样式按原有 */
.title-section {
  height: 74px;
  background: url("assets/image/lefty/title_bg.png") no-repeat;
  display: flex;
  align-items: center;
  position: relative;
}

.title-text {
  position: absolute;
  top: -25px;
  left: 100px;
  font-family: AlibabaPuHuiTiBold;
  font-weight: 700;
  font-size: 54px;
  line-height: 74px;
  letter-spacing: 2px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #C8D7E4 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: skewX(-10deg);
}
</style>
