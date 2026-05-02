<!-- 发布信息弹窗 -->
<template>
  <q-dialog v-model="alert" seamless>
    <div class="bg">
      <dialog-title title="道路预警信息" @close="handleClose" />
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
              :title="itme[it.value]">
              <template v-if="it.type">
                <div v-if="it.type == 'zt'" :style="classFn(it, itme)">
                  {{ itme[it.value] }}
                </div>
                <div v-if="it.type == 'lx'" :style="classFn(it, itme)">
                  {{ itme[it.value] }}
                </div>
                <div v-if="it.type == 'btn'">
                  <div class="send-btn" v-if="itme[it.value] != '已发布'" @click="handleSend(itme)"></div>
                  <div class="send-ok" v-else>已发布</div>
                </div>
              </template>
              <template v-else>{{ it.value ?
    itme[it.value] : index + 1 }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
  <send-msg-add ref="sendMsgAddRef" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import DialogTitle from './dialogTitle.vue'
import { content } from 'app/tailwind.config';
import SendMsgAdd from './SendMsgAdd.vue'

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

const sendMsgAddRef = ref()

function handleSend(data: any) {
  sendMsgAddRef.value.show(true, data)
}

//取消
function handleClose() {
  alert.value = false
  sendMsgAddRef.value.show(false)
}

const tableHeader = ref([
  { name: '时间', value: 'sendTime', width: "240px" },
  { name: '位置', value: 'wz', width: "200px" },
  { name: '类型', value: 'type', type: 'lx', width: "200px" },
  { name: '预警信息', value: 'content', width: "200px" },
  { name: '状态', value: 'status', type: 'zt', width: "100px" },
  { name: '智能建议', value: 'ai', width: "230px" },
  { name: '信息发布', value: 'send', type: 'btn', width: "100px" },
])

function classFn(row: any, data: any) {
  let data1 = {}
  switch (row.type) {
    case 'lx':
      if (data[row.value] == '道路拥堵') {

      } else if (data[row.value] == '交通事故') {

      } else if (data[row.value] == '道路险情') {

      } else if (data[row.value] == '养护管制') {

      }
      break;
    case 'zt':
      if (data[row.value] == '进行中') {
        data1 = { color: '#F9652B' }
      } else if (data[row.value] == '已结束') {
        data1 = { color: '#51C205' }
      }
      break;
    case 'btn':

      break;

    default:
      break;
  }
  return data1
}

const tableData = ref([
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '未发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '已结束',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
  },
  {
    sendTime: '2022-09-06 12:41:10',
    wz: 'xx高速kxx公里处发生xxxx',
    type: '道路拥堵',
    content: 'xx高速kxx公里处发生xx高速kxx公里处发生...',
    status: '进行中',
    ai: '因承德市某某高速 KXsdads',
    send: '已发布'
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

  .send-btn {
    background: url('assets/image/TransportationAndTravel/send_btn.png') no-repeat center/cover;
    width: 40px;
    height: 40px;
    margin: 0 auto;
    margin-top: 15px;
  }

  .send-ok {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 24px;
    color: #51C205;
    line-height: 72px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
