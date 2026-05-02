<template>
  <q-dialog v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="title">重要提醒</div>
      <div class="des">是否确认<span>删除</span>？</div>
      <div class="btn">
        <div class="btn-item" @click="handleBtn('confirm')">
          <div class="btn-text">确认删除</div>
        </div>
        <div class="btn-item close" @click="handleBtn('cancel')">
          <div class="btn-text">取消</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isDialogVisible = ref(false);

const openDialog = () => {
  isDialogVisible.value = true;
}

const $emit = defineEmits(['delConfirmed']);
function handleBtn(type: string) {
  console.log(type);
  switch (type) {
    case 'confirm':
      // handle confirm
      $emit('delConfirmed');
      isDialogVisible.value = false;
      break;
    case 'cancel':
      // handle cancel
      isDialogVisible.value = false;
      break;
    default:
      break;
  }
}

defineExpose({
  openDialog
});
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1181px !important;
  overflow: none !important;
  min-height: 626px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1181px;
  height: 626px;
  background: url("src/assets/image/digitalIntelligence/czmxtc/del_bg.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  box-sizing: border-box;
  display: flex;
  padding-top: 33px;
  flex-direction: column;
  align-items: center;

  .title {
    width: 974px;
    height: 143px;
    background: url('assets/image/digitalIntelligence/czmxtc/del_title_bg.png');
    text-align: center;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 70px;
    color: #FFFFFF;
    line-height: 143px;
    letter-spacing: 2px;
    font-style: normal;
    text-transform: none;
  }

  .des {
    margin: auto 0;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 68px;
    color: #FFFFFF;
    line-height: 87px;
    letter-spacing: 2px;
    text-align: left;
    font-style: normal;
    text-transform: none;

    &>span {
      color: #D65454;
    }
  }

  .btn {
    display: flex;
    height: 109px;
    margin-bottom: 74px;

    .btn-item {
      width: 335px;
      height: 109px;
      background: url('assets/image/digitalIntelligence/czmxtc/btn_bg_ok.png') no-repeat;
      pointer-events: all;
      margin: 0 20px;

      .btn-text {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 58px;
        color: #FFFFFF;
        line-height: 100px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }

    .close {
      width: 307px;
      height: 109px;
      background: url('assets/image/digitalIntelligence/czmxtc/btn_bg_un.png') no-repeat;
    }
  }
}
</style>
