<template>
  <div class="training-bg">
    <div class="item-top card">
      <ItemTitle title="基本情况" />
      <div class="flex items-center justify-around px-[20px]">
        <div class="top-item">
          <div class="top-icon1"></div>
          <div class="top-count">124家</div>
          <div class="top-name">驾培机构</div>
        </div>
        <div class="top-line"></div>
        <div class="top-item">
          <div class="top-icon2"></div>
          <div class="top-count">124辆</div>
          <div class="top-name">教练车</div>
        </div>
        <div class="top-line"></div>
        <div class="top-item">
          <div class="top-icon3"></div>
          <div class="top-count">123人</div>
          <div class="top-name">教练员</div>
        </div>
      </div>
    </div>
    <div class="item-bg card">
      <ItemTitle title="驾驶培训机构分布" />
      <v-chart :option="pieOption" autoplay style="height: 400px; width: 100%;" />
    </div>
    <div class="item-bg card">
      <ItemTitle title="教练车分布" />
      <v-chart :option="pieOption1" autoplay style="height: 400px; width: 100%;" />
    </div>
    <div class="item-bg card">
      <ItemTitle title="教练员分布" />
      <v-chart :option="pieOption2" autoplay style="height: 400px; width: 100%;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemTitle from "../../../components/itemTitle.vue";

const pieOption = ref({})
let xAxisData = ['丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区']
let seriesData = [100, 200, 300, 120, 150, 200, 300, 120, 150, 200, 300]

let colors = '#1EE7E7'
pieOption.value = {
  // backgroundColor: '#09224e',
  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      return params[0].name + ': ' + params[0].value;
    }
  },
  xAxis: {
    data: xAxisData,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#37B6F2',
        opacity: 0.5,
      }
    },
    axisLabel: {
      textStyle: {
        color: '#ffffff',
      },
      // interval: 0,
      fontSize: 12,
    },
  },
  yAxis: {
    name: '单位：家   ',
    type: "value",
    splitLine: {
      show: true, lineStyle: {
        color: '#37B6F2',
        opacity: 0.1,
      }
    },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#ffffff',
      },
    }
  },
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '10%',
    symbolClip: true,
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      normal: {
        color: function (params) {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colors
            },
            {
              offset: 0.3,
              color: colors
            },
            {
              offset: 1,
              color: 'rgba(13,8,16,0)'
            }
            ],
            global: false //  缺省为  false
          }
        }
      },
      emphasis: {
        opacity: 1
      },
    },
    // 图形上方描述文字
    label: {
      show: false,
      position: 'top',
      offset: [0, 0],
      fontSize: 12,
      formatter: function (params) {
        let index = params.dataIndex
        let str = "{a" + index + "|" + params.value + "万人}";
        return str;
      },
      rich: {
        a0: {
          color: colors[0],
          align: "center",
        },
        a1: {
          color: colors[1],
          align: "center",
        },
        a2: {
          color: colors[2],
          align: "center",
        },
        a3: {
          color: colors[3],
          align: "center",
        },

      }
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: seriesData,
    z: 10
  }]
};

const pieOption1 = ref({})

let colors1 = '#FF856C'
pieOption1.value = {
  // backgroundColor: '#09224e',
  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      return params[0].name + ': ' + params[0].value;
    }
  },
  xAxis: {
    data: xAxisData,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#37B6F2',
        opacity: 0.5,
      }
    },
    axisLabel: {
      textStyle: {
        color: '#ffffff',
      },
      // interval: 0,
      fontSize: 12,
    },
  },
  yAxis: {
    name: '单位：辆   ',
    type: "value",
    splitLine: {
      show: true, lineStyle: {
        color: '#37B6F2',
        opacity: 0.1,
      }
    },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#ffffff',
      },
    }
  },
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '10%',
    symbolClip: true,
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      normal: {
        color: function (params) {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colors1
            },
            {
              offset: 0.3,
              color: colors1
            },
            {
              offset: 1,
              color: 'rgba(13,8,16,0)'
            }
            ],
            global: false //  缺省为  false
          }
        }
      },
      emphasis: {
        opacity: 1
      },
    },
    // 图形上方描述文字
    label: {
      show: false,
      position: 'top',
      offset: [0, 0],
      fontSize: 12,
      formatter: function (params) {
        let index = params.dataIndex
        let str = "{a" + index + "|" + params.value + "万人}";
        return str;
      },
      rich: {
        a0: {
          color: colors[0],
          align: "center",
        },
        a1: {
          color: colors[1],
          align: "center",
        },
        a2: {
          color: colors[2],
          align: "center",
        },
        a3: {
          color: colors[3],
          align: "center",
        },

      }
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: seriesData,
    z: 10
  }]
};
const pieOption2 = ref({})

let colors2 = '#0095FF'
pieOption2.value = {
  // backgroundColor: '#09224e',
  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    },
    formatter: function (params) {
      return params[0].name + ': ' + params[0].value;
    }
  },
  xAxis: {
    data: xAxisData,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#37B6F2',
        opacity: 0.5,
      }
    },
    axisLabel: {
      textStyle: {
        color: '#ffffff',
      },
      // interval: 0,
      fontSize: 12,
    },
  },
  yAxis: {
    name: '单位：人   ',
    type: "value",
    splitLine: {
      show: true, lineStyle: {
        color: '#37B6F2',
        opacity: 0.1,
      }
    },
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#ffffff',
      },
    }
  },
  series: [{
    name: 'hill',
    type: 'pictorialBar',
    barCategoryGap: '10%',
    symbolClip: true,
    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
    itemStyle: {
      normal: {
        color: function (params) {
          return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: colors2
            },
            {
              offset: 0.3,
              color: colors2
            },
            {
              offset: 1,
              color: 'rgba(13,8,16,0)'
            }
            ],
            global: false //  缺省为  false
          }
        }
      },
      emphasis: {
        opacity: 1
      },
    },
    // 图形上方描述文字
    label: {
      show: false,
      position: 'top',
      offset: [0, 0],
      fontSize: 12,
      formatter: function (params) {
        let index = params.dataIndex
        let str = "{a" + index + "|" + params.value + "万人}";
        return str;
      },
      rich: {
        a0: {
          color: colors[0],
          align: "center",
        },
        a1: {
          color: colors[1],
          align: "center",
        },
        a2: {
          color: colors[2],
          align: "center",
        },
        a3: {
          color: colors[3],
          align: "center",
        },

      }
    },
    emphasis: {
      itemStyle: {
        opacity: 1
      }
    },
    data: seriesData,
    z: 10
  }]
};

</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
  padding-left: 30px;
}

.training-bg {
  overflow-y: auto;
  height: 1070px;
  padding-right: 6px;

  //滚动条样式
  &::-webkit-scrollbar {
    width: 12px;
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(125, 188, 255, 0.34);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 34, 64, 0.08);
    border-radius: 6px;
  }

  .item-top {
    background: url('assets/component/道水路运输系统-首页_slices/切图 674.png') no-repeat center/cover;
    width: 1309px;
    height: 357px;

    .top-line {
      background: url('assets/component/道水路运输系统-首页_slices/切图 673.png') no-repeat center/cover;
      width: 6px;
      height: 146px;
    }

    .top-item {
      .top-icon1 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 2441.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon2 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 2442.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon3 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 2443.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-count {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 50px;
        // line-height: 70px;
        letter-spacing: 1px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        height: 50px;
      }

      .top-name {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 40px;
        color: #A3D9FF;
        // line-height: 45px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  .item-bg {
    background: url('assets/component/道水路运输系统-首页_slices/切图 675.png') no-repeat center/cover;
    width: 1309px;
    height: 509px;
    margin-top: 16px;
  }
}
</style>
