<template>
  <div style="scale: 1;" class="from-box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="公交线路">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="线路1" value="shanghai" />
          <el-option label="线路2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <btn-com class="mr-[20px]">查询</btn-com>
        <!-- <btn-com>导出</btn-com> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BtnCom from './btnCom.vue'

const formInline = ref({})

</script>

<style lang="scss" scoped>
.from-box {
  --el-font-size-base: 50px;
  --el-text-color-regular: #A9CEE8;
  --el-select-width: 200px !important;

  :deep(.el-form-item) {
    --el-select-font-size: 50px !important;
    margin-right: 108px;

    .el-form-item__label {
      line-height: 103px !important;
    }

    .el-select__input {
      height: 50px;
      font-size: 50px;
      line-height: 50px;
    }
  }

  :deep(.el-select) {
    width: 500px;
    --el-fill-color-blank: transparent;
    line-height: 103px !important;
    --el-select-input-font-size: 103px !important;
  }
}
</style>
