<template>
  <q-dialog v-model="state.show" seamless position="bottom" class="push-new-info">
    <div class="push-new-info-content no-shadow">
      <div class="push-new-info-view"></div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="PushNewInfo">
import { reactive, onMounted } from "vue";
const state = reactive({
  show: true
})
</script>
<style scoped>
.push-new-info {
  background: url('assets/image/trafficTravel/弹框.png');
  background-size: 100% 100%;
}

.push-new-info>.q-dialog__inner.flex {
  max-width: 804px !important;
  max-height: 1080px !important;
  left: 1408px;
  bottom: 278px;
  padding: 0;
}

.push-new-info-content {
  width: 100% !important;
  max-width: 100% !important;
  height: 100%;
  max-height: 100% !important;
}

.push-new-info-view {
  width: 804px;
  height: 1080px;
  border-radius: 28px 28px 28px 28px;
  background: url('assets/image/trafficTravel/弹框.png');
  background-size: 100% 100%;
}
</style>
