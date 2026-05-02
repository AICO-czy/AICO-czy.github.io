<!--交通执法-布局内容-->
<template>
  <div class="content-container">
    <!--顶部弹窗-->
    <q-dialog v-model="state.topdialog" seamless position="top" transition-hide="slide-top" class="top-page-dialog">
      <div class="container-top-page no-shadow">
        <div class="items-center justify-center Home-Page-heard-tle row">
          <span>交通执法</span>
        </div>
      </div>
    </q-dialog>
    <!--左侧弹窗-->
    <q-dialog v-model="state.leftdialog" seamless position="left" transition-show="slide-right"
      transition-hide="slide-left" class="left-page-dialog-tle">
      <div class="container-left-page no-shadow">
        <HomePageLeft ref="HomePageLeftRef"></HomePageLeft>
      </div>
    </q-dialog>
    <!--右侧弹窗-->
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-tle">
      <div class="container-right-page no-shadow">
        <HomePageRight v-if="state.rightdialogShow" ref="HomePageRightRef"></HomePageRight>
        <div class="right-page-isShow" :class="{ 'right-page-isShow-active': !state.rightdialogShow }"
          @click="state.rightdialogShow = !state.rightdialogShow, activeDialog = ''">
          <img src="images/cdsgl/trafficLawEnforcement/rightShow.png" alt="">
        </div>
      </div>
    </q-dialog>
    <!--底部弹窗-->
    <q-dialog v-model="state.bottomdialog" seamless position="bottom" class="bottom-page-dialog">
      <div class="container-bottom-page no-shadow"></div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts" name="contentContainer">
import { defineAsyncComponent, onMounted, reactive, ref, watch, toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useLawActiveDialogStore } from "../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
//主页左边
const HomePageLeft = defineAsyncComponent(
  () =>
    import("pages/trafficLawEnforcement/content/homePage/HomePageLeft.vue")
);
//主页右边
const HomePageRight = defineAsyncComponent(
  () =>
    import("pages/trafficLawEnforcement/content/homePage/HomePageRight.vue")
);
const state = reactive({
  topdialog: true,
  leftdialog: true,
  rightdialog: true,
  bottomdialog: false,
  rightdialogShow: true,
});

onMounted(() => { });
</script>

<style lang="scss">
.left-page-dialog-tle>.q-dialog__inner {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.left-page-dialog-tle .container-left-page {
  width: 1831px !important;
  max-width: 1831px !important;
  height: 100%;
  max-height: 100% !important;
  // background: linear-gradient(-90deg, rgba(0, 5, 16, 0) 0%, #17223F 66%, #121F40 100%);
}

.right-page-dialog-tle>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}

.right-page-dialog-tle .container-right-page {
  width: 1120px !important;
  max-width: 1120px !important;
  height: 100%;
  max-height: 100% !important;
  position: relative;
  overflow: unset;
  // background: linear-gradient(-270deg, rgba(0, 5, 16, 0) 0%, #121F40 52%, #121F40 100%);
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

// .Home-Page-heard {
//   width: 100%;
//   height: 320px;
//   position: absolute;
//   background-image: url("assets/component/intro/标题.png");
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
//   top: -120px;
//   left: 0;
//   z-index: 20;
// }

.Home-Page-heard-tle>span {
  font-family: SourceHanSansBold;
  font-weight: 700;
  font-size: 96px;
  line-height: 134px;
  letter-spacing: 13px;
  text-align: center;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(180deg,
      #ffffff 0.68359375%,
      #ffffff 50%,
      #6dc6ff 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 28px;
}

.right-page-isShow {
  width: 79px;
  height: 143px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -100px;
  transform: rotate(180deg);
  z-index: 9999 !important;
}

.right-page-isShow-active {
  transform: rotate(0deg);
  left: auto;
  right: 120px;
}
</style>
