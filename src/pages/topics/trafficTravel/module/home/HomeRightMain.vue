<template>
  <div class="home-right-main">
    <div class="column right-list">
      <q-input rounded v-model="videoText" placeholder="请输入搜索内容" dense class="input-box">
        <template v-slot:append>
          <q-icon name="search" class="search-icon" />
        </template>
      </q-input>
      <div class="video-list col column no-wrap">
        <q-scroll-area class="fit" :thumb-style="state.thumbStyle" :bar-style="state.barStyle">
          <div class="col video-item row items-center justify-center" v-for="item in state.videoList"
            @click="handleClick">
            <div class="video-img">
              <img :src="item.img" class="fit" alt="">
              <img :src="png1" class="img-play" alt="">
            </div>
            <div class="video-text row justify-center items-center">
              <span>{{ item.title }}</span>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
    <video-dialog />
  </div>
</template>

<script setup lang="ts" name="">
import { reactive, defineAsyncComponent, ref } from "vue";
import { otherInfo } from "src/stores/otherInfo";
import VideoDialog from '../../components/videoDialog.vue'
import { useVideoStore } from '../../store/video'
import img1 from 'src/assets/image/trafficTravel/播放按钮.png'

import png1 from "src/assets/image/trafficTravel/播放按钮.png";
import png2 from "src/assets/image/trafficTravel/videoImg1.png";
import png3 from "src/assets/image/trafficTravel/videoImg2.png";
import png4 from "src/assets/image/trafficTravel/videoImg3.png";

const videoRef = ref<HTMLVideoElement | null>(null)
const videoStore = useVideoStore()

const storeOtherInfo = otherInfo();
const emit = defineEmits(["close-page"]);

const videoText = ref('')

const state = reactive({
  videoList: [
    {
      img: png2,
      title: '国家一号风景大道'
    },
    {
      img: png3,
      title: '红色旅游路'
    },
    {
      img: png4,
      title: '美丽燕塞路'
    },
    {
      img: png2,
      title: 'xx宣传视频'
    },
    {
      img: png3,
      title: 'xx宣传视频'
    },
    {
      img: png4,
      title: 'xx宣传视频'
    },
    {
      img: png2,
      title: 'xx宣传视频'
    },
    {
      img: png3,
      title: 'xx宣传视频'
    },
    {
      img: png4,
      title: 'xx宣传视频'
    },
  ],
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#00FAD4",
    width: "4px",
    opacity: 0.75,
  } as any,
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#00FAD4",
    width: "8px",
    opacity: 0.2,
  } as any,
});
const handleClose = () => {
  emit("close-page", "homeRightClose");
  storeOtherInfo.setSelectArea("home");
};

function handleClick(data: any) {
  videoStore.isVisible = true
}


</script>

<style lang="scss" scoped>
.home-right-main {
  width: 967.1px;
  height: 1873.4px;
  background-image: url("assets/image/trafficTravel/boxBg.png");
  background-size: 100% 100%;
  padding: 80px 52px 106px;
}

.close-btn {
  width: 65px;
  height: 65px;
  right: 0px;
  top: -25px;
  font-size: 48px;
  position: absolute;
}

.right-list {
  width: 100%;
  height: 100%;

  .search-box {
    width: 862.6px;
    height: 76px;
    background: skyblue;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .home-right-main-box {
    flex: 1;
    overflow: scroll;
  }

  .item-video {
    width: 851.2px;
    height: 473.1px;
    background-color: pink;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}

.input-box {
  width: 100%;
  height: 76px;
  background: rgba(0, 104, 94, 0.6);
  border-radius: 15px 15px 15px 15px;
}

.input-box :deep(.q-field__control) {
  width: 100%;
  height: 100%;
}

.input-box :deep(.q-field__native) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.input-box :deep(.q-field__native::placeholder) {
  font-family: SourceHanSansRegular;
  font-weight: 500;
  font-size: 30px;
  color: #B1F3FD;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}


.input-box:deep(.q-field__marginal) {
  height: 70px;
}

.search-icon {
  padding-right: 20px;
  font-size: 30px;
  color: #B1F3FD;
}

.video-list {
  width: 100%;
  padding-top: 30px;
  overflow: hidden;
}

.video-item {
  width: 100%;
  margin-top: 70px;
  height: 473px;
  border-radius: 0px 0px 0px 0px;
  background-image: url("assets/image/trafficTravel/视频边框.png");
  background-size: 100% 100%;
  position: relative;
}

.video-item:nth-of-type(1) {
  margin-top: 0;
}

.video-img {
  width: 98%;
  height: 98%;
  position: relative;
}

.video-text {
  width: 100%;
  height: 57px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 0px 0px;
  position: absolute;
  bottom: 0;
  left: 0;
}

.video-text span {
  font-family: SourceHanSansRegular;
  font-weight: 400;
  font-size: 34px;
  color: #FFFFFF;
  font-style: normal;
  text-transform: none;
  margin-bottom: 5px;
}

.img-play {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.home-right-main-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
