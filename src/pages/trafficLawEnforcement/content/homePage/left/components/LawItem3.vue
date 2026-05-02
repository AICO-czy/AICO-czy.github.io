<template>
  <div class="lawItem3">
    <div class="lawItem3-content column gap-[14px]">
      <div class="lawItem3-content-item row items-center" v-for="item in administrativeLoadData" :key="item.name">
        <div class="lawItem3-content-item-content row justify-between items-center">
          <span class="lawItem3-content-item-name">{{ item.name }}</span>
          <div class="lawItem3-content-item-value row items-center">
            {{ item.value }}
            <span>{{ item.unit }}</span>
          </div>
          <img @click="handleOpenDialog(item.name)" class="arrow"
            src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" alt="">
        </div>
      </div>
    </div>
    <DialogCom v-if="activeDialog === '行政处罚裁量权基准'">
      <BenchmarkDialog1 :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '行政许可裁量权基准'">
      <BenchmarkDialog2 :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '行政确认裁量权基准'">
      <BenchmarkDialog3 :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '行政强制裁量权基准'">
      <BenchmarkDialog4 :title="activeDialog" />
    </DialogCom>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, defineAsyncComponent } from 'vue'
import { useLawActiveDialogStore } from "../../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);

//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);

const BenchmarkDialog1 = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/benchmarkDialog1.vue")
);

const BenchmarkDialog2 = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/benchmarkDialog2.vue")
);

const BenchmarkDialog3 = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/benchmarkDialog3.vue")
);

const BenchmarkDialog4 = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/benchmarkDialog4.vue")
);



const administrativeLoadData = ref([
  {
    name: "行政处罚裁量权基准",
    value: "293",
    unit: "项"
  },
  {
    name: "行政许可裁量权基准",
    value: "41",
    unit: "项"
  },
  {
    name: "行政确认裁量权基准",
    value: "11",
    unit: "项"
  },
  {
    name: "行政强制裁量权基准",
    value: "26",
    unit: "项"
  }
])

const handleOpenDialog = (title: string) => {
  activeDialog.value = title
}
</script>

<style scoped lang="scss">
.lawItem3 {
  width: 100%;
  height: 100%;
  padding: 20px 10px 15px;
}

.lawItem3-content {
  width: 100%;
  height: 100%;
}

.lawItem3-content-item {
  width: 659px;
  height: 60px;
  background-image: url("images/cdsgl/trafficLawEnforcement/lawitem3bg.png");
  position: relative;
}

.lawItem3-content-item-content {
  width: 100%;
  height: 100%;
  padding: 0px 80px;
}

.lawItem3-content-item-name {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 400;
  font-size: 30px;
  line-height: 42px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #9FE7FF 0%, #9FEAFF 25%, #EAFEFF 85%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.lawItem3-content-item-value {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 40px;
  line-height: 40px;
  text-shadow: 0px 50px 31px rgba(181, 213, 248, 0.06);
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(57.40937470425966deg, #FFFFFF 23%, #AAD0FF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 28px;
    color: #E6F6FA;
    line-height: 28px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-left: 10px;
  }
}

.arrow {
  width: 34px;
  height: 34px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
