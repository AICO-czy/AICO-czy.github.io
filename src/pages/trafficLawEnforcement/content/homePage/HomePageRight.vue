<!--主页-右边-->
<template>
  <div class="home-page-right">
    <div class="home-page-right-content column">
      <TitleLarge title="深化“四基四化”建设" class="ml-[10px]" />
      <div class="home-page-right-video col">
        <q-carousel class="home-page-right-video-carousel" animated v-model="slide" infinite :autoplay="autoplay" arrows
          transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
          @mouseleave="autoplay = true">
          <q-carousel-slide :name="1">
            <div class="home-page-right-video-content column gap-[70px]">
              <div class="img-item" v-for="item in imgArr" :key="item.name" @click="handleClick(item.src, item.name)">
                <img :src="item.src" :alt="item.alt" class="fit">
                <div class="img-item-name">{{ item.name }}</div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2">
            <div class="home-page-right-video-content column gap-[70px]">
              <div class="img-item" v-for="item in imgArr1" :key="item.name" @click="handleClick(item.src, item.name)">
                <img :src="item.src" :alt="item.alt" class="fit">
                <div class="img-item-name">{{ item.name }}</div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3">
            <div class="home-page-right-video-content column gap-[70px]">
              <div class="img-item" v-for="item in imgArr2" :key="item.name" @click="handleClick(item.src, item.name)">
                <img :src="item.src" :alt="item.alt" class="fit">
                <div class="img-item-name">{{ item.name }}</div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <DialogCom ref="dialogCom" v-if="activeDialog === 'lookPicture'">
      <LookPicture ref="lookPicture" :title="title" :img="img" />
    </DialogCom>
  </div>
</template>
<script setup lang="ts" name="homePageRight">
import { defineAsyncComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useLawActiveDialogStore } from "../../store/activeDialog";
const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
//大标题
const TitleLarge = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/TitleLarge.vue")
);
//弹窗组件
const DialogCom = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/models/DialogCom.vue")
);
const LookPicture = defineAsyncComponent(
  () => import("pages/trafficLawEnforcement/content/homePage/other/lookPicture.vue")
);
const slide = ref(1);
const autoplay = ref(true);

const title = ref('');
const img = ref('');

const imgArr = ref([
  {
    src: 'images/cdsgl/trafficLawEnforcement/video1.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video2.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video3.png',
    alt: '',
    name: '基层执法站所标准化'
  },
])
const imgArr1 = ref([
  {
    src: 'images/cdsgl/trafficLawEnforcement/video3.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video2.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video1.png',
    alt: '',
    name: '基层执法站所标准化'
  },
])
const imgArr2 = ref([
  {
    src: 'images/cdsgl/trafficLawEnforcement/video2.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video1.png',
    alt: '',
    name: '基层执法站所标准化'
  },
  {
    src: 'images/cdsgl/trafficLawEnforcement/video3.png',
    alt: '',
    name: '基层执法站所标准化'
  },
])
const state = reactive({
});
//点击事件
function handleClick(src, name) {
  title.value = name
  img.value = src
  console.log(src, name, 89494)
  activeDialog.value = 'lookPicture'
}

onMounted(() => { });

</script>
<style scoped lang="scss">
.home-page-right {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 252px 130px 87px 0px;
}

.home-page-right-content {
  width: 100%;
  height: 100%;
}

.home-page-right-video {
  width: 100%;
  background-image: url('assets/image/trafficLawEnforcement/videobg.png');
  background-size: 100% 100%;
  padding: 87px 75px 90px;
}

.home-page-right-video-carousel {
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.home-page-right-video-content {
  width: 100%;
  height: 100%;
}

.img-item {
  width: 839px;
  height: 472px;
  border-radius: 0px 0px 0px 0px;
  position: relative;
}

.img-item-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 839px;
  height: 70px;
  background: rgba(38, 71, 106, 0.85);
  border-radius: 0px 0px 0px 0px;

  font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
  font-weight: 500;
  font-size: 36px;
  color: #FFFFFF;
  line-height: 70px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-carousel__slide) {
  padding: 0 !important;
}

:deep(.q-carousel__arrow) {
  display: none;
}
</style>
