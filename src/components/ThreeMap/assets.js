import { Resource } from "src/assets/mini3d"
import { FileLoader } from "three"

import pathLine from "src/assets/texture/pathLine4.png"
import pathLine3 from "src/assets/texture/pathLine2.png"
import pathLine2 from "src/assets/texture/pathLine.png"

import side from "src/assets/texture/side1.png"
import ocean from "src/assets/texture/ocean-bg.png"
import rotationBorder1 from "src/assets/texture/rotationBorder1.png"
import rotationBorder2 from "src/assets/texture/rotationBorder2.png"
import chinaBlurLine from "src/assets/texture/chinaBlurLine.png"
import guangquan1 from "src/assets/texture/guangquan01.png"
import guangquan2 from "src/assets/texture/guangquan02.png"
import huiguang from "src/assets/texture/huiguang.png"
import arrow from "src/assets/texture/arrow.png"
import point from "src/assets/texture/point1.png"
import flyLineFocus from "src/assets/texture/guangquan01.png"
import mapFlyline from "src/assets/texture/flyline6.png"
// 焦点贴图
import focusArrowsTexture from "src/assets/texture/focus/focus_arrows.png"
import focusBarTexture from "src/assets/texture/focus/focus_bar.png"
import focusBgTexture from "src/assets/texture/focus/focus_bg.png"
import focusMidQuanTexture from "src/assets/texture/focus/focus_mid_quan.png"
import focusMoveBgTexture from "src/assets/texture/focus/focus_move_bg.png"

//
import gzMapTexture from "src/assets/texture/gz-map2.png";
import bgImageTexture from "src/assets/texture/background.png";

export class Assets {
  constructor() {
    this.init()
  }
  init() {
    this.instance = new Resource()
    // 添加Fileloader
    this.instance.addLoader(FileLoader, "FileLoader")

    // 资源加载
    let base_url = import.meta.env.BASE_URL
    let assets = [
      { type: "Texture", name: "flyline", path: pathLine },
      { type: "Texture", name: "pathLine", path: pathLine },
      { type: "Texture", name: "pathLine2", path: pathLine2 },
      { type: "Texture", name: "pathLine3", path: pathLine3 },

      // {
      //   type: "File",
      //   name: "china",
      //   path: base_url + "assets/json/中华人民共和国.json",
      // },

      {
        type: "File",
        name: "mapJson",
        path: "data/json/chengde.json",
      },
      {
        type: "File",
        name: "mapStroke",
        path: "data/json/chengdeout.json",
      },
      {
        type: "File",
        name: "routeLine",
        path: "data/json/旅游环线.json",
      },
      {
        type: "File",
        name: "oneLine",
        path: "data/json/国家一号风景大道.json",
      },
      {
        type: "File",
        name: "twoLine",
        path: "data/json/红色旅游路路线.json",
      },
      {
        type: "File",
        name: "threeLine",
        path: "data/json/承德市省级美丽农村路.json",
      },
      // 兴趣点
      {
        type: "File",
        name: "fwqPoint",
        path: "data/json/服务区.json",
      },
      {
        type: "File",
        name: "hczPoint",
        path: "data/json/火车站.json",
      },
      {
        type: "File",
        name: "jcPoint",
        path: "data/json/机场.json",
      },
      {
        type: "File",
        name: "jpmsPoint",
        path: "data/json/精品民宿.json",
      },
      {
        type: "File",
        name: "jqPoint",
        path: "data/json/景区.json",
      },
      {
        type: "File",
        name: "sfzPoint",
        path: "data/json/收费站.json",
      },
      {
        type: "File",
        name: "xjjdPoint",
        path: "data/json/星级酒店.json",
      },

      { type: "Texture", name: "huiguang", path: huiguang },
      { type: "Texture", name: "rotationBorder1", path: rotationBorder1 },
      { type: "Texture", name: "rotationBorder2", path: rotationBorder2 },
      { type: "Texture", name: "guangquan1", path: guangquan1 },
      { type: "Texture", name: "guangquan2", path: guangquan2 },
      { type: "Texture", name: "chinaBlurLine", path: chinaBlurLine },
      { type: "Texture", name: "ocean", path: ocean },
      { type: "Texture", name: "side", path: side },
      { type: "Texture", name: "flyLineFocus", path: flyLineFocus },
      { type: "Texture", name: "mapFlyline", path: mapFlyline },
      { type: "Texture", name: "arrow", path: arrow },
      { type: "Texture", name: "point", path: point },

      // focus
      { type: "Texture", name: "focusArrows", path: focusArrowsTexture },
      { type: "Texture", name: "focusBar", path: focusBarTexture },
      { type: "Texture", name: "focusBg", path: focusBgTexture },
      { type: "Texture", name: "focusMidQuan", path: focusMidQuanTexture },
      { type: "Texture", name: "focusMoveBg", path: focusMoveBgTexture },

      // top&bg
      { type: "Texture", name: "gzMap", path: gzMapTexture },
      { type: "Texture", name: "bgImage", path: bgImageTexture },
    ]
    // 资源加载
    this.instance.loadAll(assets)
  }
}
