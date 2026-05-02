<template>
  <div class="content-tab-week column">
    <div class="content-tab-top full-width col column">
      <ItemTitle title="报警类型分布" />
      <v-chart autoresize :option="distributionOption" class="col distributionChart" />
    </div>
    <div class="content-tab-middle full-width col column">
      <ItemTitle title="企业报警TOP5" />
      <div class="content-tab-radio self-end">
        <q-option-group v-model="group2" :options="groupRadios2" color="primary" inline />
      </div>
      <v-chart autoresize :option="topOption" class="col" />
    </div>
    <div class="content-tab-bottom full-width col column">
      <ItemTitle title="平台报警处理率" />
      <v-chart autoresize :option="lineOption" class="col" />
    </div>
  </div>
</template>

<script setup lang="ts" name="week">
import { ref } from 'vue'
import ItemTitle from "../../../components/itemTitle.vue";
import * as echarts from "echarts";

const group1 = ref('op1')
const group2 = ref('op1')

const groupRadios1 = ref([{
  label: '实时',
  value: 'op1'
},
{
  label: '实时',
  value: 'op2'
}])
const groupRadios2 = ref([{
  label: '企业报警数',
  value: 'op1'
},
{
  label: '企业报警率',
  value: 'op2'
}])

const distributionOption = ref({
  legend: {
    top: '45%',
    right: '5%',
    orient: 'vertical',
    textStyle: { color: 'rgba(163, 191, 216, 1)', fontSize: 42, },
    data: ['报警数'],
  },
  radar: {
    radius: '70%',
    center: ['45%', '52%'],
    startAngle: 0,
    triggerEvent: true,
    name: { textStyle: { color: 'rgba(195, 211, 226, 1)', fontSize: '38', padding: [10, 10] } },
    nameGap: '2',
    splitNumber: 5,
    axisLine: {
      // 坐标轴轴线样式，可设置颜色、宽度等
      lineStyle: { color: 'rgba(9,107,166, 0.2)' }
    },
    splitLine: {
      // 分割线样式，用于划分刻度区间
      lineStyle: {
        width: 1,
        color: ['#096ba6', '#096ba6', 'rgba(9,107,166, 0.3)', 'rgba(9,107,166, 0.7)'].reverse()
      }
    },
    axisTick: {
      // 坐标轴刻度样式，可控制是否显示、长度等
      show: false,
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.5)'
      }
    },
    axisLabel: {
      // 坐标轴标签（刻度值相关显示，这里可根据需要调整）
      show: true,
    },
    indicator: [
      { name: '超速', max: 650 },
      { name: '抽烟', max: 1600 },
      { name: '拨打电话', max: 3000 },
      { name: '疲劳驾驶', max: 3800 },
    ],
    splitArea: {
      areaStyle: {
        color: ['RGBA(28, 55, 82, 1)', 'RGBA(31, 66, 99, 1)', 'RGBA(20, 55, 91, 1)', 'rgba(9,107,166, 0.4)',].reverse(),
        shadowColor: 'rgba(9,107,166, 0.5)',
        shadowBlur: 30,
        shadowOffsetX: 10,
        shadowOffsetY: 10
      }
    },

  },
  series: [{
    name: '报警数',
    type: 'radar',
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255, 107, 48, 1)',
          },
          {
            offset: 1,
            color: 'rgba(80, 194, 255, 1)',
          },
        ],
        global: false, //  缺省为  false
      }
    },
    symbol: 'circle',
    symbolSize: 12,
    itemStyle: { color: 'rgba(48, 176, 255, 1)', borderColor: 'rgba(255, 255, 255, 1)', borderWidth: 5, },
    lineStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(255, 107, 48, 1)',
          },
          {
            offset: 1,
            color: 'rgba(80, 194, 255, 1)',
          },
        ],
        global: false, //  缺省为  false
      }
      , width: 3
    },
    label: { show: false, },
    data: [[460, 1300, 1500, 2350]]
  }
  ]
})

const topOption = ref({
  grid: {
    left: '10%',
    top: '6%',
    bottom: '15%',
    right: '5%',
  },
  xAxis: {
    data: ['客运企业X', '客运企业X', '客运企业X', '客运企业X', '客运企业X'],
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255, 129, 109,.1)',
        width: 1, //这里是为了突出显示加上的
      },
    },
    axisLabel: {
      textStyle: {
        color: '#AEC1C8',
        fontSize: 30,
      },
    },
  },
  yAxis: [
    {
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 129, 109, 0.9)',
          width: 1, //这里是为了突出显示加上的
        },
      },
      axisLabel: {
        textStyle: {
          fontSize: 32,
          color: '#AEB8C0',
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: 'rgba(255,255,255,.5)',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
        },
      },
    },
  ],
  series: [
    {
      type: 'pictorialBar',
      barCategoryGap: '0%',
      symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#00FFC6',
              },
              {
                offset: 0.7,
                color: '#128ADE',
              },
              {
                offset: 1,
                color: 'rgba(12, 101, 110, 0)',
              },
            ],
            global: false, //  缺省为  false
          },
        },
        emphasis: {
          opacity: 1,
        },
      },
      data: [83, 80, 60, 58, 45],
    },
  ],
})

const lineOption = ref({
  grid: {
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '12%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: 'rgba(113, 113, 113, 1)',
      },
    },
    backgroundColor: 'rgba(42, 51, 74, 1)',
    borderColor: 'transparent',
    formatter: function (params) {
      let colors = ['rgba(124, 124, 191, 1)', 'rgba(233, 195, 116, 1)']
      let returnData = '<div style="padding: 5px 10px;">'
      returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: rgba(210, 221, 249, 1);">' + params[0].axisValue + '</span><br/>'
      for (let i = 0; i < params.length; i++) {
        returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + colors[i] + '"></span>'
        returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ' + colors[i] + '">' + params[i].seriesName + '：</span><span style="font-family: Verdana; font-size: 14px; color: ' + colors[i] + '">' + params[i].value + '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ' + colors[i] + '">车</span><br/>'
      }
      returnData += '</div>'
      return returnData
    }
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255, 129, 109,.1)',
      },
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      fontFamily: 'MicrosoftYaHei',
      color: '#AEC1C8',
      fontSize: 30,
    },
    axisTick: {
      show: false,
      alignWithLabel: true,
    },
    // boundaryGap: false,
    data: ['客运企业X', '客运企业X', '客运企业X', '客运企业X', '客运企业X'],
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisLine: {
      lineStyle: {
        color: 'rgba(255, 129, 109, 0.9)',
        width: 1, //这里是为了突出显示加上的
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontFamily: 'MicrosoftYaHei',
        fontSize: 32,
        color: '#AEB8C0',
      },
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: '计划量',
      type: 'line',
      showAllSymbol: true,
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        color: 'rgba(53, 176, 221, 1)',
        width: 5,
      },
      label: {
        show: false
      },
      itemStyle: {
        color: '#FFFFFF',
        borderColor: 'rgba(53, 176, 221, 1)',
        borderWidth: 5
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
                color: 'rgba(53, 176, 221, 0.68)',
              },
              {
                offset: 1,
                color: 'rgba(53, 176, 221, 0)',
              },
            ],
            false
          ),
          shadowColor: 'rgba(155, 155, 226, 0.8)',
          shadowBlur: 20,
        },
      },
      data: [80, 38, 60, 50, 20],
    }
  ],
})
</script>

<style scoped>
.content-tab-week {
  width: 100%;
  height: 100%;
}

:deep(.q-radio__label) {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #BBD5EB;
  line-height: 50px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

:deep(.q-radio__bg) {
  top: 10%;
  left: 25%;
  width: 100%;
  height: 100%;
}

:deep(.q-radio) {
  margin-right: 30px;
}

:deep(.q-radio__inner) {
  margin-right: 20px;
}

:deep(.q-radio__bg path) {
  fill: #007FB9;
}
</style>
