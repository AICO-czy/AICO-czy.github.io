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

export const useDialogStore = defineStore('dialogStore', () => {
  const dialogVisible = ref('')
  const dialogIndex = ref()

  const setDialogVisible = (index: any,ind:any) => {
    dialogVisible.value = index
    dialogIndex.value = ind
  }

  const closeDialog = () => {
    dialogVisible.value = ''
    dialogIndex.value = null
  }

  return {
    dialogVisible,
    dialogIndex,
    setDialogVisible,
    closeDialog
  }
})


