import { defineStore } from "pinia";
import { ref } from "vue";

export const useTableAccountStore = defineStore('tableAccount', () => {
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
    }

    return {
        isVisible,
        activeTab,
        setActiveTab,
        openDialog,
        closeDialog
    }
})
