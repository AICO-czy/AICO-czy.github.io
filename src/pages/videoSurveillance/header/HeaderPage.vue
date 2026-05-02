<!--头部界面-->
<template>
  <div class="row header-page">
    <div class="col ">
      <div class="header-page-left">
        <div class="header-page-left-content">
          <div class="row items-center page-left-top">
            <div class="col-auto">
              <q-icon name="img:icons/cdsgl/header/logo.svg" class="left-icon"></q-icon>
            </div>
            <div class="col">
              <div class="left-label">承德市交通运输局</div>
            </div>
          </div>
          <div class="row items-center page-left-bottom">
            <div class="col-auto">
              <q-icon name="img:icons/cdsgl/header/home.svg" class="back-btn-icon" @click="toPortal"></q-icon>
            </div>
            <div class="col-auto">
              <div class="user-info">
                <div class="user-name">刘</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-auto">
      <div class="header-page-middle">
        <div class="header-title">{{ props.title }}</div>
      </div>
    </div>
    <div class="col ">
      <div class="header-page-right">
        <div class="header-page-right-content">
          <div class="row items-center page-right-top">
            <div class="col"></div>
            <div class="col-auto">
              <div class="time-date">{{ state.dataInfo.date }}</div>
            </div>
            <div class="col-auto">
              <div class="time-value">{{ state.dataInfo.time }}</div>
            </div>
          </div>
          <div class="page-right-bottom">
            <div class="weaterInfo-content">
              <span class="weather-label">{{ state.weaterInfo.weather }}</span>
              <span class="weather-temperature">{{ state.weaterInfo.temperature }}℃</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="headerPage">
import { reactive, onMounted, onUnmounted, ref, unref } from "vue";
import { get } from "src/utils/httpRequest";
import { useRouter } from "vue-router";
import Moment from "moment";
const state = reactive({
  timeInterval: null as any,
  dataInfo: {
    date: "",
    time: "",
  },
  weaterInfo: {
    weather: "",
    temperature: "",
  } as any,
});

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});

const router = useRouter();

/**定时获取时间 */
const loadTime = () => {
  state.timeInterval = setInterval(() => {
    getTime();
  }, 1000);
};

/**获取时间和日期 */
const getTime = () => {
  state.dataInfo.date = Moment().format("YYYY-MM-DD");
  state.dataInfo.time = Moment().format("HH:mm:ss");
};

const intWeather = () => {
  get("amapWebApi/ip", { key: "c397e5fad2a836de788d6c0f8234f9ad" })
    .then((res) => {
      if (res.data && res.data.status === "1") {
        getWeather(res.data.adcode);
      }
    })
    .catch((err) => {
      console.log("获取所在城市数据失败");
    });
};

/**获取天气预报 */
const getWeather = (cityCode: string) => {
  get("amapWebApi/weather/weatherInfo", {
    key: "c397e5fad2a836de788d6c0f8234f9ad",
    city: cityCode,
  })
    .then((res) => {
      if (res.data && res.data.status === "1") {
        state.weaterInfo.weather = res.data.lives[0].weather;
        state.weaterInfo.temperature = res.data.lives[0].temperature;
      }
    })
    .catch((res) => {
      console.log("获取天气数据失败");
    });
};

/**跳转到门户导航 */
const toPortal = () => {
  router.push("/PortalPage");
};

/**页面关闭 */
const closePage = () => {
  if (state.timeInterval) {
    clearInterval(state.timeInterval);
  }
};

onMounted(() => {
  loadTime();
  intWeather();
});
onUnmounted(() => {
  closePage();
});
</script>
<style scoped lang="scss">
.header-page {
  position: relative;
  width: 100%;
  height: 204px;
  background-image: url("assets/image/cdsgl/header/头部底图背景.png");
  background-size: 100% 100%;
}

.header-page-left {
  position: relative;
}

.header-page-left-content {
  position: absolute;
  top: 81px;
  left: 67px;
  z-index: 7000 !important;
}

.page-left-top {
  width: 852px;
  height: 120px;
  background-image: url("assets/image/cdsgl/header/左侧线条.png");
  background-size: 100% 100%;
}

.left-icon {
  font-size: 66px;
  padding-left: 63px;
}

.left-label {
  padding-left: 31px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 62px;
  line-height: 87px;
  letter-spacing: 7px;
  text-shadow: 8px 8px 0px rgba(22, 22, 19, 0.27),
    0px 0px 43px rgba(81, 196, 255, 0.1);
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 5%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-left-bottom {
  margin-top: 15px;
}

.back-btn-icon {
  font-size: 52px;
}

.user-info {
  margin-left: 26px;
  width: 88px;
  height: 88px;
  border-radius: 44px;
  background: linear-gradient(180deg,
      rgba(65, 159, 255, 0.3647) 0%,
      rgba(66, 157, 255, 0.3294) 11%,
      rgba(65, 158, 255, 0.2588) 28%,
      rgba(68, 161, 255, 0.1176) 64%,
      rgba(65, 159, 255, 0) 100%);
}

.user-name {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 700;
  font-size: 40px;
  line-height: 88px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 5%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-page-middle {
  width: 5497px;
  height: 100%;
  background-image: url("assets/image/cdsgl/header/背景2.png");
  background-size: 100% 100%;
}

.header-title {
  font-family: SourceHanSansHeavy, SourceHanSansHeavy;
  font-weight: 900;
  font-size: 96px;
  line-height: 204px;
  letter-spacing: 24px;
  text-shadow: 0px 22px 14px rgba(0, 66, 112, 0.5);
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 50%, #6acbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-page-right {
  position: relative;
}

.header-page-right-content {
  position: absolute;
  top: 81px;
  right: 67px;
  z-index: 7000 !important;
}

.page-right-top {
  width: 852px;
  height: 120px;
  background-image: url("assets/image/cdsgl/header/右侧线条.png");
  background-size: 100% 100%;
}

.time-date {
  padding-right: 42px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 45px;
  line-height: 85px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 0%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.time-value {
  padding-right: 114px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 45px;
  line-height: 85px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 0%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.weaterInfo-content {
  width: 221px;
  height: 68px;
  margin-top: 16px;
  float: right;
  text-align: center;
  background: linear-gradient(180deg,
      rgba(65, 159, 255, 0.3647) 0%,
      rgba(66, 157, 255, 0.3294) 11%,
      rgba(65, 158, 255, 0.2588) 28%,
      rgba(68, 161, 255, 0.1176) 64%,
      rgba(65, 159, 255, 0) 100%);
  border-radius: 0px 0px 0px 0px;
}

.weather-label {
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 42px;
  line-height: 68px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 0%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.weather-temperature {
  padding-left: 20px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 42px;
  line-height: 68px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 0%, #8ccbff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
