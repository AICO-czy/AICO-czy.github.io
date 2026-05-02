import { defineStore } from "pinia";

export const otherInfo = defineStore("otherInfo", {
  state: (): any => ({
    dataConfig: null as any,
    trafficDetail: null as any,
    poiDetail: null as any,   //图例点击详情信息
    videoList: null,
    decisionPoiType: null as any, //指挥和调度模块控制图例显隐藏
    selectArea: null as any, //选中行政区划（行政区划编码）
    selectProject: null as any, //选择项目
    selectVideo: null as any, //选中的摄像头
    selectWeatherStation:null as any //选中的气象站数据
  }),
  actions: {
    setDataConfig(data: any) {
      this.dataConfig = data;
    },
    setTrafficDetail(data: any) {
      this.trafficDetail = data;
    },
    setPoiDetail(data: any) {
      this.poiDetail = data;
    },
    setVideoList(data: any) {
      this.videoList = data;
    },
    setDecisionPoiType(data: any) {
      this.decisionPoiType = data;
    },
    setSelectArea(data: any) {
      this.selectArea = data;
    },
    getSelectArea() {
      return this.selectArea;
    },
    setSelectProject(data: any) {
      this.selectProject = data;
    },
    getSelectProject() {
      return this.selectProject;
    },
    setSelectVideo(data: any) {
      this.selectVideo = data;
    },
    setSelectWeatherStation(data: any) {
      this.selectWeatherStation = data;
    },
  },
});
