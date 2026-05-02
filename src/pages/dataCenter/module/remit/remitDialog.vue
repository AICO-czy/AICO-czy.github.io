<template>
  <div class="remit-dialog">
    <div class="remit-dialog-content">
      <div class="remittance-department-content-close" @click="handleClose">
        <q-icon :name="`img:${closeIcon}`" class="remittance-department-content-close-icon"></q-icon>
      </div>
      <div class="remit-dialog-box row justify-between items-center">
        <div class="remit-dialog-box-left column">
          <div class="remit-dialog-box-left-top">
            <span>数据接入分布</span>
          </div>
          <div class="remit-dialog-box-left-center row">
            <div class="remit-dialog-box-left-center-item" @click="remitSelet = item"
              :class="{ 'active-item': item === remitSelet }" v-for="item in remitSelets" :key="item">
              <span>{{ item }}</span>
            </div>
          </div>
          <div class="remit-dialog-box-left-bottom col row justify-evenly items-center">
            <v-chart :option="option1" autoplay class="fit" />
          </div>
        </div>
        <div class="remit-dialog-box-line"></div>
        <div class="remit-dialog-box-right column">
          <div class="remit-dialog-box-right-top row justify-between">
            <div class="right-top-item row items-center space-name3">
              <div class="glhy-name">接入单位</div>
              <div class="right-top-text">
                <div class="right-top-text-num">
                  19
                  <span>个</span>
                </div>
              </div>
            </div>
            <div class="right-top-item row items-center">
              <div class="glhy-name">日均增量</div>
              <div class="right-top-text">
                <div class="right-top-text-num">
                  17
                  <span>万条</span>
                </div>
              </div>
            </div>
          </div>
          <div class="remit-dialog-box-right-bottom col">
            <v-chart :option="option2" autoplay class="fit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, reactive, toRefs } from "vue";
import * as echarts from "echarts";

import { useActiveTypeStore } from "../../store/activeType";
import closeIcon from 'src/assets/image/dataCenter/切图 53.png';
const activeTypeStore = useActiveTypeStore();
const { activeBtn, activeDialog } = toRefs(activeTypeStore);

const remitSelets = ref(['条目数(条)', '数据量(GB)']);

const remitSelet = ref('条目数(条)');

const option1 = ref({})
function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {

  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {

    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < - Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u);
      }
      return Math.sin(v) > 0 ? 2 * height : -1;
    }
  };
};

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: { name: string, value: number, itemStyle?: { color?: string, opacity?: number } }[], internalDiameterRatio: number) {

  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {

    sumValue += pieData[i].value;

    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    };

    if (typeof pieData[i].itemStyle != 'undefined') {

      let itemStyle = {};

      typeof pieData[i].itemStyle.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    // console.log(series[i]);
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, series[i].pieData.value);

    startValue = endValue;

    legendData.push(series[i].name);
  }


  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: .31,
      color: 'rgba(52, 131, 153, 0.31)',
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? 0 : -5;
      },
    },
  });
  series.push({
    name: 'mouseoutSeries',
    type: 'surface',
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.5,
      color: 'rgba(52, 131, 153, 0.31)',
    },

    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u, v) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.1;
      },
      y: function (u, v) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.1;
      },
      z: function (u, v) {
        return Math.cos(v) > 0 ? -15 : -20;
      },
    },
  });
  return series;
}
let colors = ['rgba(34, 138, 179, 1)', 'rgba(24, 200, 170, 1)', 'rgba(242, 213, 158, 1)']
let xData = ['省厅', '市局', '企业']
let yData = [45, 32, 18]
// 传入数据生成 option
let optionsData = [];
for (let i = 0; i < xData.length; i++) {
  optionsData.push(
    {
      name: xData[i],
      value: yData[i],
      itemStyle: {
        color: colors[i],
      }
    }
  );
}

const series = getPie3D(optionsData, 0.8);

series.push({
  name: 'pie2d',
  type: 'pie',

  label: {
    opacity: 1,
    fontSize: 12,
    lineHeight: 20,
    textStyle: {
      fontSize: 12,
    },
  },
  labelLine: {
    length: 60,
    length2: 60,
  },
  startAngle: 90, //起始角度，支持范围[0, 360]。
  clockwise: true, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
  radius: ['0', '0'],
  center: ['20%', '20%'],
  data: optionsData,
  itemStyle: {
    opacity: 1,
  },
});
// 准备待返回的配置项，把准备好的 legendData、series 传入。
option1.value = {
  legend: {
    tooltip: {
      show: true,
    },
    data: xData,
    right: '20%',
    top: 'center',
    itemWidth: 40,
    itemHeight: 40,
    itemGap: 50,
    orient: "vertical",
    textStyle: {
      color: 'rgba(191, 239, 255, 1)',
      fontSize: 50,
      padding: [0, 0, 0, 70]
    },
  },
  animation: false,
  tooltip: {
    formatter: params => {
      if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
        return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>${option1.value.series[params.seriesIndex].pieData.value}`;
      }
    },
    textStyle: {
      fontSize: 12
    },
  },
  title: {
    x: 'center',
    top: '20',
    textStyle: {
      color: '#fff',
      fontSize: 32,
    },
  },
  // backgroundColor: '#333',
  labelLine: {
    show: false,
    lineStyle: {
      color: 'transparent',
    },
  },
  label: {
    show: false,
    color: 'transparent',
    position: 'outside',
    formatter: '{b} \n{c} {d}%',
  },
  xAxis3D: {
    min: -1,
    max: 1,
  },
  yAxis3D: {
    min: -1,
    max: 1,
  },
  zAxis3D: {
    min: -1,
    max: 1,
  },
  grid3D: {
    show: false,
    boxHeight: 0.4,
    //top: '30%',
    bottom: '20%',
    left: '-20%',
    viewControl: {
      autoRotate: false, // 自动旋转
      rotateSensitivity: 0, // 设置为0无法旋转
      zoomSensitivity: 0, // 设置为0无法缩放
      panSensitivity: 0, // 设置为0无法平移
      beta: 0,
      alpha: 30,
      distance: 170,
    },

  },

  series: series,
};


const option2 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    show: false,
    itemWidth: 30,
    itemHeight: 30,
    itemGap: 100,
    top: '2%',
    textStyle: {
      color: '#C6CECF',
      fontSize: 30,
      padding: [0, 0, 0, 10]
    },
  },
  grid: {
    left: '5%',
    right: '10%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'value', // 产能和能耗使用的 x 轴
      // name: '单位:班次',
      // nameLocation: 'end',
      // nameGap: 30,
      // nameTextStyle: {
      //   color: '#C6CECF',
      //   fontSize: 30,
      //   padding: [50, 0, 0, 0]
      // },
      max: 250,
      axisLabel: {
        textStyle: {
          color: '#AEB8C0',
          fontSize: 30,
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#768594',
        },
      },
      splitLine: { show: false },
    }
  ],
  yAxis: {
    type: 'category',
    data: ['省TOCC', '综规科', '安全科', '信访办', '办公室'], // 使用最近七天的日期
    splitLine: {
      show: false,
      lineStyle: {
        color: "rgba(130, 144, 157, 0.34)",
        width: 2
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#768594',
      },
    },
    axisLabel: {
      textStyle: {
        color: '#AEB8C0',
        fontSize: 46,
      },
    },
    axisTick: { show: false }
  },
  series: [
    {
      name: '今日', // 修改为产能
      type: 'bar',
      barWidth: 40,
      data: [90, 180, 120, 130, 200], // 示例数据，根据实际情况调整
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: "rgba(51, 103, 154, 0)",
            },
            {
              offset: 0.5,
              color: "rgba(69, 153, 237, 1)",
            },
            {
              offset: 1,
              color: "rgba(160, 249, 255, 1)",
            },
          ],
          false
        ),
      },
      label: {
        show: true,
        position: 'right',
        color: 'white',
        fontSize: 40,
        padding: [0, 0, 0, 20]
      },
    }
  ]
})

const handleClose = () => {
  activeDialog.value = 0;
}
</script>

<style scoped lang="scss">
.remit-dialog {
  width: 100%;
  height: 100%;
  background: url("assets/image/dataCenter/遮罩修改.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  /* border-radius: 30px; */
  box-sizing: border-box;
}

.remit-dialog-content {
  width: 4529px;
  height: 1519px;
  background: url("assets/image/dataCenter/切图 75.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  padding: 290px 262px 317px 291px;
  left: 1858px;
  top: 346px;
}

.remittance-department-content-close-icon {
  width: 102px;
  height: 102px;
  position: absolute;
  top: -10px;
  right: -20px;
}

.remit-dialog-box {
  width: 100%;
  height: 100%;
}

.remit-dialog-box-left {
  width: 49%;
  height: 100%;

  .remit-dialog-box-left-top {
    width: 1006px;
    height: 111px;
    background: url("assets/image/dataCenter/切图 77.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 82px;
      line-height: 107px;
      letter-spacing: 5px;
      text-align: center;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.remit-dialog-box-line {
  width: 12px;
  height: 451px;
  background: url("assets/image/dataCenter/切图 76.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 200px;
}

.remit-dialog-box-right {
  width: 49%;
  height: 100%;
  padding-left: 176px;
}

.remit-dialog-box-left-center-item {
  width: 590px;
  height: 118px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 10px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 56px;
    color: #87ADD0;
    line-height: 84px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.active-item {
  width: 590px;
  height: 118px;
  background: rgba(27, 123, 182, 0.5);
  border-radius: 10px 10px 10px 10px;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 56px;
    color: #E3F1FF;
    line-height: 84px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}


.right-top-item {
  margin-bottom: 45px;
}

.right-top-text {
  background: url('assets/image/dataCenter/切图 43.png') no-repeat center/cover;
  width: 494px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;

  .right-top-text-num {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 62px;
    line-height: 85px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      color: rgba(220, 236, 255, 0.6);
      line-height: 76px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      /* 2. 清除渐变背景（避免继承父元素的渐变） */
      background: none;
      opacity: 0.967;
      -webkit-text-fill-color: rgba(220, 236, 255, 0.567);
      /* 同步覆盖兼容属性 */
      /* 3. 重置背景裁剪（恢复默认的边框盒） */
      -webkit-background-clip: border-box;
      background-clip: border-box;
    }
  }

}

.glhy-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 58px;
  color: #9BE6FF;
  line-height: 80px;
  letter-spacing: 2px;
  text-shadow: 0px 6px 8px #042F4A;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 30px;
}
</style>
