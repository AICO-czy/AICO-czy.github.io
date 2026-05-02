<!-- 发布信息弹窗 -->
<template>
  <q-dialog v-model="alert" seamless>
    <div class="bg">
      <dialog-title title="信息服务发布" @close="handleClose" />
      <div class="add-box">
        <div class="lable">信息主题</div>
        <div><input v-model="formData.title"></input></div>
        <div class="lable">发布内容</div>
        <div class="flex">
          <div class="robort" :class="active == 'robort' ? 'active-robort' : ''" @click="handleChange('robort')"></div>
          <div class="hand" :class="active == 'hand' ? 'active-hand' : ''" @click="handleChange('hand')"></div>
        </div>
        <div class='textarea'><textarea v-model="formData.content"></textarea></div>

        <div class="flex btns">
          <div class="send-ok-btn" @click="handleSend"></div>
          <div class="send-calch" @click="handleClose">取消</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogTitle from './dialogTitle.vue'

const alert = ref(false)

const active = ref('robort')

const formData = ref({
  title: '',
  content: ''
})

function handleChange(type: any) {
  if (type == active.value) return
  active.value = type
}

function show(flag = null,data=null) {
  if (flag === null) {
    alert.value = !alert.value
  } else {
    alert.value = flag
  }
}

//发送
function handleSend(){

}

//取消
function handleClose(){
  alert.value = false
}


defineExpose({
  show
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 804px !important;
  overflow: none !important;
  min-height: 938px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.bg {
  width: 804px;
  height: 938px;
  background: url('assets/image/TransportationAndTravel/send_msg_add_bg.png') no-repeat center/cover;
  position: fixed;
  left: 49%;
  bottom: 4%;
  padding: 0 20px;
}

.add-box {
  padding: 50px 50px 0px;

  .lable {
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 400;
    font-size: 28px;
    color: #FFFFFF;
    line-height: 39px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 10px;
  }

  input {
    outline: none;
    border: 2px solid rgba(91, 243, 220, 0.3);
    width: 100%;
    height: 68px;
    background: rgba(17, 17, 17, 0.35);
    border-radius: 10px;
    margin-bottom: 24px;
    font-weight: 400;
    font-size: 28px;
    color: #9DF7C4;
    padding: 10px;
  }

  .textarea {
    &>textarea {
      height: 310px;
      outline: none;
      border: 2px solid rgba(91, 243, 220, 0.3);
      width: 100%;
      background: rgba(17, 17, 17, 0.35);
      border-radius: 10px;
      margin-bottom: 24px;
      font-weight: 400;
      font-size: 28px;
      color: #9DF7C4;
      padding: 10px;
    }
  }

  .btns {
    width: 100%;
    justify-content: space-around;

    .send-ok-btn {
      background: url("assets/image/TransportationAndTravel/send_ok_btn.png") no-repeat center/cover;
      height: 58px;
      width: 188.18px;
    }

    .send-calch {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 400;
      font-size: 28px;
      width: 188.18px;
      color: #82F9DB;
      line-height: 58px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }

  .robort {
    background: url('assets/image/TransportationAndTravel/robort_off.png') no-repeat center/cover;
    width: 55px;
    height: 52.48px;
    margin-bottom: 10px;
    margin-right: 17px;
  }

  .active-robort {
    background: url('assets/image/TransportationAndTravel/robort_on.png') no-repeat center/cover;
  }

  .hand {
    background: url('assets/image/TransportationAndTravel/hand_off.png') no-repeat center/cover;
    width: 55px;
    height: 52.48px;
    margin-bottom: 10px;
  }

  .active-hand {
    background: url('assets/image/TransportationAndTravel/hand_on.png') no-repeat center/cover;
  }
}
</style>
