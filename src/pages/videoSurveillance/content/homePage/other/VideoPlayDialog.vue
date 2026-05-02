<!--视频监控播放窗口-->
<template>
  <q-dialog v-model="state.dialog" seamless class="video-play-dialog">
    <div class="video-play-body">
      <div class="video-play-title">
        <div class="row items-center fit">
          <div class="col-auto">
            <div class="title-label">{{props.detailData.label}}</div>
          </div>
          <div class="col-auto">
            <q-icon name="close" size="50" class="close-btn" @click="closeDialog" />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="VideoPlayDialog">
import { reactive, onMounted } from "vue";

const state = reactive({
  dialog: true,
});

const props = defineProps({
  detailData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["closePage"]);

/**关闭弹窗 */
const closeDialog = () => {
  emit("closePage");
};
</script>
<style scoped>
.video-play-body {
  width: 100%;
  height: 100%;
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
<style>
.video-play-dialog > .q-dialog__inner.flex {
  width: 1284px;
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}
</style>
