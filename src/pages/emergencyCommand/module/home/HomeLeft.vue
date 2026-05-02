<template>
  <div class="home-left-page">
    <!-- 值班值守 -->
    <left-dialog top="135px" height="443px" :show="show1">
      <div class="box1">
        <left-com-slot>
          <template #title>
            <div class="title-text" @click="show1 = !show1">值班值守</div>
          </template>
          <left-com1 />
        </left-com-slot>
      </div>
    </left-dialog>
    <!-- 视频会商 -->
    <left-dialog top="580px" height="1458px" :show="show2">
      <div class="box2">
        <left-com-slot>
          <template #title>
            <div class="title-text" @click="show2 = !show2">视频会商</div>
          </template>
          <left-com2 />
        </left-com-slot>
      </div>
    </left-dialog>
  </div>
</template>

<script setup lang="ts" name="">
import { defineAsyncComponent, onMounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import LeftCom1 from '../leftPage/leftCom1.vue'
import LeftCom2 from '../leftPage/leftCom2.vue'
import LeftComSlot from './components/leftComSlot.vue'
import LeftDialog from './components/leftDialog.vue'
const props = defineProps({
  state: {
    type: Object,
    default: { leftdialog: true }
  },
})

const show1 = ref(false)
const show2 = ref(false)

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
  height: 1458px;
  padding: 40px 80px 60px 10px;
  background: url('/src/assets/image/emergencyCommand/切图 668.png');
}

.home-left-page {}
</style>
