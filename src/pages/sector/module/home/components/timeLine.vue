<template>
  <div class="time-Line" :style="{ bottom: bottom + 'px' }">
    <!-- 关闭按钮 -->
    <div class="chat-close" @click="hideEve">
    </div>
    <!-- 顶部按钮 -->
    <div class="top-btn">
      主要建设项目 >
    </div>
    <!-- 左侧播放按钮 -->
    <div class="play-btn" @click="startAnimation">
      <img :src="png1" alt="">
    </div>
    <div class="imgg">
      <div class="tech-timeline">
        <canvas ref="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

import png1 from "assets/image/lefty/play.png"
// 距离页面底部的距离
const bottom = ref(-1000)
const $emit = defineEmits(['hideEve'])
/**
 * @description 显示事件线 距离页面底部位置缩小
 */
const showEve = () => {
  // console.log("显示事件线");
  bottom.value = 189
}

/**
 * @description 隐藏事件线 距离页面底部位置放大
 */
const hideEve = () => {
  // console.log("隐藏事件线");
  bottom.value = -1000
  $emit('hideEve')
}


const canvas = ref(null);
const canvasWidth = ref(1200);
const canvasHeight = ref(400);
const isInitialized = ref(false);

const isAnimating = ref(false);
const currentTime = ref(0);
const lightPosition = ref(0);
const dashOffset = ref(0);
const gridOffset = ref(0);

let ctx = null;
let animationId = null;
let resizeTimeout = null;
let resizeObserver = null;

const updateCanvasSize = () => {
  if (!canvas.value) return false;

  const container = canvas.value.parentElement;
  if (!container) return false;

  const rect = container.getBoundingClientRect();
  const devicePixelRatio = window.devicePixelRatio || 1;
  const width = rect.width;
  const height = rect.height;

  canvas.value.width = width * devicePixelRatio;
  canvas.value.height = height * devicePixelRatio;

  canvas.value.style.width = width + 'px';
  canvas.value.style.height = height + 'px';
  canvas.value.style.display = 'block';

  canvasWidth.value = width;
  canvasHeight.value = height;

  return true;
};

const initCanvas = () => {
  if (!canvas.value) return false;

  ctx = canvas.value.getContext('2d');
  if (!ctx) return false;

  updateCanvasSize();

  const devicePixelRatio = window.devicePixelRatio || 1;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  return true;
};

const baseTimeData = [
  { label: '2022年', type: 'year', x: 0.08, y: 0.30 },
  { label: '3月', type: 'month', x: 0.18, y: 0.20 },
  { label: '7月', type: 'month', x: 0.28, y: 0.18 },
  { label: '12月', type: 'month', x: 0.38, y: 0.21 },
  { label: '2023年', type: 'year', x: 0.48, y: 0.35 },
  { label: '6月', type: 'month', x: 0.58, y: 0.48 },
  { label: '2024年', type: 'year', x: 0.68, y: 0.48 },
  { label: '5月', type: 'month', x: 0.78, y: 0.49 },
  { label: '7月', type: 'month', x: 0.88, y: 0.42 },
  { label: '2025年', type: 'year', x: 0.92, y: 0.45 },
  { label: '2月', type: 'month', x: 0.98, y: 0.4 }
];

const baseRoadPoints = [
  { x: 0.01, y: 0.60 },
  { x: 0.35, y: 0.35 },
  { x: 0.65, y: 0.80 },
  { x: 0.99, y: 0.55 }
];

const timeData = ref([]);
const roadPoints = ref([]);

const updateCoordinates = () => {
  timeData.value = baseTimeData.map(item => ({
    ...item,
    x: item.x * canvasWidth.value,
    y: item.y * canvasHeight.value
  }));

  roadPoints.value = baseRoadPoints.map(point => ({
    x: point.x * canvasWidth.value,
    y: point.y * canvasHeight.value
  }));
};

const controlPoints = ref([]);

const calculateControlPoints = () => {
  const points = roadPoints.value;
  const controls = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const tension = 0.5;
    const dx = p2.x - p0.x;
    const dy = p2.y - p0.y;
    const dx2 = p3.x - p1.x;
    const dy2 = p3.y - p1.y;

    const control1 = {
      x: p1.x + tension * dx / 2,
      y: p1.y + tension * dy / 2
    };

    const control2 = {
      x: p2.x - tension * dx2 / 2,
      y: p2.y - tension * dy2 / 2
    };

    controls.push({ control1, control2 });
  }

  controlPoints.value = controls;
};

const drawBackground = () => {
  if (!ctx || !canvas.value) return;

  const gridSpacingX = Math.max(20, canvasWidth.value / 30);
  const gridSpacingY = Math.max(15, canvasHeight.value / 20);

  ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
  ctx.lineWidth = 0.5;

  for (let x = gridOffset.value; x < canvasWidth.value; x += gridSpacingX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight.value);
    ctx.stroke();
  }

  for (let y = 0; y < canvasHeight.value; y += gridSpacingY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth.value, y);
    ctx.stroke();
  }

  const pointCount = Math.floor((canvasWidth.value * canvasHeight.value) / 8000);
  for (let i = 0; i < pointCount; i++) {
    const x = Math.random() * canvasWidth.value;
    const y = Math.random() * canvasHeight.value;
    const size = Math.random() * 2 + 1;
    const alpha = Math.random() * 0.3 + 0.1;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
    ctx.fill();
  }
};

const drawSmoothRoadLine = (yOffset, isDashed, isCenter = false) => {
  const points = roadPoints.value;
  const controls = controlPoints.value;

  if (isCenter) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y + yOffset);
    for (let i = 0; i < controls.length; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const { control1, control2 } = controls[i];

      ctx.bezierCurveTo(
        control1.x, control1.y + yOffset,
        control2.x, control2.y + yOffset,
        p2.x, p2.y + yOffset
      );
    }
    ctx.stroke();
    if (isDashed) {
      ctx.setLineDash([]);
    }
  } else {
    const totalSegments = 100;
    const pathLength = canvasWidth.value * 0.98;

    for (let i = 0; i < totalSegments; i++) {
      const t1 = i / totalSegments;
      const t2 = (i + 1) / totalSegments;

      const point1 = getPointOnPath(t1);
      const point2 = getPointOnPath(t2);

      const progress = t1;
      let thickness;
      if (progress < 0.5) {
        thickness = 1 + (progress * 2) * 2;
      } else {
        thickness = 3 - ((progress - 0.5) * 2) * 2;
      }

      const gradient = ctx.createLinearGradient(point1.x, point1.y, point2.x, point2.y);
      const alpha1 = 0.6 + (Math.sin(progress * Math.PI) * 0.4);
      const alpha2 = 0.6 + (Math.sin(t2 * Math.PI) * 0.4);

      gradient.addColorStop(0, `rgba(95, 178, 236, ${alpha1})`);
      gradient.addColorStop(1, `rgba(95, 178, 236, ${alpha2})`);

      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y + yOffset);
      ctx.lineTo(point2.x, point2.y + yOffset);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
};

const drawRoad = () => {
  if (!ctx || !canvas.value) return;
  ctx.save();

  drawSmoothRoadLine(-16, false, false);

  drawSmoothRoadLine(16, false, false);

  ctx.strokeStyle = '#5FB2EC';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = dashOffset.value;

  drawSmoothRoadLine(0, true, true);

  ctx.restore();
};

const getPointOnPath = (t) => {
  t = Math.max(0, Math.min(1, t));

  const totalSegments = roadPoints.value.length - 1;
  const segmentLength = 1 / totalSegments;
  const segmentIndex = Math.min(Math.floor(t / segmentLength), totalSegments - 1);
  const localT = (t - segmentIndex * segmentLength) / segmentLength;

  const points = roadPoints.value;
  const controls = controlPoints.value;

  if (segmentIndex >= controls.length) {
    return points[points.length - 1];
  }

  const p0 = points[segmentIndex];
  const p1 = points[segmentIndex + 1];
  const { control1, control2 } = controls[segmentIndex];

  const t2 = localT * localT;
  const t3 = t2 * localT;
  const u = 1 - localT;
  const u2 = u * u;
  const u3 = u2 * u;

  const x = u3 * p0.x + 3 * u2 * localT * control1.x + 3 * u * t2 * control2.x + t3 * p1.x;
  const y = u3 * p0.y + 3 * u2 * localT * control1.y + 3 * u * t2 * control2.y + t3 * p1.y;

  return { x, y };
};

const drawLight = () => {
  if (!ctx || !canvas.value) return;

  const position = getPointOnPath(lightPosition.value);

  const baseSize = Math.max(6, canvasWidth.value / 150);
  const tailLength = 25;

  for (let i = 0; i < tailLength; i++) {
    const tailT = lightPosition.value - (i * 0.005);
    if (tailT < 0) break;

    const tailPos = getPointOnPath(tailT);
    const alpha = 1 - (i / tailLength);
    const size = baseSize * 0.8 - (i * 0.2);

    ctx.beginPath();
    ctx.arc(tailPos.x, tailPos.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.6})`;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(tailPos.x, tailPos.y, size * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.12})`;
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(position.x, position.y, baseSize, 0, Math.PI * 2);
  const gradient = ctx.createRadialGradient(
    position.x, position.y, 0,
    position.x, position.y, baseSize
  );
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.3, '#00ffff');
  gradient.addColorStop(0.7, '#0088cc');
  gradient.addColorStop(1, 'rgba(0, 136, 204, 0.3)');
  ctx.fillStyle = gradient;
  ctx.fill();

  const glowRadius = baseSize * 2.5;
  ctx.beginPath();
  ctx.arc(position.x, position.y, glowRadius, 0, Math.PI * 2);
  const glowGradient = ctx.createRadialGradient(
    position.x, position.y, baseSize,
    position.x, position.y, glowRadius
  );
  glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
  glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
  ctx.fillStyle = glowGradient;
  ctx.fill();
};

const drawTimeLabels = () => {
  if (!ctx || !canvas.value) return;

  const currentPosition = getPointOnPath(lightPosition.value);

  const baseFontSize = Math.max(10, canvasWidth.value / 100);
  const yearFontSize = baseFontSize * 1.3;
  const monthFontSize = baseFontSize * 1.1;

  timeData.value.forEach((timeItem) => {
    const distance = Math.sqrt(
      Math.pow(currentPosition.x - timeItem.x, 2) +
      Math.pow(currentPosition.y - timeItem.y, 2)
    );

    const isNear = distance < (canvasWidth.value * 0.06);
    const isYear = timeItem.type === 'year';

    ctx.font = isYear ? `bold ${yearFontSize}px "Courier New"` : `${monthFontSize}px "Courier New"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isNear) {
      ctx.fillStyle = isYear ? '#ff6b6b' : '#ffff00';
      ctx.shadowColor = isYear ? '#ff6b6b' : '#ffff00';
      ctx.shadowBlur = 15;
    } else {
      ctx.fillStyle = '#5FB2EC';
      ctx.shadowBlur = 0;
    }

    // 调整文字位置，确保不超出画布边界
    const textOffsetY = canvasHeight.value * (isYear ? 0.10 : 0.08);
    let yPos;

    if (timeItem.y < canvasHeight.value * 0.5) {
      // 如果路径在上半部分，文字放在上方，但确保不超出顶部
      yPos = Math.max(textOffsetY, timeItem.y - textOffsetY);
    } else {
      // 如果路径在下半部分，文字放在下方，但确保不超出底部
      yPos = Math.min(canvasHeight.value - textOffsetY, timeItem.y + textOffsetY);
    }

    ctx.fillText(timeItem.label, timeItem.x, yPos);
    ctx.shadowBlur = 0;

    ctx.beginPath();
    const lineStartY = timeItem.y < canvasHeight.value * 0.5
      ? yPos + (isYear ? yearFontSize * 0.4 : monthFontSize * 0.4)
      : yPos - (isYear ? yearFontSize * 0.4 : monthFontSize * 0.4);
    const lineEndY = timeItem.y + (timeItem.y < canvasHeight.value * 0.5 ? -canvasHeight.value * 0.08 : canvasHeight.value * 0.08);

    ctx.moveTo(timeItem.x, lineStartY);
    ctx.lineTo(timeItem.x, lineEndY);
    ctx.strokeStyle = isNear ? (isYear ? '#ff6b6b' : '#ffff00') : '#5FB2EC';
    ctx.lineWidth = isYear ? 2 : 1.5;
    ctx.setLineDash(isYear ? [] : [4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    const nodeRadius = isYear ? Math.max(3, canvasWidth.value / 240) : Math.max(2, canvasWidth.value / 360);
    ctx.beginPath();
    ctx.arc(timeItem.x, lineEndY, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = isNear ? (isYear ? '#ff6b6b' : '#ffff00') : '#5FB2EC';
    ctx.fill();

    if (isNear) {
      ctx.beginPath();
      ctx.arc(timeItem.x, lineEndY, nodeRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = isYear ? 'rgba(255, 107, 107, 0.2)' : 'rgba(255, 255, 0, 0.2)';
      ctx.fill();
    }
  });
};

const animate = () => {
  if (!isAnimating.value || !ctx || !canvas.value) return;

  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  currentTime.value += 0.0035;
  lightPosition.value = currentTime.value % 1;
  if (lightPosition.value >= 1) {
    lightPosition.value = 1;
    currentTime.value = 0;
  }

  dashOffset.value -= 1.8;
  if (dashOffset.value < -18) dashOffset.value = 0;

  gridOffset.value -= 0.6;
  if (gridOffset.value < -40) gridOffset.value = 0;

  drawBackground();
  drawRoad();
  drawTimeLabels();
  drawLight();

  animationId = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (!isAnimating.value) {
    isAnimating.value = true;
    animate();
  } else {
    isAnimating.value = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  }
};

const handleResize = () => {
  if (!canvas.value) return;

  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }

  resizeTimeout = setTimeout(() => {
    nextTick(() => {
      if (initCanvas()) {
        updateCoordinates();
        calculateControlPoints();

        if (ctx && canvas.value) {
          ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
          drawBackground();
          drawRoad();
          drawTimeLabels();
          drawLight();
        }
      }
    });
  }, 100);
};

onMounted(() => {
  nextTick(() => {
    if (initCanvas()) {
      updateCoordinates();
      calculateControlPoints();
      isInitialized.value = true;

      window.addEventListener('resize', handleResize);

      if (window.ResizeObserver && canvas.value) {
        resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            handleResize();
          }
        });
        resizeObserver.observe(canvas.value.parentElement);
      }

      setTimeout(handleResize, 100);
    } else {
      console.error('Canvas initialization failed');
    }
  });
});

onUnmounted(() => {
  // pauseAnimation();
  window.removeEventListener('resize', handleResize);

  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }

  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
    resizeTimeout = null;
  }

  if (ctx) {
    ctx = null;
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

watch(isAnimating, (newVal) => {
  // console.log('Animation state:', newVal ? 'Running' : 'Paused');
});

defineExpose({
  showEve,
  hideEve
})

</script>

<style lang="scss" scoped>
.time-Line {
  width: 3572px;
  height: 402px;
  border-radius: 6px 6px 6px 6px;
  position: fixed;
  left: 1873px;
  backdrop-filter: blur(10px);
  background: url('assets/image/lefty/timeLine-bg.png') no-repeat 100% / 100%;
  padding: 50px 102px 21px 20px;
  z-index: 99154889999;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  border: 1px dashed #ccc;

  .chat-close {
    width: 42px;
    height: 42px;
    background: url('assets/image/lefty/close-btn.png') no-repeat 100%/100%;
    position: absolute;
    right: 30px;
    top: 48px;
    pointer-events: auto;
  }

  .top-btn {
    width: 402px;
    height: 99px;
    background: url('assets/image/lefty/ttbg.png') no-repeat 100%/100%;
    position: absolute;
    top: -98px;
    left: 0;
    font-family: AlibabaPuHuiTiRegular;
    font-size: 43px;
    line-height: 69px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    color: #DAE6FA;
  }

  .play-btn {
    width: 167px;
    height: 135px;
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: all;
    flex-shrink: 0;
    /* 防止按钮缩小 */

    &:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }

    &:active {
      transform: scale(0.95);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .imgg {
    position: relative;
    flex: 1;
    height: 100%;
    margin-left: 10px;
    min-width: 0;
    /* 确保 flex 子元素可以缩小 */
  }
}

.tech-timeline {
  border-radius: 12px;
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  max-width: 100%;
  object-fit: fill;
  image-rendering: auto;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
}

.controls {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 10;
  padding: 12px 20px;
  background: rgba(10, 22, 40, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

button {
  padding: 10px 20px;
  font-size: 14px;
  font-family: 'Courier New', monospace;
  background: rgba(0, 255, 255, 0.15);
  color: #00ffff;
  border: 1px solid #00ffff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

button:hover {
  background: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.title {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  color: #00ffff;
  font-size: 26px;
  text-shadow: 0 0 12px rgba(0, 255, 255, 0.8);
  letter-spacing: 2px;
  z-index: 10;
}

.status {
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translateX(-50%);
  color: #00ff88;
  font-size: 14px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  padding: 4px 12px;
  border-radius: 12px;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00ffff;
  font-size: 18px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 10px;
    bottom: 15px;
  }

  canvas {
    height: 350px;
  }
}
</style>
