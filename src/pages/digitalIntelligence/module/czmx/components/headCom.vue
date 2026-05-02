<template>
  <div class="head_com">
    <div class="left_arr" @click="handleClick(false)"></div>
    <div class="title_bg">
        <div class="text_con">{{ activeTitle }}</div>
      </div>
    <div class="right_arr" @click="handleClick(true)"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type TitleItem = {
  id: number;
  title: string;
};

const props = defineProps<{
  activeItem: number;
  titleList: TitleItem[];
}>();

const activeTitle = computed(() => {
  return props.titleList?.find((item) => item.id === props.activeItem)?.title ?? '';
});

const $emit = defineEmits(['update:activeItem','change']);

function handleClick(isRight: boolean) {
  console.log('触发事件');
  if (isRight) {
    if (props.activeItem < props.titleList.length - 1) {
      $emit('update:activeItem', props.activeItem + 1);
    }else{
      $emit('update:activeItem', 1);
    }
  } else {
    if (props.activeItem > 1) {
      $emit('update:activeItem', props.activeItem - 1);
    }else{
      $emit('update:activeItem', props.titleList.length);
    }
  }
  $emit('change');
}
</script>

<style lang="scss" scoped>
.head_com {
  // background: pink;
  position: relative;
  top: -80px;
  display: flex;
  align-items: center;
  justify-content: center;

  .left_arr,
  .right_arr {
    width: 108px;
    height: 77px;
    pointer-events: all;
  }

  .left_arr {
    background: url('src/assets/image/digitalIntelligence/czmxtc/left_arr.png') no-repeat;
  }

  .right_arr {
    background: url('src/assets/image/digitalIntelligence/czmxtc/right_arr.png') no-repeat;
  }

  .title_bg {
    width: 1006px;
    height: 111px;
    background: url('src/assets/image/digitalIntelligence/czmxtc/title_bg.png') no-repeat;
    margin: 0 80px;

    .text_con {
      text-align: center;
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 90px;
      line-height: 111px;
      letter-spacing: 6px;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
