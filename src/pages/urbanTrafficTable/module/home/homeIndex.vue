<template>
  <div>
    <carInfo v-if="activeTab == '2-3'" />
    <Practitioner v-if="activeTab == '2-4'" />
    <busInfo v-if="activeTab == '2-5'" />
  </div>
</template>

<script setup>
import carInfo from '../carInfo/index.vue'
import Practitioner from '../practitioner/index.vue'
import busInfo from '../busInfo/index.vue'
import { useMenuStore } from "../../store/index";
import { toRefs } from 'vue';

const storeMenu = useMenuStore();
const { activeTab } = toRefs(storeMenu)
</script>

<style lang="scss" scoped></style>
