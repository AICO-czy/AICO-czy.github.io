<template>
  <div class="chat-conversation">
    <close-com class="right-[-8%] top-[30%]" @click="activeTypeStore.setActiveBtn(1)" />
    <zsk-com class="right-[-8%] top-[60%]" @click="showTable = !showTable" />
    <div class="data-list" :class="dataList.length != 0 ? 'has-data' : ''" v-if="dataList.length != 0 && !showTable">
      <div v-for="item in dataList">
        <!-- 用户发送 -->
        <div class="user-item msg-item" v-if="item.send == 'user'">
          <div class="user-msg">{{ item.content }}</div>
          <div class="user-icon"></div>
        </div>
        <!-- 智能体回复 -->
        <div class="chat-item msg-item" v-if="item.send == 'chat'">
          <div class="chat-icon"></div>
          <div class="chat-msg">
            <div>{{ item.content }}</div>
            <div class="tool">
              <div class="copy-icon"></div>
              <div class="reset-icon"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-list" :class="dataList.length != 0 ? 'has-data' : ''" v-if="dataList.length == 0 && !showTable">
    </div>
    <div class="table-list column" v-if="showTable">
      <div class="table-top row col-auto">
        <div class="table-top-item col" :class="{ 'table-top-item-select': item.select }" v-for="item in tableTopDatas"
          :key="item.value" @click="changeSelect(item)">
          <span class="table-top-item-name" :class="{ 'table-top-item-name-select': item.select }">{{ item.name
          }}</span>
          <span class="table-top-item-value" :class="{ 'table-top-item-value-select': item.select }">{{
            item.value }}</span>
        </div>
      </div>
      <div class="table-search col-auto">
        <div class="search-name">文件名称</div>
        <div class="input-box">
          <el-input v-model="searchContent" placeholder="请输入关键词" />
        </div>
        <div class="search-btn">查询</div>
      </div>
      <div class="table-content col">
        <q-table class="content-tab-table-content" flat dark :rows="state.tableData" :columns="state.columns"
          :pagination="state.pagination" row-key="index" bordered dense :loading="state.loading"
          table-class="table-class" table-header-class="table-header-class" card-container-class="card-container-class"
          card-class="card-class" rows-per-page-label="条/页" :no-data-label="state.message"
          :rows-per-page-options="[0, 5, 10, 15, 20]" hide-pagination>
          <template v-slot:no-data="{ message }">
            <div class="text-white full-width row flex-center q-gutter-sm">
              <span>
                {{ message }}
              </span>
            </div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="index" :props="props">
                {{ props.row.index }}
              </q-td>
              <q-td key="fileName" :props="props">
                {{ props.row.fileName }}
              </q-td>
              <q-td key="issuingAuthority" :props="props">
                {{ props.row.issuingAuthority }}
              </q-td>
              <q-td key="documentNum" :props="props">
                {{ props.row.documentNum }}
              </q-td>
              <q-td key="effectiveTime" :props="props">
                {{ props.row.effectiveTime }}
              </q-td>
              <q-td key="validityPeriod" :props="props">
                {{ props.row.validityPeriod }}
              </q-td>
              <q-td key="actions" :props="props" class="table-actions row justify-center items-center">
                <div class="table-operation">查看</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="table-foot row justify-between full-width">
          <div class="table-foot-total">共{{ state.tableData.length }}条数据</div>
          <div class="table-foot-pagination">
            <q-pagination v-model="state.current" :max="10" :max-pages="6" direction-links push />
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input" :class="dataList.length != 0 ? 'has-data' : ''" v-if="!showTable">
      <div class="input-box">
        <el-input v-model="sendContent" placeholder="请输入......" />
      </div>
      <div class="add-btn chat-btn cursor-pointer" v-if="dataList.length != 0" @click="addConversation">
        <span class="tooltiptext">新对话</span>
      </div>
      <div class="file-btn chat-btn cursor-pointer">
        <span class="tooltiptext">上传文档</span>
        <span class="tooltiptext1">可同时上传1个文件 ( 每个10MB )支持 Word、TXT、PDF、JSON 等多种格式</span>
      </div>
      <div class="send-btn chat-btn cursor-pointer" :class="sendContent.trim() == '' ? 'send-btn' : 'send-btn-active'"
        @click.stop="sendMessage">
        <span class="tooltiptext">发送</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ZskCom from '../../components/zskCom.vue'
import CloseCom from '../../components/closeCom.vue'
import { useActiveTypeStore } from '../../store/activeType'
import { ref, reactive } from 'vue';

const activeTypeStore = useActiveTypeStore();

const showTable = ref(false);

const dataList = ref([
  // 聊天记录数据
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 2, type: 'text', send: 'chat', content: 'TOCC全称为Transportation Operations Coordination Center,中文名交通运行监测调度中心或交通综合运行协调指挥中心。该机构整合多维度交通数据（如城市道路、轨道交通等）,承担运行监测、预警预测、信息发布及应急调度等职能，是智慧交通管理核心枢纽。' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
])

const dataListCopy = ref([
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 2, type: 'text', send: 'chat', content: 'TOCC全称为Transportation Operations Coordination Center,中文名交通运行监测调度中心或交通综合运行协调指挥中心。该机构整合多维度交通数据（如城市道路、轨道交通等）,承担运行监测、预警预测、信息发布及应急调度等职能，是智慧交通管理核心枢纽。' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
  { id: 1, type: 'text', send: 'user', content: 'TOCC的全称是什么' },
])

const tableTopDatas = ref([
  {
    name: '全部',
    select: true,
    value: 482
  },
  {
    name: '法律法规',
    select: false,
    value: 63
  },
  {
    name: '政策文件',
    select: false,
    value: 6
  },
  {
    name: '行业规范',
    select: false,
    value: 52
  },
  {
    name: '技术标准',
    select: false,
    value: 27
  },
  {
    name: '政府规章',
    select: false,
    value: 25
  },
  {
    name: '事件案例',
    select: false,
    value: 23
  },
  {
    name: '其他',
    select: false,
    value: 28
  },
])
const sendContent = ref('')

const searchContent = ref('')

const state = reactive({
  message: '暂无数据',
  current: 1,
  // 表格数据
  tableData: [
    {
      index: '01',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-01-28',
      validityPeriod: '2025-06-10'
    },
    {
      index: '02',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-08-01',
      validityPeriod: '2025-06-10'
    },
    {
      index: '03',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-08-01',
      validityPeriod: '2025-06-10'
    },
    {
      index: '04',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-08-01',
      validityPeriod: '2025-06-10'
    },
    {
      index: '05',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-08-01',
      validityPeriod: '2025-06-10'
    },
    {
      index: '06',
      fileName: 'XXXXXXX',
      issuingAuthority: '承德市客货运输有限公司',
      documentNum: 'LO1002710811',
      effectiveTime: '2023-08-01',
      validityPeriod: '2025-06-10'
    },
  ],

  // 列定义
  columns: [
    {
      name: 'index',
      required: true,
      label: '序号',
      align: 'center',
      field: row => row.index,
    },
    {
      name: 'fileName',
      required: true,
      label: '文件名称',
      align: 'center',
      field: row => row.fileName,
    },
    {
      name: 'issuingAuthority',
      required: true,
      label: '印发机关',
      align: 'center',
      field: row => row.issuingAuthority,
    },
    {
      name: 'documentNum',
      required: true,
      label: '文号',
      align: 'center',
      field: row => row.documentNum,
    },
    {
      name: 'effectiveTime',
      required: true,
      label: '生效时间',
      align: 'center',
      field: row => row.effectiveTime,
    },
    {
      name: 'validityPeriod',
      required: true,
      label: '有效期',
      align: 'center',
      field: row => row.validityPeriod,
    },
    {
      name: 'actions',
      label: '操作',
      align: 'center',
      field: () => '操作'
    }
  ],

  // 分页配置
  pagination: {
    page: 1,
    rowsPerPage: 10,
    rowsNumber: 100, // 总条数
    sortBy: 'alarmTime',
    descending: true
  },

  // 加载状态
  loading: false,
  // 选中行
  selectedRow: null,
  selectedRowIndex: null,
})

const addConversation = () => {
  dataList.value = []
}

const sendMessage = () => {
  if (sendContent.value.trim() == '') return
  dataList.value = dataListCopy.value
  dataList.value.push({ id: dataList.value.length + 1, type: 'text', send: 'user', content: sendContent.value })
  sendContent.value = ''
}

const changeSelect = (item) => {
  tableTopDatas.value.forEach(item => item.select = false)
  item.select = true
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
}

.data-list {
  width: 4859px !important;
  margin: auto;
  margin-bottom: 20px;
  overflow-y: auto;

  &.has-data {
    height: 855px;
  }

  .msg-item {
    display: flex;
    margin-bottom: 71px;
  }

  .user-item {
    justify-content: end;
  }

  .user-icon {
    width: 183px;
    height: 183px;
    background: url('assets/image/digitalIntelligence/dialog/userIcon.png') no-repeat 100%/100%;
  }

  .user-msg {
    max-width: 4328px;
    background: #1B5A87;
    border-radius: 15px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 70px;
    color: #D5E4F3;
    line-height: 98px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding: 38px 80px;
    display: inline-block;
    margin-right: 68px;
  }

  .chat-icon {
    width: 213px;
    height: 176px;
    background: url('assets/image/digitalIntelligence/dialog/chatIcon.png') no-repeat 100%/100%;
  }

  .chat-msg {
    max-width: 4328px;
    background: #1D3652;
    border-radius: 15px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 70px;
    color: #D5E4F3;
    line-height: 109px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding: 38px 80px;
    display: inline-block;
    margin-left: 67px;

    .tool {
      display: flex;
      margin-top: 93px;

      .copy-icon {
        width: 128px;
        height: 128px;
        background: url('assets/image/digitalIntelligence/dialog/copyIcon.png') no-repeat center/cover;
        margin-right: 38px;
      }

      .reset-icon {
        width: 128px;
        height: 128px;
        background: url('assets/image/digitalIntelligence/dialog/reSetIcon.png') no-repeat center/cover;
      }
    }
  }

}

.chat-input {
  margin: auto;
  position: relative;
  width: 4859px;
  height: 1196px;
  box-shadow: inset 0px 0px 60px 0px #17AEFF;
  border-image: linear-gradient(180deg, rgba(81.00000277161598, 170.0000050663948, 255, 1), rgba(0, 137.00000703334808, 233.00000131130219, 1)) 2 2;
  background: rgba(4, 25, 41, 0.17);
  border-radius: 30px;

  &.has-data {
    height: 321px;
  }

  .input-box {
    padding: 21px 800px 21px 162px;

    .el-input {
      --el-input-text-color: #B2D2EB;
      // --el-input-inner-height: 321px;
      font-size: 70px;
      --el-input-height: 150px;
      --el-input-bg-color: transparent;
      --el-input-border: 0;
      --el-input-border-color: transparent;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: transparent;
    }
  }


  .chat-btn {
    width: 165px;
    height: 165px;
    position: absolute;
  }

  .add-btn {
    background: url('assets/image/digitalIntelligence/dialog/addIcon.png') no-repeat 100%/100%;
    bottom: 79px;
    right: 496px;
  }

  .file-btn {
    background: url('assets/image/digitalIntelligence/dialog/fileIcon.png') no-repeat 100%/100%;
    bottom: 79px;
    right: 292px;
  }

  .send-btn {
    background: url('assets/image/digitalIntelligence/dialog/sendIcon.png') no-repeat 100%/100%;
    bottom: 79px;
    right: 87px;
  }

  .send-btn-active {
    background: url('assets/image/digitalIntelligence/dialog/sendIcon-active.png') no-repeat 100%/100%;
    bottom: 79px;
    right: 87px;
  }
}

.chat-btn .tooltiptext {
  visibility: hidden;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 54px;
  color: #D5E4F3;
  line-height: 76px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: rgba(0, 0, 0, 0.53);
  border-radius: 16px 16px 16px 16px;
  padding: 20px;
  width: 300px;
  top: -120px;
  left: -50%;
  /* 定位 */
  position: absolute;
  z-index: 1;
}

.chat-btn .tooltiptext1 {
  visibility: hidden;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 54px;
  color: #D5E4F3;
  line-height: 76px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: rgba(0, 0, 0, 0.53);
  border-radius: 16px 16px 16px 16px;
  padding: 20px;
  width: 800px;
  bottom: -300px;
  left: -300px;
  /* 定位 */
  position: absolute;
  z-index: 1;
}

.add-btn:hover .tooltiptext {
  visibility: visible;
}

.file-btn:hover .tooltiptext {
  visibility: visible;
}

.file-btn:hover .tooltiptext1 {
  visibility: visible;
}

.send-btn:hover .tooltiptext {
  visibility: visible;
}

.warning-tooltip {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 54px;
  color: #D5E4F3;
  line-height: 76px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: rgba(0, 0, 0, 0.53);
  border-radius: 16px 16px 16px 16px;
  padding: 20px;
}

.table-list {
  width: 100%;
  height: 100%;

  .table-top {
    width: 100%;
    height: 146px;
    border-radius: 12px;

    .table-top-item {
      height: 146px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      background: linear-gradient(180deg, rgba(165, 203, 255, 0.2) 0%, rgba(165, 203, 255, 0) 100%);

      .table-top-item-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 400;
        font-size: 60px;
        color: #87ADD0;
        line-height: 104px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .table-top-item-name-select {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 700;
        font-size: 60px;
        color: #E3F1FF;
        line-height: 104px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .table-top-item-value {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 400;
        font-size: 50px;
        color: #D5E4F3;
        line-height: 79px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }

      .table-top-item-value {
        display: inline-block;
        padding: 20px 30px;
        background: rgba(175, 175, 175, 0.2);
        border-radius: 17px 17px 17px 17px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 60px;
        color: #FFFFFF;
        line-height: 60px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .table-top-item-value-select {
        display: inline-block;
        padding: 20px 30px;
        background: rgba(255, 42, 42, 0.38);
        border-radius: 17px 17px 17px 17px;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 60px;
        color: #FFFFFF;
        line-height: 60px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .table-top-item-select {
      background: linear-gradient(360deg, #236899 0%, rgba(35, 104, 153, 0) 100%);
    }
  }
}

.table-search {
  width: 100%;
  height: 125px;
  margin: 50px 0px 46px 106px;
  display: flex;
  align-items: center;

  .input-box {
    width: 990px;
    height: 125px;
    background: url('assets/image/digitalIntelligence/dialog/切图 542.png') no-repeat 100%/100%;

    .el-input {
      --el-input-text-color: #B2D2EB;
      // --el-input-inner-height: 321px;
      font-size: 70px;
      --el-input-height: 150px;
      --el-input-bg-color: transparent;
      --el-input-border: 0;
      --el-input-border-color: transparent;
      --el-input-hover-border-color: transparent;
      --el-input-focus-border-color: transparent;
    }
  }

  .search-name {
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

  .search-btn {
    width: 305px;
    height: 109px;
    background: url('assets/image/digitalIntelligence/dialog/切图 513.png') no-repeat 100%/100%;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 58px;
    color: #FFFFFF;
    line-height: 90px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin-left: 70px;
  }
}

.table-content {
  width: 100%;
}

.content-tab-table-content {
  width: 100%;
  height: 85%;
}

:deep(.q-table__container) {
  background: none;
  border: none;
  box-shadow: none;
}

:deep(.table-header-class) {
  width: 100%;
  height: 151px !important;
  background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;

}

:deep(.table-header-class th) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 54px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
  position: sticky;
}

:deep(.text-center) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 50px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-table tbody tr) {
  width: 100%;
  height: 124px;
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table tbody .q-tr .q-td) {
  background: none;
}

:deep(.q-table tbody tr:nth-child(even)) {
  width: 100%;
  height: 124px;
  background: rgba(140, 178, 231, 0.06);
  border-radius: 0px 0px 0px 0px;
}

:deep(.q-table__bottom) {
  border: none;
}

:deep(.q-table__bottom-item) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #BBD5EB;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(thead tr th) {
  position: sticky;
  z-index: 1;
}

.icon-location {
  width: 53px;
  height: 69px;
}

.table-foot-total {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 48px;
  color: #BBD5EB;
  line-height: 71px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 20px;
}

.table-foot-pagination {
  padding: 20px 0px 0px 0px;
}

:deep(.q-pagination__content .q-btn-item) {
  width: 85px;
  height: 85px;
  background: rgba(70, 120, 175, 0.4) !important;
}

:deep(.q-pagination__content .q-btn--standard .block) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 45px;
  color: #32D3FF;
  line-height: 50px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.q-table tbody tr.selected) {
  background-color: #32D3FF;
}

:deep(.text-center-select) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 45px;
  color: #6BDCFF;
  line-height: 49px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.table-actions {
  height: 124px !important;
}

.table-operation {
  width: 200px;
  height: 72px;
  background: linear-gradient(180deg, #6BD5FF 0%, #17546C 100%) !important;
  border-radius: 15px 15px 15px 15px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 50px;
  color: #FFFFFF;
  line-height: 70px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
