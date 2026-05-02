import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "",
    component: () => import("pages/login/LoginPage.vue")
  },
  {
    path: "/TrafficTravel",
    name: "TrafficTravel",
    component: () => import("pages/topics/trafficTravel/index.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/IntroPage", //承德市交通运行监测调度中心-项目简介
    name: "IntroPage",
    component: () => import("pages/intro/IntroPage.vue"),
  },
  {
    path: "/sectorIndex/:id", //承德市交通运行监测调度中心-监测预警系统
    name: "SectorIndex",
    component: () => import("pages/sector/index.vue"),
  },
  {
    path: "/digitalIntelligence", //交通数智中心
    name: "digitalIntelligence",
    component: () => import("pages/digitalIntelligence/index.vue"),
  },
  {
    path: "/dataCenter", //交通数据中心
    name: "dataCenter",
    component: () => import("pages/dataCenter/index.vue"),
  },
  {
    path: "/Navigation",
    name: "Navigation",
    component: () => import("pages/navigation/index.vue"),
  },
  {
    path: "/Statistics", //公路运营数据站点
    name: "Statistics",
    component: () => import("pages/statistics/index.vue"),
  },
  {
    path: "/UrbanTrafficTable", //城市交通数据站点
    name: "UrbanTrafficTable",
    component: () => import("pages/urbanTrafficTable/index.vue"),
  },
  {
    path: "/ConstructionProject", //工程建设数据站点
    name: "ConstructionProject",
    component: () => import("pages/constructionProject/index.vue"),
  },
  {
    path: "/TransportationTabel", //道（水）路运输数据站点
    name: "TransportationTabel",
    component: () => import("pages/transportationTabel/index.vue"),
  },
  {
    path: "/Swiper",
    name: "Swiper",
    component: () => import("pages/navigation/Swiper.vue"),
  },
  {
    path: "/GeographicInfoPage", //综合交通地理信息全要素“一张图”
    name: "GeographicInfoPage",
    component: () => import("pages/geographicInfo/IndexPage.vue"),
  },
  {
    path: "/VideoSurveillancePage", //视频监控管理平台
    name: "VideoSurveillancePage",
    component: () => import("pages/videoSurveillance/IndexPage.vue"),
  },
  {
    path: "/TrafficLawEnforcement", //交通执法管理平台
    name: "TrafficLawEnforcement",
    component: () => import("pages/trafficLawEnforcement/IndexPage.vue"),
  },
  {
    path: "/ComplaintHandling", //投诉处理
    name: "complaintHandling",
    component: () => import("pages/complaintHandling/index.vue"),
  },
  {
    path: "/EmergencyCommand", //应急指挥
    name: "emergencyCommand",
    component: () => import("pages/emergencyCommand/index.vue"),
  },
];

export default routes;
