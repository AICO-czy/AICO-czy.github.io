<template>
  <div class="item">
    <div class="title-box">
      <div class="icon" :style="computedIconStyle"></div>
      <div>{{ title }}</div>
      <div class="title" :style="computedTitleStyle"></div>
      <div class="more-btn" @click.stop="handleClick"></div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed ,ref} from 'vue';

const props = defineProps({
  titleSrc: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  iconSrc: {
    type: String,
    default: ''
  }
})

const $emit = defineEmits(['moreFn'])

const computedTitleStyle = computed(() => {
  if (props.titleSrc) {
    // let icon = import(props.titleSrc)
    // let beasUrl = import.meta.url.split(import.meta.hot.ownerPath)[0] + '/src/'
    // const bgImg = new URL(props.titleSrc, import.meta.url).href;
    return {
      'backgroundImage': `url(${props.titleSrc})`
    }
  } else {
    return {}
  }
})

const computedIconStyle = computed(() => {
  if (props.iconSrc) {
    // let icon = import(props.iconSrc)
    // let beasUrl = import.meta.url.split(import.meta.hot.ownerPath)[0] + '/src/'
    // const bgImg = new URL(props.iconSrc, import.meta.url).href;
    return {
      'backgroundImage': `url(${props.iconSrc})`
    }
  } else {
    return {}
  }

})

function handleClick() {
  $emit('moreFn')
}

</script>

<style lang="scss" scoped>
.item {
  margin: 0 auto;
  width: 1436px;
  height: 370px;
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图 255.png') no-repeat center/cover;
  display: flex;
  flex-direction: column;

  // background: pink;
  .title-box {
    position: relative;
    display: flex;
    align-items: center;
    height: 126px;

    .icon {
      // background-image: url(var(--selfIcon));
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 154px;
      height: 126px;
    }

    .title {
      // background-image: url(var(--selfTitle));
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 369px;
      height: 58px;
    }

    .more-btn {
      width: 60px;
      height: 60px;
      position: absolute;
      top: 0;
      right: 0;
      background: url('assets/component/公路运营系统-承德市公路网_slices/切图 256.png') no-repeat center/cover;
      pointer-events: all;
      cursor: pointer;
    }
  }
  .body{
    flex:1
  }
}
</style>
