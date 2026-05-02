<template>
  <q-dialog :model-value="state" seamless position="left" transition-show="slide-right"
    transition-hide="slide-left" class="left-page-dialog-sector" :style="{top:top,left:left}">
    <div class="container-left-page no-shadow" :style="{width:width,height:height,left:show?'0px':'-85%'}">
      <slot></slot>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  state: {
    type: Boolean,
    default: true
  },
  left:{
    type:String,
    default:'2%'
  },
  top:{
    type:String,
    default:'580px'
  },
  width:{
    type:String,
    default:'1607px'
  },
  height:{
    type:String,
    default:'1458px'
  },
  show:{
    type:Boolean,
    default:true
  }
})

</script>

<style>
.q-dialog__inner.flex {
  padding: 0 !important;
}

.left-page-dialog-sector>.q-dialog__inner.flex {
  max-width: 1607px !important;
  max-height: 1458px !important;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.left-page-dialog-sector .container-left-page {
  position: relative;
  transition: all .3s ease;
}

.q-dialog__inner--minimized>div {
  max-width: 1607px !important;
  overflow: none !important;
  /* // min-height: 1614px !important; */
}

.q-dialog__inner>div {
  overflow: visible !important;
}
</style>
