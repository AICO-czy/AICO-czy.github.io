<template>
  <div class="home-index">
    <chatbox v-if="activeBtn == 1" />
    <largeModel v-else-if="activeBtn == 2" />
    <!-- 聊天弹窗 -->
    <dialog-com v-else-if="activeBtn == 3">
      <chatConversation />
    </dialog-com>
    <!-- 垂直模型弹窗 -->
    <dialog-com v-else>
      <czmxCom :active="activeBtn"/>
    </dialog-com>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import { useActiveTypeStore } from "../../store/activeType";
import chatbox from '../chatbox/index.vue'
import largeModel from '../largeModel/index.vue'
import dialogCom from '../../components/dialogCom.vue'
import chatConversation from '../chatConversation/index.vue'
import czmxCom from '../czmx/index.vue'

const dialogRef = ref(null);

const activeTypeStore = useActiveTypeStore();
const { activeBtn } = toRefs(activeTypeStore);

onMounted(() => {

});
</script>

<style lang="scss" scoped>
.home-index {
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.q-dialog__inner.flex {
  padding: 0 !important;
}

.left-page-dialog-digital>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 6%;
  left: 2%;
  padding: 0;
}

.left-page-dialog-digital .container-left-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-digital>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 257px;
  right: 95px;
  padding: 0;
}

.right-page-dialog-digital .container-right-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
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
