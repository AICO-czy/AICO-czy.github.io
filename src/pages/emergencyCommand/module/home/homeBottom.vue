<template>
  <div class="bottom-box">
    <div class="t-list" v-if="activeItem.item" :class="formatClass(activeItem)">
      <div class="item" v-for="item in activeItem.item">{{ item.title }}</div>
    </div>
    <div class="b-list">
      <div class="left-icon"></div>
      <div class="item" v-for="item in btnList[modeType]" @click="handleClickSub(item)">
        <div class="title">{{ item.title }}</div>
        <div class="icon" :class="item.title ? 'icon' : 'icon2'">
          <img :src="item.icon" :class="item.title ? 'icon' : 'icon2'" alt="">
        </div>
      </div>
      <div class="right-icon"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive, toRefs, ref } from "vue";
import { useEmergencyCommandGlobal } from '../../store/index'

const emergencyCommandGlobal = useEmergencyCommandGlobal()

const { modeType } = toRefs(emergencyCommandGlobal)

// 导入图片资源
import dqsj from "src/assets/image/emergencyCommand/切图 672.png";
import lssj from "src/assets/image/emergencyCommand/切图 674.png";
import yjzy from "src/assets/image/emergencyCommand/切图 675.png";
import jcss from "src/assets/image/emergencyCommand/切图 676.png";
import fxd from "src/assets/image/emergencyCommand/切图 677.png";
import qx from "src/assets/image/emergencyCommand/切图 678.png";
import mapIcon from "src/assets/image/emergencyCommand/切图 679.png";
import wlIcon from "src/assets/image/emergencyCommand/切图 679 (1).png";
import botIcon from "src/assets/image/emergencyCommand/切图 680.png";

const btnList: any = {
  '2': [
    {
      title: '当前事件',
      icon: dqsj,
      item: [{ title: '当前事件', icon: '' }],
    },
    {
      title: '历史事件',
      icon: lssj,
      item: [{ title: '历史事件', icon: '' }],
    },
    {
      title: '应急资源',
      icon: yjzy,
      item: [
        { title: '队伍', icon: '' },
        { title: '物资', icon: '' },
        { title: '保障车辆', icon: '' },
        { title: '无人机', icon: '' },
        { title: 'APP', icon: '' },
        { title: '预案', icon: '' },
        { title: '应急指挥部', icon: '' },
        { title: '专家', icon: '' },
        { title: '联动单位', icon: '' },
      ],
    },
    {
      title: '基础设施',
      icon: jcss,
      item: [
        { title: '桥梁', icon: '' },
        { title: '隧道', icon: '' },
        { title: '桥梁监测', icon: '' },
        { title: '隧道监测', icon: '' },
        { title: '边坡监测', icon: '' },
        { title: '路段', icon: '' },
      ],
    },
    {
      title: '风险点',
      icon: fxd,
      item: [
        { title: 'A级', icon: '' },
        { title: 'B级', icon: '' },
        { title: 'C级', icon: '' },
        { title: 'D级', icon: '' },],
    },
    {
      title: '气象',
      icon: qx,
      item: [
        { title: '县区气象', icon: '' },
        { title: '云图', icon: '' },],
    },
    {
      title: '',
      icon: mapIcon,
      item: [],
    },
    {
      title: '',
      icon: wlIcon,
      item: [
        { title: '电子围栏', icon: '' },],
    },
    {
      title: '',
      icon: botIcon,
      item: [],
    },
  ],
  '1': [
    {
      title: '应急资源',
      icon: yjzy,
      item: [
        { title: '队伍', icon: '' },
        { title: '物资', icon: '' },
        { title: '保障车辆', icon: '' },
        { title: '无人机', icon: '' },
        { title: 'APP', icon: '' },
        { title: '预案', icon: '' },
        { title: '应急指挥部', icon: '' },
        { title: '专家', icon: '' },
        { title: '联动单位', icon: '' },
      ],
    },
    {
      title: '基础设施',
      icon: jcss,
      item: [
        { title: '桥梁', icon: '' },
        { title: '隧道', icon: '' },
        { title: '桥梁监测', icon: '' },
        { title: '隧道监测', icon: '' },
        { title: '边坡监测', icon: '' },
        { title: '路段', icon: '' },
      ],
    },
    {
      title: '事件信息',
      icon: dqsj,
      item: [{ title: '当前事件', icon: '' }],
    },
    {
      title: '气象',
      icon: qx,
      item: [
        { title: '县区气象', icon: '' },
        { title: '云图', icon: '' },],
    },
    {
      title: '',
      icon: mapIcon,
      item: [],
    },
  ]
}

const activeItem = ref({})
const changeItem = ref([])

function handleClickSub(item: any) {
  console.log(item)
  if(activeItem.value?.title === item.title){
    activeItem.value = {}
  }else{
    activeItem.value = item;
  }
}

watch(()=>modeType.value, (newVal, oldVal) => {
  activeItem.value = {}
  
},{immediate:true})

function formatClass(data: any) {
  let length = data.item.length
  let className = ''
  switch (length) {
    case 1:
      className = 't-list-1'
      break;
    case 9:
      className = 't-list-9'
      break;
    case 6:
      className = 't-list-6'
      break;
    case 4:
      className = 't-list-4'
      break;
    case 2:
      className = 't-list-2'
      break;

    default:
      break;
  }
  return className
}

</script>

<style lang="scss" scoped>
.bottom-box {
  height: 100%;

  .t-list {
    padding: 0 10px;
    position: absolute;
    bottom: 342px;
    left: 50%;
    transform: translateX(-50%);
    min-height: 125px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    // background: skyblue;
    &>.item {
      width: 370px;
      height: 89px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 700;
      font-size: 52px;
      line-height: 80px;
      text-shadow: 0px 4px 4px #042F4A;
      text-align: center;
      font-style: normal;
      text-transform: none;
      color: #FFFFFF;
      background: url('/src/assets/image/emergencyCommand/切图 684.png') no-repeat;
      .active{
        background: url('/src/assets/image/emergencyCommand/切图 685.png') no-repeat;
      }
    }

    &.t-list-1 {
      width: 411px;
      height: 100%;
      background: url('/src/assets/image/emergencyCommand/切图 683.png') no-repeat;
    }

    &.t-list-2 {
      width: 798px;
      height: 100%;
      background: url('/src/assets/image/emergencyCommand/切图 683.png') no-repeat center;
      background-size: 100% 100%;
    }

    &.t-list-4 {
      width: 1591px;
      height: 100%;
      background: url('/src/assets/image/emergencyCommand/切图 701.png') no-repeat;
    }

    &.t-list-6 {
      width: 2381px;
      height: 100%;
      background: url('/src/assets/image/emergencyCommand/切图 697.png') no-repeat;
    }

    &.t-list-9 {
      width: 3662px;
      height: 100%;
      background: url('/src/assets/image/emergencyCommand/切图 695.png') no-repeat;
    }
  }

  .b-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    height: 342px;
    display: flex;
    align-items: center;
    justify-content: center;

    .left-icon {
      width: 93px;
      height: 342px;
      background: url('/src/assets/image/emergencyCommand/切图 673.png');
      margin-right: 20px;
    }

    .right-icon {
      width: 93px;
      height: 342px;
      background: url('/src/assets/image/emergencyCommand/切图 681.png');
      margin-left: 20px;
    }

    &>.item {
      margin: 0 13px;
      width: 321px;
      height: 252px;
      background: url('/src/assets/image/emergencyCommand/切图 671.png');
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: all;

      .title {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 52px;
        line-height: 70px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .icon {
        width: 163px;
        height: 133px;
        // background: pink;
      }

      .icon2 {
        width: 114px;
        height: 113px;
      }
    }
  }
}
</style>
