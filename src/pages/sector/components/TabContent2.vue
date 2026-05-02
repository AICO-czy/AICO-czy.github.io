<template>
    <div class="container">
        <div class="container-header">
            <acountTitleBox v-for="item in headerList" :key="item.id" :text="item.text" :value="item.value"
                :unit="item.unit" />
        </div>
        <div class="container-content">
            <titleBox title="总体完成情况" />
            <div class="echarts-progress">
                <v-chart :option="option" style="height: 100px; width: 100%;" />
            </div>
            <div class="container-content-echarts">
                <titleBox title="项目状态分布" />
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title">路段建设进度</div>
                        <div class="chart-wrapper">
                            <v-chart :option="pieOption1" style="height: 450px; width: 100%;" />
                        </div>
                    </div>
                    <div class="chart-item">
                        <div class="chart-title">道路通车情况</div>
                        <div class="chart-wrapper">
                            <v-chart :option="pieOption2" style="height: 450px; width: 100%;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import titleBox from './titleBox.vue'
import acountTitleBox from './acountTitleBox.vue';

const headerList = ref<Array<{
    id: number,
    text: string,
    value: string,
    unit: string
}>>([
    { id: 1, text: '总投资:', value: '65', unit: '亿元' },
    { id: 2, text: '路段:', value: '1', unit: '条' },
    { id: 3, text: '路段:', value: '106', unit: '公里' },
])

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
                textAlign: 'right'  // 文本对齐：left, center, right
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
            label: {
                show: true,
                position: 'right',  // 标签位置：top, bottom, left, right, inside, insideLeft, insideRight, insideTop, insideBottom
                align: 'left',      // 标签水平对齐：left, center, right
                verticalAlign: 'middle',  // 标签垂直对齐：top, middle, bottom
                color: '#DAECF6',
                fontSize: 28,
                fontWeight: 'bold',
                formatter: '{c}%'   // 标签格式化
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

function getParametricEquation(startRatio: number, endRatio: number, isSelected: boolean, isHovered: boolean, k: number, height: number) {
    let midRatio = (startRatio + endRatio) / 2;
    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;

    if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
    }

    k = typeof k !== 'undefined' ? k : 1 / 3;

    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    let hoverRate = isHovered ? 1.05 : 1;

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
        x: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u: number, v: number) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u: number, v: number) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u);
            }
            return Math.sin(v) > 0 ? 1 * height : -1;
        }
    };
}

function getPie3D(pieData: any[], internalDiameterRatio: number) {
    let series: any[] = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

    for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem: any = {
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
            let itemStyle: any = {};
            if (typeof pieData[i].itemStyle.color != 'undefined') itemStyle.color = pieData[i].itemStyle.color;
            if (typeof pieData[i].itemStyle.opacity != 'undefined') itemStyle.opacity = pieData[i].itemStyle.opacity;
            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }

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
    }

    series.push({
        name: 'mouseoutSeries',
        type: 'surface',
        parametric: true,
        wireframe: { show: false },
        itemStyle: { opacity: 0.05, color: '#E1E8EC' },
        parametricEquation: {
            u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
            v: { min: 0, max: Math.PI, step: Math.PI / 20 },
            x: function (u: number, v: number) {
                return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
            },
            y: function (u: number, v: number) {
                return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
            },
            z: function (u: number, v: number) {
                return Math.cos(v) > 0 ? -0.5 : -5;
            }
        }
    });

    return series;
}

const pieData1 = [
    { name: '已建', value: 30, itemStyle: { color: '#00D4FF', opacity: 0.6 } },
    { name: '在建', value: 40, itemStyle: { color: '#60D9FF', opacity: 0.6 } },
    { name: '待建', value: 30, itemStyle: { color: '#FFB579', opacity: 0.6 } }
];

const pieData2 = [
    { name: '国道通车里程', value: 35, itemStyle: { color: '#00D4FF', opacity: 0.6 } },
    { name: '未通车国道里程', value: 25, itemStyle: { color: '#60D9FF', opacity: 0.6 } },
    { name: '省道通车里程', value: 30, itemStyle: { color: '#FFB579', opacity: 0.6 } },
    { name: '省道未通车里程', value: 10, itemStyle: { color: '#FF9F40', opacity: 0.6 } }
];

const series1 = getPie3D(pieData1, 0.6);
const series2 = getPie3D(pieData2, 0.6);

const pieOption1 = ref({
    backgroundColor: 'transparent',
    animation: true,
    silent: false,
    legend: {
        data: pieData1.map(item => item.name),
        top: '5%',
        left: 'center',  // 图例水平对齐：left, center, right
        orient: 'horizontal',  // 图例排列方向：horizontal, vertical
        textStyle: {
            fontFamily: 'AlibabaPuHuiTiRegular',
            fontWeight: 400,
            fontSize: 30,
            color: '#C6CECF',
            lineHeight: 41,
            textAlign: 'center',  // 文本对齐：left, center, right
            fontStyle: 'normal',
            textTransform: 'none'
        }
    },
    tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(0, 15, 30, 0.9)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        padding: [12, 16],
        borderRadius: 6,
        textStyle: {
            fontSize: 14,
            fontFamily: 'AlibabaPuHuiTiRegular',
            color: '#FFFFFF'
        },
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
        formatter: function (params: any) {
            if (params.seriesName === 'mouseoutSeries') return '';
            const color = params.color || '#00D4FF';
            const name = params.seriesName;
            // 从pieData1获取对应的数据
            const pieDataItem = pieData1.find(item => item.name === name);
            const value = pieDataItem ? pieDataItem.value : 0;
            return `<div style="color: #FFFFFF;">
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                    <div style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 5px ${color};"></div>
                    <span style="font-weight: 500; font-size: 14px;">${name}</span>
                </div>
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    数值: ${value}%
                </div>
            </div>`;
        }
    },
    xAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    yAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    zAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    grid3D: {
        show: false,
        boxHeight: 0.5,
        top: '10%',
        height: '70%',
        environment: 'none',
        light: {
            main: {
                intensity: 1.2,
                shadow: false
            },
            ambient: {
                intensity: 0.3
            }
        },
        viewControl: {
            distance: 180,
            alpha: 25,
            beta: 60,
            autoRotate: false,
            enableRotate: true,
            enableZoom: false,
            enablePan: false,
            mouseRotateSpeed: 1,
            mousePanSpeed: 0,
            mouseZoomSpeed: 0
        }
    },
    series: series1
});

const pieOption2 = ref({
    backgroundColor: 'transparent',
    animation: true,
    silent: false,
    legend: [
        {
            data: [pieData2[0]?.name || ''],
            top: '1%',
            left: '1%',
            orient: 'horizontal',
            itemWidth: 20,
            itemHeight: 12,
            width: '48%',
            textStyle: {
                fontFamily: 'AlibabaPuHuiTiRegular',
                fontWeight: 400,
                fontSize: 30,
                color: '#C6CECF',
                textAlign: 'left',
                fontStyle: 'normal',
                textTransform: 'none'
            }
        },
        {
            data: [pieData2[1]?.name || ''],
            top: '1%',
            left: '51%',
            orient: 'horizontal',
            itemWidth: 20,
            itemHeight: 12,
            width: '48%',
            textStyle: {
                fontFamily: 'AlibabaPuHuiTiRegular',
                fontWeight: 400,
                fontSize: 30,
                color: '#C6CECF',
                textAlign: 'left',
                fontStyle: 'normal',
                textTransform: 'none'
            }
        },
        {
            data: [pieData2[2]?.name || ''],
            top: '12%',
            left: '1%',
            orient: 'horizontal',
            itemWidth: 20,
            itemHeight: 12,
            width: '48%',
            textStyle: {
                fontFamily: 'AlibabaPuHuiTiRegular',
                fontWeight: 400,
                fontSize: 30,
                color: '#C6CECF',
                textAlign: 'left',
                fontStyle: 'normal',
                textTransform: 'none'
            }
        },
        {
            data: [pieData2[3]?.name || ''],
            top: '12%',
            left: '51%',
            orient: 'horizontal',
            itemWidth: 20,
            itemHeight: 12,
            width: '48%',
            textStyle: {
                fontFamily: 'AlibabaPuHuiTiRegular',
                fontWeight: 400,
                fontSize: 30,
                color: '#C6CECF',
                textAlign: 'left',
                fontStyle: 'normal',
                textTransform: 'none'
            }
        }
    ],
    tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: 'rgba(0, 15, 30, 0.9)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        padding: [12, 16],
        borderRadius: 6,
        textStyle: {
            fontSize: 14,
            fontFamily: 'AlibabaPuHuiTiRegular',
            color: '#FFFFFF'
        },
        extraCssText: 'box-shadow: 0 0 8px rgba(0, 212, 255, 0.4); backdrop-filter: blur(8px);',
        formatter: function (params: any) {
            if (params.seriesName === 'mouseoutSeries') return '';
            const color = params.color || '#00D4FF';
            const name = params.seriesName;
            // 从pieData2获取对应的数据
            const pieDataItem = pieData2.find(item => item.name === name);
            const value = pieDataItem ? pieDataItem.value : 0;
            return `<div style="color: #FFFFFF;">
                <div style="display: flex; align-items: center; margin-bottom: 6px;">
                    <div style="width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 8px; box-shadow: 0 0 5px ${color};"></div>
                    <span style="font-weight: 500; font-size: 14px;">${name}</span>
                </div>
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    数值: ${value}公里
                </div>
            </div>`;
        }
    },
    xAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    yAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    zAxis3D: {
        min: -1,
        max: 1,
        show: false
    },
    grid3D: {
        show: false,
        boxHeight: 0.5,
        top: '10%',
        height: '70%',
        environment: 'none',
        light: {
            main: {
                intensity: 1.2,
                shadow: false
            },
            ambient: {
                intensity: 0.3
            }
        },
        viewControl: {
            distance: 180,
            alpha: 25,
            beta: 60,
            autoRotate: false,
            enableRotate: true,
            enableZoom: false,
            enablePan: false,
            mouseRotateSpeed: 1,
            mousePanSpeed: 0,
            mouseZoomSpeed: 0
        }
    },
    series: series2
});
</script>

<style scoped lang="scss">
.container {
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 26px;

    .container-header {
        width: 100%;
        display: flex;
        align-items: center;
        column-gap: 40px;
    }

    .container-content-echarts {
        display: flex;
        flex-direction: column;
    }



    .container-content {
        width: 1301px;
        height: 667px;
        background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
        box-shadow: inset 0px 0px 12px 0px #4DA3FF;
        border-radius: 15px;
        display: flex;
        flex-direction: column;

        // 进度条
        .echarts-progress {
            width: 100%;
            height: 100px;
        }

        .chart-container {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            column-gap: 40px;

            .chart-item {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .chart-title {
                    font-family: AlibabaPuHuiTiRegular;
                    font-weight: 400;
                    font-size: 34px;
                    color: #BBD5EB;
                    line-height: 47px;
                    text-align: left;
                    font-style: normal;
                    text-transform: none;
                    margin-bottom: -30px;
                }

                .chart-wrapper {
                    position: relative;
                    width: 600px;
                    height: 600px;
                    margin-top: 50px;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 15px;
                        left: 140px;
                        right: 140px;
                        bottom: 205px;
                        border-radius: 50%;
                        z-index: 1;
                        pointer-events: none;
                        animation: circle-glow 3s ease-in-out infinite;
                        transform: perspective(800px) rotateX(70deg) rotateY(0deg);
                    }

                    &::after {
                        content: '';
                        position: absolute;
                        top: 20px;
                        left: 135px;
                        right: 135px;
                        bottom: 200px;
                        border-radius: 50%;
                        background: radial-gradient(circle,
                                rgba(0, 255, 255, 0.15) 0%,
                                rgba(0, 200, 255, 0.1) 30%,
                                rgba(100, 150, 255, 0.08) 50%,
                                rgba(0, 255, 255, 0.05) 70%,
                                rgba(0, 255, 255, 0) 100%);
                        z-index: 0;
                        pointer-events: none;
                        animation: circle-pulse 3s ease-in-out infinite;
                        transform: perspective(800px) rotateX(70deg) rotateY(0deg);
                    }

                    >* {
                        position: relative;
                        z-index: 2;
                        pointer-events: auto;
                    }
                }
            }
        }

        @keyframes circle-glow {

            0%,
            100% {
                opacity: 0.7;
            }

            50% {
                opacity: 1;
            }
        }

        @keyframes circle-pulse {

            0%,
            100% {
                opacity: 0.3;
                transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1);
            }

            50% {
                opacity: 1;
                transform: perspective(800px) rotateX(70deg) rotateY(0deg) scale(1.02);
                box-shadow: inset 0 0 30px rgba(0, 255, 255, 0.5);
            }
        }
    }
}
</style>
