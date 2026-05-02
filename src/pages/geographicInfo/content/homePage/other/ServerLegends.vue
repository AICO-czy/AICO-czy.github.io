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
              <q-icon name="check" class="checkbox-icon" v-if="legend.selected"></q-icon>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!--子图例列表-->
  <div class="child-legend-content">
    <template v-for="(legend, index) in state.legendGroup" :key="index">
      <template v-if="legend.childen && legend.childen.length > 0 && legend.selected">
        <div class="column justify-end legend-child">
          <div class="legend-child-content">
            <template v-for="(child, index) in legend.childen" :key="index">
              <div class="row items-center legend-item" @click="selectLegend(child)">
                <div class="col-auto">
                  <template v-if="child.icon">
                    <q-icon :name="child.selectIcon" class="legend-item-icon-select"
                      v-if="child.selected && child.selectIcon"></q-icon>
                    <q-icon :name="child.icon" class="legend-item-icon" v-else></q-icon>
                  </template>
                  <div class="legend-item-line" :style="`background:${child.color}`" v-else></div>
                </div>
                <div class="col">
                  <div class="legend-item-label">{{ child.label }}</div>
                </div>
                <div class="col-auto">
                  <div class="legend-item-checkbox">
                    <q-icon name="check" class="checkbox-icon" v-if="child.selected"></q-icon>
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
import { useVueCesium } from "vue-cesium";
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";
import { get } from "src/utils/httpRequest";
// import TooltipBubble from "src/assets/api/method/bubble/tooltipBubble.js";
const state = reactive({
  legendGroup: [] as any,
  pickhandler: null as any,
});

// 获取Cesium和viewer对象
const { Cesium, viewer } = useVueCesium();
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
            createPoi(datas);
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
        createPoi(datas);
      }
    }
  });
};

/**图例选中事件 */
const selectLegend = (legend: any) => {
  //子项只能展示一个，避免超出
  /*   if (legend.childen && legend.childen.length > 0) {
    var findData = state.legendGroup.filter(
      (x: any) => x.childen && x.childen.length > 0 && x.selected
    );
    if (findData.length > 0) {
      findData.forEach((item: any) => {
        if (legend.label !== item.label) {
          item.selected = false;
          if (item.label === "公路路网" || item.layerName) {
            setLayerShowOrHideen(item);
          } else {
            setPoiShowOrHideen(item);
          }
        }
      });
    }
  } */
  legend.selected = !legend.selected;
  //基础路网
  if (legend.label === "公路路网" || legend.layerName) {
    setLayerShowOrHideen(legend);
  } else {
    setPoiShowOrHideen(legend);
  }
};

/**创建撒点 */
const createPoi = (datas: any) => {
  if (!billboardsData) {
    billboardsData = viewer.scene.primitives.add(
      new Cesium.BillboardCollection({ scene: viewer.scene })
    );
  }
  datas.forEach((item: any, index: number) => {
    if (item.x && item.y) {
      item["id"] = `${item.type}_${index}`;
      item["tooltipType"] = item.type;
      var position = Cesium.Cartesian3.fromDegrees(
        Number(item.x),
        Number(item.y),
        0
      );
      billboardsData.add({
        id: item.id,
        show: false,
        mapName: item,
        position: position,
        image: item.img,
        width: 30,
        height: 30,
        scale: themeConfig.value.currScale,
        heightReference: Cesium.HeightReference.NONE,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      });
    }
  });
};

/**设置图层显隐 */
const setLayerShowOrHideen = (legend: any) => {
  //判断是否选中一级图例
  if (legend.childen && legend.childen.length > 0) {
    legend.childen.forEach((item: any) => {
      var layer = viewer.scene.imageryLayers._layers.find(
        (x: any) =>
          (x._imageryProvider._layer &&
            x._imageryProvider._layer == item.layerName) ||
          (x._imageryProvider._layers &&
            x._imageryProvider._layers == item.layerName)
      );
      if (!legend.selected) {
        item.selected = legend.selected;
        if (layer) {
          layer.show = legend.selected;
        }
      }
    });
  } else {
    var layer = viewer.scene.imageryLayers._layers.find(
      (x: any) =>
        (x._imageryProvider._layer &&
          x._imageryProvider._layer == legend.layerName) ||
        (x._imageryProvider._layers &&
          x._imageryProvider._layers == legend.layerName)
    );
    if (layer) {
      layer.show = legend.selected;
    }
  }
};
/**设置撒点显隐 */
const setPoiShowOrHideen = (legend: any) => {
  if (legend.childen && legend.childen.length > 0) {
    legend.childen.forEach((item: any) => {
      if (!legend.selected) {
        item.selected = legend.selected;
        var findBillboards = billboardsData._billboards.filter(
          (x: any) => x._mapName.type === item.code
        );
        if (findBillboards.length > 0) {
          findBillboards.forEach((billboard: any) => {
            billboard.show = legend.selected;
          });
        }
      }
    });
  } else {
    var findBillboards = billboardsData._billboards.filter(
      (x: any) => x._mapName.type === legend.code
    );
    if (findBillboards.length > 0) {
      findBillboards.forEach((billboard: any) => {
        billboard.show = legend.selected;
      });
    }
  }
};

/**撒点点击事件 */
const addPoiClickEvent = () => {
  state.pickhandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  state.pickhandler.setInputAction(function (evt: any) {
    const pick = viewer.scene.pick(evt.position);
    if (pick) {
      if (pick.primitive._mapName) {
        //服务撒点点击事件
        if (!pick.primitive._mapName.legendType) {
          if (pick.primitive._mapName.x && pick.primitive._mapName.y) {
            var position = pick.primitive._actualClampedPosition
              ? pick.primitive._actualClampedPosition
              : pick.primitive._position;
            if (!position) {
              position = getposition(evt.position, true);
            }
            // createTooltip(pick.primitive._mapName, position);
          }
        }
      }
    } else {
      var position = getposition(evt.position, true);
      var data = {
        id: "路线",
        tooltipType: "roadInfo-geographicInfo",
        data: "测试数据",
      };
      // createTooltip(data, position);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

/**创建弹框信息*/
const createTooltip = (data: any, position: any) => {
  //移除弹框信息（每次只显示一个）
  if (bubbles.length > 0) {
    bubbles.forEach((item: any) => {
      item.bubbleClose();
    });
    bubbles = [];
  }
  var dom = document.getElementById(data.id);
  if (!dom) {
    var tooltipData = {
      id: data.id,
      data: data,
      position: JSON.parse(JSON.stringify(position)),
    };
    var bubble1 = new TooltipBubble(tooltipData, viewer, Cesium);
    bubbles.push(bubble1);
  } else {
    var bubble2 = bubbles.find((x: any) => x.id === data.id);
    if (bubble2) {
      bubble2.refreshPosition(position);
    }
  }
};

/**获取鼠标点击位置的坐标点*/
const getposition = (evtPosition: any, isCartesian: any) => {
  var ray = viewer.camera.getPickRay(evtPosition) as any;
  var cartesian = viewer.scene.globe.pick(ray, viewer.scene) as any;
  if (!cartesian) {
    cartesian = viewer.scene.camera.pickEllipsoid(
      evtPosition,
      viewer.scene.globe.ellipsoid
    );
  }
  if (!isCartesian) {
    let ellipsoid = viewer.scene.globe.ellipsoid; //可定义为全局变量
    let cartographic = ellipsoid.cartesianToCartographic(cartesian);
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    let lng = Cesium.Math.toDegrees(cartographic.longitude);
    cartesian = { lon: lng, lat: lat, height: cartographic.height };
  }
  return cartesian;
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
    .catch((err) => { });
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
      item.childen.forEach((child: any) => {
        if (child.layerName) {
          //关闭所有图层
          var layer = viewer.scene.imageryLayers._layers.find(
            (x: any) =>
              (x._imageryProvider._layer &&
                x._imageryProvider._layer == child.layerName) ||
              (x._imageryProvider._layers &&
                x._imageryProvider._layers == child.layerName)
          );
          if (layer) {
            layer.show = false;
          }
        } else {
          //关闭所有撒点
          if (billboardsData) {
            billboardsData.removeAll();
            viewer.scene.primitives.remove(billboardsData);
            billboardsData = null;
          }
        }
      });
    }
  });
  //移除弹框信息
  if (bubbles.length > 0) {
    bubbles.forEach((item: any) => {
      item.bubbleClose();
    });
    //storesOtherInfo.setTrafficDetail(null);
    bubbles = [];
  }
  //移除点击事件
  if (state.pickhandler) {
    state.pickhandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  //移除图例数据
  /* storeLegendInfo.setServerLegend(null); */
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
  addPoiClickEvent();
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
