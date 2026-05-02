import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActiveTypeStore = defineStore('activeType', () => {

  const activeBtn = ref(1)

  function setActiveBtn(index:any){
    activeBtn.value = index
  }

  return {
    // State
    activeBtn,

    setActiveBtn
  }
})
