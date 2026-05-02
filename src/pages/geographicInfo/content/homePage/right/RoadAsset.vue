<!--一张图-右侧-道路资产-->
<template>
  <div class="road-asset column">
    <!-- <titleSmall class="col-auto" title="道路资产"></titleSmall> -->
    <div class="card-title">
      <div class="card-text">道路资产</div>
    </div>
    <div class="col-auto top">
      <div class="top-item">
        <q-img src="icons/切图-地理信息全要素一张图_slices/icon.png" spinner-color="white" class="info-icon"></q-img>
        <div class="right-box">
          <div class="item-top">
            <div class="item-name">{{ state.bridgeInfo.name }}</div>
            <div class="item-more"></div>
          </div>
          <div class="item-bottom">
            <div class="item-left">
              <div class="bottom-name">{{ state.bridgeInfo.totalSeatTitle }}</div>
              <div class="bottom-number">{{ state.bridgeInfo.totalSeatNum }}
                <div class="bottom-unit">{{ state.bridgeInfo.totalSeatUnit }}</div>
              </div>
            </div>
            <div class="item-right">
              <div class="bottom-name">{{ state.bridgeInfo.totalMileTitle }}</div>
              <div class="bottom-number">{{ state.bridgeInfo.totalMileNum }}
                <div class="bottom-unit">{{ state.bridgeInfo.totalMileUnit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top-item">
        <q-img src="icons/切图-地理信息全要素一张图_slices/icon.png" spinner-color="white" class="info-icon"></q-img>
        <div class="right-box">
          <div class="item-top">
            <div class="item-name">{{ state.tunnelInfo.name }}</div>
            <div class="item-more"></div>
          </div>
          <div class="item-bottom">
            <div class="item-left">
              <div class="bottom-name">{{ state.tunnelInfo.totalSeatTitle }}</div>
              <div class="bottom-number">{{ state.tunnelInfo.totalSeatNum }}
                <div class="bottom-unit">{{ state.tunnelInfo.totalSeatUnit }}</div>
              </div>
            </div>
            <div class="item-right">
              <div class="bottom-name">{{ state.tunnelInfo.totalMileTitle }}</div>
              <div class="bottom-number">{{ state.tunnelInfo.totalMileNum }}
                <div class="bottom-unit">{{ state.tunnelInfo.totalMileUnit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col bottom">
      <div class="arr-left"></div>
      <div class="arr-right"></div>
      <div class="item-1">
        <div class="bottom-name-end">汽车充电站</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-2">
        <div class="bottom-name-end">服务区</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-3">
        <div class="bottom-name-end">收费站</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-4">
        <div class="bottom-name-end">停车区</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-5">
        <div class="bottom-name-end">交调站</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-6">
        <div class="bottom-name-end">治超站</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-7">
        <div class="bottom-name-end">养护工区</div>
        <div class="bottom-count">47<span class="unit">个</span></div>
      </div>
      <div class="item-8">
        <div class="bottom-name-end">...</div>
        <!-- <div class="bottom-count">47<span class="unit">个</span></div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="RoadAsset">
import { reactive, onMounted, defineAsyncComponent, watch } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";
const storeThemeConfig = useThemeConfig();
// const { themeConfig } = storeToRefs(storeThemeConfig);

const state = reactive({
  bridgeInfo: {
    name: "桥梁",
    totalSeatNum: 5606,
    totalMileNum: 462.58,
    totalSeatUnit: "座",
    totalMileUnit: "km",
    totalSeatTitle: "总座数：",
    totalMileTitle: "总里程：",
  },
  tunnelInfo: {
    name: "隧道",
    totalSeatNum: 5606,
    totalMileNum: 462.58,
    totalSeatUnit: "座",
    totalMileUnit: "km",
    totalSeatTitle: "总座数：",
    totalMileTitle: "总里程：",
  },
  bublleData: [
    [[0, 20, 260, "治超站"]],
    [[5, 45, 250, "交调站"]],
    [[20, 33, 260, "收费站"]],
    [[45, 42, 370, "汽车充电站"]],
    [[65, 30, 270, "服务区"]],
    [[78, 50, 270, "养护工区"]],
    [[80, 10, 240, "停车区"]],
  ],
  bublleNumber: [18, 22, 26, 47, 25, 15, 24],
  bublleChart: null as any,
  bublleOption: null as any,
});


onMounted(() => {
});
</script>

<style scoped>
.card-title {
  background: url('src/assets/component/切图-地理信息全要素一张图_slices/标题栏(3).png') no-repeat center/cover;
  width: 1460px;
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

.road-asset {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 160px;
}

.top {
  width: 100%;
  padding: 20px 40px 40px;
  display: flex;
  flex-direction: column;
}

.top-item {
  display: flex;
  align-items: center;
  margin-bottom: 37px;
}

.info-icon {
  width: 157.19px;
  height: 157.19px;
}

.right-box {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.item-top {
  width: 1292px;
  height: 66px;
  background: url('assets/component/切图-地理信息全要素一张图_slices/Vector(4).png') no-repeat center/cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 42px;
  padding-right: 39px;
}

.item-name {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FFFFFF 0%, #4D9EFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.item-more {
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, #04FFFF 0%, #08A9FF 100%);
}

.item-bottom {
  flex: 1;
  display: flex;
}

.item-left {
  flex: 1;
  border-right: 1px solid #40BCFF;
  background: linear-gradient(90deg, rgba(19, 62, 84, 0.3) 3%, rgba(9, 169, 255, 0.3) 100%);
  display: flex;
  align-items: center;
  padding-left: 42px;
}

.item-right {
  flex: 1;
  background: linear-gradient(90deg, rgba(19, 62, 84, 0.3) 3%, rgba(9, 169, 255, 0.3) 100%);
  display: flex;
  align-items: center;
  padding-left: 42px;
}

.bottom-name {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 600;
  font-size: 32px;
  color: #E0ECFF;
  line-height: 32px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  width: 280px;
}

.bottom-number {
  flex: 1;
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 48px;
  color: #FFFFFF;
  line-height: 48px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  display: flex;
  align-items: end;
}

.bottom-unit {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 28px;
  color: #5385C4;
  line-height: 40px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-left: 20px;
}


.bottom {
  width: 100%;
  height: 100%;
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 36730.png') no-repeat center;
  position: relative;
}

.arr-left {
  width: 131.88px;
  height: 510.72px;
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 36731.png') no-repeat center;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 2%;
}

.arr-right {
  width: 131.88px;
  height: 510.72px;
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 36658.png') no-repeat center;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 2%;
}

.item-1 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43080.png') no-repeat center;
  position: absolute;
  width: 378.91px;
  height: 98.57px;
  top: 10%;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
  padding-right: 80px;
  padding-top: 10px;
}

.bottom-name-end {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 29px;
  color: #FFFFFF;
  line-height: 27px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.bottom-count {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 34px;
  color: #40BCFF;
  line-height: 27px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.unit {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 21px;
  color: #40BCFF;
  line-height: 27px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.item-2 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43084.png') no-repeat center;
  position: absolute;
  width: 378.91px;
  height: 98.57px;
  top: 10%;
  right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding-left: 80px;
  padding-top: 10px;
}

.item-3 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43079.png') no-repeat center;
  position: absolute;
  width: 349.05px;
  height: 98.57px;
  top: 33%;
  left: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
  padding-right: 50px;
  padding-top: 10px;
}

.item-4 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43083.png') no-repeat center;
  position: absolute;
  width: 349.05px;
  height: 98.57px;
  top: 33%;
  right: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding-left: 50px;
  padding-top: 10px;
}

.item-5 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43081.png') no-repeat center;
  position: absolute;
  width: 348.73px;
  height: 98.57px;
  top: 55%;
  left: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
  padding-right: 50px;
  padding-top: 10px;
}

.item-6 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43085.png') no-repeat center;
  position: absolute;
  width: 348.73px;
  height: 98.57px;
  top: 55%;
  right: 7%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding-left: 50px;
  padding-top: 10px;
}

.item-7 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43082.png') no-repeat center;
  position: absolute;
  width: 386.97px;
  height: 98.57px;
  top: 75%;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: end;
  padding-right: 90px;
  padding-top: 10px;
}

.item-8 {
  background: url('assets/component/切图-地理信息全要素一张图_slices/组 43086.png') no-repeat center;
  position: absolute;
  width: 386.97px;
  height: 98.57px;
  top: 75%;
  right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding-left: 80px;
  /* padding-top: 10px; */
}
</style>
