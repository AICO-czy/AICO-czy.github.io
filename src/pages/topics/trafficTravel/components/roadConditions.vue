<!-- 发布信息弹窗 -->
<template>
  <q-dialog v-model="alert" seamless>
    <div class="bg">
      <dialog-title title="拥堵路段TOP10" @close="handleClose" />
      <div class="body-box">
        <div class="item flex" v-for="(item, index) in colorList">
          <div class="name-box">乡道宝清线(东向西)</div>
          <div class="line-box"><q-linear-progress dark rounded :style="{ '--selfColor': item }"
              :value="(10 - index) / 20 + 0.2" class="line" /></div>
          <div class="value-box">拥堵里程 12km</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DialogTitle from './dialogTitle.vue'

const alert = ref(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (newVal) => {
  alert.value = newVal
})

const colorList = [
  '#FF1F1F', '#FF351F', '#FF4F1F', '#FF6818', '#FF6818', '#FF890F', '#FF890F', '#FF9D0A', '#FFAC05', '#FFBF00'
]

//取消
function handleClose() {
  alert.value = false
}
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1036px !important;
  overflow: none !important;
  min-height: 988px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.bg {
  width: 1036px;
  height: 988px;
  background: url('assets/image/TransportationAndTravel/road_conditions_bg.png') no-repeat center/cover;
  position: fixed;
  left: 1576px;
  bottom: 4%;
  padding: 0 20px;
}


.body-box {
  padding: 40px;

  .item {
    height: 78px;

    .name-box {
      font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
      font-weight: 400;
      font-size: 25px;
      color: #E9EFFF;
      line-height: 50px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .line-box {
      .line {
        height: 10px;
        margin-top: 20px;

        :deep(.q-linear-progress__model--determinate) {
          background: var(--selfColor);
          /* 自定义占位符文本颜色 */
        }
      }

      height: 50px;
      flex:1;
      padding:0 20px
    }

    .value-box {
      font-family: D-DIN Condensed, D-DIN Condensed;
      font-weight: 400;
      font-size: 36px;
      color: #FF890F;
      line-height: 50px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
</style>
