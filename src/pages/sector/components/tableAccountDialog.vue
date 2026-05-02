<template>
  <q-dialog v-model="tableAccountStore.isVisible" seamless transition-show="none" transition-hide="none">
    <div class="right-acount-box" :style="getDialogStyle">
      <div class="right-acount-close" @click="close">
      </div>
      <div class="dialog-content w-full h-full">
        <div class="content-placeholder" style="width: 100%;height: 100%;">
          <component :is="currentTabComponent" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { watch, ref, computed, defineAsyncComponent, nextTick } from 'vue'
import { useTableAccountStore } from '../store/tableAccount'
import bg1 from 'src/assets/component/规划项目弹窗集合_slices/切图 157.png'
import bg2 from 'src/assets/component/规划项目弹窗集合_slices/切图 172.png'

const tableAccountStore = useTableAccountStore()

const expresswayConstruction = defineAsyncComponent(
  () => import('./tableDailogContent/expresswayConstruction.vue')
)
const hub = defineAsyncComponent(
  () => import('./tableDailogContent/hub.vue')
)
const Maintenance = defineAsyncComponent(
  () => import('./tableDailogContent/Maintenance.vue')
)
const ordinaryTrunkRoads = defineAsyncComponent(
  () => import('./tableDailogContent/ordinaryTrunkRoads.vue')
)
const ruralRoads = defineAsyncComponent(
  () => import('./tableDailogContent/ruralRoads.vue')
)

const tabComponents: Record<number, any> = {
  0: expresswayConstruction,
  1: ordinaryTrunkRoads,
  2: ruralRoads,
  3: Maintenance,
  4: hub
}

const currentTabComponent = computed(() => {
  return tabComponents[tableAccountStore.activeTab]
})

const getDialogStyle = computed(() => {
  if (tableAccountStore.activeTab <= 2 || tableAccountStore.activeTab == 4) {
    return {
      width: '1448px !important',
      height: '1149px !important',
      backgroundImage: 'url("' + bg1 + '") !important',
      backgroundSize: '100% 100% !important',
      backgroundRepeat: 'no-repeat !important'
    }
  } else {
    return {
      width: '1994px !important',
      height: '752px !important',
      backgroundImage: 'url("' + bg2 + '") !important',
      backgroundSize: '100% 100% !important',
      backgroundRepeat: 'no-repeat !important'
    }
  }
})

const close = () => {
  tableAccountStore.closeDialog()
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
}


.right-acount-close {
  width: 46px;
  height: 46px;
  background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
  position: absolute;
  right: 56px;
  top: 56px;
  cursor: pointer;
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
  // -webkit-text-fill-color: transparent;
  transition: all 0.2s ease-in-out;
}
</style>
