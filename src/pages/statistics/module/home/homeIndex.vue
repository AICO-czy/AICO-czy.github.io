<template>
  <div class="bg" v-if="activeTab=='4-1-1'">
    <div class="search"><search-com /></div>
    <div class="body-box">
      <div class="line-box">
        <div class="tip">线路编号 + 线路名称</div>
        <img class="left-arr" :src="png1" alt="" @click="handleCurrnt('left')" />
        <div class="line">
          <line-item v-for="item in showData" :roundName="item.name" :round-num="item.num" />
        </div>
        <img class="right-arr" :src="png1" alt="" @click="handleCurrnt('right')" />
      </div>
      <div class="card-list">
        <div class="card-list-inner">
          <div class="item" v-for="item in showData">
            <card-item class="item" title="交通量" v-if="item.name && item.num">
              <v-chart :option="pieOption(item, 1)" autoplay style="height: 450px; width: 100%;" />
            </card-item>
            <card-item class="item" title="车型" v-if="item.name && item.num">
              <v-chart :option="pieOption(item, 2)" autoplay style="height: 450px; width: 100%;" />
            </card-item>
            <card-item class="item" title="" v-if="item.name && item.num">
              <v-chart :option="pieOption(item, 3)" autoplay style="height: 600px; width: 100%;" />
            </card-item>
            <card-item class="item" title="平均速度" v-if="item.name && item.num">
              <v-chart :option="pieOption(item, 4)" autoplay style="height: 450px; width: 100%;" />
            </card-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, toRefs } from 'vue'
import CardItem from './components/cardItem.vue'
import LineItem from './components/lineItem.vue'
import * as echarts from 'echarts'
import SearchCom from './components/searchCom.vue'
import png1 from "src/assets/component/statistics/切图 514.png";
import { useMenuStore } from "../store/index";


const storeMenu = useMenuStore();
const { activeTab } = toRefs(storeMenu)

const page = ref(1)

const data = [
  { name: '交调站1', num: 'K060+500', data: [] },
  { name: '交调站2', num: 'K060+500', data: [] },
  { name: '交调站3', num: 'K060+500', data: [] },
  { name: '交调站4', num: 'K060+500', data: [] },
  { name: '交调站5', num: 'K060+500', data: [] },
]

function pieOption(data = null, type) {
  switch (type) {
    case 1:
      return {
        // backgroundColor: '#0B1346',
        grid: {
          top: "100",
          bottom: "20"//也可设置left和right设置距离来控制图表的大小
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: false, //X轴的
            }
          }
        },
        legend: {
          data: ["交通量"],
          top: "5",
          textStyle: {
            color: "#ffffff"
          }
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月"
          ],
          axisLine: {
            show: true,
            symbol: ['none', 'arrow'],
            lineStyle: { color: '#CBDDF4', fontSize: '45px' }
          },
          axisTick: {
            show: false //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            // rotate: 45,
            interval: 0,
            textStyle: {
              color: "#CBDDF4" //X轴文字颜色
            }
          },

        },
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              symbol: ['none', 'arrow'],
              lineStyle: { color: '#CBDDF4' }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#BADBFB"
              }
            },

          },


        ],
        series: [
          {
            name: "交通量",
            type: "bar",
            barWidth: 15,
            showSymbol: true,
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "rgba(50, 206, 245, 1)",
                },
                {
                  offset: 0.5,
                  color: "rgba(50, 206, 245, 0.5)"
                },
                {
                  offset: 1,
                  color: "rgba(50, 206, 245, 0)"
                }
                ]),
              },
            },
            data: ['27', '46', '35', '15', '56']
          },
        ]
      }
      break;
    case 2:
      const colorList = ['rgba(69, 244, 245,  0.9)', 'rgba(7, 166, 255,  0.9)', 'rgba(255, 208, 118,  0.9)', 'rgba(109, 148, 198, 0.9)', 'rgba(255, 255, 255,  0.9)']

      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2;

        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        // if (startRatio === 0 && endRatio === 1) {
        //     isSelected = false;
        // }
        isSelected = false;
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
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
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * 0.1;
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
          },
        };
      }

      // 生成模拟 3D 饼图的配置项
      function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k =
          typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: 1 / 10,
            },
          };

          if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle = {};

            typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            typeof pieData[i].itemStyle.opacity != 'undefined'
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;

            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;

          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );

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
            opacity: 0.1,
            color: '#E1E8EC',
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
              return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
            },
            y: function (u, v) {
              return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
            },
            z: function (u, v) {
              return Math.cos(v) > 0 ? -0.5 : -5;
            },
          },
        });

        // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        series.push({
          name: 'mouseoutSeries',
          type: 'surface',
          parametric: true,
          wireframe: {
            show: false,
          },
          itemStyle: {
            opacity: 0.1,
            color: 'rgba(101, 153, 164, 0.24)',
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
              return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
            },
            y: function (u, v) {
              return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
            },
            z: function (u, v) {
              return Math.cos(v) > 0 ? -5 : -7;
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
            opacity: 0.1,
            color: '#E1E8EC',
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
              return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
            },
            y: function (u, v) {
              return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
            },
            z: function (u, v) {
              return Math.cos(v) > 0 ? -7 : -7;
            },
          },
        });

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          // animation: false,
          // backgroundColor: '#163043',
          // animation: false,
          // backgroundColor: '#163043',
          fontFamily: 'Source Han Sans CN',
          legend: {
            icon: 'none',
            orient: 'vertical',
            data: pieData.map((dItem, dIndex) => {
              return {
                ...dItem,
                textStyle: {
                  rich: {
                    iconName: {
                      width: 4,
                      height: 16,
                      borderRadius: 5,
                      backgroundColor: colorList[dIndex],
                    },
                    percent: {
                      color: colorList[dIndex],
                    },
                  }
                },

              }
            }),
            right: '5%',
            top: '20%',
            itemGap: 30,
            itemWidth: 12,
            itemHeight: 12,
            selectedMode: false, // 关闭图例选择
            textStyle: {
              color: '#fff',
              fontSize: 28,
              fontFamily: 'Source Han Sans CN',
              rich: {
                // iconName: {
                //   width: 5,
                //   height: 8,
                //   backgroundColor: '#ff00ff'
                // },
                name: {
                  color: '#FFF',
                  fontSize: 28,
                  width: 140,
                  padding: [0, 0, 0, 10],
                },
                value: {
                  color: '#2BDFD4',
                  fontFamily: 'PangMenZhengDao',
                  fontSize: 28,
                  width: 80,
                  padding: [0, 0, 0, 30]
                },
                percent: {
                  color: '#2BDFD4',
                  fontFamily: 'PangMenZhengDao',
                  fontSize: 28,
                  padding: [0, 0, 0, 30]
                },
                unit: {
                  color: '#ACDCE4',
                  fontSize: 24,
                  padding: [0, 0, 0, 5]
                }
              }
            },
            formatter: name => {
              let obj = pieData.find(item => item.name === name);
              let datas = pieData;
              let total = 0;
              let target = obj.value
              for (let i = 0; i < datas.length; i++) {
                total += Number(datas[i].value);
              }
              const arr = [
                `{iconName|}{name|${name}}{value|${obj.value}}{percent|${((target / total) * 100).toFixed(0)}}{unit|%}`
              ];
              return arr.join('')
            }
          },


          xAxis3D: {},
          yAxis3D: {},
          zAxis3D: {},
          grid3D: {
            viewControl: {
              autoRotate: true, // 自动旋转
            },
            left: '4%',
            width: '40%',
            show: false,
            boxHeight: 60,
          },
          series: series,
        };
        return option;
      }

      const data =
        [
          {
            name: '性能测试',
            value: 134,
          },
          {
            name: '安全',
            value: 56,

          },
          {
            name: '功能',
            value: 57,
          },
          {
            name: '代码',
            value: 11,
          },
          {
            name: '易用性',
            value: 51,
          },
        ]
      const serData = data.map((dItem, index) => {
        return {
          ...dItem,
          value: Number(dItem.value),
          itemStyle: {
            color: colorList[index]
          },
        }
      })
      // 传入数据生成 option
      return getPie3D(serData, 0.7);
      break;
    case 3:
      return {
        // backgroundColor: '#1f4279',
        grid: {
          top: "100",
          bottom: "20",//也可设置left和right设置距离来控制图表的大小
          right: ''
        },
        color: ['#4CD57D', '#0CE5F3', '#4772E1', '#EFB062', '#4b5cc4', '#fa8c35'],
        tooltip: {
          show: false,
          backgroundColor: '#02132fC9',
          borderColor: '#0D97E460',

          textStyle: {
            fontSize: 16,
            color: '#DCDCDC'
          },
          formatter: (params) => {
            var yzg = (params.data.yzg / params.value) * 100;
            var wzg = (params.data.wzg / params.value) * 100;
            return `${params.name}:${params.value}件<br/>
          客车: ${params.data.yzg}件(${yzg.toFixed(2)}%)<br/>
          货车: ${params.data.wzg}件(${wzg.toFixed(2)}%)`;
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: '30%',
          icon: 'rect',
          textStyle: {
            fontSize: 14,
            color: '#fff'
          }
          //  show: false,
        },
        series: [
          {
            name: '',
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['55%', '70%'],
            avoidLabelOverlap: false,

            label: {
              textStyle: {
                fontSize: 14,
                color: '#fff'
              }
            },
            labelLine: {},

            data: [
              { value: 56, name: '中小客车', yzg: 50, wzg: 6 },
              { value: 74, name: '大客车', yzg: 70, wzg: 4 },
              { value: 23, name: '小型货车', yzg: 6, wzg: 2 },
              { value: 11, name: '中型货车', yzg: 10, wzg: 1 },
              { value: 11, name: '大型货车', yzg: 10, wzg: 1 },
              { value: 11, name: '特大型货车', yzg: 10, wzg: 1 },
              { value: 11, name: '集装箱车', yzg: 10, wzg: 1 }
            ]
          },
          {
            name: '',
            type: 'pie',
            selectedMode: 'single',
            center: ['35%', '50%'],
            radius: [0, '45%'],
            label: {
              position: 'inner',
              textStyle: {
                fontSize: 14,
                color: '#fff'
              },
              formatter: (params) => {
                return `${params.name}\n\n${params.value}件`;
              }
            },
            // labelLine: {
            //   show: false
            // },
            data: [
              // 默认和第一个数值相同
              { value: 50, name: '客车' },
              { value: 6, name: '货车' }
            ]
          }
        ]
      }
      break;
    case 4:
      return {
        title: {
          text: "单位:千米/小时",
        },
        legend: {
          data: ["平均速度"],
          top: "5",
          textStyle: {
            color: "#ffffff"
          }
        },
        xAxis: {
          type: "category",
          data: ["1月",
            "2月",
            "3月",
            "4月",
            "5月"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "平均速度",
            data: [5, 6, 7, 3.5, 4],
            type: "line",
            symbol: "circle", // 设置数据点为圆形（可选 'rect', 'triangle', 'diamond' 等）
            symbolSize: 4, // 数据点大小
            itemStyle: {
              color: "#88d879", // 数据点填充颜色（实心效果）
            },
            // 面积渐变配置
            areaStyle: {
              // 线性渐变：参数 (x0, y0, x1, y1) 控制渐变方向，取值范围 0~1（对应图表宽高比例）
              // 这里 (0, 1, 0, 0) 表示「从下往上」渐变（y 轴方向）
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                { offset: 1, color: "rgba(236, 249, 233,.5)" }, // 渐变起点（底部）：深一点的浅绿色
                { offset: 0, color: "rgba(255, 255, 255,0)" }, // 渐变终点（顶部）：浅一点的浅绿色
              ]),
            },
            // 折线颜色（可单独配置，让折线更清晰）
            lineStyle: {
              color: "#88d879",
            },
          },
        ],
      }
      break;

    default:
      break;
  }
}

const showData = computed(() => {
  //判断data长度是否小于等于page*3
  let outdata = []
  if (data.length <= page.value * 3) {
    //如果是则返回从(page-1)*3开始到数组末尾的所有数据并补齐三个
    outdata = data.slice((page.value - 1) * 3).concat(new Array(page.value * 3 - data.length).fill({ name: '', num: '' }))
  } else {
    outdata = data.slice((page.value - 1) * 3, page.value * 3)
  }
  // console.log(page.value, outdata);

  return outdata
})

function handleCurrnt(type) {
  if (type == 'left' && page.value > 1) {
    // console.log('++');
    page.value--
  } else if (type == 'right' && page.value * 3 < data.length) {
    page.value++
    // console.log('--');
  }
}

</script>

<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  pointer-events: all;


  .search {
    height: 103px;
    width: 100%;
    padding: 0 120px;
    margin-bottom: 49px;
    margin-top: 37px;
    display: flex;
  }


  .body-box {
    height: 1740px;
    overflow: hidden;
    // background: pink;

    .line-box {
      height: 250px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin: 0 149px;
      position: relative;
      // background: pink;
      margin-bottom: 44px;

      .tip {
        position: absolute;
        top: 20px;
        left: 120px;
        font-family: Source Han Sans, Source Han Sans;
        font-weight: 500;
        font-size: 50px;
        color: #A9CEE8;
        line-height: 72px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .line {
        height: 30px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: linear-gradient(270deg, rgba(0, 149.96428817510605, 230.7142871618271, 0), rgba(0, 149.96428817510605, 230.7142871618271, 0.4452054798603058), rgba(0, 149.96428817510605, 230.7142871618271, 0));
      }

      .left-arr {
        width: 79px;
        height: 143px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      .right-arr {
        width: 79px;
        height: 143px;
        // transform: ;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%) rotateZ(180deg);
      }
    }

    .card-list {
      padding: 0 120px;

      .card-list-inner {
        padding: 0 80px;
        height: 1400px;
        min-height: 1400px;
        width: 100%;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0 43px;

        //滚动条样式设置
        &::-webkit-scrollbar {
          width: 15px;
          /* 设置滚动条的宽度 */
        }

        &::-webkit-scrollbar-thumb {
          background: rgba(78, 193, 255, 0.50);
          /* 设置滚动条滑块的颜色 */
          border-radius: 86px;
          /* 设置滚动条滑块的圆角 */
        }

        &::-webkit-scrollbar-track {
          background: transparent;
          /* 设置滚动条轨道的颜色 */
        }

        .item {
          margin-bottom: 43px;
        }
      }
    }
  }
}
</style>
