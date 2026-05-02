<template>
  <q-dialog v-model="videoStore.isVisible" seamless>
    <div class="video-box">
      <!-- 标题 -->
      <div class="video-title">
        {{ videoStore.dialogTitle }}
      </div>
      <!-- 关闭按钮 -->
      <div class="video-close" @click="close">
      </div>
      <!-- 视频内容区域 -->
      <div class="video-content">
        <video ref="videoRef" class="video-player" controls :src="videoStore.currentVideoSrc"
          @loadeddata="onVideoLoaded" @error="onVideoError">
          您的浏览器不支持视频播放
        </video>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useVideoStore } from '../store/video'

const videoStore = useVideoStore()
const videoRef = ref<HTMLVideoElement | null>(null)

watch(() => videoStore.isVisible, (newValue) => {
  if (newValue) {
    onOpen()
  } else {
    onClose()
  }
})

const onVideoLoaded = () => {
  // console.log('视频加载完成')
}

const onVideoError = () => {
  console.error('视频加载失败')
}

const onOpen = () => {
}

const onClose = () => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
}

const close = () => {
  videoStore.closeVideo()
}
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
  max-width: 2095px !important;
  overflow: none !important;
  min-height: 1190px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.video-box {
  width: 2095px !important;
  height: 1190px !important;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url('assets/image/TransportationAndTravel/send_msg_bg.png') no-repeat 100%/100%;
  padding: 125px 50px 70px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  pointer-events: auto;

  .video-title {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 50px;
    line-height: 69px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    position: absolute;
    left: 90px;
    top: 40px;
    color: #fff;
    letter-spacing: 10px;
    transform: skewX(-10deg);
  }

  .video-close {
    width: 66px;
    height: 66px;
    background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
    position: absolute;
    right: 50px;
    top: 25px;
    cursor: pointer;
  }

  .video-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    min-height: 0;
    overflow: hidden;
    padding: 15px;
  }

  .video-player {
    width: 95%;
    height: 88%;
    border-radius: 12px;
    background: rgba(24, 66, 104, 0.6);
    border: 1px solid rgba(132, 197, 255, 0.35);
    object-fit: contain;
  }
}
</style>
