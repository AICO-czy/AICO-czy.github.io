import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnalyzeDialogStore = defineStore('analyzeDialogStore', {
  state: (): any => ({
    showAnalyzeDialog: '' as any,
    showOperationLogDialog: '' as any,//操作日志
  }),
  actions: {
    setShowAnalyzeDialog(data: any) {
      this.showAnalyzeDialog = data;
    },
    setShowOperationLogDialog(data: any) {
      this.showOperationLogDialog = data;
    },
  },
})

export const useHazardousGoodsStore = defineStore('hazardousGoodsStore', () => {
  const isVisible = ref(true)
  const activeTab = ref(1)

  const setActiveTab = (index: number) => {
    activeTab.value = index
  }

  const openDialog = () => {
    isVisible.value = true
  }

  const closeDialog = () => {
    isVisible.value = false
    activeTab.value = 1
  }

  return {
    isVisible,
    activeTab,
    setActiveTab,
    openDialog,
    closeDialog
  }
})


