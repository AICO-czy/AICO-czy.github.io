<template>
  <div class="bg">
    <div class="item">
      <div class="icom"></div>
      <div class="name">今日交通量</div>
      <div class="num"><nub-com :need="true" :formatLength="9" unit="万吨" /></div>
    </div>
    <div class="list">
      <el-carousel style="width: 95%;height: 130px;" :interval="5000" autoplay arrow="never">
        <el-carousel-item :key="1">
          <div class="item">
            <div class="icom"></div>
            <div class="name">北京<span class="arr"></span>承德</div>
            <div class="num"><nub-com /></div>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="2">
          <div class="item">
            <div class="icom"></div>
            <div class="name">承德<span class="arr"></span>北京</div>
            <div class="num"><nub-com /></div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import NubCom from './NubCom.vue'


</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  top: -30px;

  .list {
    display: flex;
    overflow-x: scroll;
    // scale: 5;
    width: 1500px;
  }

  .item {
    display: flex;
    align-items: center;
    width: 1500px;
    padding: 0 20px;

    .icom {
      background: url('assets/component/公路运营系统-承德市公路网_slices/切图 240.png') no-repeat center/cover;
      width: 25px;
      height: 23px;
      margin-right: 28px;
    }

    .name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 42px;
      color: #A3D9FF;
      line-height: 58px;
      text-align: left;
      font-style: normal;
      text-transform: none;

      .arr {
        display: inline-block;
        width: 42px;
        height: 32px;
        background: url('assets/component/公路运营系统-承德市公路网_slices/切图 250.png') no-repeat center/cover;
      }
    }

    .num {
      margin-left: 10px;
    }
  }
}
</style>
