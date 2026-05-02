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
  { icon: '组 在线', title: '在线监控', check: true, btntype: 'square' },
  { icon: '组 离线', title: '离线监控', check: false, btntype: 'square' },
]
])

</script>

<style lang="scss" scoped>
.server-legends {
  position: fixed;
  bottom: 123px;
  right: 1004px;
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
