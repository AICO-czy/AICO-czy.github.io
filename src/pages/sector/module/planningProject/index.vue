<template>
  <dialog-com title="规划期内建设项目情况" ref="dialogRef" @switchBtn="handleSwitchBtn" @switchLink="handleSwitchLink">
    <div class="body-box" v-if="active">
      <div style="display: flex;margin-top: 25px;">
        <item-com title="项目数据分布" style="width: 710px; height: 439px;">
          <v-chart :option="pieOption1" style="height: 300px; width: 100%;" />
        </item-com>
        <item-com title="总体进度完成情况" style="width: 455px; height: 439px;margin:0 20px">
          <v-chart :option="pieOption2" style="height: 300px; width: 100%;" />
        </item-com>
        <item-com title="分项产值进度情况" style="width: 748px; height: 439px;">
          <v-chart :option="pieOption3" style="height: 300px; width: 100%;" />
        </item-com>
      </div>
      <div style="display: flex;margin-top: 20px;">
        <item-com title="分项项目状态统计" style="width: 999px; height: 439px;margin-right: 20px">
          <v-chart :option="option4" style="height: 300px; width: 100%;" />
        </item-com>
        <item-com title="年度进度完成情况" style="width: 934px; height: 439px;">

          <v-chart :option="option5" style="height:300px; width: 100%;" />
        </item-com>
      </div>
    </div>
    <div class="body-box bg1" v-else>
      <!-- 表格头部 -->
      <div class="table-head">
        <div class="table-head-item" v-for="item in header">{{ item.title }}</div>
      </div>
      <!-- 表格内容 -->
      <div class="table-body" v-for="(item, index) in tableData">
        <div v-for="it in header" class="table-body-item">{{ item[it.value] }}</div>
      </div>
    </div>
  </dialog-com>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogCom from './components/dialogCom.vue'
import ItemCom from './components/itemCom.vue'
import { useRightAcountStore } from '../../store/rightAcount'
import * as echarts from 'echarts'

const props = defineProps({
  dialogData: {
    type: Object,
    default: () => { }
  }
})

const rightAcountStore = useRightAcountStore()

const dialogRef = ref<InstanceType<typeof DialogCom> | null>(null)

const active = ref(true)

// 第一个饼状图配置
const pieOption1 = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {d}%' // 鼠标悬浮提示
  },
  legend: {
    orient: 'vertical',
    right: '1%',
    top: 'middle',
    align: 'left',
    textStyle: {
      color: '#fff',
      fontSize: 22,
    },
    formatter: (name: string) => {
      let value = 0;
      (pieOption1.value.series as any)[0].data.forEach((item: any) => {
        if (item.name === name) {
          value = item.value;
        }
      });
      return `${name}   ${value} %`;
    }
  },
  series: [
    {
      name: '公路分类',
      type: 'pie',
      radius: ['55%', '70%'], // 内外环半径
      center: ['20%', '50%'], // 图偏左，留空间给右边图例
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        formatter: (params: any) => {
          if (params.name === '普通干线公路') {
            return `{a|${params.name}}\n{b|${params.value}%}`;
          }
          return '';
        },
        rich: {
          a: {
            fontSize: 20,
            color: '#fff',
            // lineHeight: 18
          },
          b: {
            fontSize: 22,
            color: '#38f3ff',
            fontWeight: 'bold',
            // lineHeight: 18
          }
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 50.76, name: '高速公路', itemStyle: { color: '#FFD700' } },
        { value: 38.61, name: '普通干线公路', itemStyle: { color: '#4FACFE' } },
        { value: 4.7, name: '农村公路', itemStyle: { color: '#00E08B' } },
        { value: 4.17, name: '公路运输枢纽工程', itemStyle: { color: '#008BFF' } },
        { value: 1.74, name: '公路养护工程', itemStyle: { color: '#00CED1' } }
      ]
    }
  ]
})

const option2Data = ref(84)

// 第二个图表配置
const pieOption2 = ref({
  title: {
    text: `进度完成情况\n${option2Data.value}%`,
    x: 'center',
    y: 'center',
    textStyle: {
      fontSize: 30,
      fontWeight: 'normal',
      color: '#fff',
      rich: {
        a: {
          fontSize: 30,
          color: '#fff',
          lineHeight: 24
        },
        b: {
          fontSize: 40,
          color: '#38f3ff',
          fontWeight: 'bold'
        }
      }
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['70%', '80%'],
      center: ['50%', '50%'],
      silent: true,
      label: { show: false },
      labelLine: { show: false },
      data: [
        {
          value: option2Data.value,
          name: '完成率',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#3FA7FF' },
                { offset: 1, color: '#00F5FF' }
              ]
            }
          }
        },
        {
          value: 16,
          name: '未完成',
          itemStyle: {
            color: 'rgba(255, 255, 255, 0.1)' // 背景灰色环
          }
        }
      ]
    }
  ]
})

// 第二个图表配置
const pieOption3 = ref({
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'middle',
    width: '10',
    textStyle: {
      color: '#fff',
      fontSize: 30,
      rich: {
        name: { width: 120, fontSize: 30, color: '#fff' }, // 左边列
        value: { width: 100, fontSize: 30, color: '#fff' } // 右边列
      }
    },
    formatter: function (name: string) {
      const dataMap:any = {
        '高速公路': '23% 19亿元',
        '逾干线公路': '22% 16亿元',
        '农村公路': '19% 15亿元',
        '公路运输枢纽工程': '15% 12亿元',
        '公路养护工程': '12% 10亿元'
      };
      return '{name|' + name + '}' + '{value|' + dataMap[name] + '}';
    }
  },
  series: [
    // 高速公路
    {
      type: 'pie',
      radius: ['72%', '80%'], // 环的宽度统一
      center: ['25%', '50%'],
      label: { show: false },
      silent: true, clockwise: false,
      data: [
        { value: 23, name: '高速公路', itemStyle: { color: '#f7ba2a' } },
        { value: 100 - 23, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
      ]
    },
    // 逾干线公路
    {
      type: 'pie',
      radius: ['60%', '68%'],
      center: ['25%', '50%'],
      label: { show: false },
      silent: true, clockwise: false,
      data: [
        { value: 22, name: '逾干线公路', itemStyle: { color: '#3aa1ff' } },
        { value: 100 - 22, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
      ]
    },
    // 农村公路
    {
      type: 'pie',
      radius: ['48%', '56%'],
      center: ['25%', '50%'],
      label: { show: false },
      silent: true, clockwise: false,
      data: [
        { value: 19, name: '农村公路', itemStyle: { color: '#36cbcb' } },
        { value: 100 - 19, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
      ]
    },
    // 公路运输枢纽工程
    {
      type: 'pie',
      radius: ['36%', '44%'],
      center: ['25%', '50%'],
      label: { show: false },
      silent: true, clockwise: false,
      data: [
        { value: 15, name: '公路运输枢纽工程', itemStyle: { color: '#4ecb73' } },
        { value: 100 - 15, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
      ]
    },
    // 公路养护工程
    {
      type: 'pie',
      radius: ['24%', '32%'],
      center: ['25%', '50%'],
      label: { show: false },
      silent: true, clockwise: false,
      data: [
        { value: 12, name: '公路养护工程', itemStyle: { color: '#8b5cf6' } },
        { value: 100 - 12, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
      ]
    }
  ]
})

const option4Data = ref([
  {
    "projectType": "高速公路",
    "totalInvestment": 286.505,
    "completedInvestment": 249.992,
    "completedRatio": 87.26,
    "completedCount": 1,
    "inProgressCount": 1,
    "unfinishedCount": 0
  },
  {
    "projectType": "互通",
    "totalInvestment": 4.094,
    "completedInvestment": 3.334,
    "completedRatio": 81.44,
    "completedCount": 1,
    "inProgressCount": 1,
    "unfinishedCount": 0
  },
  {
    "projectType": "普通干线公路",
    "totalInvestment": 235.273,
    "completedInvestment": 96.707,
    "completedRatio": 41.10,
    "completedCount": 11,
    "inProgressCount": 8,
    "unfinishedCount": 5
  },
  {
    "projectType": "公路运输枢纽工程",
    "totalInvestment": 49.018,
    "completedInvestment": 18.146,
    "completedRatio": 37.02,
    "completedCount": 6,
    "inProgressCount": 4,
    "unfinishedCount": 0
  },
  {
    "projectType": "农村公路",
    "totalInvestment": 0,
    "completedInvestment": 75.417,
    "completedRatio": 0,
    "completedCount": 0,
    "inProgressCount": 0,
    "unfinishedCount": 0
  },
  {
    "projectType": "公路养护工程",
    "totalInvestment": 0,
    "completedInvestment": 17.635,
    "completedRatio": 0,
    "completedCount": 0,
    "inProgressCount": 0,
    "unfinishedCount": 0
  }
])

const option4 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  legend: {
    top: 0,
    textStyle: {
      color: '#fff',
      fontSize: 30,
    },
    data: ['已建', '在建', '待建']
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: '5%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: option4Data.value.map(item => item.projectType),
    axisLine: {
      lineStyle: { color: '#ccc' }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 30,
    }
  },
  yAxis: {
    type: 'value',
    min: 0, // 保证从0开始
    axisLine: { show: false }, // 去掉Y轴轴线
    axisTick: { show: false }, // 去掉刻度
    splitLine: { show: false },
    // splitLine: {
    //     show: true,
    //     lineStyle: {
    //         color: 'rgba(255,255,255,0.15)'
    //     }
    // },
    axisLabel: {
      color: '#fff',
      fontSize: 30,
    }
  },
  series: [
    {
      name: '已建',
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#6ef7a3' },  // 顶部亮
          { offset: 0.5, color: '#32d680' },
          { offset: 1, color: '#12884d' }   // 底部暗
        ])
      },
      data: option4Data.value.map(item => item.completedCount)
    },
    {
      name: '在建',
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#66ccff' },  // 顶部亮
          { offset: 0.5, color: '#3399ff' },
          { offset: 1, color: '#0066cc' }   // 底部暗
        ])
      },
      data: option4Data.value.map(item => item.inProgressCount)
    },
    {
      name: '待建',
      type: 'bar',
      barWidth: 14,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#f0f0f0' },  // 顶部亮
          { offset: 0.5, color: '#c0c0c0' },
          { offset: 1, color: '#7a7a7a' }   // 底部暗
        ])
      },
      data: option4Data.value.map(item => item.unfinishedCount)
    }
  ]
})

const option5 = ref({
  title: {
    text: '公路相关工程数据统计',
    left: 'center',
    textStyle: {
      color: '#fff' // 标题文字颜色，适配深色背景
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    backgroundColor: 'rgba(10, 20, 40, 0.8)', // 提示框背景
    borderColor: '#337ab7',
    textStyle: {
      color: '#fff'
    }
  },
  legend: {
    data: ['高速公路', '普通干线公路', '农村公路', '公路养护工程'],
    top: '10%',
    textStyle: {
      color: '#ccc' // 图例文字颜色
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['2021年', '2022年', '2023年', '2024年', '2025年'],
    axisLabel: {
      color: '#ccc'
    },
    axisLine: {
      lineStyle: {
        color: '#444'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#444'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: '完成投资额(亿元)',
    nameTextStyle: {
      color: '#ccc'
    },
    axisLabel: {
      color: '#ccc',
      formatter: '{value}'
    },
    axisLine: {
      lineStyle: {
        color: '#444'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  series: [
    {
      name: '高速公路',
      type: 'bar',
      data: [65, 72, 80, 95, 110],
      itemStyle: {
        color: '#1890ff'
      },
      barWidth: '15%' // 柱子宽度
    },
    {
      name: '普通干线公路',
      type: 'bar',
      data: [45, 50, 58, 65, 75],
      itemStyle: {
        color: '#2fc25b'
      },
      barWidth: '15%'
    },
    {
      name: '农村公路',
      type: 'bar',
      data: [30, 35, 42, 50, 60],
      itemStyle: {
        color: '#facc15'
      },
      barWidth: '15%'
    },
    {
      name: '公路养护工程',
      type: 'bar',
      data: [25, 30, 38, 45, 55],
      itemStyle: {
        color: '#f59e0b'
      },
      barWidth: '15%'
    }
  ],
})

const header = [
  { title: '类型', value: 'projectType' },
  { title: '序号', value: 'index' },
  { title: '县级行政区', value: 'areaName' },
  { title: '项目名称', value: 'projectName' },
  { title: '长度/面积', value: 'constructionScale' },
  { title: '总投资/亿元', value: 'investment' },
  { title: '工作任务', value: '' },
]

const tableData: any[any] = ref([
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
  { projectType: '高速公路',index:1, areaName: '围场', projectName: '承平高速', constructionScale: 306, investment: '146.1', h: '双向六车道标准，里程59公里，已通车' },
])

function handleSwitchBtn() {
  active.value = !active.value
}

function handleSwitchLink() {
  rightAcountStore.openDialog()
}

function show() {
  dialogRef.value?.show()
  console.log('弹窗显示');
  if (!props.dialogData) return
  tableData.value = props.dialogData.allList
  option4Data.value = props.dialogData.typeGroup.typeList
  option2Data.value = props.dialogData.typeGroup.completedInvestmentRatio
}

function close() {
  dialogRef.value?.close()
}

defineExpose({
  show,
  close
})

</script>

<style scoped lang="scss">
.body-box {
  // background: pink;
  height: 100%;
  font-size: 50px;
}

.bg1 {
  background: url('assets/image/lefty/切图 140.png') no-repeat center/cover;
  width: 1952px;
  height: 969px;
  padding: 0 40px;

  .table-head {
    height: 71px;
    display: flex;
    margin-top: 60px;
    margin-bottom: 40px;

    .table-head-item {
      font-family: AlibabaPuHuiTiRegular;
      font-weight: 500;
      font-size: 34px;
      color: #BBD5EB;
      line-height: 71px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      height: 71px;
      flex: 1;
    }
  }

  .table-body {
    display: flex;

    .table-body-item {
      font-family: AlibabaPuHuiTiRegular;
      font-weight: 400;
      font-size: 30px;
      color: #BBD5EB;
      line-height: 41px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      height: 100px;
      flex: 1;
      border-bottom: 1px solid #8CB2E7;
    }
  }
}
</style>
