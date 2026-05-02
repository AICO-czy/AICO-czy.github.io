<template>
  <div class="server-legends">
    <div class="btnlist">
      <div class="item-columns" v-for="(item, index) in btnList">
        <div v-for="it in item">
          <legends-btn :btntype="it.btntype" v-model="it.check" :icon="it.icon" :imgType="it.imgType">
            <template #icon>
              <q-img v-if="it.icon.includes('组')" :src="`icons/切图-地理信息全要素一张图_slices/${it.icon}.png`"
                spinner-color="white" class="info-icon"></q-img>
              <div v-else :style="{ background: it.icon, width: '59px', height: '8px', marginTop: '6px' }"></div>
            </template>
            {{ it.title }}
          </legends-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LegendsBtn from './components/LegendsBtn.vue'

const btnList = ref([[
  { icon: 'Vector', title: '公路路网', check: true, btntype: 'circle' },
  { icon: 'Vector(1)', title: '公路资产', check: true, btntype: 'circle' },
  { icon: 'Vector(2)', title: '交通场站', check: false, btntype: 'circle' },
  { icon: 'Vector(3)', title: '视频监控', check: false, btntype: 'circle' },
],
[
  { icon: '组 43077', imgType: 'img', title: '高速公路', check: true, btntype: 'square' },
  { icon: '#FE0000', imgType: 'color', title: '国  道', check: false, btntype: 'square' },
  { icon: '#37A700', imgType: 'color', title: '省  道', check: false, btntype: 'square' },
  { icon: '#1574FF', imgType: 'color', title: '县  道', check: false, btntype: 'square' },
  { icon: '#AAA500', imgType: 'color', title: '乡  道', check: false, btntype: 'square' },
  { icon: '#C9CCCD', imgType: 'color', title: '村  道', check: false, btntype: 'square' },
],
[
  { icon: '组 43043', title: '桥  梁', check: false, btntype: 'square' },
  { icon: '组 43046', title: '隧  道', check: false, btntype: 'square' },
  { icon: '组 43064', title: '收费站', check: false, btntype: 'square' },
  { icon: '组 43063', title: '治超站', check: false, btntype: 'square' },
  { icon: '组 43062', title: '交调站', check: false, btntype: 'square' },
  { icon: '组 43061', title: '养护工区', check: false, btntype: 'square' },
  { icon: '组 43060', title: '服务区', check: false, btntype: 'square' },
  { icon: '组 43059', title: '停车区', check: false, btntype: 'square' },
],
])

</script>

<style lang="scss" scoped>
.server-legends {
  position: fixed;
  top: 450px;
  left: 62px;
  z-index: 7000 !important;
}

.btnlist {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 0 40px;
}

.info-icon {
  width: 59px;
  height: 20px;
  // display: inline-block;
  // margin-right: 40px;
}
</style>
