<template>
  <div class="lawItem1">
    <div class="lawItem1-content">
      <div class="lawItem1-content-top row justify-around items-center">
        <div class="top-item" :class="{ 'top-item-active': activeItem === '1' }" @click="activeItem = '1'">
          落实三项制度
        </div>
        <div class="top-line"></div>
        <div class="top-item" :class="{ 'top-item-active': activeItem === '2' }" @click="activeItem = '2'">
          新型执法模式
        </div>
      </div>
      <div class="lawItem1-content-bottom" v-if="activeItem === '1'">
        <div class="law-bottom row justify-between">
          <div class="law-bottom-item" v-for="item in businessItems" :key="item.name">
            <div class="law-bottom-item-top" :title="item.name">{{ item.name }}</div>
            <div class="law-bottom-item-bottom">
              {{ item.value }}
              <span>{{ item.unit }}</span>
              <img v-if="item.name === '重大执法决定法制审核制度'" class="law-bottom-item-bottom-img"
                src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = item.name" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="lawItem1-content-bottom" v-else>
        <div class="law-bottom-r row justify-between">
          <div class="law-bottom-r-left">
            <div class="law-bottom-r-left-content">
              <div class="law-bottom-r-left-content-top row justify-between no-wrap items-start">
                <ItemTitle title="涉企行政检查工作事項" :size="28" width="70%" />
                <img src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = '涉企行政检查工作事項'"
                  class="arrow" alt="">
              </div>
              <div class="law-bottom-r-left-content-bottom column justify-center items-center gap-[5px]">
                <div class="law-bottom-r-left-content-bottom-value">
                  14
                  <span>项</span>
                </div>
                <div class="law-bottom-r-left-content-bottom-name">
                  涉企行政检查工作事项
                </div>
              </div>
            </div>
          </div>
          <div class="law-bottom-r-right">
            <div class="law-bottom-r-left-content">
              <div class="law-bottom-r-left-content-top row justify-between no-wrap items-start">
                <ItemTitle title="双随机一公开" :size="28" width="70%" />
                <img src="images/cdsgl/trafficLawEnforcement/seebelowicon.png" @click="activeDialog = '双随机一公开'"
                  class="arrow" alt="">
              </div>
              <div class="law-bottom-r-left-content-bottom1 row justify-evenly">
                <div>
                  <div class="law-bottom-r-left-content-bottom-value">
                    4
                    <span>项</span>
                  </div>
                  <div class="law-bottom-r-left-content-bottom-name1">
                    内部随机抽查
                  </div>
                </div>
                <div>
                  <div class="law-bottom-r-left-content-bottom-value">
                    5
                    <span>项</span>
                  </div>
                  <div class="law-bottom-r-left-content-bottom-name1">
                    联合部门抽查
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DialogCom v-if="activeDialog === '重大执法决定法制审核制度'">
      <CensorshipSystem :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '涉企行政检查工作事項'">
      <RelatedAdministrationInspect :title="activeDialog" />
    </DialogCom>
    <DialogCom v-if="activeDialog === '双随机一公开'">
      <DoubleRandom :title="'“双随机一公开”计划表'" />
    </DialogCom>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs } from "vue";
import { useLawActiveDialogStore } from "../../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
//项标题
const ItemTitle = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/ItemTitle.vue")
);
//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);

const CensorshipSystem = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/censorshipSystem.vue")
);
const DoubleRandom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/doubleRandom.vue")
);
const RelatedAdministrationInspect = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/relatedAdministrationInspect.vue")
);
const activeItem = ref("1");

const businessItems = ref([
  {
    name: "行政执法公式制度",
    value: "2303",
    unit: "项"
  },
  {
    name: "全过程记录制度",
    value: "2224",
    unit: "项"
  },
  {
    name: "重大执法决定法制审核制度",
    value: "69",
    unit: "项"
  }
]);
</script>

<style scoped lang="scss">
.lawItem1 {
  width: 100%;
  height: 100%;
  padding-top: 30px;
}

.lawItem1-content {
  width: 100%;
  height: 100%;
}

.lawItem1-content-top {
  width: 100%;

  // padding: 0px 10px;
  .top-item {
    width: 304px;
    height: 60px;
    background-image: url("images/cdsgl/trafficLawEnforcement/nolawSelect.png");
    background-size: 100% 100%;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 34px;
    color: #C2D2D4;
    line-height: 60px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .top-line {
    width: 0px;
    height: 30px;
    border: 4px solid rgba(111, 182, 202, 0.91);
  }

  .top-item-active {
    width: 304px;
    height: 60px;
    background-image: url("images/cdsgl/trafficLawEnforcement/lawSelect.png");
    background-size: 100% 100%;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 700;
    font-size: 34px;
    color: #FFFFFF;
    line-height: 60px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.law-bottom {
  padding: 43px 0px 30px;
}

.law-bottom-item {
  width: 234px;
  height: 166px;
  background-image: url("images/cdsgl/trafficLawEnforcement/ywbg.png");
  background-size: 100% 100%;

  .law-bottom-item-top {
    width: 100%;
    height: 66px;
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 400;
    font-size: 32px;
    line-height: 66px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #9FE7FF 0%, #9FEAFF 25%, #EAFEFF 85%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
    /* 2. 隐藏超出容器的内容 */
    overflow: hidden;
    /* 3. 超出部分显示省略号 */
    text-overflow: ellipsis;
  }

  .law-bottom-item-bottom {
    width: 100%;
    height: 100px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 42px;
    line-height: 80px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(57.40937470425966deg, #FFFFFF 23%, #AAD0FF 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;

    .law-bottom-item-bottom-img {
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

.law-bottom-r {
  padding: 18px 0px 10px;
}

.law-bottom-r-left {
  width: 345px;
  height: 202px;
  background: rgba(39, 79, 121, 0.2);
  box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
  border-radius: 10px 10px 10px 10px;
  padding: 15px 14px 19px;
}

.law-bottom-r-right {
  width: 345px;
  height: 202px;
  background: rgba(39, 79, 121, 0.2);
  box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
  border-radius: 10px 10px 10px 10px;
  padding: 15px 14px 19px;
}

.law-bottom-r-left-content-bottom {
  width: 311px;
  height: 110px;
  background: rgba(39, 79, 121, 0.2);
  box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
  border-radius: 10px 10px 10px 10px;
  margin-top: 15px;
}

.law-bottom-r-left-content-bottom-value {
  font-family: D-DIN Condensed, D-DIN Condensed;
  font-weight: 400;
  font-size: 46px;
  color: #FFFFFF;
  line-height: 64px;
  text-align: center;
  font-style: normal;
  text-transform: none;

  span {
    font-family: D-DIN Condensed, D-DIN Condensed;
    font-weight: 400;
    font-size: 28px;
    color: rgba(255, 255, 255, 0.40);
    line-height: 28px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.law-bottom-r-left-content-bottom-name {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 28px;
  color: #78BEFF;
  line-height: 28px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.law-bottom-r-left-content-bottom-name1 {
  width: 121px;
  height: 64px;
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 28px;
  color: #78BEFF;
  line-height: 32px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.arrow {
  width: 34px;
  height: 34px;
}
</style>
