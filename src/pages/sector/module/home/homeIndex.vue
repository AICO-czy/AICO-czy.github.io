<template>
  <div class="home-index">
    <q-dialog v-model="state.leftdialog" seamless position="left" transition-show="slide-right"
      transition-hide="slide-left" class="left-page-dialog-sector">
      <div class="container-left-page no-shadow">
        <HomeLeft v-if="activeTab == 1" @jtqs="handleJtqs" @closeJtEve="handleCloseJtEve" @top-tip="handleTopTip"
          @card-change="handleCardChang" @review="handleReview" />
        <highwayOperation v-if="activeTab == 2" />
        <transportation v-if="activeTab == 3" />
        <urbanTraffic v-if="activeTab == 4" />
      </div>
    </q-dialog>
    <q-dialog v-model="state.rightdialog" seamless position="right" transition-show="slide-left"
      transition-hide="slide-right" class="right-page-dialog-sector">
      <div class="container-right-page no-shadow">
        <HomeRight ref="homeRightRef" :isRightDialogOpen="state.rightdialog" @hideRightDialog="hideRightDialog" />
      </div>
    </q-dialog>
  </div>

  <!-- 按钮组 - 独立于右侧对话框 -->
  <div class="right-container-buttons-group" v-show="!isReviewing" :style="{
    right: state.rightdialog ? '1273px' : '273px'
  }">
    <div v-for="(group, groupIndex) in buttonGroups" :key="groupIndex" class="right-container-buttons">
      <div v-for="(button, buttonIndex) in group" :key="`${groupIndex}-${buttonIndex}-${button}`"
        @click="handleButtonClick(groupIndex, buttonIndex)" class="right-container-buttons-item"
        :style="getButtonStyle(groupIndex, buttonIndex)"
        :class="{ 'button-selected': isButtonSelected(groupIndex, buttonIndex) }">
        <div class="button-text">{{ button }}</div>
        <div class="button-ripple"></div>
      </div>
    </div>
  </div>
  <div class="right-container-arrow" v-show="!isReviewing" :style="{
    backgroundImage: `url(${bg1})`,
    right: state.rightdialog ? '1095px' : '95px'
  }" @click.stop="hideRightDialog">
  </div>
  <!-- 事件线 -->
  <TimeLine ref="timeLineRef" @hideEve="handleHideEve" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import { useRoute } from 'vue-router';

// 导入背景图
import buttonBgDefault from 'src/assets/component/home_right_img/切图 54.png'
import buttonBgSelected from 'src/assets/component/home_right_img/切图 53.png'
import bg1 from 'src/assets/component/home_right_img/切图 24.png'
import { useBottomBtn } from '../../store/bottomBtn'
import transportation from './transportation/index.vue'
import urbanTraffic from './urbanTraffic/index.vue'

const route = useRoute()

const bottomBtn = useBottomBtn()

const { activeTab } = toRefs(bottomBtn)
if (route.params && route.params.id)
  activeTab.value = route.params.id as any

const HomeLeft = defineAsyncComponent(() => import("./HomeLeft.vue"));
const highwayOperation = defineAsyncComponent(() => import("./highwayOperation/highwayOperation.vue"));
const HomeRight = defineAsyncComponent(() => import("./HomeRight.vue"));
const TimeLine = defineAsyncComponent(() => import("./components/timeLine.vue"));

const storeOtherInfo = otherInfo();

// 获取 HomeRight 组件的引用
const homeRightRef = ref<InstanceType<typeof HomeRight> | null>(null);

// 事件线实例
const timeLineRef = ref<InstanceType<typeof TimeLine> | null>(null);

// 按钮相关状态
const isAnimating = ref(false)

// 按钮数组默认数据备份
const buttonGroupsBackup = ref([
  ['待    建', '在    建', '已    建'],
  ['待    建', '在    建', '已    建', '待    建', '在    建', '已    建'],
  ['高速公路', '普通干线公路', '公路运输枢纽']
]);

// 按钮组数据
const buttonGroups = ref([
  ['待    建', '在    建', '已    建'],
  ['待    建', '在    建', '已    建', '待    建', '在    建', '已    建'],
  ['高速公路', '普通干线公路', '公路运输枢纽']
]);
const buttonGroups1 = ref([
  ['桥梁', '隧道', '边坡'],
  ['可变情报板', '交调站', '交调站'],
  ['收费站', '服务区', '养护工区', '边    坡', '隧    道', '桥    梁'],
  ['村    道', '乡    道', '县    道', '省    道', '国    道', '高速公路'],
  ['交通事件', '无人机', '结构物健康监测', '机电设备', '附属设施', '基础路网'],
]);

const selectedButtons = ref<Array<{ group: number, index: number }>>([]);

const isButtonSelected = (groupIndex: number, buttonIndex: number) => {
  return selectedButtons.value.some(btn => btn.group === groupIndex && btn.index === buttonIndex);
};

// 动态获取按钮样式
const getButtonStyle = (groupIndex: number, buttonIndex: number) => {
  const isSelected = isButtonSelected(groupIndex, buttonIndex);
  return {
    backgroundImage: isSelected ? `url(${buttonBgSelected})` : `url(${buttonBgDefault})`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  };
};

const handleButtonClick = (groupIndex: number, buttonIndex: number) => {
  // console.log("Button clicked:", groupIndex, buttonIndex);
  const buttonKey = { group: groupIndex, index: buttonIndex };
  const existingIndex = selectedButtons.value.findIndex(btn => btn.group === groupIndex && btn.index === buttonIndex);

  if (existingIndex >= 0) {
    selectedButtons.value.splice(existingIndex, 1);
  } else {
    selectedButtons.value.push(buttonKey);
  }
  // console.log("Selected buttons:", selectedButtons.value);
};

const state = reactive({
  topdialog: false,
  leftdialog: true,
  rightdialog: true,
  moudleName: "",
});

const hideRightDialog = () => {
  // console.log("Hiding right dialog");
  state.rightdialog = !state.rightdialog;
};

/**
 * @description 交通强市按钮点击事件 改变 buttonGroups 数组内容
 * @param val 交通强市 1 民生工程 2
 */
const handleJtqs = (val: any) => {
  // console.log("jtqs", val);

  // 添加数据切换动画
  if (isAnimating.value) return;
  isAnimating.value = true;

  // 淡出动画 - 使用更可靠的方式
  const buttons = document.querySelectorAll('.right-container-buttons-item');
  buttons.forEach((btn, index) => {
    const element = btn as HTMLElement;
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateX(-30px) scale(0.8)';
  });

  // 等待淡出完成
  setTimeout(() => {
    if (val == 1) {
      buttonGroups.value = [
        [
          '高速公路',
          '国道',
          '省道',
          '县道',
          '乡道',
          '村道',
          '新续建高速',
          '新续建普通干线',
          '新建交通场所',
        ],
      ];
    } else if (val == 2) {
      // 民生工程数据
    }

    // 重置选中状态
    selectedButtons.value = [];

    // 等待DOM更新完成
    nextTick(() => {
      // 淡入动画 - 确保所有按钮都有动画
      const newButtons = document.querySelectorAll('.right-container-buttons-item');
      newButtons.forEach((btn, index) => {
        const element = btn as HTMLElement;
        // 先设置初始状态
        element.style.transition = 'none';
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px) scale(0.8)';

        // 强制重绘
        element.offsetHeight;

        // 然后开始动画
        setTimeout(() => {
          element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          element.style.opacity = '1';
          element.style.transform = 'translateX(0) scale(1)';
        }, index * 80); // 减少错开时间，让动画更流畅
      });

      // 等待最后一个按钮动画完成
      setTimeout(() => {
        isAnimating.value = false;
        // 清理内联样式，避免冲突
        newButtons.forEach((btn) => {
          const element = btn as HTMLElement;
          element.style.transition = '';
          element.style.opacity = '';
          element.style.transform = '';
        });
      }, (newButtons.length * 80) + 400);
    });
  }, 300);
}

/**
 * @description 关闭交通强市 需要恢复按钮组数据
 */
const handleCloseJtEve = () => {
  // 添加恢复数据动画
  if (isAnimating.value) return;
  isAnimating.value = true;

  // 淡出动画 - 使用更可靠的方式
  const buttons = document.querySelectorAll('.right-container-buttons-item');
  buttons.forEach((btn, index) => {
    const element = btn as HTMLElement;
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateX(30px) scale(0.8)';
  });

  // 等待淡出完成
  setTimeout(() => {
    buttonGroups.value = buttonGroupsBackup.value;

    // 重置选中状态
    selectedButtons.value = [];

    // 等待DOM更新完成
    nextTick(() => {
      // 淡入动画 - 确保所有按钮都有动画
      const newButtons = document.querySelectorAll('.right-container-buttons-item');
      newButtons.forEach((btn, index) => {
        const element = btn as HTMLElement;
        // 先设置初始状态
        element.style.transition = 'none';
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px) scale(0.8)';

        // 强制重绘
        element.offsetHeight;

        // 然后开始动画
        setTimeout(() => {
          element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          element.style.opacity = '1';
          element.style.transform = 'translateX(0) scale(1)';
        }, index * 80); // 减少错开时间，让动画更流畅
      });

      // 等待最后一个按钮动画完成
      setTimeout(() => {
        isAnimating.value = false;
        // 清理内联样式，避免冲突
        newButtons.forEach((btn) => {
          const element = btn as HTMLElement;
          element.style.transition = '';
          element.style.opacity = '';
          element.style.transform = '';
        });
      }, (newButtons.length * 80) + 400);
    });
  }, 300);
}

/**
 * @value type:['十四五','十五五']
 * @description 十四五/十五五 切换按钮组数据
*/
function handleTopTip(type: string) {
  // 调用 HomeRight 组件的方法
  if (homeRightRef.value) {
    homeRightRef.value.handleTopTip(type);
  }
}

/**
 * @description 卡片组点击
 * card => ['十四五','十五五'] ; type => [1,2]
*/
function handleCardChang(card: any, type: any) {
  // 调用 HomeRight 组件的方法
  if (homeRightRef.value) {
    homeRightRef.value.handleCardChang(card, type);
  }
}

watch(
  () => storeOtherInfo.selectArea,
  () => {
    state.moudleName = storeOtherInfo.selectArea;
    if (storeOtherInfo.selectArea == "home") {
      state.rightdialog = true;
    } else if (storeOtherInfo.selectArea == "oneRoad") {
      state.rightdialog = false;
    } else if (storeOtherInfo.selectArea == "ruralRoad") {
      state.rightdialog = false;
    } else if (storeOtherInfo.selectArea == "redRoad") {
      state.rightdialog = false;
    }
  },
  {
    deep: true,
  }
);

watch(
  () => route.params,
  (newParams, oldParams) => {
    activeTab.value = newParams.id as any
  },
  { deep: true });


// 是否在回顾
const isReviewing = ref(false)

/**
 * @description 回顾
 */
function handleReview() {
  timeLineRef.value?.showEve()
  isReviewing.value = true
}

/**
 * @description 隐藏事件线
 */
function handleHideEve() {
  // console.log("隐藏事件线");
  isReviewing.value = false
}

/**
 * @description 关闭事件线 外部调用
 */
function handleCloseEve() {
  timeLineRef.value?.hideEve()
  isReviewing.value = false
}

defineExpose({
  handleCloseEve
})

onMounted(() => {
  // 页面加载时，为所有按钮添加进入动画
  setTimeout(() => {
    const buttons = document.querySelectorAll('.right-container-buttons-item');
    buttons.forEach((btn, index) => {
      const element = btn as HTMLElement;
      element.style.transition = 'none';
      element.style.opacity = '0';
      element.style.transform = 'translateX(30px) scale(0.8)';

      // 强制重绘
      element.offsetHeight;

      // 错开动画时间
      setTimeout(() => {
        element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateX(0) scale(1)';

        // 动画完成后清理样式
        setTimeout(() => {
          element.style.transition = '';
          element.style.opacity = '';
          element.style.transform = '';
        }, 500);
      }, index * 100);
    });
  }, 200);
});
</script>

<style>
.q-dialog__inner.flex {
  padding: 0 !important;
}

.left-page-dialog-sector>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 6%;
  left: 2%;
  padding: 0;
}

.left-page-dialog-sector .container-left-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-page-dialog-sector>.q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  top: 257px;
  right: 95px;
  padding: 0;
}

.right-page-dialog-sector .container-right-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.right-container-buttons-group {
  display: flex;
  column-gap: 50px;
  align-items: flex-end;
  position: absolute;
  bottom: 168px;
  transition: all 0.3s ease;
  z-index: 5000;
  /* 降低 z-index，确保不覆盖弹窗 */
  animation: containerSlideIn 1s ease-out;
}

@keyframes containerSlideIn {
  from {
    opacity: 0;
    transform: translateX(50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.right-container-buttons {
  display: flex;
  flex-direction: column-reverse;
  row-gap: 16px;
  animation: groupSlideIn 0.8s ease-out;
}

@keyframes groupSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.right-container-buttons-item {
  width: 370px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  /* 移除默认动画，避免与动态动画冲突 */
  /* animation: buttonSlideIn 0.6s ease-out; */
}

.right-container-buttons-item:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 25px rgba(100, 180, 255, 0.4);
}

.right-container-buttons-item:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

.right-container-buttons-item.button-selected {
  animation: buttonPulse 0.6s ease-in-out;
}

@keyframes buttonSlideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes buttonPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.right-container-buttons-item .button-text {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 700;
  font-size: 36px;
  line-height: 82px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
  transition: all 0.3s ease;
}

.right-container-buttons-item:hover .button-text {
  background: linear-gradient(to bottom, #FFFFFF 0%, #B8E6FF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  transform: scale(1.05);
}

.right-container-buttons-item.button-selected .button-text {
  /* 移除选中时的文字样式变化，保持默认渐变 */
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  -webkit-background-clip: text;
  background-clip: text;
  /* 移除 text-shadow */
}

.right-container-arrow {
  pointer-events: all;
  position: absolute;
  width: 79px;
  height: 143px;
  background-size: 100% 100%;
  top: 50%;
  transition: all 0.3s ease;
  z-index: 5001;
}
</style>
