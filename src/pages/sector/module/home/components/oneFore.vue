<template>
  <div class="df jcsa" style="padding: 0 130px;">
    <div class="title df" :class="active == 1 ? 'title_active' : ''" @click="handleCheck(1)">
      <div class="img_icon"></div>
      <div class="title-text">
        "十四五"
      </div>
    </div>
    <div class="title df" :class="active == 2 ? 'title_active' : ''" @click="handleCheck(2)">
      <div class="img_icon"></div>
      <div class="title-text">
        "十五五"
      </div>
    </div>
  </div>
  <div style="margin-top: 40px;">
    <div class="title_bg">
      <title-box>规划项目总览</title-box>
      <div class="btn-hg df aic jcsa" @click="handleReview" v-if="active == 1">
        <div class="icon"></div>
        <div class="text">回顾</div>
      </div>
    </div>
    <div class="bg">
      <div class="card_1" @click="handleCard(1)">
        <div class="card_j"></div>
        <div class="df aic">
          <div class="icon1"></div>
          <div class="dian"></div>
          <div style="margin-right: 65px;">
            <div class="text1">规划年限</div>
            <div class="text2" style="width: 500px;">{{ showData[active - 1]?.year }}</div>
          </div>
          <div style="margin-right: 88px;">
            <div class="text1">项目</div>
            <div class="text3">{{ overviewData?.projectNum }}个</div>
          </div>
          <div>
            <div class="text1">投资</div>
            <div class="text4">{{ overviewData?.investAmount }}亿元</div>
          </div>
        </div>
        <div class="df" style="margin-top: 13px;">
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">已建项目：</div>
            <div class="text5">{{ overviewData?.completedProjectNum }}个</div>
          </div>
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">在建项目：</div>
            <div class="text5">{{ overviewData?.constructingProjectNum }}个</div>
          </div>
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">待建项目：</div>
            <div class="text5">{{ overviewData?.pendingProjectNum }}个</div>
          </div>
        </div>
      </div>
      <div class="card_2" @click="handleCard(2)">
        <div class="card_j"></div>
        <div class="head">
          <title-box style="">年度项目总览</title-box>
          <div class="select_box">
            <!-- <q-select dark standout v-model="model" behavior="menu"
                            :options="options[active - 1]?.map(item=>item.value)" label=""
                            :popup-content-style="{ fontSize: '50px' }" /> -->
            <SelectList v-model:selected="model" :options="options[active - 1]?.map(it => it.value)" />
          </div>
        </div>
        <div class="df" style="margin-left: 44px;">
          <div class="df">
            <div class="icon_1"></div>
            <div class="text1">总投资：</div>
            <div class="text2">{{ yearOverviewData?.investAmount }}亿元</div>
          </div>
          <div class="df" style="margin-left: 169px;">
            <div class="icon_2"></div>
            <div class="text1">规划项目：</div>
            <div class="text3">{{ yearOverviewData?.projectNum }}个</div>
          </div>
        </div>
        <div class="df" style="margin-top: 13px;padding-left: 30px;">
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">已建项目：</div>
            <div class="text6">{{ yearOverviewData?.completedProjectNum }}个</div>
          </div>
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">在建项目：</div>
            <div class="text6">{{ yearOverviewData?.constructingProjectNum }}个</div>
          </div>
          <div class="df aic">
            <div class="dian"></div>
            <div class="text1">待建项目：</div>
            <div class="text6">{{ yearOverviewData?.pendingProjectNum }}个</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <planningProject ref="planningProjectRef" :data="dialogghData"/>
  <AnnualProject ref="anualProjectRef" />
  <PlanningProject2 ref="planningProjectRef2" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import TitleBox from './titleBox.vue'
import planningProject from '../../planningProject/index.vue'
import AnnualProject from '../../planningProject/AnnualProject.vue'
import PlanningProject2 from '../../planningProject/planningProject2.vue'
import SelectList from './selectList.vue'
import { cancelGet, cancelFun } from "src/utils/httpRequest";

const $emit = defineEmits(['topTip', 'cardClick', 'review'])

const planningProjectRef = ref<InstanceType<typeof planningProject> | null>(null)
const planningProjectRef2 = ref<InstanceType<typeof PlanningProject2> | null>(null)
const anualProjectRef = ref<InstanceType<typeof AnnualProject> | null>(null)

const model = ref('2025年')
//激活类型
const active = ref(1)
$emit('topTip', '十四五')
function handleCheck(type: number) {
  active.value = type
  $emit('topTip', type == 1 ? '十四五' : '十五五')
  if (type == 1) {
    model.value = '2025年'
  } else {
    model.value = '2026年'
  }
  getStatOverview();
}

const overviewData = ref({
  projectNum: 38,
  investAmount: 574.89,
  completedProjectNum: 19,
  constructingProjectNum: 14,
  pendingProjectNum: 5,
})


const options = [
  [
    { lable: '2025年', value: '2025年' },
    { lable: '2024年', value: '2024年' },
    { lable: '2023年', value: '2023年' },
    { lable: '2022年', value: '2022年' },
    { lable: '2021年', value: '2021年' }
  ],
  [
    { lable: '2026年', value: '2026年' },
    { lable: '2027年', value: '2027年' },
    { lable: '2028年', value: '2028年' },
    { lable: '2029年', value: '2029年' },
    { lable: '2030年', value: '2030年' }
  ],
]

const showData = [
  {
    year: '2021年-2025年'
  },
  {
    year: '2026年-2030年'
  }
]

const yearOverview = ref([])

const yearOverviewData = ref({
  projectNum: 38,
  investAmount: 37.133,
  completedProjectNum: 2,
  constructingProjectNum: 12,
  pendingProjectNum: 26,
})

//内容点击事件
function handleCard(type: any) {
  $emit('cardClick', active.value, type)
  planningProjectRef.value?.close()
  anualProjectRef.value?.close()
  planningProjectRef2.value?.close()
  if (active.value == 1) {
    if (type == 1) {
      planningProjectRef.value?.show()
    } else {
      anualProjectRef.value?.show()
    }
  } else {
    if (type == 1) {
      planningProjectRef2.value?.show()
    } else {
      anualProjectRef.value?.show()
    }
  }
}

const dialogghData = ref()
const getStatOverview = async () => {
  const res = await cancelGet(
    '/hbcdToccApi/gl/project/annualSituations/get-stat-overview',
    {
      period: active.value == 1 ? '十四五' : '十五五'
    }
  )
  if (res.data.data) {
    const result = res.data.data
    dialogghData.value = result
    const { totalCount, totalInvestment, completedCount, inProgressCount, unfinishedCount } = result
    overviewData.value.projectNum = totalCount
    overviewData.value.investAmount = totalInvestment
    overviewData.value.completedProjectNum = completedCount
    overviewData.value.constructingProjectNum = inProgressCount
    overviewData.value.pendingProjectNum = unfinishedCount
    yearOverview.value = result.annualList;
  }
  getYearOverview(model.value)
}

const getYearOverview = (year: string) => {
  yearOverviewData.value.investAmount = 0
  const item: any = yearOverview.value.find((item: any) => item.annual == year)
  if (item) {
    yearOverviewData.value.projectNum = item.completedCount + item.inProgressCount + item.unfinishedCount
    yearOverviewData.value.completedProjectNum = item.completedCount
    yearOverviewData.value.constructingProjectNum = item.inProgressCount
    yearOverviewData.value.pendingProjectNum = item.unfinishedCount
    if (item.completedList.length > 0) {
      item.completedList.forEach((item: any) => {
        yearOverviewData.value.investAmount += Number(item.completedInvestment)
      })
    }
    if (item.inProgressList.length > 0) {
      item.inProgressList.forEach((item: any) => {
        yearOverviewData.value.investAmount += Number(item.completedInvestment)
      })
    }
    if (item.unfinishedList.length > 0) {
      item.unfinishedList.forEach((item: any) => {
        yearOverviewData.value.investAmount += Number(item.completedInvestment)
      })
    }
    yearOverviewData.value.investAmount = Number(yearOverviewData.value.investAmount.toFixed(3))
  }
}

watch(model, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    getYearOverview(newVal)
  }
})
/**
 * @description 回顾
 */
function handleReview() {
  $emit('review')
}

onMounted(() => {
  getStatOverview()
})

onUnmounted(() => {
  cancelFun('get-stat-overview')
})

</script>

<style scoped lang="scss">
.card_1 {
  background: url("assets/image/lefty/card_bg_1.png") no-repeat center/cover;
  width: 1438px;
  height: 322px;
  margin: 0 auto;
  position: relative;
  padding: 25px;

  .card_j {
    width: 49px;
    height: 47px;
    position: absolute;
    top: 0;
    right: 0;
    background: url("assets/image/lefty/card_j_1.png") no-repeat 100%/100%;
  }

  .icon1 {
    width: 146px;
    height: 156px;
    background: url('assets/image/lefty/card_icon_1.png') no-repeat 100%/100%;
  }

  .dian {
    background: url('assets/image/lefty/dian.png') no-repeat 100%/100%;
    width: 24px;
    height: 23px;
    margin-left: 14px;
    margin-right: 21px;
  }

  .text1 {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 400;
    font-size: 42px;
    color: #A3D9FF;
    line-height: 58px;
    font-style: normal;
    text-transform: none;
  }

  .text2 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 56px;
    line-height: 78px;
    letter-spacing: 1px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #6BDCFF 0%, #54FBF1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text3 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 56px;
    line-height: 78px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #5DE5B4 0%, #A7ECE8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text4 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 56px;
    line-height: 78px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .text5 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 46px;
    line-height: 64px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #FF7979 0%, #FFB8B8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 60px;
    margin-top: 10px;
  }

}

// :deep(.q-menu){
//     :deep(.q-item__label) {
//         font-size: 50px;
//     }
// }

.card_2 {
  background: url("assets/image/lefty/card_bg_2.png") no-repeat 100%/100%;
  width: 1438px;
  height: 360px;
  margin: 0 auto;
  position: relative;
  padding-top: 40px;

  .head {
    position: relative;
    margin-bottom: 10px;

    .select_box {
      position: absolute;
      top: -15px;
      right: 25px;
      width: 343px;
      height: 83px;
      background: linear-gradient(180deg, #0071AF 0%, rgba(0, 96, 140, 0) 100%);
      // overflow: hidden;

      :deep(.q-select) {
        height: 83px;
        width: 343px;

        // scale: 1.2;
        .q-field__control-container {
          padding: 0;
          height: 83px;
        }

        .ellipsis {
          height: 83px;
          font-size: 50px;
          padding-top: 30px;
          padding-left: 10px;
          font-family: AlibabaPuHuiTiRegular;
          font-weight: 600;
          background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
          font-style: normal;
          text-transform: none;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .q-field__control {
          background: linear-gradient(180deg, #0071AF 0%, rgba(0, 96, 140, 0) 100%);
        }

        .q-field__append {
          margin-top: 10px;
          scale: 5;
          margin-right: 40px;
          color: #96CDED;
        }
      }
    }
  }



  .card_j {
    width: 49px;
    height: 47px;
    position: absolute;
    top: 0;
    right: 0;
    background: url("assets/image/lefty/card_j_1.png") no-repeat 100%/100%;
  }

  .dian {
    background: url('assets/image/lefty/dian.png') no-repeat 100%/100%;
    width: 24px;
    height: 23px;
    margin-left: 14px;
    margin-right: 21px;
  }

  .icon_1 {
    background: url('assets/image/lefty/card_icon_2.png') no-repeat 100%/100%;
    width: 122px;
    height: 109px;
    margin-right: 19px;
  }

  .icon_2 {
    background: url('assets/image/lefty/card_icon_3.png') no-repeat 100%/100%;
    width: 122px;
    height: 109px;
    margin-right: 15px;
  }

  .text1 {
    font-family: AlibabaPuHuiTiRegular;
    font-weight: 400;
    font-size: 42px;
    color: #A3D9FF;
    line-height: 58px;
    font-style: normal;
    text-transform: none;
  }

  .text2 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 56px;
    line-height: 78px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #FFAE57 0%, #FFF0E4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: -6px;
  }

  .text3 {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 56px;
    line-height: 78px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #5DE5B4 0%, #A7ECE8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: -6px;
  }

  .text6 {
    background: linear-gradient(90deg, #6BDCFF 0%, #54FBF1 100%);
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 46px;
    line-height: 64px;
    text-align: right;
    font-style: normal;
    text-transform: none;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 60px;
    margin-top: 10px;
  }
}

.title-text {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 700;
  font-size: 53px;
  line-height: 180px;
  letter-spacing: 1px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(to bottom, #DAE6FA 0%, #96CDED 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.img_icon {
  width: 179px;
  height: 172px;
  margin-right: 20px;
  margin-top: -20px;
  background: url("assets/image/lefty/14_icon.png") no-repeat 100%/100%;
}

.title {
  width: 649px;
  height: 185px;
  padding: 0 40px;
  background: url("assets/image/lefty/check_bg.png") no-repeat 100%/100%;
}

.title_active {
  background: url("assets/image/lefty/check_active_bg.png") no-repeat 100%/100%;
}

.title_bg {
  position: relative;

  .btn-hg {
    padding: 0 40px;
    position: absolute;
    top: -35px;
    right: 40px;
    background: url("assets/image/lefty/hg_bg.png") no-repeat 100%/100%;
    width: 253px;
    height: 70.95px;

    .icon {
      width: 47px;
      height: 46px;
      background: url("assets/image/lefty/hg.png") no-repeat 100%/100%;
    }

    .text {
      font-family: AlibabaPuHuiTiRegular;
      font-weight: 500;
      font-size: 46px;
      line-height: 51px;
      letter-spacing: 2px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(to bottom, #F4F8FF 0%, #96CDED 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.title_name {
  font-family: AlibabaPuHuiTiRegular;
  font-weight: 500;
  font-size: 54px;
  line-height: 74px;
  letter-spacing: 2px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #C8D7E4 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 114px;
  margin-top: 10px;
}

.bg {
  width: 1569px;
  height: 817px;
  margin-top: -60px;
  background: url('assets/image/lefty/bg.png') no-repeat 100%/100%;
  padding-top: 80px;
}

.df {
  display: flex;
}

.aic {
  align-items: center;
}

.jcc {
  justify-content: center;
}

.jcsb {
  justify-content: space-between;
}

.jcsa {
  justify-content: space-around;
}

.fdc {
  flex-direction: column;
}

.f1 {
  flex: 1;
}
</style>
