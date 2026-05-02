<template>
  <div class="form_bg">
    <div class="btn">
      <div class="save-btn" @click="handleSave">保存</div>
      <div class="cancl-btn" @click="handleCanl">取消</div>
    </div>
    <div class="form-box">
      <!-- 表单内容 -->
      <el-form :model="formData" label-width="400px" label-suffix="：">
        <el-form-item label="业务分类">
          <el-select v-model="formData.value1" placeholder="————" style="width: 990px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <!-- <el-input v-model="formData.value1" placeholder="请输入内容"></el-input> -->
        </el-form-item>
        <el-form-item label="业务分类">
          <el-input v-model="formData.value1" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="指标定义">
          <el-input v-model="formData.value1" type="textarea" rows="3" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="计算方法">
          <el-input v-model="formData.value1" type="textarea" rows="3" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="指标单位">
          <el-input v-model="formData.value1" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="formData" label-width="400px" label-suffix="：">
        <el-form-item label="时间维度">
          <el-input v-model="formData.value1" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="空间维度">
          <el-input v-model="formData.value1" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="日期特征">
          <el-input v-model="formData.value1" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="时间特征">
          <el-input v-model="formData.value1" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="数据来源">
          <el-input v-model="formData.value1" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const $emit = defineEmits(['save', 'cancl']);

const options = [
  { value: 'option1', label: '工程建设' },
  { value: 'option2', label: '公路运营' },
  { value: 'option3', label: '城市交通' },
  { value: 'option4', label: '道(水)路运输' },
  { value: 'option5', label: '交通执法' },
  { value: 'option6', label: '安全生产' },
  { value: 'option7', label: '投诉处理' },
  { value: 'option8', label: '交旅融合' },
]

const formData = ref({
  value1: ''
})
function handleSave() {
  console.log('保存');
}

function handleCanl() {
  console.log('取消');
  $emit('cancl');
}
</script>

<style lang="scss" scoped>
.form_bg {
  position: relative;

  .btn {
    position: absolute;
    display: flex;
    right: 0;
    top: -109px;

    &>div {
      width: 307px;
      height: 109px;
      margin: 0 50px;
      background: pink;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #FFFFFF;
      line-height: 100px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .save-btn {
      background: url('assets/image/digitalIntelligence/czmxtc/upload_btn_bg1.png') no-repeat;
    }

    .cancl-btn {
      background: url('assets/image/digitalIntelligence/czmxtc/uoload_btn_bg2.png') no-repeat;
    }
  }

  .form-box {
    display: flex;
    justify-content: center;

    &>.el-form {
      flex: 1;
      margin: 86px;
      --el-form-label-font-size: 56px;
      --font-size: 56px;
      --el-text-color-regular: #A9CEE8;

      :deep(.el-form-item) {
        margin-bottom: 27px;
      }

      :deep(.el-form-item__label) {
        line-height: 125px;
        height: 125px;

      }
    }

    .el-select {
      :deep(.el-select__wrapper) {
        font-size: 54px;
        line-height: 125px;
        min-height: 125px;
        background-color: transparent;
        box-shadow:
          inset 0 0px 20px 20px rgba(0, 123, 255, 0.4),
          /* 内阴影 */
          0 0px 0px 8px rgba(0, 123, 255, 0.3);
        /* 外阴影 */
      }
    }

    .el-textarea {
      --el-input-bg-color: transparent;

      :deep(.el-textarea__inner) {
        font-size: 54px;
        padding: 10px;
        box-shadow:
          inset 0 0px 20px 20px rgba(0, 123, 255, 0.4),
          /* 内阴影 */
          0 0px 0px 8px rgba(0, 123, 255, 0.3);
        /* 外阴影 */
        border: 2px solid #007bff;
      }
    }


    .el-input {
      --el-input-height: 125px;
      --el-input-bg-color: transparent;
      width: 990px;

      :deep(.el-input__wrapper) {
        box-shadow:
          inset 0 0px 20px 20px rgba(0, 123, 255, 0.4),
          /* 内阴影 */
          0 0px 0px 8px rgba(0, 123, 255, 0.3);
        /* 外阴影 */
        border: 2px solid #007bff;
      }

      :deep(.el-input__inner) {
        font-size: 54px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-popper {
  --el-font-size-base: 54px;
  z-index: 9999 !important;
  --el-bg-color-overlay: #0e1f32;

  .el-select-dropdown__item {
    line-height: 125px !important;
    height: 125px !important;
    color: #fff;

  }

  .el-select-dropdown__item.is-selected {
    color: #fff
  }

  .el-select-dropdown__item.is-hovering {
    background: #1b4368;
  }
}
</style>
