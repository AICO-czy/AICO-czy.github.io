<template>
  <div class="content-close cursor-pointer">
    <div class="close-icon"></div>
    <div class="close-text">查看</div>
    <div class="close-text">知识源</div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.content-close {
  width: 300px;
  height: 376px;
  background: url("assets/image/digitalIntelligence/dialog/zsybg.png") no-repeat 100%/100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .close-icon {
    width: 93px;
    height: 93px;
    background: url("assets/image/digitalIntelligence/dialog/zsyIcon.png") no-repeat 100%/100%;
  }

  .close-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 58px;
    line-height: 80px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
