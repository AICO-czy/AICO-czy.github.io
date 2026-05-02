import { defineStore } from "pinia";
import { ref } from "vue";

export const useTransportationDialogStore = defineStore('transportationDialogStore', {
  state: (): any => ({
    showTransportationDialog: '' as any,
    //alarm 两客一危一重报警弹窗
    //passenger 公路客运弹窗
    //showFourDialog 四色图弹窗
    showFourDialog: '' as any,//四色图f
  }),
  actions: {
    setShowTransportationDialog(data: any) {
      this.showTransportationDialog = data;
    },
    setShowFourDialog(data: any) {
      this.showFourDialog = data;
    },
  },
})

export const useComprehensiveStore = defineStore('comprehensiveStore', () => {
  const isVisible = ref(false)
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

export const useOverloadDetectionStore = defineStore('overloadDetectionStore', () => {
  const isVisible = ref(false)
  const activeTab = ref(1)
  const activeDate = ref(1)

  const setActiveTab = (index: number) => {
    activeTab.value = index
    activeDate.value = 1
  }

  const setActiveDate = (index: number) => {
    activeDate.value = index
  }

  const openDialog = () => {
    isVisible.value = true
  }

  const closeDialog = () => {
    isVisible.value = false
    activeTab.value = 1
    activeDate.value = 1
  }

  return {
    isVisible,
    activeTab,
    activeDate,
    setActiveTab,
    openDialog,
    closeDialog,
    setActiveDate
  }
})

export const useHighSpeedFreightStore = defineStore('highSpeedFreightStore', () => {
  const isVisible = ref(false)
  const activeTab = ref(1)
  const activeDate = ref(1)

  const setActiveTab = (index: number) => {
    activeTab.value = index
    activeDate.value = 1
  }

  const setActiveDate = (index: number) => {
    activeDate.value = index
  }

  const openDialog = () => {
    isVisible.value = true
  }

  const closeDialog = () => {
    isVisible.value = false
    activeTab.value = 1
    activeDate.value = 1
  }

  return {
    isVisible,
    activeTab,
    activeDate,
    setActiveTab,
    openDialog,
    closeDialog,
    setActiveDate
  }
})

export const useCharteredCarStore = defineStore('charteredCarStore', () => {
  const isVisible = ref(false)
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

export const useHighSpeedFreightTransportStore = defineStore('highSpeedFreightTransportStore', () => {
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

