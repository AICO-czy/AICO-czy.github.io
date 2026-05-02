<!-- 弹窗标题部分 -->
<template>
  <div class="dialog-title">、
    <div class="top-box">
      <div class="dialog-name">
        {{ props.title }}
      </div>
      <div class="close-btn" @click.stop="handleClick"></div>
    </div>
    <div class="bottom-line">
      <div class="light-line"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '弹窗标题'
  }
})

const $emit = defineEmits(['close'])

function handleClick($ev){
  $emit('close')
}

</script>

<style lang="scss" scoped>
.dialog-title {
  position: relative;
  // height: 500px;
  margin: 0 28px;
  margin-bottom: 30px;
  margin-top: 20px;

  .top-box {
    display: flex;
    width: 100%;

    .dialog-name {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 44px;
      color: #E5F9FF;
      line-height: 39px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      flex: 1;
    }

    .close-btn {
      background: url('assets/image/TransportationAndTravel/dialogClose.png') no-repeat center/cover;
      width: 48px;
      height: 44px;
    }
  }


  .bottom-line {
    position: absolute;
    bottom: -25px;
    left: 0;
    border-bottom: 1px solid #fff;
    width: 100%;
    height: 2px;
    .light-line{
      width: 83px;
      height: 4px;
      border-top: 4px solid #06F7FF;
    }
  }
}
</style>
