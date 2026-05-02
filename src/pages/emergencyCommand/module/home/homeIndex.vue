<template>
  <div class="home-index">
    <div>
      <HomeLeft v-if="modeType == 1" :state="state" />
      <HomeLeft2 v-else :state="state" />
    </div>
    <q-dialog v-model="state.leftdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-sector">
      <div class="container-right-page no-shadow">
        <HomeRight ref="homeRightRef" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.leftdialog" seamless position="bottom" transition-show="slide-up"
      transition-hide="slide-down" class="bottom-page-dialog-sector">
        <HomeBottom />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import { useRoute } from 'vue-router';
import { useEmergencyCommandGlobal } from '../../store/index'
import HomeLeft2 from './HomeLeft2.vue'
import HomeBottom from './homeBottom.vue'

const emergencyCommandGlobal = useEmergencyCommandGlobal()

const { modeType } = toRefs(emergencyCommandGlobal)

const HomeLeft = defineAsyncComponent(() => import("./HomeLeft.vue"));
const HomeRight = defineAsyncComponent(() => import("./HomeRight.vue"));

const storeOtherInfo = otherInfo();

// 获取 HomeRight 组件的引用
const homeRightRef = ref<InstanceType<typeof HomeRight> | null>(null);

const state = reactive({
  topdialog: false,
  leftdialog: true,
  rightdialog: true,
  moudleName: "",
});



watch(
  () => storeOtherInfo.selectArea,
  () => {
    state.moudleName = storeOtherInfo.selectArea;
    if (storeOtherInfo.selectArea == "home") {
      state.leftdialog = true;
    } else if (storeOtherInfo.selectArea == "oneRoad") {
      state.leftdialog = true;
    } else if (storeOtherInfo.selectArea == "ruralRoad") {
      state.leftdialog = true;
    } else if (storeOtherInfo.selectArea == "redRoad") {
      state.leftdialog = true;
    }
  },
  {
    deep: true,
  }
);


onMounted(() => {

});
</script>

<style>
.q-dialog__inner.flex {
  padding: 0 !important;
}

/* .bottom-page-dialog-sector {
  width: 4000px !important;
  max-width: 4000px !important;
  height: 100%;
  max-height: 100% !important;
} */

.bottom-page-dialog-sector>.q-dialog__inner.flex {
  max-width: 4000px !important;
  max-height: 400px !important;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0;
}


/* .left-page-dialog-sector{
  max-width: 100% !important;
  max-height: 100% !important;
  top: 6%;
  left: 2%;
  padding: 0;
}

.left-page-dialog-sector{
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
} */

.right-page-dialog-sector>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 257px;
  right: 95px;
  padding: 0;
}

.right-page-dialog-sector .container-right-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
  pointer-events: none;
}

.right-container-buttons-group {
  display: flex;
  column-gap: 50px;
  align-items: flex-end;
  position: absolute;
  bottom: 168px;
  transition: all 0.3s ease;
  z-index: 5000;
  /* 降低 z-index，确保不覆盖弹窗 */
  animation: containerSlideIn 1s ease-out;
}

@keyframes containerSlideIn {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.right-container-buttons {
  display: flex;
  flex-direction: column-reverse;
  row-gap: 16px;
  animation: groupSlideIn 0.8s ease-out;
}

@keyframes groupSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.right-container-buttons-item {
  width: 370px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  /* 移除默认动画，避免与动态动画冲突 */
  /* animation: buttonSlideIn 0.6s ease-out; */
}

.right-container-buttons-item:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(100, 180, 255, 0.4);
}

.right-container-buttons-item:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

.right-container-buttons-item.button-selected {
  animation: buttonPulse 0.6s ease-in-out;
}

@keyframes buttonSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes buttonPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.right-container-buttons-item .button-text {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 700;
  font-size: 36px;
  line-height: 82px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
  transition: all 0.3s ease;
}

.right-container-buttons-item:hover .button-text {
  background: linear-gradient(to bottom, #FFFFFF 0%, #B8E6FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  transform: scale(1.05);
}

.right-container-buttons-item.button-selected .button-text {
  /* 移除选中时的文字样式变化，保持默认渐变 */
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  -webkit-background-clip: text;
  background-clip: text;
  /* 移除 text-shadow */
}

.right-container-arrow {
  pointer-events: all;
  position: absolute;
  width: 79px;
  height: 143px;
  background-size: 100% 100%;
  top: 50%;
  transition: all 0.3s ease;
  z-index: 5001;
}
</style>
