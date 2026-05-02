<template>
  <div class="ability-content">
    <div class="ability-content-box column gap-[10px]">
      <div class="ability-content-topS row justify-evenly items-center">
        <div class="ability-content-topS-item" :class="{ 'topS-item-active': activeItem === '1' }"
          @click="activeItem = '1'">深化“四基四化”建设</div>
        <div class="ability-content-topS-line"></div>
        <div class="ability-content-topS-item" :class="{ 'topS-item-active': activeItem === '2' }"
          @click="activeItem = '2'">提升综合业务素质</div>
      </div>
      <div class="ability-content-item col" v-if="activeItem === '1'">
        <div class="specification-content row justify-evenly items-center">
          <div class="specification-content-tName">基础管理制度规范化</div>
          <div class="specification-content-tValue">
            145
            <span>项</span>
          </div>
          <img class="specification-content-img" src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" alt=""
            @click="handleOpenDialog('基础管理制度规范化')">
        </div>
        <div class="specification-items row justify-between">
          <div class="specification-item" @click="handleOpenDialog(item.content)" v-for="item in specificationItems"
            :key="item.img">
            <img :src="item.img" alt="" class="specification-item-img">
            <div class="specification-item-name">{{ item.content }}</div>
          </div>
        </div>
      </div>
      <div class="ability-content-item col" v-else>
        <div class="business-content row justify-between">
          <div class="business-content-item" v-for="item in businessItems" :key="item.name">
            <div class="business-content-item-top">{{ item.name }}</div>
            <div class="business-content-item-bottom">
              {{ item.value }}
              <span>{{ item.unit }}</span>
              <img class="business-content-item-bottom-img" src="images/cdsgl/trafficLawEnforcement/seebelowicon.png"
                alt="" @click="handleOpenDialog(item.name)">
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogCom v-if="activeDialog === '基础管理制度规范化'">
      <BasicManagement :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '基层执法工作信息化'">
      <ImgCarousel :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '基层执法队伍职业化'">
      <ImgCarousel :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '基层执法站所标准化'">
      <ImgCarousel :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '领导班子集体学法'">
      <LeadershipTeam :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '法律法规培训'">
      <RegulatoryTraining :title="activeDialog" />
    </DialogCom>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
const activeItem = ref("1");

//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);
const BasicManagement = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/basicManagement.vue")
);

const LeadershipTeam = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/leadershipTeam.vue")
);

const RegulatoryTraining = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/regulatoryTraining.vue")
);

const ImgCarousel = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/imgCarousel.vue")
);

const specificationItems = ref([
  {
    img: "images/cdsgl/trafficLawEnforcement/video1.png",
    content: "基层执法工作信息化"
  },
  {
    img: "images/cdsgl/trafficLawEnforcement/video2.png",
    content: "基层执法队伍职业化"
  },
  {
    img: "images/cdsgl/trafficLawEnforcement/video3.png",
    content: "基层执法站所标准化"
  }
]);

const businessItems = ref([
  {
    name: "领导班子集体学法",
    value: "22",
    unit: "次"
  },
  {
    name: "法律法规培训",
    value: "14",
    unit: "次"
  }
]);

const handleOpenDialog = (title: string) => {
  activeDialog.value = title
}
</script>

<style scoped lang="scss">
.ability-content {
  width: 100%;
  height: 100%;
  padding: 68px 65px 52px;
}

.ability-content-box {
  width: 100%;
  height: 100%;
}

.ability-content-topS {
  width: 100%;

  .ability-content-topS-item {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 36px;
    color: #C2D2D4;
    line-height: 45px;
    text-shadow: 2px 4px 8px #0D5E6C;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .topS-item-active {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 700;
    font-size: 36px;
    color: #FFFFFF;
    line-height: 50px;
    text-shadow: 2px 4px 8px #0D5E6C;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(270deg, rgba(45, 162, 224, 0) 3%, rgba(45, 162, 224, 0.6) 52%, rgba(45, 162, 224, 0) 100%);
    border-radius: 0px 0px 0px 0px;
  }

  .ability-content-topS-line {
    width: 0px;
    height: 30px;
    border: 4px solid rgba(111, 182, 202, 0.91);
  }
}

.ability-content-item {
  width: 100%;

  .specification-content {
    width: 100%;
    height: 78px;
    background-image: url("images/cdsgl/trafficLawEnforcement/gfbg.png");
    background-size: 100% 100%;
    padding: 0px 60px;

    .specification-content-tName {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 600;
      font-size: 36px;
      color: #7AC5FF;
      line-height: 36px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, rgba(122, 197, 255, 1) 0%, #FFFFFF 50%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .specification-content-tValue {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 700;
      font-size: 48px;
      color: #FFFFFF;
      line-height: 48px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      span {
        font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
        font-weight: 700;
        font-size: 28px;
        color: #5385C4;
        line-height: 26px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }

    .specification-content-img {
      width: 34px;
      height: 33px;
    }
  }

  .specification-item {
    padding-top: 10px;

    .specification-item-img {
      width: 232px;
      height: 135px;
      border-radius: 0px 0px 0px 0px;
    }

    .specification-item-name {
      width: 200px;
      height: 90px;
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 400;
      font-size: 32px;
      color: #FFFFFF;
      line-height: 45px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      padding-top: 12px;
    }
  }
}

.ability-content-item {
  width: 100%;

  .business-content {
    padding: 50px 20px 50px;
  }

  .business-content-item {
    width: 328px;
    height: 232px;
    background-image: url("images/cdsgl/trafficLawEnforcement/ywbg.png");
    background-size: 100% 100%;

    .business-content-item-top {
      width: 100%;
      height: 100px;
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 400;
      font-size: 32px;
      line-height: 100px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #9FE7FF 0%, #9FEAFF 25%, #EAFEFF 85%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .business-content-item-bottom {
      width: 100%;
      height: 132px;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 64px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(57.40937470425966deg, #FFFFFF 23%, #AAD0FF 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;

      .business-content-item-bottom-img {
        width: 34px;
        height: 33px;
        position: absolute;
        top: 0px;
        right: 17px;
      }

      span {
        font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
        font-weight: 400;
        font-size: 32px;
        color: #E6F6FA;
        line-height: 44px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
</style>
