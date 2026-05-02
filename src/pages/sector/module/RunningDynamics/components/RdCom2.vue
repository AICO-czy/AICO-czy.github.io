<template>
  <div class="chart-box">
    <div class="title">交调站交通量TOP5</div>
    <div class="dw">单位:辆</div>
    <v-chart :option="pieOption" style="height: 220px; width: 100%;" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const data = {
  xdata: ['交调站1', '交调站2', '交调站3', '交调站4', '交调站5'],
  ydata: [10, 50, 22, 5, 15]
}

const colors = [
  {
    type: 'linear',
    x: 0, x2: 1, y: 0, y2: 0,
    colorStops: [{
      offset: 0,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 104, 171, 1)'
    }, {
      offset: 1,
      color: 'rgba(0, 104, 171, 1)'
    }]
  },
  {
    type: 'linear',
    x: 0, x2: 1, y: 0, y2: 0,
    colorStops: [{
      offset: 0,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 104, 171, 1)'
    }, {
      offset: 1,
      color: 'rgba(0, 104, 171, 1)'
    }]
  },
  {
    type: 'linear',
    x: 0, x2: 1, y: 0, y2: 0,
    colorStops: [{
      offset: 0,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 104, 171, 1)'
    }, {
      offset: 1,
      color: 'rgba(0, 104, 171, 1)'
    }]
  },
  {
    type: 'linear',
    x: 0, x2: 1, y: 0, y2: 0,
    colorStops: [{
      offset: 0,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 104, 171, 1)'
    }, {
      offset: 1,
      color: 'rgba(0, 104, 171, 1)'
    }]
  },
  {
    type: 'linear',
    x: 0, x2: 1, y: 0, y2: 0,
    colorStops: [{
      offset: 0,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 74, 121, 1)'
    }, {
      offset: 0.5,
      color: 'rgba(0, 104, 171, 1)'
    }, {
      offset: 1,
      color: 'rgba(0, 104, 171, 1)'
    }]
  }
];
const renderItem = function (params, api) {

  var yValue = api.value(1);
  var start = api.coord([api.value(0), yValue]);
  var size = api.size([api.value(1) - api.value(0), yValue]);
  var style = api.style();
  // 可以建泰定义


  // 最右边的点坐标
  var width = size[0] * 0.3
  var x = start[0] - width / 2;
  var y = start[1];

  var bottomHeight = 20;

  var points = [
    [x + width / 2, y],
  ];

  // 左边的坐标点
  points.push([x, size[1] + y]);

  points.push([x + width / 2, size[1] + y + bottomHeight]);

  // 右边的坐标点
  points.push([x + width, size[1] + y]);

  var group = {
    type: 'group',
    children: [{
      // 顶部
      z2: 3,
      type: 'polygon',
      shape: {
        points: points
      },
      style: style
    }],
  };
  return group;
}


const pieOption = ref({
  // backgroundColor: '#020F37',
  xAxis: {
    data: data.xdata,
    offset: 20,
    axisLabel: {
      color: '#C8D1D9',
      fontSize: 30,
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
  },
  yAxis: [
    {
      show: true,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },

      axisLabel: {
        show: true,
        fontSize: 32,
        color: '#C8D1D9'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#C8D1D9',
          width: 2
        }
      },
    },

  ],
  grid: {
    left: "5%",
    right: "5%",
    bottom: "10%",
    top: "10%",
    containLabel: true,
  },
  series: [{
    type: 'custom',
    itemStyle: {
      color: function (params) {
        return colors[params.dataIndex];
      },
    },

    label: {
      show: false,
    },
    data: data.ydata,
    renderItem: renderItem
  }]
})
</script>

<style lang="scss" scoped>
.chart-box {
  height: 220px;
  // background: pink;
  position: relative;

  .title {
    position: absolute;
    top: -60px;
    left: 50%;
    transform: translateX(-50%);
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 40px;
    color: #A3D9FF;
    line-height: 55px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .dw {
    position: absolute;
    top: -50px;
    right: 30px;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 30px;
    color: #C6CECF;
    line-height: 41px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>
