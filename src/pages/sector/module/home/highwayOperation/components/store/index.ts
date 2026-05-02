import {defineStore} from "pinia";
import {ref} from "vue";

export const useBasicOverviewBtnStore = defineStore('basicOverviewBtn', () => {
  const showRoadName = ref('')

  const setShowRoadName = (name: string) => {
    showRoadName.value = name
  }
  const getShowRoadName = () => {
    return showRoadName.value
  }

  return {
    showRoadName,
    setShowRoadName,
    getShowRoadName
  }
})

