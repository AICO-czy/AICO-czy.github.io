<template>
  <div class="home-left-page">
    <div class="top-box">
      <div class="text"><span @click="handleClick">工程建设</span></div>
    </div>
    <oneFore @topTip="handleCheck" @cardClick="handleCard" @review="handleReview"  />
    <rightBottom style="margin-top: 20px;" @check="handleCheck" @closeJt="handleCloseJt" :period="period" />
    <Cascader :meunList="menuList" v-model="menuShow" @changeCascader="handleRouter" />
  </div>
</template>

<script setup lang="ts" name="">
import { ref, reactive, watch } from "vue";
import oneFore from './components/oneFore.vue'
import rightBottom from './components/right-bottom.vue'
import Cascader from './components/cascader.vue'
import { useRouter } from "vue-router";

const $emit = defineEmits(['jtqs', 'closeJtEve', 'topTip',  'cardChange', 'review'])


const menuList: any[] = [
  { title: '工程建设全景', icon: '1', id: '1', children: [] },
  {
    title: '公路建设监测', icon: '1', id: '2', children: [
      {
        title: '公路工程建设总览', icon: '1', id: '2-1', children: [
          { title: '规划建设总体情况', icon: '', id: '2-1-1', children: [] },
          { title: '在建项目总体情况', icon: '', id: '2-1-2', children: [] },
          { title: '交通强市总体情况', icon: '', id: '2-1-3', children: [] },
          { title: '民生工程总体情况', icon: '', id: '2-1-4', children: [] },
        ]
      },
      {
        title: '公路建设监测', icon: '1', id: '2-2', children: [
          { title: '建设项目信息', icon: '', id: '2-2-1', children: [] },
          { title: '项目前期工作', icon: '', id: '2-2-2', children: [] },
          { title: '项目形象进度', icon: '', id: '2-2-3', children: [] },
          { title: '项目投资情况', icon: '', id: '2-2-4', children: [] },
          { title: '质量监督', icon: '', id: '2-2-5', children: [] },
          { title: '安全生产', icon: '', id: '2-2-6', children: [] },
          { title: '施工现场智能化监测', icon: '', id: '2-2-7', children: [] },
        ]
      },
    ]
  },
  {
    title: '养护工程监测', icon: '1', id: '3', children: [
      {
        title: '养护工程概况', icon: '1', id: '3-1', children: [
          { title: '养护计划概况', icon: '', id: '3-1-1', children: [] },
          { title: '养护工程概况', icon: '', id: '3-1-2', children: [] },
        ]
      },
      {
        title: '养护工程监测', icon: '1', id: '3-2', children: [
          { title: '养护项目信息', icon: '', id: '3-2-1', children: [] },
          { title: '养护进度', icon: '', id: '3-2-2', children: [] },
          { title: '养护投资', icon: '', id: '3-2-3', children: [] },
          { title: '养护质量', icon: '', id: '3-2-4', children: [] },
          { title: '养护安全', icon: '', id: '3-2-5', children: [] },
        ]
      },
    ]
  },
  {
    title: '场站建设监测', icon: '1', id: '4', children: [
      {
        title: '场站建设概况', icon: '1', id: '4-1', children: [
          { title: '场站建设规划情况', icon: '', id: '4-1-1', children: [] },
          { title: '场站建设项目总览', icon: '', id: '4-1-2', children: [] },
        ]
      },
      { title: '场站建设项目监测', icon: '1', id: '4-2', children: [
        { title: '场站建设项目信息', icon: '', id: '4-2-1', children: [] },
        { title: '项目形象进度', icon: '', id: '4-2-2', children: [] },
        { title: '醒目投资情况', icon: '', id: '4-2-3', children: [] },
        { title: '质量监督', icon: '', id: '4-2-4', children: [] },
        { title: '安全生产', icon: '', id: '4-2-5', children: [] },
      ] },
    ]
  },
]

const menuShow = ref(false);
//点击展开下拉
function handleClick() {
  menuShow.value = true;
}

const $router = useRouter();
function handleRouter(item: any) {
  console.log('选中菜单触发跳转', item);
  $router.push({
    path: '/ConstructionProject',
    query: { type: item.id }
  })
}
const period = ref("")
const handleCheck = (type: any) => {
  // 1 交通强市 2 民生工程
  // console.log(type)
  if (type == 1) {
    $emit('jtqs', 1)
  }  else if  (type == 2)  {
    $emit('jtqs', 2)
  } else {
    period.value = type;
    $emit('topTip', type)
  }
}

/**
 * @description 关闭交通强市 需要恢复按钮组数据
 */
const handleCloseJt = () => {
  $emit('closeJtEve')
}

/**
 * @description 点击卡片组
*/
function handleCard(type: any, card: any) {
  $emit('cardChange', type, card)
}

/**
 * @description 回顾
 */
function handleReview() {
  $emit('review')
}

</script>

<style scoped lang="scss">
.home-left-page {
  display: flex;
  flex-direction: column;
  // width: 1050px;
  // height: 1776px;
  // background: rgba(0, 0, 0, 0.5);
}

.top-box {
  background: url('assets/image/lefty/top_title.png') no-repeat 100%/100%;
  width: 1304px;
  height: 160px;

  // margin-top: -80px;
  .text {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 700;
    font-size: 58px;
    line-height: 160px;
    letter-spacing: 4px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #79BFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: 200px;
  }
}

.image-container {
  width: 360px;
  height: 360px;
  border: 1px solid #fff;
  float: left;
  margin-left: 68px;
  margin-top: 20px;
  background-image: url("assets/image/imagebox.png");
  background-size: 100% 100%;
  padding: 8px;
  overflow: hidden;
  position: relative;

  .image-list {
    width: 1440px;
    height: 360px;
    animation: 8s carousel-animation infinite;
    /* 应用动画，持续10秒，无限循环 */

    img {
      width: 360px;
      height: 360px;
      float: left;
    }
  }

  // .image-div {
  //   width: 100%;
  //   height: auto;
  //   position: absolute;
  // }
}

.text-container {
  width: 600px;
  height: 386px;
  // border: 1px solid #fff;
  float: left;
  margin-left: 22px;

  .text-div {
    height: 126px;
    border-bottom: 1px solid #069291;
    padding: 30px 0px 0px 50px;
  }

  .text-state {
    font-size: 60px;
    color: #b1d31c;
    font-family: SourceHanSansNormal;
  }

  .text-lc {
    .text-lc-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-lc-value {
      font-size: 60px;
      color: #fcdd9c;
      font-family: YouSheBiaoTiHei;
      margin-left: 80px;
    }

    .text-lc-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }

  .text-jtl {
    .text-jtl-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-jtl-value {
      font-size: 60px;
      color: #1cc7d3;
      font-family: YouSheBiaoTiHei;
      margin-left: 60px;
    }

    .text-jtl-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }

  .text-ts {
    .text-ts-title {
      font-size: 40px;
      color: #e1e8e8;
      font-family: SourceHanSansNormal;
    }

    .text-ts-value {
      font-size: 60px;
      color: #1cc7d3;
      font-family: YouSheBiaoTiHei;
      margin-left: 180px;
    }

    .text-ts-unit {
      font-size: 40px;
      color: #93a0a8 !important;
      font-family: SourceHanSansNormal;
    }
  }
}

.title {
  width: 536px;
  height: 108px;
  background: linear-gradient(90deg,
      rgba(7, 124, 117, 0) 0%,
      #077c75 48%,
      rgba(7, 124, 117, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  padding: 20px 30px;
  text-align: center;

  .title-text {
    font-weight: 400;
    font-size: 52px;
    color: #ffffff;
    line-height: 68px;
    letter-spacing: 10px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    font-family: YouSheBiaoTiHei;
  }
}

.title-active {
  .title-text {
    color: #00ebff;
  }
}

.title1 {
  width: 716px;
  height: 108px;
  background: linear-gradient(90deg,
      rgba(7, 124, 117, 0) 0%,
      #077c75 48%,
      rgba(7, 124, 117, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  padding: 20px 30px;
  text-align: center;

  .title-text {
    font-weight: 400;
    font-size: 52px;
    color: #ffffff;
    line-height: 68px;
    letter-spacing: 10px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    font-family: YouSheBiaoTiHei;
  }
}

.title1-active {
  .title-text {
    color: #00ebff;
  }
}
</style>
