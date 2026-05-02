import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoStore = defineStore('video', () => {
  // 视频弹窗状态
  const isVisible = ref(false)
  const currentVideoSrc = ref('')
  const dialogTitle = ref('xxxx')
  
  const openVideo = (src?: string, title?: string) => {
    if (src) {
      currentVideoSrc.value = src
    }
    if (title) {
      dialogTitle.value = title
    }
    isVisible.value = true
  }
  
  const closeVideo = () => {
    isVisible.value = false
  }
  
  const setVideoSrc = (src: string) => {
    currentVideoSrc.value = src
  }
  
  const setDialogTitle = (title: string) => {
    dialogTitle.value = title
  }
  
  const resetVideo = () => {
    isVisible.value = false
    currentVideoSrc.value = ''
    dialogTitle.value = 'xxxx'
  }
  
  return {
    // State
    isVisible,
    currentVideoSrc,
    dialogTitle,
    
    // Actions
    openVideo,
    closeVideo,
    setVideoSrc,
    setDialogTitle,
    resetVideo
  }
})