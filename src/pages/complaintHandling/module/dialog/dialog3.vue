<template>
  <dialog-com v-model="show1" :tip="showtype" :positions="['2100px', '360px']" title="信访稳定工作统计" size="lange"
    @clickTip="handleClick">
    <div class="con" v-if="showtype[0] == 'chart'">
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.user" :prefix-icon="Search" placeholder="请输入..." clearable />
          </el-form-item>
          <el-form-item>
            <div class="btn" @click="onSubmit">
              <span>
                查询
              </span>
            </div>
          </el-form-item>
          <el-form-item label="责任单位">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="年度">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务类别">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="业务领域">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table">
        <el-table :data="tableData" stripe height="1180px">
          <el-table-column label="序号" prop="index" width="150" align="center" />
          <el-table-column label="工单编号" prop="number" width="200" align="center" />
          <el-table-column label="业务类别" prop="type" width="200" align="center" />
          <el-table-column label="业务分类" prop="type2" width="200" align="center" />
          <el-table-column label="受理时间" prop="time" width="200" align="center" />
          <el-table-column label="受理状态" prop="status" width="200" align="center" />
          <el-table-column label="反应内容" prop="des" />
          <el-table-column label="操作" width="150" align="center">
            <template #default="{ row }">
              <div class="btn" @click="handleDetile(row)">详情</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="total,prev, pager, next" :total="396" size="large" />
      </div>
    </div>

    <div class="con detile-box" v-else-if="showtype[0] == 'detile'">
      <div class="grid">
        <div>工单编号：<span>HYL2342345</span></div>
        <div>业务类型：<span>信息咨询</span></div>
        <div>业务分类：<span>道路运输</span></div>
        <div>来电人：<span>群众</span></div>
        <div>来电时间：<span>2025-02-23 13:00:12</span></div>
        <div>受理坐席：<span>周某</span></div>
        <div>回电时间：<span>2025-02-23 13:00:12</span></div>
        <div>来电号码：<span>12345678901</span></div>
      </div>
      <div>反应内容：</div>
      <div><span>2025-02-23 13:00:12 来电咨询从业资格证</span></div>
      <div>答复内容</div>
      <div><span>告知现有信息</span></div>
    </div>

    <div class="con chart" v-else>
      <div class="search">
        <el-form inline :model="formInline" class="form-inline">
          <el-form-item label="年度">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="月份">
            <el-select v-model="formInline.region" placeholder="2025年" clearable>
              <el-option label="2025年" value="shanghai" />
              <el-option label="2025年" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="chart-con">
        <div>
          <div class="title">信访总数</div>
          <v-chart :option="option1" autoplay style="width: 100%;height: 100%;" />
        </div>
        <div>
          <div class="title">来访人次</div>
          <v-chart :option="option2" autoplay style="width: 100%;height: 100%;" />
        </div>
        <div>
          <div class="title">领导接访约访人数</div>
          <v-chart :option="option3" autoplay style="width: 100%;height: 100%;" />
        </div>
        <div>
          <div class="title">进京访批次</div>
          <v-chart :option="option4" autoplay style="width: 100%;height: 100%;" />
        </div>
      </div>
    </div>
  </dialog-com>
</template>

<script setup lang="ts">
import { ref, toRefs,watch } from 'vue';
import DialogCom from './components/dialogCom.vue'
import { Search } from '@element-plus/icons-vue'
import * as echarts from "echarts";
import { useDialogStore } from "../../store/index";

const dialogStore = useDialogStore();

const { dialogVisible } = toRefs(dialogStore);

const show1 = ref(false)

watch(() => dialogVisible.value, () => {
  show1.value = dialogVisible.value == '信访稳定工作'
}, { deep: true, immediate: true })

const showtype = ref(['list'])
const formInline = ref({
  user: '',
  region: '',
  date: '',
})

function onSubmit() {

}

const tableData = [
  {
    index: 1,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '办理中',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 2,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 3,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
  {
    index: 4,
    number: 'HGI324',
    type: '信息咨询',
    type2: '道路运输',
    time: '2025-09-12 12:21:21',
    status: '已归档',
    des: '2025-09-12 12:21:21 客户来电，咨询 从业资格证事宜'
  },
]

function handleClick(type: string) {
  console.log(type)
  if (type === 'list') {
    showtype.value = ['chart']
  }
  if (type === 'chart') {
    showtype.value = ['list']
  }
  if (type == 'detile') {
    showtype.value = ['chart']
  }
  if (type === 'close') {
    showtype.value = ['list']
    dialogVisible.value = ''
  }
}


const option1 = ref({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  title: {
    top: "7%",
    right: '8%',
    text: "信访总数：224件",
    textStyle: {
      color: "#9EC0CC",
      fontSize: 28
    }
  },
  xAxis: {
    type: "category",
    data: [
      '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08'
    ], axisLabel: {
      interval: 0,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    axisTick: {
      show: false
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
        width: 1,
        type: 'dashed'
      },

    },
    name: "件",
    splitNumber: 5,
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "center",
      padding: [0, 20, 20, 0],
    },
  },
  series: [
    {
      name: "预约客户",
      data: [9, 8, 6.5, 7.2, 6.7, 7.4],
      type: "line",
      symbol: "circle", // 设置数据点为圆形（可选 'rect', 'triangle', 'diamond' 等）
      symbolSize: 18, // 数据点大小
      itemStyle: {
        color: "#fff", // 数据点填充颜色（实心效果）
        borderColor: '#2584C8',
        borderWidth: 4,
      },
      // 面积渐变配置
      areaStyle: {
        // 线性渐变：这里 (0, 1, 0, 0) 表示「从下往上」渐变（y 轴方向）
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 0, color: "rgba(53, 176, 221, 0)" }, // 渐变起点（底部）：深一点的浅蓝色
          // { offset: .5, color: "rgba(53, 190, 221, 1)" }, // 渐变中间（中部）：浅一点的浅蓝色
          { offset: 1, color: "rgba(53, 176, 221, 0.19)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
      // 折线颜色
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 1, color: "rgba(37, 132, 200, 1)" }, // 渐变起点（底部）：深一点的浅蓝色
          { offset: .2, color: "rgba(53, 190, 221, 1)" }, // 渐变中间（中部）：浅一点的浅蓝色
          { offset: 0, color: "rgba(57, 215, 178, 1)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
    },
  ],
})

const option2 = ref({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  title: {
    top: "7%",
    right: '8%',
    text: "来访人次：321人",
    textStyle: {
      color: "#9EC0CC",
      fontSize: 28
    }
  },
  xAxis: {
    type: "category",
    data: [
      '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08'
    ], axisLabel: {
      interval: 0,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    axisTick: {
      show: false
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
        width: 1,
        type: 'dashed'
      },

    },
    name: "人",
    splitNumber: 5,
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "center",
      padding: [0, 20, 20, 0],
    },
  },
  series: [
    {
      name: "预约客户",
      data: [9, 8, 6.5, 7.2, 6.7, 7.4],
      type: "line",
      symbol: "circle", // 设置数据点为圆形（可选 'rect', 'triangle', 'diamond' 等）
      symbolSize: 18, // 数据点大小
      itemStyle: {
        color: "#fff", // 数据点填充颜色（实心效果）
        borderColor: 'rgba(255, 205, 97, 1)',
        borderWidth: 4,
      },
      // 面积渐变配置
      areaStyle: {
        // 线性渐变：这里 (0, 1, 0, 0) 表示「从下往上」渐变（y 轴方向）
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 1, color: "rgba(255, 205, 97, 0.19)" }, // 渐变起点（底部）：深一点的浅蓝色
          // { offset: .5, color: "rgba(53, 190, 221, 1)" }, // 渐变中间（中部）：浅一点的浅蓝色
          { offset: 0, color: "rgba(255, 205, 97, 0)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
      // 折线颜色
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 1, color: "rgba(255, 205, 97, 1)" }, // 渐变起点（底部）：深一点的浅蓝色
          { offset: 0, color: "rgba(245, 206, 134, 1)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
    },
  ],
})

const option3 = ref({
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  title: {
    top: "7%",
    right: '8%',
    text: "来访人次：321人",
    textStyle: {
      color: "#9EC0CC",
      fontSize: 28
    }
  },
  xAxis: {
    type: "category",
    data: [
      '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08'
    ], axisLabel: {
      interval: 0,
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    axisTick: {
      show: false
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      textStyle: {
        color: "#AEB8C0",
        fontSize: 28,
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#82909D',
        width: 1,
        type: 'dashed'
      },

    },
    name: "人",
    splitNumber: 5,
    nameTextStyle: {
      color: "rgba(174, 193, 200, 1)",
      fontSize: 30,
      align: "center",
      padding: [0, 20, 20, 0],
    },
  },
  series: [
    {
      name: "预约客户",
      data: [9, 8, 6.5, 7.2, 6.7, 7.4],
      type: "line",
      symbol: "circle", // 设置数据点为圆形（可选 'rect', 'triangle', 'diamond' 等）
      symbolSize: 18, // 数据点大小
      itemStyle: {
        color: "#fff", // 数据点填充颜色（实心效果）
        borderColor: 'rgba(111, 242, 164, 1)',
        borderWidth: 4,
      },
      // 面积渐变配置
      areaStyle: {
        // 线性渐变：这里 (0, 1, 0, 0) 表示「从下往上」渐变（y 轴方向）
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 1, color: "rgba(111, 242, 164, 0.19)" }, // 渐变起点（底部）：深一点的浅蓝色
          // { offset: .5, color: "rgba(53, 190, 221, 1)" }, // 渐变中间（中部）：浅一点的浅蓝色
          { offset: 0, color: "rgba(111, 242, 164, 0)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
      // 折线颜色
      lineStyle: {
        width: 4,
        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          { offset: 1, color: "rgba(111, 242, 164, 1)" }, // 渐变起点（底部）：深一点的浅蓝色
          { offset: .5, color: "rgba(162, 253, 174, 1)" }, // 渐变终点（顶部）：浅一点的浅蓝色
          { offset: 0, color: "rgba(178, 249, 130, 1)" }, // 渐变终点（顶部）：浅一点的浅蓝色
        ]),
      },
    },
  ],
})

const option4 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  title: {
    top: "7%",
    right: '5%',
    text: '总批次：14批次    总人次：11人次',
    textStyle: {
      color: "#9EC0CC",
      fontSize: 28
    }
  },
  legend: {
    top: "7%",
    left: '25%',
    textStyle: {
      color: "#ffffff",
      fontSize: 28
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    top: '20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '2025.03', '2025.04', '2025.05', '2025.06', '2025.07', '2025.08'
      ],
      axisTick: {
        alignWithLabel: true
      },
      // 设置所有标签都显示
      axisLabel: {
        interval: 0,
        textStyle: {
          color: "#AEB8C0",
          fontSize: 28,
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: "#AEB8C0",
          fontSize: 28,
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#82909D',
          width: 1,
          type: 'dashed'
        },
      },
      name: "人",
      splitNumber: 5,
      nameTextStyle: {
        color: "rgba(174, 193, 200, 1)",
        fontSize: 30,
        align: "center",
        padding: [0, 20, 20, 0],
      },
    }
  ],
  series: [
    {
      name: '批次',
      barWidth: 20,
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(160, 249, 255, 1)' },
          { offset: .6, color: 'rgba(69, 153, 237, 0.75)' },
          { offset: 1, color: 'rgba(51, 103, 154, 0)' },
        ])
      }
    },
    {
      name: '人次',
      barWidth: 20,
      data: [180, 250, 160, 90, 100, 120],
      type: 'bar',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(111, 242, 164, 1)' },
          { offset: .6, color: 'rgba(41, 206, 211, 1)' },
          { offset: 1, color: 'rgba(51, 151, 154, 0)' },
        ])
      }
    },
  ]
})
function handleDetile(row: any) {
  showtype.value = ['detile']
}

</script>

<style scoped lang="scss">
.df {
  display: flex;
}

.con {
  width: 100%;
  height: 100%;
  padding: 22px;

  .search {
    width: 100%;
    height: 130px;
    padding-top: 20px;

    .btn {
      width: 90px;
      height: 62px;
      background: linear-gradient(180deg, #487DB8 4%, #0E1F33 100%);
      border-radius: 10px 10px 10px 10px;
      border: 3px solid #3871A5;
      opacity: 0.74;
      line-height: 60px;
      text-align: center;
      pointer-events: all;

      &>span {
        color: #FFFFFF;
        font-size: 28px;
        font-weight: 500;
      }
    }

    :deep(.el-form) {
      --el-form-label-font-size: 34px;

      .el-form-item {
        --font-size: 34px;
        align-items: center;
      }

      .el-form-item__label {
        color: #A9CEE8;
      }

      .el-input {
        --el-input-inner-height: 72px;
        --el-input-text-color: #91A1BB;
        width: 220px;

        .el-input__wrapper {
          background: transparent;
        }

        .el-input__prefix-inner {
          font-size: 30px;
        }

        .el-input__inner {
          font-size: 34px;
        }
      }

      .el-select {
        width: 200px;

        .el-select__wrapper {
          background: transparent;
          line-height: 70px;
          font-size: 34px;
          min-height: 72px;
        }

        .el-select__suffix {
          .el-select__icon {
            font-size: 40px;
          }
        }
      }
    }
  }

  .table {
    width: 100%;
    height: 1234px;
    margin-bottom: 18px;
    background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
    border-radius: 10px;
    padding: 23px;

    .btn {
      color: #20FFF0;
    }

    :deep(.el-table) {
      --el-table-header-bg-color: transparent;
      --el-table-tr-bg-color: transparent;
      --el-table-header-text-color: #FFFFFF;
      --el-table-expanded-cell-bg-color: transparent;
      --el-table-row-hover-bg-color: none;
      --el-table-border: 0;
      --el-fill-color-lighter: rgba(140, 178, 231, 0.06);
      background-color: transparent;

      .tr {
        background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);
      }

      .cell {
        line-height: 44px;
        padding: 20px 0;
        color: #FFFFFF;
        font-weight: 400px;
      }

      font-size: 36px;

      .el-table__header {
        height: 56px;

        .el-table__cell {
          background: linear-gradient(180deg, rgba(65, 170, 255, 0.25) 0%, rgba(51, 163, 255, 0) 100%);

          .cell {
            line-height: 44px;
            padding: 20px 0;
          }
        }
      }
    }
  }

  .page {
    height: 44px;
    width: 100%;

    :deep(.el-pagination) {
      --el-text-color-regular: #487DB8;
      --el-pagination-font-size: 34px;
      padding: 0 50px;

      .el-pagination__total {
        flex: 1;
      }

      .btn-prev,
      .btn-next {
        background-color: #275686;
        color: #91BDED;
        width: 54px;
        height: 54px;

        &>.el-icon {
          font-size: 34px;
        }
      }

      .el-pager {

        .number,
        .more {
          width: 54px;
          height: 54px;
          background-color: #275686;
          color: #91BDED;
          font-size: 34px;
          margin: 0 8px;
        }
      }
    }
  }
}

.chart {

  .title {
    font-family: Alibaba PuHuiTi 3.0, Alibaba PuHuiTi 30;
    font-weight: 500;
    font-size: 32px;
    line-height: 45px;
    text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3);
    text-align: left;
    font-style: normal;
    text-transform: none;
    color: #FFFFFF;
    margin-left: 50px;
    position: absolute;
  }

  .search {
    display: flex;
    justify-content: space-between;

    :deep(.el-form) {
      .el-select {
        width: 273px;
      }
    }

    .card-list {
      display: flex;

      .item {
        background: #254E72;
        color: #87ADD0;
        font-size: 30px;
        font-weight: 400;
        width: 121px;
        height: 70px;
        line-height: 70px;
        text-align: center;
      }

      .active {
        background-color: #257DB8;
        color: #FFFFFF;
      }
    }
  }

  .chart-con {
    // background: pink;
    height: 1300px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
    grid-template-rows: repeat(2, 1fr);

    &>div {
      position: relative;
    }
  }
}

.detile-box {
  padding: 90px;

  &>div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    grid-template-rows: auto;
    color: #FFFFFF;
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: 700px;

    span {
      font-size: 32px;
      font-weight: 400px;
      color: #ccc;
    }
  }
}
</style>

<style>
.el-select__popper {
  z-index: 9999 !important;
  background: red;
  --el-bg-color-overlay: #0d2b5e;
}

.el-select-dropdown__item {
  font-size: 32px;
  height: 60px;
  color: #fff;
  line-height: 60px;
  background: #0d2b5e;
}

.el-select-dropdown__item.is-hovering {
  background: #0d2b5e;
}
</style>
