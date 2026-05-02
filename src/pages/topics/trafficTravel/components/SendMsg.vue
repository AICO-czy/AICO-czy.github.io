<!-- 发布信息弹窗 -->
<template>
  <q-dialog v-model="alert" seamless>
    <div class="bg">
      <dialog-title title="发布信息服务查询" @close="alert = false" />
      <div class="search-box">
        <div>今日发布：<span>2条</span></div>
        <div>本月发布：<span>20条</span></div>
        <div><input placeholder="输入查询内容"></input></div>
      </div>
      <div class="table">
        <div class="th">
          <div class="td" v-for="itme in tableHeader" :style="itme.width ? `width:${itme.width}` : 'flex:1'">{{
    itme.name }}
          </div>
        </div>
        <div class="tbody">
          <div class="tr" v-for="(itme, index) in tableData" :class="index % 2 != 0 ? 'lighttd' : ''">
            <div class="td" v-for="it in tableHeader" :style="it.width ? `width:${it.width}` : 'flex:1'"
              :title="itme[it.value]">{{ it.value ?
    itme[it.value] : index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DialogTitle from './dialogTitle.vue'
import { content } from 'app/tailwind.config';

const alert = ref(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

watch(() => props.visible, (newVal) => {
  alert.value = newVal
})

const tableHeader = ref([
  { name: '序号', value: '', width: "100px" },
  { name: '主题', value: 'name', width: "200px" },
  { name: '发布内容', value: 'content', width: "400px" },
  { name: '发布方式', value: 'sendType', width: "180px" },
  { name: '发布时间', value: 'sendTime', width: "230px" },
])

const tableData = ref([
  {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  }, {
    name: '高速发生交通事故，该路段撒大大是大大',
    content: '因为承德啊大大承德交通公众号承德交通公众号承德交通公众号',
    sendType: '承德交通公众号',
    sendTime: '2022-09-06 12:41:10'
  },
])
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1674px !important;
  overflow: none !important;
  min-height: 938px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.search-box {
  position: absolute;
  display: flex;
  top: 4%;
  right: 5%;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 26px;
  color: #FFFFFF;
  line-height: 60px;
  text-align: left;
  font-style: normal;
  text-transform: none;

  &>div {
    margin-right: 80px;

    &>span {
      color: rgba(#04AA91, 0.7);
    }

    &>input {
      background: rgba($color: #00685E, $alpha: .6);
      border-radius: 12px;
      width: 352px;
      height: 60px;
    }
  }
}

.bg {
  width: 1674px;
  height: 938px;
  background: url('assets/image/TransportationAndTravel/send_msg_bg.png') no-repeat center/cover;
  position: fixed;
  left: 1576px;
  bottom: 4%;
  padding: 0 20px;
}

.table {
  padding: 20px 27px;
  padding-top: 20px;
  width: 100%;

  .tbody {
    height: 680px;
    overflow-y: scroll;
  }

  .th {
    height: 72px;
    background: rgba(1, 62, 60, 0.9);
    display: flex;
    justify-content: space-around;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 26px;
    color: #FFFFFF;
    line-height: 72px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    border-bottom: 1px dashed #208746;
    flex: 1
  }

  .tr {
    background: rgba(4, 65, 40, 0.3);
    height: 72px;
    display: flex;
    justify-content: space-around;
  }

  .td {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 400;
    font-size: 24px;
    color: #D3D3D3;
    text-align: center;
    font-style: normal;
    text-transform: none;
    line-height: 72px;
    //文本溢出隐藏
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    /* 隐藏溢出的内容 */
    text-overflow: ellipsis;
    /* 显示省略号 */
  }

  .lighttd {
    background: rgba(1, 62, 60, 0.9);
  }
}
</style>
