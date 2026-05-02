<template>
  <div style="scale: 1;" class="from-box">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="线路">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="线路1" value="shanghai" />
          <el-option label="线路2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="交调站">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="交调站1" value="shanghai" />
          <el-option label="交调站2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="方向">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="断面" value="shanghai" />
          <el-option label="上行" value="beijing" />
          <el-option label="下行" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间维度">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="小时" value="shanghai" />
          <el-option label="日" value="beijing" />
          <el-option label="月" value="beijing" />
          <el-option label="年" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围">
        <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="对比分析">
        <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
          <el-option label="同比" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <btn-com class="mr-[20px]">查询</btn-com>
        <btn-com>导出</btn-com>
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
