<template>
  <div class="dialog-con">
    <div class="title">创建会议</div>
    <div class="join-btn">创建会议</div>
    <div class="line"></div>
    <div class="tips">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="会议记录" name="first">
          <div class="list">
            <el-scrollbar height="900px">
              <div class="hasmeeting" v-if="!hasmeeting">当前无受邀加入的会议</div>
              <template v-for="item in listmeeting">
                <div class="item item1" v-if="item.status == 1">
                  <div class="title">
                    <div>会议主题名称{{ item.name }}</div>
                    <div>{{ item.time }}</div>
                  </div>
                  <div class="content">
                    <div class="status">进行中</div>
                    <div class="time">时长:{{ item.timeout }}</div>
                    <div class="user">发起人:{{ item.user }}</div>
                    <div class="end-icon"></div>
                  </div>
                  <div class="join-btn">加入</div>
                </div>
                <div class="item" v-else>
                  <div class="title">
                    <div>会议主题名称{{ item.name }}</div>
                    <div>{{ item.time }}</div>
                  </div>
                  <div class="content">
                    <div class="status">已结束</div>
                    <div class="time">时长{{ item.timeout }}</div>
                    <div class="user">发起人:{{ item.user }}</div>
                    <div class="icon"></div>
                  </div>
                </div>
              </template>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通讯录" name="second">
          <div class="list"></div>
        </el-tab-pane>
        <el-tab-pane label="即时消息" name="third">
          <div class="list"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="line"></div>
    <div class="dd-btn">三级调度</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeName = ref('first');
// 计算当前有无可参加的会议
const hasmeeting = computed(() => {
  return listmeeting.some(item => item.status == 1)
})
function handleClick(tab: any, event: Event) {
  console.log(tab, event);
}

const listmeeting = [
  {
    name: '会议1',
    time: '2021年09月01日',
    status: 1,
    timeout: '32分35秒',
    user: '刘某'
  },
  {
    name: '会议1',
    time: '2021年09月01日',
    status: 0,
    timeout: '32分35秒',
    user: '刘某某'
  },
  {
    name: '会议1',
    time: '2021年09月01日',
    status: 0,
    timeout: '32分35秒',
    user: '刘某'
  },
  {
    name: '会议1',
    time: '2021年09月01日',
    status: 0,
    timeout: '32分35秒',
    user: '刘某'
  },
  {
    name: '会议1',
    time: '2021年09月01日',
    status: 0,
    timeout: '32分35秒',
    user: '刘某'
  }
]
</script>

<style lang="scss" scoped>
.dialog-con {
  width: 100%;
  height: 100%;
  position: relative;

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

  &>.join-btn {
    margin: auto;
    width: 1306px;
    height: 95px;
    background: url('/src/assets/image/emergencyCommand/切图 635.png');
    font-family: DingTalk JinBuTi, DingTalk JinBuTi;
    font-weight: 400;
    font-size: 54px;
    color: #D2ECFF;
    line-height: 90px;
    letter-spacing: 3px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }

  &>.line {
    margin: 11px auto;
    height: 12px;
    width: 1312px;
    background: skyblue;
  }

  &>.tips {
    margin: auto;
    width: 1306px;

    :deep(.el-tabs) {
      --el-font-size-base: 50px;
      --el-tabs-header-height: 79px;


      .el-tabs__nav-wrap::after {
        height: 0;
      }

      .el-tabs__active-bar {
        display: none;
      }

      .el-tabs__item {
        width: 311px;
        background: rgba(0, 67, 111, 0.70);
        color: #D9F2FF;

        &.is-active {
          background: #005995;
          color: #D9F2FF;
        }
      }
    }

    .list {
      height: 900px;

      .item {
        width: 1306px;
        height: 192px;
        background: url('/src/assets/image/emergencyCommand/切图 637.png');
        margin-bottom: 18px;

        font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
        font-weight: 500;
        font-size: 50px;
        color: #BAE2FF;
        line-height: 70px;
        text-align: left;
        font-style: normal;
        text-transform: none;

        display: flex;
        flex-direction: column;
        padding: 17px 64px;
        position: relative;
        justify-content: space-between;

        .title {
          display: flex;
          justify-content: space-between;
        }

        .content {
          display: flex;
          align-items: center;

          .status {
            width: 243.6px;
            height: 72.22px;
            background: rgba(255, 255, 255, 0.3);
            text-align: center;
            line-height: 70px;
            border-radius: 10px;
            margin-right: 32px;
          }

          .time {
            flex: 1;
          }

          .user {
            width: 330px;
          }

          .end-icon {
            width: 53px;
            height: 52px;
            margin-right: -40px;
          }
        }

        .icon {
          width: 53px;
          height: 52px;
          background: url('/src/assets/image/emergencyCommand/切图 638.png');
          position: relative;
          margin-right: -40px;
        }
      }

      .item1 {
        width: 1306px;
        height: 265px;
        background: url('/src/assets/image/emergencyCommand/切图 663.png');

        .content {
          .status {
            background: rgba(45, 255, 175, 0.46);
          }
        }

        .join-btn {
          width: 237px;
          height: 67px;
          background: url('/src/assets/image/emergencyCommand/切图 664.png');
          font-family: AlibabaPuHuiTi, AlibabaPuHuiTi;
          font-weight: 500;
          font-size: 48px;
          line-height: 65px;
          text-align: center;
          color: #C6EAFF;
          position: relative;
          align-self: flex-end;
          margin-right: -40px;
        }
      }
    }
  }

  &>.dd-btn {
    margin: auto;
    width: 1306px;
    height: 96px;
    background: url('/src/assets/image/emergencyCommand/切图 667.png');
    font-family: DingTalk JinBuTi, DingTalk JinBuTi;
    font-weight: 400;
    font-size: 54px;
    color: #D2FFFC;
    line-height: 88px;
    letter-spacing: 3px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
