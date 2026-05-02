import {defineStore} from "pinia";
import {ref} from "vue";

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
