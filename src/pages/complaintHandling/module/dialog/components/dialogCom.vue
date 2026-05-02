<template>
  <q-dialog seamless :model-value="modelValue">
    <div class="dialog-content" :style="{ left: positions[0] as any, top: positions[1] as any }">
      <div class="dialog-title">{{ title }}</div>
      <div class="dialog-tool">
        <div class="dialog-chart" v-if="tip.includes('chart')" @click="handleClick('chart')"></div>
        <div class="dialog-list" v-if="tip.includes('list')" @click="handleClick('list')"></div>
        <div class="dialog-detile" v-if="tip.includes('detile')" @click="handleClick('detile')"></div>
        <div class="dialog-close" @click="handleClose"></div>
      </div>
      <div class="dialog-con bg1" v-if="size == 'small'">
        <slot></slot>
      </div>
      <div class="dialog-con bg2" v-else>
        <slot></slot>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {  //控制弹窗显隐
    type: Boolean,
    default: true
  },
  size: { //弹窗大小
    type: String,
    default: 'small'
  },
  title: { //弹窗标题
    type: String,
    default: '标题'
  },
  tip: { //弹窗右上角除关闭外的功能按钮
    type: Array<String>,
    default: ['list', 'chart']
  },
  positions: { //弹窗位置
    type: Array<String>,
    default: ['1700px', '380px']
  }
})

const $emit = defineEmits(['openDialog', 'update:modelValue', 'clickTip'])

const handleClose = () => {
  $emit('update:modelValue', false)
  $emit('clickTip', 'close')
}

function handleClick(type: string) {
  $emit('clickTip', type)
}

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2242px !important;
  overflow: none !important;
  // min-height: 1000px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  position: fixed;
  padding-top: 70px;
  box-sizing: border-box;
  // background: pink;

  .dialog-title {
    position: absolute;
    width: 443.52px;
    height: 61.31px;
    top: 0;
    left: 0;

    color: #C6E1FF;
    padding-left: 33px;
    background: url("assets/image/complaintHandling/组.png");
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 700;
    font-size: 40px;
    line-height: 60px;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3);
    text-align: left;
    font-style: normal;
    text-transform: none;
    letter-spacing: 2px;
  }

  .dialog-tool {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 0px;

    .dialog-list {
      width: 52px;
      height: 52px;
      background: url("assets/image/complaintHandling/组 43162.png") no-repeat 100%/100%;
      margin-right: 30px;
    }

    .dialog-chart {
      width: 52px;
      height: 52px;
      background: url("assets/image/complaintHandling/组 43180.png") no-repeat 100%/100%;
      margin-right: 30px;
    }

    .dialog-detile {
      width: 52px;
      height: 52px;
      background: url("assets/image/complaintHandling/组 43180.png") no-repeat 100%/100%;
      margin-right: 30px;
    }

    .dialog-close {
      width: 58px;
      height: 58px;
      background: url("assets/image/complaintHandling/Group 11.png") no-repeat 100%/100%;
    }
  }



  .dialog-con {
    width: 100%;
    // background: pink;
    position: relative;
  }

  .bg1 {
    width: 1396px;
    height: 952px;
    background: url("/src/assets/image/complaintHandling/矩形 3768.png");
    padding: 48px;

    &::before {
      content: '';
      width: 1307px;
      height: 857px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url("/src/assets/image/complaintHandling/矩形 3767.png");
    }
  }

  .bg2 {
    width: 2242px;
    height: 1564px;
    background: url("/src/assets/image/complaintHandling/组 43225.png");
    padding: 48px;
  }
}
</style>
