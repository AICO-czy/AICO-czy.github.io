<!-- 高速公路 -->
<template>
  <div class="tab-content-1">
    <!-- 顶部信息展示 -->
    表格内容3
  </div>
</template>

<script setup lang="ts">
import titleBox from './titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const slide = ref('style')
const carouselKey = ref(0)

// 组件挂载后重置轮播状态
onMounted(() => {
  nextTick(() => {
    // 确保轮播组件正确初始化
    slide.value = 'style'
    // 强制重新渲染
    carouselKey.value++
  })
})

// 监听slide变化，确保轮播正常工作
watch(slide, () => {
  nextTick(() => {
    // 触发窗口resize事件，让图表重新计算尺寸
    window.dispatchEvent(new Event('resize'))
  })
})

// 组件卸载时清理
onUnmounted(() => {
  // 清理可能的定时器或事件监听
})

const topInfo = [
  {
    label: '总投资：',
    total: '75亿元'
  },
  {
    label: '路段：',
    total: '1条'
  },
  {
    label: '里程：',
    total: '123公里'
  },
  {
    label: '互通：',
    total: '1座'
  },

]
</script>

<style scoped lang="scss">
.tab-content-1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top-info {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .container-header-item {
    display: flex;
    align-items: center;
    column-gap: 25px;
    margin-right: 40px;
  }

  .container-header-item div:first-child {
    width: 23px;
    height: 22px;
    background: linear-gradient(158deg, #D0E5E5 0%, rgba(208, 229, 229, 0) 100%);
    border-radius: 50%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: #60D9FF;
      border-radius: 50%;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .container-header-item div:last-child {
    display: flex;
    align-items: center;

    span:first-child {
      font-family: AlibabaPuHuiTi, PingFang SC, Microsoft YaHei, sans-serif;
      font-weight: 400;
      font-size: 30px;
      line-height: 42px;
      font-style: normal;
      text-transform: none;
      color: #FFFFFF;
      margin-right: 20px;
      white-space: nowrap;
    }

    span:last-child {
      font-family: YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif;
      font-weight: 400;
      font-size: 46px;
      line-height: 60px;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(to bottom, #FFB579 0%, #FFEFB8 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
      white-space: nowrap;
    }
  }

  .echarts-container {
    width: 100%;
    flex: 1;
    box-shadow: inset 0px 0px 12px 0px #4DA3FF;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);

    //  background: url('assets/image/lefty/bg188.png') no-repeat 100% / 100%;
    display: flex;
    flex-direction: column;
    padding: 0;

    // 进度条
    .echarts-progress {
      width: 100%;
      height: 100px;

      // 添加圆圈闪烁动画
      :deep(.echarts-for-vue) {
        .pictorialBar {
          animation: blink 2s infinite;
        }
      }
    }
  }

  // 闪烁动画
  @keyframes blink {

    0%,
    50% {
      opacity: 1;
      transform: scale(1);
    }

    25%,
    75% {
      opacity: 0.3;
      transform: scale(1.1);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  // 轮播容器样式
  .carousel-container {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 500px;

    .chart-wrapper {
      width: 100%;
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.q-carousel) {
      width: 100%;
    }

    :deep(.q-carousel__slide) {
      padding: 20px;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    :deep(.q-carousel__navigation) {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
