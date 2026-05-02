<template>
     <q-dialog v-model="isVisible" seamless auto-close>
          <div class="cloud-box" @click.stop>
               <q-btn class="close-btn" round icon="img:icons/close.png" @click="handleClose()"></q-btn>
               <!-- 标题 -->
               <div class="cloud-title">
                    {{ dialogTitle }}
               </div>
               <div class="cloud-content">
                    <slot name="content"></slot>
               </div>
          </div>
     </q-dialog>
</template>

<script setup lang="ts">
const isVisible = defineModel<boolean | null>('visible', { default: false })
defineProps<{
     dialogTitle: string
}>()

const handleClose = () => {
     isVisible.value = false
}

</script>

<style scoped lang="scss">
.q-dialog__inner--minimized>div {
     max-width: 1350px !important;
     min-height: 1798px !important;
}

.q-dialog__inner>div {
     overflow: visible !important;
}

.cloud-box {
     width: 1350px !important;
     height: 1798px !important;
     background: url('assets/component/cloude_dialog_img/box.png') no-repeat 100%/100%;
     pointer-events: auto;
     z-index: 9999;
     position: fixed;
     left: 1576px;
     top: 317px;
     padding: 16px 28px;
     box-sizing: border-box;
}

.close-btn {
     width: 65px;
     height: 65px;
     position: absolute;
     right: 0px;
     top: -25px;
     font-size: 48px;
}

.cloud-title {
     width: 1109px;
     height: 124.81px;
     background: url('assets/component/cloude_dialog_img/Group 1.png') no-repeat 100%/100%;
     font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
     font-weight: 400;
     font-size: 60px;
     color: #FFFFFF;
     line-height: 78px;
     letter-spacing: 12px;
     text-shadow: 0px 11px 8px rgba(0, 0, 0, 0.3);
     text-align: left;
     font-style: normal;
     text-transform: none;
     position: absolute;
     top: -110px;
     left: -80px;
     padding-left: 200px;
}

.cloud-content {
     width: 100%;
     height: 100%;
     padding: 28px;
     box-sizing: border-box;
}
</style>