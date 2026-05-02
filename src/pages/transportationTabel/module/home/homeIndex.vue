<template>
  <div>
    <!-- <Practitioner v-if="activeTab == '2-4'" /> -->
  </div>
</template>

<script setup>
// import Practitioner from '../practitioner/index.vue'
import { useMenuStore } from "../../store/index";
import { toRefs } from 'vue';

const storeMenu = useMenuStore();
const { activeTab } = toRefs(storeMenu)
</script>

<style lang="scss" scoped></style>
