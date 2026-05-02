<template>
  <div class="base-info-bg">
    <div class="base-top">
      <div class="top-item">
        <div class="top-icon1"></div>
        <div class="top-count">16个</div>
        <div class="top-name">固定治超站</div>
      </div>
      <div class="top-line"></div>
      <div class="top-item">
        <div class="top-icon2"></div>
        <div class="top-count">0个</div>
        <div class="top-name">非现治超站</div>
      </div>
      <div class="top-line"></div>
      <div class="top-item">
        <div class="top-icon3"></div>
        <div class="top-count">16个</div>
        <div class="top-name">卡友驿站</div>
      </div>
    </div>
    <div class="base-bottom">
      <v-chart :option="option" autoplay style="height: 500px; width: 100%;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const option = ref({
  legend: {
    data: [{ name: '固定治超站', icon: 'rect' }, { name: '非现治超站', icon: 'rect' },   // 修改为长方形图标
      ''],
    top: '5%',
  },
  xAxis: {
    data: ['丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: '#fff' },
    splitLine: { show: false, lineStyle: { type: 'dashed' } }
  },
  yAxis: [
    {
      type: 'value',
      name: '个',
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
      name: '个',
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
      name: '非现治超站',
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
                color: '#0095FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 200, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [21, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '固定治超站',
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
                color: '#1EE7E7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [23, 21, 19, 18, 17, 16, 15, 14, 13, 12, 11],
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
</script>

<style lang="scss" scoped>
.base-info-bg {
  width: 1309px;
  height: 776px;
  background: url("assets/component/道水路运输系统-首页_slices/切图 644.png") no-repeat 100%/100%;
  padding-top: 24px;

  .base-top {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .top-line {
      background: url('assets/component/道水路运输系统-首页_slices/切图 673.png') no-repeat center/cover;
      width: 6px;
      height: 180px;
    }

    .top-item {
      .top-icon1 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc1.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon2 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc2.png') no-repeat center/cover;
        width: 147px;
        height: 120px;
      }

      .top-icon3 {
        background: url('assets/component/道水路运输系统-首页_slices/切图 244zc3.png') no-repeat center/cover;
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
}
</style>
