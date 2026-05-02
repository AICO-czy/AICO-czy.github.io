<template>
  <div class="dialog-con">
    <div class="title"><slot name="title"/></div>
    <div class="con"><slot/></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.dialog-con {
  width: 100%;
  height: 100%;
  position: relative;

  // background: pink;
  .title {
    position: absolute;
    right: 30px;
    // top: 50%;
    height: 100%;
    // transform: translateY(-50%);
    // background: skyblue;
    font-family: DingTalk JinBuTi, DingTalk JinBuTi;
    font-weight: 400;
    font-size: 62px;
    letter-spacing: 20px;
    color: #D1F4FF;
    text-shadow: 0px 4px 4px #042F4A;
    font-style: normal;
    text-transform: none;
    writing-mode: vertical-rl;
    /*兼容其他旧版本的浏览器 */
    -webkit-writing-mode: vertical-rl;
    text-align: center;
    // line-height: 100%;
  }

  .con{
    width: auto;
    height: 100%;
    // background: pink;
    margin-right: 165px;
  }
}
</style>
