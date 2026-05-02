<template>
    <dialog-com title="'十五五'规划建设项目投资表" ref="dialogRef" @switchBtn="handleSwitchBtn" :showLink="false">
        <div class="body-box bg2" v-if="active">
            <div class="tab-container">
                <div class="tab-item" :class="{ active: activeTab === 'total' }" @click="switchTab('total')">
                    投资占比分析
                </div>
                <div class="tab-item" :class="{ active: activeTab === 'sub' }" @click="switchTab('sub')">
                    年度投资分析
                </div>
            </div>
            <div v-if="activeTab === 'total'">
                <v-chart :option="pieOption1" style="height: 700px; width: 100%;" />
            </div>
            <div v-if="activeTab === 'sub'">
                <div class="tab-container yearList">
                    <div class="tab-item" v-for="item in yearList" :class="{ active: activeIndex === item }" @click="switchIndex(item)">
                        {{ item }}
                    </div>
                </div>
                <v-chart :option="pieOption2" style="height: 650px; width: 100%;" />
            </div>
        </div>
        <div class=" body-box bg1" v-else>
            <div></div>
            <!-- 表格头部 -->
            <div class="table-head">
                <div class="table-head-item" v-for="item in header">{{ item.title }}</div>
            </div>
            <!-- 表格内容 -->
            <div class="table-body" v-for="(item, index) in tableData">
                <div v-for="it in header" class="table-body-item">{{ item[it.value] }}</div>
            </div>
        </div>
    </dialog-com>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogCom from './components/dialogCom.vue'
import ItemCom from './components/itemCom.vue'

const dialogRef = ref<InstanceType<typeof DialogCom> | null>(null)

const active = ref(true)

const activeTab = ref('total')

function switchTab(type: string) {
    activeTab.value = type
}

const activeIndex = ref('2026年')

const yearList = ref([
    '2026年',
    '2027年',
    '2028年',
    '2029年',
    '2030年',
])

function switchIndex(ind:string){
    activeIndex.value = ind
}

const pieOption1 = ref({
    title: {
        text: '', // 可不设置标题，若有需求可自定义
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: '10%', // 图例居右
        top: 'center',
        align: 'left', // 图例文字左对齐
        textStyle:{
            fontSize:"50px",
        },
        data: [
            {
                name: '高速公路',
                icon: 'circle', // 图例标记样式，这里用圆形
                textStyle: {
                    color: '#fff'
                }
            },
            {
                name: '普通干线公路',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            },
            {
                name: '农村公路',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            },
            {
                name: '公路养护工程',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            },
            {
                name: '公路运输枢纽工程',
                icon: 'circle',
                textStyle: {
                    color: '#fff'
                }
            }
        ]
    },
    series: [
        {
            name: '公路工程类型占比',
            type: 'pie',
            radius: ['0', '90%'], // 环形饼图，若要实心可改 ['0%', '70%']
            center: ['65%', '50%'], // 饼图中心位置，配合图例居右调整
            data: [
                { value: 50.78, name: '高速公路' },
                { value: 38.61, name: '普通干线公路' },
                { value: 4.17, name: '农村公路' },
                { value: 1.73, name: '公路养护工程' },
                { value: 4.71, name: '公路运输枢纽工程' }
                // 数据需确保总和合理，这里按图中大致占比模拟，实际替换真实数据
            ],
            label: {
                show: false // 隐藏饼图上的标签，用右侧图例展示
            },
            labelLine: {
                show: false
            },
            itemStyle: {
                color: function (params:any) {
                    // 自定义各部分颜色，与图例对应
                    const colorList = ['#4881ff', '#68d391', '#f6e05e', '#fc8181', '#9069ff'];
                    return colorList[params.dataIndex];
                }
            }
        }
    ],
    color: ['#4881ff', '#68d391', '#f6e05e', '#fc8181', '#9069ff'] // 全局颜色，和 itemStyle 里对应
})

const pieOption2 = ref({
    title: {
        text: '公路相关项目数据对比', // 标题，可按需修改
        left: 'center',
        textStyle: {
            color: '#fff' // 适配深色背景的标题文字颜色
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        formatter: function (params) {
            let tooltipHtml = params[0].name + '<br/>';
            params.forEach((item) => {
                tooltipHtml += item.seriesName + '：' + item.value + '<br/>';
            });
            return tooltipHtml;
        },
        backgroundColor: 'rgba(10, 20, 40, 0.8)', // 提示框背景
        borderColor: '#337ab7',
        textStyle: {
            color: '#fff'
        }
    },
    legend: {
        data: ['计划完成', '投资完成'], // 图例名称，与系列对应
        top: '10%',
        textStyle: {
            color: '#ccc' // 图例文字颜色
        }
    },
    xAxis: {
        type: 'category',
        data: ['高速公路', '普通干线公路', '公路运输枢纽工程', '农村公路', '公路养护工程'], // x轴分类
        axisLabel: {
            color: '#ccc'
        },
        axisLine: {
            lineStyle: {
                color: '#444'
            }
        },
        axisTick: {
            lineStyle: {
                color: '#444'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '金额（亿元）', // y轴含义，根据实际调整
        nameTextStyle: {
            color: '#ccc'
        },
        axisLabel: {
            color: '#ccc',
            formatter: '{value}'
        },
        axisLine: {
            lineStyle: {
                color: '#444'
            }
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
            }
        }
    },
    series: [
        {
            name: '计划完成',
            type: 'bar',
            data: [150, 140, 230, 100, 130], // 示例数据，需替换为实际
            itemStyle: {
                color: '#1890ff'
            },
            barWidth: '35%' // 柱子宽度，可调整避免拥挤
        },
        {
            name: '投资完成',
            type: 'bar',
            data: [90, 110, 190, 60, 120],
            itemStyle: {
                color: '#52c41a'
            },
            barWidth: '35%'
        }
    ],
    color: ['#1890ff', '#52c41a'], // 全局颜色配置，与系列对应
})

const header = [
    { title: '建设工程', value: 'a' },
    { title: '建设任务', value: 'b' },
    { title: '总投资(亿元)', value: 'c' },
]

const tableData = ref([
    { a: '高速公路', b: '5条段，包括2条高速，3个互通', c: '292' },
    { a: '普通干线公路', b: '23个项目', c: '222' },
    { a: '农村公路', b: '12个提档升级项目', c: '27' },
    { a: '公路养护工程', b: '大、中修1000公里，安防设施500公里', c: '11' },
    { a: '公路运输枢纽工程', b: '8个场站', c: '24' },
    { a: '合计', b: '', c: '575' },
])

function handleSwitchBtn() {
    active.value = !active.value
}

function show() {
    dialogRef.value?.show()
}

function close() {
    dialogRef.value?.close()
}

defineExpose({
    show,
    close
})

</script>

<style scoped lang="scss">
.body-box {
    // background: pink;
    height: 100%;
    font-size: 50px;
}

.bg2 {
    background: url('assets/image/lefty/img142.png') no-repeat center/ 98%;
    padding: 50px;
}

.bg1 {
    background: url('assets/image/lefty/切图 140.png') no-repeat center/cover;
    width: 1952px;
    height: 969px;
    padding: 0 40px;

    .table-head {
        height: 71px;
        display: flex;
        margin-top: 60px;
        margin-bottom: 40px;

        .table-head-item {
            font-family: AlibabaPuHuiTiRegular;
            font-weight: 500;
            font-size: 34px;
            color: #BBD5EB;
            line-height: 71px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            height: 71px;
            flex: 1;
        }
    }

    .table-body {
        display: flex;

        .table-body-item {
            font-family: AlibabaPuHuiTiRegular;
            font-weight: 400;
            font-size: 30px;
            color: #BBD5EB;
            line-height: 100px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            height: 100px;
            flex: 1;
            border-bottom: 1px solid #8CB2E7;
        }
    }
}

.yearList{
    justify-content: end;
}

// 标签切换样式
.tab-container {
    display: flex;
    margin-bottom: 30px;
    margin-top: 20px;

    .tab-item {
        width: 291px;
        height: 70px;
        padding: 12px 24px;
        background: rgba(120, 190, 255, 0.1);
        color: #bfe2ff;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
        transition: all 0.3s ease;
        font-family: AlibabaPuHuiTiRegular;
        font-weight: 400;
        font-size: 36px;
        color: #99BDDF;
        line-height: 53px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: rgba(120, 190, 255, 0.2);
            border-color: rgba(120, 190, 255, 0.5);
            transform: translateY(-2px);
        }

        &.active {
            background: rgba(120, 190, 255, 0.3);
            border-color: rgba(120, 190, 255, 0.8);
            color: #ffffff;
            box-shadow: 0 0 15px rgba(120, 190, 255, 0.3);
        }
    }
}
</style>
