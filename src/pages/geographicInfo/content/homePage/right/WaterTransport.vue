<script setup lang="ts">
import { defineAsyncComponent, reactive } from "vue";

const titleSmall = defineAsyncComponent(
  () => import("pages/geographicInfo/models/TitleSmall.vue")
);

const state = reactive({
  label: "航道里程",
  value: "3",
  unit: "条",
  unit2: "km",
  value2: "30",
  label3: "码头",
  value3: "180",
  unit3: "条"
})

const emit = defineEmits(["waterTransportClick"])
</script>

<template>
  <div class="water-transport">
    <!-- <titleSmall class="col-auto title-small-water-transport" title="水路运输"></titleSmall> -->
    <div class="card-title">
      <div class="card-text">水路运输</div>
    </div>
    <div class="left-column top-bottom">
      <div class="info-icon">
        <!-- <q-icon @click="emit('waterTransportClick', '航道里程')" class="info-icon"
          name="img:icons/cdsgl/geographicInfo/航道里程.svg"></q-icon> -->
        <q-img src="icons/切图-地理信息全要素一张图_slices/组 41428.png" spinner-color="white" class="info-icon"></q-img>
      </div>
      <div class="info-container">
        <div class="info-double-content">
          <div class="info-content">
            <span class="info-value">{{ state.value }}</span>
            <span class="info-unit">{{ state.unit }}</span>
          </div>
          <div class="info-content">
            <span class="info-value">{{ state.value2 }}</span>
            <span class="info-unit">{{ state.unit2 }}</span>
          </div>
        </div>
        <div class="info-label">
          {{ state.label }}
        </div>
      </div>
    </div>
    <div class="right-column top-bottom">
      <div class="info-icon" @click="emit('waterTransportClick', '码头')">
        <!-- <q-icon class="info-icon" name="img:icons/cdsgl/geographicInfo/码头.svg"></q-icon> -->
        <q-img src="icons/切图-地理信息全要素一张图_slices/组 41435.png" spinner-color="white" class="info-icon"></q-img>
      </div>
      <div class="info-container">
        <div class="info-content info-single-content">
          <span class="info-value">{{ state.value3 }}</span>
          <span class="info-unit">{{ state.unit3 }}</span>
        </div>
        <div class="info-label">
          {{ state.label3 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  background: url('assets/component/切图-地理信息全要素一张图_slices/标题栏(1).png') no-repeat center/cover;
  width: 730px;
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

.water-transport {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 150px 161px 0px 92px;
  display: flex;
  justify-content: space-between;
}

.title-small-water-transport {
  position: absolute;
  top: 0;
  left: 0;
}

.left-column {
  width: 219px;
  height: 282px;
  /*padding: 0 30px 124px 31px;*/
}

.right-column {
  width: 158px;
  height: 282px;
  /*padding-bottom: 124px;*/
}

.top-bottom {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
}

.info-label {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 36px;
  color: #E0ECFF;
  line-height: 60px;
  height: 60px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 234px;
  height: 143px;
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 41436.png') no-repeat center/cover;
  margin-top: 30px;
}

.info-content {
  display: flex;
  justify-content: center;
  align-items: end;
  height: 83px;
}

.info-double-content {
  width: 219px;
  height: 83px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* margin-bottom: 20px; */
}

.info-single-content {
  width: 219px;
  height: 83px;
}

.info-content .info-value {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 56px;
  color: #FFFFFF;
  line-height: 86px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.info-content .info-unit {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 28px;
  color: #fff;
  line-height: 72px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-left: 10px;
}

.info-icon {
  width: 199.58px;
  height: 126.82px;
}
</style>
