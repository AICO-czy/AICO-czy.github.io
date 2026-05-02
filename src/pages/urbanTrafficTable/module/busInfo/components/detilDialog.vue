<template>
  <q-dialog v-model="isDialogVisible">
    <div class="dialog-content" v-if="type == '1'">
      <div class="content-title">
        <q-img :src="img1" class="w-[59px] h-[59px]" alt=""></q-img>
        <div class="ml-[20px]">公交线路</div>
      </div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="tip">
          <div class="tip-lab">线路名称：<span>11路</span></div>
          <div class="tip-lab">首末班时间：<span>6:30-18:00</span></div>
          <div class="tip-lab">站点数量：<span>13个</span></div>
          <div class="tip-lab">线路长度：<span>XXX</span></div>
        </div>
      </div>
    </div>
    <div class="dialog-content" v-else="type == '2'">
      <div class="content-title">
        <q-img :src="img2" class="w-[59px] h-[59px]" alt=""></q-img>
        <div class="ml-[20px]">站点详情</div>
      </div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="map-box"></div>
        <div class="right-box">
          <el-form :model="form" label-width="auto">
            <el-form-item label="站点编号：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="站点名称：">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="站点类型：">
              <el-select v-model="form.region" placeholder="">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="经过线路：">
              <div class="way-box">
                <div class="bus-item" v-for="item in busList">{{ item.label }} </div>
              </div>
            </el-form-item>
            <el-form-item label="经过线路：">
              <div class="outway">大花坛、体育中心</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import img1 from 'src/assets/component/urbanTrafficTable/切图 7372.png'
import img2 from 'src/assets/component/urbanTrafficTable/切图 7373.png'

const props = defineProps({
  type: {
    type: String,
  }
})

const form = ref({})

const isDialogVisible = ref(false);

const formData = ref({})

const busList = [
  { label: '1路' },
  { label: '2路' },
  { label: '3路' },
  { label: '4路' },
  { label: '5路' },
  { label: '6路' },
  { label: '7路' },
  { label: '8路' },
  { label: '9路' },
  { label: '10路' },
  { label: '11路' },
  { label: '12路' },
  { label: '13路' },
  { label: '14路' },
  { label: '15路' },
]

function handleOpen(data) {
  // 假设store中有这样的方法
  isDialogVisible.value = true;
  formData.value = data
}

const handleClose = () => {
  // 假设store中有这样的方法
  isDialogVisible.value = false;
};

defineExpose({
  handleOpen
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2541px !important;
  overflow: none !important;
  min-height: 1287px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 2541px;
  height: 1287px;
  background: url("assets/component/urbanTrafficTable/切图 740.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-42%);
  padding: 40px 50px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: -70px;
  top: 0;
}

.content-title {
  width: 587px;
  height: 91px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 50px;
  line-height: 91px;
  color: #FAFDFF;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: url('assets/component/urbanTrafficTable/切图 741.png') no-repeat center/cover;
  position: absolute;
  left: 0;
  top: -110px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.content-box {
  width: 2395px;
  height: 1155px;
  position: relative;
  margin: 0 auto;
  margin-top: 25px;
  display: flex;

  .map-box {
    width: 1626px;
    height: 1155px;
    background: skyblue;
  }

  .right-box {
    flex: 1;
    background: rgba(4, 12, 23, 0.4);
    padding: 40px 20px;

    .el-form {
      --el-form-label-font-size: 48px;
      --el-text-color-regular: #BBDBF1;

      :deep(.el-form-item__label) {
        line-height: 98px;
      }
    }

    .el-input {
      --el-input-inner-height: 98px;
      width: 100%;
      --el-input-bg-color: #0E1F33;
      --el-fill-color-blank: var(--el-input-bg-color) --el-input-border-color:#3B6E9C;
      font-size: 48px;
    }

    .el-select {
      --el-select-input-font-size: 48px;

      :deep(.el-select__wrapper) {
        min-height: 98px;
        --el-fill-color-blank: #0E1F33;
        font-size: 48px;
        line-height: 48px;
      }
    }

    .way-box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px 21px;
      margin-top: 20px;

      .bus-item {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 42px;
        color: #A9CEE8;
        line-height: 58px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        width: 147px;
        height: 62px;
        background: rgba(76, 198, 255, 0.37);
        border-radius: 6px;
      }
    }

    .outway {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: rgba(169, 206, 232, 0.67);
      line-height: 98px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .tip {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 652px;
    height: 347px;
    background: rgba(4, 12, 23, 0.4);
    padding: 20px 0 0 50px;

    .tip-lab {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 48px;
      color: #BBDBF1;
      line-height: 66px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      height: 80px;
    }
  }
}
</style>
