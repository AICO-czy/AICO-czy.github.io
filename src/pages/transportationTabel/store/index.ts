import { defineStore } from "pinia";
import { ref } from "vue";

export const useMenuStore = defineStore('menuStore', ()=> {
  const activeTab = ref('2-3')

  const setActiveTab = (index: any) => {
    activeTab.value = index
  }

  return {
    activeTab,
    setActiveTab,
  }
})


