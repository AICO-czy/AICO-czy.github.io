<template>
  <div class="check" @click="handleClick()">
    <div v-if="modelValue" class="check_active"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const $emit = defineEmits(['update:modelValue'])

function handleClick() {
  $emit('update:modelValue', !props.modelValue)
}

</script>

<style lang="scss" scoped>
.check_active {
  width: 24px;
  height: 24px;
  background: url('assets/image/TransportationAndTravel/check_ok.png') no-repeat;
  background-position: 50% 45%;
}

.check {
  width: 24px;
  height: 24px;
  background: url('assets/image/TransportationAndTravel/check_off.png') no-repeat center/cover;
  // scale: 5;
}
</style>
