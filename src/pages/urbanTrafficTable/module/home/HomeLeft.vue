<template>
  <div class="home-left-page">
    <el-menu :default-active="activeId" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handelSelect">
      <menu-item :menuList="menuList" />
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="">
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from './components/menuItem.vue'
import { useMenuStore } from "../../store/index";

const storeMenu = useMenuStore();

const { activeTab:activeId } = toRefs(storeMenu)

const $route = useRoute()
const $router = useRouter()

function handelSelect(key:any, keyPath:any){
  // console.log('选中菜单',key,keyPath);
  if(key == '1'){
    $router.push({ path: `/sectorIndex/4`});
  }else{
    storeMenu.setActiveTab(key)
  }
}



const $emit = defineEmits(['jtqs', 'closeJtEve', 'topTip', 'cardChange', 'review'])

const menuList = ref([
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
])

// const activeId = ref('2-3')

onMounted(() => {
  // console.log('1111', $route.query.type, findActiveMenuId($route.query.type as string));
  // activeId.value = findActiveMenuId($route.query.type as string)
  activeId.value = $route.query.type as string
  // console.log('activeId', activeId.value);

  // defaultActive.value = activeId
})
//根据路由参数递归查询menulist菜单对应的id
function findActiveMenuId(type: string) {
  let activeIdt = '1'
  function findMenu(type: string, list: any) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      // console.log('test',item.title, type);
      if (item.title === type) {
        activeIdt = item.id
        return
      }
      if (item.children && item.children.length > 0) {
        findMenu(type, item.children)
      }
    }
  }
  findMenu(type, menuList.value)
  if(activeIdt === '1'){
    return activeId.value
  }
  return activeIdt
}

function handleOpen(key: any, keyPath: any) {
  // console.log(key, keyPath);
}

function handleClose(key: any, keyPath: any) {
  // console.log(key, keyPath);
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
