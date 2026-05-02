<!--视频监控-分屏页面-->
<template>
  <q-dialog v-model="state.dialog" seamless position="right" :maximized="state.maximizedToggle"
    transition-show="slide-left" transition-hide="slide-right" class="video-splitScreen-dialog">
    <div class="video-splitScreen-body" id="fullscreen-elem">
      <div class="video-splitScreen-title">
        <div class="splitScreen-container">
          <div class="col-auto">
            <div class="title-label">监控分屏</div>
          </div>
          <div class="col">
            <div class="row text-center">
              <div class="col title-bg" v-for="(btn, index) in state.btnGroup" :key="index">
                <q-img :src="btn.code === state.selected ? btn.selectImg : btn.img" style="width: 114px; height: 90px"
                  @click="seletcBtn(btn.code)"></q-img>
                <!-- <q-btn flat class="splitScreen-btn" :class="{ 'splitScreen-btn-active': btn.code === state.selected }"
                  :label="btn.label" @click="seletcBtn(btn.code)" /> -->
                <!-- <div class="splitScreen-btn-active-border" v-if="btn.code === state.selected"></div> -->
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="row">
              <div class="col">
                <div class="page-btn prev">上一页</div>
              </div>
              <div class="col">
                <div class="page-btn">下一页</div>
              </div>
            </div>
          </div>
          <div class="col">
          </div>
          <div class="col-auto">
            <q-img :src="state.isFullscreen ? img17 : img18" style="width: 40px; height: 40px; margin-right: 34px"
              @click="fullscreen" />
            <q-img :src="img19" style="width: 40px; height: 40px; margin-right: 34px" @click="closeDialog" />
            <!-- <q-icon name="close" size="50" class="close-btn" @click="closeDialog" /> -->
          </div>
        </div>
      </div>
      <div class="video-splitScreen-content">
        <div class="container" :class='`screen-${state.selected}`'>
          <div class="video-item" v-for="video in state.videoList" :key="video.id">
            <div class="video-item-content">
              <div class="video-img-content">
                <!-- <img class="video-img" :src="video.img"/> -->
                <q-img class="video-img" :src="video.img" fit="cover"></q-img>
              </div>
              <div class="row items-center video-name-content">
                <div class="col video-name">{{ video.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="SplitScreen">
import { reactive, onUnmounted, onMounted } from "vue";
import img1 from 'src/assets/image/cdsgl/videoSurveillance/1＊1.png'
import img2 from 'src/assets/image/cdsgl/videoSurveillance/1＊1_select.png'
import img3 from 'src/assets/image/cdsgl/videoSurveillance/1+2.png'
import img4 from 'src/assets/image/cdsgl/videoSurveillance/1+2_select.png'
import img5 from 'src/assets/image/cdsgl/videoSurveillance/2＊2.png'
import img6 from 'src/assets/image/cdsgl/videoSurveillance/2＊2_select.png'
import img7 from 'src/assets/image/cdsgl/videoSurveillance/4＊2.png'
import img8 from 'src/assets/image/cdsgl/videoSurveillance/4＊2_select.png'
import img9 from 'src/assets/image/cdsgl/videoSurveillance/3+4.png'
import img10 from 'src/assets/image/cdsgl/videoSurveillance/3+4_select.png'
import img11 from 'src/assets/image/cdsgl/videoSurveillance/1+5.png'
import img12 from 'src/assets/image/cdsgl/videoSurveillance/1+5_select.png'
import img13 from 'src/assets/image/cdsgl/videoSurveillance/3＊3.png'
import img14 from 'src/assets/image/cdsgl/videoSurveillance/3＊3_select.png'
import img15 from 'src/assets/image/cdsgl/videoSurveillance/4＊5.png'
import img16 from 'src/assets/image/cdsgl/videoSurveillance/4＊5_select.png'

import img17 from 'src/assets/image/cdsgl/videoSurveillance/exitFullscreen.png'
import img18 from 'src/assets/image/cdsgl/videoSurveillance/fullscreen.png'
import img19 from 'src/assets/image/cdsgl/videoSurveillance/close.png'
const state = reactive({
  dialog: true,
  maximizedToggle: true,
  selected: 1,
  isFullscreen: false,
  btnGroup: [
    { code: 1, label: "1 分屏", img: img1, selectImg: img2 },
    { code: 3, label: "1+2 分屏", img: img3, selectImg: img4 },
    { code: 4, label: "2*2 分屏", img: img5, selectImg: img6 },
    { code: 8, label: "4*2 分屏", img: img7, selectImg: img8 },
    { code: 7, label: "3+4 分屏", img: img9, selectImg: img10 },
    { code: 6, label: "1+5 分屏", img: img11, selectImg: img12 },
    { code: 9, label: "3*3 分屏", img: img13, selectImg: img14 },
    { code: 20, label: "4*5 分屏", img: img15, selectImg: img16 },
  ],
  videoData: [],
  videoList: [] as any,
});

const emit = defineEmits(["close"]);

/** */
const loadData = () => {
  state.videoList = [];
  for (var i = 0; i < state.selected; i++) {
    var random = randomNum(1, 6);
    var imgUrl = `images/cdsgl/videoSurveillance/监控视频${random}.png`;
    var video = {
      id: i,
      name: `路段监控${i}`,
      img: imgUrl,
    };
    state.videoList.push(video);
  }
};

/**选中分屏 */
const seletcBtn = (code: any) => {
  if (state.selected !== code) {
    state.selected = code;
    loadData();
  }
};

// 生成一个随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**关闭弹窗 */
const closeDialog = () => {
  emit("close");
};

const fullscreen = () => {
  let full = document.fullscreenElement;
  if (full) {
    state.isFullscreen = false;
    document.exitFullscreen();
  } else {
    state.isFullscreen = true;
    document.getElementById("fullscreen-elem")?.requestFullscreen();
  }
}
onMounted(() => {
  loadData();
});
</script>
<style scoped lang="scss">
.video-splitScreen-body {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100% !important;
  max-height: 100% !important;
  // background: rgba(7, 71, 119, 0.85);
}

.video-splitScreen-title {
  position: absolute;
  width: 100%;
  height: 134px !important;
  // background-image: url("assets/image/cdsgl/videoSurveillance/分屏弹窗背景.png");
  // background-size: 100% 100%;
  // border-bottom: 4px solid #4792E3;
  background: linear-gradient(180deg, rgba(116, 152, 185, 0) 0%, rgba(136, 158, 178, 0) 0%, rgb(13, 57, 98) 40%, rgba(58, 103, 145, 0.3) 100%);
  border-radius: 0px 0px 0px 0px;

  .splitScreen-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.video-splitScreen-content {
  width: 100%;
  height: 100%;
  padding: 162px 29px 29px 29px;
  /* background: #29354e; */
  box-shadow: 60px 60px 100px 0px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 0px 0px;
  background: linear-gradient(180deg, rgba(57, 122, 153, 0.1836) 0%, rgba(15, 46, 57, 0.0702) 100%);
  box-shadow: inset 0px 0px 39px 0px rgba(97, 189, 255, 0.2);

  .container {
    display: grid;
    /* 6 列 */
    grid-template-rows: auto;
    /* 行高自动 */
    gap: 46px;
    /* 网格间距 */
    padding: 46px;
    /* 内边距 */
    box-sizing: border-box;
    /* 确保内边距包含在宽度和高度中 */
    height: 100%;
    width: 100%;
  }

  // .container {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   flex-wrap: wrap;
  //   gap: 46px;
  //   padding: 46px;
  // }
}

.video-item {
  box-sizing: border-box;
}

.video-item-content {
  width: 100%;
  height: 100%;
}

/* 4分屏 */
.screen-4 {
  grid-template-columns: repeat(2, 1fr);
}

/* 8分屏 */
.screen-8 {
  grid-template-columns: repeat(4, 1fr);
}

/* 9分屏 */
.screen-9 {
  grid-template-columns: repeat(3, 1fr);
}


/* 20分屏 */
.screen-20 {
  grid-template-columns: repeat(5, 1fr);
}

/* 1 + 2分屏 */
.screen-3 {
  grid-template-columns: repeat(2, 1fr);

  .video-item:first-child {
    /* 大视频占 2 列 */
    grid-column: span 1;
    /* 大视频占 2 行 */
    grid-row: span 2;
  }

  .video-item:nth-child(n+2) {
    grid-column: span 1;
    grid-row: span 1;
  }
}


/* 1 大 5 小布局 */
.screen-6 {
  grid-template-columns: repeat(3, 1fr);

  /* 6 列 */
  .video-item:nth-child(1) {
    /* 大视频占 2 列 */
    grid-column: span 2;
    /* 大视频占 2 行 */
    grid-row: span 2;
  }

  .video-item:nth-child(n+2) {
    grid-column: span 1;
    grid-row: span 1;
  }
}

/* 3 大 4 小布局 */
.screen-7 {
  grid-template-columns: repeat(4, 1fr);

  .video-item:nth-child(1),
  .video-item:nth-child(2),
  .video-item:nth-child(3) {
    /* 大视频占 2 列 */
    grid-column: span 2;
    /* 大视频占 2 行 */
    grid-row: span 2;
  }

  .video-item:nth-child(n+4) {
    grid-column: span 1;
    grid-row: span 1;
  }
}

.title-bg {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-label {
  padding-left: 72px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 52px;
  line-height: 61px;
  text-shadow: 0px 0px 27px rgba(45, 205, 255, 0.3);
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #89D6FF 0%, #FFFFFF 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;

}

.splitScreen-btn {


  font-family: Alimama ShuHeiTi, Alimama ShuHeiTi;
  font-weight: bold;
  font-size: 40px;
  color: #ffffff;
  line-height: 38px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.splitScreen-btn-active {
  color: #01C2FF;
}

.splitScreen-btn-active-border {
  width: 164px;
  height: 8px;
  background-image: url("assets/image/cdsgl/videoSurveillance/title_select_line.png");
  background-size: 100% 100%;
}

.close-btn {
  color: #ffffff;
  margin-right: 30px;
  font-size: 48px;
}

.page-btn {
  width: 180px;
  height: 60px;
  background: #085483;
  box-shadow: 25px 25px 75px 0px rgba(11, 58, 149, 0.66);
  border-radius: 8px 8px 8px 8px;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Source Han Sans CN, Source Han Sans CN;
  font-weight: 500;
  color: #BFDEFC;
  font-size: 35px;
  line-height: 41px;
  letter-spacing: 5px;
  text-align: left;
  font-style: normal;
  text-transform: none;

  &.prev {
    background: #1B3759;
  }
}



.video-img-content {
  width: 100%;
  height: calc(100% - 10%);
  padding: 25px;
  background-image: url("assets/image/cdsgl/videoSurveillance/video_cell_bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  /* 隐藏溢出的部分 */
  position: relative;

  /* 使得绝对定位的子元素相对于该容器定位 */
  .video-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.video-name-content {
  width: 100%;
  height: 10%;
  // background: linear-gradient(180deg, #0A5D92 0%, rgba(10, 93, 146, 0) 100%);
  // box-shadow: inset 0px 0px 35px 0px rgba(51, 121, 254, 0.1);
  // border-radius: 0px 0px 0px 0px;
  // border: 2px solid rgba(192, 215, 252, 0.2);
  background-image: url("assets/image/cdsgl/videoSurveillance/组 43091.png");
  background-size: 100% 100%;
  border-radius: 0px 0px 10px 10px;

  .video-name {
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: bold;
    font-size: 32px;
    color: #FFFFFF;
    line-height: 38px;
    letter-spacing: 2px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
<style>
.video-splitScreen-dialog {
  z-index: 7002 !important;
}

.video-splitScreen-dialog>.q-dialog__inner.flex {
  width: 4584px;
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
  top: 350px;
  right: 66px;
  bottom: 118px;
}
</style>
