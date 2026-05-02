<template>
    <div class="content-box">
        <div class="content-title"></div>
        <div class="content-content w-full h-full grid grid-cols-2 grid-rows-2 gap-y-[22px] box-border">
            <div class="content-content-item w-full h-full flex flex-col flex-nowrap">
                <div class="content-content-item-title">
                    <div class="title">
                        总体进度完成情况
                    </div>
                </div>
                <v-chart :option="getGaugeOption(84)" key="1" autoresize style="height: 330px; width: 100%;" />
            </div>
            <div class="content-content-item w-full h-full">
                <div class="content-content-item-title">
                    <div class="title">
                        总体通车里程情况
                    </div>
                </div>
                <div class="chart-wrapper">
                    <v-chart autoresize :option="pieOption2" style="height: 330px; width: 100%;" />
                </div>
            </div>
            <div class="content-content-item w-full h-full">
                <div class="content-content-item-title">
                    <div class="title">
                        公路里程统计
                    </div>
                </div>
                <div class="chart-wrapper">
                    <v-chart autoresize :option="pieOption3" style="height: 330px; width: 100%;" />
                </div>
            </div>
            <div class="content-content-item w-full h-full">
                <div class="content-content-item-title">
                    <div class="title">
                        公路投资进度统计
                    </div>
                </div>
                <v-chart autoresize :option="radaroptions" style="height: 330px; width: 100%;" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const pieData2 = [
    { name: '已通车', value: 35, itemStyle: { color: '#00D4FF', opacity: 0.6 } },
    { name: '未通车', value: 10, itemStyle: { color: '#FF9F40', opacity: 0.6 } }
];

const pieData3 = [
    { name: '省道', value: 35, itemStyle: { color: '#00D4FF', opacity: 0.6 } },
    { name: '国道', value: 10, itemStyle: { color: '#FF9F40', opacity: 0.6 } }
];

const series2 = getPie3D(pieData2, 0.6);

const series3 = getPie3D(pieData3, 0.6);

const pieOption2 = ref({
    backgroundColor: 'transparent',
    animation: true,
    silent: false,
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
            const pieDataItem = pieData2.find(item => item.name === name);
            const value = pieDataItem ? pieDataItem.value : 0;
            return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
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
        boxHeight: 0.8,
        top: '1%',
        height: '80%',
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
            distance: 120,
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

const pieOption3 = ref({
    backgroundColor: 'transparent',
    animation: true,
    silent: false,
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
            const pieDataItem = pieData3.find(item => item.name === name);
            const value = pieDataItem ? pieDataItem.value : 0;
            return `<div style="color: #FFFFFF;">
                <div style="font-size: 30px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name}: ${value}公里
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
        boxHeight: 0.8,
        top: '1%',
        height: '80%',
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
            distance: 120,
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
    series: series3
});    

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
                    fontSize: 32,
                    distance: -66,
                    color: '#CFE6F6',
                    formatter: function (v: number) { return v }
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
                    formatter: function () { return val + '%' }
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

const datavalue = [140, 100]; // 省道140万元，国道100万元

const radaroptions = ref({
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
            const color = params.color || '#00D4FF';
            const name = params.name;
            const value = params.value;
        if (color === '#4E6692') {
                return '';
            }

            return `<div style="color: #FFFFFF;">
                <div style="font-size: 24px; color: ${color}; font-weight: 600; text-shadow: 1px 1px 0 ${color};">
                    ${name} : ${value}万元
                </div>
            </div>`;
        }
    },
    angleAxis: {
        show: false,
        type: 'value',
        min: 0,
        max: 360
    },
    radiusAxis: {
        show: false,
        axisAngle: 0
    },
    radar: {
        shape: 'circle',
        scale: true,
        splitNumber: 11,
        startAngle: 90,
        splitLine: {
            show: false
        },
        splitArea: {
            show: false
        },
        axisLine: {
            show: true
        },
        axisName: {
            fontSize: 28,
            fontWeight: 800,
            color: '#5290B6'
        },
        indicator: [
            { text: '0' },
            { text: '220' },
            { text: '200' },
            { text: '180' },
            { text: '160' },
            { text: '140' },
            { text: '120' },
            { text: '100' },
            { text: '80' },
            { text: '60' },
            { text: '40' },
            { text: '20' }
        ],
        center: ['50%', '50%'],
        radius: '75%'
    },
    series: [
        {
            name: '省道',
            type: 'pie',
            startAngle: 90,
            clockwise: true,
            radius: ['20%', '35%'],
            itemStyle: {
                normal: {
                    color: function (params: any) {
                        var colorList = ['#FFD466', '#4E6692'];
                        return colorList[params.dataIndex];
                    },
                    label: {
                        show: false
                    }
                }
            },
            label: {
                show: true,
                color: '#FFFFFF',
                fontSize: 28,
                formatter: function (params: any) {
                    return params.name + '\n' + params.value + '万元';
                }
            },
            data: [
                { name:'省道',value: 100 },
                { value: 120 }
            ]
        },
        {
            name: '国道',
            type: 'pie',
            startAngle: 90,
            clockwise: true,
            radius: ['45%', '60%'],
            itemStyle: {
                normal: {
                    color: function (params: any) {
                        var colorList = ['#4EDAE0', '#4E6692'];
                        return colorList[params.dataIndex];
                    },
                    label: {
                        show: false
                    }
                }
            },
            label: {
                show: true,
                color: '#FFFFFF',
                fontSize: 28
            },
            data: [
                { name:'国道',value: 140 },
                { value: 80 }
            ]
        }
    ]
})

</script>

<style lang="scss" scoped>
.content-box {
    width: 100%;
    height: 100%;
    position: relative;

    .content-title {
        width: 532px;
        height: 58px;
        position: absolute;
        top: -68px;
        background: url('assets/component/规划项目弹窗集合_slices/切图 161.png') no-repeat 100%/100%;
    }

    .content-content-item {
        width: 643px;
        height: 458px;
        padding: 20px;
        box-sizing: border-box;
        background: url('assets/component/规划项目弹窗集合_slices/切图 160.png') no-repeat 100%/100%;
    }

    .content-content-item-title {
        background: url('assets/image/lefty/切图 48.png') no-repeat 100%/100%;
        height: 80px;
        width: 628px;
    }

    .title {
        font-weight: 400;
        font-size: 40px;
        color: #F2FEFF;
        line-height: 55px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        padding-left: 55px;
    }

    .chart-wrapper {
        position: relative;
        width: 600px;
        height: 310px;

        &::before {
            content: '';
            position: absolute;
            top: -80px;
            left: 60px;
            right: 60px;
            bottom: -100px;
            border-radius: 50%;
            z-index: 1;
            pointer-events: none;
            animation: circle-glow 3s ease-in-out infinite;
            transform: perspective(800px) rotateX(70deg) rotateY(0deg);
        }

        &::after {
            content: '';
            position: absolute;
            top: -75px;
            left: 55px;
            right: 55px;
            bottom: -105px;
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
</style>