<template>
  <div class="save-dialog row">
    <div class="save-dialog-content-box row">
      <div class="dialog-content-close" @click="handleClose">
        <q-icon :name="`img:${closeIcon}`" class="dialog-content-close-icon"></q-icon>
      </div>
      <div class="save-dialog-content-box-left column justify-center items-center">
        <div class="save-dialog-box-top ">
          <span>信息资源目录</span>
        </div>
        <div class="col full-width row justify-between items-center">
          <div class="save-dialog-box-left-left">
            <div class="save-dialog-box-left-left-bg"></div>
            <v-chart :option="option1" autoplay class="fit" />
          </div>
          <div class="save-dialog-box-left-line"></div>
          <div class="save-dialog-box-left-right row">
            <div class="catalog-item col-6 row items-center" v-for="item in catalogueData" :key="item.name">
              <img class="catalog-item-img" :src="item.img" alt="">
              <div class="catalog-item-content column">
                <span class="catalog-item-name">{{ item.name }}</span>
                <div class="catalog-item-value">
                  {{ item.value }}
                  <span>{{ item.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="save-dialog-content-box-right column justify-center items-center">
        <div class="save-dialog-box-top">
          <span>数据存储分类</span>
        </div>
        <div class="col full-width save-dialog-content-box-right-content row justify-between items-center">
          <div class="right-content-item column justify-center items-center" v-for="item in saveTypes" :key="item.name">
            <div class="right-content-item-text" :style="{ background: item.background }">
              {{ item.value }}
              <span>{{ item.unit }}</span>
            </div>
            <img :src="item.img" alt="">
            <div class="right-content-item-name">
              <span class="title-icon title-name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, reactive, toRefs } from "vue";
import * as echarts from "echarts";

import { useActiveTypeStore } from "../../store/activeType";
import closeIcon from 'src/assets/image/dataCenter/切图 53.png';

const activeTypeStore = useActiveTypeStore();
const { activeBtn, activeDialog } = toRefs(activeTypeStore);

import png1 from 'src/assets/image/dataCenter/切图 95.png';
import png2 from 'src/assets/image/dataCenter/切图 99.png';
import png3 from 'src/assets/image/dataCenter/切图 96.png';
import png4 from 'src/assets/image/dataCenter/切图 100.png';
import png5 from 'src/assets/image/dataCenter/切图 97.png';
import png6 from 'src/assets/image/dataCenter/切图 101.png';
import png7 from 'src/assets/image/dataCenter/切图 98.png';

import png8 from 'src/assets/image/dataCenter/切图 102.png';
import png9 from 'src/assets/image/dataCenter/切图 103.png';
import png10 from 'src/assets/image/dataCenter/切图 104.png';

const catalogueData = ref([
  {
    img: png1,
    name: '公路交通',
    value: '34',
    unit: '项',
  },
  {
    img: png2,
    name: '民用航空',
    value: '3',
    unit: '项',
  },
  {
    img: png3,
    name: '水路交通',
    value: '9',
    unit: '项',
  },
  {
    img: png4,
    name: '综合管理',
    value: '5',
    unit: '项',
  },
  {
    img: png5,
    name: '道路运输',
    value: '63',
    unit: '项',
  },
  {
    img: png6,
    name: '其他行业管理',
    value: '2',
    unit: '项',
  },
  {
    img: png7,
    name: '城市交通',
    value: '48',
    unit: '项',
  },
])

const saveTypes = ref([
  {
    value: '36.63',
    unit: 'GB',
    img: png8,
    name: '基础库',
    background: 'linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%)',
  },
  {
    value: '281.58',
    unit: 'GB',
    img: png9,
    name: '业务库',
    background: 'linear-gradient(90deg, #FFB579 0%, #FFEFB8 100%)',
  },
  {
    value: '95.39',
    unit: 'GB',
    img: png10,
    name: '主题库',
    background: 'linear-gradient(90deg, #E5DE5D 0%, #ECDEA7 100%)',
  }
]);

const option1 = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    data: ['公路交通', '水路交通', '道路运输', '城市交通', '民用航空', '综合管理', '其他行业管理'],
    right: '10%',
    top: '20%',
    textStyle: {
      color: '#BFEFFF',
      fontSize: 45,
      padding: [0, 0, 0, 30]
    },
    itemGap: 30, // 图例项之间的间距
    itemWidth: 36, // 图例标记的宽度
    itemHeight: 36 // 图例标记的高度
  },
  series: [
    {
      name: '磁盘使用率',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '35%'],
      center: ['30%', '52%'], // 图表中心位置
      label: {
        show: false,
        position: 'inner',
        fontSize: 14,
      },
      labelLine: {
        show: false,
        smooth: 0.2,
      },
      color: ['#5C64FF', '#6DD400', '#5AD8A6', '#026DB2', '#2DD0FD', '#FFD563', '#FFB76A'], // 各部分颜色
      data: [
        { value: 15, name: '公路交通' },
        { value: 15, name: '水路交通' },
        { value: 15, name: '道路运输' },
        { value: 15, name: '城市交通' },
        { value: 20, name: '民用航空' },
        { value: 25, name: '综合管理' },
        { value: 10, name: '其他行业管理' }
      ]
    },
    {
      type: 'pie',
      radius: ['52%', '70%'],
      center: ['30%', '52%'], // 图表中心位置
      labelLine: {
        length: 30,
      },
      label: {
        backgroundColor: '#0A3053',
        color: '#80CEFF',
        fontSize: 40,
        padding: [5, 10],
      },
      color: ['#5C64FF', '#6DD400', '#5AD8A6', '#026DB2', '#2DD0FD', '#FFD563', '#FFB76A'], // 各部分颜色
      data: [
        { value: 15, name: '公路交通' },
        { value: 15, name: '水路交通' },
        { value: 15, name: '道路运输' },
        { value: 15, name: '城市交通' },
        { value: 20, name: '民用航空' },
        { value: 25, name: '综合管理' },
        { value: 10, name: '其他行业管理' }
      ]
    }
  ]
})

const handleClose = () => {
  activeDialog.value = 0;
}
</script>

<style scoped lang="scss">
.save-dialog {
  width: 100%;
  height: 100%;
  background: url("assets/image/dataCenter/存-遮罩.png") no-repeat;
  background-size: 100% 100%;
  position: fixed;
  box-sizing: border-box;
}

.save-dialog-content-box {
  width: 6426px;
  height: 1519px;
  position: absolute;
  top: 346px;
  left: 106px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.save-dialog-content-box-left {
  width: 3225px;
  height: 100%;
  background: url("assets/image/dataCenter/切图 93.png") no-repeat;
  background-size: 100% 100%;
  padding: 320px 200px 320px;
}

.save-dialog-content-box-right {
  width: 1641px;
  height: 100%;
  background: url("assets/image/dataCenter/切图 90.png") no-repeat;
  background-size: 100% 100%;
  padding: 300px 190px 300px;
}

.dialog-content-close {
  position: absolute;
  top: -30px;
  right: 180px;
}

.dialog-content-close-icon {
  width: 102px;
  height: 102px;
}

.save-dialog-box {
  width: 100%;
  height: 100%;
}

.save-dialog-box-left {
  width: 49%;
  height: 100%;
}

.save-dialog-box-line {
  width: 12px;
  height: 451px;
  background: url("assets/image/dataCenter/切图 76.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 200px;
}

.save-dialog-box-left-top {
  margin-left: 50px;

  img {
    width: 276px;
    height: 226px;
    margin-right: 55px;
  }
}

.title-icon {
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    width: 28.62px;
    height: 28.31px;
    background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.title-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 58px;
  color: #A3D9FF;
  line-height: 80px;
  letter-spacing: 2px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.save-dialog-box-top {
  width: 1006px;
  height: 111px;
  background: url("assets/image/dataCenter/切图 77.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  span {
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
    font-weight: 400;
    font-size: 82px;
    line-height: 107px;
    letter-spacing: 5px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(90deg, #DAE6FA 0%, #96CDED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.save-dialog-box-right {
  width: 49%;
  height: 100%;
  padding-left: 176px;
}

.save-dialog-box-left-center-item {
  width: 590px;
  height: 118px;
  background: rgba(165, 203, 255, 0.1);
  border-radius: 10px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 56px;
    color: #87ADD0;
    line-height: 84px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.save-dialog-box-right-bottom {
  width: 100%;
}

.active-item {
  width: 590px;
  height: 118px;
  background: rgba(27, 123, 182, 0.5);
  border-radius: 10px 10px 10px 10px;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 56px;
    color: #E3F1FF;
    line-height: 84px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}


.right-top-item {
  margin-bottom: 45px;
}

.right-top-text {
  background: url('assets/image/dataCenter/切图 92.png') no-repeat center/cover;
  width: 702px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;

  .right-top-text-num {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 62px;
    line-height: 85px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 50px;
      color: rgba(220, 236, 255, 0.6);
      line-height: 76px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      /* 2. 清除渐变背景（避免继承父元素的渐变） */
      background: none;
      opacity: 0.967;
      -webkit-text-fill-color: rgba(220, 236, 255, 0.567);
      /* 同步覆盖兼容属性 */
      /* 3. 重置背景裁剪（恢复默认的边框盒） */
      -webkit-background-clip: border-box;
      background-clip: border-box;
    }
  }

}

.glhy-name {
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
  font-weight: 500;
  font-size: 58px;
  color: #9BE6FF;
  line-height: 80px;
  letter-spacing: 2px;
  text-shadow: 0px 6px 8px #042F4A;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-right: 30px;
}

.save-dialog-content-box-right-content {
  padding: 100px 20px 230px;
}

.right-content-item {
  .right-content-item-text {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 66px;
    line-height: 91px;
    letter-spacing: 3px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text;

    span {
      font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
      font-weight: 400;
      font-size: 56px;
      color: rgba(220, 236, 255, 0.6) !important;
      line-height: 73px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      /* 2. 清除渐变背景（避免继承父元素的渐变） */
      background: none;
      opacity: 0.967;
      -webkit-text-fill-color: rgba(220, 236, 255, 0.6);
      /* 同步覆盖兼容属性 */
      /* 3. 重置背景裁剪（恢复默认的边框盒） */
      -webkit-background-clip: border-box;
      background-clip: border-box;
    }
  }

  img {
    width: 235px;
    height: 216px;
    margin: 87px 0px 61px;
  }
}

.save-dialog-box-left-left {
  width: 55%;
  height: 100%;
  position: relative;
}

.save-dialog-box-left-line {
  width: 12px;
  height: 451px;
  background: url("assets/image/dataCenter/切图 76.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 50px;
}

.save-dialog-box-left-right {
  width: 42%;
  height: 100%;
  padding-left: 30px;

  .catalog-item {
    margin-bottom: 20px;

    .catalog-item-img {
      width: 177px;
      height: 112px;
    }

    .catalog-item-content {
      margin-left: 26px;
    }

    .catalog-item-name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 58px;
      color: #A3D9FF;
      line-height: 80px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .catalog-item-value {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 72px;
      line-height: 72px;
      letter-spacing: 1px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(51.63670243993558deg, #68EBFF 0%, #54C6FB 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      span {
        font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
        font-weight: 400;
        font-size: 56px;
        color: rgba(220, 236, 255, 0.6);
        letter-spacing: 1px;
        text-align: left;
        font-style: normal;
        text-transform: none;
        -webkit-background-clip: text;
        opacity: 0.967;
        -webkit-text-fill-color: rgba(220, 236, 255, 0.6);
      }
    }
  }
}

.save-dialog-box-left-left-bg {
  width: 603px;
  height: 602px;
  background-image: url('assets/image/dataCenter/切图 94.png');
  background-size: 100% 100%;
  position: absolute;
  top: 76px;
  left: 160px;
}
</style>
