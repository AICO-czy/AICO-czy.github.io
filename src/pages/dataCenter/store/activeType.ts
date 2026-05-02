import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActiveTypeStore = defineStore('activeType', () => {

  const activeBtn = ref(1)
  const activeDialog = ref(0)


  function setActiveBtn(index:any){
    activeBtn.value = index
  }
  function setActiveDialog(index:any){
    activeDialog.value = index
  }

  return {
    // State
    activeBtn,
    activeDialog,
    setActiveBtn,
    setActiveDialog
  }
})
