<template>
  <div class="home-index">
    <div class="dialog-arrow-open" v-if="state.rightdialog" @click="changeRightDialogStauts"></div>
    <div class="dialog-arrow-close" v-if="!state.rightdialog" @click="changeRightDialogStauts"></div>
    <q-dialog v-model="state.leftdialog" seamless position="left" transition-show="slide-right"
      transition-hide="slide-left" class="left-page-dialog-traffic">
      <div class="container-left-page no-shadow">
        <HomeLeftNew />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-traffic">
      <div class="container-right-page no-shadow">
        <HomeRightMain @close-page="handleClose" v-if="state.moudleName == 'home'" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog1" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-traffic1">
      <div class="container-right-page1 no-shadow">
        <TrafficTravelRightIndex @close-page="handleClose" v-if="state.moudleName == 'oneRoad'" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog2" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-traffic2">
      <div class="container-right-page2 no-shadow">
        <RuralRoadRight @close-page="handleClose" v-if="state.moudleName == 'ruralRoad'" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog3" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-traffic3">
      <div class="container-right-page3 no-shadow">
        <ReadRoadRight @close-page="handleClose" v-if="state.moudleName == 'redRoad'" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog4" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-traffic4">
      <div class="container-right-page4 no-shadow">
        <!-- <HomeRight
          @close-page="handleClose"
          v-if="state.moudleName == 'home'"
        /> -->
        <HomeRightNew />
      </div>
    </q-dialog>
    <q-dialog v-model="state.bottomdialog" seamless position="bottom" class="bottom-tool-dialog z-top">
      <div class="container-bottom-tool no-shadow z-top">
        <!-- <q-btn round class="tool-btn" icon="img:icons/照片.png" @click="handleClick('overView')"></q-btn> -->
        <!-- <q-btn round class="tool-btn" icon="img:icons/人工机器人.png"></q-btn> -->
      </div>
    </q-dialog>
    <!-- 天气模组 -->
    <RoadCom />

    <RightList :style="{ right: state.rightdialog ? '18%' : '2%' }" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref, watch } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import { storeToRefs } from "pinia";
import RoadWarning from '../../components/RoadWarning.vue'
import MeteorologicalWarning from '../../components/MeteorologicalWarning.vue'
import RightList from '../../components/rightList.vue'
import RoadCom from '../../components/roadCom.vue'

//const HomeLeft = defineAsyncComponent(() => import("./HomeLeft.vue"));
const HomeLeftNew = defineAsyncComponent(() => import("./HomeLeftNew.vue"));
const HomeRight = defineAsyncComponent(() => import("./HomeRight.vue"));
const HomeRightMain = defineAsyncComponent(() => import("./HomeRightMain.vue"));
const HomeRightNew = defineAsyncComponent(() => import("./HomeRightNew.vue"));
const RuralRoadRight = defineAsyncComponent(
  () => import("../right/RuralRoadRight.vue")
);
const TrafficTravelRightIndex = defineAsyncComponent(
  () => import("../right/trafficTravelRightIndex.vue")
);
const ReadRoadRight = defineAsyncComponent(
  () => import("../right/ReadRoadRight.vue")
);
const storeOtherInfo = otherInfo();
const { selectArea } = storeToRefs(storeOtherInfo);

const state = reactive({
  topdialog: false,
  leftdialog: true,
  rightdialog: true,
  rightdialog1: false,
  rightdialog2: false,
  rightdialog3: false,
  rightdialog4: false,
  bottomdialog: true,
  moudleName: "home",
});

const handleClose = (val: any) => {
  if (val == "homeRightClose") {
    state.rightdialog = false;
  } else if (val == "oneRoadClose") {
    state.rightdialog1 = false;
  } else if (val == "ruralRoadClose") {
    state.rightdialog2 = false;
  } else if (val == "redRoadClose") {
    state.rightdialog3 = false;
  } else if (val == "overviewRightClose") {
    state.rightdialog4 = false;
  }
};

const handleClick = (val: any) => {
  storeOtherInfo.setSelectArea(val);
};

watch(
  () => selectArea,
  () => {
    state.moudleName = selectArea.value;
    if (selectArea.value == "home") {
      state.rightdialog = true;
      state.rightdialog1 = false;
      state.rightdialog2 = false;
      state.rightdialog3 = false;
      state.rightdialog4 = false;
    } else if (selectArea.value == "oneRoad") {
      state.rightdialog = false;
      state.rightdialog1 = true;
      state.rightdialog2 = false;
      state.rightdialog3 = false;
      state.rightdialog4 = false;
    } else if (selectArea.value == "ruralRoad") {
      state.rightdialog = false;
      state.rightdialog1 = false;
      state.rightdialog2 = true;
      state.rightdialog3 = false;
      state.rightdialog4 = false;
    } else if (selectArea.value == "redRoad") {
      state.rightdialog = false;
      state.rightdialog1 = false;
      state.rightdialog2 = false;
      state.rightdialog3 = true;
      state.rightdialog4 = false;
    } else if (selectArea.value == "overView") {
      state.rightdialog = false;
      state.rightdialog1 = false;
      state.rightdialog2 = false;
      state.rightdialog3 = false;
      state.rightdialog4 = true;
    }
  },
  {
    deep: true,
  }
);

const changeRightDialogStauts = () => {
  state.rightdialog = !state.rightdialog;
};

onMounted(() => { });
</script>

<style>
.q-dialog__inner.flex {
  padding: 0 !important;
}

.left-page-dialog-traffic>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 124px;
  left: 218px;
  bottom: 73px;
  padding: 0;
}

.left-page-dialog-traffic .container-left-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-traffic>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 234px;
  bottom: 77px;
  right: 193px;
  padding: 0;
}

.right-page-dialog-traffic .container-right-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-traffic1>.fixed-right {
  top: 80px;
  bottom: 142px;
  right: 118px;
}

.right-page-dialog-traffic1 .container-right-page1 {
  width: 1676px !important;
  max-width: 1522px !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-traffic2>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 110px;
  /* right: 106px; */
  padding: 0;
}

.right-page-dialog-traffic2 .container-right-page2 {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-traffic3>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 71px;
  right: 50px;
  padding: 0;
}

.right-page-dialog-traffic3 .container-right-page3 {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-traffic4>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 108px;
  /* bottom: 70px; */
  right: 107px;
  padding: 0;
}

.right-page-dialog-traffic4 .container-right-page4 {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.bottom-tool-dialog>.fixed-bottom {
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 0;
}

.container-bottom-tool {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.tool-btn {
  font-size: 48px;
  z-index: 7000;
  float: right;
  margin-right: 100px;
  margin-top: 50px;
}

.dialog-arrow-open {
  width: 68.37px;
  height: 225.73px;
  position: absolute;
  top: 960px;
  right: 1150px;
  transition: right 0.4s cubic-bezier(0.08, 0, 0.1, 1);
  background: url("assets/image/trafficTravel/right/收起.png") no-repeat 100%/100%;
  pointer-events: all;
}

.dialog-arrow-close {
  width: 68.37px;
  height: 225.73px;
  position: absolute;
  top: 960px;
  right: 80px;
  transition: right 0.4s cubic-bezier(0.08, 0, 0.1, 1);
  background: url("assets/image/trafficTravel/right/展开.png") no-repeat 100%/100%;
  pointer-events: all;
}
</style>
