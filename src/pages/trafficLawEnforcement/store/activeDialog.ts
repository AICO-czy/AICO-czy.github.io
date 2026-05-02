import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLawActiveDialogStore = defineStore('activeDialog', () => {
  const activeDialog = ref('')

  function setActiveDialog(index:any){
    activeDialog.value = index
  }

  return {
    activeDialog,
    setActiveDialog
  }
})
