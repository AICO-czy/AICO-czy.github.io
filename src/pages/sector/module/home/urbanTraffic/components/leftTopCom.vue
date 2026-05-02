<template>
  <div class="top-box">
    <div class="xy-box">
      <div class="arr right-[0] cursor-pointer" @click="handleDialogClick('cruiseTaxi')"></div>
      <div class="top-title">
        <div class="icon">
          <img class="icon" :src="img1" alt="">
        </div>
        <div class="name">巡游出租车</div>
      </div>
      <div class="box-content">
        <div class="content-t">
          <div class="content-item" v-for="item in itemlist1">
            <div class="hand-btn"></div>
            <div class="item-icon ml-[26px]">
              <q-img :src="item.icon" class="item-icon" alt=""></q-img>
            </div>
            <div class="item-content">
              <div class="name">{{ item.name }}</div>
              <div class="count">{{ item.nub }}<span>{{ item.unit }}</span></div>
            </div>
          </div>
        </div>
        <div class="content-b">
          <div class="box-left">
            <div class="title-icon title ml-[20px]">当前在线车辆数</div>
            <div class="w-full px-[30px]" style="display: flex;">
              <div class="left-arr"></div>
              <nub-com :need="true" :formatLength="5" />
              <div class="right-arr"></div>
            </div>
            <div class="box-left-b">
              <div class="line-box">
                <div class="acitve-line" :style="{ width: '80%' }"></div>
              </div>
              <div class="end">
                <div>重车<span class="count-nub">218</span><span class="unit">辆</span></div>
                <div><span class="count-nub">218</span><span class="unit">辆</span>空车</div>
              </div>
            </div>
          </div>
          <div class="box-right">
            <div class="box-right-bg1" @click="handleDialogClick('keyVehicles')">
              <div class="chart-item item-1">
                <div class="title">今日订单数</div>
                <div class="slider-box">
                  <div class="active-line line1" :style="{ width: '80%' }">
                    <div class="slider-icon icon1"></div>
                  </div>
                </div>
                <div class="count">218<span>单</span></div>
              </div>
              <div class="chart-item item-2">
                <div class="title">重点关注车辆</div>
                <div class="slider-box">
                  <div class="active-line1 line2" :style="{ width: '60%' }">
                    <div class="slider-icon icon1"></div>
                  </div>
                </div>
                <div class="count">14<span>辆</span></div>
              </div>
            </div>
            <div class="box-right-time">更新时间： 2025/08/18 16:05:24</div>
          </div>
        </div>
      </div>
    </div>
    <div class="wy-box">
      <div class="arr right-[0] cursor-pointer" @click="handleDialogClick('onlineRideHailing')"></div>
      <div class="top-title">
        <div class="icon">
          <img class="icon" :src="img1" alt="">
        </div>
        <div class="name">网约出租车</div>
      </div>
      <div class="box-content">
        <div class="content-t">
          <div class="content-item" v-for="item in itemlist2">
            <div class="hand-btn"></div>
            <div class="item-icon  ml-[26px]">
              <q-img :src="item.icon" class="item-icon" alt=""></q-img>
            </div>
            <div class="item-content">
              <div class="name">{{ item.name }}</div>
              <div class="count">{{ item.nub }}<span>{{ item.unit }}</span></div>
            </div>
          </div>
        </div>
        <div class="content-b">
          <div class="box-left">
            <div class="title-icon title ml-[20px]">当前在线车辆数</div>
            <div class="w-full px-[30px]" style="display: flex;">
              <div class="left-arr"></div>
              <nub-com :need="true" :formatLength="5" />
              <div class="right-arr"></div>
            </div>
            <div class="box-left-b">
              <span class="title">今日活跃车辆数</span>
              <span class="count-nub">500<span>辆</span></span>
            </div>
          </div>
          <div class="box-right">
            <div class="box-right-bg2">
              <div class="chart-item item-1">
                <div class="title">今日合规订单</div>
                <div class="slider-box">
                  <div class="active-line line1" :style="{ width: '80%' }">
                    <div class="slider-icon icon1"></div>
                  </div>
                </div>
                <div class="count">218<span>单</span></div>
              </div>
              <div class="chart-item item-2">
                <div class="title">今日非法营运</div>
                <div class="slider-box">
                  <div class="active-line1 line2" :style="{ width: '60%' }">
                    <div class="slider-icon icon1"></div>
                  </div>
                </div>
                <div class="count">500<span>起</span></div>
              </div>
            </div>
            <div class="box-right-time">更新时间： 2025/08/18 16:05:24</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NubCom from './NubCom.vue'
import * as echarts from 'echarts'
import { useAnalyzeDialogStore } from '../store/index'
import { storeToRefs } from "pinia";
import img1 from 'src/assets/component/城市交通/切图 5031.png'
import img2 from 'src/assets/component/城市交通/切图 5371.png'
import img3 from 'src/assets/component/城市交通/切图 5372.png'
import img4 from 'src/assets/component/城市交通/切图 5373.png'
import img5 from 'src/assets/component/城市交通/切图 5374.png'
import img6 from 'src/assets/component/城市交通/切图 5375.png'
import img7 from 'src/assets/component/城市交通/切图 5376.png'

const storeAnalyzeDialog = useAnalyzeDialogStore();
const { showAnalyzeDialog } = storeToRefs(storeAnalyzeDialog);

const itemlist1 = [
  { name: '运营车辆', icon: img2, nub: 2400, unit: '辆' },
  { name: '驾驶员', icon: img3, nub: 463, unit: '人' },
  { name: '出租车公司', icon: img4, nub: 21, unit: '家' },
]
const itemlist2 = [
  { name: '运营车辆', icon: img5, nub: 4236, unit: '辆' },
  { name: '驾驶员', icon: img6, nub: 472, unit: '人' },
  { name: '网约车平台', icon: img7, nub: 25, unit: '家' },
]

const handleDialogClick = (value) => {
  storeAnalyzeDialog.setShowAnalyzeDialog(value)
}
</script>

<style lang="scss" scoped>
.title-icon {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    width: 22.62px;
    height: 22.31px;
    background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.slider-box {
  position: relative;
  width: 284px;
  background: #1e5386;
  height: 14px;
  border-radius: 94px;
  margin-top: 5px;

  .active-line {
    width: 0;
    height: 19px;
    position: absolute;
    border-radius: 94px;
    top: 0;
    left: 0;

    &>.slider-icon {
      position: absolute;
      width: 54px;
      height: 54px;
      top: 50%;
      transform: translateY(-50%) translateX(30%);
      right: 0;
    }
  }

  .active-line1 {
    width: 0;
    height: 19px;
    position: absolute;
    border-radius: 94px;
    top: 0;
    right: 0;

    &>.slider-icon {
      position: absolute;
      width: 54px;
      height: 54px;
      top: 50%;
      transform: translateY(-50%) translateX(-30%);
      left: 0;
    }
  }
}

.line1 {
  background: linear-gradient(90deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 508.png') no-repeat center/cover;
  }
}

.line2 {
  background: linear-gradient(90deg, #4F799A 0%, #4F99D3 50%, #9DC9EC 100%);

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 509.png') no-repeat center/cover;
  }
}

.num1 {
  background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
}

.num2 {
  background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
}

.top-box {
  .top-title {
    display: flex;
    align-items: center;

    &>.icon {
      width: 154px;
      height: 126px;
      margin-top: -10px;
    }

    &>.name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      line-height: 58px;
      text-shadow: 0px 4px 2px rgba(0, 200, 255, 0.3);
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(60deg, #FFFFFF 0%, #B8DAFB 92%, #B8DAFB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .xy-box {
    background: url('assets/image/urbanTraffic/切图 745.png') no-repeat 100%/100%;
    width: 1436px;
    height: 521px;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;

    .box-left-b {
      margin: 0 auto;
      margin-top: -20px;
      padding: 0 20px;

      .line-box {
        background: linear-gradient(270deg, #4F939A 0%, #4FD3D3 50%, #9DECDB 100%);
        height: 15px;
        margin-top: 15px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;

        &>.acitve-line {
          background: linear-gradient(270deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);
          height: 15px;
        }
      }

      .end {
        display: flex;
        justify-content: space-between;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 38px;
        color: #A3D9FF;
        line-height: 52px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        .unit {
          color: rgba(220, 236, 255, 0.6) !important;
          margin-right: 10px;
        }
      }

      .count-nub {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 47px;
        line-height: 65px;
        letter-spacing: 3px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-left: 10px;

        // >span {
        //   -webkit-text-fill-color: rgba(220, 236, 255, 0.60);
        //   font-size: 33px;
        // }
      }
    }

    .box-right-bg1 {
      background: url('assets/component/城市交通/切图 755.png') no-repeat 100%/100%;
      width: 720px;
      height: 151px;
      margin: 0 auto;
      margin-top: 26px;
      position: relative;
      display: flex;
    }


    .box-right-time {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 32px;
      color: #A3BFD8;
      line-height: 44px;
      text-align: right;
      font-style: normal;
      text-transform: none;
      margin-right: 20px;
      margin-top: 10px;
    }

    .item-1 {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .item-2 {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  }

  .box-content {
    .content-t {
      background: url('assets/component/城市交通/切图 746.png') no-repeat 100%/100%;
      width: 1405px;
      height: 142px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .content-item {
        background: url('assets/component/城市交通/切图 749.png') no-repeat 100%/100%;
        width: 453px;
        height: 133px;
        display: flex;
        position: relative;

        &>.hand-btn {
          background: url('assets/component/城市交通/切图 747.png') no-repeat 100%/100%;
          width: 54px;
          height: 53px;
          position: absolute;
          right: 0;
          top: 0;
        }

        .item-icon {
          width: 143px;
          height: 116px;
          // background: pink;
          // margin-left: 26px;
          align-self: center;
        }

        .item-content {
          &>.name {
            background: url('assets/component/城市交通/切图 748.png') no-repeat 100%/100%;
            width: 233px;
            height: 76px;
            font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
            font-weight: 500;
            font-size: 40px;
            line-height: 76px;
            letter-spacing: 1px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            color: #FFFFFF;
          }

          &>.count {
            font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
            font-weight: 400;
            font-size: 50px;
            line-height: 70px;
            letter-spacing: 1px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;


            >span {
              -webkit-text-fill-color: rgba(220, 236, 255, 0.60);
              font-size: 42px;
            }
          }
        }
      }
    }

    .content-b {
      display: flex;
      margin-top: 16px;
      justify-content: space-evenly;

      .box-left {
        background: url('assets/component/城市交通/切图 750.png') no-repeat 100%/100%;
        width: 649px;
        height: 238px;

        .title {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 42px;
          color: #A3D9FF;
          line-height: 58px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .left-arr {
          background: url('assets/component/道水路运输系统-首页_slices/切图 530.png') no-repeat center/cover;
          width: 11.69px;
          height: 100px;
          margin-right: 30px;
        }

        .right-arr {
          background: url('assets/component/道水路运输系统-首页_slices/切图 531.png') no-repeat center/cover;
          width: 11.69px;
          height: 100px;

        }

      }

      .box-right {
        background: url('assets/component/城市交通/切图 751.png') no-repeat 100%/100%;
        width: 739px;
        height: 238px;
      }

      .chart-item {
        flex: 1;
        margin: 0 10px;

        &>.title {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 38px;
          color: #A3D9FF;
          line-height: 52px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-top: 5px;
        }

        &>.count {
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

          span {
            -webkit-text-fill-color: rgba(220, 236, 255, 0.60);
            font-size: 40px;
          }
        }
      }
    }
  }

  .wy-box {
    background: url('assets/image/urbanTraffic/切图 745.png') no-repeat 100%/100%;
    width: 1436px;
    height: 521px;
    margin: 0 auto;
    margin-top: 20px;
    position: relative;

    .box-left-b {
      background: url('src/assets/component/城市交通/切图 757.png') no-repeat 100%/100%;
      width: 591px;
      height: 71px;
      margin: 0 auto;
      margin-top: -20px;
      padding: 0 20px;

      .count-nub {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 47px;
        line-height: 65px;
        letter-spacing: 3px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        padding-left: 80px;

        >span {
          -webkit-text-fill-color: rgba(220, 236, 255, 0.60);
          font-size: 33px;
        }
      }
    }

    .box-right-bg2 {
      background: url('assets/component/城市交通/切图 758.png') no-repeat 100%/100%;
      width: 720px;
      height: 151px;
      margin: 0 auto;
      margin-top: 26px;
      position: relative;
      display: flex;
    }

    .box-right-time {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 32px;
      color: #A3BFD8;
      line-height: 44px;
      text-align: right;
      font-style: normal;
      text-transform: none;
      margin-right: 20px;
      margin-top: 10px;
    }

    .item-1 {
      display: flex;
      flex-direction: column;
      align-items: start;
    }

    .item-2 {
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  }
}


.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat 100%/100%;
  z-index: 99;
  pointer-events: all;
  position: absolute;
}
</style>
