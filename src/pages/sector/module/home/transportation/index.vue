<template>
  <div class="home-left-page">
    <div class="head-title">
      <div class="text">
        <div class="" @click="handleClick">道（水）路运输</div>
      </div>
    </div>
    <div>
      <div>
        <div class="title">
          <div>道路运输</div>
        </div>
        <div class="content-box1 w-full h-full p-[40px] box-border">
          <left-top-com />
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        <div>水路运输</div>
      </div>
      <div class="content-box2 w-full h-full p-[40px] box-border">
        <div class="arr top-[16%] right-[3.2%]"></div>
        <div class="flex-1 bottom-item">
          <div class="bottom-icon1"></div>
          <div class="bottom-content">
            <div class="bottom-name">营运船舶:</div>
            <div class="bottom-count">162艘</div>
          </div>
        </div>
        <div class="flex-1 bottom-item">
          <div class="bottom-icon2"></div>
          <div class="bottom-content">
            <div class="bottom-name">内河航道通航水域总里程:</div>
            <div class="bottom-count">2623公里</div>
          </div>
        </div>
      </div>
    </div>
    <AlarmDialog />
    <comprehensive />
    <OverloadDetection />
    <PassengerDialog />
    <HighSpeedFreight />
    <CharteredCar />
    <BusTransportation />
    <HazardousGoods />
    <HeavyFreight />
    <Cascader :meunList="menuList" v-model="menuShow" @changeCascader="handleRouter" />
  </div>
</template>

<script setup lang="ts" name="transportation">
import { defineAsyncComponent, reactive, ref, watch } from "vue";
import LeftTopCom from './components/leftTopCom.vue'
import Comprehensive from './dialog/comprehensive/comprehensive.vue'
import OverloadDetection from './dialog/overloadDetection/overloadDetection.vue'
import HighSpeedFreight from './dialog/highSpeedFreight/highSpeedFreight.vue'
import CharteredCar from './dialog/charteredCar/charteredCar.vue'
import BusTransportation from './dialog/charteredCar/busTransportation.vue'
import HazardousGoods from './dialog/charteredCar/hazardousGoods.vue'
import HeavyFreight from './dialog/charteredCar/heavyfreight.vue'
import { useRouter } from "vue-router";
import Cascader from '../components/cascader.vue'

const AlarmDialog = defineAsyncComponent(() => import("./dialog/alarmDialog/alarmDialog.vue"));
const PassengerDialog = defineAsyncComponent(() => import("./dialog/passengerDialog/passengerDialog.vue"));

const menuList: any[] = [
  { title: '道(水)路运输全景', icon: '1', id: '1', children: [] },
  {
    title: '“两客一危一重”车辆运行监测', icon: '1', id: '2', children: [
      {
        title: '基础信息查询', icon: '1', id: '2-1', children: [
          { title: '“两客一危一重”总览', icon: '', id: '2-1-1', children: [] },
          { title: '企业信息查询', icon: '', id: '2-1-2', children: [] },
          { title: '车辆信息查询', icon: '', id: '2-1-3', children: [] },
          { title: '从业人员查询', icon: '', id: '2-1-4', children: [] },
          { title: '服务平台信息查询', icon: '', id: '2-1-5', children: [] },
        ]
      },
      {
        title: '车辆运行监测', icon: '1', id: '2-2', children: [
          { title: '“两客一危一重”车辆运行总览', icon: '', id: '2-2-1', children: [] },
          { title: '车辆运行位置可视化呈现', icon: '', id: '2-2-2', children: [] },
          { title: '车辆运行信息查询', icon: '', id: '2-2-3', children: [] },
          { title: '车载视频调阅', icon: '', id: '2-2-4', children: [] },
        ]
      },
      {
        title: '长途客运、旅游包车客流监测', icon: '1', id: '2-3', children: [
          { title: '客运车辆流向监测', icon: '', id: '2-3-1', children: [] },
          { title: '旅客流量监测', icon: '', id: '2-3-2', children: [] },
        ]
      },
      {
        title: '重点区域监测', icon: '1', id: '2-4', children: [
          { title: '重点区域电子围栏设置', icon: '', id: '2-4-1', children: [] },
          { title: '重点区域实时监测', icon: '', id: '2-4-2', children: [] },
          { title: '重点区域内车辆信息查询', icon: '', id: '2-4-3', children: [] },
        ]
      },
      {
        title: '车辆流向监测', icon: '1', id: '2-5', children: [
          { title: '市内车辆流向', icon: '', id: '2-5-1', children: [] },
          { title: '省内车辆流向', icon: '', id: '2-5-2', children: [] },
          { title: '省外车辆流向', icon: '', id: '2-5-3', children: [] },
          { title: '车辆流向示意图', icon: '', id: '2-5-4', children: [] },
        ]
      },
      {
        title: '预警分析', icon: '1', id: '2-6', children: [
          { title: '车辆预警规则库', icon: '', id: '2-6-1', children: [] },
          { title: '车辆运行行为监测', icon: '', id: '2-6-2', children: [] },
          { title: '预警信息统计分析', icon: '', id: '2-6-3', children: [] },
        ]
      },
    ]
  },
  {
    title: '客运站监测', icon: '1', id: '3', children: [
      {
        title: '客运站概况', icon: '1', id: '3-1', children: [
          { title: '客运站总览', icon: '', id: '3-1-1', children: [] },
          { title: '客运站点地图分布', icon: '', id: '3-1-2', children: [] },
          { title: '客运站基本信息查询', icon: '', id: '3-1-3', children: [] },
        ]
      },
      {
        title: '客运站运行监测', icon: '1', id: '3-2', children: [
          { title: '客运站运行信息查询', icon: '', id: '3-2-1', children: [] },
          { title: '客运站视频监控查询', icon: '', id: '3-2-2', children: [] },
          { title: '客运站运行对比分析', icon: '', id: '3-2-3', children: [] },
          { title: '旅客量趋势分析', icon: '', id: '3-2-4', children: [] },
          { title: '班线OD分析', icon: '', id: '3-2-5', children: [] },
        ]
      },
    ]
  },
  {
    title: '治超监测', icon: '1', id: '4', children: [
      {
        title: '治超站', icon: '1', id: '4-1', children: [
          { title: '治超站总览', icon: '', id: '4-1-1', children: [] },
          { title: '治超站点地图分布', icon: '', id: '4-1-2', children: [] },
          { title: '治超站基本信息查询', icon: '', id: '4-1-3', children: [] },
          { title: '超限检测信息查询', icon: '', id: '4-1-4', children: [] },
          { title: '检测站视频监控查询', icon: '', id: '4-1-5', children: [] },
          { title: '超限趋势分析', icon: '', id: '4-1-6', children: [] },
          { title: '治超站排行榜', icon: '', id: '4-1-7', children: [] },
          { title: '高频率超限违法分析', icon: '', id: '4-1-8', children: [] },
        ]
      },
      {
        title: '非现场治超', icon: '1', id: '4-2', children: [
          { title: '地图分布', icon: '', id: '4-2-1', children: [] },
          { title: '基本信息', icon: '', id: '4-2-2', children: [] },
          { title: '超限检测信息查询', icon: '', id: '4-2-3', children: [] },
          { title: '检测点视频监控查询', icon: '', id: '4-2-4', children: [] },
          { title: '超载趋势分析', icon: '', id: '4-2-5', children: [] },
          { title: '高频率超限违法分析', icon: '', id: '4-2-6', children: [] },
        ]
      },
    ]
  },
  {
    title: '汽修驾培', icon: '1', id: '5', children: [
      {
        title: '汽修驾培备案信息', icon: '1', id: '5-1', children: [
          { title: '汽车维修总览', icon: '', id: '5-1-1', children: [] },
          { title: '驾驶培训总览', icon: '', id: '5-1-2', children: [] },
          { title: '汽车租赁总览', icon: '', id: '5-1-3', children: [] },
        ]
      },
    ]
  },
  {
    title: '水路运输', icon: '1', id: '6', children: [
      {
        title: '水路运输信息', icon: '1', id: '6-1', children: [
          { title: '水路运输总览', icon: '', id: '6-1-1', children: [] },
          { title: '水路运输地图分布', icon: '', id: '6-1-2', children: [] },
          { title: '水路运输企业基本信息查询', icon: '', id: '6-1-3', children: [] },
          { title: '船舶基本信息查询', icon: '', id: '6-1-4', children: [] },
        ]
      },
      {
        title: '码头视频监控', icon: '1', id: '6-2', children: [
          { title: '码头视频监控查询', icon: '', id: '6-2-1', children: [] },
        ]
      },
    ]
  },
]

const menuShow = ref(false)

function handleClick() {
  console.log('点击道水路运输标题');
  menuShow.value = true
}

const $router = useRouter();
function handleRouter(item: any) {
  console.log('选中菜单触发跳转', item);
  $router.push({
    path: '/TransportationTabel',
    query: { type: item.id }
  })
}

</script>

<style scoped lang="scss">
.home-left-page {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat 100%/100%;
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
  height: 1430px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 505.png') no-repeat 100%/100%;
  margin-top: -70px;
}

.content-box2 {
  width: 1570px;
  height: 268px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 507.png') no-repeat 100%/100%;
  margin-top: -70px;
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 1436px;
    height: 171px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 536.png') no-repeat 100%/100%;
    top: 55px;
    left: 65px;
    // z-index: 0;
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
