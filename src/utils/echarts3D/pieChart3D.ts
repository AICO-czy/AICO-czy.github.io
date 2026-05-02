
// 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
export function getPie3D(
  pieData: any,
  internalDiameterRatio: number
) {
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value;
    const seriesItem = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: { show: false },
      pieData: pieData[i],
      pieStatus: { selected: false, hovered: false, k },
    } as any;
    if (typeof pieData[i].itemStyle !== "undefined") {
      const { itemStyle } = pieData[i];
      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.color !== "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.opacity !== "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      10 // 在此处传入饼图初始高度h
    );
    startValue = endValue;
    legendData.push(series[i].name);
  }
  // 准备待返回的配置项，把准备好的series 传入。
  const option = {
    legend: {
      show: true,
      type: "scroll",
      right: 10,
      top: 10,
      orient: "vertical", // 纵向
      icon: "circle", // icon 类型
      itemHeight: 12, // icon高度
      itemWidth: 12, // icon 宽度
      itemGap: 5, // 图例间隔
      textStyle: {
        color: "#709DD9",
        fontSize: 12,
        fontWeight: "400",
      },
      formatter: (name: any) => {
        if (pieData.length) {
          const item = pieData.filter((item: any) => item.name === name)[0];
          return `  ${name}：${item.value}`;
        }
      },
    },
    tooltip: {
      formatter: (params: any) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${params.marker}${params.seriesName}：${
            pieData[params.seriesIndex].value
          }`;
        }
        return "";
      },
    },
    xAxis3D: { min: -1, max: 1 },
    yAxis3D: { min: -1, max: 1 },
    zAxis3D: { min: -1, max: 1 },
    grid3D: {
      show: false,
      boxHeight: 15, // 修改立体饼图的高度
      top: "-10%",
      left: "0%",
      viewControl: {
        // 3d效果可以放大、旋转等，
        alpha: 20, // 饼图翻转的程度
        beta: 30,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false, // 是否自动旋转
        distance: 300, // 距离越小看到的饼图越大
      },
    },
    series,
  };
  return option;
}

/**
 * getParametricEquation 生成扇形的曲面参数方程 生成 3D 扇形环曲面
 * @param{} startRatio（浮点数）: 当前扇形起始比例，取值区间 [0, endRatio)
 * @param{} endRatio（浮点数）: 当前扇形结束比例，取值区间 (startRatio, 1]
 * @param{} isSelected（布尔值）:是否选中，效果参照二维饼图选中效果（单选）
 * @param{} isHovered（布尔值）: 是否放大，效果接近二维饼图高亮（放大）效果（未能实现阴影）
 * @param{} k（0~1之间的浮点数）：用于参数方程的一个参数，取值 0~1 之间，通过「内径/外径」的值换算而来。
 * @param{} h :饼图的初始高度
 */
function getParametricEquation(
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number
) {
  const midRatio = (startRatio + endRatio) / 2;
  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  k = typeof k !== "undefined" ? k : 1 / 3;
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 鼠标滑过时外环放大大小
  const hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },

    x(u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y(u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z(u: any, v: any) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

/**
 * 获取3d丙图的最高扇区的高度
 */
function getHeight3D(series: any, height: any) {
  series.sort((a: any, b: any) => {
    return b.pieData.value - a.pieData.value;
  });
  return (height * 25) / series[0].pieData.value;
}

/**
 * 格式化浮点数
 */
function fomatFloat(num: any, n: any) {
  let f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
  let s = f.toString();
  let rs = s.indexOf(".");
  // 判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += ".";
  }
  while (s.length <= rs + n) {
    s += "0";
  }
  return s;
}
