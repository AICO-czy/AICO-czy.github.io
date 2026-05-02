<template>
  <div class="upload-bg">
    <div class="upload-con">
      <div class="title">文件上传</div>
      <div class="upload-box">{{ '请选择文件' }}</div>
      <div class="upload-btn" @click="handleChangeFile">
        <div class="icon1"></div>
        <div>上传</div>
      </div>
      <div class="upload-btn" @click="handleDownload">
        <div class="icon2"></div>
        <div>样例表下载</div>
      </div>
    </div>
    <div class="btn">
      <div class="save-btn" @click="handelSave">保存</div>
      <div class="cancl-btn" @click="handleCanl">取消</div>
    </div>
  </div>
</template>

<script setup lang="ts">

const $emit = defineEmits(['save', 'cancl']);

function handleChangeFile() {
  console.log('选择文件');
}

function handleDownload() {
  console.log('下载样例表');
}

function handelSave() {
  console.log('保存');
}

function handleCanl() {
  console.log('取消');
  $emit('cancl');
}
</script>

<style lang="scss" scoped>
.upload-bg {
  width: 4989px;
  height: 1180px;
  // background: url('assets/image/digitalIntelligence/czmxtc/upload_bg.png');
  padding: 50px;
  display: flex;
  flex-direction: column;

  .upload-con {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    .title {
      font-family: Source Han Sans, Source Han Sans;
      font-weight: 500;
      font-size: 56px;
      color: #A9CEE8;
      line-height: 78px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-right: 65px;
    }

    .upload-box {
      width: 1080px;
      height: 125px;
      margin-right: 44px;
      background: url('assets/image/digitalIntelligence/czmxtc/upload_con_bg.png') no-repeat;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 54px;
      color: #A9CEE8;
      line-height: 120px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      padding-left: 56px;
    }

    .upload-btn {
      background: linear-gradient(180deg, #6BD5FF 0%, #17546C 100%);
      border-radius: 20px 20px 20px 20px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #FFFFFF;
      line-height: 81px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      padding: 10px 60px;
      display: flex;
      align-items: center;
      margin-left: 46px;

      .icon1 {
        margin-right: 20px;
        width: 79px;
        height: 79px;
        background: url('assets/image/digitalIntelligence/czmxtc/upload_icon1.png') no-repeat;
      }

      .icon2 {
        margin-right: 20px;
        width: 79px;
        height: 79px;
        background: url('assets/image/digitalIntelligence/czmxtc/upload_icon2.png') no-repeat;
      }
    }
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;

    &>div {
      width: 307px;
      height: 109px;
      margin: 0 50px;
      background: pink;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #FFFFFF;
      line-height: 100px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .save-btn {
      background: url('assets/image/digitalIntelligence/czmxtc/upload_btn_bg1.png') no-repeat;
    }

    .cancl-btn {
      background: url('assets/image/digitalIntelligence/czmxtc/uoload_btn_bg2.png') no-repeat;
    }
  }

}
</style>
