<template>
  <q-dialog seamless v-model="isDialogVisible">
    <div class="dialog-content">
      <div class="content-title">巡游出租车综合分析</div>
      <div class="content-close cursor-pointer right-[50px] top-[80px]" @click="handleClose"></div>
      <div class="content-box column justify-between">
        <div class="col full-width">
          <q-scroll-area :thumb-style="state.thumbStyle" :bar-style="state.barStyle" class="fit">
            <div class="mb-[20px] mt-[10px]">
              <q-img :src="img1" class="w-[369px] h-[58px]" alt=""></q-img>
            </div>
            <div class="compare-content h-[534px] cruise-taxi-base">
              <div class="left-item">
                <div>
                  <div class="cs-title  mt-[20px]" style="text-align: left;">接入车辆数</div>
                  <div><span class="t-green">83038</span><span class="t-unit">辆</span></div>
                </div>
                <div>
                  <div class="cs-title  mt-[30px]" style="text-align: left;">接入平台数</div>
                  <div><span class="t-yellow">274</span><span class="t-unit">个</span></div>
                </div>
                <div>
                  <div class="cs-title mt-[30px]" style="text-align: left;">接入驾驶员数</div>
                  <div><span class="t-blue">122827</span><span class="t-unit">人</span></div>
                </div>
              </div>
              <div class="relative mr-[9px]">
                <q-img :src="img2" class="w-[361px] h-[331px]" alt=""></q-img>
                <div class="img-text right-[-10%]">省厅接入</div>
              </div>
              <div class="relative ml-[9px]">
                <q-img :src="img3" class="w-[361px] h-[331px]" alt=""></q-img>
                <div class="img-text left-[31%]">合规审批</div>
              </div>
              <div class="hand-item bottom-[30px] right-[22%]" @click="handelClickHandItem">
                <q-img :src="img4" class="w-[159px] h-[159px]" alt=""></q-img>
                <q-img :src="img5" class="w-[29px] h-[42px] absolute bottom-[0px] left-[45%]" alt=""></q-img>
              </div>
              <div class="right-item">
                <div>
                  <div class="t-up" style="text-align: right;">28.20%</div>
                  <div class="cs-title" style="text-align: left;">许可车辆数</div>
                  <div><span class="t-green">647</span><span class="t-unit">辆</span></div>
                </div>
                <div>
                  <div class="t-up" style="text-align: right;">28.20%</div>
                  <div class="cs-title" style="text-align: left;">许可平台数</div>
                  <div><span class="t-yellow">13</span><span class="t-unit">个</span></div>
                </div>
                <div>
                  <div class="t-up" style="text-align: right;">28.20%</div>
                  <div class="cs-title" style="text-align: left;">许可驾驶员数</div>
                  <div><span class="t-blue">2809</span><span class="t-unit">人</span></div>
                </div>
              </div>
              <div class="dialog-item" v-if="showItem">
                <div class="content-close cursor-pointer right-[0px] top-[0px]" @click="handleCloseItem"></div>
                <div class="cs-title" style="text-align: left;">巡增网驾驶员数 </div>
                <div style="display: flex; align-items: center;justify-content: space-between;">
                  <div><span class="t-blue">175</span><span class="t-unit">人</span></div>
                  <div class="t-up" style="text-align: right;">28.20%</div>
                </div>
              </div>
            </div>
            <div class="mb-[20px] mt-[10px]">
              <q-img :src="img6" class="w-[369px] h-[58px]" alt=""></q-img>
            </div>
            <div class="compare-content h-[804px] relative">
              <div class="h-full t-list">
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img7" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">4785</span><span class="t-unit">单</span></div>
                    <div class="cs-title">今日订单量</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img8" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">5.3</span><span class="t-unit">单/车</span></div>
                    <div class="cs-title">车均订单量</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img9" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">17.30</span><span class="t-unit">公里</span></div>
                    <div class="cs-title">平均行驶里程</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img10" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div><span class="t-blue">5.3</span><span class="t-unit">公里</span></div>
                    <div class="cs-title">平均载客里程</div>
                  </div>
                  <div class="t-item-right">
                    <div class="title-icon cs-title mb-[16px]">环比 <span class="t-down">34.25%</span></div>
                    <div class="title-icon cs-title mt-[16px]">同比 <span class="t-up">28.20%</span></div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img11" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div class="cs-title">里程利用率</div>
                  </div>
                  <div class="t-item-right">
                    <div class="t-red">49.5%</div>
                    <div class="slider-box">
                      <div class="active-line line2" :style="{ width: '80%' }">
                        <div class="slider-icon icon2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="t-item">
                  <div class="t-item-left">
                    <q-img :src="img12" class="w-[147px] h-[120px]" alt=""></q-img>
                    <div class="cs-title">时间利用率</div>
                  </div>
                  <div class="t-item-right ">
                    <div class="t-yellow">49.5%</div>
                    <div class="slider-box">
                      <div class="active-line line1" :style="{ width: '80%' }">
                        <div class="slider-icon icon1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row-line top-[37%]"></div>
              <div class="cloum-line"></div>
              <div class="row-line bottom-[27%]"></div>
            </div>
            <div class="order-compare-content">
              <ItemTitle title="订单变化情况"></ItemTitle>
              <div class="content-top-select row col-auto mt-[30px] mb-[20px]">
                <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
                  :class="{ 'active': selsectBtn === item }" @click="handleSelect1(item)">
                  {{ item }}
                </div>
              </div>
              <v-chart :option="option3" style="height: 500px; width: 100%;" />
            </div>
            <div class="order-compare-content">
              <ItemTitle title="网约车非法营运情况"></ItemTitle>
              <div class="content-top-select row col-auto mt-[30px] mb-[20px]">
                <div class="content-top-select-item1" v-for="(item, index) in selsectBtns" :key="item"
                  :class="{ 'active': selsectBtn === item }" @click="handleSelect1(item)">
                  {{ item }}
                </div>
              </div>
              <div class="tip-box">
                <div class="title-icon cs-title mb-[16px]">订单合规率：<span class="tip-num">1.78</span>
                  <span class="tip-unit">%</span>
                </div>
              </div>
              <v-chart :option="option4" style="height: 450px; width: 100%;margin-top: 50px;" />
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script setup name="alarmDialog">
import { ref, onMounted, watch, computed, reactive } from "vue";
import ItemTitle from "../../components/itemTitle.vue";
import * as echarts from "echarts";
import { useRouter } from "vue-router";
import { useAnalyzeDialogStore } from "../../store/index";
import { storeToRefs } from "pinia";
import img1 from 'src/assets/component/城市交通/切图 3282.png'
import img2 from 'src/assets/component/城市交通/切图 836.png'
import img3 from 'src/assets/component/城市交通/切图 837.png'
import img4 from 'src/assets/component/城市交通/切图 844.png'
import img5 from 'src/assets/component/城市交通/切图 843.png'
import img6 from 'src/assets/component/城市交通/切图 3283.png'
import img7 from 'src/assets/component/城市交通/切图 2441.png'
import img8 from 'src/assets/component/城市交通/切图 2442.png'
import img9 from 'src/assets/component/城市交通/切图 2443.png'
import img10 from 'src/assets/component/城市交通/切图 2444.png'
import img11 from 'src/assets/component/城市交通/切图 2445.png'
import img12 from 'src/assets/component/城市交通/切图 2446.png'

const storeAnalyzeDialog = useAnalyzeDialogStore();
const isDialogVisible = computed(() => storeAnalyzeDialog.showAnalyzeDialog === 'onlineRideHailing');
const selsectBtns = ['今日', '本月', '上月']
const selsectBtn = ref('今日')

const showItem = ref(true)

const state = reactive({
  thumbStyle: {
    right: "4px",
    borderRadius: "5px",
    backgroundColor: "#027be3",
    width: "5px",
    opacity: "0.75",
  },
  barStyle: {
    right: "2px",
    borderRadius: "9px",
    backgroundColor: "#027be3",
    width: "9px",
    opacity: "0.2",
  },
});

function handleSelect1(item) {
  selsectBtn.value = item
}
const handleClose = () => {
  storeAnalyzeDialog.setShowAnalyzeDialog(''); // 假设store中有这样的方法
};

const option3 = ref({
  // backgroundColor: "#011a38",
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff",
      },
    },
    textStyle: {
      color: "#fff",
    },
    backgroundColor: "rgba(16, 123, 184, .52)", //设置背景颜色
    confine: true,
  },
  grid: {
    top: "16%",
    left: "2%",
    right: "2%",
    bottom: "4%",
    containLabel: true,
  },
  legend: {
    top: "0%",
    y: "center",
    itemWidth: 14,
    itemHeight: 4,
    itemGap: 20,
    textStyle: {
      fontSize: 24,
      color: "#fff",
      padding: [0, 0, 0, 6],
    },
  },
  xAxis: [
    {
      type: "category",
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      axisLabel: {
        interval: 0,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#ffffff",
        },
      },
      data: [
        "1时",
        "2时",
        "3时",
        "4时",
        "5时",
        "6时",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "单位:单",
      splitNumber: 5,
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 20, 5, 0],
      },
      axisLabel: {
        formatter: "{value}",
        color: "rgba(95, 187, 235, 1)",
        textStyle: {
          fontSize: 24,
          color: "#fff",
          lineHeight: 16,
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(28, 130, 197, .3)",
          type: "dashed",
        },
      },
    },
    {
      name: "单位:单/车 ",
      splitNumber: 5,
      type: "value",
      nameTextStyle: {
        color: "#fff",
        fontSize: 24,
        align: "center",
        padding: [0, 0, 5, 0],
      },
      axisLabel: {
        show: true,
        fontSize: 24,
        color: "#fff",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "今日订单",
      type: "bar",
      // stack: "总量",
      barMaxWidth: 24,
      barGap: "10%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(160, 249, 255, 1)",
              },
              {
                offset: 1,
                color: "rgba(69, 153, 237, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [350, 250, 320, 420, 380, 180],
    },
    {
      name: "上周同期",
      type: "bar",
      // stack: "总量1",
      barMaxWidth: 24,
      barGap: "10%",
      itemStyle: {
        normal: {
          show: true,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(193, 198, 207, 1)",
              },
              {
                offset: 1,
                color: "rgba(164, 170, 182, 0)",
              },
            ],
            false
          ),
          barBorderRadius: 0,
          label: {
            show: false,
            position: "top",
            color: "#56C1F8",
            formatter: function (p) {
              return p.value > 0 ? p.value : "";
            },
          },
        },
      },
      data: [300, 200, 280, 350, 320, 150],
    },
    {
      name: "车均订单",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 6,
        shadowColor: "rgba(206, 133, 92, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: [350, 250, 320, 420, 380, 180], // 折线图的数据
    },
  ],
})
const option4 = ref({
  legend: {
    data: [{ name: '合规订单', icon: 'rect' }, { name: '非法运营订单', icon: 'rect' }, { name: '合规率', icon: 'rect' },   // 修改为长方形图标
      ''],
    top: '5%',
  },
  xAxis: {
    data: ['丰宁县', '围场县', '隆化县', '平泉县', '滦平县', '承德县', '宽城县', '兴隆县', '双桥区', '双滦区', '营子区'],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: '#fff' },
    splitLine: { show: false, lineStyle: { type: 'dashed' } }
  },
  yAxis: [
    {
      type: 'value',
      name: '个',
      position: 'left',
      axisLabel: {
        color: '#fff',
        formatter: '{value}'
      },
      min: 0,  // ✅ 强制从0开始
      // max: 25  // ✅ 设置合适最大值
    },
    {
      type: 'value',
      name: '个',
      position: 'right',
      axisLabel: {
        color: '#000',
        formatter: '{value}'
      },
      min: 0,    // ✅ 强制从0开始
      // max: 1.2,  // ✅ 根据数据最大值设置
      offset: 0 // ✅ 对齐右侧
    }
  ],
  color: ['#478af2'],
  series: [
    // 柱状图系列（主Y轴）
    {
      name: '非法运营订单',
      type: 'pictorialBar',
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: '50%', // ✅ 调整柱子间距
      symbol: 'triangle',
      itemStyle: {
        normal: {
          opacity: 0.5,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#0095FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 200, 255, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [21, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
      z: 10,
      symbolOffset: [10, 0] // ✅ 消除图标偏移
    },
    // 柱状图系列（主Y轴）
    {
      name: '合规率',
      type: 'pictorialBar',
      yAxisIndex: 0, // ✅ 明确关联左侧Y轴
      barCategoryGap: '50%', // ✅ 调整柱子间距
      symbol: 'triangle',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#1EE7E7', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(30, 231, 231, 0)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        emphasis: { opacity: 1 }
      },
      data: [23, 21, 19, 18, 17, 16, 15, 14, 13, 12, 11],
      z: 10,
      symbolOffset: [-10, 0] // ✅ 消除图标偏移
    },
    {
      name: "车均订单",
      yAxisIndex: 1,
      type: "line",
      showSymbol: false,
      symbol: "circle",
      smooth: true,
      symbolSize: 6,
      lineStyle: {
        normal: {
          color: "rgba(206, 133, 92, 1)",
        },
      },

      itemStyle: {
        color: "rgba(206, 133, 92, 1)",
        borderColor: "rgba(206, 133, 92, 1)",
        borderWidth: 6,
        shadowColor: "rgba(206, 133, 92, 1)",
        shadowBlur: 6,
        opacity: 0,
      },
      label: {
        show: false,
      },
      data: [350, 250, 320, 420, 380, 180, 320, 420, 380, 180, 500], // 折线图的数据
    },
    {
      name: 'glyph',
      type: 'pictorialBar',
      yAxisIndex: 0,
      barGap: '-100%',
      symbolPosition: 'end',
      symbolSize: 50,
      symbolOffset: [0, '-120%']
    }
  ]
})

function handelClickHandItem() {
  showItem.value = true
}

function handleCloseItem() {
  showItem.value = false
}

</script>

<style lang="scss" scoped>
.arr {
  width: 52px;
  height: 51px;
  background: url('assets/component/道水路运输系统-首页_slices/切图 522.png') no-repeat !important;
  background-size: 100% 100%;
  z-index: 99;
  pointer-events: all;
  position: absolute;
}

.slider-box {
  position: relative;
  width: 284px;
  background: #1e5386;
  height: 14px;
  border-radius: 94px;
  margin-top: 5px;

  .active-line {
    width: 0;
    height: 19px;
    position: absolute;
    border-radius: 94px;
    top: 0;
    left: 0;

    &>.slider-icon {
      position: absolute;
      width: 54px;
      height: 54px;
      top: 50%;
      transform: translateY(-50%) translateX(30%);
      right: 0;
    }
  }

}

.line1 {
  background: linear-gradient(90deg, #9A694F 0%, #D3944F 50%, #ECC89D 100%);

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 508.png') no-repeat center/cover;
  }
}

.line2 {
  background: linear-gradient(270deg, #9A4F4F 0%, #D3614F 46%, #EC9D9D 100%);
  ;

  &>.slider-icon {
    background: url('assets/component/道水路运输系统-首页_slices/切图 509.png') no-repeat center/cover;
  }
}


.t-blue {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.t-unit {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 500;
  font-size: 42px;
  color: rgba(220, 236, 255, 0.6);
  line-height: 58px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.t-up {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #FF9B83;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 20px;
  // background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 66%, rgba(0, 0, 0, 0.15) 100%);
  // -webkit-background-clip: text;
  // -webkit-text-fill-color: transparent;
}

.t-down {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 35px;
  color: #7AFFAB;
  line-height: 40px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 20px;
}

.t-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 5fr 5fr 4fr;
  gap: 10px;
}

.t-item {
  // background: pink;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .t-item-left {
    margin-left: 30px;
    text-align: center;
  }

  .t-item-right {
    margin-right: 20px;
  }
}

.t-yellow {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #FFB579 0%, #FFEFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.t-green {
  background: linear-gradient(180deg, #5DE5B4 0%, #A7ECE8 100%);
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.t-red {
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 50px;
  line-height: 70px;
  letter-spacing: 1px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #FF7979 0%, #FFB8B8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.row-line {
  position: absolute;
  width: 1109px;
  height: 6px;
  background: url('assets/component/城市交通/切图 826.png') no-repeat center/cover;
  transform: translateX(-50%);
  left: 50%;
}

.cloum-line {
  position: absolute;
  width: 6px;
  height: 694px;
  background: url('assets/component/城市交通/切图 825.png') no-repeat center/cover;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cs-title {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 40px;
  color: #A3D9FF;
  line-height: 55px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.title-icon {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    width: 22.62px;
    height: 22.31px;
    background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.q-dialog__inner--minimized>div {
  max-width: 1462px !important;
  overflow: none !important;
  min-height: 1706px !important;
}

.q-dialog__inner>div {
  overflow: visible !important;
}

.dialog-content {
  width: 1462px;
  height: 1706px;
  background: url("assets/image/dialog/切图 284.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  left: 1850px;
  top: 330px;
  padding: 130px 70px 60px 70px;
  box-sizing: border-box;
}

.content-close {
  width: 52px;
  height: 52px;
  background: url("assets/component/切图 261.png") no-repeat 100%/100%;
  position: absolute;
}

.content-title {
  width: 700px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 700;
  font-size: 50px;
  line-height: 69px;
  text-align: left;
  font-style: italic;
  text-transform: none;
  background: linear-gradient(268.5581935499648deg,
      #ffffff 0%,
      #d6e7f7 57%,
      #d6e7f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 100px;
  top: 40px;
}

.content-box {
  width: 100%;
  height: 100%;
}

.cruise-taxi-base {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  .dialog-item {
    position: absolute;
    background: url("assets/component/城市交通/切图 838.png") no-repeat 100%/100%;
    width: 368px;
    height: 130px;
    bottom: 5%;
    right: 33%;
    padding: 10px 20px;
  }

  .hand-item {
    position: absolute;
  }

  .left-item {
    flex: 1;
  }

  .right-item {
    flex: 1;
    margin-left: 20px;
  }

  .img-text {
    position: absolute;
    top: 40%;
    transform: translate(-50%);
    background: linear-gradient(0deg, #FFFFFF 50%, #FFFFFF 90%, #63B3FF 99%, #63B3FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 38px;
    line-height: 53px;
    text-shadow: 0px 4px 4px #003F64;
    text-align: center;
    font-style: normal;
    text-transform: none;

  }
}

.content-top-select {
  position: absolute;
  top: -10px;
  right: 20px;
}

.content-top-select-item1 {
  width: 192px;
  height: 65px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 0px 6px 6px 0px;
  text-align: center;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 34px;
  color: #87ADD0;
  line-height: 65px;
  font-style: normal;
  text-transform: none;
}

.content-top-select-item1.active {
  background: rgba(27, 123, 182, 0.5);
  border-radius: 0px 0px 0px 0px;
  color: #ffffff;
}

.compare-content {
  width: 100%;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  border-radius: 20px;
  position: relative;
}

.order-compare-content {
  width: 100%;
  height: 618px;
  background: linear-gradient(180deg, rgba(38, 117, 182, 0.2052) 0%, rgba(41, 118, 181, 0.1242) 100%);
  box-shadow: inset 0px 0px 20px 0px #4DA3FF;
  margin-bottom: 16px;
  padding: 20px 30px 10px;
  border-radius: 20px;
  position: relative;
}

.tip-box {
  position: absolute;
  top: 90px;
  right: 50px;

  .tip-num {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 52px;
    line-height: 71px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .tip-unit {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 41px;
    color: #EEF8FF;
    line-height: 57px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>
