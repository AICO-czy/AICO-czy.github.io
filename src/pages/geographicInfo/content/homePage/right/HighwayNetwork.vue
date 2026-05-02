<template>
  <div class="highway-network">
    <!-- <titleSmall class="col-auto title-small-highway-network" title="公路路网"></titleSmall> -->
    <div class="card-title">
      <div class="card-text">公路路网</div>
    </div>
    <div class="title-container">
      <div class="title-label mr-[20px]">
        {{ state.totalData.title }}
      </div>
      <div class="title-content">
        <span class="title-value">{{ state.totalData.value }}</span>
        <span class="title-unit">{{ state.totalData.unit }}</span>
      </div>
    </div>
    <div class="highway-network-content">
      <div class="content-item" @click="itemClick(item.title)" v-for="(item, index) in state.roadData" :key="index">
        <div class="content-item-title title-label">
          {{ item.title }}
        </div>
        <div class="info-container">
          <div class="info-double-content">
            <div class="info-content">
              <span class="title-value">{{ item.num }}</span>
              <span class="title-unit ml-8">{{ item.numUnit }}</span>
            </div>
            <span class="title-value2">/</span>
            <div class="info-content">
              <span class="title-value">{{ item.mileage }}</span>
              <span class="title-unit ml-8">{{ item.mileageUnit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, reactive } from "vue";
import { legendInfo } from "stores/legendInfo";
const titleSmall = defineAsyncComponent(
  () => import("pages/geographicInfo/models/TitleSmall.vue")
);

const state = reactive({
  totalData: {
    title: "承德市公路总里程",
    value: 24804,
    unit: "km",
  },
  roadData: [
    {
      title: "高速公路",
      num: 10,
      numUnit: "条",
      mileage: 758.6,
      mileageUnit: "公里",
    },
    {
      title: "国道",
      num: 8,
      numUnit: "条",
      mileage: 1482.6,
      mileageUnit: "公里",
    },
    {
      title: "省道",
      num: 5,
      numUnit: "条",
      mileage: 1603,
      mileageUnit: "公里",
    },
    {
      title: "农村公路",
      num: 55,
      numUnit: "条",
      mileage: 2142,
      mileageUnit: "公里",
    },
  ],
});

const storeLegendInfo = legendInfo();
//点击联动图例
const itemClick = (type: string) => {
  if (type === '农村公路') {
    type = "村道";
  }
  storeLegendInfo.setSelectLegendType(type);
};
</script>
<style scoped>
.card-title {
  background: url('src/assets/component/切图-地理信息全要素一张图_slices/标题栏.png') no-repeat center/cover;
  width: 1028px;
  height: 63px;
  position: absolute;
  top: 65px;
  left: 30px;
}

.card-text {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 700;
  font-size: 54px;
  color: #F2FEFF;
  line-height: 23px;
  font-style: normal;
  text-transform: none;
  padding-left: 80px;
}

.highway-network {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 152px 62px 60px 50px;
  display: flex;
  justify-content: space-between;
}

.title-small-highway-network {
  width: 776px !important;
  position: absolute;
  top: 0;
  left: 0;
}

.title-container {
  position: absolute;
  top: 40px;
  right: 56px;
  width: 860.95px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("assets/component/切图-地理信息全要素一张图_slices/组 42989.png") no-repeat center/cover;
}

.title-label {
  font-family: Alimama ShuHeiTi, Alimama ShuHeiTi;
  font-size: 40px;
  line-height: 40px;
  color: transparent;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #7ac5ff 0%, #ffffff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 228px;
  height: 56px;
}

.title-value {
  font-family: Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 56px;
  color: #ffffff;
  line-height: 56px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.title-value2 {
  font-family: Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 36px;
  color: #ffffff;
  line-height: 56px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.title-unit {
  font-family: Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 28px;
  color: #5385c4;
  line-height: 26px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.highway-network-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-item {
  position: relative;
  width: 452.8px;
  height: 235px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("assets/component/切图-地理信息全要素一张图_slices/组 42984.png") no-repeat center/cover;
}

.content-item-title {
  position: absolute;
  top: 44px;
  left: 32%;
  width: 165px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.info-label {
  position: absolute;
  top: 80px;
  left: 38px;
  font-family: Alibaba PuHuiTi;
  display: flex;
  justify-content: space-between;
  width: 203px;
  height: 36px;
  font-weight: normal;
  color: #e0ecff;
  line-height: 36px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.info-content {
  display: flex;
  justify-content: center;
  align-items: end;
}

.info-double-content {
  position: absolute;
  top: 145px;
  left: 60px;
  width: 350px;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ml-8 {
  margin-left: 8px;
}

.fs-36 {
  font-size: 36px;
}
</style>
