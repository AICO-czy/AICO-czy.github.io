<!--cesium地图视图-->
<template>
  <div class="map-viewer">
    <vc-viewer ref="vcViewerRef" :animation="false" :timeline="false" :fullscreenButton="false" :info-box="false" :selectionIndicator="false" @ready="onViewerReady">
    </vc-viewer>
  </div>
</template>
<script setup lang="ts" name="mapViewer">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useThemeConfig } from "src/stores/themeConfig";
import { otherInfo } from "stores/otherInfo";
import { storeToRefs } from "pinia";
import { VcReadyObject } from "vue-cesium/es/utils/types";
import { elRectification, offelRectification } from "src/utils/autofit";
import { getToken } from "src/utils/authToken";
import { flyToCamera } from "vue-cesium/es/utils/cesium-helpers";
import proj4 from "proj4";

const vcViewerRef = ref();

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

const storesOtherInfo = otherInfo();
const { dataConfig } = storeToRefs(storesOtherInfo);

let viewer: any = null;

/**初始化 */
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
  if (dataConfig.value !== null) {
    if (dataConfig.value.IserverUserName && dataConfig.value.IserverPassword) {
      var token = await getToken(
        dataConfig.value.Agency,
        dataConfig.value.IserverUserName,
        dataConfig.value.IserverPassword
      );
      if (token) {
        // 加载图层
        loadScene(Cesium, viewer, token);
      }
    } else {
      //console.log("获取iserver登录数据失败");
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

  // 添加地形
  //addDem(scene, Cesium);
  // 添加影像
  //addDom(scene, Cesium);
  // 添加路网背景
  addBaseMap(Cesium, viewer);
  // 添加承德市边界
  //addArea(Cesium, viewer);
  // 添加承德市遮罩
  //addAreaMask(Cesium, viewer);
  // 添加基础路网
  addRoad(Cesium, viewer);
  // 定位至初始视角
  // lng:104.680251, lat:23.665595, z: 650000
  flyToCamera(viewer, {}, dataConfig.value.StartPos);
  // 开始加载模型图层
  // addModels(Cesium, viewer);
  viewer.pickEvent.addEventListener((feature: any) => {
    var modelName = feature.MODELNAME ? feature.MODELNAME : feature.模型名称;
  });
};

/**加载地形 */
const addDem = (scene: any, Cesium: any) => {
  if (dataConfig.value.TerrainUrl) {
    scene.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: dataConfig.value.IserverHost + dataConfig.value.TerrainUrl,
      subdomains: dataConfig.value.Subdomains,
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
  if (dataConfig.value.ImageUrls) {
    dataConfig.value.ImageUrls.forEach((image: any) => {
      var provider = scene.imageryLayers.addImageryProvider(
        new Cesium.SuperMapImageryProvider({
          url: dataConfig.value.IserverHost + image,
          subdomains: dataConfig.value.Subdomains,
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
    url: dataConfig.value.VectorUrl,
    layer: dataConfig.value.BGLayerName,
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataConfig.value.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};

const addArea = (Cesium: any, viewer: any) => {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: dataConfig.value.VectorUrl,
    layer: "cdsyzt:cdsxzqh",
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataConfig.value.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};

const addAreaMask = (Cesium: any, viewer: any) => {
  var provider = new Cesium.WebMapTileServiceImageryProvider({
    url: dataConfig.value.VectorUrl,
    layer: "cdsyzt:cds",
    format: "image/png",
    style: "",
    tilingScheme: new Cesium.GeographicTilingScheme(), //应于EPSG:4326切片方案，是一个简单的地理投影方案
    tileMatrixSetID: "EPSG:4326",
    tileMatrixLabels: dataConfig.value.MatrixIds,
  });
  viewer.scene.imageryLayers.addImageryProvider(provider);
};

const addRoad = (Cesium: any, viewer: any) => {
  dataConfig.value.LWLayerNames.forEach((layerName: any) => {
    var provider = viewer.scene.imageryLayers.addImageryProvider(
      new Cesium.WebMapServiceImageryProvider({
        layers: layerName,
        url: dataConfig.value.LWUrl,
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

onMounted(() => {
  elRectification(".map-viewer");
  vcViewerRef.value.creatingPromise.then(async (readyObj: VcReadyObject) => {
    //获取iserverToken
    await getAuthToken(readyObj.Cesium, readyObj.viewer);
  });
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
 /*  position: absolute; */
}
</style>
