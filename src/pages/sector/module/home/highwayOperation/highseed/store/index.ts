import {defineStore} from "pinia";
import {ref} from "vue";

export const useHighseedStore = defineStore('highseedStore', () => {
    const isDialogVisible = ref(false)

    const openDialog = () => {
        isDialogVisible.value = true
    }

    const closeDialog = () => {
        isDialogVisible.value = false
    }

    return {
        isDialogVisible,
        openDialog,
        closeDialog
    }
})

export const useTrunkLineStore = defineStore('trunkLineStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
      isDialogVisible.value = true
  }

  const closeDialog = () => {
      isDialogVisible.value = false
  }

  return {
      isDialogVisible,
      openDialog,
      closeDialog
  }
})
export const useBaiseInfoDialogStore = defineStore('baiseInfoDialogStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
    isDialogVisible.value = true
  }

  const closeDialog = () => {
    isDialogVisible.value = false
  }

  return {
    isDialogVisible,
    openDialog,
    closeDialog
  }
})

export const useBasicOverDialogStore = defineStore('basicOverDialogStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
      isDialogVisible.value = true
  }

  const closeDialog = () => {
      isDialogVisible.value = false
  }

  return {
      isDialogVisible,
      openDialog,
      closeDialog
  }
})

export const useTransactionAnalysisStore = defineStore('transactionAnalysisStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
      isDialogVisible.value = true
  }

  const closeDialog = () => {
      isDialogVisible.value = false
  }

  return {
      isDialogVisible,
      openDialog,
      closeDialog
  }
})

export const useHeatmapStore = defineStore('heatmapStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
      isDialogVisible.value = true
  }

  const closeDialog = () => {
      isDialogVisible.value = false
  }

  return {
      isDialogVisible,
      openDialog,
      closeDialog
  }
})

export const useDealingsJCStore = defineStore('dealingsJCStore', () => {
  const isDialogVisible = ref(false)

  const openDialog = () => {
      isDialogVisible.value = true
  }

  const closeDialog = () => {
      isDialogVisible.value = false
  }

  return {
      isDialogVisible,
      openDialog,
      closeDialog
  }
})
