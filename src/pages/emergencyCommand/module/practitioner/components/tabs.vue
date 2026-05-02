<template>
  <div class="tabs-box">
    <div v-for="item in list" class="tabs-item" :class="item.value == modelValue ? 'active' : ''" @click="handleChange(item.value)">
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '1'
  }
})

const $emit = defineEmits(['updata:modelValue'])

function handleChange(id){
  $emit('update:modelValue',id)
}


const list = [
  { label: '巡游车', value: '1' },
  { label: '网约车', value: '2' },
  { label: '公交', value: '3' },
]
</script>

<style lang="scss" scoped>
.tabs-box {
  height: 97px;
  display: flex;

  .tabs-item {
    width: 445px;
    background: rgba(165, 203, 255, 0.1);
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 52px;
    color: #87ADD0;
    line-height: 97px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    // &:hover{
    //   background: rgba(165, 203, 255, 1);
    // }
  }

  .active {
    background: rgba(27, 123, 182, 0.5);
    color: #E3F1FF;
  }
}
</style>
