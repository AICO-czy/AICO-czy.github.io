<template>
  <div class="dialog-box">
    <!-- 添加一个全屏覆盖层，确保在最上层 -->
    <div v-if="isVisible" class="full-screen-overlay"></div>
    <q-dialog v-model="isVisible" transition-show="scale" transition-hide="scale" class="bottom-dialog-wrapper">
      <div class="chat-box">
        <div class="nav_1" :class="activeTab == 1 ? 'active_1' : ''" @click="handleClick(1)">
          <div class="text" :class="activeTab == 1 ? 'active_text' : ''">
            工程建设
          </div>
          <div class="mouse_bg" v-if="activeTab == 1">
            <div class="mouse"></div>
          </div>
        </div>
        <div class="nav_2" :class="activeTab == 2 ? 'active_2' : ''" @click="handleClick(2)">
          <div class="text" :class="activeTab == 2 ? 'active_text' : ''">
            公路运营
          </div>
          <div class="mouse_bg" v-if="activeTab == 2">
            <div class="mouse"></div>
          </div>
        </div>
        <div class="nav_3" :class="activeTab == 3 ? 'active_3' : ''" @click="handleClick(3)">
          <div class="text" :class="activeTab == 3 ? 'active_text' : ''">
            道(水)路运输
          </div>
          <div class="mouse_bg" v-if="activeTab == 3">
            <div class="mouse"></div>
          </div>
        </div>
        <div class="nav_4" :class="activeTab == 4 ? 'active_4' : ''" @click="handleClick(4)">
          <div class="text" :class="activeTab == 4 ? 'active_text' : ''">
            城市交通
          </div>
          <div class="mouse_bg" v-if="activeTab == 4">
            <div class="mouse"></div>
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, toRefs } from "vue";
import { useBottomBtn } from '../../store/bottomBtn'

const bottomBtn = useBottomBtn()

const { activeTab, isVisible } = toRefs(bottomBtn)

function handleClick(type: number) {
  activeTab.value = type;
  close();
  // bottomBtn.setActiveTab(type)
  $emit("changeItem", type);
}

const $emit = defineEmits(["changeItem"]);

const open = () => {
  isVisible.value = true;
};

const close = () => {
  isVisible.value = false;
};

defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.dialog-box {
  :deep(.q-dialog) {
    z-index: 999998 !important;
  }

  :deep(.bottom-dialog-wrapper) {
    z-index: 999998 !important;
  }
}

// 全屏覆盖层，确保遮盖所有元素
.full-screen-overlay {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: transparent !important;
  z-index: 999997 !important;
  pointer-events: none !important;
}

:deep(.q-dialog__backdrop) {
  z-index: 999997 !important;
}

:deep(.q-dialog__inner) {
  z-index: 999998 !important;
  position: fixed !important;
}

.q-dialog__inner--minimized>div {
  max-width: 2549px !important;
  overflow: none !important;
  z-index: 999999 !important;
}

.q-dialog {
  z-index: 999998 !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
  z-index: 999999 !important;
}

.mouse_bg {
  background: url("assets/image/buttomDialog/mouse_bg.png") no-repeat 100%/100%;
  width: 255px;
  height: 255px;
  position: absolute;
  right: -14%;
  top: 38%;
}

.mouse {
  background: url("assets/image/buttomDialog/mouse.png") no-repeat 100%/100%;
  width: 117px;
  height: 134px;
  position: absolute;
  right: 40%;
  top: 40%;
  transform: translate(50%);
}

.chat-box {
  width: 2549px !important;
  min-height: 1067px !important;
  position: fixed !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  bottom: 442px !important;
  background: url("assets/image/buttomDialog/bg.png") no-repeat 100%/100%;
  // padding: 125px 50px 70px 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 100px;
  z-index: 999999 !important;
  /* 保证在最上层可点击 */
  pointer-events: auto !important;

  .text {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 77px;
    height: 128px;
    width: 557px;
    line-height: 128px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    color: #fff;
    background: url("assets/image/buttomDialog/text_bg.png") no-repeat 100%/100%;
    position: absolute;
    top: 40%;
    right: 50%;
    transform: translate(50%);
  }

  .active_text {
    color: #ffae57;
  }

  .nav_1 {
    background: url("assets/image/buttomDialog/nav_1.png") no-repeat 100%/100%;
    height: 618px;
    width: 402px;
    position: relative;
    margin-top: 70px;
  }

  .nav_2 {
    background: url("assets/image/buttomDialog/nav_2.png") no-repeat 100%/100%;
    height: 618px;
    width: 402px;
    position: relative;
    margin-bottom: 70px;
  }

  .nav_3 {
    background: url("assets/image/buttomDialog/nav_3.png") no-repeat 100%/100%;
    height: 618px;
    width: 402px;
    position: relative;
    margin-bottom: 70px;
  }

  .nav_4 {
    background: url("assets/image/buttomDialog/nav_4.png") no-repeat 100%/100%;
    height: 618px;
    width: 402px;
    position: relative;
    margin-top: 70px;
  }

  .active_1 {
    background: url("assets/image/buttomDialog/nav_active_1.png") no-repeat 100%/100%;
  }

  .active_2 {
    background: url("assets/image/buttomDialog/nav_active_2.png") no-repeat 100%/100%;
  }

  .active_3 {
    background: url("assets/image/buttomDialog/nav_active_3.png") no-repeat 100%/100%;
  }

  .active_4 {
    background: url("assets/image/buttomDialog/nav_active_4.png") no-repeat 100%/100%;
  }

  .chat-title {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 50px;
    line-height: 69px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    left: 60px;
    top: 12px;
    color: #fff;
  }

  .chat-close {
    width: 42px;
    height: 42px;
    background: url("assets/image/lefty/close-btn.png") no-repeat 100%/100%;
    position: absolute;
    right: 30px;
    top: 48px;
  }

  .chat-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
    min-height: 0;
    /* 关键：允许子项在剩余空间内收缩，避免溢出 */
    overflow: hidden;
    /* 防止内部内容绘制到容器之外 */
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    flex: 0 0 56px;
  }

  .bot-avatar {
    background: url("assets/image/lefty/chatBot-icon.png") no-repeat center/contain;
  }

  .user-avatar {
    background: url("assets/image/lefty/chat-user.png") no-repeat center/contain;
  }

  .bubble {
    max-width: 540px;
    padding: 18px 20px;
    border-radius: 12px;
    font-size: 28px;
    line-height: 40px;
    color: #d7edff;
    box-sizing: border-box;
  }

  .bot-bubble {
    background: rgba(24, 66, 104, 0.6);
    border: 1px solid rgba(132, 197, 255, 0.35);
  }

  .user-bubble {
    background: rgba(19, 54, 84, 0.6);
    border: 1px solid rgba(132, 197, 255, 0.35);
  }

  /* 无障碍隐藏但可供屏幕阅读器读取 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}
</style>
