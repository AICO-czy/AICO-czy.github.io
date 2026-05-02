<!--智慧工地监管平台-主体内容-->
<template>
  <div class="content-container">
    <!--顶部弹窗-->
    <q-dialog v-model="state.topdialog" seamless position="top" transition-hide="slide-top" class="top-page-dialog">
      <div class="container-top-page no-shadow">

      </div>
    </q-dialog>
    <!--左侧弹窗-->
    <q-dialog v-model="state.leftdialog" seamless position="left" transition-show="slide-right"
      transition-hide="slide-left" class="left-page-dialog-apicture">
      <div class="container-left-page no-shadow">
        <HomePageLeft ref="HomePageLeftRef"></HomePageLeft>
      </div>
    </q-dialog>
    <!--右侧弹窗-->
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-apicture">
      <div class="container-right-page no-shadow">
        <HomePageRight ref="HomePageRightRef"></HomePageRight>
      </div>
    </q-dialog>
    <!--底部弹窗-->
    <q-dialog v-model="state.bottomdialog" seamless position="bottom" class="bottom-page-dialog">
      <div class="container-bottom-page no-shadow">

      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts" name="contentContainer">
import { defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
//主页左边
const HomePageLeft = defineAsyncComponent(
  () => import("pages/geographicInfo/content/homePage/HomePageLeft.vue")
);
//主页右边
const HomePageRight = defineAsyncComponent(
  () => import("pages/geographicInfo/content/homePage/HomePageRight.vue")
);
const state = reactive({
  topdialog: false,
  leftdialog: true,
  rightdialog: true,
  bottomdialog: false,
});

onMounted(() => { });
</script>

<style lang="scss">
/* .left-page-dialog-apicture >>> .q-dialog__inner--minimized {
  padding: 0 !important;
} */

.left-page-dialog-apicture>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 152px;
  padding: 0;
}

.left-page-dialog-apicture .container-left-page {
  width: 0 !important;
  max-width: 1527px !important;
  height: 100%;
  max-height: 100% !important;
  /* background: linear-gradient(270deg,
      rgba(14, 39, 79, 0) 0%,
      rgba(2, 12, 33, 0.5) 33%,
      rgba(2, 11, 32, 0.63) 56%,
      #020b1f 100%,
      #020b1f 100%); */
}

.right-page-dialog-apicture>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 204px;
  bottom: 0;
  padding: 0;
}

.right-page-dialog-apicture .container-right-page {
  width: 3004px !important;
  max-width: 3004px !important;
  height: 100%;
  max-height: 100% !important;
  /* background: linear-gradient(-270deg,
      rgba(14, 39, 79, 0) 0%,
      rgba(2, 12, 33, 0.5) 33%,
      rgba(2, 11, 32, 0.63) 56%,
      #020b1f 100%,
      #020b1f 100%); */
}

.top-page-dialog>.q-dialog__inner.flex {
  width: 100% !important;
  max-width: 100% !important;
  height: 100% !important;
  max-height: 100% !important;
  padding: 0;
}
</style>
