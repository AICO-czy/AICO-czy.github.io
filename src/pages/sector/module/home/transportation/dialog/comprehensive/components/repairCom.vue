<template>
  <div class="repair-bg">
    <div class="item1">
      <ItemTitle title="基本情况" />
      <div class="flex items-center justify-around px-[50px] pr-[80px] pt-[10px]">
        <div class="flex">
          <div class="icon"></div>
          <div>
            <div class="item1-count">58家</div>
            <div class="item1-name">汽修业户</div>
          </div>
        </div>
        <div class="line"></div>
        <div>
          <div class="title-icon list1-item">一类维修业户：<span class="list-item-count">10</span><span class="unit">家</span>
          </div>
          <div class="title-icon list1-item">二类维修业户：<span class="list-item-count">15</span><span class="unit">家</span>
          </div>
          <div class="title-icon list1-item">三类维修业户：<span class="list-item-count">33</span><span class="unit">家</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item2">
      <ItemTitle title="维修业户分布" />
      <v-chart :option="pieOption" autoplay style="height: 500px; width: 100%;" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ItemTitle from "../../../components/itemTitle.vue";

const pieOption = ref({
  legend: {
    data: ['一类维修业户', '二类维修业', '三类维修业'],
    top: '20%',
    right: "20%",
    itemGap: 25,
    textStyle: {
      color: "rgba(198, 206, 207, 1)",
      fontSize: 32,
      fontFamily: "SourceHanSansRegular",
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      textStyle: {
        color: '#fff',
      },
    }
  },
  grid: {
    left: "1.5%",
    right: "1%",
    bottom: "15%",
    top: "15%",
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: false,
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
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 26,
        },
      },
      data: ['丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区','双滦区','营子区'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: "单位：家",
      nameLocation: "end",
      nameGap: 20,
      nameTextStyle: {
        color: "#C6CECF",
        fontSize: 30,
        padding: [0, 50, 0, 0],
      },
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
        show: true,
        textStyle: {
          color: "#AEC1C8",
          fontSize: 30,
        },
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '一类维修业户',
      type: 'bar',
      barWidth: 10,
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
                color: 'rgba(136, 165, 235, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(102, 130, 200, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [180, 100, 170, 130, 150, 200, 120, 160, 140],
    },
    {
      name: '二类维修业',
      type: 'bar',
      barWidth: 10,
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
                offset: 0.5,
                color: 'rgba(69, 153, 237, 1)', // 100% 处的颜色
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
      data: [120, 60, 100, 90, 100, 120, 70, 100, 90],
    },
    {
      name: '三类维修业',
      type: 'bar',
      barWidth: 10,
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
                offset: 0.5,
                color: 'rgba(164, 170, 182, 1)', // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(141, 147, 158, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      data: [80, 40, 70, 60, 70, 90, 50, 80, 70],
    }
  ],
});

</script>

<style lang="scss" scoped>
.item1 {
  background: url('assets/component/道水路运输系统-首页_slices/切图 665.png') no-repeat center/cover;
  width: 1310px;
  height: 453px;
  padding: 30px;

  .line {
    background: url('assets/component/道水路运输系统-首页_slices/切图 672.png') no-repeat center/cover;
    width: 6px;
    height: 210px;
  }

  .icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 244.png') no-repeat center/cover;
    width: 147px;
    height: 120px;
  }

  .item1-name {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 40px;
    color: #A3D9FF;
    line-height: 55px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  .item1-count {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 50px;
    line-height: 70px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .list1-item {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 42px;
    color: #A3D9FF;
    line-height: 58px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 10px;

    .list-item-count {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 52px;
      line-height: 71px;
      text-align: right;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .unit {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 41px;
      color: #EEF8FF;
      line-height: 57px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 20px;
    }
  }
}

.item2 {
  margin-top: 15px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 666.png') no-repeat center/cover;
  width: 1310px;
  height: 610px;
  padding: 30px;
}

.title-icon {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    width: 22.62px;
    height: 22.31px;
    background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}
</style>
