<template>
  <q-dialog v-model="rightAcountStore.isVisible" seamless transition-show="none" transition-hide="none">
    <div class="right-acount-box" :style="getDialogStyle">
      <div class="right-acount-close" @click="close">
      </div>
      <div class="tab-container">
        <div v-for="(tab, index) in tabs" :key="index" class="tab-button" :class="{ 'tab-active': activeTab === index }"
          :style="getTabStyle(index)" @click="handleTabClick(index)">
          <span class="tab-text">{{ tab.name }}</span>
        </div>
        <div class="icon" @click="handeChangeTable" v-if="activeTab < 3"></div>
      </div>
      <!-- 内容区域 -->
      <div class="right-acount-content">
        <div class="content-placeholder" style="width: 100%;height: 100%;">
          <component :is="currentTabComponent" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { watch, ref, computed, defineAsyncComponent, nextTick } from 'vue'
import { useRightAcountStore } from '../store/rightAcount'

const TabContent1 = defineAsyncComponent(
  () => import('./TabContent1.vue')
)

const TabContent2 = defineAsyncComponent(
  () => import('./TabContent2.vue')
)

const TabContent3 = defineAsyncComponent(
  () => import('./TabContent3.vue')
)

const TabContent4 = defineAsyncComponent(
  () => import('./TabContent4.vue')
)

const TabContent5 = defineAsyncComponent(
  () => import('./TabContent5.vue')
)

const TableContent1 = defineAsyncComponent(
  () => import('./TableContent1.vue')
)

const TableContent2 = defineAsyncComponent(
  () => import('./TableContent2.vue')
)

const TableContent3 = defineAsyncComponent(
  () => import('./TableContent3.vue')
)

const TableContent4 = defineAsyncComponent(
  () => import('./TableContent4.vue')
)

const TableContent5 = defineAsyncComponent(
  () => import('./TableContent5.vue')
)

const tabComponents: Record<number, any> = {
  0: TabContent1,
  1: TabContent2,
  2: TabContent3,
  3: TabContent4,
  4: TabContent5
}

const tableComponents: Record<number, any> = {
  0: TableContent1,
  1: TableContent2,
  2: TableContent3,
  3: TableContent4,
  4: TableContent5
}

const currentTabComponent = computed(() => {
  if (!(activeTab.value < 3)) {
    isCharts.value = true
  }
  if (isCharts.value) {
    // console.log('切换到tab');
    return tabComponents[activeTab.value] || TabContent1
  } else {

    // console.log('切换到table');
    return tableComponents[activeTab.value] || TableContent1
  }
})

const rightAcountStore = useRightAcountStore()

// Tab数据
const tabs = ref([
  { name: '高速公路' },
  { name: '普通干线公路' },
  { name: '农村公路' },
  { name: '公路养护工程' },
  { name: '公路运输枢纽工程' }
])

// 当前激活的tab
const activeTab = ref(0)
// 当前激活是图表内容 true:图表 false:表格
const isCharts = ref(true)

import bg1 from "src/assets/component/规划项目弹窗集合_slices/切图 80.png";
import bg2 from "src/assets/component/规划项目弹窗集合_slices/切图80active.png"
import bg3 from "src/assets/component/规划项目弹窗集合_slices/切图 51.png";
import bg4 from "src/assets/component/规划项目弹窗集合_slices/切图 51active.png"
import bg5 from "src/assets/component/规划项目弹窗集合_slices/切图 90.png";
import bg6 from "src/assets/component/规划项目弹窗集合_slices/切图 98.png";
import bg7 from "src/assets/component/规划项目弹窗集合_slices/切图 96.png";

// 获取tab样式
const getTabStyle = (index: number) => {
  const isActive = activeTab.value === index
  const isLastTab = index === tabs.value.length - 1

  if (isLastTab) {
    return {
      width: '264px',
      height: '60px',
      backgroundImage: isActive
        ? `url(${bg1})`
        : `url(${bg2})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }
  } else {
    return {
      width: '214px',
      height: '60px',
      backgroundImage: isActive
        ? `url(${bg3})`
        : `url(${bg4})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
    }
  }
}

// 获取弹窗样式
const getDialogStyle = computed(() => {
  const activeTabIndex = activeTab.value

  if (activeTabIndex <= 2) {
    return {
      width: '1437px !important',
      height: '976px !important',
      backgroundImage: `url(${bg5}) !important`,
      backgroundSize: '100% 100% !important',
      backgroundRepeat: 'no-repeat !important'
    }
  } else if (activeTabIndex === 3) {
    return {
      width: '1407px !important',
      height: '1749px !important',
      backgroundImage: `url(${bg6}) !important`,
      backgroundSize: '100% 100% !important',
      backgroundRepeat: 'no-repeat !important'
    }
  } else {
    return {
      width: '1437px !important',
      height: '1197px !important',
      backgroundImage: `url(${bg7}) !important`,
      backgroundSize: '100% 100% !important',
      backgroundRepeat: 'no-repeat !important'
    }
  }
})

const handleTabClick = (index: number) => {
  if (activeTab.value !== index) {
    activeTab.value = index
    nextTick(() => {
      const event = new CustomEvent('resize')
      window.dispatchEvent(event)

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    })
  }
}

watch(() => rightAcountStore.isVisible, (newValue) => {
  if (newValue) {
    onOpen()
  } else {
    onClose()
  }
})

const onOpen = () => {
}

const onClose = () => {
}

const close = () => {
  rightAcountStore.closeDialog()
}

// 图表/表格切换
function handeChangeTable() {
  // console.log('当前激活', tabs.value[activeTab.value].name);
  isCharts.value = !isCharts.value
}
</script>

<style scoped lang="scss">
:deep(.q-dialog) {
  z-index: 15000 !important;
}

.q-dialog__inner--minimized>div {
  max-width: none !important;
  max-height: none !important;
  width: auto !important;
  height: auto !important;
  overflow: visible !important;
  min-height: none !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
  width: auto !important;
  height: auto !important;
}

.icon {
  width: 66px;
  height: 66px;
  background-image: url('assets/component/规划项目弹窗集合_slices/切图 44.png');
  background-size: 100% 100%;
  margin-left: 10px;
}

.right-acount-box {
  position: fixed;
  top: 330px;
  right: 1260px;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  padding: 125px 50px 70px 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 15000;
  pointer-events: auto;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out, background-image 0.2s ease-in-out;

  .right-acount-close {
    width: 46px;
    height: 46px;
    background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
    position: absolute;
    right: 56px;
    top: 56px;
    cursor: pointer;
  }

  .tab-container {
    display: flex;
    gap: 10px;
    align-items: center;
    position: absolute;
    top: 58px;
    left: 56px;
  }

  .tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    outline: none;

    &:hover {
      transform: translateY(-2px);
      filter: brightness(1.1);
    }

    .tab-text {
      font-family: Roboto, Roboto;
      font-weight: 400;
      font-size: 30px;
      line-height: 70px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      pointer-events: none;
    }
  }

  .right-acount-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    min-height: 0;
    overflow: hidden;
    padding: 15px;
    transition: all 0.2s ease-in-out;
  }

  .content-placeholder {
    width: 100%;
    height: 100%;
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 500;
    font-size: 48px;
    line-height: 64px;
    text-align: center;
    color: #FFFFFF;
    background: linear-gradient(to bottom, #C8D7E4 0%, #FFFFFF 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all 0.2s ease-in-out;
  }
}
</style>
