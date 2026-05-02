<template>
  <div class="chart-container">
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as echarts from "echarts";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";
const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

// 定义图表DOM引用
const chartRef = ref<HTMLElement | null>(null);

// 图表实例
let chart: echarts.ECharts | null = null;

// 图表数据
const chartData = {
  categories: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  mileage: [85, 92, 78, 45, 32, 18, 55],
  quantity: [5, 6, 2, 7, 4, 6, 5],
};

// 自定义文字样式
const customTextStyle = {
  fontFamily: "AlibabaPuHuiTi_3_55_Regular",
  fontSize: 28,
  color: "#7CAEB3",
  lineHeight: 65,
  textAlign: "left" as const,
  fontStyle: "normal" as const,
  textTransform: "none" as const,
};

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;

  // 确保DOM元素有尺寸
  if (chartRef.value.clientWidth === 0 || chartRef.value.clientHeight === 0) {
    setTimeout(initChart, 100);
    return;
  }

  // 初始化ECharts实例
  chart = echarts.init(chartRef.value);

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      textStyle: customTextStyle,
    },
    legend: {
      data: ["里程", "数量"],
      top: -1,
      right: 140,
      textStyle: customTextStyle,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "12%",
      top: "15%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: chartData.categories,
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          interval: 0,
          ...customTextStyle,
        },
        nameTextStyle: customTextStyle,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "公里",
        max: 100,
        interval: 20,
        nameGap: -10,
        offset: 28,
        axisLine: {
          show: true,
          lineStyle: {
            type: "dashed", // 设置为虚线
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          formatter: "{value}",
          align: "center",
          ...customTextStyle,
        },
        nameTextStyle: customTextStyle,
      },
      {
        type: "value",
        name: "(条)",
        max: 10,
        nameGap: -10,
        interval: 2,
        alignTicks: true,
        position: "right",
        offset: 28,
        axisLine: {
          show: true,
          lineStyle: {
            type: "dashed", // 设置为虚线
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          formatter: "{value}",
          align: "right",
          ...customTextStyle,
        },
        nameTextStyle: customTextStyle,
      },
    ],
    series: [
      {
        name: "里程",
        type: "bar",
        barWidth: "30",
        data: chartData.mileage,
        itemStyle: {
          color: "#97BCC7",
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(187, 230, 245, 0.3)",
        },
        // label: {
        //   show: true,
        //   ...customTextStyle,
        //   position: 'top'
        // }
      },
      {
        name: "数量",
        type: "line",
        yAxisIndex: 1,
        data: chartData.quantity,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#627A88",
        },
        lineStyle: {
          width: 3,
          type: "solid",
        },
        smooth: true,
        // label: {
        //   show: true,
        //   ...customTextStyle,
        //   position: 'top'
        // }
      },
    ],
  };

  chart.setOption(option);
};

// 响应式调整
const resizeChart = () => {
  chart?.resize();
};
watch(
  () => themeConfig,
  () => {
    resizeChart();
  },
  {
    deep: true,
  }
);
// 组件挂载时初始化图表
onMounted(() => {
  setTimeout(initChart, 0);
  window.addEventListener("resize", resizeChart);
});

// 组件卸载时清理资源
onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  chart?.dispose();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
