<template>
  <template v-for="item in menuList">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id">
      <template #title>
        <el-icon v-if="item.icon">
          <location />
        </el-icon>
        <div class="icon-box" v-else></div>
        <span>{{ item.title }}</span>
      </template>
      <menu-item :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.id">
      <el-icon v-if="item.icon">
        <location />
      </el-icon>
      <div class="icon-box" v-else></div>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup>
import { Location } from "@element-plus/icons-vue";
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss">
.is-active {
  position: relative;

  &::after {
    position: absolute;
    content: '';
    height: 120px;
    width: 796px;
    left: 0px;
    top: 0;
    z-index: -1;
    background: url('assets/component/statistics/切图 509.png') no-repeat 100% 100%;
    width: 100%;
  }

  &>.icon-box {
    background: url('assets/component/statistics/切图 511.png') no-repeat 100% 100%;
    width: 35px;
    height: 35px;
    margin-right: 31px;
  }
}

.is-opened {
  &::after {
    background: linear-gradient(180deg, #79BFFF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.icon-box {
  width: 59px;
}
</style>
