<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <slot></slot>
    </div>
  </q-dialog>
</template>
<script setup name="dialogCom">
import { ref, onMounted, watch, computed, reactive } from "vue";

const isDialogVisible = ref(true);

const handleClose = () => {
  // isDialogVisible.value = false;
  $emit('closeDialog', props.pageFlag);
};

function openDialog() {
  isDialogVisible.value = true;
}

defineExpose({
  openDialog
})

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 5641px !important;
  overflow: none !important;
  min-height: 1890px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 5641px;
  height: 1890px;
  background: url("assets/image/digitalIntelligence/dialog/bg.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 50%;
  top: 230px;
  transform: translateX(-50%);
  padding: 280px 300px;
  box-sizing: border-box;
}

.content-close {
  width: 300px;
  height: 309px;
  background: url("assets/image/digitalIntelligence/dialog/closebg.png") no-repeat 100%/100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .close-icon {
    width: 93px;
    height: 93px;
    background: url("assets/image/digitalIntelligence/dialog/closeIcon.png") no-repeat 100%/100%;
  }

  .close-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 58px;
    line-height: 106px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
