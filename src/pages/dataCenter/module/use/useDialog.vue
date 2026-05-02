<template>
  <div class="use-dialog">
    <div class="use-dialog-content">
      <div class="dialog-content-close" @click="handleClose">
        <q-icon :name="`img:${closeIcon}`" class="dialog-content-close-icon"></q-icon>
      </div>
      <div class="use-dialog-box row justify-between items-center">
        <div class="use-dialog-box-left column justify-center items-center">
          <div class="use-dialog-box-top">
            <span>热门数据调用</span>
          </div>
          <div class="use-dialog-box-left-bottom full-width col row justify-evenly items-center">
            <v-chart :option="option1" autoplay class="fit" />
          </div>
        </div>
        <div class="use-dialog-box-line"></div>
        <div class="use-dialog-box-right column justify-center items-center">
          <div class="use-dialog-box-top">
            <span>数据资源共享</span>
          </div>
          <div class="use-dialog-box-right-bottom col">
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

const option1 = ref({
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
    left: '0%',
    right: '5%',
    top: '13%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category', // 产能和能耗使用的 x 轴
      data: ['交调站过车 数据', '高速收费站 数据', '门架过车 数据', '危货电子运单 数据', '公交车 GPS'], // 使用最近七天的日期
      axisLine: {
        show: false,
        lineStyle: {
          color: '#768594',
          width: 2
        },
      },
      axisLabel: {
        textStyle: {
          color: '#AEB8C0',
          fontSize: 45,
          padding: [30, 0, 0, 0]
        },
        formatter: function (value) {
          // 将 "TOP1 石家庄市" 拆分成两行
          return value.replace(' ', '\n');
        }
      },
      splitLine: { show: false },
    }
  ],
  yAxis: {
    type: 'value',
    name: '单位:次',
    nameLocation: 'end',
    nameGap: 30,
    nameTextStyle: {
      color: '#C6CECF',
      fontSize: 38,
      padding: [50, 20, 20, 0]
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(130, 144, 157, 0.34)",
        width: 2
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#768594',
        width: 2
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
      type: 'bar',
      barWidth: 40,
      data: [95, 90, 70, 60, 50], // 示例数据，根据实际情况调整
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "rgba(186, 253, 242, 1)",
            },
            {
              offset: 0.3,
              color: "rgba(172, 255, 244, 1)",
            },
            {
              offset: 1,
              color: "rgba(127, 246, 255, 0)",
            },
          ],
          false
        ),
      },
      label: {
        show: false,
        position: 'right',
        color: 'white',
        fontSize: 40,
        padding: [0, 0, 0, 20]
      },
    }
  ]
})
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
    right: '8%',
    top: '15%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'value', // 产能和能耗使用的 x 轴

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
          width: 2
        },
      },
      splitLine: { show: false },
    }
  ],
  yAxis: {
    type: 'category',
    name: '单位:项',
    nameLocation: 'end',
    nameGap: 30,
    nameTextStyle: {
      color: '#C6CECF',
      fontSize: 38,
      padding: [50, 150, 0, 0]
    },
    data: ['承德市数政局', '省TOCC'], // 使用最近七天的日期
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(130, 144, 157, 0.34)",
        width: 2
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#768594',
        width: 2
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
      data: [152, 220], // 示例数据，根据实际情况调整
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
.use-dialog {
  width: 100%;
  height: 100%;
  background: url("assets/image/dataCenter/用-遮罩.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  /* border-radius: 30px; */
  box-sizing: border-box;
}

.use-dialog-content {
  width: 4529px;
  height: 1519px;
  background: url("assets/image/dataCenter/切图 75.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  padding: 290px 262px 317px 291px;
  left: 409px;
  top: 346px;
}

.dialog-content-close-icon {
  width: 102px;
  height: 102px;
  position: absolute;
  top: -10px;
  right: -20px;
}

.use-dialog-box {
  width: 100%;
  height: 100%;
}

.use-dialog-box-left {
  width: 49%;
  height: 100%;
}

.use-dialog-box-line {
  width: 12px;
  height: 451px;
  background: url("assets/image/dataCenter/切图 76.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 200px;
}

.use-dialog-box-top {
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

.use-dialog-box-right {
  width: 49%;
  height: 100%;
  padding-left: 176px;


}

.use-dialog-box-left-center-item {
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

.use-dialog-box-right-bottom {
  width: 100%;
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
