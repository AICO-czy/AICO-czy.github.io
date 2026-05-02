<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import * as THREE from "three";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 引入房间环境，创建一个室内环境
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// 导入性能监视器
import Stats from "three/examples/jsm/libs/stats.module.js";
// 导入gltf载入库、模型加载器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 引入模型解压器
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
//GUI界面
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import gsap from "gsap";

import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
// import beijing from "assets/json/beijing.json"; //包含子区域
// import beijingout from "assets/json/beijingout.json"; //不包含子区域

import chengde from "assets/json/chengde.json";
import chengdeout from "assets/json/chengdeout.json";
import lvLine from "assets/json/国家一号风景大道.json";

//墨卡托投影转换可以把我们经纬度坐标转换成我们对应平面的2d坐标,d3里面自带墨卡托投影转换
import * as d3 from "d3"; //引入d3

let stars: any;
let particleArr: any = [];
let textureLoader = new THREE.TextureLoader(); //纹理贴图加载器
let map = new THREE.Group();
let centerPos: [number, number] = [117.933822456, 40.9925210525];
let WaveMeshArr: any = []; //所有波动光圈集合
let uniforms2 = {
  u_time: { value: 0.0 },
};
let rotatingApertureMesh: any, rotatingPointMesh: any;

let container: any = null; //界面需要渲染的容器
let scene: any = null; // 场景对象
let camera: any = null; //相机对象
let renderer: any = null; //渲染器对象
let controller: any = null; // 相机控件对象
let stats: any = null; // 性能监听器
let mixer: any = null; //动画混合器
let model: any = null; //导入的模型
let gui: any = null; //GUI界面
const clock: any = new THREE.Clock(); // 创建一个clock对象，用于跟踪时间
let labelRenderer: any = null; //CSS2DRenderer渲染器对象
let orbit: any = null; //labelRenderer控制器

onMounted(() => {
  init();
  animate(); //如果引入了模型并存在动画，可在模型引入成功后加载动画
  addEventListener("resize", onWindowSize);
});
onBeforeUnmount(() => {
  console.log("beforeUnmount===============");
  // 释放渲染器的资源
  renderer.forceContextLoss(); // 强制上下文丢失
  renderer.dispose(); // 释放所有相关内容
  renderer.content = null;

  let gl = renderer.domElement.getContext("webgl");
  if (gl && gl.getExtension("WEBGL_lose_context")) {
    gl.getExtension("WEBGL_lose_context").loseContext();
  }
  renderer = null;
  // 销毁操作-清空场景、从DOM上删除渲染器等
  scene.remove(camera);
  scene.traverse((child: any) => {
    if (child.material) {
      // 可能存在材质为数组的情况
      if (child.material instanceof Array) {
        child.material.forEach((item: any) => item.dispose());
      } else {
        child.material.dispose();
        if (child.material.map) {
          child.material.map.dispose();
        }
      }
    }
    if (child.geometry) {
      child.geometry.dispose();
      child.geometry.attributes = null; // 这些属性包括position, normal, uv等等
    }
    child = null;
  });
  // 销毁动画混合器
  if (mixer) {
    mixer.uncacheClip(mixer._actions[0]._clip);
    mixer = null;
  }
  // 销毁GUI
  if (gui) {
    gui.destroy();
    gui = null;
  }
  // 停止渲染循环
  cancelAnimationFrame(animate);
  // 组件销毁时置空
  scene = null;
  camera = null;
  container = null;
  controller = null;
  stats = null;
  model = null; //导入的模型
  // 移除事件监听器：如果在Three.js实例中添加了事件监听器，应该在销毁实例之前将它们移除，以避免潜在的内存泄漏。可以使用removeEventListener方法来移除事件监听器。
  // 看情况移除监听器
  // const dom = document.getElementById('container')
  // window.removeEventListener("keydown", toggleFullscreen, false);
  // dom.removeEventListener("mousedown", onMouseDown, false);
  // dom.removeEventListener("wheel", onMouseWheel, false);
});
/**
 * @description 初始化
 */
const init = () => {
  container = document.getElementById("container");
  setScene();
  setCamera();
  setRenderer();
  setController();
  addHelper();
  setLight();
  // addStatus();
  initGeoJson();
  // initParticle(); // 数字上升效果
  initPoints();
  initFloor();
  // drawLoads(lvLine)
};

import bgMapJPG from "assets/image/background.png";
/**
 * @description 创建场景
 */
const setScene = () => {
  // 创建场景对象Scene
  scene = new THREE.Scene();
  let textureMap = textureLoader.load(bgMapJPG);
  // 设置场景背景
  scene.background = textureMap;
};

/**
 * @description 创建相机
 */
const setCamera = () => {
  // 第二参数就是 长度和宽度比 默认采用浏览器  返回以像素为单位的窗口的内部宽度和高度
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  // 设置相机位置
  camera.position.set(80, 80, 80);
  // 设置摄像头宽高比例
  camera.aspect = container.clientWidth / container.clientHeight;
  // 设置摄像头投影矩阵
  camera.updateProjectionMatrix();
  // 设置相机视线方向
  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 0, 0, 0 scene.position
  // 将相机加入场景
  scene.add(camera);
};
/**
 * @description 创建渲染器
 */
const setRenderer = () => {
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true, // 设置抗锯齿
    alpha: false,
    logarithmicDepthBuffer: true, // 是否使用对数深度缓存
  });
  // 设置渲染器宽高
  renderer.setSize(container.clientWidth, container.clientHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  // 是否需要对对象排序
  // renderer.sortObjects = false;
  // 将渲染器添加到页面
  container.appendChild(renderer.domElement);
  // 创建CSS2DRenderer渲染器(代替鼠标射线检测)
  labelRenderer = new CSS2DRenderer();
  // 设置labelRenderer渲染器宽高
  labelRenderer.setSize(container.clientWidth, container.clientHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  // 将渲染器添加到页面
  container.appendChild(labelRenderer.domElement);
};

/**
 * @description 添加创建控制器
 */
const setController = () => {
  controller = new OrbitControls(camera, renderer.domElement);
  // 控制缩放范围
  // controller.minDistance = 1;
  // controller.maxDistance = 5;
  //是否开启右键拖拽
  controller.enablePan = false;
  // controller.enablePan = true;
  // controller.screenSpacePanning = true;
  // 阻尼（惯性）
  controller.enableDamping = true; //启用阻尼（惯性）
  controller.dampingFactor = 0.04; //阻尼惯性有多大
  // controller.autoRotate = true; //自动围绕目标旋转
  // controller.minAzimuthAngle = -Math.PI / 3; //能够水平旋转的角度下限。如果设置，其有效值范围为[-2 * Math.PI，2 * Math.PI]，且旋转角度的上限和下限差值小于2 * Math.PI。默认值为无穷大。
  // controller.maxAzimuthAngle = Math.PI / 3;//水平旋转的角度上限,其有效值范围为[-2 * Math.PI，2 * Math.PI],默认值为无穷大
  controller.minPolarAngle = 1; //能够垂直旋转的角度的下限，范围是0到Math.PI，其默认值为0。
  controller.maxPolarAngle = 0; //能够垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI。
  // 修改相机的lookAt是不会影响THREE.OrbitControls的target的
  // 由于设置了控制器，因此只能改变控制器的target以改变相机的lookAt方向
  controller.target.set(0, 0.5, 0); //控制器的焦点

  // labelRenderer控制器
  orbit = new OrbitControls(camera, labelRenderer.domElement);
};

/**
 * @description 解析GeoJson数据并创建地图
 */
const initGeoJson = () => {
  // 引入json数据
  // 方法一 使用Three提供的FileLoader加载数据并对JSON数据进行解析：
  // const loader = new THREE.FileLoader();
  // loader.load("https://geo.datav.aliyun.com/areas_v3/bound/110000.json", (data) => {
  // 	console.log(data);
  // 	const jsonData = JSON.parse(data);
  // 	initMap(jsonData) //初始化加载地图
  // 	initMapLine(beijing)//加载地图边缘线
  // 	console.log('jsonData :>> ', jsonData);
  // });
  // 方法二 通过import引入JSON文件再调用
  initMap(chengdeout); //初始化加载地图
  initMapLine(chengde); //加载地图边缘线
  // initMapLine(lvLine); //加载地图边缘线
};

// import gzMapJPG from "assets/image/mapimg/gz-map.jpeg";
import gzMapJPG from "assets/image/地图贴图.png";
// src\assets\image\地图贴图.png
import gzFxJPG from "assets/image/mapimg/gz-map-fx.jpeg";
/**
 * @description 加载地图
 */
const initMap = (beijingOutJson: any) => {
  // 创建环境贴图
  let textureMap = textureLoader.load(gzMapJPG);
  let texturefxMap = textureLoader.load(gzFxJPG);
  textureMap.wrapS = THREE.RepeatWrapping; //纹理水平方向的平铺方式
  textureMap.wrapT = THREE.RepeatWrapping; //纹理垂直方向的平铺方式
  textureMap.flipY = texturefxMap.flipY = false; // 如果设置为true，纹理在上传到GPU的时候会进行纵向的翻转。默认值为true。
  textureMap.rotation = texturefxMap.rotation = THREE.MathUtils.degToRad(45); //rotation纹理将围绕中心点旋转多少度
  const scale = 0.01;
  textureMap.repeat.set(scale, scale); //repeat决定纹理在表面的重复次数
  texturefxMap.repeat.set(scale, scale);
  textureMap.offset.set(0.5, 0.5); //offset贴图单次重复中的起始偏移量
  texturefxMap.offset.set(0.5, 0.5);
  // MeshPhongMaterial(一种用于具有镜面高光的光泽表面的材质)
  const material = new THREE.MeshPhongMaterial({
    map: textureMap, //颜色贴图
    normalMap: texturefxMap, //用于创建法线贴图的纹理
    // normalScale: new THREE.Vector2(12.2, 2.2),//法线贴图对材质的影响程度
    color: "#7bc6c200",
    combine: THREE.MultiplyOperation, //如何将表面颜色的结果与环境贴图
    transparent: true,
    opacity: 1,
  });
  // MeshLambertMaterial(一种非光泽表面的材质，没有镜面高光)
  const material1 = new THREE.MeshLambertMaterial({
    color: 0x123150,
    transparent: true,
    opacity: 0.9,
  });
  // d3-geo墨卡托坐标转化
  const projection = d3
    .geoMercator() //地图投影方式(用于绘制球形墨卡托投影)
    .center(centerPos) //地图中心点经纬度坐标
    .scale(2500) //缩放
    .translate([0, 0]); //移动地图位置
  console.log("beijingOutJson.features :>> ", beijingOutJson.features);
  // 遍历省份构建模型
  beijingOutJson.features.forEach((elem: any) => {
    // 新建一个省份容器：用来存放省份对应的模型和轮廓线
    const meshArrs = new THREE.Object3D();
    const coordinates = elem.geometry.coordinates; //坐标合集
    coordinates.forEach((multiPolygon: any) => {
      const line = drawLine(coordinates, 5);
      meshArrs.add(line);
      multiPolygon.forEach((polygon: any) => {
        //Shape使用路径以及可选的孔洞来定义一个二维形状平面
        //创建一条空路径，.currentPoint将被设置为原点。
        const shape = new THREE.Shape();
        var v3ps = []; //Vector3点数组 - 创建发光轮廓线时使用
        for (let i = 0; i < polygon.length; i++) {
          const [x, y]: any = projection(polygon[i]);
          if (i === 0) {
            // 创建起点,使用moveTo方法
            // 因为计算出来的y是反过来，所以要进行颠倒
            shape.moveTo(x, -y); //将.currentPoint移动到x, y
          }
          shape.lineTo(x, -y); //在当前路径上，从.currentPoint连接一条直线到x,y
          v3ps.push(new THREE.Vector3(x, -y, 4.02)); //Vector3点数组
        }
        const extrudeSettings = {
          depth: 2, //该属性指定图形可以拉伸多高，默认值是100
          bevelEnabled: false, //是否给这个形状加斜面，默认加斜面。
        };
        //拉升成地图(从一个形状路径中，挤压出一个BufferGeometry)
        // ExtrudeGeometry --- 当使用这个几何体创建Mesh的时候，如果你希望分别对它的表面和它挤出的侧面使用单独的材质，你可以使用一个材质数组。 第一个材质将用于其表面；第二个材质则将用于其挤压出的侧面。
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const mesh = new THREE.Mesh(geometry, [
          material, //表面材质
          material1, //侧面材质
        ]);
        mesh.rotateX(-Math.PI / 2); //x轴旋转
        mesh.position.set(0, 1.5, -3); //设置放置位置
        meshArrs.add(mesh);
        // 创建发光轮廓线，一个闭合的波状循环
        //CatmullRomCurve3 ---  从一系列的点创建一条平滑的三维样条曲线
        var curve = new THREE.CatmullRomCurve3(
          v3ps, //Vector3点数组
          true /*是否闭合*/
        );
        var flyLine = initFlyLine(
          curve,
          {
            speed: 0.2,
            color: new THREE.Color("#00ffff"),
            number: 1, //3 同时跑动的流光数量
            length: 0.2, //流光线条长度
            size: 4, //粗细
          },
          10000
        );
        flyLine.position.set(0, 0.1, -3);
        flyLine.scale.multiplyScalar(1.001);
        flyLine.rotateX(-Math.PI / 2);
        meshArrs.add(flyLine);
      });
    });
    map.add(meshArrs);
  });
  scene.add(map);
};

const createLine = (points: any) => {
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0);
  const geometry = new THREE.TubeGeometry(
    curve,
    Math.round(points.length * 0.5),
    0.01,
    8,
    true
  );
  const material = new THREE.MeshBasicMaterial({ color: "white" });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

/**
 * @description 设置发光轮廓线材质
 * @param {object} setting 着色器材质设置
 */
const initLineMaterial = (setting: any) => {
  const number = setting ? Number(setting.number) || 1.0 : 1.0;
  const speed = setting ? Number(setting.speed) || 1.0 : 1.0;
  const length = setting ? Number(setting.length) || 0.5 : 0.5;
  const size = setting ? Number(setting.size) || 3.0 : 3.0;
  const color = setting
    ? setting.color || new THREE.Vector3(0, 1, 1)
    : new THREE.Vector3(0, 1, 1);
  const singleUniforms = {
    u_time: uniforms2.u_time,
    number: { type: "f", value: number },
    speed: { type: "f", value: speed },
    length: { type: "f", value: length },
    size: { type: "f", value: size },
    color: { type: "v3", value: color },
  };
  const lineMaterial = new THREE.ShaderMaterial({
    uniforms: singleUniforms,
    vertexShader: `		varying vec2 vUv;
									  attribute float percent;
									  uniform float u_time;
									  uniform float number;
									  uniform float speed;
									  uniform float length;
									  varying float opacity;
									  uniform float size;
									  void main()
									  {
									      vUv = uv;
									      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
									      float l = clamp(1.0-length,0.0,1.0);
									      gl_PointSize = clamp(fract(percent*number + l - u_time*number*speed)-l ,0.0,1.) * size * (1./length);
									      opacity = gl_PointSize/size;
									      gl_Position = projectionMatrix * mvPosition;
									  }`,
    fragmentShader: `#ifdef GL_ES
									  precision mediump float;
									  #endif
									  varying float opacity;
									  uniform vec3 color;
									  void main(){
									      if(opacity <=0.2){
									          discard;
									      }
									      gl_FragColor = vec4(color,1.0);
									  }`,
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  return lineMaterial;
};

/**
 * @description 创建发光轮廓线
 * @param {*} curve CatmullRomCurve3 ---  从一系列的点创建一条平滑的三维样条曲线
 * @param {*} matSetting 着色器材质设置
 * @param {*} pointsNumber 要将曲线划分为的分段数
 * @returns flyLine 点模型
 */
const initFlyLine = (curve: any, matSetting: any, pointsNumber: any) => {
  // getPoints 方法从曲线中获取点
  var points = curve.getPoints(pointsNumber);
  // 放入多个点
  // 将这系列点赋值给几何体
  var geometry = new THREE.BufferGeometry().setFromPoints(points);
  const length = points.length;
  var percents = new Float32Array(length);
  for (let i = 0; i < points.length; i += 1) {
    percents[i] = i / length;
  }
  geometry.setAttribute("percent", new THREE.BufferAttribute(percents, 1));
  // 设置发光轮廓线材质
  const lineMaterial = initLineMaterial(matSetting);
  var flyLine = new THREE.Points(geometry, lineMaterial);
  return flyLine;
};

/**
 * @description 加载地图边缘线
 */
const initMapLine = (beijingJson: any) => {
  var matLine = new LineMaterial({
    color: 0xffffff,
    linewidth: 0.0013,
    vertexColors: true,
    dashed: false,
    alphaToCoverage: true,
  });

  var matLine2 = new LineMaterial({
    color: "#01bdc2",
    linewidth: 0.0025,
    vertexColors: true,
    dashed: false,
    alphaToCoverage: true,
  });
  // d3-geo转化坐标
  const projection = d3
    .geoMercator()
    .center(centerPos)
    .scale(2500)
    .translate([0, 0]);
  // 遍历省份构建模型
  beijingJson.features.forEach((elem: any) => {
    const province = new THREE.Object3D();
    const coordinates = elem.geometry.coordinates;
    const properties = elem.properties;
    //这里创建光柱、文字坐标
    initLightPoint(properties, projection);
    // 创建地图上面和下面的边缘线
    coordinates.forEach((multiPolygon: any) => {
      multiPolygon.forEach((polygon: any) => {
        const positions = [];
        var colors = [];
        const color = new THREE.Color();
        var linGeometry = new LineGeometry();
        for (let i = 0; i < polygon.length; i += 1) {
          const [x, y]: any = projection(polygon[i]);
          positions.push(x, -y, 4.01);
          color.setHSL(1, 1, 1);
          colors.push(color.r, color.g, color.b);
        }

        // Line2方式绘制线条
        linGeometry.setPositions(positions);
        linGeometry.setColors(colors);
        const line = new Line2(linGeometry, matLine);
        const line2 = new Line2(linGeometry, matLine2);
        line.computeLineDistances();
        line.rotateX(-Math.PI / 2);
        line2.rotateX(-Math.PI / 2);
        line.position.set(0, 0.1, -3);
        line2.position.set(0, -3.5, -3);
        line2.computeLineDistances();
        line.scale.set(1, 1, 1);
        province.add(line);
        province.add(line2);
      });
    });
    map.add(province);
  });
  scene.add(map);
};
/**
 * @description 创建光柱、文字坐标
 * @param {*} properties 属性、详情
 * @param {Function} projection  d3-geo转化坐标
 */
const initLightPoint = (properties: any, projection: any) => {
  // 创建光柱
  let heightScaleFactor = 10 + random(1, 5) / 5;
  let lightCenter = properties.centroid || properties.center;
  let areaName = properties.name;
  // projection用来把经纬度转换成坐标
  const [x, y] = projection(lightCenter);
  let light = createLightPillar(x, y, heightScaleFactor);
  light.position.z -= 3;
  map.add(light);
  //这里创建文字坐标
  createTextPoint(x, y, areaName);
};

/**
 * @description 创建文字坐标
 * @param {*} x d3 - 经纬度转换后的x轴坐标
 * @param {*} z d3 - 经纬度转换后的z轴坐标
 * @param {*} areaName 地名
 */
const createTextPoint = (x: any, z: any, areaName: any) => {
  let tag: any = document.createElement("div");
  tag.innerHTML = name;
  // tag.className = className
  tag.style.color = "#fff";
  // tag.style.pointerEvents = "none";
  tag.style.pointerEvents = "auto";
  // tag.style.visibility = 'hidden'
  tag.style.position = "absolute";
  tag.style.fontSize = "48px";
  // tag.setAttribute('data-name', 'label');
  // tag.addEventListener('click', clickLabel, false);
  tag.addEventListener("mousedown", clickLabel, false); // 有时候PC端click事件不生效，不知道什么原因，就使用mousedown事件
  tag.addEventListener("touchstart", clickLabel, false);
  let label = new CSS2DObject(tag);
  label.element.innerHTML = areaName;
  label.element.style.visibility = "visible";
  label.position.set(x, 5, z);
  label.position.z -= 3;
  scene.add(label);
};

/**
 * @description 文字坐标点击
 * @param {*} e
 */
const clickLabel = (e: any) => {
  console.log("e :>> ", e);
};

import guangZhu from "assets/image/mapimg/光柱.png";
/**
 * @description // 创建光柱
 * @param {*} x d3 - 经纬度转换后的x轴坐标
 * @param {*} z d3 - 经纬度转换后的z轴坐标
 * @param {*} heightScaleFactor
 */
const createLightPillar = (x: any, z: any, heightScaleFactor = 1) => {
  let group = new THREE.Group();
  // 柱体高度
  const height = heightScaleFactor;
  // 柱体的geo,6.19=柱体图片高度/宽度的倍数
  const geometry = new THREE.PlaneGeometry(height / 6.219, height);
  // 柱体旋转90度，垂直于Y轴
  // geometry.rotateX(Math.PI / 2)
  // 柱体的z轴移动高度一半对齐中心点
  geometry.translate(0, height / 2, 0);
  // 柱子材质
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(guangZhu),
    color: 0x00ffff,
    transparent: true,
    depthWrite: false,
    // depthTest:false,
    side: THREE.DoubleSide,
  });
  // 光柱01
  let light01 = new THREE.Mesh(geometry, material);
  light01.renderOrder = 2;
  light01.name = "createLightPillar01";
  // 光柱02：复制光柱01
  let light02 = light01.clone();
  light02.renderOrder = 2;
  light02.name = "createLightPillar02";
  // 光柱02，旋转90°，跟 光柱01交叉
  light02.rotateY(Math.PI / 2);

  // 创建底部标点
  const bottomMesh = createPointMesh(1.5);

  // 创建光圈
  const lightHalo = createLightHalo(1.5);
  WaveMeshArr.push(lightHalo);
  // 将光柱和标点添加到组里
  // group.add(bottomMesh, lightHalo, light01, light02);
  group.add(bottomMesh, lightHalo);
  // 设置组对象的姿态
  // group = setMeshQuaternion(group, R, lon, lat)
  group.position.set(x, 4.01, z);
  return group;
};

import maskJPG from "assets/image/mapimg/标注.png";
/**
 * @description 创建底部标点
 * @param {number} size 缩放大小
 */
const createPointMesh = (size: any) => {
  // 标记点：几何体，材质，
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(maskJPG),
    color: 0x00ffff,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false, //禁止写入深度缓冲区数据
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 2;
  mesh.rotation.x = Math.PI / 2;
  mesh.name = "createPointMesh";
  // 缩放
  const scale = 1 * size;
  mesh.scale.set(scale, scale, scale);
  return mesh;
};

import maskGqJPG from "assets/image/mapimg/标注光圈.png";
/**
 * @description 创建底部标点的光圈
 * @param {number} size 缩放大小
 */
const createLightHalo = (size: any) => {
  // 标记点：几何体，材质，
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(maskGqJPG),
    color: 0x00ffff,
    side: THREE.DoubleSide,
    opacity: 0,
    transparent: true,
    depthWrite: false, //禁止写入深度缓冲区数据
  });
  let mesh: any = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 2;
  mesh.name = "createLightHalo";
  mesh.rotation.x = Math.PI / 2;
  // 缩放
  const scale = 1.5 * size;
  mesh.size = scale; //自顶一个属性，表示mesh静态大小
  mesh.scale.set(scale, scale, scale);
  return mesh;
};

import gradient from "assets/image/mapimg/gradient.png";
/**
 * @description 添加环境粒子
 */
const initPoints = () => {
  var texture = new THREE.TextureLoader().load(gradient);
  const positions = [];
  const colors = [];
  const geometry = new THREE.BufferGeometry();
  for (var i = 0; i < 1000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    positions.push(vertex.x, vertex.y, vertex.z);
    var color = new THREE.Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  var starsMaterial = new THREE.PointsMaterial({
    map: texture,
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true, //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  stars = new THREE.Points(geometry, starsMaterial);
  stars.scale.set(300, 300, 300);
  scene.add(stars);
};

import groundBG from "assets/image/mapimg/地板背景.png";
import rotatingAperture from "assets/image/mapimg/rotatingAperture.png";
import rotatingPoint2 from "assets/image/mapimg/rotating-point2.png";
import circlePoint2 from "assets/image/mapimg/circle-point.png";
/**
 * @description 添加底部旋转背景
 */
const initFloor = () => {
  const geometry = new THREE.PlaneGeometry(400, 400);
  let texture = textureLoader.load(groundBG);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    map: texture,
    // emissive:0xffffff,
    // emissiveMap:Texture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    // roughness:1,
    // metalness:0,
    depthWrite: false,
    // side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(geometry, material);
  plane.rotateX(-Math.PI / 2);
  scene.add(plane);

  let rotatingApertureTexture = textureLoader.load(rotatingAperture);
  let rotatingApertureerial = new THREE.MeshBasicMaterial({
    map: rotatingApertureTexture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: false,
  });
  let rotatingApertureGeometry = new THREE.PlaneGeometry(100, 100);
  rotatingApertureMesh = new THREE.Mesh(
    rotatingApertureGeometry,
    rotatingApertureerial
  );
  rotatingApertureMesh.rotateX(-Math.PI / 2);
  rotatingApertureMesh.position.y = 0.02;
  rotatingApertureMesh.scale.set(1.2, 1.2, 1.2);
  scene.add(rotatingApertureMesh);

  let rotatingPointTexture = textureLoader.load(rotatingPoint2);
  let material2 = new THREE.MeshBasicMaterial({
    map: rotatingPointTexture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: false,
  });

  rotatingPointMesh = new THREE.Mesh(rotatingApertureGeometry, material2);
  rotatingPointMesh.rotateX(-Math.PI / 2);
  rotatingPointMesh.position.y = 0.04;
  rotatingPointMesh.scale.set(1, 1, 1);
  scene.add(rotatingPointMesh);

  let circlePoint = textureLoader.load(circlePoint2);
  let material3 = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    map: circlePoint,
    transparent: true,
    opacity: 1,
    depthWrite: false,
    // depthTest: false,
  });
  let plane3 = new THREE.PlaneGeometry(120, 120);
  let mesh3 = new THREE.Mesh(plane3, material3);
  mesh3.rotateX(-Math.PI / 2);
  mesh3.position.y = 0.06;
  scene.add(mesh3);
};

import oneJPG from "assets/image/mapimg/1.png";
/**
 * @description 数字上升效果
 */
const initParticle = () => {
  //设置范围
  let minX = -60;
  let maxX = 60;
  let minY = -10;
  let maxY = 30;
  let minZ = -60;
  let maxZ = 60;

  for (let i = 0; i < 15; i++) {
    const particle = createSequenceFrame({
      image: oneJPG,
      width: 180,
      height: 189,
      frame: 9,
      column: 9,
      row: 1,
      speed: 0.5,
    });
    let particleScale = random(5, 10) / 100;
    particle.scale.set(particleScale, particleScale, particleScale);
    let x = random(minX, maxX);
    let y = random(minY, maxY);
    let z = random(minZ, maxZ);
    particle.position.set(x, y, z);
    particleArr.push(particle);
  }
  scene.add(...particleArr);
  return particleArr;
};

const createSequenceFrame = (opt: any) => {
  // 默认参数
  let options = deepMerge(
    {
      image: "",
      width: 200, // 显示的宽度
      height: 200, // 显示的高度
      frame: 60, //总共的帧数
      column: 10, // 序列图的列
      row: 6, // 序列图的行
      speed: 0.5, // 速度
    },
    opt
  );
  let geometry = new THREE.PlaneGeometry(options.width, options.height); //矩形平面
  let texture = textureLoader.load(options.image); // 加载图片
  texture.repeat.set(1 / options.column, 1 / options.row); // 从图像上截图第一帧
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
    depthWrite: false, //是否对深度缓冲区有任何的影响
  });
  let mesh: any = new THREE.Mesh(geometry, material);

  let r = 0; // 当前行
  let c = 0; // 当前列
  let t = 0; // 时间
  mesh.updateSequenceFrame = (time: any) => {
    t += options.speed;
    if (t > options.frame) t = 0;
    c = options.column - Math.floor(t % options.column) - 1;
    r = Math.floor((t / options.column) % options.row);
    texture.offset.x = c / options.column; // 动态更新纹理偏移 播放关键帧动画
    texture.offset.y = r / options.row; // 动态更新纹理偏移 播放关键帧动画
  };

  return mesh;
};
const random = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const isType = (type: any, value: any) => {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
};
const isObject = (value: any) => {
  return isType("Object", value);
};

const deepMerge = (target: any, source: any) => {
  target = deepClone(target);
  for (let key in source) {
    if (key in target) {
      // 对象的处理
      if (isObject(source[key])) {
        if (!isObject(target[key])) {
          target[key] = source[key];
        } else {
          target[key] = deepMerge(target[key], source[key]);
        }
      } else {
        target[key] = source[key];
      }
    } else {
      target[key] = source[key];
    }
  }
  return target;
};

const deepClone = (target: any, map = new Map()) => {
  // target 不能为空，并且是一个对象
  if (target != null && isObject(target)) {
    // 在克隆数据前，进行判断是否克隆过,已克隆就返回克隆的值
    let cache = map.get(target);
    if (cache) {
      return cache;
    }
    // 判断是否为数组
    const isArray = Array.isArray(target);
    let result: any = isArray ? [] : {};
    // 将新结果存入缓存中
    cache = map.set(target, result);
    // 如果是数组
    if (isArray) {
      // 循环数组，
      target.forEach((item, index) => {
        // 如果item是对象，再次递归
        result[index] = deepClone(item, cache);
      });
    } else {
      // 如果是对象
      Object.keys(target).forEach((key) => {
        if (isObject(result[key])) {
          result[key] = deepClone(target[key], cache);
        } else {
          result[key] = target[key];
        }
      });
    }
    return result;
  } else {
    return target;
  }
};
/**
 * @description 创建辅助坐标轴
 */
const addHelper = () => {
  // 模拟相机视锥体的辅助对象
  let helper = new THREE.CameraHelper(camera);
  // scene.add(helper);
  //创建辅助坐标轴、轴辅助 （每一个轴的长度）
  let axisHelper = new THREE.AxesHelper(150); // 红线是X轴，绿线是Y轴，蓝线是Z轴
  // scene.add(axisHelper)
  // 坐标格辅助对象
  let gridHelper = new THREE.GridHelper(100, 30, 0x2c2c2c, 0x888888);
  // scene.add(gridHelper);
};
/**
 * @description 设置光源
 */
const setLight = () => {
  // 环境光
  scene.add(new THREE.AmbientLight(0xffffff, 1.5));
  // 平行光
  let directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(-100, 10, -100);
  scene.add(directionalLight1);
  // 平行光
  let directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight2.position.set(100, 10, 100);
  scene.add(directionalLight2);

  let hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  scene.add(hemLight);
};

/**
 * @description 创建性能监听器
 */
const addStatus = () => {
  // 创建一个性能监听器
  stats = new Stats();
  // 将性能监听器添加到容器中
  // container.appendChild(stats.dom);
};
/**
 * @description 监听屏幕的大小改变，修改渲染器的宽高，相机的比例
 */
// 窗口变化
const onWindowSize = () => {
  orbit && orbit.update();
  // 更新摄像头
  camera.aspect = container.clientWidth / container.clientHeight;
  // 更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(container.clientWidth, container.clientHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  labelRenderer.render(scene, camera);

  labelRenderer.setSize(container.clientWidth, container.clientHeight);
};
/**
 * @description 动画执行函数
 */
const animate = () => {
  if (rotatingApertureMesh) {
    rotatingApertureMesh.rotation.z += 0.0005;
  }
  if (rotatingPointMesh) {
    rotatingPointMesh.rotation.z -= 0.0005;
  }
  if (particleArr.length) {
    for (let i = 0; i < particleArr.length; i++) {
      particleArr[i].updateSequenceFrame();
      particleArr[i].position.y += 0.15;
      if (particleArr[i].position.y >= 30) {
        particleArr[i].position.y = -10;
      }
    }
  }
  if (WaveMeshArr.length) {
    WaveMeshArr.forEach(function (mesh: any) {
      mesh._s += 0.007;
      mesh.scale.set(
        mesh.size * mesh._s,
        mesh.size * mesh._s,
        mesh.size * mesh._s
      );
      if (mesh._s <= 1.5) {
        //mesh._s=1，透明度=0 mesh._s=1.5，透明度=1
        mesh.material.opacity = (mesh._s - 1) * 2;
      } else if (mesh._s > 1.5 && mesh._s <= 2) {
        //mesh._s=1.5，透明度=1 mesh._s=2，透明度=0
        mesh.material.opacity = 1 - (mesh._s - 1.5) * 2;
      } else {
        mesh._s = 1.0;
      }
    });
  }
  orbit && orbit.update();
  labelRenderer.render(scene, camera);
  if (stars) {
    stars.rotation.y += 0.0001;
  }
  uniforms2.u_time.value += 0.007;
  const delta = clock.getDelta();
  // mixer 动画更新
  if (mixer) {
    mixer.update(delta);
  }
  // 引擎自动更新渲染器
  requestAnimationFrame(animate);
  //update()函数内会执行camera.lookAt(x, y, z)
  controller.update(delta);
  // 更新性能监听器
  // stats.update();
  // 重新渲染场景
  renderer.render(scene, camera);
};

const offsetXY = d3.geoMercator();
const drawLine = (data: any, depth: any) => {
  const points: any = [];
  data.forEach((item: any) => {
    const [x, y]: any = offsetXY(item);
    points.push(new THREE.Vector3(x, -y, 0));
  });
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  // 地图上面的线
  const upLineMaterial = new THREE.LineBasicMaterial({ color: "#ffffff" });
  // 地图下面的线
  const downLineMaterial = new THREE.LineBasicMaterial({ color: "#ffffff" });

  const upLine = new THREE.Line(lineGeometry, upLineMaterial);
  const downLine = new THREE.Line(lineGeometry, downLineMaterial);
  downLine.position.z = -0.1;
  upLine.position.z = depth + 0.1;
  return [upLine, downLine];
};
</script>
<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
