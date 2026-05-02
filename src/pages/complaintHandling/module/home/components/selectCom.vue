<template>
  <div class="select-box">
    <div class="select-header" @click="toggleDropdown">
      <span>{{ modelValue }}</span>
      <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8L8 12L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </div>
    <div v-if="isDropdownOpen" class="dropdown-menu">
      <div v-for="(item, index) in options" :key="index" class="dropdown-item" @click="selectItem(item)">
        {{ dataOption? item[dataOption.label] : item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mode } from 'd3';
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '2025年12月'
  },
  options: {
    type: Array<any>,
    default: [
      '2025年1月', '2025年2月', '2025年3月', '2025年4月',
      '2025年5月', '2025年6月', '2025年7月', '2025年8月',
      '2025年9月', '2025年10月', '2025年11月', '2025年12月'
    ]
  },
  //数据映射
  dataOption: {
    type: Object,
    default: null
  },
})

const isDropdownOpen = ref(false); // 控制下拉菜单是否展开

// 切换下拉菜单
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const $emit = defineEmits(['select', 'update:modelValue']);

// 选择某一项
const selectItem = (value: string) => {
  isDropdownOpen.value = false;
  $emit('select', value);
  $emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
.select-box {
  pointer-events: all;
  position: relative;
  width: 322px;
  height: 80px;
  border: 1px solid #4BACF1;
  border-radius: 10px;
  background-color: #0d2b5e;
  color: white;
  font-size: 36px;
  cursor: pointer;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 26px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  pointer-events: all;
  box-shadow: inset 0px 4px 20px 0px rgba(69, 139, 214, 0.7);
}

.select-header svg {
  transition: transform 0.2s ease;
}

// .select-box .select-header:hover svg {
//   transform: rotate(180deg);
// }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #0d2b5e;
  border: 1px solid #3a70c0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: white;
}

.dropdown-item:hover {
  background-color: #1a4a8f;
}
</style>
