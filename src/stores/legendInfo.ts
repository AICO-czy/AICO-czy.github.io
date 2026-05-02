import { defineStore } from "pinia";

export const legendInfo = defineStore("legendInfo", {
  state: (): any => ({
    pointLegend: null as any,//撒点图例
    serverLegend: null as any,//服务图例
    selectLegendType:null, //点击按钮联动图例显示
  }),
  actions: {
    setPointLegend(data: any) {
      this.pointLegend = data;
    },
    setServerLegend(data: any) {
      this.serverLegend = data;
    },
    setSelectLegendType(data: any) {
      this.selectLegendType = data;
    },
  },
});
