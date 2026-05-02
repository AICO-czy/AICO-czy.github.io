<template>
  <div class="data-center-home-index">
    <HomeIndexContent v-if="activeBtn == 1" />
    <RemittanceDepartment v-if="activeBtn == 2" />
    <HuiEnterprise v-if="activeBtn == 3" />
    <RemitLinkDiagram v-if="activeBtn == 4" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, reactive, ref, watch, nextTick, toRefs } from "vue";
import HomeIndexContent from './components/homeIndexContent.vue'
import RemittanceDepartment from '../remit/remittanceDepartment.vue'
import HuiEnterprise from '../remit/huiEnterprise.vue'
import RemitLinkDiagram from '../remit/remitLinkDiagram.vue'

import { useActiveTypeStore } from "../../store/activeType";

const activeTypeStore = useActiveTypeStore();
const { activeBtn } = toRefs(activeTypeStore);

onMounted(() => {
});
</script>

<style lang="scss" scoped>
.data-center-home-index {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 99;
  pointer-events: all;
}
</style>
