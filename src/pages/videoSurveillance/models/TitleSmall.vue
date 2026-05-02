<!--小标题-->
<template>
  <div class="title-small">
    <div class="row items-center">
      <div class="col-auto">
        <div class="title-value-content">
          <div class="title-value">{{ props.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="titleSmall">
const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});
</script>
<style scoped>
.title-small {
  width: 100%;
}

.title-value-content {
  position: relative;
}

.title-value {
  font-family: 'SourceHanSansBold';
  font-weight: 700;
  font-size: 45px;
  color: #D9EAF5;
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.71) 0%, rgba(250, 255, 255, 0.71) 47%, rgba(100, 206, 255, 0.91) 93%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
