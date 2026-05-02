<template>
  <q-dialog v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">
        <q-img :src="img1" class="w-[59px] h-[59px]" alt=""></q-img>
        <div class="ml-[20px]">查看驾驶员信息</div>
      </div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <template v-for="(item, index) in listData">
          <div class="item" :class="setBgColor(index) ? 'sp' : ''" v-if="item.value">
            <div class="label-name">{{ item.label }}:</div>
            <div class="item-data">{{ item.value ? formData[item.value] || "未知" : "" }}</div>
          </div>
          <div v-else class="row-span-5 sp">
            <!-- <q-img src="src/assets/component/urbanTrafficTable/切图 7371.png" class="w-[59px] h-[59px]" alt=""></q-img> -->
          </div>
        </template>
      </div>
    </div>
  </q-dialog>
</template>
<script setup lang="ts" name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import img1 from 'src/assets/component/urbanTrafficTable/切图 7371.png'
const isDialogVisible = ref(false);

const formData = ref<Record<string, any>>({})

const listData = ref([
  { label: '驾驶员姓名', value: 'cphm' },
  {},
  { label: '驾驶员性别', value: 'cpys' },
  { label: '企业名称', value: 'qymc' },
  { label: '驾驶员类别', value: 'cllb' },
  { label: '服务星级', value: 'ppxh' },
  { label: '出生日期', value: 'cjh' },
  { label: '身份证号码', value: 'yszh' },
  { label: '驾驶员民族', value: 'fzrq' },
  { label: '籍贯', value: 'cjd' },
  { label: '驾驶员学历', value: 'fdjh' },
  { label: '技术职称', value: 'clcg' },
  { label: '健康状态', value: 'clcc' },
  { label: '联系电话', value: 'clck' },
  { label: '联系地址', value: 'clzj' },
  { label: '初次领取驾驶证日期', value: 'jyfw' },
  { label: '准驾车型', value: 'jsdj' },
  { label: '机动车驾驶证号', value: 'clccrq' },
  { label: '从业资格证类别', value: 'clgmrq' },
  { label: '从业资格证号', value: 'clgdrq' },
  { label: '发证机构', value: 'cllhrq' },
  { label: '领证日期', value: 'clsynx' },
  { label: '从业资格证有效期起', value: 'shyxq' },
  { label: '从业资格证有效日期止', value: 'nsjg' },
  { label: '证照状态', value: 'nsrq' },
  { label: '综合评分', value: 'syxz' }
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
  if (index < 6 && index > 0) {
    return !!(index % 2) ? 'bg' : '';
  } else {
    return !((index & -2) >> 1 & 1) ? 'bg' : '';
  }
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

  .item {
    height: 77px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .itemImg {
      grid-row: span 2;
    }

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
