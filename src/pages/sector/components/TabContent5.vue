<template>
    <div class="container">
        <div class="container-header">
            <acountTitleBox v-for="item in headerList" :key="item.id" :text="item.text" :value="item.value"
                :unit="item.unit" />
        </div>
        <div class="container-content">
            <div class="container-content-echarts">
                <titleBox title="总体完成情况" />
                <div class="chart-container">
                    <div class="chart-item">
                        <div class="chart-title" style="margin-top: 60px;margin-bottom: -100px;">项目状态分布</div>
                        <div class="chart-wrapper">
                            <v-chart :option="pieOption2" style="height: 450px; width: 100%;" />
                        </div>
                    </div>
                    <div class="chart-item">
                        <div class="chart-title">项目状态分布</div>
                        <div class="chart-wrapper">
                            <v-chart :option="pieOption1" style="height: 450px; width: 100%;" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-content-table">
                <div class="table-header-wrapper">
                    <table class="header-table">
                        <thead>
                            <tr class="table-header">
                                <th>序号</th>
                                <th>县级行政区</th>
                                <th>项目名称</th>
                                <th>面积/亩</th>
                                <th>总投资/亿元</th>
                                <th>累计投资</th>
                                <th>项目状态</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="table-body-wrapper">
                    <table class="body-table">
                        <tbody>
                            <tr v-for="(item, index) in tableData" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.district }}</td>
                                <td>{{ item.projectName }}</td>
                                <td>{{ item.area }}</td>
                                <td>{{ item.totalInvestment }}</td>
                                <td>{{ item.cumulativeInvestment }}</td>
                                <td>{{ item.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import titleBox from './titleBox.vue'
import acountTitleBox from './acountTitleBox.vue';

const tableData = ref([
    {
        id: 1,
        district: '承德县',
        projectName: '承德县旅游公路改造项目',
        area: '1250',
        totalInvestment: '2.5',
        cumulativeInvestment: '1.8',
        status: '在建'
    },
    {
        id: 2,
        district: '围场县',
        projectName: '围场县生态旅游路网建设',
        area: '980',
        totalInvestment: '1.8',
        cumulativeInvestment: '1.2',
        status: '已建'
    },
    {
        id: 3,
        district: '丰宁县',
        projectName: '丰宁县景区连接道路',
        area: '750',
        totalInvestment: '1.5',
        cumulativeInvestment: '0.8',
        status: '待建'
    },
    {
        id: 4,
        district: '隆化县',
        projectName: '隆化县交通枢纽建设',
        area: '620',
        totalInvestment: '2.1',
        cumulativeInvestment: '2.1',
        status: '已建'
    },
    {
        id: 5,
        district: '平泉市',
        projectName: '平泉市城乡道路提升工程',
        area: '890',
        totalInvestment: '1.9',
        cumulativeInvestment: '1.5',
        status: '在建'
    },
    {
        id: 6,
        district: '兴隆县',
        projectName: '兴隆县山区公路建设',
        area: '1100',
        totalInvestment: '2.3',
        cumulativeInvestment: '1.0',
        status: '待建'
    },
    {
        id: 7,
        district: '滦平县',
        projectName: '滦平县旅游环线项目',
        area: '950',
        totalInvestment: '1.7',
        cumulativeInvestment: '1.7',
        status: '已建'
    },
    {
        id: 8,
        district: '宽城县',
        projectName: '宽城县农村公路改造',
        area: '680',
        totalInvestment: '1.3',
        cumulativeInvestment: '0.9',
        status: '在建'
    }
]);

const headerList = ref<Array<{
    id: number,
    text: string,
    value: string,
    unit: string
}>>([
    { id: 1, text: '总投资:', value: '10', unit: '亿元' },
    { id: 2, text: '数量:', value: '2', unit: '个' },
])

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

<style lang="scss" scoped>
.container-content-table table td {
    color: #FFFFFF !important;

    // &, & * {
    //     color: #FFFFFF !important;
    // }
}

:deep(.body-table td) {
    color: #FFFFFF !important;
}

:deep(.body-table td *) {
    color: #FFFFFF !important;
}

.container {
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 26px;
}

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
    height: 888px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    box-shadow: inset 0px 0px 12px 0px #4DA3FF;
    border-radius: 15px;
    display: flex;
    flex-direction: column;


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
                height: 310px;
                margin-top: 50px;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0px;
                    left: 140px;
                    right: 140px;
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
                    top: 5px;
                    left: 135px;
                    right: 135px;
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

.container-content-table {
    height: 388px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .table-header-wrapper {
        width: 100%;
        flex-shrink: 0;

        .header-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            .table-header {
                height: 84px;
                background-image: url('assets/component/规划项目弹窗集合_slices/切图 153.png');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;

                th {
                    font-family: AlibabaPuHuiTiRegular;
                    font-weight: 500;
                    font-size: 34px;
                    color: white;
                    line-height: 84px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                    padding: 0 15px;
                    border: none;
                    vertical-align: middle;
                    height: 84px;
                    white-space: nowrap;

                    &:nth-child(1) { width: 8%; }
                    &:nth-child(2) { width: 15%; }
                    &:nth-child(3) { width: 25%; }
                    &:nth-child(4) { width: 12%; }
                    &:nth-child(5) { width: 16%; }
                    &:nth-child(6) { width: 12%; }
                    &:nth-child(7) { width: 12%; }
                }
            }
        }
    }

    .table-body-wrapper {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 300px;
        position: relative;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        background-color: rgba(0, 0, 0, 0.01);

        .body-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;

            tbody {
                tr {
                    height: 97px;
                    background: rgba(0, 0, 0, 0.2);
                    transition: background-color 0.2s ease;

                    &:nth-child(even) {
                        background: rgba(140, 178, 231, 0.2);
                        border-radius: 0px 0px 0px 0px;
                    }

                    &:hover {
                        background: rgba(0, 212, 255, 0.4) !important;
                    }

                    td {
                        font-family: AlibabaPuHuiTiRegular;
                        font-weight: 400;
                        font-size: 30px;
                        color: #FFFFFF !important;
                        line-height: 97px;
                        text-align: center;
                        font-style: normal;
                        text-transform: none;
                        padding: 0 15px;
                        border: none;
                        vertical-align: middle;
                        height: 97px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        box-sizing: border-box;
                        text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.8);
                        position: relative;
                        z-index: 10;

                        /* 强制白色字体 */
                        // &, & * {
                        //     color: #FFFFFF !important;
                        // }

                        /* 移除任何可能的继承样式 */
                        text-decoration: none !important;
                        background-color: transparent !important;

                        &:nth-child(1) { width: 8%; }
                        &:nth-child(2) { width: 15%; }
                        &:nth-child(3) { width: 25%; }
                        &:nth-child(4) { width: 12%; }
                        &:nth-child(5) { width: 16%; }
                        &:nth-child(6) { width: 12%; }
                        &:nth-child(7) { width: 12%; }
                    }
                }
            }
        }
    }

    /* 自定义滚动条 */
    .table-body-wrapper::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .table-body-wrapper::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 3px;
    }

    .table-body-wrapper::-webkit-scrollbar-thumb {
        background: rgba(0, 212, 255, 0.7);
        border-radius: 3px;
        border: 1px solid rgba(0, 212, 255, 0.3);

        &:hover {
            background: rgba(0, 212, 255, 0.9);
            border: 1px solid rgba(0, 212, 255, 0.5);
        }
    }

    .table-body-wrapper::-webkit-scrollbar-corner {
        background: transparent;
    }
}
</style>
