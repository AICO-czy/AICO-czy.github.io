<template>
  <q-dialog v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">
        <q-img :src="img1" class="w-[59px] h-[59px]" alt=""></q-img>
        <div class="ml-[20px]">查看车辆信息</div>
      </div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="item" :class="setBgColor(index) ? 'sp' : ''" v-for="(item, index) in listData">
          <div class="label-name">{{ item.label }}:</div>
          <div class="item-data">{{ formData[item.value] || "未知" }}</div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import img1 from 'src/assets/component/urbanTrafficTable/切图 737.png'
const isDialogVisible = ref(false);

const formData = ref<Record<string, any>>({})

const listData = ref([
  { label: '车牌号码', value: 'cphm' },
  { label: '车牌颜色', value: 'cpys' },
  { label: '企业名称', value: 'qymc' },
  { label: '车辆类别', value: 'cllb' },
  { label: '品牌型号', value: 'ppxh' },
  { label: '车架号', value: 'cjh' },
  { label: '运输证号', value: 'yszh' },
  { label: '发证日期', value: 'fzrq' },
  { label: '车籍地', value: 'cjd' },
  { label: '发动机号', value: 'fdjh' },
  { label: '车辆车高', value: 'clcg' },
  { label: '车辆车长', value: 'clcc' },
  { label: '车辆车宽', value: 'clck' },
  { label: '车辆轴距', value: 'clzj' },
  { label: '经营范围', value: 'jyfw' },
  { label: '技术等级', value: 'jsdj' },
  { label: '车辆出厂日期', value: 'clccrq' },
  { label: '车辆购买日期', value: 'clgmrq' },
  { label: '首次登记日期', value: 'clgdrq' },
  { label: '车辆落户日期', value: 'cllhrq' },
  { label: '车辆使用年限', value: 'clsynx' },
  { label: '审核有效期', value: 'shyxq' },
  { label: '年审结果', value: 'nsjg' },
  { label: '年审日期', value: 'nsrq' },
  { label: '使用性质', value: 'syxz' },
  { label: '投入运营时间', value: 'tryysj' },
  { label: '辖区市', value: 'xqs' },
  { label: '辖区县', value: 'xqx' },
  { label: '辖区镇', value: 'xqz' },
  { label: '状态', value: 'zt' }
])

function handleOpen(data: any) {
  // 假设store中有这样的方法
  isDialogVisible.value = true;
  formData.value = data
}

const handleClose = () => {
  // 假设store中有这样的方法
  isDialogVisible.value = false;
};

//根据index每隔两个设置两个背景色
function setBgColor(index: number) {

  return !((index & -2) >> 1 & 1) ? 'bg' : '';
}

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
  padding: 50px 60px;
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
  width: 100%;
  height: 100%;
  display: grid;
  gap: 0 18px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(15, 1fr);

  .item {
    height: 77px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .label-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 48px;
      color: #BBDBF1;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 48px;
    }

    .item-data {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 48px;
      color: #BBDBF1;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-right: 48px;
    }
  }

  .sp {
    background: rgba(4, 12, 23, 0.40);
  }
}
</style>
