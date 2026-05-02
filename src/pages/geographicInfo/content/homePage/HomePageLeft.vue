<!--主页-左边-->
<template>
  <div class="home-page-left">
    <!--查询框-->
    <SearchData></SearchData>
    <!--服务图例-->
    <!-- <ServerLegends></ServerLegends> -->
    <ServerLegendsNews />
  </div>
</template>
<script setup lang="ts" name="homePageLeft">
import { defineAsyncComponent, reactive, onMounted } from "vue";
import { legendInfo } from "stores/legendInfo";
import ServerLegendsNews from './other/ServerLegendsNews.vue'
//查询框
const SearchData = defineAsyncComponent(() => import("./other/SearchData.vue"));
//服务图例
const ServerLegends = defineAsyncComponent(
  () => import("./other/ServerLegends.vue")
);

const storeLegendInfo = legendInfo();
/**初始化服务图例数据 */
const initLegends = () => {
  var legendGroup = [
    {
      label: "公路路网",
      icon: "img:icons/cdsgl/geographicInfo/legend/公路路网.svg",
      selected: false,
      childen: [
        {
          label: "高速公路",
          color: "#E5742E",
          layerName: "hbsyzt:cdsgaosu0",
          selected: false,
        },
        {
          label: "国道",
          color: "#D8222A",
          layerName: "hbsyzt:cdsguodao0",
          selected: false,
        },
        {
          label: "省道",
          color: "#19A748",
          layerName: "hbsyzt:cdsshengdao0",
          selected: false,
        },
        {
          label: "县道",
          color: "#005397",
          layerName: "hbsyzt:cdsxiandao0",
          selected: false,
        },
        {
          label: "乡道",
          color: "#84891B",
          layerName: "hbsyzt:cdsxiangdao0",
          selected: false,
        },
        {
          label: "村道",
          color: "#F5CA7A",
          layerName: "hbsyzt:cdscundao0",
          selected: false,
        },
      ] as any,
    },
    {
      label: "道路资产",
      icon: "img:icons/cdsgl/geographicInfo/legend/道路资产.svg",
      selected: false,
      childen: [
        {
          label: "桥梁",
          code: "bridge-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/桥梁.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/桥梁.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/桥梁.svg",
          selected: false,
        },
        {
          label: "隧道",
          code: "tunnel-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/隧道.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/隧道.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/隧道.svg",
          selected: false,
        },
        {
          label: "收费站",
          code: "tollStation-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/收费站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/收费站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/收费站.svg",
          selected: false,
        },
        {
          label: "治超站",
          code: "cureStation-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/治超站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/治超站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/治超站.svg",
          selected: false,
        },
        {
          label: "交调站",
          code: "switchingStation-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/交调站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/交调站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/交调站.svg",
          selected: false,
        },
        {
          label: "养护工区",
          code: "maintenanceArea-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/养护工区.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/养护工区.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/养护工区.svg",
          selected: false,
        },
        {
          label: "服务区",
          code: "serviceArea-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/服务区.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/服务区.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/服务区.svg",
          selected: false,
        },
        {
          label: "停车区",
          code: "parkingArea-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/停车区.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/停车区.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/停车区.svg",
          selected: false,
        },
      ] as any,
    },
    {
      label: "交通场站",
      icon: "img:icons/cdsgl/geographicInfo/legend/交通场站.svg",
      selected: false,
      childen: [
        {
          label: "客运站",
          code: "passengerStation-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/客运站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/客运站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/客运站.svg",
          selected: false,
        },
        {
          label: "公交车枢纽站",
          code: "busHub-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/公交车枢纽站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/公交车枢纽站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/公交车枢纽站.svg",
          selected: false,
        },
        {
          label: "公交车线路",
          code: "busLine-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/公交车线路.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/公交车线路.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/公交车线路.svg",
          selected: false,
        },
        {
          label: "码头",
          code: "wharf-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/码头.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/码头.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/码头.svg",
          selected: false,
        },
        {
          label: "航道",
          code: "fairway-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/航道.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/航道.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/航道.svg",
          selected: false,
        },
        {
          label: "汽修业户",
          code: "vehicleMaintenance-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/汽车维修.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/汽车维修.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/汽车维修.svg",
          selected: false,
        },
        {
          label: "驾培机构",
          code: "drivingTraining-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/驾驶培训.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/驾驶培训.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/驾驶培训.svg",
          selected: false,
        },
        {
          label: "租赁企业",
          code: "carRental-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/汽车租赁.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/汽车租赁.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/汽车租赁.svg",
          selected: false,
        },
        {
          label: "充电站",
          code: "chargingStation-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/充电站.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/充电站.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/充电站.svg",
          selected: false,
        },
      ] as any,
    },
    {
      label: "视频监控",
      icon: "img:icons/cdsgl/geographicInfo/legend/视频监控.svg",
      selected: false,
      childen: [
        {
          label: "监控",
          code: "videoSurveillance-geographicInfo",
          icon: "img:icons/cdsgl/geographicInfo/legend/监控.svg",
          selectIcon: "img:icons/cdsgl/geographicInfo/legend/监控.svg",
          poiImg: "icons/cdsgl/geographicInfo/legend/监控.svg",
          selected: false,
        },
      ] as any,
    },
  ];
  storeLegendInfo.setServerLegend(legendGroup);
};
onMounted(() => {
  initLegends();
});
</script>
<style scoped>
.home-page-left {
  width: 100%;
  height: 100%;
  padding: 50px 0 50px 60px;
}
</style>
