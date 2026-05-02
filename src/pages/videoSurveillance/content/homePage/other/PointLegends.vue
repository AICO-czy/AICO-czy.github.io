<!--撒点图例-->
<template>
  <div class="point-legends" v-if="state.legendGroup && state.legendGroup.length > 0">
    <!--图例列表-->
    <div class="point-legends-content">
      <template v-for="(legend, index) in state.legendGroup" :key="index">
        <div class="row items-center" @click="selectLegend(legend)">
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

</template>
<script setup lang="ts" name="PointLegends">
import { reactive, onMounted, onUnmounted, watch } from "vue";
import { useVueCesium } from "vue-cesium";
/* import CreateMaterial from "src/assets/api/material/createMaterial"; */
import { useThemeConfig } from "src/stores/themeConfig";
import { legendInfo } from "stores/legendInfo";
import { storeToRefs } from "pinia";
// import TooltipBubble from "src/assets/api/method/bubble/tooltipBubble.js";

const state = reactive({
  legendGroup: [] as any,
  pickhandler: null as any,
});

const storeLegendInfo = legendInfo();
const { pointLegend } = storeToRefs(storeLegendInfo);

// 获取Cesium和viewer对象
const { Cesium, viewer } = useVueCesium();

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

//撒点数据
var billboardsData = null as any;
//弹框
var bubbles = [] as any;

/**初始化数据 */
const initData = () => {
  removePoi();
  removeBubble();
  if (pointLegend.value) {
    state.legendGroup = JSON.parse(JSON.stringify(pointLegend.value));
  } else {
    state.legendGroup = [];
  }
  // createPoi();
};

const selectLegend = (legend: any) => {
  legend.selected = !legend.selected;
  var findBillboards = billboardsData._billboards.filter(
    (x: any) => x._mapName.code === legend.code
  );
  if (findBillboards.length > 0) {
    findBillboards.forEach((billboard: any) => {
      billboard.show = legend.selected;
    });
  }
};

/**创建撒点 */
const createPoi = () => {
  if (!billboardsData) {
    billboardsData = viewer.scene.primitives.add(
      new Cesium.BillboardCollection({ scene: viewer.scene })
    );
  }
  state.legendGroup.forEach((item: any) => {
    if (item.data && item.data.length > 0) {
      item.data.forEach((child: any, index: number) => {
        var id = child.id ? child.id : `${child.code}_${index}`;
        if (child.x && child.y) {
          child["id"] = id.toString();
          child["tooltipType"] = child.code;
          child["legendType"] = "pointLegend";
          var position = Cesium.Cartesian3.fromDegrees(
            Number(child.x),
            Number(child.y),
            0
          );

          billboardsData.add({
            id: id,
            show: item.selected,
            mapName: child,
            position: position,
            image: item.poiImg,
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
    }
  });
};

/**撒点点击事件 */
const addPoiClickEvent = () => {
  state.pickhandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  state.pickhandler.setInputAction(function (evt: any) {
    const pick = viewer.scene.pick(evt.position);
    if (pick) {
      if (pick.primitive._mapName) {
        //撒点图例点击事件
        if (pick.primitive._mapName.legendType === "pointLegend") {
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
    var bubble2 = bubbles.find((x: any) => x.id === data.carNumColor);
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

/**关闭所有撒点 */
const removePoi = () => {
  if (billboardsData) {
    billboardsData.removeAll();
    viewer.scene.primitives.remove(billboardsData);
    billboardsData = null;
  }
};
/**移除所有弹框 */
const removeBubble = () => {
  if (bubbles.length > 0) {
    bubbles.forEach((item: any) => {
      item.bubbleClose();
    });
    bubbles = [];
  }
};

const closePage = () => {
  removePoi();
  //清除撒点图例
  storeLegendInfo.setPointLegend(null);
  //移除弹框信息
  removeBubble();

  //移除点击事件
  if (state.pickhandler) {
    state.pickhandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
};

/**监听撒点图例数据变化 */
watch(
  () => pointLegend.value,
  (a, b) => {
    initData();
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
.point-legends {
  position: fixed;
  bottom: 119px;
  right: 1927px;
}

.point-legends-content {
  padding: 35px;
}

.legend-item-icon {
  font-size: 51px;
}

.legend-item-line {
  width: 49px;
  height: 14px;
  border-radius: 0px 0px 0px 0px;
  opacity: 0.9;
}

.legend-item-label {
  padding: 0 34px;
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
</style>
