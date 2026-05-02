<template>
  <div class="swiper_box">
    <div class="carousel" :style="{
      transform: `rotateX(-10deg) rotateY(${carouselRotation}deg)`
    }">
      <div class="carousel-item" :class="compActiveColor(carouselRotation, index)" @click="handleClick(item, index)"
        v-for="(item, index) in items" :key="item.id">
        <div class="item-content">
          <span class="title">{{ item.title }}</span>
          <span class="count">{{ item.description }}项</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useActiveTypeStore } from '../../../store/activeType'

const activeTypeStore = useActiveTypeStore()

const router = useRouter()

const items = [
  { id: 1, title: '工程建设', description: '13', path: 4 },
  { id: 2, title: '公路运营', description: '46', path: 5 },
  { id: 3, title: '城市交通', description: '25', path: 6 },
  { id: 4, title: '道(水)路运输', description: '18', path: 7 },
  { id: 5, title: '交通执法', description: '23', path: 8 },
  { id: 6, title: '安全生产', description: '10', path: 9 },
  { id: 7, title: '投诉处理', description: '21', path: 10 },
  { id: 8, title: '交旅融合', description: '37', path: 11 }
]

const carouselRotation = ref(0)
const isAnimating = ref(false)
const selectedIndex = ref(-1)

// 计算每个项目需要旋转的角度
const itemAngle = 360 / items.length  // 45度

let autoRotateTimer: NodeJS.Timeout | null = null
let currentRotation = 0

function startAutoRotate() {
  autoRotateTimer = setInterval(() => {
    currentRotation -= itemAngle
    carouselRotation.value = currentRotation
  }, 2500)
}

//计算正面元素字体颜色
function compActiveColor(carouselRotation: any, index: number) {
  if (Math.abs(carouselRotation % 360) == Math.abs(-(index * 45))) {
    return 'active'
  }
}

function stopAutoRotate() {
  if (autoRotateTimer) {
    clearInterval(autoRotateTimer)
    autoRotateTimer = null
  }
}

function handleClick(item: any, index: number) {
  console.log('点击项目:', item, '索引:', index)

  if (isAnimating.value) return

  // 检查是否已经是正面（旋转角度接近0）
  const normalizedRotation = carouselRotation.value % 360
  const isAtFront = Math.abs(normalizedRotation) == Math.abs(-(index * itemAngle))

  console.log('当前旋转角度:', normalizedRotation, '是否在正面:', isAtFront)

  // 如果卡片已在正面，则进入新页面
  if (isAtFront && selectedIndex.value === index) {
    console.log('卡片在正面，进入页面:', item.path)
    // router.push(item.path)
    activeTypeStore.setActiveBtn(item.path)
    return
  }

  // 否则旋转卡片到正面
  isAnimating.value = true
  stopAutoRotate()
  selectedIndex.value = index

  // 计算目标旋转角度
  const targetRotation = -(index * itemAngle)
  currentRotation = targetRotation
  carouselRotation.value = targetRotation

  console.log('旋转到:', targetRotation)

  // 停留3秒后继续自动旋转
  isAnimating.value = false
  setTimeout(() => {
    startAutoRotate()
  }, 3000)
}

onMounted(() => {
  console.log('组件挂载，开始自动旋转')
  startAutoRotate()
})

onUnmounted(() => {
  stopAutoRotate()
})
</script>

<style lang="scss" scoped>
.active {
  & .title {
    background: linear-gradient(270deg, #17FFAE 0%, #FFFFFF 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
}

.item-content {
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer !important;

  .title {
    display: block;
    box-sizing: border-box;
    width: 100%;
    line-height: 600px;
    text-align: center;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, 50%)
    font-size: 80px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    background: linear-gradient(0deg, #17E0FF 0%, #FFFFFF 56%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .count {
    position: absolute;
    top: 0;
    right: 100px;
    display: block;
    text-align: right;
    width: 100%;
  }
}

@keyframes rotate {

  /* 定义动画 , 名称是 rotate , 该动画绕着 Y 轴旋转 360 度 */
  0% {
    transform: rotateX(-10deg) rotateY(0);
  }

  100% {
    transform: rotateX(-10deg) rotateY(360deg);
  }
}

.swiper_box {
  /* 添加动画效果 , 控件 匀速旋转 每 10 秒旋转一圈 无限循环 */
  // animation: rotate 10s linear infinite;
  --translateZ_value: 1800px;
  z-index: 999;

  .carousel {
    /* 父盒子 和 子盒子 使用不同的 3D 变换效果 */
    transform-style: preserve-3d;
    /* 相对定位 */
    position: relative;
    pointer-events: all;
    /* 添加过渡效果，使旋转更平滑 */
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
    z-index: 99;

    &:hover {
      /* 鼠标悬停时保持当前状态 */
      animation-play-state: paused;
    }

    div:nth-child(1) {
      /* 第 1 个盒子不需要旋转 , 向屏幕方向移动 300 像素 */
      transform: rotateY(0) translateZ(var(--translateZ_value));
    }

    div:nth-child(2) {
      /* 第 2 个盒子 先旋转 60 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(45deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(3) {
      /* 第 3 个盒子 先旋转 120 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(90deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(4) {
      /* 第 4 个盒子 先旋转 180 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(135deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(5) {
      /* 第 5 个盒子 先旋转 240 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(180deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(6) {
      /* 第 3 个盒子 先旋转 300 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(225deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(7) {
      /* 第 3 个盒子 先旋转 300 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(270deg) translateZ(var(--translateZ_value));
    }

    div:nth-child(8) {
      /* 第 3 个盒子 先旋转 300 度 , 然后再向屏幕方向移动 300 像素 */
      transform: rotateY(315deg) translateZ(var(--translateZ_value));
    }

    &>div {
      /* 绝对定位 , 子绝父相 , 其父容器必须是相对布局 */
      position: absolute;
      /* 左上角定位在父容器 0,0 位置 */
      top: 500px;
      left: 33%;
      /* 设置文字大小 */
      font-size: 60px;
      /* 设置文字颜色 */
      color: #fff;
      /* 设置文字在盒子中水平对齐 */
      text-align: center;
      /* 设置文字在盒子中垂直对齐 */
      line-height: 200px;
    }

    .carousel-item {
      width: 1200px;
      height: 600px;
      background: skyblue;
      background: url('src/assets/交通垂直大模型切图/工程.png') no-repeat center;
      cursor: pointer;
    }
  }
}
</style>
