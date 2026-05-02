<!-- 图片轮播 -->
<template>
  <div class="basic-management-dialog">
    <div class="content-title">{{ title }}</div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column">
      <img :src="img" alt="" class="content-img">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  img: {
    type: String,
    default: ""
  }
})

// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

</script>

<style scoped lang="scss">
.basic-management-dialog {
  width: 1619px;
  height: 1109px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  right: 1257px;
  top: 383px;
  padding: 135px 80px 60px 80px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 60px;
}

.content-title {
  width: 500px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 10px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.content-img {
  width: 100%;
  height: 100%;
}
</style>
