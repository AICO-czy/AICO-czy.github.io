<!--智慧工地监管平台-主体内容-->
<template>
  <div class="content-container">
    <!--顶部弹窗-->
    <q-dialog v-model="state.topdialog" seamless position="top" transition-hide="slide-top" class="top-page-dialog">
      <div class="container-top-page no-shadow">
        <div class="items-center justify-center Home-Page-heard row">
          <span>视频监控管理平台</span>
        </div>
      </div>
    </q-dialog>
    <!--左侧弹窗-->
    <q-dialog v-model="state.leftdialog" seamless position="left" transition-show="slide-right"
      transition-hide="slide-left" class="left-page-dialog-video">
      <div class="container-left-page no-shadow">
        <HomePageLeft ref="HomePageLeftRef"></HomePageLeft>
      </div>
    </q-dialog>
    <!--右侧弹窗-->
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-video">
      <div class="container-right-page no-shadow">
        <HomePageRight ref="HomePageRightRef"></HomePageRight>
      </div>
    </q-dialog>
    <!--底部弹窗-->
    <q-dialog v-model="state.bottomdialog" seamless position="bottom" class="bottom-page-dialog">
      <div class="container-bottom-page no-shadow"></div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts" name="contentContainer">
import { defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
//主页左边
const HomePageLeft = defineAsyncComponent(
  () =>
    import("pages/videoSurveillance/content/homePage/HomePageLeft.vue")
);
//主页右边
const HomePageRight = defineAsyncComponent(
  () =>
    import("pages/videoSurveillance/content/homePage/HomePageRight.vue")
);
const state = reactive({
  topdialog: true,
  leftdialog: true,
  rightdialog: true,
  bottomdialog: false,
});

onMounted(() => { });
</script>

<style lang="scss">
.left-page-dialog-video>.q-dialog__inner {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.left-page-dialog-video .container-left-page {
  width: 2061px !important;
  max-width: 2061px !important;
  height: 100%;
  max-height: 100% !important;
  background: linear-gradient(-90deg, rgba(0, 5, 16, 0) 0%, #17223F 66%, #121F40 100%);
}

.right-page-dialog-video>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.right-page-dialog-video .container-right-page {
  width: 1790px !important;
  max-width: 1790px !important;
  height: 100%;
  max-height: 100% !important;
  background: linear-gradient(-270deg, rgba(0, 5, 16, 0) 0%, #121F40 52%, #121F40 100%);
}

.top-page-dialog>.q-dialog__inner.flex {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.top-page-dialog>.q-dialog__inner.flex {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.container-top-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 200px;
  max-height: 100% !important;
  position: relative;
  z-index: 9999 !important;
}

.Home-Page-heard {
  width: 100%;
  height: 320px;
  position: absolute;
  background-image: url("assets/component/intro/标题.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  top: -120px;
  left: 0;
  z-index: 20;
}

.Home-Page-heard>span {
  font-family: SourceHanSansBold;
  font-size: 100px;
  line-height: 100px;
  color: #ffffff;
  font-style: italic;
  background: linear-gradient(180deg,
      #ffffff 0.68359375%,
      #ffffff 50%,
      #6dc6ff 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 80px;
}
</style>
