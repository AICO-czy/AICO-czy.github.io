<!--头部界面-->
<template>
  <div class="row header-page">
    <div class="col ">

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
            <div class="mr-[45px] w-[88px] h-[72px] mt-[10px]">
              <img class="w-full h-full" :src="png1" alt="">
            </div>
            <div class="col-auto">
              <div class="content-weather-icon"></div>
            </div>
            <div class="col-auto">
              <div class="time-date">18~28 ℃</div>
            </div>
            <div class="col-auto">
              <div class="time-date">晴转多云</div>
            </div>
            <div class="col-auto">
              <div class="time-date">{{ state.dataInfo.date }}</div>
            </div>
            <div class="col-auto">
              <div class="time-date">星期{{ workdate[state.dataInfo.work - 1] }}</div>
            </div>
            <div class="col-auto">
              <div class="time-value">{{ state.dataInfo.time }}</div>
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
    work: 0
  } as any,
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
const png1 = ref("")
png1.value = new URL('../../../assets/image/TransportationAndTravel/气象灾害预警信号图标_slices/Property 1=大风, Property 2=1级红色.png', import.meta.url).href;

const router = useRouter();

const workdate = ['一', '二', '三', '四', '五', '六', '日']

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
  state.dataInfo.work = Moment().format("d");
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
.content-weather-icon {
  width: 81.59px;
  height: 82px;
  margin-right: 50px;
  background-image: url("assets/component/其他天气汇总_slices/切图 82.png");
  background-size: 100% 100%;
}

.header-page {
  position: relative;
  width: 100%;
  height: 204px;
  background-image: url("assets/component/statistics/切图 527.png");
  background-size: 100% 100%;
}

.back-btn-icon {
  font-size: 64px;
}

.user-info {
  margin-left: 26px;
  width: 104px;
  height: 104px;
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
  // background-image: url("assets/image/cdsgl/header/背景2.png");
  background-size: 100% 100%;
}

.header-title {
  font-family: Alibaba PuHuiTi;
  font-weight: normal;
  font-size: 96px;
  line-height: 134px;
  letter-spacing: 29px;
  text-shadow: inset 0px 0px 5px #6f8af5, 0px 20px 24px rgba(13, 37, 67, 0.3);
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(180deg, #ffffff 0%, #8ed8ff 100%);
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
  width: 2000px;
  height: 120px;
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
</style>
