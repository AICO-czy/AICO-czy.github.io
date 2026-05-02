<template>
  <div class="dialog-con">
    <div class="title">{{ activeName.name }}</div>
    <el-carousel height="430px" arrow="never" indicator-position="none" @change="handleChange" ref="carouselRef">
      <el-carousel-item v-for="item in tabarList" :key="item">
        <el-scrollbar height="430px">
          <div class="con" v-if="item.content">
            {{ item.content }}
          </div>
          <div class="card" v-else>
            <div class="tip">当前暂无水毁事件。/当前暂无降雪影响公路通行事件。</div>
            <div class="bg">
              <div class="icon"></div>
              <div class="title">暂无事件</div>
            </div>
          </div>
        </el-scrollbar>
      </el-carousel-item>
    </el-carousel>
    <div class="tabar">
      <div v-for="item in tabarList" class="item" :class="item.class, item.class == activeName.class ? 'active' : ''"
        @click="handleClick(item)">
      </div>
    </div>
    <div class="time">{{ activeName.time }}</div>
  </div>
</template>

<script setup lang="ts">
import { content } from 'app/tailwind.config';
import { ref } from 'vue';

const carouselRef: any = ref(null);

const activeName: any = ref({
  id: 1,
  name: '普通干线公路',
  class: 'normal',
  content: '承德市普通干线公路已累计清理塌方110处/11788立方米，泥石流88处/16471立方米，清理路面障碍物16处，倒伏树木33棵，造成路基、边坡冲刷损毁83处/218563.6立方米，路面积水13处，路面清淤52826立方米，回填路基6处/37879立方米。累计投入抢通人员1883人次，机械778',
  time: '2025.8.04 11点前更新'
});

const tabarList = [
  {
    id: 0,
    name: '承平高速',
    class: 'highway',
    time: '2025.8.04 11点前更新'
  },
  {
    id: 1,
    name: '普通干线公路',
    class: 'normal',
    content: '承德市普通干线公路已累计清理塌方110处/11788立方米，泥石流88处/16471立方米，清理路面障碍物16处，倒伏树木33棵，造成路基、边坡冲刷损毁83处/218563.6立方米，路面积水13处，路面清淤52826立方米，回填路基6处/37879立方米。累计投入抢通人员1883人次，机械778',
    time: '2025.8.04 11点前更新'
  },
  {
    id: 2,
    name: '农村公路',
    class: 'country',
    time: '2025.8.04 11点前更新'
  }
]

function handleChange(current: number, prev: number) {
  // console.log(current, prev);
  activeName.value = tabarList[current];
}

function handleClick(item: any) {
  carouselRef.value.setActiveItem(item.id);
}

</script>

<style lang="scss" scoped>
.dialog-con {
  width: 100%;
  height: 100%;
  position: relative;
  // background: skyblue;

  &>.title {
    width: 1306px;
    height: 100px;
    margin: auto;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 52px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :deep(.el-carousel) {
    // width: ;
  }

  .con {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 400;
    font-size: 50px;
    color: #CBEFFF;
    line-height: 79px;
    text-align: left;
    font-style: normal;
    text-transform: none;
    padding: 10px;
  }

  .card {
    // background: pink;
    height: 430px;
    width: 100%;
    padding-top: 39px;

    &>.tip {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 400;
      font-size: 50px;
      color: #CBEFFF;
      line-height: 79px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 26px;
      margin-left: 25px;
    }

    &>.bg {
      width: 1302px;
      height: 280px;
      margin: auto;
      background: rgba(255, 255, 255, 0.05);
      padding-top: 40px;
      overflow: hidden;

      &>.icon {
        width: 116px;
        height: 130px;
        background: url('/src/assets/image/emergencyCommand/切图 629.png');
        margin: auto;
      }

      &>.title {
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 48px;
        color: #8BA6B5;
        line-height: 100px;
        text-align: center;
        font-style: normal;
        text-transform: none;
      }
    }
  }

  &>.tabar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

    .item {
      width: 98px;
      height: 101px;

      &.highway {
        background: url('/src/assets/image/emergencyCommand/切图 628.png') no-repeat;
        background-size: 100% 100%;

        &.active {
          background: url('/src/assets/image/emergencyCommand/切图 628 (3).png') no-repeat;
        }
      }

      &.normal {
        background: url('/src/assets/image/emergencyCommand/切图 628 (1).png') no-repeat;
        background-size: 100% 100%;
        margin: 0 34px;

        &.active {
          background: url('/src/assets/image/emergencyCommand/切图 628 (4).png') no-repeat;
        }
      }

      &.country {
        background: url('/src/assets/image/emergencyCommand/切图 628 (2).png') no-repeat;
        background-size: 100% 100%;

        &.active {
          background: url('/src/assets/image/emergencyCommand/切图 628 (5).png') no-repeat;
        }
      }
    }
  }

  .time {
    position: absolute;
    right: 10px;
    bottom: 0;
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 500;
    font-size: 46px;
    color: #8FAABC;
    line-height: 94px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>
