<!--生成验证码-->
<template>
  <div class="my-identify" ref="myidentify">
    <div class="s-canvas" v-if="state.isShow">
      <canvas id="s-canvas" :width="state.contentWidth" :height="state.contentHeight"></canvas>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, watch, nextTick, ref } from 'vue';

const state = reactive({
  contentWidth: 120,
  contentHeight: 40,
  isShow: false
})
const props = defineProps({
  identifyCode: {
    type: String,
    default: '1234'
  },
  backgroundColorMin: {
    type: Number,
    default: 180
  },
  backgroundColorMax: {
    type: Number,
    default: 240
  },
  colorMin: {
    type: Number,
    default: 50
  },
  colorMax: {
    type: Number,
    default: 160
  },
  lineColorMin: {
    type: Number,
    default: 100
  },
  lineColorMax: {
    type: Number,
    default: 200
  },
  dotColorMin: {
    type: Number,
    default: 0
  },
  dotColorMax: {
    type: Number,
    default: 255
  },
})

let myidentify = ref();

// 生成一个随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

// 生成一个随机的颜色
const randomColor = (min, max) => {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}

// 绘制干扰线
const drawLine = (ctx) => {
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = randomColor(props.lineColorMin, props.lineColorMax)
    ctx.beginPath()
    ctx.moveTo(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight))
    ctx.lineTo(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight))
    ctx.stroke()
  }
}

const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(props.colorMin, props.colorMax)
  ctx.font = randomNum(state.contentHeight, state.contentHeight) + 'px SimHei'
  let x = (i + 1) * (state.contentWidth / (props.identifyCode.length + 1))
  let y = randomNum(state.contentHeight, state.contentHeight)
  var deg = randomNum(-10, 10)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)
  ctx.rotate(deg * Math.PI / 100)
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate(-deg * Math.PI / 100)
  ctx.translate(-x, -y)
}

const drawDot = (ctx) => {
  // 绘制干扰点
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight), 1, 0, 2 * Math.PI)
    ctx.fill()
  }
}

const drawPic = () => {
  let canvas = document.getElementById('s-canvas')
  let ctx = canvas.getContext('2d')
  ctx.textBaseline = 'bottom'
  // 绘制背景
  ctx.fillStyle = randomColor(props.backgroundColorMin, props.backgroundColorMax)
  ctx.fillRect(0, 0, state.contentWidth, state.contentHeight)
  // 绘制文字
  for (let i = 0; i < props.identifyCode.length; i++) {
    drawText(ctx, props.identifyCode[i], i)
  }
  drawLine(ctx)
  drawDot(ctx)
}

watch(() => props.identifyCode, (newValue, oldValue) => {
  drawPic();
})

onMounted(() => {
  nextTick(() => {
    state.contentWidth = myidentify.value.offsetWidth;
    state.contentHeight = myidentify.value.offsetHeight;
    state.isShow = true;
    setTimeout(() => {
      drawPic();
    }, 1000);

  })
})
</script>
<style scoped lang='css'>
.my-identify{
  width: 100%;
  height: 100%;
}
.s-canvas {
  cursor: pointer;
}
</style>
