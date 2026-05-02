<template>
  <div class="three-map-view">
    <div class="three-map-content" id="three3DMap"></div>
  </div>

</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import { elRectification, offelRectification } from "src/utils/autofit";
import { useThemeConfig } from "src/stores/themeConfig";
import { storeToRefs } from "pinia";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject, } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import * as d3 from "d3";

const state = reactive({
  width: 0,
  height: 0,
})

const storeThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storeThemeConfig);

//全局变量
var scene = null;
var camera = null;
var renderer = null;
var labelRenderer = null;
var controls = null;

/**初始化地图 */
const initMap = () => {
  computeSize();
  //创建场景
  scene = new THREE.Scene();
  //设置环境光照
  initAmbientLight();
  //创建相机
  initCamera();
  //创建渲染器
  initWebGLRenderer();
  //创建文字渲染器
  initLabelRenderer();
  //创建控制器
  initControls();
  //动画
  animate();
  //监听页面大小变化
  listenerResize();
  //加载地图数据
  loadMapData();
}
/**初始环境光 */
const initAmbientLight = () => {
  const ambientLight = new THREE.AmbientLight(0xd4e7fd, 4);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xe8eaeb, 0.2);
  directionalLight.position.set(0, 10, 5);
  const directionalLight2 = directionalLight.clone();
  directionalLight2.position.set(0, 10, -5);
  const directionalLight3 = directionalLight.clone();
  directionalLight3.position.set(5, 10, 0);
  const directionalLight4 = directionalLight.clone();
  directionalLight4.position.set(-5, 10, 0);
  scene.add(directionalLight);
  scene.add(directionalLight2);
  scene.add(directionalLight3);
  scene.add(directionalLight4);
}
/**初始化相机 */
const initCamera = () => {
  camera = new THREE.PerspectiveCamera(
    75,
    state.width / state.height,
    0.1,
    1000
  );
  camera.position.y = 7;
  camera.position.z = 0;
}
/**初始化渲染器 */
const initWebGLRenderer = () => {
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(0x000000, 0.0);
  renderer.setSize(state.width, state.height);
  document.getElementById("three3DMap").appendChild(renderer.domElement);
}
/**初始化文字渲染器 */
const initLabelRenderer = () => {
  labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  labelRenderer.setSize(state.width, state.height);
  document.getElementById("three3DMap").appendChild(labelRenderer.domElement);
}
/**初始化控制器 */
const initControls = () => {
  controls = new OrbitControls(camera, renderer.domElement);
  //禁用平移
  controls.enablePan = false;
  controls.update();
}
/**循环渲染帧 */
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
};
/**加载地图数据 */
const loadMapData = () => {
  const url = "data/geojson/mapGeojson.geojson";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const map = createMap(data);
      scene.add(map);
      //添加点击事件
      listenerClickEvent(map);
      //鼠标移动事件
      listenerMoveEvent(map);
      //createUV(map);
    });
}
/**创建3D地图 */
const createMap = (data) => {
  const map = new THREE.Object3D();
  const center = data.features[0].properties.centroid;
  const offsetXY = d3.geoMercator();
  offsetXY.center(center).translate([0, 0]);
  data.features.forEach((feature) => {
    const unit = new THREE.Object3D();
    const { centroid, center, name } = feature.properties;
    const { coordinates, type } = feature.geometry;
    const point = centroid || center || [0, 0];

    const color = new THREE.Color(`hsl(
      ${233},
      ${20}%,
      ${55}%)`).getHex();
    const depth = 0.2;

    const label = createLabel(name, point, depth);
    const icon = createIcon(center, depth);

    coordinates.forEach((coordinate) => {
      if (type === "MultiPolygon") coordinate.forEach((item) => fn(item));
      if (type === "Polygon") fn(coordinate);

      function fn(coordinate) {
        unit.name = name;
        const mesh = createMesh(coordinate, color, depth);
        const line = createLine(coordinate, depth);
        unit.add(mesh, ...line);
        // const img = creatImg(coordinate, depth);
        // unit.add(mesh, img, ...line);
      }
    });
    map.add(unit, label, icon);
    // creatBg();
    setCenter(map);
  });
  return map;
};
/**创建网格 */
const createMesh = (data, color, depth) => {
  const offsetXY = d3.geoMercator();
  const shape = new THREE.Shape();
  data.forEach((item, idx) => {
    const [x, y] = offsetXY(item);

    if (idx === 0) shape.moveTo(x, -y);
    else shape.lineTo(x, -y);
  });

  const extrudeSettings = {
    depth: depth,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  const materialSettings = {
    color: color,
    emissive: 0x000000,
    roughness: 0.45,
    metalness: 0.8,
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 0.5
  };

  const material = new THREE.MeshStandardMaterial(materialSettings);

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};
/**创建贴图 */
const creatImg = (data, depth) => {
  const offsetXY = d3.geoMercator();
  const shape = new THREE.Shape();
  data.forEach((item, idx) => {
    const [x, y] = offsetXY(item);
    if (idx === 0) shape.moveTo(x, -y);
    else shape.lineTo(x, -y);
  });

  const extrudeSettings = {
    depth: depth,
    bevelEnabled: false,
  };
  const mapTexture = new THREE.TextureLoader().load("src/assets/image/地图贴图.png");
  mapTexture.ratation = Math.PI;
  mapTexture.wrapS = THREE.RepeatWrapping;
  mapTexture.wrapT = THREE.RepeatWrapping;
  mapTexture.repeat.set(1, 1);
  mapTexture.needsUpdate = true;

  const materialSettings = {
    map: mapTexture,
    transparent: true
  };
  const material = new THREE.MeshBasicMaterial(materialSettings);
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}
/**创建贴图 */
const creatBg = () => {
  const mapTexture = new THREE.TextureLoader().load("src/assets/image/cdsgl/地图贴图.png");
  mapTexture.ratation = Math.PI;
  mapTexture.wrapS = THREE.RepeatWrapping;
  mapTexture.wrapT = THREE.RepeatWrapping;
  mapTexture.repeat.set(1, 1);
  mapTexture.needsUpdate = true;

  const materialSettings = {
    map: mapTexture,
    transparent: true
  };
  const material = new THREE.MeshBasicMaterial(materialSettings);
  const geometry = new THREE.PlaneGeometry(20, 20);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
/**创建UV贴图 */
const createUV = (map) => {
  const texture = new THREE.TextureLoader().load("src/assets/image/cdsgl/地图贴图.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  const box = new THREE.Box3()
  box.setFromObject(scene)
  const size = new THREE.Vector3()
  box.getSize(size)
  texture.repeat.set(1 / size.x, 1 / size.y)
  texture.offset.set(Math.abs(box.min.x / size.x), Math.abs(box.min.y / size.y))
}
/**创建描边线 */
const createLine = (data, depth) => {
  const points = [];
  const offsetXY = d3.geoMercator();
  data.forEach((item) => {
    const [x, y] = offsetXY(item);
    points.push(new THREE.Vector3(x, -y, 0));
  });

  const lineGeometry = new LineGeometry();
  lineGeometry.setFromPoints(points)

  // 地图上面的线
  const uplineMaterial = new LineMaterial({ color: 0xffffff, linewidth: 2 })
  // 地图下面的线
  //const downlineMaterial = new LineMaterial({ color: 0xffffff, linewidth: 1 })

  const upLine = new Line2(lineGeometry, uplineMaterial);
  //const downLine = new Line2(lineGeometry, downlineMaterial);
  upLine.position.z = depth + 0.001;
  //downLine.position.z = 0;
  return [upLine];
};
/**创建文字标注 */
const createLabel = (name, point, depth) => {
  var size = 45 * themeConfig.value.currScale;
  const offsetXY = d3.geoMercator();
  const div = document.createElement("div");
  div.style.color = "#fff";
  div.style.fontSize = `${size}px`;
  div.style.textShadow = "1px 1px 2px #047cd6";
  div.textContent = name;
  const label = new CSS2DObject(div);
  label.scale.set(0.01, 0.01, 0.01);
  const [x, y] = offsetXY(point);
  label.position.set(x, -y, depth + 0.001);
  return label;
};
/**创建图标撒点 */
const createIcon = (point, depth) => {
  const offsetXY = d3.geoMercator();
  const url = new URL("../../public/icons/trafficTravel/point.png", import.meta.url).href;
  const map = new THREE.TextureLoader().load(url);
  const material = new THREE.SpriteMaterial({
    map: map,
    transparent: true,
  });
  const sprite = new THREE.Sprite(material);
  const [x, y] = offsetXY(point);
  sprite.scale.set(0.2, 0.2, 0.2);

  sprite.position.set(x, -y, depth + 0.2);
  sprite.renderOrder = 1;

  return sprite;
};

/**添加鼠标点击事件 */
const listenerClickEvent = (map) => {
  let intersect = null;
  window.addEventListener("click", (event) => {
    console.log("鼠标点击")
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let getBoundingClientRect = document.getElementById("three3DMap").getBoundingClientRect();
    mouse.x = ((event.clientX - getBoundingClientRect.left) / state.width) * 2 - 1;
    mouse.y = -((event.clientY - getBoundingClientRect.top) / state.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster
      .intersectObjects(map.children);
    if (intersects && intersects.length > 0) {
      //点击地图
      if (intersects[0].object.type === "Mesh") {
        if (intersect) {
          setAplha(intersect, 0.5);
          intersect = intersects[0].object.parent;
          setAplha(intersect, 1);
        } else {
          intersect = intersects[0].object.parent;
          setAplha(intersect, 1);
        }
      } else if (intersects[0].object.type === "Sprite") {
        //点击撒点
        console.log(intersects[0].object);
      } else {
        if (intersect) {
          setAplha(intersect, 0.5);
          intersect = null;
        }
      }
    } else {
      if (intersect) {
        setAplha(intersect, 0.5);
        intersect = null;
      }
    }
    function setAplha(intersect, opacity) {
      intersect.children.forEach((item) => {
        if (item.type === "Mesh") {
          item.material.opacity = opacity;
        }
      });
    }
  });
}
/**添加鼠标移动事件 */
const listenerMoveEvent = (map) => {
  let intersect = null;
  window.addEventListener("mousemove", (event) => {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let getBoundingClientRect = document.getElementById("three3DMap").getBoundingClientRect();
    mouse.x = ((event.clientX - getBoundingClientRect.left) / state.width) * 2 - 1;
    mouse.y = -((event.clientY - getBoundingClientRect.top) / state.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(map.children, true);
    if (intersects && intersects.length > 0) {
      //鼠标在地图上划过
      if (intersects[0].object.type === "Mesh") {
        if (intersect) {
          setHeight(intersect, -0.02);
          intersect = intersects[0];
          setHeight(intersect, 0.02);
        } else {
          intersect = intersects[0];
          setHeight(intersect, 0.02);
        }
      } else {
        if (intersect) {
          setHeight(intersect, -0.02);
          intersect = null;
        }
      }
    } else {
      if (intersect) {
        setHeight(intersect, -0.02);
        intersect = null;
      }
    }
    function setHeight(intersect, height) {
      intersect.object.position.z += height;
    }
  });
}
/**设置中心点 */
const setCenter = (map) => {
  map.rotation.x = -Math.PI / 2;
  const box = new THREE.Box3().setFromObject(map);
  const center = box.getCenter(new THREE.Vector3());

  const offset = [0, 0];
  map.position.x = map.position.x - center.x - offset[0];
  map.position.z = map.position.z - center.z - offset[1];
};
/**计算画布大小 */
const computeSize = () => {
  state.width = window.innerWidth;
  state.height = window.innerHeight;
}
/**监听页面大小变化 */
const listenerResize = () => {
  window.addEventListener("resize", () => {
    refreshSize();
    renderer.setSize(state.width, state.height);
    labelRenderer.setSize(state.width, state.height);
    camera.aspect = state.width / state.height;
    camera.updateProjectionMatrix();
  });
}
onMounted(() => {
  elRectification(".three-map-view");
  initMap();
});
onUnmounted(() => {
  offelRectification();
  //移除监听事件
  window.removeEventListener('resize', () => { });
  window.removeEventListener('click', () => { });
  window.removeEventListener('mousemove', () => { });
})

</script>

<style>
.three-map-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;

}

.three-map-content {
  width: 100%;
  height: 100%;
  background: url("assets/image/background.png");
  background-size: 100% 100%;
}
</style>
