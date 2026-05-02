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

function openDialog() {
  isDialogVisible.value = true;
}

defineExpose({
  openDialog
})

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 100% !important;
  overflow: none !important;
  min-height: 100% !important;
}

.q-dialog__inner>div {
  width: 100% !important;
  height: 100% !important;
  overflow: visible !important;
}
</style>
