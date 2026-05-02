<!-- 执法人员弹窗 -->
<template>
  <div class="law-person-dialog">
    <div class="content-title">执法人员</div>
    <div class="content-close cursor-pointer" @click="handleClose"></div>
    <div class="content-box row">
      <div class="col-4 full-height pie-content row items-center">
        <v-chart ref="chartRef" :option="optionPie" class="fit" />
      </div>
      <div class="col-8 full-height pillar-content">
        <v-chart ref="chartRef" :option="optionBar" class="fit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, toRefs } from "vue";
import { useLawActiveDialogStore } from "../../../store/activeDialog";
import * as echarts from "echarts";

const activeDialogStore = useLawActiveDialogStore();
const { activeDialog } = toRefs(activeDialogStore);
// 关闭弹窗
function handleClose() {
  activeDialog.value = ''
}

const chartData = [{
  value: 300,
  name: '辅助'
},
{
  value: 435,
  name: '执政'
},
];

// 定义颜色列表：用于区分不同数据系列的颜色
const colorList = ['#2234D7', '#2DADFD']

// 计算数据总和：用于后续百分比计算
const sum = chartData.reduce((per, cur) => per + cur.value, 0)

// 定义环形间隙大小：控制饼图环与环之间的间隙
const gap = (1 * sum) / 100

// 处理饼图数据：生成带间隙的环形数据
const pieData1 = []
const pieData2 = []
const gapData = {
  name: '',
  value: gap,
  itemStyle: {
    color: 'transparent' // 间隙部分设为透明
  }
}
for (let i = 0; i < chartData.length; i++) {
  // 第一圈数据：外层环形，带圆角样式
  pieData1.push({
    ...chartData[i],
    itemStyle: {
      borderRadius: 0 // 环形区块的圆角
    }
  })
  pieData1.push(gapData)

  // 第二圈数据：内层半透明环形，用于视觉层次
  pieData2.push({
    ...chartData[i],
    itemStyle: {
      color: colorList[i],
      opacity: 0.21 // 半透明效果
    }
  })
  pieData2.push(gapData)
}
const optionPie = {
  title: [
    {
      text: '执法人员',
      x: 'center',
      top: '25%',
      textStyle: {
        color: '#BADCE8',
        fontSize: 38,
        fontWeight: '500',
      },
    },
    {
      text: '7892',
      x: 'center',
      top: '32%',
      textStyle: {
        fontSize: 60,
        color: '#FFFFFF',
        foontWeight: '500',
      },
    },
  ],
  legend: {
    orient: 'horizontal',
    top: '70%',
    left: 'center',
    // align: 'center',
    itemGap: 40,
    itemWidth: 20,
    itemHeight: 20,
    textStyle: {
      color: '#D0DEEA',
      fontSize: 30,
      rich: {
        name: {
          width: 120, // 名称部分固定宽度（根据你的name长度调整）
          align: 'left',
          fontSize: 30,
        },
        value: {
          align: 'right',
          fontSize: 30,
        }
      }
    },
    formatter: name => {
      const item = chartData.find(item => item.name === name);
      // 用 | 分隔两段文本，对应 rich 中的 key
      return `{name|${name}}{value| ${item.value} 件}`;
    },
    data: chartData.map(item => item.name)
  },
  grid: {
    top: 35,
    right: 30,
    bottom: 20,
    left: 30
  },
  color: colorList, // 图表颜色列表
  series: [{
    name: '执法装备',
    type: 'pie', // 饼图类型
    roundCap: true, // 环形端点圆角
    radius: ['50%', '62%'], // 外层环形的内外半径
    center: ['50%', '32%'], // 饼图中心位置
    label: {
      show: false
    }, // 隐藏标签
    labelLine: {
      show: false
    }, // 隐藏标签线
    data: pieData1 // 绑定外层环形数据
  },
  {
    type: 'pie',
    radius: ['50%', '42%'], // 内层半透明环形的内外半径
    center: ['50%', '32%'],
    gap: 1.71, // 环形间隙
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    silent: true, // 禁止交互
    data: pieData2 // 绑定内层半透明环形数据
  }
  ]
};

const yAxisData = ['市本级', '丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县']
const optionBar = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {
    data: ["辅助", "执政"],
    top: "4%",
    itemGap: 30,
    textStyle: {
      color: "#ffffff",
      fontSize: 30
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D8D8',
        width: 1,
        opacity: 0.2,
      },
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "#DAECF6",
        fontSize: 34,
      }
    }
  },
  yAxis: {
    type: 'category',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#D8D8D8',
        width: 1,
        opacity: 0.2,
      },
    },
    axisTick: {
      show: true
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#FFFFFF'
      }
    },
    axisLabel: {
      show: true,
      margin: 30,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    data: yAxisData
  },
  series: [
    {
      name: '辅助',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#2234D7"
        },
        {
          offset: 0.5,
          color: "#226AD7"
        },
        {
          offset: 1,
          color: "#83B5FF"
        }
        ])
      },
      data: [45, 24, 11, 12, 6, 5, 6, 6, 12]
    },
    {
      name: '执政',
      type: 'bar',
      stack: 'total',
      barWidth: 30,
      label: {
        show: true,
        fontSize: 30,
        color: '#ffffff'
      },
      emphasis: {
        focus: 'series'
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          offset: 0,
          color: "#2DADFD"
        },
        {
          offset: 0.5,
          color: "#40B4FD"
        },
        {
          offset: 1,
          color: "#83B5FF"
        }
        ])
      },
      data: [32, 15, 14, 14, 12, 12, 12, 12, 23]
    }
  ]
}
</script>

<style scoped lang="scss">
.law-person-dialog {
  width: 2240px;
  height: 996.75px;
  background: url("assets/image/dialog/切图 284.png");
  background-size: 100% 100%;
  position: fixed;
  left: 1903px;
  top: 211px;
  padding: 115px 80px 55px 80px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 70px;
  top: 50px;
}

.content-title {
  width: 350px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 0px;
}

.content-box {
  width: 100%;
  height: 100%;
}
</style>
