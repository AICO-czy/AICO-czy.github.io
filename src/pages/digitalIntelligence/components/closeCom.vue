<template>
  <div class="content-close cursor-pointer">
    <div class="close-icon"></div>
    <div class="close-text">返回</div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.content-close {
  width: 300px;
  height: 309px;
  background: url("assets/image/digitalIntelligence/dialog/closebg.png") no-repeat 100%/100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .close-icon {
    width: 93px;
    height: 93px;
    background: url("assets/image/digitalIntelligence/dialog/closeIcon.png") no-repeat 100%/100%;
  }

  .close-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 58px;
    line-height: 106px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
