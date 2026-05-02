<template>
  <!-- 雨雪保障模式 左侧页面 -->
  <div class="home-left-page">
    <!-- 最新动态 -->
    <left-dialog top="135px" height="729px" :show="show3">
      <div class="box3">
        <left-com-slot>
          <template #title>
            <div class="title-text" @click="show3 = !show3">最新动态</div>
          </template>
          <left-com3 />
        </left-com-slot>
      </div>
    </left-dialog>
    <!-- 视频会商 -->
    <left-dialog top="860px" height="727px" :show="show2">
      <div class="box2">
        <left-com-slot>
          <template #title>
            <div class="title-text" @click="show2 = !show2">视频会商</div>
          </template>
          <left-com2c />
        </left-com-slot>
      </div>
    </left-dialog>
    <!-- 值班值守 -->
    <left-dialog top="1590px" height="443px" :show="show1">
      <div class="box1">
        <left-com-slot>
          <template #title>
            <div class="title-text" @click="show1 = !show1">值班值守</div>
          </template>
          <left-com1 />
        </left-com-slot>
      </div>
    </left-dialog>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import LeftCom1 from '../leftPage/leftCom1.vue'
import LeftComSlot from './components/leftComSlot.vue'
import LeftDialog from './components/leftDialog.vue'
import LeftCom2c from '../leftPage/leftCom2c.vue'
import LeftCom3 from '../leftPage/leftCom3.vue'
const props = defineProps({
  state: {
    type: Object,
    default: { leftdialog: true }
  },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)

</script>

<style lang="scss" scoped>
.box1{
  width: 1607px;
  height: 443px;
  padding: 35px 80px 30px 10px;
  background: url('/src/assets/image/emergencyCommand/切图 633.png');
}

.box2 {
  // width: 1607px;
  height: 727px;
  padding: 40px 80px 50px 10px;
  background: url('/src/assets/image/emergencyCommand/切图 631.png');
}

.box3 {
  // width: 1607px;
  height: 729px;
  padding: 40px 80px 40px 10px;
  background: url('/src/assets/image/emergencyCommand/切图 630.png');
}

.home-left-page {}
</style>
