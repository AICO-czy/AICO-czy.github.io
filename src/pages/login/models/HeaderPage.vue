<!--头部界面-->
<template>
  <q-dialog v-model="state.headerDialog" seamless position="top" transition-hide="slide-top" class="header-page-dialog">
    <div class="container-header-page no-shadow">

      <div class="row">
        <div class="col">
          <!-- <div class="row items-center header-left">
            <div class="col-auto">
              <div class="header-left-date">{{ state.dataInfo.date }}</div>
            </div>
            <div class="col-auto">
              <div class="header-left-today">{{ state.dataInfo.today }}</div>
            </div>
            <div class="col-auto">
              <div class="header-left-time">{{ state.dataInfo.time }}</div>
            </div>
            <div class="col-auto">
              <q-icon :name="state.weaterInfo?state.weaterInfo.weatherIcon:''" class="weather-icon"></q-icon>
            </div>
            <div class="col-auto">
              <div class="weather-text">{{ state.weaterInfo?state.weaterInfo.weather:"" }}</div>
            </div>
            <div class="col-auto">
              <div class="weather-temperature">{{ state.weaterInfo?state.weaterInfo.temperature:"" }} </div>
            </div>
            <div class="col-auto">
              <div class="weather-temperature-unit">{{ state.weaterInfo?"℃":"" }} </div>
            </div>
            <div class="col-auto">
              <div class="weather-humidness">{{ state.weaterInfo?state.weaterInfo.humidity:"" }} %
                <q-tooltip>空气湿度 : {{ state.weaterInfo?state.weaterInfo.humidity:"" }}%</q-tooltip>
              </div>
            </div>
          </div> -->
        </div>
        <div class="col">
          <div class="header-title">{{ title }}</div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </q-dialog>

</template>
<script setup lang="ts" name="headerPage">
import { reactive, onMounted, onUnmounted } from "vue";
import { get } from "src/utils/httpRequest";
import Moment from "moment";

const state = reactive({
  headerDialog: true,
  dataInfo: {
    date: "",
    time: "",
    today: "",
  },
  weaterInfo: null as any,
  timeInterval: null as any,
});

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});

/**定时获取时间 */
const loadTime = () => {
  state.timeInterval = setInterval(() => {
    getTime();
  }, 1000);
};

/**获取时间和日期 */
const getTime = () => {
  state.dataInfo.date = Moment().format("YYYY/MM/DD");
  state.dataInfo.time = Moment().format("HH:mm:ss");
  state.dataInfo.today = setToday();
};

/**获取中文星期几 */
const setToday = () => {
  var week = Moment().day();
  var today = "";
  switch (week) {
    case 1:
      today = "星期一";
      break;
    case 2:
      today = "星期二";
      break;
    case 3:
      today = "星期三";
      break;
    case 4:
      today = "星期四";
      break;
    case 5:
      today = "星期五";
      break;
    case 6:
      today = "星期六";
      break;
    case 0:
      today = "星期日";
      break;
  }
  return today;
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
        state.weaterInfo = res.data.lives[0];
        var iconUrl = getWeatherIcon(state.weaterInfo.weather);
        state.weaterInfo["weatherIcon"] = iconUrl;
      }
    })
    .catch((res) => {
      console.log("获取天气数据失败");
    });
};

/**获取天气图标 */
const getWeatherIcon = (weather: string) => {
  var iconUrl = null;
  if (weather === "晴") {
    iconUrl = "img:icons/cdsgl/weather/晴.png";
  } else if (weather === "阴") {
    iconUrl = "img:icons/cdsgl/weather/阴.png";
  } else if (weather.indexOf("雷") !== -1) {
    iconUrl = "img:icons/cdsgl/weather/雷阵雨.png";
  } else if (weather.indexOf("雨") !== -1) {
    iconUrl = "img:icons/cdsgl/weather/雨.png";
  } else if (weather.indexOf("雪") !== -1) {
    iconUrl = "img:icons/cdsgl/weather/雪.png";
  } else if (weather.indexOf("云") !== -1) {
    iconUrl = "img:icons/cdsgl/weather/多云.png";
  } else if (weather.indexOf("雾") !== -1) {
    iconUrl = "img:icons/cdsgl/weather/雾.png";
  } else if (weather === "霾") {
    iconUrl = "img:icons/cdsgl/weather/霾.png";
  }
  return iconUrl;
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
.container-header-page {
  width: 100% !important;
  max-width: 100% !important;
  height: 293px;
  max-height: 293px !important;
  background-image: url("assets/image/cdsgl/header/背景.png");
  background-size: 100% 100%;
}
.header-title {
  padding-top: 90px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 800;
  font-size: 96px;
  line-height: 113px;
  letter-spacing: 11px;
  text-align: center;
  font-style: italic;
  background: linear-gradient(90.00000350601624deg, #e6eaf6 0%, #b5bdfc 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header-left {
  width: 100%;
  height: 132px;
  text-align: center;
}
.header-left-date {
  padding-left: 40px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 42px;
  color: #207cdb;
  letter-spacing: 1px;
  font-style: normal;
  text-transform: none;
}
.header-left-today {
  padding-left: 20px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 42px;
  color: #207cdb;
  letter-spacing: 1px;
  font-style: normal;
  text-transform: none;
}
.header-left-time {
  padding-left: 20px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 75px;
  color: #d8d8d8;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.weather-icon {
  padding-left: 52px;
  width: 117px;
  height: 117px;
}
.weather-text {
  padding-left: 30px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #d8d8d8;
  line-height: 49px;
  font-style: normal;
  text-transform: none;
}
.weather-temperature {
  padding-left: 30px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 96px;
  color: #ffffff;
  line-height: 132px;
  font-style: normal;
  text-transform: none;
}
.weather-temperature-unit {
  padding-left: 30px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 54px;
  color: #ffffff;
  line-height: 74px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.weather-humidness {
  margin-left: 30px;
  width: 106px;
  height: 52px;
  background: linear-gradient(270deg, #336de7 0%, #29cbe8 100%);
  border-radius: 62px 62px 62px 62px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 30px;
  color: #181818;
  line-height: 41px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
<style>
.header-page-dialog > .q-dialog__inner.flex {
  max-width: 100% !important;
  max-height: 100% !important;
  padding: 0;
}
</style>
