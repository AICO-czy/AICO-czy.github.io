<!--监控分类统计-->
<template>
  <div class="type-total">
    <div class="type-total-content">
      <div class="type-total-top column">
        <ItemTitle title="视频监控统计" />
        <div class="type-total-top-chart col full-width">
          <div id="video-total-chart" class="fit"></div>
        </div>
      </div>
      <div class="type-total-bottom">
        <ItemTitle title="监控分类统计" />
        <div class="type-total-bottom-pro col full-width">
          <div class="type-total-bottom-pro-item row justify-evenly items-center"
            v-for="item in state.surveillanceType">
            <div class="type-total-bottom-pro-item-name">{{ item.name }}</div>
            <div class="type-total-bottom-pro-item-procount-bg">
              <div class="type-total-bottom-pro-item-procount" :style="{ width: item.radio * 100 + '%' }"></div>
            </div>
            <div class="type-total-bottom-pro-item-count row no-wrap items-center">
              <span class="type-total-bottom-pro-item-number">{{ item.count }}</span>
              <span class="type-total-bottom-pro-item-count-unit">个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="typeTotal">
import {
  defineAsyncComponent,
  reactive,
  onMounted,
  onUnmounted,
  watch,
} from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";

const ItemTitle = defineAsyncComponent(
  () => import("pages/videoSurveillance/models/ItemTitle.vue")
);

const state = reactive({
  surveillanceType: [
    {
      name: "高速公路",
      count: 176,
      radio: 0.4,
    },
    {
      name: "国省干道路段",
      count: 300,
      radio: 0.6,
    },
    {
      name: "城市重要地点",
      count: 13,
      radio: 0.3,
    },
    {
      name: "重点景区",
      count: 190,
      radio: 0.5,
    },
    {
      name: "隧道",
      count: 171,
      radio: 0.6,
    },
    {
      name: "治超站",
      count: 34,
      radio: 0.1,
    },
    {
      name: "交调站",
      count: 35,
      radio: 0.15,
    },
    {
      name: "服务区",
      count: 120,
      radio: 0.45,
    },
    {
      name: "养护工区",
      count: 36,
      radio: 0.2,
    },
    {
      name: "水路运输",
      count: 35,
      radio: 0.2,
    },
    {
      name: "客运场站",
      count: 435,
      radio: 0.88,
    },
    {
      name: "公交车",
      count: 523,
      radio: 0.95,
    },
    {
      name: "两客一危",
      count: 524,
      radio: 0.95,
    },
    {
      name: "巡游出租",
      count: 423,
      radio: 0.75,
    },
  ],
  videoTypeChart: null as any,
  videoTypeOption: null as any,
});

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

/**初始化echart */
const initChart = (domId: string, chart: any, option: any) => {
  if (chart !== null) {
    echarts.dispose(document.getElementById(domId) as HTMLElement);
    chart = null;
  }
  var chartDom = document.getElementById(domId);
  chart = echarts.init(chartDom);
  option && chart.setOption(option);
  return chart;
};

/**加载数据 */
const loadData = () => {
  initVideoTotalOption();
};

const initVideoTotalOption = () => {
  const data = [
    {
      value: 2567,
      name: "在线数量",
      itemStyle: {
        color: "rgba(27, 217, 173, 1)",
      },
    },
    {
      value: 559,
      name: "离线数量",
      itemStyle: {
        color: "rgba(153, 201, 205, 1)",
      },
    },
  ];
  const color2 = [
    "rgba(27, 217, 173, 0.2)",
    "rgba(153, 201, 205, 0.2)",
  ];
  const maxCircleData = data.map((item, index) => {
    return {
      ...item,
      itemStyle: {
        color: color2[index],
      },
    };
  });

  var option = {
    title: [
      {
        text: '监控总数',
        left: '20%',
        top: '32%',
        textStyle: {
          color: '#A8C4D8',
          fontSize: 38,
          fontWeight: '500',
        },
      },
      {
        text: '3126',
        left: '22%',
        top: '44%',
        textStyle: {
          fontSize: 50,
          color: '#B7C4CC',
          foontWeight: '500',
        },
      },
    ],
    // 图例
    legend: {
      orient: 'vertical',
      right: '5%',
      top: '20%',
      data: ['在线数量', '离线数量'],
      textStyle: {
        color: '#A3BFD8',
        fontSize: 32
      },
      formatter: function (name) {
        // 遍历数据找到对应名称的数据项
        for (let i = 0; i < option.series[0].data.length; i++) {
          if (option.series[0].data[i].name === name) {
            // 返回"名称: 数值"的格式
            return `${name}  ${option.series[0].data[i].value}个`;
          }
        }
        return name;
      },
      itemGap: 100, // 图例项之间的间距
      itemWidth: 20, // 图例标记的宽度
      itemHeight: 20 // 图例标记的高度
    },
    series: [
      {
        type: "pie",
        padAngle: 2,
        radius: ["45%", "55%"],
        center: ['30%', '40%'],
        label: {
          show: false,
        },
        emphasis: {
          disabled: true,
        },
        labelLine: {
          show: false,
        },
        data: maxCircleData,
      },
      {
        type: "pie",
        padAngle: 2,
        radius: ["55%", "65%"],
        center: ['30%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  }
  state.videoTotalOption = option;
  state.videoTotalChart = initChart(
    "video-total-chart",
    state.videoTotalChart,
    state.videoTotalOption
  );
};

/**刷新echart */
const resetChart = () => {
  let timeOut = setTimeout(() => {
    if (state.videoTotalChart !== null) {
      initVideoTotalOption();
    }
    clearTimeout(timeOut);
  }, 100);
};

/**页面关闭 */
const closePage = () => {
  //关闭echart
  if (state.videoTotalChart !== null) {
    state.videoTotalChart.dispose();
    state.videoTotalChart = null;
  }
};

/**监听页面大小发生变化 */
watch(
  () => themeConfig,
  () => {
    resetChart();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  loadData();
});

onUnmounted(() => {
  closePage();
});
</script>
<style scoped lang="scss">
.type-total {
  width: 100%;
  height: 100%;
  padding-right: 29px;
}

.type-total-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.type-total-top {
  position: relative;
  width: 100%;
  height: 528px;
  background-image: url("assets/image/cdsgl/videoSurveillance/box-new.png");
  background-size: 100% 100%;
}

// 监控分类统计
.type-total-bottom {
  flex: 1;
  margin-top: 40px;
  background-image: url("assets/image/cdsgl/videoSurveillance/box-new (1).png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}

.type-total-bottom-pro {
  padding-top: 10px;
}

.type-total-bottom-pro-item {
  padding: 15px 0px;
}

.type-total-bottom-pro-item-name {
  width: 192px;
  height: 44px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 32px;
  color: #FFFFFF;
  line-height: 44px;
  text-align: right;
  font-style: normal;
  text-transform: none;
}



.type-total-bottom-pro-item-count {
  width: 81px;
  height: 38px;

}

.type-total-bottom-pro-item-number {
  font-family: D-DIN Condensed, D-DIN Condensed;
  font-weight: 400;
  font-size: 38px;
  color: #FFFFFF;
  line-height: 38px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.type-total-bottom-pro-item-count-unit {

  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 30px;
  color: #5385C4;
  line-height: 26px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.type-total-bottom-pro-item-procount-bg {
  width: 352px;
  height: 12px;
  background: #334146;
  border-radius: 0px 0px 0px 0px;
  opacity: 0.68;
  position: relative;
  z-index: 10;
}

.type-total-bottom-pro-item-procount {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(90deg, rgba(34, 196, 215, 0.69) 0%, rgba(34, 196, 215, 0.9) 78%, #83F2FF 100%);
  border-radius: 0px 0px 0px 0px;
  border-image: linear-gradient(90deg, rgba(208.41346621513367, 255, 255, 0), rgba(208.41346621513367, 255, 255, 0.5799999833106995)) 1 1;
  z-index: 20;
}
</style>
