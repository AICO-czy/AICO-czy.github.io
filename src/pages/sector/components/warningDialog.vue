<template>
  <q-dialog seamless v-model="showVisible" transition-hide="none" transition-show="none">
    <div class="warning-content">
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="content-box-header">
          <acountTitleBox text="今日累计交通事件:" value="11" unit="件" />
          <acountTitleBox text="实时事件:" value="2" unit="件" :style="{
            fontFamily: 'YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif',
            fontWeight: '400',
            fontSize: '46px',
            lineHeight: '60px',
            fontStyle: 'normal',
            textTransform: 'none',
            background: 'linear-gradient(to bottom, #6BDCFF 0%, #54FBF1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            MozBackgroundClip: 'text',
            MozTextFillColor: 'transparent',
            whiteSpace: 'nowrap'
          }" />
          <acountTitleBox text="今日新增事件:" value="5" unit="件" :style="{
            fontFamily: 'YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif',
            fontWeight: '400',
            fontSize: '46px',
            lineHeight: '60px',
            fontStyle: 'normal',
            textTransform: 'none',
            background: 'linear-gradient(to bottom, #6BDCFF 0%, #54FBF1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            MozBackgroundClip: 'text',
            MozTextFillColor: 'transparent',
            whiteSpace: 'nowrap'
          }" />
        </div>
        <div class="content-box-table">
          <div class="warning-table">
            <div class="table-wrapper">
              <table class="warning-data-table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>事件时间</th>
                    <th>公路名称</th>
                    <th>事件来源</th>
                    <th>事件原因</th>
                    <th>事件详情</th>
                  </tr>
                </thead>
              </table>
              <div class="table-body-container">
                <table class="warning-data-table">
                  <tbody>
                    <tr v-for="(item, index) in warningData" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.eventTime }}</td>
                      <td>{{ item.roadName }}</td>
                      <td>{{ item.eventSource }}</td>
                      <td>{{ item.eventReason }}</td>
                      <td class="event-detail">{{ item.eventDetail }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import acountTitleBox from './acountTitleBox.vue';

const showVisible = defineModel('visible', { type: Boolean, default: false })

// 预警数据
const warningData = ref([
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '系统导入',
    eventReason: '公路养护',
    eventDetail: '沫沫高速廊坊方向，已于2022年03月23日08时19分恢复正常通行，该路段于2022年03月23日08时00分因雾，高速交警关闭易县站、涞水站、涞水东站廊坊方向。'
  },
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '承平高速',
    eventReason: '雾',
    eventDetail: '沫沫高速廊坊方向，已于2022年03月23日08时19分恢复正常通行，该路段于2022年03月23日08时00分因雾，高速交警关闭易县站、涞水站、涞水东站廊坊方向。'
  },
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '省厅共享',
    eventReason: '车流量大',
    eventDetail: '京台高速廊坊段北京方向，已于2022年03月23日08时19分恢复正常通行，该路段曾于2022年03月19日12时22分因车流量大，北京高速交警在万庄服务区附近行K28+530处实行交通管制，问断性放行车辆。'
  },
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '省厅共享',
    eventReason: '交通管制',
    eventDetail: '沫沫高速廊坊、涞源方向，该路段曾于2022年03月23日08时00分因交通管制，高速交警双向禁止易县站、涞水站、涞水东站黄牌货车上道。'
  },
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '省厅共享',
    eventReason: '其他',
    eventDetail: '沫沫高速廊坊方向，已于2022年03月23日08时19分恢复正常通行，该路段于2022年03月23日08时00分因雾，高速交警关闭易县站、涞水站、涞水东站廊坊方向。'
  },
  {
    eventTime: '2025-07-01 8:41',
    roadName: '承平高速',
    eventSource: '省厅共享',
    eventReason: '行人闯入',
    eventDetail: '沫沫高速廊坊、涞源方向，该路段曾于2022年03月23日08时00分因交通管制，高速交警双向禁止易县站、涞水东站黄牌货车上道。'
  },
  {
    eventTime: '2025-07-01 9:15',
    roadName: '京承高速',
    eventSource: '系统导入',
    eventReason: '道路施工',
    eventDetail: '京承高速承德方向，因道路施工需要，该路段于2025年07月01日09时15分开始实施临时交通管制，预计施工时间4小时，请过往车辆注意绕行。'
  },
  {
    eventTime: '2025-07-01 10:20',
    roadName: '承秦高速',
    eventSource: '交警部门',
    eventReason: '事故处理',
    eventDetail: '承秦高速秦皇岛方向K156+200处发生交通事故，目前事故正在处理中，已实施临时交通管制，建议车辆从就近收费站下高速绕行。'
  },
  {
    eventTime: '2025-07-01 11:30',
    roadName: '大广高速',
    eventSource: '省厅共享',
    eventReason: '恶劣天气',
    eventDetail: '大广高速承德段因大雨天气能见度低，为确保行车安全，高速交警部门已在相关路段实施限速措施，请驾驶员谨慎驾驶。'
  },
  {
    eventTime: '2025-07-01 12:45',
    roadName: '承唐高速',
    eventSource: '路政部门',
    eventReason: '设施维护',
    eventDetail: '承唐高速唐山方向K89+500-K92+300路段正在进行护栏维护作业，占用应急车道，请过往车辆减速慢行，注意避让施工人员和车辆。'
  },
  {
    eventTime: '2025-07-01 13:10',
    roadName: '承张高速',
    eventSource: '监控中心',
    eventReason: '车辆故障',
    eventDetail: '承张高速张家口方向K78+100处有车辆发生故障，占用行车道，救援车辆正在赶往现场，请后方车辆注意避让，减速通过。'
  },
  {
    eventTime: '2025-07-01 14:25',
    roadName: '国道112线',
    eventSource: '路政巡查',
    eventReason: '路面积水',
    eventDetail: '国道112线K245+800-K246+200路段因下雨导致路面积水严重，影响正常通行，相关部门正在组织排水作业，请过往车辆谨慎通过。'
  }
])

const handleClose = () => {
  showVisible.value = false;
}
</script>


<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2095px !important;
  overflow: none !important;
  min-height: 1190px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.warning-content {
  position: fixed;
  left: 50%;
  top: 340px;
  transform: translateX(-50%);
  width: 2640px;
  height: 952px;
  background-image: url("assets/image/sector/切图 259.png");
  background-size: 100% 100%;
  padding: 50px 40px;
  box-sizing: border-box;
}

.content-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .content-box-header {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    box-sizing: border-box;
    gap: 112px;
  }

  .content-box-table {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
  }
}

// 表格样式
.warning-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.table-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-body-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100% - 60px);

  &::-webkit-scrollbar {
    width: 12px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: rgba(38, 117, 182, 0.1);
    border-radius: 6px;
    margin: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6BDCFF 0%, #4DA3FF 50%, #2675B6 100%);
    border-radius: 6px;
    border: 2px solid rgba(38, 117, 182, 0.1);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(180deg, #80E4FF 0%, #6BB5FF 50%, #4DA3FF 100%);
      border: 2px solid rgba(38, 117, 182, 0.2);
    }

    &:active {
      background: linear-gradient(180deg, #4DA3FF 0%, #2675B6 50%, #1A5A8A 100%);
    }
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  // 滚动条按钮样式
  &::-webkit-scrollbar-button {
    display: none;
  }

  .warning-data-table {
    width: 100%;
  }
}

.warning-data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
  table-layout: fixed;

  th,
  td {
    &:nth-child(1) {
      width: 8%;
    }

    &:nth-child(2) {
      width: 15%;
    }

    &:nth-child(3) {
      width: 12%;
    }

    &:nth-child(4) {
      width: 12%;
    }

    &:nth-child(5) {
      width: 12%;
    }

    &:nth-child(6) {
      width: 41%;
    }

    box-sizing: border-box;
  }

  thead {
    tr {
      background: rgba(38, 117, 182, 0.2);
      height: 60px;

      th {
        padding: 15px 20px;
        font-family: 'YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif';
        font-weight: 600;
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
        border: none;
        background: rgba(38, 117, 182, 0.2);
        position: sticky;
        top: 0;
        z-index: 10;

        &:first-child {
          border-left: none;
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  tbody {
    tr {
      background: rgba(38, 117, 182, 0.2);
      border-radius: 0px 0px 0px 0px;
      transition: all 0.3s ease;
      height: 55px;

      &:hover {
        background: rgba(77, 163, 255, 0.3);
        transform: scale(1.01);
      }

      &:nth-child(even) {
        background: rgba(38, 117, 182, 0.15);

        &:hover {
          background: rgba(77, 163, 255, 0.25);
        }
      }

      td {
        padding: 12px 20px;
        font-family: 'PingFang SC, Microsoft YaHei, sans-serif';
        font-weight: 400;
        font-size: 24px;
        color: #FFFFFF;
        text-align: center;
        border: none;
        word-wrap: break-word;
        word-break: break-all;

        &.event-detail {
          text-align: left;
          line-height: 1.4;
          padding: 8px 15px;
          font-size: 22px;
        }

        &:first-child {
          border-left: none;
          font-weight: 600;
        }

        &:last-child {
          border-right: none;
        }
      }
    }

    // 前三行所有文字颜色为#6BDCFF
    tr:nth-child(1),
    tr:nth-child(2),
    tr:nth-child(3) {
      td {
        color: #6BDCFF !important;
        font-weight: 500;
      }
    }

    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 40px;
}
</style>
