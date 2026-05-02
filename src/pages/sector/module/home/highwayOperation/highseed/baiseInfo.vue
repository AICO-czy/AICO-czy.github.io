<template>
  <q-dialog seamless v-model="baiseInfoDialogStore.isDialogVisible">
    <div class="dialog-content">
      <div class="dialog-bg">
        <div class="content-title"></div>
        <div class="content-close cursor-pointer" @click="handleClose"></div>
        <div class="content-box justify-between">
          <div class="h-full flex-1 list-icon">
            <div v-for="item in data" class="item-icon">
              <div>
                <img class="img" :src="`icons/highwayOperation/highseed/images/${item.icon}.png`" alt="">
              </div>
              <div class="count">{{ item.count }}{{ item.unit }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
          </div>
          <div class="h-full w-[400px] count-right">
            <div class="item" :class="'item-' + ind" v-for="(item, ind) in data2">
              <div class="name">{{ item.name }}</div>
              <div class="count">{{ item.count }}{{ item.unit }}</div>
            </div>
          </div>
        </div>
        <div class="end-btn" @click="handelClick">运行动态</div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts" name="baiseInfoDialogStore">
import { useBaiseInfoDialogStore, useHighseedStore } from './store/index'

const baiseInfoDialogStore = useBaiseInfoDialogStore()
const highseedStore = useHighseedStore()

const handleClose = () => {
  baiseInfoDialogStore.closeDialog()
}

//展示数据
const data = [
  { icon: '切图 306', count: 2, unit: '处', name: "服务区" },
  { icon: '切图 307', count: 1, unit: '处', name: "停车区" },
  { icon: '切图 308', count: 79, unit: '个', name: "机电设备" },
  { icon: '切图 309', count: 3, unit: '处', name: "隧道管理站" },
  { icon: '切图 310', count: 2, unit: '处', name: "养护工区" },
  { icon: '切图 311', count: 31, unit: '处', name: "结构物健康监测" },
]

const data2 = [
  { count: 12, unit: '个', name: "情报板" },
  { count: 11, unit: '个', name: "车检器" },
  { count: 26, unit: '个', name: "视频监控" },
  { count: 12, unit: '处', name: "高边坡监测" },
]

function handelClick() {
  highseedStore.openDialog()
}

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1286px !important;
  overflow: none !important;
  min-height: 904px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1286px;
  height: 904px;
  background: url("./images/切图 303.png") no-repeat 100%/100%;
  position: fixed;
  right: 1150px;
  top: 350px;
  padding: 55px 65px 50px 65px;
  box-sizing: border-box;
}

.dialog-bg {
  background: url("./images/切图 304.png") no-repeat 100%/100%;
  width: 1157px;
  height: 788px;
  padding: 50px;
  padding-top: 120px;
  padding-bottom: 100px;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 80px;
}

.content-title {
  width: 369px;
  height: 58px;
  background: url("./images/切图 305.png") no-repeat 100%/100%;
  position: absolute;
  left: 100px;
  top: 80px;
}

.content-box {
  width: 100%;
  height: 100%;
  display: flex;
}

.dialog-content-top {
  width: 100%;
  height: 25%;
  background-image: url('assets/image/highwayOperation/切图 374.png');
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 20px;
}

.dialog-content-middle {
  width: 100%;
  height: 36.5%;
  background-image: url('assets/image/highwayOperation/切图 374.png');
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 20px;
}

.dialog-content-bottom {
  width: 100%;
  height: 36.5%;
  background-image: url('assets/image/highwayOperation/切图 374.png');
  background-size: 100% 100%;
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 20px;
}

.end-btn {
  position: absolute;
  background: url("./images/切图 109.png") no-repeat 100%/100%;
  width: 284px;
  height: 71px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 61px;
  letter-spacing: 2px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  color: #F4F8FF;
  right: 110px;
}

.list-icon {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 1fr占用空间表示份数，这表示3列，每列都占1份 */
  /* grid-template-columns: 2fr 1fr 1fr; */
  /* 第一列占 2 份，后两列各占 1 份（总宽度被分成 4 份） */
  grid-template-rows: repeat(2, 2fr);
  gap: 10px;
  padding: 10px;

  img {
    width: 151px;
    height: 122px;
  }

  &>.item-icon {
    // overflow: hidden;
    white-space: nowrap;
    text-align: center;

    &>.name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 38px;
      color: #A3D9FF;
      line-height: 52px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      //文本超出换行
      overflow: hidden;
      white-space: wrap;
    }

    &>.count {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 46px;
      line-height: 60px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #6BDCFF 0%, #54FBF1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.count-right {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 1fr占用空间表示份数，这表示3列，每列都占1份 */
  // grid-template-columns: 1fr 1fr;
  /* 第一列占 2 份，后两列各占 1 份（总宽度被分成 4 份） */
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  // padding: 10px;
  // background: skyblue;
  padding-left: 40px;

  &>.item {
    white-space: nowrap;

    // text-align: center;
    // background: pink;
    // border: 1px solid red;
    &>.name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    &>.count {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      line-height: 65px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .item-2,
  .item-3 {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
