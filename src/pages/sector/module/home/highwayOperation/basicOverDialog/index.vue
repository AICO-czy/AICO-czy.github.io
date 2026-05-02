<template>
  <q-dialog seamless v-model="basicOverDialog.isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">公路网分析</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="chart-item">
          <item-title title="县级行政区公路分布" />
          <v-chart :option="option1" style="height: 400px; width: 100%;" />
        </div>
        <div class="chart-item">
          <item-title title="县级行政区桥隧分布" />
          <v-chart :option="option2" style="height: 400px; width: 100%;" />
        </div>
        <div class="chart-item">
          <item-title title="公路基础设施结构物健康监测分布" />
          <v-chart :option="option3" style="height: 380px; width: 100%;" />
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBasicOverDialogStore } from './store/index'
import ItemTitle from './components/itemTitle.vue'
import * as echarts from 'echarts'

const basicOverDialog = useBasicOverDialogStore()

const handleClose = () => {
  basicOverDialog.closeDialog()
}

const option1 = ref({
  legend: {
    data: ['丰宁县', '围场县', '隆化县', '平泉市', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区'],
    textStyle: {
      color: '#fff'
    },
    top: 20
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    },
    // formatter: (m) => {
    //    // 自定义
    // },
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.5)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 18,
      },
      data: ['丰宁县', '围场县', '隆化县', '平泉市', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        color: 'rgba(255,255,255,0.5)',
        fontSize: 20,
        formatter: (m: any) => {
          return Math.abs(m);
        },
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '郑州',
      type: 'bar',
      barWidth: 20,
      label: {
        show: true,
        position: 'top',
      },
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
                color: '#6FF2A4', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 151, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [709, 1917, 2455, 2610, 1719, 1433, 709, 1917, 2455, 2610, 1719, 1433],
    },
    {
      name: '许昌',
      type: 'bar',
      barWidth: 20,
      label: {
        show: true,
        position: 'top',
      },
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
                color: 'rgba(160, 249, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [1433, 1719, 2610, 2455, 1917, 709, 1433, 1719, 2610, 2455, 1917, 709],
    },
    {
      name: '开封',
      type: 'bar',
      barWidth: 20,
      label: {
        show: true,
        position: 'bottom',
        formatter: (m: any) => {
          return Math.abs(m.value);
        },
      },
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
                color: 'rgba(193, 198, 207, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(141, 147, 158, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
          barBorderRadius: 0,
        },
      },
      data: [327, 1776, 507, 1200, 800, 482, 327, 1776, 507, 1200, 800, 482],
    },
  ],
}
)
const option2 = ref({
  tooltip: {
    trigger: 'axis',
    formatter: function (params: any) {
      let res = params[0].axisValue + '<br>';
      params.forEach((item: any) => {
        let color = item.seriesName === '人数' ? '#ff0000' : '#000';
        res += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${item.color};"></span>`;
        res += `${item.seriesName}: `;
        res += `<span style="color:${color}">${item.data}</span><br>`;
      });
      return res;
    },
    axisPointer: { type: 'shadow' }
  },
  legend: {
    data: [{ name: '人数1', icon: 'rect' }, { name: '人数', icon: 'rect' },   // 修改为长方形图标
      ''],
    top: '5%',
  },
  xAxis: {
    data: ['202405', '202406', '202407', '202408', '202409', '202410',
      '202411', '202412', '202501', '202502', '202503', '202504'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: '#fff' },
    splitLine: { show: false, lineStyle: { type: 'dashed' } }
  },
  yAxis: [
    {
      type: 'value',
      name: '(人)',
      position: 'left',
      axisLabel: {
        color: '#fff',
        formatter: '{value}'
      },
      min: 0,  // ✅ 强制从0开始
      // max: 25  // ✅ 设置合适最大值
    },
    {
      type: 'value',
      name: '(万元)',
      position: 'right',
      axisLabel: {
        color: '#000',
        formatter: '{value}'
      },
      min: 0,    // ✅ 强制从0开始
      // max: 1.2,  // ✅ 根据数据最大值设置
      offset: 0 // ✅ 对齐右侧
    }
  ],
  color: ['#478af2'],
  series: [
    // 柱状图系列（主Y轴）
    {
      name: '人数',
      type: 'pictorialBar',
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: '50%', // ✅ 调整柱子间距
      symbol: 'triangle',
      itemStyle: {
        normal: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#6FF2A4', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 151, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [21, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 23],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '人数1',
      type: 'pictorialBar',
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: '50%', // ✅ 调整柱子间距
      symbol: 'triangle',
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
                color: 'rgba(160, 249, 255, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(51, 103, 154, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [23, 21, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
      z: 10,
      symbolOffset: [-10, 0] // ✅ 消除图标偏移
    },

    {
      name: 'glyph',
      type: 'pictorialBar',
      yAxisIndex: 0,
      barGap: '-100%',
      symbolPosition: 'end',
      symbolSize: 50,
      symbolOffset: [0, '-120%']
    }
  ]
})
const option3 = ref({
  // backgroundColor: '#1b1d21',
  legend: {
    icon: "rect",
    textStyle: {
      fontSize: 14,
      color: "rgba(255,255,255,.8)"
    },
    data: [{
      name: "桥梁监测",
      itemStyle: {
        color: "#35B0DD"
      }
    }, {
      name: "隧道监测",
      itemStyle: {
        color: "#CE855C"
      }
    }, {
      name: "边坡监测",
      itemStyle: {
        color: "#6BFD99"
      }
    }]
  },
  grid: {
    top: "10%",
    left: "5%",
    right: "5%",
    bottom: "10%",
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      lineStyle: {
        color: "#3763cd", //显示竖线颜色
        type: "solid",
      },
    },
    textStyle: {
      color: "#ffffff"
    }
  },
  xAxis: [
    {
      boundaryGap: false,
      type: "category",
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: "#485051",
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: "#fff",
          padding: 10,
          fontSize: 14,
        },

      },
      axisTick: {
        show: false,
      },
      data: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
    },
  ],
  yAxis: [
    {
      splitLine: {
        lineStyle: {
          color: "#485051",
        },
      },
      axisLine: {
        show: false,

      },
      axisLabel: {

        textStyle: {
          color: "#ffffff",
          padding: 10,
          fontSize: 14,
        },

      },
      axisTick: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '桥梁监测',
      type: "line",
      // smooth: true,
      // showSymbol: false, //圆点显隐
      lineStyle: {
        normal: {
          width: 2,
          color: "rgba(56, 222, 153, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(56, 222, 153, 1)',
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
                color: "rgba(56, 222, 153,0.5)",
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
      data: [22, 41, 45, 48, 55, 33, 44, 20, 34, 40, 47, 20],
    },
    {
      name: '隧道监测',
      type: "line",
      // smooth: true,
      // showSymbol: false, //圆点显隐
      lineStyle: {
        normal: {
          width: 2,
          color: "rgba(255, 160, 108, 1)", // 线条颜色
        },
      },
      itemStyle: {
        color: 'rgba(255, 160, 108, 1)',
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
                color: "rgba(255, 160, 108,0.5)",
              },
              {
                offset: 1,
                color: "rgba(255, 160, 108,0)",
              },
            ],
            false
          ),

        },
      },
      data: [41, 45, 48, 55, 33, 44, 20, 34, 40, 47, 20, 22],
    },
    {
      name: '边坡监测',
      type: "line",
      // smooth: true,
      // showSymbol: false,
      lineStyle: {
        normal: {
          width: 2,
          color: "rgba(117, 115, 244, 1)", // 线条颜色
        },
      },

      itemStyle: {
        color: 'rgba(117, 115, 244, 1)',
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
                color: "rgba(117, 115, 244,0.5)",
              },
              {
                offset: 1,
                color: "rgba(117, 115, 244,0)",
              },
            ],
            false
          ),


        },
      },
      data: [
        58, 18, 30, 25, 40, 62, 38, 37, 20, 30, 49, 60
      ],
    },

  ],
})
</script>

<style lang="scss" scoped>
.q-dialog__inner--minimized>div {
  max-width: 2095px !important;
  overflow: none !important;
  min-height: 1614px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1756px;
  height: 1648px;
  background: url("./images/切图 368.png") no-repeat 100%/100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 116px 70px 50px 76px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 60px;
  top: 60px;
}

.content-title {
  width: 300px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg, #FFFFFF 0%, #D6E7F7 57%, #D6E7F7 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 25px;
}

.content-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.chart-item {
  width: 1606px;
  height: 462px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
}
</style>
