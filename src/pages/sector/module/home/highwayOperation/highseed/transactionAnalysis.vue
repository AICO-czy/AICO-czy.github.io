<!-- 京承往来分析 -->
<template>
  <q-dialog seamless v-model="transactionAnalysisStore.isDialogVisible">
    <div class="dialog-content column">
      <div class="content-header flex justify-between items-center">
        <div class="content-title"></div>
        <div class="content-time row">
          <div class="content-time-item row justify-center items-center"
            :class="{ 'content-time-item-active': item === activeTime }"
            v-for="(item, index) in transactionAnalysisTime" :key="index" @click="handleTimeClick(item)">
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="content-close cursor-pointer" @click="handleClose"></div>
      </div>
      <div class="col dialog-content-bottom column justify-between">
        <div class="dialog-content-bottom-chart column">
          <item-title title="交通量变化态势" />
          <v-chart autoresize :option="option1" class="col full-width" />
        </div>
        <div class="dialog-content-bottom-chart column">
          <item-title title="交通量变化态势" />
          <v-chart autoresize :option="option2" class="col full-width" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts" name="transactionAnalysis">
import { ref } from 'vue'
import { useBaiseInfoDialogStore, useHighseedStore, useTransactionAnalysisStore } from './store/index'
import ItemTitle from './components/itemTitle.vue'
import * as echarts from 'echarts'


const transactionAnalysisStore = useTransactionAnalysisStore()

const handleClose = () => {
  transactionAnalysisStore.closeDialog()
}

const transactionAnalysisTime = ref(['小时', '月'])

const activeTime = ref('小时')

const handleTimeClick = (t: number) => {
  activeTime.value = t
}

const option1 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    formatter: function (params) {
      let html = '';
      params.forEach(item => {
        if (item.seriesName === '交通量') {
          html += `${item.name}：${item.value} 辆<br/>`;
        } else {
          html += `${item.seriesName}：${item.value}%<br/>`;
        }
      });
      return html;
    }
  },
  legend: {
    data: ['交通量', '环比', '同比'],
    left: 'center',
    top: '10px',
    itemGap: 40,
    textStyle: {
      color: "#C6CECF",
      fontSize: 30,
    }
  },
  xAxis: {
    type: 'category',
    data: ['09/29', '09/30', '10/01', '10/02', '10/03'], // 补充 10/02 保证日期连续
    axisLine: {
      lineStyle: {
        color: '#666'
      }
    },
    axisLabel: {
      textStyle: {
        color: "#AEC1C8",
        fontSize: 30,
      },
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:辆',
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisLabel: {
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)"
        }
      }
    },
    {
      type: 'value',
      name: '单位:%',
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 0, 0, 0],
      },
      interval: 5,
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisLabel: {
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '交通量',
      type: 'bar',
      data: [12000, 14000, 15000, 16000, 14000], // 模拟交通量数据
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(160, 249, 255, 1)',
          },
          {
            offset: 0.5,
            color: 'rgba(69, 153, 237, 1)',
          },
          {
            offset: 1,
            color: 'rgba(51, 103, 154, 0)',
          },
        ])
      },
      barWidth: '30px'
    },
    {
      name: '环比',
      type: 'line',
      yAxisIndex: 1,
      data: [18, 16, 12, 15, 5], // 模拟环比数据
      itemStyle: {
        color: '#fff'
      },
      lineStyle: {
        color: '#CE855C',
        width: 5,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(206, 133, 92, 0.4)",
              },
              {
                offset: 1,
                color: "rgba(56, 222, 153,0)",
              },
            ],
            false
          ),

        },
      },
      symbol: 'circle',
      symbolSize: 12,
      showSymbol: true,
    },
    {
      name: '同比',
      type: 'line',
      yAxisIndex: 1,
      data: [6, 15, 13, 18, 19], // 模拟同比数据
      itemStyle: {
        color: '#fff'
      },
      lineStyle: {
        color: '#38DE99',
        width: 5,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(45, 203, 108, 0.40)",
              },
              {
                offset: 1,
                color: "rgba(45, 203, 108, 0)",
              },
            ],
            false
          ),
        },
      },
      symbol: 'circle',
      symbolSize: 12,
      showSymbol: true,
    }
  ],
  grid: {
    left: '3%',
    right: '3%',
    bottom: '5%',
    containLabel: true
  },
})

const option2 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['小客车', '大客车', '小客车环比', '小客车同比', '大客车环比', '大客车同比'],
    left: 'center',
    top: '0px',
    textStyle: {
      color: "#C6CECF",
      fontSize: 28,
    },
  },
  xAxis: {
    type: 'category',
    data: ['09/29', '09/30', '10/01', '10/02', '10/03'],
    axisLine: {
      lineStyle: {
        color: '#666'
      }
    },
    axisLabel: {
      textStyle: {
        color: "#AEC1C8",
        fontSize: 30,
      },
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '单位:辆',
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisLabel: {
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(130, 144, 157, 0.34)"
        }
      }
    },
    {
      type: 'value',
      name: '单位:%',
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 0, 0, 0],
      },
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      },
      axisLabel: {
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: '小客车',
      type: 'bar',
      barGap: '50%',
      data: [13000, 15000, 12000, 9000, 11000],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(160, 249, 255, 1)',
          },
          {
            offset: 0.5,
            color: 'rgba(69, 153, 237, 1)',
          },
          {
            offset: 1,
            color: 'rgba(51, 103, 154, 0)',
          },
        ])
      },
      barWidth: '20px'
    },
    {
      name: '大客车',
      type: 'bar',
      barGap: '50%',
      data: [16000, 13000, 9000, 13000, 12000],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255, 189, 129, 1)',
          },
          {
            offset: 1,
            color: 'rgba(255, 189, 129, 0)',
          },
        ])
      },
      barWidth: '20px'
    },
    {
      name: '小客车环比',
      type: 'line',
      yAxisIndex: 1,
      data: [18, 16, 12, 14, 2],
      itemStyle: {
        color: '#48b'
      },
      lineStyle: {
        color: 'rgba(64, 209, 249, 1)',
        width: 5,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(64, 209, 249, 0.20)",
              },
              {
                offset: 1,
                color: "rgba(45, 203, 108, 0)",
              },
            ],
            false
          ),
        },
      },
      symbolSize: 10
    },
    {
      name: '小客车同比',
      type: 'line',
      yAxisIndex: 1,
      data: [16, 15, 10, 12, 1],
      itemStyle: {
        color: '#91c7ae'
      },
      lineStyle: {
        color: 'rgba(115, 136, 244, 1)',
        width: 5,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(115, 136, 244, 0.20)",
              },
              {
                offset: 1,
                color: "rgba(45, 203, 108, 0)",
              },
            ],
            false
          ),
        },
      },
      symbolSize: 10
    },
    {
      name: '大客车环比',
      type: 'line',
      yAxisIndex: 1,
      data: [2, 10, 12, 16, 18],
      itemStyle: {
        color: '#f46d43',
        width: 5,
      },
      lineStyle: {
        color: 'rgba(206, 133, 92, 1)'
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(206, 133, 92, 0.0)",
              },
              {
                offset: 1,
                color: "rgba(45, 203, 108, 0)",
              },
            ],
            false
          ),
        },
      },
      symbolSize: 10
    },
    {
      name: '大客车同比',
      type: 'line',
      yAxisIndex: 1,
      data: [5, 12, 10, 15, 17],
      itemStyle: {
        color: '#fdae61'
      },
      lineStyle: {
        color: 'rgba(249, 206, 64, 1)',
        width: 5,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(249, 206, 64, 0.21)",
              },
              {
                offset: 1,
                color: "rgba(45, 203, 108, 0)",
              },
            ],
            false
          ),
        },
      },
      symbolSize: 10
    }
  ],
  grid: {
    top: '25%',
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true
  }
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 1456px !important;
  overflow: none !important;
  min-height: 1151px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1456px;
  height: 1151px;
  background: url("./images/切图 303.png") no-repeat 100%/100%;
  position: fixed;
  right: 1150px;
  top: 300px;
  padding: 107px 70px 110px 70px;
  box-sizing: border-box;
}

.content-header {
  padding-bottom: 8px;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
}

.content-title {
  width: 369px;
  height: 58px;
  background-image: url('./images/切图 328.png');
  background-size: 100% 100%;
}

.dialog-content-bottom-chart {
  width: 100%;
  height: 428px;
  background-image: url('./images/切图 304.png');
  background-size: 100% 100%;
  border-radius: 12px;
  padding: 10px 20px;
}

.content-time-item {
  width: 188px;
  height: 60px;
  margin: auto;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 6px 6px 0px;
}

.content-time-item-active {
  width: 188px;
  height: 60px;
  margin: auto;
  background: rgba(27, 123, 182, 0.5);
  border-radius: 6px 0px 0px 6px;
}

.content-time-item span {
  width: 103px;
  height: 59px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #E3F1FF;
  line-height: 53px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
