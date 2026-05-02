import { defineStore } from "pinia";

export const useThemeConfig = defineStore("themeConfig", {
  state: (): any => ({
    themeConfig: {
      currScale: 0,
    },
  }),
  actions: {
    setThemeConfig(data: any) {
      this.themeConfig = data;
    },
  },
});
