<template>
  <div class="row items-center travel-service">
    <div class="col">
      <div class="travel-service-item">
        <div class="row items-center travel-service-item-content">
          <div class="col-auto">
            <q-icon name="img:icons/trafficTravel/出行服务.png" class="travel-service-icon"></q-icon>
          </div>
          <div class="col-auto"> <span class="travel-service-item-label">今日推送</span></div>
          <div class="col-auto">
            <span class="travel-service-item-val">2</span>
          </div>
          <div class="col-auto"><span class="travel-service-item-label">起</span></div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="travel-service-item">
        <div class="row items-center travel-service-item-content">
          <div class="col-auto">
            <q-icon name="img:icons/trafficTravel/出行服务.png" class="travel-service-icon"></q-icon>
          </div>
          <div class="col-auto"> <span class="travel-service-item-label">本月推送</span></div>
          <div class="col-auto">
            <span class="travel-service-item-val2">2</span>
          </div>
          <div class="col-auto"><span class="travel-service-item-label">起</span></div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <q-icon name="img:icons/trafficTravel/发送.png" class="send-icon"></q-icon>
    </div>
  </div>
  <!-- <PushNewInfo></PushNewInfo> -->
</template>
<script setup lang="ts" name="TravelService">
import { defineAsyncComponent } from "vue";
const PushNewInfo = defineAsyncComponent(() => import("./PushNewInfo.vue"));
</script>
<style scoped>
.travel-service {
  width: 100%;
  height: 100%;
  background: url('assets/image/trafficTravel/出行服务背景.png');
  background-size: 100% 100%;
}

.travel-service-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.travel-service-item-content {
  width: 428px;
  height: 112px;
  background: rgba(6, 140, 107, 0.2);
  box-shadow: inset 0px 0px 27px 0px #068C6B;
  border-radius: 20px 20px 20px 20px;
  border: 2px solid #068C6B;
}

.travel-service-icon {
  width: 128px;
  height: 146px;
  margin: -80px 30px 0 30px;
}

.travel-service-item-label {
  padding: 0 10px;
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 28px;
  color: #89FFE1;
  line-height: 39px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.travel-service-item-val {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 72px;
  color: #00FF55;
  line-height: 101px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.travel-service-item-val2 {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 72px;
  color: #00DDFF;
  line-height: 101px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.send-icon {
  font-size: 69px;
  margin-right: 80px;
}
</style>
