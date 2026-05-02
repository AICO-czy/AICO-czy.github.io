<template>
  <q-dialog seamless v-model="highseedStore.isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">承平高速</div>
      <div class="content-close cursor-pointer" @click="handleClose"></div>
      <div class="content-box">
        <div class="content-box-one">
          <div class="w-full h-[64px] flex justify-between items-center mb-[30px]">
            <div>
              <div class="content-content-item-title">
                <div class="title">
                  承平高速车辆通行情况
                </div>
              </div>
            </div>
            <div class="flex items-center gap-[48px] h-full">
              <div class="content-box-one-tabs">
                <div class="content-box-one-tabs-item"
                  :class="{ 'content-box-one-tabs-item-active': activeTab === '今日' }" @click="activeTab = '今日'">今日</div>
                <div class="content-box-one-tabs-item"
                  :class="{ 'content-box-one-tabs-item-active': activeTab === '本月' }" @click="activeTab = '本月'">本月</div>
                <div class="content-box-one-tabs-item"
                  :class="{ 'content-box-one-tabs-item-active': activeTab === '上月' }" @click="activeTab = '上月'">上月</div>
              </div>
              <div class="clander-icon" @click="handleOpen('monthHeatmap')"></div>
            </div>
          </div>
          <div class="w-full" style="height: calc(100% - 84px);">
            <div class="content-box-one-header h-[40%] flex flex-col">
              <div class="flex-1 flex items-center">
                <div class="content-box-one-header-item">
                  <div></div>
                  <div class="content-box-one-header-char">
                    <v-chart autoresize :option="headerCharOneOption" style="height: 100px; width: 100%;" />
                  </div>
                  <div class="content-box-one-header-text"><span>累计<span class="text-[#2FE3FF]">入承</span>交通量:</span>
                  </div>
                  <div class="content-box-one-header-account">25,463辆</div>
                </div>
                <div class="content-box-one-header-car">
                  <img class="w-[152px] h-[54px]" src="icons/highwayOperation/highseed/images/切图 285.png" alt="">
                </div>
                <div class="content-box-one-header-item">
                  <div></div>
                  <div class="content-box-one-header-char">
                    <v-chart autoresize :option="headerCharTwoOption" style="height: 100px; width: 100%;" />
                  </div>
                  <div class="content-box-one-header-text"><span>累计<span class="text-[#2FE3FF]">客车</span>交通量:</span>
                  </div>
                  <div class="content-box-one-header-account-two">25,463辆</div>
                </div>
              </div>
              <div class="flex-1 flex items-center">
                <div class="content-box-one-header-item">
                  <div></div>
                  <div class="content-box-one-header-char">
                    <v-chart autoresize :option="headerCharOneOption" style="height: 100px; width: 100%;" />
                  </div>
                  <div class="content-box-one-header-text"><span>累计<span class="text-[#2FE3FF]">出承</span>交通量:</span>
                  </div>
                  <div class="content-box-one-header-account">926辆</div>
                </div>
                <div class="content-box-one-header-car">
                  <img class="w-[187px] h-[56px]" src="icons/highwayOperation/highseed/images/切图 286.png" alt="">
                </div>
                <div class="content-box-one-header-item">
                  <div></div>
                  <div class="content-box-one-header-char">
                    <v-chart autoresize :option="headerCharTwoOption" style="height: 100px; width: 100%;" />
                  </div>
                  <div class="content-box-one-header-text"><span>累计<span class="text-[#2FE3FF]">货车</span>交通量:</span>
                  </div>
                  <div class="content-box-one-header-account-two">926辆</div>
                </div>
              </div>
            </div>
            <div class="content-box-one-char h-[60%]">
              <v-chart autoresize :option="headerCharOptionBottom" style="height: 100%; width: 100%;" />
            </div>
          </div>
        </div>
        <div class="content-box-two">
          <div class="content-box-two-arrow" @click="handleOpen('transactionAnalysis')"></div>
          <div>
            <div class="content-content-item-title">
              <div class="title">
                京承往来动态
              </div>
            </div>
          </div>
          <div class="w-full flex" style="height: calc(100% - 84px);">
            <div class="w-[60%] h-full flex gap-[17px]">
              <div class="flex flex-col gap-[120px] mt-[60px] ">
                <div>
                  <img class="w-[152px] h-[54px]" src="icons/highwayOperation/highseed/images/切图 285.png" alt="">
                </div>
                <div>
                  <img class="w-[187px] h-[56px]" src="icons/highwayOperation/highseed/images/切图 286.png" alt="">
                </div>
              </div>
              <div class="flex-1 flex flex-col mx-[2px] mr-[5px]">
                <div class="flex items-center justify-between">
                  <div class="flex">
                    小客车<div class="text-icon" @click="tip[0] = true"></div>
                  </div>
                  <div class="flex items-center">
                    北京
                    <div class="arrow" />承德
                  </div>
                  <div class="flex num-text">
                    25,463辆
                    <div class="count-text">20%
                      <div class="arr"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[666px] h-[46px]">
                  <div v-if="tip[0]" class="text-warninfo">一类客车：车长小于6米且核定人数≤9人
                    <div class="close-btn" @click="tip[0] = false"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex">
                    小客车<div class="text-icon" @click="tip[1] = true"></div>
                  </div>
                  <div class="flex items-center">
                    承德
                    <div class="arrow" />北京
                  </div>
                  <div class="flex num-text">
                    25,463辆
                    <div class="count-text">20%
                      <div class="arr"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[666px] h-[46px]">
                  <div v-if="tip[1]" class="text-warninfo">一类客车：车长小于6米且核定人数≤9人
                    <div class="close-btn" @click="tip[1] = false"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex">
                    大客车<div class="text-icon" @click="tip[2] = true"></div>
                  </div>
                  <div class="flex items-center">
                    北京
                    <div class="arrow" />承德
                  </div>
                  <div class="flex num-text1">
                    25,463辆
                    <div class="count-text">20%
                      <div class="arr1"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[666px] h-[46px]">
                  <div v-if="tip[2]" class="text-warninfo">一类客车：车长小于6米且核定人数≤9人
                    <div class="close-btn" @click="tip[2] = false"></div>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex">
                    大客车<div class="text-icon" @click="tip[3] = true"></div>
                  </div>
                  <div class="flex items-center">
                    承德
                    <div class="arrow" />北京
                  </div>
                  <div class="flex num-text1">
                    25,463辆
                    <div class="count-text">20%
                      <div class="arr1"></div>
                    </div>
                  </div>
                </div>
                <div class="w-[666px] h-[46px]">
                  <div v-if="tip[3]" class="text-warninfo">一类客车：车长小于6米且核定人数≤9人
                    <div class="close-btn" @click="tip[3] = false"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[40%] h-full flex">
              <div class="h-full flex-1 count-car">
                <div class="title">
                  <div class="icon"></div>
                  <div class="name">京籍<span>入承</span></div>
                </div>
                <div class="chart">
                  <v-chart :option="option1" style="height: 220px; width: 220px;" />
                </div>
                <div class="car-bg">
                  <div class="car-num other-color">4247辆</div>
                  <div class="car-count">20%
                    <div class="arr"></div>
                  </div>
                </div>
              </div>
              <div class="h-full flex-1 count-car">
                <div class="title">
                  <div class="icon"></div>
                  <div class="name">京籍<span>出承</span></div>
                </div>
                <div class="chart">
                  <v-chart :option="option2" style="height: 220px; width: 220px;" />
                </div>
                <div class="car-bg">
                  <div class="car-num">1963辆</div>
                  <div class="car-count">20%
                    <div class="arr"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box-footer">
          <div class="content-box-footer-button">
            <div class="content-box-footer-button-item" @click="handleOpen('basicOverDialog')">
              <div class="content-box-footer-button-item-icon">
                <img class="w-full h-full" src="icons/highwayOperation/highseed/images/切图 7.png" alt="">
              </div>
              <div class="content-box-footer-button-item-text">基础信息</div>
            </div>
            <div class="content-box-footer-button-item" @click="handleOpen('jingcheng')">
              <div class="content-box-footer-button-item-icon">
                <img class="w-full h-full" src="icons/highwayOperation/highseed/images/切图 297.png" alt="">
              </div>
              <div class="content-box-footer-button-item-text">京承往来</div>
            </div>
          </div>
          <div class="content-box-footer-time">
            更新时间：2025/08/18 16:05:24
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex items-center gap-[48px] h-full">
      <div class="content-box-one-tabs">
        <div class="content-box-one-tabs-item ">今日</div>
        <div class="content-box-one-tabs-item">本月</div>
        <div class="content-box-one-tabs-item">上月</div>
      </div>
      <div class="clander-icon"></div>
    </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="content-box-two"></div>
    <div class="content-box-footer">
      <div class="content-box-footer-button">
        <div class="content-box-footer-button-item">
          <div class="content-box-footer-button-item-icon">
            <img class="w-full h-full" src="./images/切图 7.png" alt="">
          </div>
          <div class="content-box-footer-button-item-text">基础信息</div>
        </div>
        <div class="content-box-footer-button-item">
          <div class="content-box-footer-button-item-icon">
            <img class="w-full h-full" src="./images/切图 297.png" alt="">
          </div>
          <div class="content-box-footer-button-item-text">京承往来</div>
        </div>
      </div>
      <div class="content-box-footer-time">
        更新时间：2025/08/18 16:05:24
      </div>
    </div> -->
    <!-- </div> -->
    <!-- </div> -->
  </q-dialog>
</template>

<script setup lang="ts" name="highseedDialog">
import { useHighseedStore, useBaiseInfoDialogStore, useTransactionAnalysisStore, useDealingsJCStore, useHeatmapStore } from './store/index'
import * as echarts from 'echarts'
import { computed, ref } from 'vue'

const highseedStore = useHighseedStore()
const baiseInfoDialogStore = useBaiseInfoDialogStore()
const transactionAnalysisStore = useTransactionAnalysisStore()
const dealingsJCStore = useDealingsJCStore()
const heatmapStore = useHeatmapStore()

const handleClose = () => {
  highseedStore.closeDialog()
}

const activeTab = ref('今日')

// 图表配置
const headerCharOneOption = computed(() => {
  let max = 100;
  let value = 32;
  let rate = Math.round((value * 100) / max);

  return {
    backgroundColor: 'transparent',
    title: [
      {
        text: '{a|占比}\n{b|' + rate + '%}',
        show: true,
        x: 'center',
        y: 'center',
        textStyle: {
          rich: {
            a: {
              fontSize: 28,
              color: 'white',
              padding: [0, 0, 10, 0],
            },
            b: {
              fontSize: 28,
              color: 'white',
            },
          },
        },
      },
    ],
    polar: {
      center: ['50%', '50%'],
      radius: ['85%', '100%'],
    },
    angleAxis: {
      max: max,
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '',
        type: 'bar',
        roundCap: true,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(19, 84, 146, .4)',
        },
        data: [value],
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(255, 145, 110, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(243, 146, 126, 1)',
              },
              {
                offset: 1,
                color: 'rgba(255, 225, 154, 1)',
              },
            ]),
          },
        },
      },
      {
        name: '',
        type: 'gauge',
        radius: '54%',
        axisLine: {
          lineStyle: {
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(0, 182, 253, 0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 182, 253, .2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 182, 253, .4)',
                  },
                ]),
              ],
            ],
            width: 1,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [],
        pointer: {
          show: false,
        },
      },
    ],
  };
})

const headerCharTwoOption = computed(() => {
  let max = 100;
  let value = 32;

  let rate = Math.round((value * 100) / max);

  return {
    backgroundColor: 'transparent',
    title: [
      {
        text: '{a|占比}\n{b|' + rate + '%}',
        show: true,
        x: 'center',
        y: 'center',
        textStyle: {
          rich: {
            a: {
              fontSize: 28,
              color: 'white',
              padding: [0, 0, 10, 0],
            },
            b: {
              fontSize: 28,
              color: 'white',
            },
          },
        },
      },
    ],
    polar: {
      center: ['50%', '50%'],
      radius: ['85%', '100%'],
    },
    angleAxis: {
      max: max,
      show: false,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '',
        type: 'bar',
        roundCap: true,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(19, 84, 146, .4)',
        },
        data: [value],
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: 'rgba(99, 151, 213, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(116, 193, 243, 1)',
              },
              {
                offset: 1,
                color: 'rgba(214, 229, 255, 1)',
              },
            ]),
          },
        },
      },
      {
        name: '',
        type: 'gauge',
        radius: '54%',
        axisLine: {
          lineStyle: {
            color: [
              [
                1,
                new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: 'rgba(0, 182, 253, 0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0, 182, 253, .2)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 182, 253, .4)',
                  },
                ]),
              ],
            ],
            width: 1,
          },
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        itemStyle: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [],
        pointer: {
          show: false,
        },
      },
    ],
  };
})

const headerCharOptionBottom = computed(() => {
  // 收费站数据
  const data = {
    xdata: [
      '承德收费站', '承德南收费站', '承德北收费站', '承德西收费站'
    ],
    traffic: [
      350, 360, 280, 340  // 交通量数据（单位：辆）
    ],
    ratio: [
      35, 38, 28, 32  // 客货比数据（单位：%）
    ]
  }

  // Y轴配置
  const valueAxis = [
    {
      type: 'value',
      name: '单位:辆',
      nameTextStyle: {
        color: '#8BB4D6',
        fontSize: 24
      },
      splitNumber: 5,
      splitLine: {
        show: true,
        lineStyle: {
          color: ['rgba(139, 180, 214, 0.3)'],
          type: 'solid'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#8BB4D6',
        fontSize: 24
      }
    },
    {
      type: 'value',
      name: '单位:%',
      nameTextStyle: {
        color: '#8BB4D6',
        fontSize: 24
      },
      splitNumber: 5,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#8BB4D6',
        fontSize: 24
      }
    }
  ]

  // X轴配置
  const categoryAxis = [
    {
      type: 'category',
      data: data.xdata,
      axisLabel: {
        color: '#8BB4D6',
        fontSize: 24,
        interval: 0
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(139, 180, 214, 0.3)'
        }
      },
      axisTick: {
        show: false
      }
    }
  ]

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#4DA3FF',
      textStyle: {
        color: '#fff'
      },
      formatter: function (params: any) {
        let result = params[0].name + '<br/>';
        params.forEach((item: any) => {
          result += item.marker + ' ' + item.seriesName + ': ' + item.value + (item.seriesName === '交通量' ? '辆' : '%') + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['交通量', '客货比'],
      textStyle: {
        color: '#8BB4D6',
        fontSize: 24
      },
      top: 20,
      itemWidth: 30,
      itemHeight: 20
    },
    grid: {
      left: '8%',
      right: '8%',
      bottom: '15%',
      top: '20%',
      containLabel: true
    },
    xAxis: categoryAxis,
    yAxis: valueAxis,
    series: [
      {
        type: 'bar',
        name: '交通量',
        barWidth: 60,
        data: data.traffic,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#4DA3FF'
            },
            {
              offset: 1,
              color: 'rgba(77, 163, 255, 0.3)'
            }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#6BB6FF'
              },
              {
                offset: 1,
                color: 'rgba(107, 182, 255, 0.5)'
              }
            ])
          }
        }
      },
      {
        type: 'line',
        name: '客货比',
        data: data.ratio,
        smooth: false,
        symbolSize: 12,
        yAxisIndex: 1,
        lineStyle: {
          color: '#FF8C42',
          width: 4
        },
        itemStyle: {
          color: '#FF8C42',
          borderColor: '#fff',
          borderWidth: 2
        },
        symbol: 'circle',
        emphasis: {
          symbolSize: 16,
          itemStyle: {
            color: '#FFAB42'
          }
        }
      }
    ]
  };
})

// tip显隐
const tip = ref([true, false, false, false])

let angle = 0;//角度，用来做简单的动画效果的
let value = 78; //图上角度数据
const option1 = ref({
  // backgroundColor: "#061740",
  title: {
    text: '{a|' + value + '}{c|%}',
    x: 'center',
    y: 'center',
    textStyle: {
      rich: {
        a: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'bold'
        },
        c: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'normal'
        }
      }
    }
  },
  series: [
    //内环
    {
      name: "",
      type: 'custom',
      coordinateSystem: "none",
      renderItem: function (params: any, api: any) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: Math.min(api.getWidth(), api.getHeight()) / 2.3 * 0.65,
            startAngle: (0 + -angle) * Math.PI / 180,
            endAngle: (360 + -angle) * Math.PI / 180
          },
          style: {
            stroke: "#0CD3DB",
            fill: "transparent",
            lineWidth: 0.5
          },
          silent: true
        };
      },
      data: [0]
    },
    //外环
    {
      name: '',
      type: 'pie',
      radius: ['85%', '70%'],
      silent: true,
      clockwise: true,
      startAngle: (value / 2 * 3.6) + 45,
      z: 0,
      zlevel: 0,
      label: {
        normal: {
          position: "center",
        }
      },
      data: [
        {
          value: value,
          name: "",
          itemStyle: {
            normal: {
              //外环发光
              borderWidth: 0.5,
              shadowBlur: 20,
              borderColor: '#4bf3f9',
              shadowColor: '#9bfeff',
              color: { // 圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#4bf3f9', // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#4bf3f9', // 100% 处的颜色
                }]
              },
            }
          }
        },
        {
          value: 100 - value,
          name: "",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ]
    },
  ]
})


let value2 = 33; //图上角度数据
const option2 = ref({
  title: {
    text: '{a|' + value2 + '}{c|%}',
    x: 'center',
    y: 'center',
    textStyle: {
      rich: {
        a: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'bold'
        },
        c: {
          fontSize: 45,
          color: '#ffffff',
          fontWeight: 'normal'
        }
      }
    }
  },
  series: [
    //内环
    {
      name: "",
      type: 'custom',
      coordinateSystem: "none",
      renderItem: function (params: any, api: any) {
        return {
          type: 'arc',
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: Math.min(api.getWidth(), api.getHeight()) / 2.3 * 0.65,
            startAngle: (0 + -angle) * Math.PI / 180,
            endAngle: (360 + -angle) * Math.PI / 180
          },
          style: {
            stroke: "#0CD3DB",
            fill: "transparent",
            lineWidth: 0.5
          },
          silent: true
        };
      },
      data: [0]
    },
    //外环
    {
      name: '',
      type: 'pie',
      radius: ['85%', '70%'],
      silent: true,
      clockwise: true,
      startAngle: (value2 / 2 * 3.6) + 45,
      z: 0,
      zlevel: 0,
      label: {
        normal: {
          position: "center",
        }
      },
      data: [
        {
          value: value2,
          name: "",
          itemStyle: {
            normal: {
              //外环发光
              borderWidth: 0.5,
              shadowBlur: 20,
              borderColor: '#fdd295',
              shadowColor: '#fdd295',
              color: { // 圆环的颜色
                colorStops: [{
                  offset: 0,
                  color: '#fdd295', // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#f79279', // 100% 处的颜色
                }]
              },
            }
          }
        },
        {
          value: 100 - value2,
          name: "",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "transparent"
            }
          }
        }
      ]
    },
  ]
})

const $emit = defineEmits(['openDialog'])

function handleOpen(params: String) {
  $emit('openDialog', params)
  switch (params) {
    case 'basicOverDialog':
      baiseInfoDialogStore.openDialog()
      break;
    case 'jingcheng':
      dealingsJCStore.openDialog()
      highseedStore.closeDialog()
      break;
    case 'transactionAnalysis':
      transactionAnalysisStore.openDialog()
      break;
    case 'monthHeatmap':
      heatmapStore.openDialog()
      break;
    default:
      break;
  }
}
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
  width: 1869px;
  height: 1614px;
  background: url("./images/切图 284.png") no-repeat 100%/100%;
  position: fixed;
  left: 1700px;
  top: 380px;
  padding: 130px 70px 50px 70px;
  box-sizing: border-box;

  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 38px;
  color: #C3D3E2;
  line-height: 53px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
  right: 50px;
  top: 60px;
}

.content-title {
  width: 220px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg, #FFFFFF 0%, #D6E7F7 57%, #D6E7F7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 40px;
}

.content-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-box-one {
  width: 100%;
  height: 772px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  padding: 30px;
  box-sizing: border-box;
}

.content-box-two {
  width: 100%;
  height: 524px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
}

.content-box-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 71px;
}

.content-box-footer-button {
  display: flex;
  gap: 32px;
  align-items: center;
}

.content-box-footer-button-item {
  width: 284px;
  height: 71px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: url("./images/切图 109.png") no-repeat 100%/100%;
}

.content-box-footer-button-item-icon {
  width: 47px;
  height: 46px;
}

.content-box-footer-button-item-text {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  line-height: 51px;
  letter-spacing: 2px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #F4F8FF 0%, #96CDED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.content-box-footer-time {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 34px;
  color: #87ADD0;
  line-height: 48px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.content-content-item-title {
  background: url('assets/image/lefty/切图 48.png') no-repeat 100%/100%;
  height: 80px;
  width: 628px;
}

.title {
  font-weight: 400;
  font-size: 40px;
  color: #F2FEFF;
  line-height: 55px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding-left: 55px;
}

.content-box-one-tabs {
  display: flex;
}

.content-box-one-tabs-item {
  font-weight: 400;
  font-size: 32px;
  color: #E3F1FF;
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  width: 192px;
  height: 60px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 0px 0px 0px;
  text-align: center;
}

.content-box-one-tabs-item-active {
  font-weight: 400;
  font-size: 32px;
  color: #E3F1FF;
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  width: 192px;
  height: 60px;
  background: rgba(27, 123, 182, 0.50);
  border-radius: 0px 0px 0px 0px;
  text-align: center;
}

.clander-icon {
  width: 66px;
  height: 64px;
  background: url('./images/切图 287.png') no-repeat 100%/100%;
}

.content-box-one-header-item div:first-child {
  width: 23px;
  height: 22px;
  background: linear-gradient(158deg, #D0E5E5 0%, rgba(208, 229, 229, 0) 100%);
  border-radius: 50%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #60D9FF;
    border-radius: 50%;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.content-box-one-header-item {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 726px;
}

.content-box-one-header-char {
  width: 102px;
  height: 102px;
}

.content-box-one-header-text {
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: 400;
  font-size: 38px;
  color: #C3D3E2;
  line-height: 53px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.content-box-one-header-account {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 65px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #FFB579 0%, #FFEFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.content-box-one-header-account-two {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 65px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #FF7979 0%, #FFB8B8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.content-box-one-header-car {
  width: 210px;
  height: 100%;
  display: flex;
  align-items: center;
}

.content-box-two {
  padding: 30px;
  box-sizing: border-box;
  position: relative;
}

.content-box-two-arrow {
  width: 60px;
  height: 60px;
  background-image: url('assets/image/highwayOperation/双箭头.png');
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  pointer-events: auto;
}

.text-warninfo {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 32px;
  color: #6FF5FF;
  line-height: 46px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: url('./images/切图 293.png') no-repeat 100%/100%;
  width: 666px;
  height: 46px;
  padding-left: 22px;
  position: relative;

  .close-btn {
    background: url('./images/切图 294.png') no-repeat 100%/100%;
    width: 34px;
    height: 34px;
    position: absolute;
    right: -50px;
    top: -5px;
  }
}

.text-icon {
  width: 34px;
  height: 34px;
  background: url('./images/切图\ 292.png') no-repeat 100%/100%;
  margin: 0 2px;
  margin-top: -5px;
}

// E:\work\tocc-front -merge\src\assets\component\公路运营系统-承德市公路网_slices
.arrow {
  display: inline-block;
  width: 42px;
  height: 42px;
  background: url('assets/component/公路运营系统-承德市公路网_slices/切图\ 250.png') no-repeat 100%/100%;
  margin: 0 0px;
}

.num-text {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 6px;

  &>.count-text {
    margin-top: -12px;
    width: 118px;
    height: 53px;
    background: url('./images/切图 295.png') no-repeat 100%/100%;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 33px;
    // color: #FF9B83;
    line-height: 53px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    // background-clip: border-box;
    -webkit-text-fill-color: #FF9B83;
    display: flex;
    align-items: center;
    padding-left: 10px;

    &>.arr {
      width: 17px;
      height: 24px;
      background: url('./images/切图 296.png') no-repeat 100%/100%;
      margin-left: 5px;
    }


  }
}

.num-text1 {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  background: linear-gradient(90deg, #FF7979 0%, #FFB8B8 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 6px;

  &>.count-text {
    margin-top: -12px;
    width: 118px;
    height: 53px;
    background: url('./images/切图 295.png') no-repeat 100%/100%;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 33px;
    // color: #2AE8BD;
    line-height: 53px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    -webkit-text-fill-color: #2AE8BD;
    display: flex;
    align-items: center;
    padding-left: 10px;

    &>.arr {
      width: 17px;
      height: 24px;
      background: url('./images/切图 296.png') no-repeat 100%/100%;
      margin-left: 5px;
    }

    &>.arr1 {
      width: 17px;
      height: 24px;
      background: url('./images/切图 510.png') no-repeat 100%/100%;
      margin-left: 5px;
    }
  }
}

.count-car {
  &>.title {
    padding: 0 10px;
    display: flex;
    align-items: center;

    &>.icon {
      width: 23px;
      height: 23px;
      background: url('assets/component/公路运营系统-承德市公路网_slices/切图\ 240.png') no-repeat 100%/100%;
      margin-right: 60px;
    }

    &>.name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      font-style: normal;
      text-transform: none;

      &>span {
        color: #2FE3FF;
      }
    }
  }

  &>.chart {
    height: 220px;
    width: 220px;
    margin: 0 auto;
  }



  &>.car-bg {
    background: url('./images/切图 298.png') no-repeat 100%/100%;
    width: 275px;
    height: 95px;
    margin: 0 auto;
    position: relative;

    &>.car-num {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      line-height: 65px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .other-color {
      background: linear-gradient(51.63670243993558deg, #6BDCFF 0%, #54FBF1 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &>.car-count {
      position: absolute;
      top: -50px;
      right: -30px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 700;
      font-size: 33px;
      color: #FF9B83;
      line-height: 47px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: url('./images/切图 295.png') no-repeat 100%/100%;
      width: 118px;
      height: 53px;
      display: flex;
      align-items: center;
      padding-left: 20px;

      &>.arr {
        width: 17px;
        height: 24px;
        background: url('./images/切图 296.png') no-repeat 100%/100%;
        margin-left: 5px;
      }
    }
  }
}
</style>
