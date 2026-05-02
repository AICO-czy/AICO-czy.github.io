<!--地图视图-->
<template>
  <div class="map-viewer">
    <vc-viewer ref="vcViewerRef" :animation="false" :timeline="false" :fullscreenButton="false" :info-box="false"
      :selectionIndicator="false" @ready="onViewerReady">
    </vc-viewer>
    <q-inner-loading :showing="state.loading" class="loading-view">
      <q-spinner-ios class="loading-icon" />
      <div class="loading-label">场景加载中</div>
    </q-inner-loading>
  </div>
</template>
<script setup lang="ts" name="mapViewer">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";
import { VcReadyObject } from "vue-cesium/es/utils/types";
import { elRectification, offelRectification } from "src/utils/autofit";
import { getToken } from "src/utils/authToken";
import { flyToCamera } from "vue-cesium/es/utils/cesium-helpers";
//数据服务配置
import dataServer from "../../public/data/json/dataConfig.json";
import proj4 from "proj4";

const state = reactive({
  loading: false,
});

const vcViewerRef = ref();

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

const emit = defineEmits(["isLoading"]);

let viewer: any = null;

/**页面初始化 */
const initMap = () => {
  state.loading = true;
  elRectification(".map-viewer");
  vcViewerRef.value.creatingPromise.then(async (readyObj: VcReadyObject) => {
    //获取iserverToken
    await getAuthToken(readyObj.Cesium, readyObj.viewer);
  });
};

/**初始化地图 */
const onViewerReady = (readyObj: VcReadyObject) => {
  const Cesium = readyObj.Cesium;
  viewer = readyObj.viewer;
  const scene = viewer.scene;
  // 移除底图
  viewer.imageryLayers.removeAll();
  // 锁帧
  viewer.targetFrameRate = 60;
  viewer.maximumRenderTimeChange = Infinity;
  // 保真效果
  viewer.resolutionScale = 1 / themeConfig.value.currScale;
  // 开启抗锯齿//是否开启抗锯齿
  viewer.scene.fxaa = true;
  viewer.scene.postProcessStages.fxaa.enabled = true;
  // 请求渲染模式
  // viewer.scene.requestRenderMode = true;
  // viewer.scene.requestRender();
  //地球背景色
  scene.globe.baseColor = Cesium.Color.fromAlpha(
    Cesium.Color.fromCssColorString("#081452"),
    0.3
  );
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  //切换2D视图
  scene.morphTo2D(0);
  //添加geojson CGCS2000坐标系
  Cesium.GeoJsonDataSource.crsNames["urn:ogc:def:crs:EPSG::4490"] =
    Cesium.GeoJsonDataSource.crsNames["EPSG:4490"] = (coordinates: any) => {
      const fromProjection = `GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]`;
      const toProjection = `GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]`;
      const x = coordinates[0];
      const y = coordinates[1];
      const newCoordinates = proj4(fromProjection, toProjection, [x, y]);
      return Cesium.Cartesian3.fromDegrees(
        newCoordinates[0],
        newCoordinates[1],
        0
      );
    };
};

/**登录iserver */
const getAuthToken = async (Cesium: any, viewer: any) => {
  if (dataServer !== null) {
    if (dataServer.IserverUserName && dataServer.IserverPassword) {
      var token = await getToken(
        dataServer.Agency,
        dataServer.IserverUserName,
        dataServer.IserverPassword
      );
      if (token) {
        // 加载图层
        loadScene(Cesium, viewer, token);
      }
    } else {
      // console.log("获取iserver登录数据失败");
      loadScene(Cesium, viewer, null);
    }
  } else {
    console.log("获取配置数据失败");
  }
};

/**加载场景 */
const loadScene = (Cesium: any, viewer: any, token: any) => {
  const scene = viewer.scene;
  if (token) {
    Cesium.Credential.CREDENTIAL = new Cesium.Credential(token);
  }

  //场景初始化完成
  //场景初始化完成
  emit("isLoading");
  state.loading = false;
  // 添加地形
  //addDem(scene, Cesium);
  // 添加影像
  //addDom(scene, Cesium);
  // 添加路网背景
  addBaseMap(Cesium, viewer);
  // 添加承德市行政区划
  //addArea(Cesium, viewer);
  // 添加承德市遮罩
  //addAreaMask(Cesium, viewer);
  // 添加基础路网
  addRoad(Cesium, viewer);
  // 定位至初始视角
  flyToCamera(viewer, {}, dataServer.StartPos);
  // 开始加载模型图层
  // addModels(Cesium, viewer);
  //getCamerInfo(scene,Cesium);
  viewer.pickEvent.addEventListener((feature: any) => {
    var modelName = feature.MODELNAME ? feature.MODELNAME : feature.模型名称;
  });
};

/**加载地形 */
const addDem = (scene: any, Cesium: any) => {
  if (dataServer.TerrainUrl) {
    scene.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: dataServer.IserverHost + dataServer.TerrainUrl,
      subdomains: dataServer.Subdomains,
      invisibility: true,
      isSct: true,
      isCreateSkirt: false,
    });
    // 隐藏地形
    // viewer.scene.terrainProvider.visible = false;
  } else {
    console.log("未读取到地形地址！");
  }
};

/**加载影像 */
const addDom = (scene: any, Cesium: any) => {
  if (dataServer.ImageUrls) {
    dataServer.ImageUrls.forEach((image: any) => {
      var provider = scene.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: dataServer.IserverHost + image,
          subdomains: dataServer.Subdomains,
          show: false,
        })
      );
      provider.show = false;
    });
  } else {
    console.log("未读取到影像地址！");
  }
};
/**添加地图背景 */
const addBaseMap = (Cesium: any, viewer: any) => {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: dataServer.VectorUrl,
    layer: dataServer.BGLayerName,
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataServer.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};
/**加载行政区 */
const addArea = (Cesium: any, viewer: any) => {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: dataServer.VectorUrl,
    layer: "cdsyzt:cdsxzqh",
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataServer.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};
/**加载标注 */
const addAreaMask = (Cesium: any, viewer: any) => {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: dataServer.VectorUrl,
    layer: "cdsyzt:cds",
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataServer.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};
/**添加路网 */
const addRoad = (Cesium: any, viewer: any) => {
  dataServer.LWLayerNames.forEach((layerName: any) => {
    var provider = viewer.scene.imageryLayers.addImageryProvider(
      new Cesium.WebMapServiceImageryProvider({
        layers: layerName,
        url: dataServer.LWUrl,
        parameters: {
          tiled: true,
          transparent: true, //是否透明
          format: "image/png",
          srs: "EPSG:4326",
          exceptions: "application/vnd.ogc.se_inimage",
          styles: "",
        },
        enablePickFeatures: true,
      })
    );
    provider["name"] = layerName;
    provider.show = false;
  });
};
//获取相机视角信息
const getCamerInfo = (scene: any, Cesium: any) => {
  var handler2 = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  // eslint-disable-next-line no-unused-vars
  handler2.setInputAction(function (movement: any) {
    console.log(
      "相机视角笛卡尔坐标：" +
      scene.camera.position.x +
      "," +
      scene.camera.position.y +
      "," +
      scene.camera.position.z
    ); //相机XYZ
    console.log(
      "换行输出：" +
      "\n" +
      "heading:" +
      scene.camera.heading +
      "," +
      "\n" +
      "pitch:" +
      scene.camera.pitch +
      "," +
      "\n" +
      "roll:" +
      scene.camera.roll
    );
    //转经纬度输出
    let my_cartesian3 = new Cesium.Cartesian3();
    my_cartesian3.x = scene.camera.position.x;
    my_cartesian3.y = scene.camera.position.y;
    my_cartesian3.z = scene.camera.position.z;
    let ellipsoid = scene.globe.ellipsoid; //可定义为全局变量
    let cartographic = ellipsoid.cartesianToCartographic(my_cartesian3);
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    let lng = Cesium.Math.toDegrees(cartographic.longitude);
    let alt = cartographic.height;
    console.log(
      "相机视角的经度、纬度和高程：" +
      "\n" +
      lng +
      "," +
      lat +
      "," +
      alt +
      "\n" +
      "\n"
    );
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};

onMounted(() => {
  initMap();
});

// 卸载之前先将地图视图的宽高设为0
onBeforeUnmount(() => {
  offelRectification();
});
</script>
<style scoped>
.map-viewer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: absolute;
}

.loading-view {
  background: #0009 !important;
}

.loading-icon {
  font-size: 45px;
  color: #3cc8c3;
}

.loading-label {
  padding-top: 10px;
  font-size: 25px;
  letter-spacing: 1px;
  color: #3cc8c3;
}
</style>
