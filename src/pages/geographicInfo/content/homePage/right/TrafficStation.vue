<!--一张图-右侧-交通场站-->
<template>
  <div class="traffic-station column">
    <!-- <titleSmall class="col-auto" title="交通场站"></titleSmall> -->
    <div class="card-title">
      <div class="card-text">交通场站</div>
    </div>
    <div class="col content">
      <div class="common-div top-left">
        <div class="icon-style">
          <q-img @click="trafficStationClick(state.passengerStation.code)" src="icons/切图-地理信息全要素一张图_slices/联集 15.png"
            style="margin-top: 30px;" spinner-color="white" class="icon-style"></q-img>
        </div>
        <div class="kyz">
          <div class="kyz-title">
            <div class="common-name">{{ state.passengerStation.name }}</div>
          </div>
          <div class="common-right-div">
            <div class="common-total-name">{{ state.passengerStation.totalName }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.passengerStation.total }}
              </div>
              <div class="common-total-unit">
                {{ state.passengerStation.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-div top-right">
        <div class="icon-style">
          <q-img @click="trafficStationClick(state.drivingTraining.code)" src="icons/切图-地理信息全要素一张图_slices/联集 15.png"
            style="margin-top: 30px;" spinner-color="white" class="icon-style"></q-img>
        </div>
        <div class="kyz">
          <div class="kyz-title">
            <div class="common-name">{{ state.drivingTraining.name }}</div>
          </div>
          <div class="common-right-div">
            <div class="common-total-name">{{ state.drivingTraining.totalName }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.drivingTraining.total }}
              </div>
              <div class="common-total-unit">
                {{ state.drivingTraining.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-div bottom-left">
        <div class="icon-style">
          <q-img @click="trafficStationClick(state.carMaintenance.code)" src="icons/切图-地理信息全要素一张图_slices/联集 15.png"
            style="margin-top: 30px;" spinner-color="white" class="icon-style"></q-img>
        </div>
        <div class="kyz">
          <div class="kyz-title">
            <div class="common-name">{{ state.carMaintenance.name }}</div>
          </div>
          <div class="common-right-div">
            <div class="common-total-name">{{ state.carMaintenance.totalName }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.carMaintenance.total }}
              </div>
              <div class="common-total-unit">
                {{ state.carMaintenance.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-div bottom-right">
        <div class="icon-style">
          <q-img @click="trafficStationClick(state.carRental.code)" src="icons/切图-地理信息全要素一张图_slices/联集 15.png"
            style="margin-top: 30px;" spinner-color="white" class="icon-style"></q-img>
        </div>
        <div class="kyz">
          <div class="kyz-title">
            <div class="common-name">{{ state.carRental.name }}</div>
          </div>
          <div class="common-right-div">
            <div class="common-total-name">{{ state.carRental.totalName }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.carRental.total }}
              </div>
              <div class="common-total-unit">
                {{ state.carRental.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-div1 bottom-box">
        <div class="flex">
          <div class="icon-style">
            <q-img @click="trafficStationClick(state.passengerStation.code)" src="icons/切图-地理信息全要素一张图_slices/联集 15.png"
              style="margin-top: 30px;" spinner-color="white" class="icon-style"></q-img>
          </div>
          <div class="gjz-title">
            <div class="common-name">{{ state.busStop.name }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="common-right-div">
            <div class="common-total-name">{{ state.busStop.totalName }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.busStop.total }}
              </div>
              <div class="common-total-unit">
                {{ state.busStop.unit }}
              </div>
            </div>
            <div class="common-total-name">{{ state.busStop.totalName1 }}</div>
            <div class="common-total">
              <div class="common-total-number">
                {{ state.busStop.total1 }}
              </div>
              <div class="common-total-unit">
                {{ state.busStop.unit1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="TrafficStation">
import { reactive, onMounted, defineAsyncComponent } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";

const storeLegendInfo = legendInfo();
const storeThemeConfig = useThemeConfig();
// const { themeConfig } = storeToRefs(storeThemeConfig);

const state = reactive({
  passengerStation: {
    name: "客运站",
    code: "passengerStation-geographicInfo",
    icon: "img:icons/cdsgl/geographicInfo/交通场站-客运站.svg",
    triangleColor: "rgba(255, 145, 106, 1)",
    totalName: "总数",
    total: 11,
    unit: "个",
  },
  busStop: {
    name: "公交站",
    code: "busHub-geographicInfo",
    icon: "img:icons/cdsgl/geographicInfo/交通场站-公交站.svg",
    triangleColor: "rgba(125, 210, 240, 1)",
    totalName: "枢纽站",
    total: 18,
    unit: "个",
    totalName1: "营运线路",
    total1: 155,
    unit1: "条",
  },
  carMaintenance: {
    name: "汽车维修",
    code: "vehicleMaintenance-geographicInfo",
    icon: "img:icons/cdsgl/geographicInfo/交通场站-汽车维修.svg",
    triangleColor: "rgba(213, 125, 240, 1)",
    totalName: "总数",
    total: 500,
    unit: "家",
  },
  drivingTraining: {
    name: "驾驶培训",
    code: "drivingTraining-geographicInfo",
    icon: "img:icons/cdsgl/geographicInfo/交通场站-驾驶培训.svg",
    triangleColor: "rgba(125, 152, 240, 1)",
    totalName: "总数",
    total: 40,
    unit: "家",
  },
  carRental: {
    name: "汽车租赁",
    code: "carRental-geographicInfo",
    icon: "img:icons/cdsgl/geographicInfo/交通场站-汽车租赁.svg",
    triangleColor: "rgba(96, 255, 215, 1)",
    totalName: "总数",
    total: 60,
    unit: "家",
  },
});

/**点击事件 */
const trafficStationClick = (type: any) => {
  storeLegendInfo.setSelectLegendType(type);
};
</script>
<style scoped>
.top-left {
  top: 60px;
  left: 50px;
}

.top-right {
  top: 60px;
  right: 80px;
}

.bottom-left {
  bottom: 280px;
  left: 20px;
}

.bottom-right {
  bottom: 280px;
  right: 20px;
}

.bottom-box {
  bottom: 80px;
  left: 32%;
  transform: translateX(-16%);
}


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

.traffic-station {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 100px;
}

.content {
  width: 100%;
  height: 100%;
  padding: 52px 56px 76px 48px;
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 49.png') no-repeat center;
  position: relative;
}

.common-div {
  width: auto;
  height: 126px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-bottom: 30px;
  position: absolute;
}

.common-div1 {
  width: auto;
  height: 126px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  padding-bottom: 30px;
  position: absolute;
}

.icon-style {
  width: 120px;
  height: 96px;
}

.kyz {
  width: auto;
  height: 100%;
}

.kyz-title {
  /* padding-left: 22px; */
  width: 254px;
  height: 100%;
  border-radius: 0px 0px 0px 0px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.triangle-right {
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 25px solid rgba(255, 145, 106, 1);
  /* 三角形颜色 */
}

.common-name {
  padding-left: 18px;
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-size: 40px;
  line-height: 56px;
  background: linear-gradient(180deg, #ffffff 0%, #4d9eff 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.common-right-div {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.common-total-name {
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-size: 36px;
  color: #e0ecff;
  line-height: 36px;
  padding-left: 28px;
}

.common-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-right: 42px;
}

.common-total-number {
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-size: 56px;
  color: #ffffff;
  line-height: 56px;
  margin-left: 20px;
  text-align: right;
  width: 120px;
}

.common-total-unit {
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-size: 28px;
  color: #5385c4;
  line-height: 26px;
  margin-left: 5px;
}

.gjz-title {
  padding-left: 22px;
  width: 254px;
  height: 100%;
  /* background: rgba(125, 210, 240, 0.05); */
  border-radius: 0px 0px 0px 0px;
  display: flex;
  justify-content: left;
  align-items: center;
}

.gjz-middle-div {
  width: 360px;
  height: 100%;
  /* background: rgba(125, 210, 240, 0.1); */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gjz-right-div {
  padding-left: 40px;
  height: 100%;
}

.gjz-right-content {
  width: 400px;
  height: 100%;
  background: rgba(125, 210, 240, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qcwx-title {
  padding-left: 22px;
  width: 254px;
  height: 100%;
  background: rgba(125, 210, 240, 0.05);
  border-radius: 0px 0px 0px 0px;
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
