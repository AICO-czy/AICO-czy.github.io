<template>
  <di class="home-left-page">
    <div class="head-title">
      <div class="text">
        <div @click="handleClick">城市交通</div>
      </div>
    </div>

    <div>
      <div>
        <div class="title">
          <div>出租汽车</div>
          <div @click="handleDialogClick('taxiAnalyze')"
            class="cursor-pointer arr top-[10%] left-[35%] w-[60px] h-[59px]"></div>
        </div>
        <div class="content-box1 w-full h-full p-[40px] box-border">
          <LeftTopCom />
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        <div>城市公交</div>
        <div @click="handleDialogClick('busOperation')"
          class="cursor-pointer arr top-[10%] left-[35%] w-[60px] h-[59px]"></div>
      </div>
      <div class="content-box2 w-full h-full px-[80px] box-border pt-[70px]">
        <div class="bg"></div>
        <div class="line-box">
          <div class="box1">
            <div class="hand-btn"></div>
            <div class="item-icon">
              <q-img :src="img1" class="item-icon" alt=""></q-img>
            </div>
            <div>
              <div><span class="w-[189px] cs-item-title ml-[40px]">公交线路</span><span class="cs-blue">51</span><span
                  class="cs-unit">条</span></div>
              <div><span class="cs-title">公交里程</span><span class="cs-green">958</span><span class="cs-unit">公里</span>
              </div>
            </div>
          </div>
          <div class="box2">
            <div class="hand-btn"></div>
            <div class="item-icon">
              <q-img :src="img2" class="item-icon" alt=""></q-img>
            </div>
            <div>
              <div class="w-[189px] cs-item-title">公交站点</div>
              <div><span class="cs-blue">574</span><span class="cs-unit">个</span></div>
            </div>
          </div>
          <div class="box3">
            <div class="hand-btn"></div>
            <div class="item-icon">
              <q-img :src="img3" class="item-icon" alt=""></q-img>
            </div>
            <div>
              <div class="w-[189px] cs-item-title">公交车</div>
              <div><span class="cs-blue">767</span><span class="cs-unit">辆</span></div>
            </div>
            <div>
              <div><span class="cs-title">新能源车辆</span><span class="cs-green">467</span><span class="cs-unit">家</span>
              </div>
              <div><span class="cs-title">新能源占比</span><span class="cs-green">80.3%</span></div>
            </div>
          </div>
        </div>
        <div class="line-box">
          <div class="box4">
            <div class="w-[71px] h-[167px]">
              <q-img :src="img4" class="w-[71px] h-[167px]" alt=""></q-img>
            </div>
            <div>
              <div class="w-[220px] cs-item-title">运行线路数</div>
              <div><span class="cs-blue">767</span><span class="cs-unit">辆</span></div>
              <div class="cs-up">21.50%</div>
            </div>
            <div class="w-[6px] h-[126]">
              <q-img :src="img5" class="w-[6px] h-[126px]" alt=""></q-img>
            </div>
            <div>
              <div class="w-[220px] cs-item-title">运行班次数</div>
              <div><span class="cs-blue">767</span><span class="cs-unit">辆</span></div>
              <div class="cs-down">34.25%</div>
            </div>
            <div class="w-[6px] h-[126]">
              <q-img :src="img5" class="w-[6px] h-[126px]" alt=""></q-img>
            </div>
            <div>
              <div class="w-[189px] cs-item-title">行驶里程</div>
              <div><span class="cs-blue">767</span><span class="cs-unit">辆</span></div>
              <div class="cs-up">28.20%</div>
            </div>
          </div>
          <div class="cs-item-list">
            <div class="box5" v-if="!endCard">
              <div class="w-[161px] h-[159px] relative">
                <q-img :src="img6" class="w-[161px] h-[159px]" alt=""></q-img>
                <div class="cs-hand">
                  <q-img :src="img7" class="w-[29px] h-[42px]" alt="" @click="endCard = !endCard"></q-img>
                </div>
              </div>
              <div>
                <div><span class="cs-title mr-[20px]">今日客流量</span><span class="cs-up">11.50%</span></div>
                <div><span class="cs-yellow">83747</span><span class="cs-unit">人次</span></div>
              </div>
            </div>
            <div class="box5" v-if="endCard">
              <div>
                <div class="cs-title">今日客运量</div>
                <div class="cs-up">11.50%</div>
                <div><span class="cs-yellow">83747</span><span class="cs-unit">人次</span></div>
              </div>
              <div class="w-[161px] h-[159px] absolute">
                <q-img :src="img6" class="w-[161px] h-[159px]" alt=""></q-img>
                <div class="cs-hand">
                  <q-img :src="img7" class="w-[29px] h-[42px]" alt="" @click="endCard = !endCard"></q-img>
                </div>
              </div>
              <div>
                <div class="cs-title" style="text-align: right;">掌静脉客运量</div>
                <div class="cs-b">占比 11.50%</div>
                <div><span class="cs-yellow">83747</span><span class="cs-unit">人次</span></div>
              </div>
              <div class="arr bottom-[5%] right-[0%] w-[60px] h-[59px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </di v>
  <VerticalLegend></VerticalLegend>
  <TaxiAnalyDialog></TaxiAnalyDialog>
  <CruiseTaxiDialog />
  <KeyVehiclesDialog />
  <BusOperationDialog />
  <OperationLogDialog />
  <OnlineRideHailing />
  <Cascader :meunList="menuList" v-model="menuShow" @changeCascader="handleRouter" />
</template>

<script setup lang="ts" name="urbanTraffic">
import { defineAsyncComponent, reactive, ref, watch } from "vue";
import LeftTopCom from './components/leftTopCom.vue'
import CruiseTaxiDialog from './dialog/cruiseTaxiDialog/cruiseTaxiDialog.vue'
import { useAnalyzeDialogStore } from './store/index'
import { storeToRefs } from "pinia";
import OnlineRideHailing from './dialog/onlineRideHailing/OnlineRideHailing.vue'
import img1 from 'src/assets/component/城市交通/切图 765.png'
import img2 from 'src/assets/component/城市交通/切图 766.png'
import img3 from 'src/assets/component/城市交通/切图 767.png'
import img4 from 'src/assets/component/城市交通/切图 770.png'
import img5 from 'src/assets/component/城市交通/切图 776.png'
import img6 from 'src/assets/component/城市交通/切图 839.png'
import img7 from 'src/assets/component/城市交通/切图 841.png'
import Cascader from './components/cascader.vue'
import { useRouter } from "vue-router";

const menuList: any[] = [
  { title: '城市交通全景', icon: '1', id: '1', children: [] },
  {
    title: '基础信息查询', icon: '1', id: '2', children: [
      { title: '城市交通总览', icon: '1', id: '2-1', children: [] },
      { title: '企业信息查询', icon: '1', id: '2-2', children: [] },
      { title: '车辆信息查询', icon: '1', id: '2-3', children: [] },
      { title: '从业人员信息查询', icon: '1', id: '2-4', children: [] },
      // { title: '公交基础信息', icon: '1', id: '2-5', children: [] },
    ]
  },
  // {
  //   title: '车辆运行总览', icon: '1', id: '3', children: [
  //     { title: '车辆运行位置可视化呈现', icon: '1', id: '3-1', children: [] },
  //     { title: '车辆运行信息查询', icon: '1', id: '3-2', children: [] },
  //   ]
  // },
  {
    title: '车辆运行监测', icon: '1', id: '3', children: [
      { title: '车辆运行总览', icon: '1', id: '3-1', children: [] },
      { title: '车辆运行位置可视化呈现', icon: '1', id: '3-2', children: [] },
      { title: '车辆运行信息查询', icon: '1', id: '3-3', children: [] },
    ]
  },
  {
    title: '空间分布监测', icon: '1', id: '4', children: [
      { title: '重点区域（路段）电子围栏设施', icon: '1', id: '4-1', children: [] },
      { title: '重点区域（路段）实时监控', icon: '1', id: '4-2', children: [] },
      { title: '重点区域（路段）车辆排名', icon: '1', id: '4-3', children: [] },
    ]
  },
  {
    title: '运营状态监测', icon: '1', id: '5', children: [
      { title: '车辆运行状态总览', icon: '1', id: '5-1', children: [] },
      { title: '车辆运行状态趋势分析', icon: '1', id: '5-2', children: [] },
      { title: '车辆运行状态可视化', icon: '1', id: '5-3', children: [] },
    ]
  },
  {
    title: '运力投放监测', icon: '1', id: '6', children: [
      { title: '重点区域运行状态监测', icon: '1', id: '6-1', children: [] },
      { title: '重点区域运力排名', icon: '1', id: '6-2', children: [] },
      { title: '运力状态判别', icon: '1', id: '6-3', children: [] },
    ]
  },
  {
    title: '预警分析', icon: '1', id: '7', children: [
      { title: '异常聚集事件预警', icon: '1', id: '7-1', children: [] },
      { title: '非法运行预警', icon: '1', id: '7-2', children: [] },
      { title: '车辆运行行为预警', icon: '1', id: '7-3', children: [] },
      { title: '预警信息统计分析', icon: '1', id: '7-4', children: [] },
    ]
  },
]

const menuShow = ref(false)

const $router = useRouter()
function handleClick(){
  menuShow.value = true
}
function handleRouter(item:any) {
  console.log('选中菜单触发跳转',item);
  $router.push({
    path: '/UrbanTrafficTable',
    query: { type: item.id }
  })
}

const endCard = ref(false)

const storeAnalyzeDialog = useAnalyzeDialogStore();
// const { showAnalyzeDialog } = storeToRefs(storeAnalyzeDialog);

const VerticalLegend = defineAsyncComponent(() => import("./legend/verticalLegend.vue"));
const TaxiAnalyDialog = defineAsyncComponent(() => import("./dialog/taxiAnalysisDialog/taxiAnalyDialog.vue"));

const KeyVehiclesDialog = defineAsyncComponent(() => import("./dialog/keyVehiclesDialog/keyVehiclesDialog.vue"));
const BusOperationDialog = defineAsyncComponent(() => import("./dialog/busOperationDialog/busOperationDialog.vue"));
const OperationLogDialog = defineAsyncComponent(() => import("./dialog/secondDialog/operationLogDialog.vue"));

const handleDialogClick = (value:any) => {
  storeAnalyzeDialog.setShowAnalyzeDialog(value)
}
</script>

<style scoped lang="scss">
.cs-item-list {
  display: flex;
  width: 566px;
  height: 204px;
}

.cs-hand {
  width: 29px;
  height: 42px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.cs-b {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 33px;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 50px;
}

.cs-up {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #FF9B83;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  // background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 66%, rgba(0, 0, 0, 0.15) 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.cs-down {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #7AFFAB;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.cs-item-title {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 38px;
  color: #FFFFFF;
  line-height: 88px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: url('assets/component/城市交通/切图 769.png') no-repeat center/cover;
  height: 88px;
  margin-left: -20px;
  display: inline-block;
}

.cs-title {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 38px;
  color: #A3D9FF;
  line-height: 52px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.cs-blue {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cs-green {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cs-yellow {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: right;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cs-unit {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 500;
  font-size: 42px;
  color: rgba(220, 236, 255, 0.6);
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.home-left-page {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.hand-btn {
  background: url('assets/component/城市交通/切图 747.png') no-repeat 100%/100%;
  width: 54px;
  height: 53px;
  position: absolute;
  right: 0;
  top: 0;
}

.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat !important;
  background-size: 100% 100%;
  z-index: 99;
  pointer-events: all;
  position: absolute;
}

.head-title {
  background: url('assets/image/lefty/top_title.png') no-repeat 100%/100%;
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 58px;
    line-height: 160px;
    letter-spacing: 4px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #79BFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: 200px;
  }

  .search {
    width: 110px;
    height: 88px;
    display: flex;
    align-items: center;
    position: relative;
    // background: pink;

    .search-input {
      width: 621px;
      height: 83px;
      background: url('assets/component/公路运营系统-承德市公路网_slices/切图 229.png') no-repeat center/cover;
      display: flex;
      position: absolute;
      top: 0;
      right: 100px;
      z-index: 9999999 !important;

      .input-box {
        background: transparent;
        flex: 1;
        color: #fff;
        font-size: 32px;
        padding-left: 10px;
      }

      .search-btn {
        width: 88px;
        height: 83px;
        // background: pink;
      }
    }
  }
}

.content-box1 {
  width: 1570px;
  height: 1174px;
  background: url('assets/image/urbanTraffic/切图 741.png') no-repeat 100%/100%;
  margin-top: -70px;
}

.content-box2 {
  width: 1570px;
  height: 521px;
  background: url('assets/image/urbanTraffic/切图 742.png') no-repeat 100%/100%;
  margin-top: -70px;
  // display: flex;
  position: relative;

  &>.bg {
    // content: '';
    position: absolute;
    width: 1436px;
    height: 403px;
    background: url('assets/image/urbanTraffic/切图 743.png') no-repeat 100%/100%;
    top: 65px;
    left: 65px;
    z-index: 0;
  }

  .line-box {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 9;
    margin-top: 16px;

    .item-icon {
      width: 96px;
      height: 97px;
      // background: pink;
    }

    .box1 {
      background: url('assets/component/城市交通/切图 759.png') no-repeat 100%/100%;
      width: 460px;
      height: 157px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .box2 {
      background: url('assets/component/城市交通/切图 760.png') no-repeat 100%/100%;
      width: 295px;
      height: 157px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .box3 {
      background: url('assets/component/城市交通/切图 761.png') no-repeat 100%/100%;
      width: 623px;
      height: 157px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .box4 {
      background: url('assets/component/城市交通/切图 775.png') no-repeat 100%/100%;
      width: 828px;
      height: 204px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }

    .box5 {
      background: url('assets/component/城市交通/切图 840.png') no-repeat 100%/100%;
      width: 566px;
      height: 204px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }

  .bottom-icon1 {
    background: url('assets/component/道水路运输系统-首页_slices/切图 537.png') no-repeat 100%/100%;
    width: 143px;
    height: 116px;
    margin-left: 50px;
    margin-top: 40px;
  }

  .bottom-icon2 {
    background: url('assets/component/道水路运输系统-首页_slices/切图 538.png') no-repeat 100%/100%;
    width: 143px;
    height: 116px;
    margin-top: 45px;
  }

  .bottom-item {
    z-index: 9;
    display: flex;

    .bottom-content {
      margin-top: 45px;
    }

    .bottom-name {
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: 400;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 59px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .bottom-count {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 56px;
      line-height: 78px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  }
}

.title {
  width: 1106px;
  height: 111px;
  margin-top: 15px;
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 227.png') no-repeat 100%/100%;
  position: relative;
}

.title>div {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 800;
  font-size: 54px;
  line-height: 60px;
  letter-spacing: 2px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: 114px;
}
</style>
