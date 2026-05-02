<template>
  <div class="lease-bg">
    <div class="item1">
      <ItemTitle title="基本情况" />
      <div class="flex items-center justify-around px-[30px] pr-[80px] pt-[10px]">
        <div class="item1-left flex">
          <div class="icon1"></div>
          <div>
            <div class="item-count">124家</div>
            <div class="item-name">租赁企业</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="item1-right flex">
          <div class="icon2"></div>
          <div>
            <div class="item-count">518辆</div>
            <div class="item-name">租赁车辆</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item2">
      <ItemTitle title="县区业户分布" />
      <v-chart :option="pieOption" autoplay style="height: 500px; width: 100%;" />
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
              color: 'rgba(83, 243, 228, 1)'
            },
            {
              offset: 0.25,
              color: 'rgba(0, 255, 198, 1)'
            },
            {
              offset: 0.5,
              color: 'rgba(11, 184, 212, 1)'
            },
            {
              offset: 0.75,
              color: 'rgba(17, 88, 126, 1)'
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
.lease-bg {
  .item1 {
    background: url('assets/component/道水路运输系统-首页_slices/切图 677.png') no-repeat center/cover;
    width: 1309px;
    height: 453px;
    padding: 30px;

    .line {
      background: url('assets/component/道水路运输系统-首页_slices/切图 676.png') no-repeat center/cover;
      width: 6px;
      height: 210px;
    }

    .icon1 {
      background: url('assets/component/道水路运输系统-首页_slices/切图 2444.png') no-repeat center/cover;
      width: 147px;
      height: 120px;
      margin-right: 50px;
    }

    .icon2 {
      background: url('assets/component/道水路运输系统-首页_slices/切图 2445.png') no-repeat center/cover;
      width: 147px;
      height: 120px;
      margin-right: 50px;
    }

    .item-count {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      line-height: 70px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .item-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 40px;
      color: #A3D9FF;
      line-height: 55px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }

  .item2 {
    margin-top: 15px;
    background: url('assets/component/道水路运输系统-首页_slices/切图 678.png') no-repeat center/cover;
    width: 1309px;
    height: 610px;
    padding: 30px;
  }
}
</style>
