<template>
  <div class="con">
    <div class="left_box">
      <div class="list-item" v-for="(item, index) in leftList" :class="activeItem == index ? 'active' : ''"
        @click="handelLeft(index)">
        <div class="left-icon"></div>
        <div class="left-title">{{ item.name }}</div>
      </div>
    </div>
    <div class="right_box">
      <div class="btn_list">
        <div class="btn-item" @click="handleBtn('add')">
          <div class="btn_icon add_icon"></div>
          <div class="btn-text">新增</div>
          <div class="popu" v-if="addShow">
            <div @click="handleBtn('table')">表格导入</div>
            <div @click="handleBtn('peplo')">人工填写</div>
          </div>
        </div>
        <div class="btn-item" @click="handleBtn('edit')">
          <div class="btn_icon edit_icon"></div>
          <div class="btn-text">编辑</div>
        </div>
        <div class="btn-item" @click="handleBtn('del')">
          <div class="btn_icon del_icon"></div>
          <div class="btn-text">删除</div>
        </div>
      </div>
      <div class="form_bg">
        <div>
          <div class="list_item w-[990px]">
            <div class="label">文件名称</div>
            <div class="item_context">{{ formData.value1 }}</div>
          </div>
          <div class="list_item h-[335px]">
            <div class="label">指标定义</div>
            <el-input v-model="formData.value2" rows="3" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value2 }}</div> -->
          </div>
          <div class="list_item  h-[335px]">
            <div class="label">计算方法</div>
            <el-input v-model="formData.value3" rows="3" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value3 }}</div> -->
          </div>
          <div class="list_item w-[990px]">
            <div class="label">指标单位</div>
            <div class="item_context">{{ formData.value4 }}</div>
          </div>
        </div>
        <div>
          <div class="list_item h-[192px]">
            <div class="label">时间维度</div>
            <el-input v-model="formData.value5" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value5 }}</div> -->
          </div>
          <div class="list_item h-[192px]">
            <div class="label">空间维度</div>
            <el-input v-model="formData.value6" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value6 }}</div> -->
          </div>
          <div class="list_item h-[192px]">
            <div class="label">日期特征</div>
            <el-input v-model="formData.value7" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value7 }}</div> -->
          </div>
          <div class="list_item h-[192px]">
            <div class="label">时间特征</div>
            <el-input v-model="formData.value8" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value8 }}</div> -->
          </div>
          <div class="list_item h-[192px]">
            <div class="label">数据来源</div>
            <el-input v-model="formData.value9" type="textarea" placeholder="请输入内容"></el-input>
            <!-- <div class="item_context">{{ formData.value9 }}</div> -->
          </div>
        </div>
      </div>
    </div>
    <del-dialog ref="delRef" @delConfirmed="handleDel" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DelDialog from './delDialog.vue'

const delRef = ref<any>(null);

const addShow = ref(false);

const activeItem = ref(0);

const formData = {
  value1: '请输入关键词',
  value2: '一定时期内工程施工企业完成建设项目的工作量价值，以工程量货币化表现。',
  value3: '将统计周期内的工程完成投资金额求和。',
  value4: '亿元',
  value5: '规划期：5年、年、月,交通强市周期：10年、年、月',
  value6: '全市，覆盖高速公路、干线公路、农村公路、场站的新改建，一级养护大中修工程、精细化提升工程。',
  value7: '无',
  value8: '无',
  value9: '表格导入：局公路中心建设科，地道处。',
}

const leftList = [
  { id: 1, name: '项目数量' },
  { id: 2, name: '规划投资' },
  { id: 3, name: '完成投资' },
  { id: 4, name: '产值进度' },
  { id: 5, name: '投资占比' },
  { id: 6, name: '任务进度完成比例' },
  { id: 7, name: '通车里程' },
]

function handelLeft(item: any) {
  activeItem.value = item;
}
function handleBtn(type: string) {
  console.log(type);
  switch (type) {
    case 'add': //点击新增按钮
      // handle add
      addShow.value = !addShow.value;
      break;
    case 'table': //点击表格导入按钮
      // handle table
      $emit('btnEv', 'table')
      break;
    case 'peplo': //点击人工填写按钮
      // handle peplo
      $emit('btnEv', 'peplo')
      break;
    case 'edit': //点击编辑按钮
      // handle edit
      $emit('btnEv', 'edit')
      break;
    case 'del': //点击删除按钮
      // handle delete
      delRef.value.openDialog()
      break;
    default:
      break;
  }
}

const $emit = defineEmits(['btnEv']);

function handleDel() {
  console.log('del');
}
</script>

<style lang="scss" scoped>
.con {
  display: flex;
  justify-content: space-between;

  .left_box {
    width: 826px;
    height: 1182px;
    background: url('src/assets/image/digitalIntelligence/czmxtc/left_con_bg.png') no-repeat;
    margin: 0 22px;
    padding-top: 60px;

    .list-item {
      width: 824px;
      height: 148px;
      display: flex;
      align-items: center;

      .left-icon {
        width: 82px;
        height: 82px;
        background: url('src/assets/image/digitalIntelligence/czmxtc/left_item_icon.png') no-repeat;
        margin: 0 50px;
      }

      .left-title {
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 60px;
        color: #A9CEE8;
        line-height: 84px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .active {
      background: url('src/assets/image/digitalIntelligence/czmxtc/left_item_bg.png') no-repeat;
    }
  }

  .right_box {
    margin: 0 22px;
    width: 4120px;
    height: 1182px;
    background: url('assets/image/digitalIntelligence/czmxtc/right_con_bg.png') no-repeat;
    position: relative;

    .btn_list {
      position: absolute;
      top: -105px;
      right: 40px;
      display: flex;
      gap: 29px;

      .btn-item {
        width: 284px;
        height: 101px;
        background: url('assets/image/digitalIntelligence/czmxtc/btn_bg.png') no-repeat;
        display: flex;
        align-items: center;
        pointer-events: all;
        position: relative;

        .popu {
          position: absolute;
          padding: 10px 0;
          top: 100%;
          height: 200px;
          width: 100%;
          background: #35769f;
          border-radius: 0 0 20px 20px;
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 54px;
          color: #FFFFFF;
          line-height: 90px;
          text-align: center;
          font-style: normal;
          text-transform: none;
          z-index: 999;

          &>div {
            cursor: pointer;
            pointer-events: all;
          }
        }

        .btn_icon {
          width: 51px;
          height: 51px;
        }

        .add_icon {
          background: url('assets/image/digitalIntelligence/czmxtc/add_icon.png') no-repeat;
          margin: 0 30px 0 40px;
        }

        .edit_icon {
          background: url('assets/image/digitalIntelligence/czmxtc/edit_icon.png') no-repeat;
          margin: 0 30px 0 40px;
        }

        .del_icon {
          background: url('assets/image/digitalIntelligence/czmxtc/del_icon.png') no-repeat;
          margin: 0 30px 0 40px;
        }

        .btn-text {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 54px;
          color: #FFFFFF;
          line-height: 73px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }
    }

    .form_bg {
      padding: 50px 30px;
      display: flex;
      align-items: center;

      &>div {
        flex: 1;
        // background: pink;
        margin: 0 40px;
      }

      .list_item {
        display: flex;
        margin-bottom: 27px;

        .label {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 500;
          font-size: 56px;
          color: #A9CEE8;
          line-height: 78px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        --el-text-color-regular: #fff;

        .el-textarea {
          --el-input-bg-color: transparent;
          width: 1588px;
          margin-left: 30px;

          :deep(.el-textarea__inner) {
            font-size: 54px;
            padding: 10px;
            box-shadow:
              inset 0 0px 20px 20px rgba(0, 123, 255, 0.4),
              /* 内阴影 */
              0 0px 0px 8px rgba(0, 123, 255, 0.3);
            /* 外阴影 */
            border: 2px solid #007bff;
          }
        }

        .item_context {
          font-family: Source Han Sans, Source Han Sans;
          font-weight: 400;
          font-size: 56px;
          color: #FFFFFF;
          line-height: 90px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          margin-left: 30px;
          box-shadow:
            inset 0 0px 20px 20px rgba(0, 123, 255, 0.4),
            /* 内阴影 */
            0 0px 0px 8px rgba(0, 123, 255, 0.3);
          /* 外阴影 */
          border: 2px solid #007bff;
          flex: 1;
          min-height: 125px;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>
