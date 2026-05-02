<template>
  <div class="home-left-page">
    <el-menu :default-active="activeId" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      @select="handelSelect">
      <menu-item :menuList="menuList" />
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="">
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from './components/menuItem.vue'
import { useMenuStore } from "../store/index";

const storeMenu = useMenuStore();
const $route = useRoute()
const $router = useRouter()

const $emit = defineEmits(['jtqs', 'closeJtEve', 'topTip', 'cardChange', 'review'])

const menuList = ref([
  { title: '公路运营全景', icon: '1', id: '1', children: [] },
  {
    title: '公路资产监测', icon: '1', id: '2', children: [
      { title: '养护巡检情况', icon: '', id: '2-1', children: [] },
      { title: '病害处治情况', icon: '', id: '2-2', children: [] },
      { title: '主要病害分布', icon: '', id: '2-3', children: [] },
      { title: '病害统计分析', icon: '', id: '2-4', children: [] },
      { title: '桥梁结构物健康监测', icon: '', id: '2-5', children: [] },
      { title: '隧道结构物健康监测', icon: '', id: '2-6', children: [] },
      { title: '边坡结构物健康监测', icon: '', id: '2-7', children: [] },
    ]
  },
  {
    title: '实时路况监测', icon: '1', id: '3', children: [
      { title: '实时路况监测', icon: '', id: '3-1', children: [] },
    ]
  },
  {
    title: '交通量监测', icon: '1', id: '4', children: [
      {
        title: '交通流量实时监测', icon: '1', id: '4-1', children: [
          { title: '出入口交通流量监测', icon: '', id: '4-1-1', children: [] },
          { title: '交调站交通量监测', icon: '', id: '4-1-2', children: [] },
          { title: '交通量统计分析', icon: '', id: '4-1-3', children: [] },
        ]
      },
      {
        title: '交通流量状况查询', icon: '1', id: '4-2', children: [
          { title: '交通流量状况查询', icon: '', id: '4-2-1', children: [] },
        ]
      },
      {
        title: '交通流量分析', icon: '1', id: '4-3', children: [
          { title: '交通流量分析', icon: '', id: '4-3-1', children: [] },
        ]
      },
    ]
  },
  {
    title: '风险隐患点监测', icon: '1', id: '5', children: [
      { title: '风险隐患点更新维护', icon: '', id: '5-1', children: [] },
      { title: '风险隐患点统计分析', icon: '', id: '5-2', children: [] },
      { title: '风险隐患点可视化查询', icon: '', id: '5-3', children: [] },
    ]
  },
  {
    title: '交通气象监测', icon: '1', id: '6', children: [
      { title: '气象监测', icon: '', id: '6-1', children: [] },
      { title: '气象预警', icon: '', id: '6-2', children: [] },
      { title: '路网环境查询', icon: '', id: '6-3', children: [] },
    ]
  },
  {
    title: '养护工区监测', icon: '1', id: '7', children: [
      {
        title: '养护工区概况', icon: '1', id: '7-1', children: [
          { title: '养护工区总览', icon: '', id: '7-1-1', children: [] },
          { title: '养护工区地图分布', icon: '', id: '7-1-2', children: [] },
          { title: '养护工区基本信息查询', icon: '', id: '7-1-3', children: [] },
        ]
      },
      {
        title: '养护工区运行监测', icon: '1', id: '7-2', children: [
          { title: '养护工区资源配置情况', icon: '', id: '7-2-1', children: [] },
          { title: '养护工区任务开展情况', icon: '', id: '7-2-2', children: [] },
          { title: '养护工区视频监控查询', icon: '', id: '7-2-3', children: [] },
        ]
      },
    ]
  },
  {
    title: '服务区监测', icon: '1', id: '8', children: [
      {
        title: '服务区概况', icon: '1', id: '8-1', children: [
          { title: '服务区总览', icon: '', id: '8-1-1', children: [] },
          { title: '服务区地图分布', icon: '', id: '8-1-2', children: [] },
          { title: '服务区基本信息查询', icon: '', id: '8-1-3', children: [] },
        ]
      },
      {
        title: '服务区运行监测', icon: '1', id: '8-2', children: [
          { title: '服务区视频监控查询', icon: '', id: '8-2-1', children: [] },
          { title: '服务区流量监测', icon: '', id: '8-2-1', children: [] },
          { title: '服务区设施运行监测', icon: '', id: '8-2-1', children: [] },
        ]
      },
    ]
  },
])

const activeId = ref('1')

onMounted(() => {
  // console.log('1111', $route.query.type, findActiveMenuId($route.query.type as string));
  // activeId.value = findActiveMenuId($route.query.type as string)
  activeId.value = $route.query.type as string
  // console.log('activeId', activeId.value);

  // defaultActive.value = activeId
})
//根据路由参数传递的菜单名称递归查询menulist菜单对应的id
function findActiveMenuId(type: string) {
  let activeId = '1'
  function findMenu(type: string, list: any) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      // console.log('test',item.title, type);
      if (item.title === type) {

        activeId = item.id
        return
      }
      if (item.children && item.children.length > 0) {
        findMenu(type, item.children)
      }
    }
  }
  findMenu(type, menuList.value)
  return activeId
}

function handleOpen(key: any, keyPath: any) {
  // console.log(key, keyPath);
}

function handleClose(key: any, keyPath: any) {
  // console.log(key, keyPath);
}

function handelSelect(key:any, keyPath:any){
  console.log('选中菜单',key,keyPath);
  // storeMenu.setActiveTab(key)
  if(key === '1'){
    $router.push({ path: `/sectorIndex/2`});
  }else{
    storeMenu.setActiveTab(key)
  }
}

</script>

<style scoped lang="scss">
.home-left-page {
  padding-left: 73px;
  width: 100%;
  height: 100%;
  // background: skyblue;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);

  :deep(.el-menu-vertical-demo) {
    border-right: none;
    background: transparent;
    flex: 1;
    overflow-y: auto;
    --el-menu-bg-color: transparent;
    --el-menu-hover-bg-color: transparent;
    --el-menu-item-font-size: 50px;
    --el-menu-item-height: 120px;
    --el-menu-sub-item-height: 120px;
    --el-menu-level-padding: 68px;

    .el-sub-menu__title,
    .el-menu-item {
      margin-bottom: 22px;
      background: linear-gradient(180deg, #79BFFF 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 50px;
      line-height: 67px;
      font-style: normal;
      text-transform: none;
    }

    .is-active {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        height: 120px;
        width: 796px;
        left: 0px;
        top: 0;
        z-index: -1;
        background: url('assets/component/statistics/切图 509.png') no-repeat 100% 100%;
        width: 100%;
      }
    }

    .is-opened {
      &::after {
        background: linear-gradient(180deg, #79BFFF 0%, #FFFFFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      &>.el-sub-menu__title>.el-sub-menu__icon-arrow {
        transform: rotateZ(360deg) !important;
      }
    }

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }



    .el-icon {
      height: 59px;
      width: 59px;
      margin-right: 38px;

      &>svg {
        height: 59px;
        width: 59px;
      }
    }

    .el-sub-menu__icon-arrow {
      margin: 0px !important;
      height: 17px !important;
      width: 59px !important;
      background: linear-gradient(180deg, #79BFFF 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transform: rotateZ(270deg) !important;

      &>svg {
        // height: 100px !important;
        width: 59px !important;
        font-size: 90px !important;

        path {
          fill: #FFFFFF;
        }
      }
    }

  }
}
</style>
