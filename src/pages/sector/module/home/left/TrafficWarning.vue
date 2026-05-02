<template>
  <div class="column traffic-Warning">
    <div class="col-auto top-content-container">
      <div class="top-content-one">
        <div class="top-content-one-header">
          <q-icon class="top-content-one-header-icon" name="img:icons/运行状况.png"></q-icon>
          <span class="top-content-one-header-text">交通运行状况</span>
        </div>
        <div class="top-content-one-content">
          <div class="row full-height justify-around items-center">
            <div class="col-auto">
              <img src="icons/交通状态右.png" />
            </div>
            <div class="col-auto">
              <div class="top-content-one-content-state">
                <span class="top-content-one-content-state-text">优</span>
              </div>
            </div>
            <div class="col-auto">
              <img src="icons/交通状态左.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="row items-center road-list-item" :class="{ 'road-list-item2': index % 2 !== 0 }"
        v-for="(road, index) in state.roadList" :key="index">
        <div class="col-auto">
          <q-icon :name="road.icon" class="road-icon"></q-icon>
        </div>
        <div class="col">
          <span class="road-label">{{ road.label }}</span>
        </div>
        <div class="col-auto">
          <div class="row items-center road-status">
            <div class="col"><span class="road-status-label">{{ road.status }}</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col waring-info">
      <div class="waring-info-content">
        <div class="row items-center waring-info-title">
          <div class="col"><span class="waring-info-title-val">预警信息</span></div>
        </div>
        <div class="column fit">
          <div class="col-auto">
            <div class="row warning-total">
              <div class="col" v-for="(item, index) in state.warningInfo" :key="index">
                <div class="warning-total-item">
                  <div class="warning-total-item-content">
                    <span class="warning-total-label">{{ item.label }}</span><span class="warning-total-value">{{
                      item.total
                      }}</span><span class="warning-total-label">起</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="column warning-list">
              <div class="col-auto">
                <div class="row items-center warning-list-title">
                  <div class="col-3">时间</div>
                  <div class="col">类型</div>
                  <div class="col">路段</div>
                  <div class="col">位置</div>
                  <div class="col">状态</div>
                </div>
              </div>
              <div class="col">
                <div class="row items-center warning-list-item" :class="{ 'warning-list-item2': index % 2 !== 0 }"
                  v-for="(item, index) in state.warningList" :key="index">
                  <div class="col-3">{{ item.time }}</div>
                  <div class="col">{{ item.type }}</div>
                  <div class="col">{{ item.road }}</div>
                  <div class="col">{{ item.place }}</div>
                  <div class="col">
                    <span class="status-label1" v-if="item.status === '进行中'">{{ item.status }}</span>
                    <span class="status-label2" v-if="item.status === '已结束'">{{ item.status }}</span>
                    <span class="status-label3" v-if="item.status === '未处置'">{{ item.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="TrafficWarning">
import { reactive, onMounted } from "vue";
const state = reactive({
  roadList: [
    {
      icon: "img:icons/trafficTravel/国家一号风景大道.png",
      label: "国家一号风景大道",
      status: "畅通"
    },
    {
      icon: "img:icons/trafficTravel/绿色塞罕坝.png",
      label: "绿色塞罕坝·红色旅游路",
      status: "畅通"
    },
    {
      icon: "img:icons/trafficTravel/美丽燕塞路.png",
      label: "美丽燕塞路",
      status: "畅通"
    }
  ],
  warningInfo: [{
    label: "道路拥堵",
    total: 2,
    list: [{
      time: "2022-06-06 12:41:10",
      type: "道路拥堵",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "道路拥堵",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "道路拥堵",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "道路拥堵",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }]
  }, {
    label: "交通事件",
    total: 2,
    list: [{
      time: "2022-06-06 12:41:10",
      type: "交通事件",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "交通事件",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "交通事件",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "交通事件",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }]
  }, {
    label: "气象预警",
    total: 2,
    list: [{
      time: "2022-06-06 12:41:10",
      type: "气象预警",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "气象预警",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "气象预警",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "气象预警",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }]
  }, {
    label: "占道施工",
    total: 2,
    list: [{
      time: "2022-06-06 12:41:10",
      type: "占道施工",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "占道施工",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "占道施工",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }, {
      time: "2022-06-06 12:41:10",
      type: "占道施工",
      road: "企兴路",
      place: "k1+100",
      status: "进行中"
    }]
  }],
  warningList: [{
    time: "2022-06-06 12:41:10",
    type: "道路拥堵",
    road: "企兴路",
    place: "k1+100",
    status: "进行中"
  }, {
    time: "2022-06-06 12:41:10",
    type: "道路拥堵",
    road: "企兴路",
    place: "k1+100",
    status: "进行中"
  }, {
    time: "2022-06-06 12:41:10",
    type: "道路拥堵",
    road: "企兴路",
    place: "k1+100",
    status: "未处置"
  }, {
    time: "2022-06-06 12:41:10",
    type: "道路拥堵",
    road: "企兴路",
    place: "k1+100",
    status: "已结束"
  }] as any
});
onMounted(() => {

})
</script>
<style scoped>
.traffic-Warning {
  width: 100%;
  height: 100%;
  padding: 0 40px 50px 40px;
  background: url('assets/image/trafficTravel/交通预警背景.png');
  background-size: 100% 100%;
}

.top-content-container {
  width: 100%;
  height: 335px;
  padding-top: 55px;
}

.top-content-margin {
  margin-top: 65px !important;
}

.top-content-one {
  width: 100%;
  height: 270px;
  background-image: url("assets/component/内边框.png");
  background-size: 100% 100%;

  position: relative;
}

.top-content-one-header {
  width: 100%;
  height: 82px;
  background-image: url("assets/component/二级标题.png");
  background-size: 100% 100%;
  position: absolute;
  top: -26px;
  left: 29px;
}

.top-content-one-header-icon {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 20px;
}

.top-content-one-header-icon1 {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 26px;
}

.top-content-one-header-icon2 {
  width: 89px;
  height: 100px;
  top: -36px;
  margin-left: 26px;
}

.top-content-one-header-text {
  font-family: SourceHanSansMedium;
  font-weight: 500;
  font-size: 48px;
  /* color: #c5d8f6; */
  text-align: left;
  text-transform: none;
  background: linear-gradient(180deg, #8bddda 0%, #dce7f9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 10px;
}

.top-content-one-content {
  width: 96%;
  height: 176px;
  background-image: url("assets/component/交通运行状态内容.png");
  background-size: 100% 100%;
  position: absolute;
  top: 60px;
  left: 29px;
  padding: 20px 40px;
}

.top-content-one-content-state {
  width: 250px;
  height: 132px;
  background-image: url("assets/component/交通运行状态.png");
  background-size: 100% 100%;
  text-align: center;
}

.top-content-one-content-state-text {
  font-family: AlibabaPuHuiTiBold;
  font-weight: bold;
  font-size: 92px;
  color: #13ff93;
  /* text-shadow: 12px 0px 24px #07673d; */
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(107deg, #03ce97 0%, #00ffa2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: breathing 2s infinite;
}

.top-content-two-content {
  width: 1294px;
  height: 176px;
  top: 60px;
  left: 29px;
  position: absolute;
}

.top-content-two-content-container {
  width: 400px;
  height: 136px;
  background-image: url("assets/component/交通枢纽站框.png");
  background-size: 100% 100%;
  text-align: center;
}

.road-list-item {
  width: 100%;
  height: 106px;
  background: rgba(1, 62, 60, 0.9);
  border-radius: 0px 0px 0px 0px;
  border: 2px solid #208746;
}

.road-list-item2 {
  background: none !important;
  border: none !important;
}

.road-icon {
  width: 60px;
  height: 53px;
  padding: 0 40px 0 80px;
}

.road-label {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.road-status {
  width: 160px;
  height: 64px;
  margin-right: 52px;
  text-align: center;
  background: rgba(0, 109, 82, 0.6);
  box-shadow: inset 0px 24px 12px 0px rgba(0, 241, 44, 0.2);
  border-radius: 12px 12px 12px 12px;
  border: 2px solid #00FF2F;
}

.road-status-label {
  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.waring-info {
  width: 100%;
  height: 100%;
  padding: 82px 0 0px 0;
}

.waring-info-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("assets/image/trafficTravel/预警信息背景.png");
  background-size: 100% 100%;
}

.waring-info-title {
  position: absolute;
  top: -42px;
  margin-left: 32px;
  width: 100%;
  height: 77px;
  background-image: url("assets/component/二级标题.png");
  background-size: 100% 100%;
}

.waring-info-title-val {
  padding-left: 32px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 700;
  font-size: 44px;
  color: #FFFFFF;
  line-height: 64px;
  letter-spacing: 8px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.warning-total {
  padding: 70px 0 42px 0;
}

.warning-total-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.warning-total-item-content {
  width: 230px;
  height: 90px;
  text-align: center;
  background: rgba(6, 140, 107, 0.0001);
  box-shadow: inset 0px 0px 36px 0px #01634B;
  border-radius: 40px 40px 40px 40px;
  border: 2px solid #52AEA0;
}

.warning-total-label {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 28px;
  color: #01634B;
  line-height: 90px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.warning-total-value {
  padding: 0 10px;
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 700;
  font-size: 36px;
  color: #01634B;
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.warning-list {
  padding: 0 20px;
}

.warning-list-title {
  width: 100%;
  height: 56px;
  background: rgba(1, 62, 60, 0.9);
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #208746;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
  line-height: 24px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.warning-list-item {
  width: 100%;
  height: 60px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 24px;
  color: #D3D3D3;
  line-height: 35px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.warning-list-item2 {
  background: rgba(39, 146, 153, 0.2) !important;
  border: 1px solid #228720 !important;
}

.status-label1 {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 24px;
  color: #E4F002;
  line-height: 35px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.status-label2 {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 24px;
  color: #51C205;
  line-height: 35px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.status-label3 {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 24px;
  color: #FF3333;
  line-height: 35px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
