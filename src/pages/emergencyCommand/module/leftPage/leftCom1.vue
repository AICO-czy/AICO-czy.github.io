<template>
  <div class="con-box">
    <div class="title">
      <div class="name">市区值班</div>
      <div class="btn">切换县区</div>
      <div class="icon flex-1 icon1"></div>
      <div class="wind">昼</div>
    </div>
    <div class="con">
      <el-carousel height="263px">
        <el-carousel-item v-for="item in 3" :key="item">
          <div class="item">
            <div class="row">
              <div class="title">带班领导</div>
              <div class="">刘某{{ item }}</div>
            </div>
            <div class="row">
              <div class="title">值班人员</div>
              <div class="flex-1">
                <span>张某</span>
                <span>赵某</span>
              </div>
              <div class="btn">值班记录</div>
            </div>
            <div class="row">
              <div class="title">值班电话</div>
              <div class="">
                <span>2271074</span>
                <span>2271678</span>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.con-box {
  width: 100%;
  height: 100%;
  position: relative;
  // background: pink;

  &>.title {
    width: 1306px;
    height: 100px;
    display: flex;
    margin: auto;
    align-items: center;

    .name {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 52px;
      // line-height: 94px;
      // text-shadow: 0px 4px 4px #042F4A;
      text-align: left;
      font-style: normal;
      text-transform: none;
      background: linear-gradient(180deg, #FFFFFF 30%, #B9EEFF 69%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-right: 75px;
    }

    .btn {
      width: 288px;
      height: 67px;
      background: url('/src/assets/image/emergencyCommand/切图 634.png');
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 48px;
      color: #C6EAFF;
      line-height: 55px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }

    .icon {
      width: 93px;
      height: 85px;
      &.icon1{
        background: url('/src/assets/image/emergencyCommand/切图 641.png') no-repeat right;
      }
      &.icon2{
        background: url('/src/assets/image/emergencyCommand/切图 643.png') no-repeat right;
      }
    }

    .wind {
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 50px;
      color: #BAE2FF;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  .con {
    width: 1306px;
    height: 263px;
    background: url('/src/assets/image/emergencyCommand/切图 639.png');
    margin: auto;

    :deep(.el-carousel) {
      --el-carousel-indicator-width: 58px;
      --el-carousel-indicator-height: 10px;

      .el-carousel__button {
        border-radius: 5px;
        margin: 0 12px;
        background: #2DBDFF;
      }

      .is-active {
        .el-carousel__button {
          background: #2DBDFF;
        }
      }
    }

    :deep(.el-carousel__arrow) {
      display: none;
    }

    .item {
      padding: 10px 54px;
      overflow: hidden;

      .row {
        display: flex;
        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 50px;
        color: #BAE2FF;
        line-height: 70px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        .title {
          margin-right: 55px;
        }

        .btn {
          width: 308px;
          height: 75px;
          background: url('/src/assets/image/emergencyCommand/切图 640.png');
          text-align: center;
          font-family: DingTalk JinBuTi, DingTalk JinBuTi;
          font-weight: 400;
          font-size: 48px;
          color: #D2ECFF;
          line-height: 63px;
          font-style: normal;
          text-transform: none;
        }

        span {
          margin-right: 39px;
        }
      }
    }
  }
}
</style>
