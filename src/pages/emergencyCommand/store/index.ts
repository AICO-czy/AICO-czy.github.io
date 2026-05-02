import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmergencyCommandGlobal = defineStore('emergencyCommandGlobal', ()=> {
  const modeType = ref(1) //1：日常模式 2：雨雪保障模式

  const setModeType = (index: any) => {
    modeType.value = index
  }

  return {
    modeType,
    setModeType,
  }
})


