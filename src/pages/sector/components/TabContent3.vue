<!-- 农村公路 -->
<template>
    <div class="tab-content-1">
        <!-- 顶部信息展示 -->
        <div class="container-header-item" style="justify-content: start; width: 100%; padding-left: 20px;">
            <div></div>
            <div><span>总投资</span><span>65亿元</span></div>
        </div>
        <div class="top-info">
            <div class="container-header-item" v-for="item in topInfo" :key="item.label">
                <div></div>
                <div><span>{{ item.label }}</span><span>{{ item.total }}</span></div>
            </div>
        </div>
        <!-- echarts图表 -->
        <div class="echarts-container">
            <!-- 标题组件 -->
            <div class="echarts-title">
                <titleBox title="总体完成情况" />
            </div>
            <!-- 进度条echart -->
            <div class="echarts-progress">
                <v-chart :option="option" style="height: 100px; width: 100%;" />
            </div>
            <!-- 轮播 echart -->
            <div class="carousel-container">
                <q-carousel
                :key="carouselKey"
                v-model="slide"
                vertical
                transition-prev="slide-down"
                transition-next="slide-up"
                swipeable
                animated
                infinite
                :autoplay="true"
                control-color="white"
                navigation-icon="radio_button_unchecked"
                navigation
                padding
                arrows
                height="600px"
                style="background: transparent;"
                >
                    <q-carousel-slide name="style" class="column no-wrap flex-center">
                        <div class="cont">
                            <div class="item" v-for="(item, idx) in value" :key="item">
                                <div class="top-title">
                                    <div class="title">
                                        {{ titleList[idx]?.title }}
                                    </div>
                                    <div class="subtitle">
                                        {{ titleList[idx]?.subtitle }}
                                    </div>
                                </div>
                                 <div class="char">
                                    <v-chart :option="getGaugeOption(item)" autoresize  style="height: 100%; width: 100%;"></v-chart>
                                 </div>
                            </div>
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide name="tv" class="column no-wrap flex-center">
                        <div class="cont2">
                            <titleBox title="项目规划投资及产值进度" style="margin-left: -20px;"/>
                            <div class="chart">
                                <v-chart :option="option2" autoresize style="height: 100%; width: 100%;"></v-chart>
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// @ts-ignore - vue SFC default export provided at runtime
import titleBox from './titleBox.vue'
import * as echarts from 'echarts'
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

const slide = ref('style')
const carouselKey = ref(0)

// 组件挂载后重置轮播状态
onMounted(() => {
    nextTick(() => {
        // 确保轮播组件正确初始化
        slide.value = 'style'
        // 强制重新渲染
        carouselKey.value++
    })
})

// 监听slide变化，确保轮播正常工作
watch(slide, () => {
    nextTick(() => {
        // 触发窗口resize事件，让图表重新计算尺寸
        window.dispatchEvent(new Event('resize'))
    })
})

// 组件卸载时清理
onUnmounted(() => {
    // 清理可能的定时器或事件监听
})

const topInfo = [
    {
        label: '新改建：',
        total: '75亿元'
    },
    {
        label: '危桥危隧：',
        total: '1条'
    },
    {
        label: '安防：',
        total: '123公里'
    }
]

// 进度条配置
const option = {
    grid: {
        top: 80,
        left: 80,
        right: 80
    },
     xAxis: {
         type: 'value',
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLine: {
             show: false
         },
         axisLabel: {
             show: false
         },
         max: 100,
     },
     yAxis: {
         type: 'category',
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLine: {
             show: false
         },
         axisLabel: {
             show: false
         },
     },
     graphic: [
         {
             type: 'text',
             right: 80,
             top: '0%',
             style: {
                 text: '80% 60亿元',
                 fontSize: 30,
                 fontWeight: 'bold',
                 fill: '#DAECF6',
                 textAlign: 'right'
             }
         }
     ],
     series: [
        {
         name: 'XXX',
         type: 'pictorialBar',
         symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhNJREFUeNq0llsoLVEcxme27ZJEPLimXJI4yaMQxZOkePN0IukQdZIXOiFFSrnkQUnigTydDkleSOLxpJRc6qBc6uSE3G8P+P71zWns9phlX776tWdmrzXfrFlrffPXt19fNQUlglLwBTjBM6/L8R1YA4vg6aOb6DZmOeAbOAYzYBO8uLQJA8V8mL9gCFx+xiwIdIFbMMhfFaWBFvALLKiYRYNuMAB2Nc9UD4I5yv9yuDSK4khavTASjYBD0G5lpoM+voYLzXvNglNQ4c6sBvwEJ5rvNArKQKTZLATkuptUH6gHNJvNKsGk5h8dcGQhhlkeWNX8J3ljJQ6mwCNQiZJkMAfuObdtIECh3wooEKMUsKfQIRQsgySeJ3DjSwB02PSVhwuUkcUwZuxUbjIy6zu3ja0cXImPCm3jLK5H8B5KZtdMDjutWVxfBw8K/XUH5ytFofFv16yDrkCD4orUZYGcc95U1ATmQRGNphUTRwZz5OTJDV+lSiYukc9IFte8sanlCav8tKHFIwtsG2YbIAOE+8HsKwP+Xer3cpP6UrEg3wh4s9k+V1ydj4wkcfrBD6sv9RQbVXtpJEXQMOgEZ1ZmGssC46sd5oFRNssCmZI/5j+cFh0mQCYYY3KMK6REKmhkGVfrLgJ1hSK1kB9X0Q4T54zVUyyXdbxsWpYB/zwtUl33Szprw3BWv2K69ZGBWW8CDAD7MHTPqrySXgAAAABJRU5ErkJggg==',
         symbolSize: [80, 80],
         symbolOffset: [40, 0],
         z: 12,
         itemStyle: {
             normal: {
                 color: '#14b1eb',
                 borderRadius: [10, 0, 0, 10]
             }
         },
         data: [{
             value: 80,
             symbolPosition: 'end'
         }]
        },
        {
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#14b1eb',
                    opacity: .7,
                    borderRadius: [10, 0, 0, 10]
                }
            },
            showBackground: true,
            backgroundStyle: {
                borderRadius: [0, 10, 10, 0]
            },
            silent: true,
            barWidth: 20,
            barGap: '-100%', // Make series be overlap
            data: [80]
        },
    ]
}

// 环形图配置
const value = [84, 80, 72]

const titleList = [
    {
        title: '新改建完成进度',
        subtitle: '规划3500公里'
    },
    {
        title: '危桥危隧完成进度',
        subtitle: '规划49座'
    },
    {
        title: '安防完成进度',
        subtitle: '规划97公里'
    }
]
function getGaugeOption(val: number) {
return {
    angleAxis: {
      show: false,
      max: (100 * 360) / 180, //-45度到225度，二者偏移值是270度除360度
      type: 'value',
      startAngle: 180, //极坐标初始角度
      splitLine: {
        show: false,
      },
    },
    barMaxWidth: 18, //圆环宽度
    radiusAxis: {
      show: false,
      type: 'category',
    },
    //圆环位置和大小
    polar: {
      center: ['50%', '66%'],
      radius: '170%',
    },
    series: [
      {
        //下层圆环，显示最大值
        type: 'bar',
        data: [
          {
            value: 100,
            itemStyle: {
                color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1, //从左到右 0-1
                    y2: 0,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(27, 125, 227, 1)'
                    }, {
                        offset: 0.2,
                        color: 'rgba(56, 201, 201, 1)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(56, 201, 201, 1)'
                    }, {
                        offset: 1,
                        color: 'rgba(249, 87, 87, 1)'
                    }],
                },
            },
          },
        ],
        barGap: '-100%',
        coordinateSystem: 'polar',
        roundCap: true,
        z: 1,
      },
       {
            type: "gauge",
            radius: '100%',
            center: ["50%", "70%"],
            splitNumber: 4,
            startAngle: 180,
            endAngle: 0,
            axisLine: {
              show: false,
              lineStyle: {
                width: 18,
                color: [[1, 'rgba(0,0,0,0)']],
              },
            },
            //分隔线样式。
            splitLine: {
                show: false,
                length: 12,
                lineStyle: { color: 'rgba(255,255,255,0.3)' }
            },
            axisLabel: {
              show: true,
              fontSize:32,
              distance:-66,
              color:'#CFE6F6',
              formatter:function(v: number){ return v }
            },
            axisTick: {
                show: true,
                length: 6,
                lineStyle: { color: 'rgba(255,255,255,0.3)' }
            },
            pointer: {
                show: true,
                length: "72%",
                width: 6,
                itemStyle: {
                  color: '#E6EFFA',
                  shadowColor: 'rgba(0,0,0,0.4)',
                  shadowBlur: 6
                }
            },
            itemStyle: { color: '#8280bc' },
            //仪表盘详情，用于显示数据。
            detail: {
                show: true,
                offsetCenter: ['0', '20%'],
                textStyle: {
                    fontSize: 34,
                    color: '#E6EFFA',
                },
                formatter:function(){ return val + '%'}
            },
            data: [{ value: val }],
            anchor: {
              show: true,
              showAbove: true,
              size: 10,
              itemStyle: {
                color: '#9FB8D6',
                shadowColor: 'rgba(0,0,0,0.45)',
                shadowBlur: 8
              }
            },
        }
    ],
};
}


// 柱状图配置
const scale = 1;
const color = "#189cbb";
const option2 = {
    tooltip: {
        show:false,
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['规划投资（亿元）', '完成投资（亿元）'],
        align: 'left',
        itemGap: 50,
        // x: 'right',
        right:'10%',
        y: '10%',
        icon: 'rect',
        itemWidth: 15*scale, // 图例图形宽度
		itemHeight: 15*scale, // 图例图形高度
        textStyle: {
            color: '#C6CECF',
            fontSize: 30,
            padding: [0, 0, 0, 10]
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        data: ['承平高速', '承克高速', '承德南互通','全山岭互通','茅荆坝互通'],
        axisLabel: {
            show: true,
            textStyle: {
                color: "#8c8c8c",
                fontSize: 30
            }
        },
        axisTick: {
            inside:false,
            length:8*scale,
            lineStyle: {
                color: color,
            }
        },
        axisLine: {
            show: false,
        },
        splitLine: {
            show: false,
        }
    }],
    yAxis: [{
        type: 'value',
        max:600,
        axisLabel: {
            textStyle: {
            color: "#8c8c8c",
            fontSize: 30
          }
        },
        axisTick: {
            lineStyle: {
                color: color,
            }
        },
        axisLine: {
            show: false,
          lineStyle: {
            color: "#82909D"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(130, 144, 157, 0.34)"
          }
        },
    }],
    series: [
    {
        name: '规划投资（亿元）',
        type: 'bar',
        barWidth: 21,
        barGap:'10%',
        label: {
            show:false
        },
        itemStyle: {
            normal: {
                color:'rgba(94,218,255,0.8)',
            }
        },
        data: [300, 280, 450, 320, 380]
    },
    {
        name: '完成投资（亿元）',
        type: 'bar',
        barWidth: 21,
        barGap:'10%',
        label: {
            show:false
        },
        itemStyle: {
            normal: {
                color:'#23aecb',
            }
        },
        data: [250, 220, 380, 280, 320]
    }]
};

</script>

<style scoped lang="scss">
.q-carousel__slide {
    padding: 0  20px !important;
}
.tab-content-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .top-info {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
    }
    .container-header-item {
            display: flex;
            align-items: center;
            column-gap: 25px;
            margin-right: 40px;
        }

        .container-header-item div:first-child {
            width: 23px;
            height: 22px;
            background: linear-gradient(158deg, #D0E5E5 0%, rgba(208, 229, 229, 0) 100%);
            border-radius: 50%;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                background: #60D9FF;
                border-radius: 50%;
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .container-header-item div:last-child {
            display: flex;
            align-items: center;

            span:first-child {
                font-family: AlibabaPuHuiTi, PingFang SC, Microsoft YaHei, sans-serif;
                font-weight: 400;
                font-size: 30px;
                line-height: 42px;
                font-style: normal;
                text-transform: none;
                color: #FFFFFF;
                margin-right: 20px;
                white-space: nowrap;
            }

            span:last-child {
                font-family: YouSheBiaoTiHei, PingFang SC, Microsoft YaHei, sans-serif;
                font-weight: 400;
                font-size: 46px;
                line-height: 60px;
                font-style: normal;
                text-transform: none;
                background: linear-gradient(to bottom, #FFB579 0%, #FFEFB8 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                -moz-background-clip: text;
                -moz-text-fill-color: transparent;
                white-space: nowrap;
            }
        }
         .echarts-container {
            width: 100%;
            flex: 1;
         box-shadow: inset 0px 0px 12px 0px #4DA3FF;
         background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
        //  background: url('assets/image/lefty/bg148.png') no-repeat 100%;
         display: flex;
         flex-direction: column;
         overflow: hidden;
         // 进度条
         .echarts-progress {
             width: 100%;
             height: 100px;

             // 添加圆圈闪烁动画
             :deep(.echarts-for-vue) {
                 .pictorialBar {
                     animation: blink 2s infinite;
                 }
             }
         }
     }

     // 闪烁动画
     @keyframes blink {
         0%, 50% {
             opacity: 1;
             transform: scale(1);
         }
         25%, 75% {
             opacity: 0.3;
             transform: scale(1.1);
         }
         100% {
             opacity: 1;
             transform: scale(1);
         }
     }
    .cont {
        width: 100%;
        height: 100%;
        display: flex;
        .item {
            flex: 1;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .char{
                width: 100%;
                height: calc(100% - 40px) !important;
                padding: 10px;
            }
            .top-title {
                height: 110px !important;
                font-size: 24px !important;
                color: #fff !important;
                .title {
                    font-family: AlibabaPuHuiTiRegular;
                    font-weight: 400;
                    font-size: 34px;
                    -webkit-text-fill-color: #BBD5EB !important;
                }
                .subtitle {
                    font-family: AlibabaPuHuiTiRegular;
                    font-weight: 400;
                    font-size: 34px;
                    -webkit-text-fill-color: #2FE3FF !important;
                }
            }
        }
    }
    .cont2 {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0;
        .chart {
            width: 100%;
            flex: 1;
        }
    }

    // 轮播容器样式
    .carousel-container {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 400px;

        :deep(.q-carousel) {
            width: 100%;
        }

        :deep(.q-carousel__slide) {
            padding: 20px !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
        }

        :deep(.q-carousel__navigation) {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }

        .cont {
            width: 100%;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .item {
                flex: 1;
                min-width: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;

                .char {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .cont2 {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 0;

            .chart {
                width: 100%;
                flex: 1;
            }
        }
    }
}
</style>
