<!--视频监控弹窗-->
<template>
  <div class="video-info">
    <div class="column fit">
      <div class="col-auto"><q-icon name="close" class="close-icon" @click="closeClick" /></div>
      <div class="col-auto">
        <div class="row">
          <div class="col">
            <div class="title">{{ state.title }}</div>
          </div>
          <div class="col-auto">
            <div class="subtitle">{{ state.subtitle }}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="video-body">
          <div class="video-content">
            <q-img :src="img1" class="fit" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <VideoPlayDialog ref="videoPlayDialogRef" v-if="state.showPlay" :detailData="props.data" @closePage="closeDialog">
  </VideoPlayDialog>
</template>
<script setup lang="ts" name="VideoInfo">
import { reactive, onMounted, defineAsyncComponent } from "vue";
import img1 from 'images/cdsgl/videoSurveillance/监控视频2.png'
//视频监控播放窗口
const VideoPlayDialog = defineAsyncComponent(
  () => import("../PointLegends.vue")
);
const state = reactive({
  title: "监控详情",
  subtitle: "XXX 路段监控",
  showPlay: false,
  btnGroup: [
    {
      label: "实时监控",
      code: "surveillance",
      icon: "ondemand_video",
      disable: false,
      visible: true,
    },
  ],
});

const props = defineProps({
  tooltipThat: {
    type: Object,
    default: {},
  },
  data: {
    type: Object,
    default: {},
  },
});

/**选中控制按钮 */
const selectBtn = (btn: any) => {
  if (btn.code === "surveillance") {
    state.showPlay = true;
  }
};

/**关闭信息弹框 */
const closeClick = () => {
  props.tooltipThat.bubbleClose();
};

//关闭播放弹窗
const closeDialog = () => {
  state.showPlay = false;
};

onMounted(() => {
  if (props.data) {
    if (props.data.omline) {
      state.btnGroup[0].visible = false;
      state.showPlay = true;
    } else {
      state.btnGroup[0].visible = true;
    }
  }
});
</script>
<style scoped lang="scss">
.video-info {
  width: 1013px;
  height: 593px;
  background-image: url("assets/image/cdsgl/videoSurveillance/video_map_dialog_bg.png");
  background-size: 100% 100%;
}

.close-icon {
  font-size: 46px;
  color: #9daecf;
  float: right;
}

.title {
  margin-left: 70px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 40px;
  color: #d9eaf5;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 19%, #faffff 47%, #64ceff 83%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin-right: 60px;
  font-family: Alibaba PuHuiTi 2, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 32px;
  color: #eff5ff;
  line-height: 47px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.video-body {
  width: 100%;
  height: 100%;
  padding: 15px 49px 25px 34px;
}

.video-content {
  width: 100%;
  height: 100%;
  clip-path: polygon(0% 0%, 100% 0%, 100% 400px, 0% 1250px, 0% 0, 0% 0%);
}
</style>
