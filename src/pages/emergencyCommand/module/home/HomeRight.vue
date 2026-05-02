<template>
  <div class="right-box">
    <div class="search-tool">
      <div class="search" v-if="modeType == 2">
        <div class="search-box"  v-if="searchFlag">
          <div class="input-box">
            <el-input placeholder="输入搜索关键词" v-model="searchValue"></el-input>
          </div>
          <div class="btn right-[195px]">查询</div>
          <div class="btn right-[35px]">重置</div>
        </div>
        <div class="icon" @click="searchFlag = !searchFlag"></div>
      </div>
      <div class="type-btn" :class="modeType == 2 ? 'active' : ''" @click="handleChange">雨雪保障</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useEmergencyCommandGlobal } from '../../store/index'

const emergencyCommandGlobal = useEmergencyCommandGlobal()

const { modeType } = toRefs(emergencyCommandGlobal)

const searchValue = ref('')

const searchFlag = ref(false)

function handleChange() {
  searchFlag.value = false
  searchValue.value = ''
  if (modeType.value == 1) {
    emergencyCommandGlobal.modeType = 2
  } else {
    emergencyCommandGlobal.modeType = 1
  }
}
</script>

<style lang="scss" scoped>
.right-box {
  pointer-events: none;

  .search-tool {
    display: flex;
    align-items: center;
    pointer-events: all;

    .search {
      display: flex;
      align-items: center;

      .search-box {
        background: url('/src/assets/image/emergencyCommand/切图 651.png') no-repeat;
        width: 863px;
        height: 107px;
        margin-right: 16px;
        position: relative;

        .input-box {
          position: absolute;
          margin: 10px 5px;
          height: 86px;
          width: 530px;
          // background: rgba($color: pink, $alpha: .5);

          :deep(.el-input){
            width: 100%;
            height: 86px;
            --el-input-border-color:transparent;
            --el-input-hover-border-color:transparent;
            --el-input-inner-height:50px;
            --el-input-text-color:#A9CEE8;
            .el-input__wrapper{
              background: transparent;
              border-radius:0;
              box-shadow:0;
              font-size: 48px;
              // color:#A9CEE8;
            }
          }
        }

        .btn {
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 48px;
          line-height: 66px;
          text-align: left;
          font-style: normal;
          text-transform: none;
          background: linear-gradient(180deg, #DAE6FA 0%, #96CDED 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .icon {
        width: 141.05px;
        height: 112px;
        margin-right: 39px;
        background: url('/src/assets/image/emergencyCommand/切图 228.png');
      }
    }

    .type-btn {
      pointer-events: all;
      background: url('/src/assets/image/emergencyCommand/切图 669.png');
      width: 388px;
      height: 117px;
      font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
      font-weight: 500;
      font-size: 50px;
      line-height: 107px;
      letter-spacing: 1px;
      text-shadow: 0px 4px 4px #3E3E3E;
      font-style: normal;
      text-transform: none;
      color: #fff;
      padding-left: 51px;

      &.active {
        background: url('/src/assets/image/emergencyCommand/切图 650.png');
      }
    }
  }
}
</style>
