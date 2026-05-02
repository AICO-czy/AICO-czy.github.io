<template>
  <div class="chat-conversation">
    <close-com class="right-[-8%] top-[20%]" @click="activeTypeStore.setActiveBtn(2)" v-if="showCon" />
    <!-- <zsk-com class="right-[-8%] top-[60%]" /> -->
    <div v-show="showCon">
      <head-com v-model:activeItem="activeItem" :titleList="titleList" />
      <div class="czmx-con">
        <main-com @btnEv="handleBtnEv" />
      </div>
    </div>
    <div v-show="!showCon" class="new-page">
      <up-load-com v-if="flag == 'table'" @cancl="showCon = !showCon" />
      <form-com v-else @cancl="showCon = !showCon" />
    </div>
  </div>
</template>

<script setup>
import ZskCom from '../../components/zskCom.vue'
import CloseCom from '../../components/closeCom.vue'
import { useActiveTypeStore } from '../../store/activeType'
import { ref, watch } from 'vue';
import HeadCom from './components/headCom.vue'
import MainCom from './components/mainCom.vue'
import UpLoadCom from './components/upLoadCom.vue'
import FormCom from './components/formCom.vue'

const props = defineProps({
  active: {
    type: Number,
    required: true
  }
})

const showCon = ref(true);

const activeTypeStore = useActiveTypeStore();

const activeItem = ref(1);

watch(() => props.active, (val) => {
  activeItem.value = val - 3
}, { immediate: true })

const titleList = [
  { id: 1, title: '工程建设', description: '13', path: 4 },
  { id: 2, title: '公路运营', description: '46', path: 5 },
  { id: 3, title: '城市交通', description: '25', path: 6 },
  { id: 4, title: '道(水)路运输', description: '18', path: 7 },
  { id: 5, title: '交通执法', description: '23', path: 8 },
  { id: 6, title: '安全生产', description: '10', path: 9 },
  { id: 7, title: '投诉处理', description: '21', path: 10 },
  { id: 8, title: '交旅融合', description: '37', path: 11 }
]

const flag = ref('table')

function handleBtnEv(item) {
  // showCon.value = false;
  // flag.value = item;
  switch (item) {
    case 'table':
      console.log('表格导入');
      showCon.value = false;
      flag.value = item;
      break;
    case 'peplo':
      console.log('人工填写');
      showCon.value = false;
      flag.value = item;
      break;
    case 'edit':
      console.log('编辑');
      showCon.value = false;
      flag.value = item;
      break;
    default:
      break;
  }
}

</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 4859px !important;
  overflow: none !important;
  max-height: 855px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.chat-conversation {
  width: 100%;
  height: 100%;
  // background: pink;
  padding-top: 60px;
  position: relative;

  .czmx-con {
    position: absolute;
    top: 10%;
  }

  .new-page {
    width: 4989px;
    height: 1180px;
    margin-top: 40px;
    background: url('assets/image/digitalIntelligence/czmxtc/upload_bg.png');
  }
}
</style>
