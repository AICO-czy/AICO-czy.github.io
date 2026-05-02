<template>
  <div class="chat-index">
    <div class="top-btn">
      <div class="chat-btn active">
        <span>交通智能助手</span>
      </div>
      <div class="large-model-btn" @click="activeTypeStore.setActiveBtn(2)">
        <span>交通垂直大模型</span>
      </div>
    </div>
    <!-- 知识库按钮 -->
    <div class="center-btn" @click="handleOpen">
      <div class="btn-icon"></div>
      <div class="btn-text">知识库</div>
    </div>
    <!-- 机器人 -->
    <chat-robort class="top-[23%] left-[49%]" />
    <!-- 大按钮 -->
    <item-btn class="top-[406px] left-[211px]">知识查询</item-btn>
    <item-btn btn-type="2" class="top-[506px] left-[820px]">信息整合</item-btn>
    <item-btn btn-type="2" class="top-[506px] right-[885px]">辅助决策</item-btn>
    <item-btn class="top-[410px] right-[268px]">咨询应答</item-btn>
    <!-- 小按钮 -->
    <div class="small-btn top-[45%] left-[-3%]">法律法规</div>
    <div class="small-btn top-[56%] left-[12%]">政策文件</div>
    <div class="small-btn top-[61%] left-[31%]">政府规章</div>
    <div class="small-btn top-[61%] right-[31.5%]">事件案例</div>
    <div class="small-btn top-[56%] right-[13%]">行业规范</div>
    <div class="small-btn top-[45%] right-[-3%]">技术标准</div>
  </div>
</template>

<script setup>
import { useActiveTypeStore } from "../../store/activeType";
import ChatRobort from './components/chatRobort.vue'
import ItemBtn from './components/itemBtn.vue'

const activeTypeStore = useActiveTypeStore();

function handleOpen() {
  activeTypeStore.setActiveBtn(3)
}
</script>

<style lang="scss" scoped>
.center-btn {
  width: 591px;
  height: 165px;
  background: url('assets/image/digitalIntelligence/centerBtn.png') no-repeat center/cover;
  position: absolute;
  top: 5%;
  left: 49%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 100px 0 50px;

  .btn-icon {
    width: 164px;
    height: 137px;
    background: url('assets/image/digitalIntelligence/centerIcon.png') no-repeat center/cover;
  }

  .btn-text {

    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 70px;
    line-height: 145px;
    letter-spacing: 2px;
    // text-shadow: 0px 8px 8px #042F4A;
    text-align: left;
    font-style: normal;
    text-transform: none;
    background: linear-gradient(0deg, #FFAA17 0%, #FFFFFF 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.chat-index {
  position: relative;
  width: 3613px;
  height: 1766px;
  top: 12%;
  left: 50.6%;
  transform: translate(-50%);
  background: url('assets/image/digitalIntelligence/bg1.png') no-repeat center/cover;
  z-index: 99;
  pointer-events: all;
}

.small-btn {
  position: absolute;
  font-family: DingTalk JinBuTi, DingTalk JinBuTi;
  font-weight: 400;
  font-size: 74px;
  line-height: 104px;
  letter-spacing: 7px;
  text-shadow: 0px 6px 8px #042F4A;
  text-align: center;
  font-style: normal;
  text-transform: none;
  color: #FFFFFF // background: linear-gradient(180deg, #FFFFFF 90%, #A8E9FF 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
}

.top-btn {
  position: absolute;
  // background: skyblue;
  left: 49%;
  transform: translateX(-50%);
  width: 2800px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  pointer-events: all;

  span {
    font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
    font-weight: 700;
    font-size: 66px;
    line-height: 106px;
    letter-spacing: 5px;
    font-style: normal;
    text-transform: none;
  }

  &>.chat-btn {
    width: 800px;
    height: 129px;
    background: url('assets/image/digitalIntelligence/topLeftBtn.png') no-repeat center/cover;

    span {
      text-shadow: 0px 4px 8px #0085D6;
      background: linear-gradient(180deg, #FFFFFF 80%, #B9EEFF 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &.active {
      background: url('assets/image/digitalIntelligence/topLeftBtnA.png') no-repeat center/cover;
      height: 153px;

      &>span {
        background: linear-gradient(180deg, #FFFFFF 30%, #FFDD8E 69%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0px 4px 8px #D68000;
      }
    }
  }

  &>.large-model-btn {
    width: 800px;
    height: 129px;
    background: url('assets/image/digitalIntelligence/topRightBtn.png') no-repeat center/cover;

    span {
      text-shadow: 0px 4px 8px #0085D6;
      background: linear-gradient(180deg, #FFFFFF 80%, #B9EEFF 90%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
