import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRightAcountStore = defineStore('rightAcount', () => {
  // state
  const isVisible = ref(false)
  
  // actions
  const openDialog = () => {
    isVisible.value = true
  }
  
  const closeDialog = () => {
    isVisible.value = false
  }
  
  return {
    isVisible,
    openDialog,
    closeDialog
  }
})
