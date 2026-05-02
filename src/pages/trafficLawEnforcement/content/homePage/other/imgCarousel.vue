<!-- 图片轮播 -->
<template>
  <div class="basic-management-dialog">
    <div class="content-title">{{ title }}</div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box column">
      <q-carousel v-model="slide" transition-prev="scale" infinite transition-next="scale" animated
        control-color="white" :autoplay="autoplay" @mouseenter="autoplay = false" @mouseleave="autoplay = true"
        navigation padding arrows class="scale-img fit rounded-borders">
        <q-carousel-slide v-for="item in slideItems" :key="item.name" :name="item.name"
          class="column no-wrap flex-center">
          <img :src="item.img" alt="" class="content-img">
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs, reactive } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
const props = defineProps({
  title: {
    type: String,
    default: ""
  }
})
const autoplay = ref(true);
const slide = ref('style')

const slideItems = ref([
  {
    name: 'style',
    img: 'images/cdsgl/trafficLawEnforcement/video1.png',
    content: '基础管理制度规范化'
  },
  {
    name: 'tv',
    img: 'images/cdsgl/trafficLawEnforcement/video2.png',
    content: '行政处罚裁量权基准'
  },
  {
    name: 'layers',
    img: 'images/cdsgl/trafficLawEnforcement/video3.png',
    content: '行政处罚裁量权基准'
  }
])
// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

</script>

<style scoped lang="scss">
.basic-management-dialog {
  width: 1619px;
  height: 1109px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 906px;
  padding: 135px 80px 60px 80px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 80px;
  top: 60px;
}

.content-title {
  width: 500px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 10px;
}

.content-box {
  width: 100%;
  height: 100%;

  // padding: 36px 35px 45px;
}

.scale-img {
  padding: 10px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
}

:deep(.q-carousel__navigation-inner) {
  // margin-top: 10px;
}

:deep(.q-btn__content .q-icon) {
  width: 45px !important;
  height: 45px !important;
  font-size: 45px !important;
}

.content-img {
  width: 100%;
  height: 95%;
}
</style>
