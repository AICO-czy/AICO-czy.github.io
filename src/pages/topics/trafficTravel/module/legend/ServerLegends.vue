<!--服务图例-->
<template>
  <div class="server-legends">
    <!--图例列表-->
    <div class="server-legends-content">
      <template v-for="(legend, index) in state.legendGroup" :key="index">
        <div class="row items-center legend-item" @click="selectLegend(legend)">
          <div class="col-auto">
            <q-icon :name="legend.icon" class="legend-item-icon"></q-icon>
          </div>
          <div class="col">
            <div class="legend-item-label">{{ legend.label }}</div>
          </div>
          <div class="col-auto">
            <div class="legend-item-checkbox">
              <q-icon
                name="check"
                class="checkbox-icon"
                v-if="legend.selected"
              ></q-icon>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!--子图例列表-->
  <div class="child-legend-content">
    <template v-for="(legend, index) in state.legendGroup" :key="index">
      <template
        v-if="legend.childen && legend.childen.length > 0 && legend.selected"
      >
        <div class="column justify-end legend-child">
          <div class="legend-child-content">
            <template v-for="(child, index) in legend.childen" :key="index">
              <div
                class="row items-center legend-item"
                @click="selectLegend(child)"
              >
                <div class="col-auto">
                  <template v-if="child.icon">
                    <q-icon
                      :name="child.selectIcon"
                      class="legend-item-icon-select"
                      v-if="child.selected && child.selectIcon"
                    ></q-icon>
                    <q-icon
                      :name="child.icon"
                      class="legend-item-icon"
                      v-else
                    ></q-icon>
                  </template>
                  <div
                    class="legend-item-line"
                    :style="`background:${child.color}`"
                    v-else
                  ></div>
                </div>
                <div class="col">
                  <div class="legend-item-label">{{ child.label }}</div>
                </div>
                <div class="col-auto">
                  <div class="legend-item-checkbox">
                    <q-icon
                      name="check"
                      class="checkbox-icon"
                      v-if="child.selected"
                    ></q-icon>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts" name="ServerLegends">
import { reactive, onMounted, onUnmounted, watch } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";
import { get } from "src/utils/httpRequest";
const state = reactive({
  legendGroup: [] as any,
  pickhandler: null as any,
});

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

const storeLegendInfo = legendInfo();
const { serverLegend, selectLegendType } = storeToRefs(storeLegendInfo);

//撒点数据
var billboardsData = null as any;
//弹框
var bubbles = [] as any;

/**获取撒点数据 */
const initData = () => {
  if (serverLegend.value) {
    state.legendGroup = JSON.parse(JSON.stringify(serverLegend.value));
  } else {
    state.legendGroup = [];
  }
  state.legendGroup.forEach(async (item: any) => {
    if (item.childen && item.childen.length > 0) {
      item.childen.forEach(async (child: any) => {
        if (!child.layerName) {
          var label = child.label;
          var url = `data/geojson/cdsgl/geographicInfo/testData/${child.label}.geojson`;
          var datas = (await getGeoJsonData(
            url,
            label,
            child.code,
            child.poiImg
          )) as any;
          if (datas && datas.length > 0) {
          }
        }
      });
    } else {
      var url = `data/geojson/cdsgl/geographicInfo/testData/${item.label}.geojson`;
      var datas = (await getGeoJsonData(
        url,
        item.label,
        item.code,
        item.poiImg
      )) as any;
      if (datas && datas.length > 0) {
      }
    }
  });
};

/**图例选中事件 */
const selectLegend = (legend: any) => {
  legend.selected = !legend.selected;
  //基础路网
  if (legend.label === "公路路网" || legend.layerName) {
    setLayerShowOrHideen(legend);
  } else {
    setPoiShowOrHideen(legend);
  }
};

/**设置图层显隐 */
const setLayerShowOrHideen = (legend: any) => {
  //判断是否选中一级图例
  if (legend.childen && legend.childen.length > 0) {
    legend.childen.forEach((item: any) => {
      if (!legend.selected) {
        item.selected = legend.selected;
      }
    });
  } else {
  }
};
/**设置撒点显隐 */
const setPoiShowOrHideen = (legend: any) => {
  if (legend.childen && legend.childen.length > 0) {
    legend.childen.forEach((item: any) => {
      if (!legend.selected) {
        item.selected = legend.selected;
      }
    });
  } else {
  }
};

/**提取geojson数据信息 */
const getGeoJsonData = async (url: any, name: any, type: any, img: any) => {
  var result = [] as any;
  await get(url, {})
    .then((res) => {
      if (res.data) {
        res.data.features.forEach((item: any) => {
          var data = {
            name: name,
            type: type,
            img: img,
            x: item.geometry.coordinates[0],
            y: item.geometry.coordinates[1],
          };
          result.push(data);
        });
      }
    })
    .catch((err) => {});
  return result;
};

/**联动选中图例项 */
const selectLegendItem = (key: any) => {
  state.legendGroup.forEach((item: any) => {
    if (item.label === key || (item.code && item.code === key)) {
      if (item.selected) {
        item.selected = false;
      }
      selectLegend(item);
    } else {
      if (item.childen && item.childen.length > 0) {
        item.childen.forEach((child: any) => {
          if (child.label === key || (child.code && child.code === key)) {
            //先关闭在选中
            if (item.selected) {
              selectLegend(item);
              setTimeout(() => {
                selectLegend(item);
                selectLegend(child);
              }, 200);
            } else {
              selectLegend(item);
              selectLegend(child);
            }
          }
        });
      }
    }
  });
};

/**页面关闭 */
const closePage = () => {
  state.legendGroup.forEach((item: any) => {
    if (item.childen && item.childen.length > 0) {
      item.childen.forEach((child: any) => {});
    }
  });
  //移除联动数据
  storeLegendInfo.setSelectLegendType(null);
};

/**监听服务图例数据变化 */
watch(
  () => serverLegend.value,
  (a, b) => {
    initData();
  },
  {
    deep: true,
  }
);
/**监听按钮联动变化 */
watch(
  () => selectLegendType.value,
  (a, b) => {
    selectLegendItem(a);
  },
  {
    deep: true,
  }
);

onMounted(() => {
  initData();
});

onUnmounted(() => {
  closePage();
});
</script>
<style scoped>
.server-legends {
  position: fixed;
  bottom: 62px;
  left: 62px;
}
.child-legend-content {
  position: fixed;
  display: flex;
  bottom: 62px;
  left: 490px;
}
.server-legends-content {
  padding: 35px;
  background: rgba(6, 43, 64, 0.4);
}
.legend-item-icon {
  width: 94px;
  font-size: 48px;
}
.legend-item-icon-select {
  width: 94px !important;
  height: 63px !important;
}
.legend-item-line {
  width: 49px;
  height: 14px;
  margin: 0 16px;
  border-radius: 0px 0px 0px 0px;
  opacity: 0.9;
}
.legend-item-label {
  padding: 0 52px 0 0;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 500;
  font-size: 37px;
  color: rgba(255, 255, 255, 0.81);
  line-height: 78px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.legend-item-checkbox {
  width: 53px;
  height: 53px;
  border-radius: 0px 0px 0px 0px;
  border: 2px solid #ffffff;
  display: flex;
  justify-content: center;
}
.checkbox-icon {
  font-size: 45px;
  color: #24baff;
}

.legend-child {
  float: left;
  margin-left: 30px;
}
.legend-child-content {
  padding: 35px;
  background: rgba(6, 43, 64, 0.4);
}
</style>
