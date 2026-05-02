<!--Echarts 3D地图-->
<template>
  <div class="echarts-3D-map">
    <div id="echarts3DMap" class="echarts-3D-container"></div>
  </div>
</template>
<script setup lang="ts" name="titleLarge">
import { reactive, onMounted, watch, onUnmounted } from "vue";
import { get } from "src/utils/httpRequest";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";
import * as echarts from "echarts";
import "echarts-gl";
const state = reactive({
  mapData: {
    mapName: "qingdao",
    name: "承德市地图-3D版",
    url: "assets/json/承德市.json",
    labelShow: true,
    distance: 100,
  },
});

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

let myChart = null as any;
/**初始化数据 */
const initData = () => {
  if (myChart !== null) {
    var dom = document.getElementById("echarts3DMap");
    if (dom) {
      echarts.dispose(dom);
    }
    myChart = null;
  }
  myChart = echarts.init(document.getElementById("echarts3DMap"));
  // myChart.showLoading();
  renderMap();
};

import chengde from "assets/json/承德市.json";
import oneLine from "assets/json/国家一号风景大道.json";
import twoLine from "assets/json/红色旅游路路线.json";
import threeLine from "assets/json/美丽农村路.json";

import photo1 from "src/assets/image/地图贴图.png";
import photo2 from "src/assets/image/渐变贴图.png";
const renderMap = async () => {
  let areaName = "";
  let oneLineData = oneLine.features[0]?.geometry.coordinates[0];

  let twoLineDatas = twoLine.features.map((x) => {
    return x.geometry.coordinates;
  });

  let twoSeriesList: any = [];
  twoLineDatas.forEach((child) => {
    child.forEach((item: any, index: number) => {
      let twoSeries = {
        name: "红色旅游路" + index,
        type: "lines3D",
        animationDurationUpdate: 0, // 实现缩放、拖动同步且不卡顿
        roam: true,
        coordinateSystem: "geo3D",
        geoIndex: 0,
        // blendMode: "lighter",
        emphasis: {
          label: {
            show: false,
            formatter: function (params: any) {
              // 鼠标经过的回调函数
              console.log("hover", params);
              areaName = params.name;
              return params.name;
            },
          },
        },
        polyline: true,
        silent: false,
        lineStyle: {
          color: "#DFE604",
          width: 20,
          opacity: 1,
          type: "dotted",
        },
        effect: {
          show: false,
          period: 4,
          constantSpeed: 10,
          trailWidth: 20,
          trailLength: 0.3,
          trailColor: "#a10000",
          trailOpacity: 0.6,
        },
        data: [
          {
            coords: item,
          },
        ],
      };
      twoSeriesList.push(twoSeries);
    });
  });

  let threeLineDatas = threeLine.features.map((x) => {
    return x.geometry.coordinates;
  });
  let threeSeriesList: any = [];
  threeLineDatas.forEach((child) => {
    child.forEach((item: any, index: number) => {
      let threeSeries = {
        name: "美丽燕塞路" + index,
        type: "lines3D",
        animationDurationUpdate: 0, // 实现缩放、拖动同步且不卡顿
        roam: true,
        coordinateSystem: "geo3D",
        geoIndex: 0,
        emphasis: {
          label: {
            show: false,
            formatter: function (params: any) {
              // 鼠标经过的回调函数
              console.log("hover", params);
              areaName = params.name;
              return params.name;
            },
          },
        },
        polyline: true,
        silent: false,
        // blendMode: "lighter",
        lineStyle: {
          color: "#05BDF0",
          width: 20,
          opacity: 1,
          type: "dotted",
        },
        effect: {
          show: false,
          period: 4,
          constantSpeed: 10,
          trailWidth: 20,
          trailLength: 0.3,
          trailColor: "#a10000",
          trailOpacity: 0.6,
        },
        data: [
          {
            coords: item,
          },
        ],
      };
      threeSeriesList.push(threeSeries);
    });
  });
  // 注册地图名字(china)和数据(geoJson)
  echarts.registerMap("chengde", chengde as any);
  // 隐藏动画加载效果。
  // myChart.hideLoading();

  const option = {
    geo3D: [
      {
        map: "chengde",
        regionHeight: 0.1, //地图厚度
        itemStyle: {
          borderWidth: 4, //分界线宽度
          // borderColor: "#00EBFF", //分界线颜色
          borderColor: "#5AC582",
        },
        label: {
          show: true,
          alignText: "center",
          color: "#FFFFFF", //文字颜色
          fontSize: 48, //文字大小
          position: [100, 100],
          padding: [5, 10],
          lineHeight: 56,
        },
        // 设置单独区域样式
        regions: [],
        // hover高亮颜色
        emphasis: {
          disabled: true,
          label: {
            // show: false,
            formatter: function (params: any) {
              // 鼠标经过的回调函数
              areaName = params.name;
              return params.name;
            },
          },
        },
        shading: "realistic",
        realisticMaterial: {
          detailTexture: photo1, // 纹理贴图
          textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
          roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
          metalness: 0, // 0材质是非金属 ，1金属
          roughnessAdjust: 0,
          textureOffset: 0,
        },
        light: {
          //光照阴影
          main: {
            color: "#fff", //光照颜色
            intensity: 0, //光照强度
            shadowQuality: "medium", //阴影亮度
            shadow: false, //是否显示阴影
            alpha: 60,
            beta: 0,
          },
          ambient: {
            intensity: 1,
          },
        },
        viewControl: {
          distance: 110, // 地图视角 控制初始大小
          rotateSensitivity: 0, // 旋转
          // zoomSensitivity: 0, // 缩放
          // autoRotate: false,
          beta: 0, //旋转视角
          alpha: 50, //视角
          panMouseButton: "left",
          rotateMouseButton: "right",
          center: [-10, -16, 0],
        },
      },
      {
        map: "chengde",
        regionHeight: 5.8, //地图厚度
        itemStyle: {
          borderWidth: 15, //分界线宽度
          borderColor: "#66ffff",
        },
        //背景图
        // environment: "",
        label: {
          show: false,
        },
        // 设置单独区域样式
        regions: [],
        shading: "realistic",
        // 真实感材质相关配置 shading: 'realistic'时有效
        realisticMaterial: {
          detailTexture: photo2, // 纹理贴图
          textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
          roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
          metalness: 0, // 0材质是非金属 ，1金属
          roughnessAdjust: 0,
          textureOffset: 0,
        },
        light: {
          //光照阴影
          main: {
            color: "#fff", //光照颜色
            intensity: 0, //光照强度
            shadowQuality: "high", //阴影亮度
            shadow: true, //是否显示阴影
            alpha: 60,
            beta: 0,
          },
          ambient: {
            intensity: 1,
          },
        },
        viewControl: {
          distance: 110, // 地图视角 控制初始大小
          rotateSensitivity: 0, // 旋转
          // zoomSensitivity: 0, // 缩放
          // autoRotate: false,
          // maxBeta: Infinity,
          // minBeta: -Infinity,
          beta: 0, //旋转视角
          alpha: 50, //视角
          panMouseButton: "left",
          rotateMouseButton: "right",
          center: [-10, -10, 0],
        },
      },
    ],
    series: [
      {
        name: "国家一号风景大道",
        type: "lines3D",
        animationDurationUpdate: 0, // 实现缩放、拖动同步且不卡顿
        roam: true,
        coordinateSystem: "geo3D",
        geoIndex: 0,
        // blendMode: "lighter",v
        emphasis: {
          label: {
            show: false,
            formatter: function (params: any) {
              // 鼠标经过的回调函数
              console.log("hover", params);
              areaName = params.name;
              return params.name;
            },
          },
        },
        polyline: true,
        silent: false,
        lineStyle: {
          color: "#0CB903",
          width: 20,
          opacity: 1,
          type: "dotted",
        },
        effect: {
          show: false,
          period: 4,
          constantSpeed: 10,
          trailWidth: 20,
          trailLength: 0.3,
          trailColor: "#a10000",
          trailOpacity: 0.6,
        },
        data: [
          {
            coords: oneLineData,
          },
        ],
      },
    ],
  };
  option.series = option.series.concat(twoSeriesList, threeSeriesList);
  myChart.setOption(option);

  myChart.on("georoam", (params: any) => {
    const op = myChart.getOption(); // 获得option对象
    if (params.zoom != null) {
      // 捕捉到缩放时
      op.geo[0].zoom = op.series[0].zoom; // 下层geo的缩放等级跟着上层的geo一起改变
      op.geo[0].center = op.series[0].center; // 下层的geo的中心位置随着上层geo一起改变
    } else {
      // 捕捉到拖曳时
      op.geo[0].center = op.series[0].center; // 下层的geo的中心位置随着上层geo一起改变
    }
    myChart.setOption(op); // 设置option
  });

  myChart.getZr().on("click", function (event: any) {
    // event 对象包含事件数据
    console.log("飞线被点击:", event); // 输出飞线数据
    // alleet(`飞线值: ${event.data[4].value}`); // 示例：显示自定义属性
  });
};

// const renderChart2 = (svg: any) => {
//   // 注册地图名字(china)和数据(geoJson)
//   echarts.registerMap(state.mapData.mapName, { svg: svg });
//   // 隐藏动画加载效果。
//   myChart.hideLoading();

//   let dataList = [
//     {
//       name: "双桥区",
//       value: 82,
//       coord: [2186.9570469798664, 2265.679194630873],
//     },
//     {
//       name: "双滦区",
//       value: 53,
//       coord: [2029.5744966442962, 2261.9020134228194],
//     },
//     {
//       name: "鹰手营子矿区",
//       value: 48,
//       coord: [1656.892617449665, 3119.3221476510075],
//     },
//     {
//       name: "承德县",
//       value: 47,
//       coord: [2500.463087248323, 2110.8147651006716],
//     },
//     {
//       name: "兴隆县",
//       value: 48,
//       coord: [2066.087248322152, 2896.468456375843],
//     },
//     {
//       name: "滦平县",
//       value: 30,
//       coord: [1610.3073825503407, 2414.2483221476546],
//     },
//     {
//       name: "隆化县",
//       value: 121,
//       coord: [1931.3677852349056, 1589.5637583892658],
//     },
//     {
//       name: "丰宁满族自治县",
//       value: 11,
//       coord: [660.975838926181, 1481.2845637583935],
//     },
//     {
//       name: "宽城满族自治县",
//       value: 136,
//       coord: [2952.4657718120884, 2833.5154362416156],
//     },
//     {
//       name: "围场满族蒙古族自治县",
//       value: 5,
//       coord: [1705.9959731543709, 509.28993288591073],
//     },
//     {
//       name: "平泉市",
//       value: 74,
//       coord: [2991.496644295312, 2146.068456375844],
//     },
//   ];
//   var width = 40;
//   var height = 200;
//   var seriesDatas = [] as any;
//   dataList.forEach((item, index) => {
//     seriesDatas.push({
//       name: "鹰手营子矿区",
//       type: "custom",
//       coordinateSystem: "geo",
//       renderItem: function (params: any, api: any) {
//         const content = [item.coord[0], item.coord[1]];
//         var pointTop = api.coord([content[0], content[1]]);
//         return {
//           type: "group",
//           children: [
//             {
//               type: "rect",
//               shape: {
//                 x: pointTop[0],
//                 y: pointTop[1],
//                 width: content[0] - width - content[0],
//                 height: content[1] - item.value - content[1],
//               },
//               style: {
//                 fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                   { offset: 0, color: "rgb(255,153,0,0.7)" },
//                   { offset: 1, color: "rgb(255,153,0,0.7)" },
//                 ]),
//               },
//             },
//             {
//               type: "rect",
//               shape: {
//                 x: pointTop[0],
//                 y: pointTop[1],
//                 width: content[0] - width - content[0],
//                 height: content[1] - height - content[1],
//               },
//               style: {
//                 fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//                   { offset: 0, color: "rgb(255,153,0,0.25)" },
//                   { offset: 1, color: "rgb(255,153,0,0.25)" },
//                 ]),
//               },
//             },
//           ],
//         };
//       },
//       data: [0],
//     });
//   });

//   // 图表配置项
//   let option = {
//     tooltip: {},
//     visualMap: {
//       //图例值控制
//       min: 1,
//       max: 10000,
//       calculable: true,
//       show: false,
//       color: ["#f44336", "#00eaff"],
//       textStyle: {
//         color: "#fff",
//       },
//     },
//     geo: {
//       map: state.mapData.mapName,
//       layoutCenter: ["50%", "50%"],
//       roam: false,
//       tooltip: {
//         // 用 `show` 来启用/禁用 geo 上的 tooltip。
//         show: true,
//         backgroundColor: "rgba(38, 49, 76, 1)",
//         textStyle: {
//           color: "#ffffff",
//           fontSize: 36,
//           fontWeight: "700",
//           fontFamily: "SourceHanSansCN, SourceHanSansCN",
//         },
//         formatter: (param: any) => {
//           var html = `<span style='font-weight:bolder'>${param.seriesName}</span><br>`;
//           html += `<span style='font-weight:bolder;margin-left:15px;float:right'>${50}</span><br />`;
//           return html;
//         },
//       },
//       itemStyle: {
//         borderWidth: 0,
//       },
//       emphasis: {
//         itemStyle: {
//           areaColor: "#66ffff",
//           opacity: 1,
//         },
//         label: {
//           //移入时的高亮文本
//           show: true,
//           // 标签的字体样式
//           color: "#66ffff", // 地图初始化区域字体颜色
//           fontSize: 50, // 字体大小
//           fontWeight: "700",
//           fontFamily: "SourceHanSansCN, SourceHanSansCN",
//         },
//       },
//       label: {
//         show: true, //是否显示市
//         // 标签的字体样式
//         color: "#D5ECFF", // 地图初始化区域字体颜色
//         fontSize: 50, // 字体大小
//         fontWeight: "700",
//         fontFamily: "SourceHanSansCN, SourceHanSansCN",
//       },
//       regions: [
//         {
//           name: "双桥区",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [0, 0],
//           },
//         },
//         {
//           name: "双滦区",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [10, 30],
//           },
//         },
//         {
//           name: "鹰手营子矿区",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [0, 50],
//           },
//         },
//         {
//           name: "承德县",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [120, 0],
//           },
//         },
//         {
//           name: "兴隆县",
//           tooltip: {
//             show: false,
//           },
//         },
//         {
//           name: "滦平县",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [20, 80],
//           },
//         },
//         {
//           name: "隆化县",
//           tooltip: {
//             show: false,
//           },
//         },
//         {
//           name: "丰宁满族自治县",
//           tooltip: {
//             show: false,
//           },
//         },
//         {
//           name: "宽城满族自治县",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [0, -50],
//           },
//         },
//         {
//           name: "围场满族蒙古族自治县",
//           // 如果需要的话，可以对特定具名元素指定 tooltip 参数。
//           tooltip: {
//             show: false,
//           },
//         },
//         {
//           name: "平泉市",
//           // 如果需要的话，可以对特定具名元素指定 tooltip 参数。
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             offset: [-30, 0],
//           },
//         },
//       ],
//     },
//     series: seriesDatas,
//   };
//   // 设置图表实例的配置项以及数据
//   myChart.setOption(option);
//   myChart.getZr().on("click", function (params: any) {
//     var pixelPoint = [params.offsetX, params.offsetY];
//     var dataPoint = myChart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
//     // 在 SVG 上点击时，坐标会被打印。
//     // 这些坐标可以在 `series.data` 里使用。
//     console.log(dataPoint);
//   });
// };

watch(
  () => themeConfig,
  () => {
    renderMap();
  },
  {
    deep: true,
  }
);
onMounted(() => {
  initData();
});

onUnmounted(() => {
  if (myChart) {
    myChart.dispose();
  }
});
</script>
<style scoped lang="scss">
.echarts-3D-map {
  width: 100%;
  height: 100%;
  background: url("assets/image/background.png");
  background-size: 100% 100%;

  .echarts-3D-container {
    width: 100%;
    height: 100%;
  }
}
</style>
