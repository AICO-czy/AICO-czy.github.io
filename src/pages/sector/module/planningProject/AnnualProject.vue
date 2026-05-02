<template>
    <dialog-com title="年度内建设项目情况" ref="dialogRef" @switchBtn="handleSwitchBtn" @switchLink="handleSwitchLink">
        <div class="body-box" v-if="active">
            <div style="display: flex;margin-top: 25px;">
                <item-com title="项目数据分布" style="width: 710px; height: 439px;">

                    <v-chart :option="pieOption1" style="height: 300px; width: 100%;" />
                </item-com>
                <item-com title="总体进度完成情况" style="width: 455px; height: 439px;margin:0 20px">

                    <v-chart :option="option2" style="height: 300px; width: 100%;" />
                </item-com>
                <item-com title="分项产值进度情况" style="width: 748px; height: 439px;">

                    <v-chart :option="option3" style="height: 300px; width: 100%;" />
                </item-com>

            </div>
            <div style="display: flex;margin-top: 20px;">
                <item-com title="分项项目状态统计" style="width: 100%; height: 439px;margin-right: 20px">

                    <v-chart :option="option4" style="height: 300px; width: 100%;" />
                </item-com>
            </div>
        </div>
        <div class="body-box bg1" v-else>
            <!-- <div>单位:亿元</div> -->
            <!-- 表格头部 -->
            <div class="table-head">
                <div class="table-head-item" v-for="item in header">{{ item.title }}</div>
            </div>
            <!-- 表格内容 -->
            <div class="table-body" v-for="(item, index) in tableData">
                <div v-for="it in header" class="table-body-item">{{ item[it.value] || index + 1 }}</div>
            </div>
        </div>
    </dialog-com>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DialogCom from './components/dialogCom.vue'
import ItemCom from './components/itemCom.vue'
import { useRightAcountStore } from '../../store/rightAcount'

const rightAcountStore = useRightAcountStore()

const dialogRef = ref<InstanceType<typeof DialogCom> | null>(null)

const active = ref(true)

const pieOption1 = ref({
    title: {
        text: '公路相关工程占比', // 饼图标题，可按需修改
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)' // 提示框格式，展示名称、数值、占比
    },
    // legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     data: ['高速公路', '普通干线公路', '农村公路', '公路养护工程', '公路运输枢纽工程'] // 图例数据，与系列对应
    // },
    series: [
        {
            name: '公路工程类型', // 系列名称，会在提示框等地方显示
            type: 'pie',
            radius: ['40%', '70%'], // 环形饼图内外半径，如需实心饼图可改为 ['0%', '70%']
            center: ['50%', '50%'], // 饼图中心位置
            data: [
                { value: 37.6, name: '高速公路' },
                { value: 21.9, name: '普通干线公路' },
                { value: 41.0, name: '农村公路' },
                { value: 10.5, name: '公路养护工程' },
                { value: 8.0, name: '公路运输枢纽工程' }
                // 这里数据为示例，需替换成实际占比数据，确保总和合理
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)' // 强调样式（鼠标 hover 时）
                }
            },
            label: {
                show: true,
                position: 'outside', // 标签显示在饼图外侧，如需内侧可改 'inside'
                formatter: '{b} {d}%' // 标签格式，展示名称和占比
            },
            labelLine: {
                show: true // 显示标签引导线
            }
        }
    ],
    color: ['#1890ff', '#2fc25b', '#facc15', '#f59e0b', '#722ed1'] // 各分类颜色，可自定义
})

const option2 = ref({
    series: [
        {
            name: '环形进度',
            type: 'pie',
            radius: ['60%', '80%'], // 控制环形的内外半径，调整环形粗细
            center: ['50%', '50%'], // 环形在容器中的中心位置
            label: {
                show: true,
                position: 'center', // 文字显示在环形中心
                formatter: '{d}%', // 显示内容为百分比
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fff' // 文字颜色，适配深色背景
            },
            data: [
                { value: 55, name: '' }, // 占比数据，对应黄色部分
                { value: 45, name: '', itemStyle: { color: '#ccc' } } // 剩余部分，灰色
            ],
            itemStyle: {
                color: '#ffcc00' // 环形填充颜色（黄色部分）
            },
            hoverAnimation: false // 关闭鼠标 hover 动画，保持静态展示
        }
    ],
    color: ['#ffcc00', '#ccc'] // 设置系列颜色，可自定义
})

const option3 = ref({
    legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        width: '10',
        textStyle: {
            color: '#fff',
            fontSize: 14,
            rich: {
                name: { width: 120, fontSize: 14, color: '#fff' }, // 左边列
                value: { width: 100, fontSize: 14, color: '#fff' } // 右边列
            }
        },
        formatter: function (name) {
            const dataMap = {
                '高速公路': '23% 19亿元',
                '逾干线公路': '22% 16亿元',
                '农村公路': '19% 15亿元',
                '公路运输枢纽工程': '15% 12亿元',
                '公路养护工程': '12% 10亿元'
            };
            return '{name|' + name + '}' + '{value|' + dataMap[name] + '}';
        }
    },
    series: [
        // 高速公路
        {
            type: 'pie',
            radius: ['72%', '80%'], // 环的宽度统一
            center: ['25%', '50%'],
            label: { show: false },
            silent: true,
            data: [
                { value: 23, name: '高速公路', itemStyle: { color: '#f7ba2a' } },
                { value: 100 - 23, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
            ]
        },
        // 逾干线公路
        {
            type: 'pie',
            radius: ['60%', '68%'],
            center: ['25%', '50%'],
            label: { show: false },
            silent: true,
            data: [
                { value: 22, name: '逾干线公路', itemStyle: { color: '#3aa1ff' } },
                { value: 100 - 22, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
            ]
        },
        // 农村公路
        {
            type: 'pie',
            radius: ['48%', '56%'],
            center: ['25%', '50%'],
            label: { show: false },
            silent: true,
            data: [
                { value: 19, name: '农村公路', itemStyle: { color: '#36cbcb' } },
                { value: 100 - 19, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
            ]
        },
        // 公路运输枢纽工程
        {
            type: 'pie',
            radius: ['36%', '44%'],
            center: ['25%', '50%'],
            label: { show: false },
            silent: true,
            data: [
                { value: 15, name: '公路运输枢纽工程', itemStyle: { color: '#4ecb73' } },
                { value: 100 - 15, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
            ]
        },
        // 公路养护工程
        {
            type: 'pie',
            radius: ['24%', '32%'],
            center: ['25%', '50%'],
            label: { show: false },
            silent: true,
            data: [
                { value: 12, name: '公路养护工程', itemStyle: { color: '#8b5cf6' } },
                { value: 100 - 12, name: '', itemStyle: { color: 'rgba(255,255,255,0.08)' } }
            ]
        }
    ]
})

const option4 = ref({
    title: {
        text: '分类项目数据统计', // 标题，可按需修改
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['在建', '新建', '已建'], // 系列名称，与 series 对应
        bottom:'0'
    },
    xAxis: {
        type: 'category',
        data: ['高速公路', '普通干线公路', '农村公路', '公路养护工程', '公路运输枢纽工程'], // x轴分类
        axisLabel: {
            color: '#fff' // 适配深色背景的文字颜色
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: '数量/里程等', // y轴含义，根据实际调整
        axisLabel: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#ccc'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#444'
            }
        }
    },
    series: [
        {
            name: '在建',
            type: 'bar',
            data: [10, 14, 20, 13, 10], // 示例数据，需替换为实际
            itemStyle: {
                color: '#1890ff'
            }
        },
        {
            name: '新建',
            type: 'bar',
            data: [15, 10, 20, 10, 14],
            itemStyle: {
                color: '#52c41a'
            }
        },
        {
            name: '已建',
            type: 'bar',
            data: [14, 10, 20, 18, 19],
            itemStyle: {
                color: '#faad14'
            }
        }
    ],
    color: ['#1890ff', '#52c41a', '#faad14'], // 全局颜色配置，也可在系列里单独设置
})

const header = [
    { title: '类型', value: 'a' },
    { title: '序号', value: 'b' },
    { title: '县级行政区', value: 'c' },
    { title: '项目名称', value: 'd' },
    { title: '长度/面积', value: 'e' },
    { title: '总投资', value: 'f' },
    { title: '工作任务', value: 'h' },
]

const tableData = ref([
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
    { a: '高速公路', c: '围场', d: '承平高速', e: 306, f: '146.1', h: '双向六车道标准，里程59公里，已通车' },
])

function handleSwitchBtn() {
    active.value = !active.value
}

function handleSwitchLink() {
    rightAcountStore.openDialog()
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
            line-height: 41px;
            text-align: center;
            font-style: normal;
            text-transform: none;
            height: 100px;
            flex: 1;
            border-bottom: 1px solid #8CB2E7;
        }
    }
}
</style>
