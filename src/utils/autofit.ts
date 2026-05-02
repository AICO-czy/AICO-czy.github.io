import { useThemeConfig } from "stores/themeConfig";
import { pinia } from "stores/index";
const stores = useThemeConfig(pinia);

export interface IgnoreOption {
  el: string;
  height?: number;
  width?: number;
  scale?: number;
  fontSize?: number;
}
export interface AutofitOption {
  el?: string;
  dw?: number;
  dh?: number;
  resize?: boolean;
  ignore?: (IgnoreOption | string)[];
  transition?: number;
  delay?: number;
  limit?: number;
}
declare interface autofit {
  /**
   * 参数列表
   * 对象：
   *
   * @param {AutofitOption|String|undefined} options
   * @param {boolean|undefined} isShowInitTip
   * - 传入对象，对象中的属性如下：
   * - el（可选）：渲染的元素，默认是 "body"
   * - dw（可选）：设计稿的宽度，默认是 1920
   * - dh（可选）：设计稿的高度，默认是 1080
   * - resize（可选）：是否监听resize事件，默认是 true
   * - ignore(可选)：忽略缩放的元素（该元素将反向缩放），参数见readme.md
   * - transition（可选）：过渡时间，默认是 0
   * - delay（可选）：延迟，默认是 0
   */
  init(options?: AutofitOption | String, isShowInitTip?: boolean): void;
  /**
   * @param {String} id
   * 关闭autofit.js造成的影响
   *
   */
  off(id?: string): void;
  /**
   * 检查autofit.js是否正在运行
   */
  isAutofitRunnig: boolean;
}
let currRenderDom: any = null;
let currelRectification = "";
let currelRectificationLevel = 0;
let resizeListener: any = null;
let timer: any = null;
let currScale = 1;
let isElRectification = false;
const autofit = {
  isAutofitRunnig: false,
  init(options: AutofitOption, isShowInitTip = true) {
    if (isShowInitTip) {
      console.log(`autofit.js is running`);
    }
    const {
      dw = 1920,
      dh = 1080,
      el = typeof options === "string" ? options : "body",
      resize = true,
      ignore = [],
      transition = "none",
      delay = 0,
      limit = 0.1,
    } = options;
    currRenderDom = el;
    let dom = document.querySelector(el) as HTMLElement;
    if (!dom) {
      console.error(`autofit: '${el}' is not exist`);
      return;
    }
    const style = document.createElement("style");
    const ignoreStyle = document.createElement("style");
    style.lang = "text/css";
    ignoreStyle.lang = "text/css";
    style.id = "autofit-style";
    ignoreStyle.id = "ignoreStyle";
    style.innerHTML = `body {overflow: hidden;}`;
    const bodyEl = document.querySelector("body") as HTMLElement;
    bodyEl!.appendChild(style);
    bodyEl!.appendChild(ignoreStyle);
    dom.style.height = `${dh}px`;
    dom.style.width = `${dw}px`;
    dom.style.transformOrigin = `0 0`;
    dom.style.overflow = "hidden";
    keepFit(dw, dh, dom, ignore, limit);
    resizeListener = () => {
      clearTimeout(timer);
      if (delay != 0)
        timer = setTimeout(() => {
          keepFit(dw, dh, dom, ignore, limit);
          isElRectification &&
            elRectification(currelRectification, currelRectificationLevel);
        }, delay);
      else {
        keepFit(dw, dh, dom, ignore, limit);
        isElRectification &&
          elRectification(currelRectification, currelRectificationLevel);
      }
    };
    resize && window.addEventListener("resize", resizeListener);
    this.isAutofitRunnig = true;
    setTimeout(() => {
      dom.style.transition = `${transition}s`;
    });
  },
  off(el = "body") {
    try {
      isElRectification = false;
      window.removeEventListener("resize", resizeListener);
      document.querySelector("#autofit-style")!.remove();
      const ignoreStyleDOM = document.querySelector("#ignoreStyle");
      ignoreStyleDOM && ignoreStyleDOM.remove();
      document.querySelector(currRenderDom ? currRenderDom : el).style = "";
      isElRectification && offelRectification();
    } catch (error) {
      console.error(`autofit: Failed to remove normally`, error);
      this.isAutofitRunnig = false;
    }
    this.isAutofitRunnig && console.log(`autofit.js is off`);
  },
};
function elRectification(el: any, level = 1) {
  if (!autofit.isAutofitRunnig) {
    console.error("autofit.js：autofit has not been initialized yet");
  }
  !el && console.error(`autofit.js：bad selector: ${el}`);
  currelRectification = el;
  currelRectificationLevel = level;
  const currEl: any = document.querySelectorAll(el);
  if (currEl.length == 0) {
    console.error("autofit.js：elRectification found no element");
    return;
  }
  for (let item of currEl) {
    if (!isElRectification) {
      item.originalWidth = item.clientWidth;
      item.originalHeight = item.clientHeight;
    }
    let rectification = currScale == 1 ? 1 : currScale * level;
    item.style.width = `${item.originalWidth * rectification}px`;
    item.style.height = `${item.originalHeight * rectification}px`;
    item.style.transform = `scale(${1 / currScale})`;
    item.style.transformOrigin = `0 0`;
  }
  isElRectification = true;
}
function offelRectification() {
  if (!currelRectification) return;
  const current: any = document.querySelectorAll(currelRectification);
  for (let item of current) {
    item.style.width = ``;
    item.style.height = ``;
    item.style.transform = ``;
  }
  isElRectification = false; // 修复刷新页面地图会被二次放大问题
}
function keepFit(dw: number, dh: number, dom: any, ignore: any, limit: number) {
  let clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  // 3.计算缩放比率(屏幕过宽，根据高度计算缩放比例)
  let widthRatio = clientWidth / dw; // 参照宽度进行缩放（默认情况下）
  let heightRatio = clientHeight / dh; // 参照高度进行缩放（默认情况下）
  // 设计图宽高比例
  let designRatio = dw / dh;
  // 当前浏览器界面宽高比例
  let currentRatio = clientWidth / clientHeight;
  // 缩放比例
  // currScale = widthRatio < heightRatio ? widthRatio : heightRatio;
  currScale = currentRatio > designRatio ? heightRatio : widthRatio;
  currScale = Math.abs(1 - currScale) > limit ? currScale : 1;
  let height = Math.round(clientHeight / currScale);
  let width = Math.round(clientWidth / currScale);
  dom.style.height = `${height}px`;
  dom.style.width = `${width}px`;
  dom.style.transform = `scale(${currScale})`;
  stores.setThemeConfig({ currScale: currScale });
  const ignoreStyleDOM = document.querySelector("#ignoreStyle") as HTMLElement;
  ignoreStyleDOM.innerHTML = "";
  for (let item of ignore) {
    let itemEl = item.el || item.dom;
    typeof item == "string" && (itemEl = item);
    if (!itemEl) {
      console.error(`autofit: bad selector: ${itemEl}`);
      continue;
    }
    let realScale = item.scale ? item.scale : 1 / currScale;
    let realFontSize = realScale != currScale ? item.fontSize : "autofit";
    let realWidth = realScale != currScale ? item.width : "autofit";
    let realHeight = realScale != currScale ? item.height : "autofit";
    let regex = new RegExp(`${itemEl}(\x20|{)`, "gm");
    let isIgnored = regex.test(ignoreStyleDOM.innerHTML);
    if (isIgnored) {
      continue;
    }
    ignoreStyleDOM.innerHTML += `\n${itemEl} {
      transform: scale(${realScale})!important;
      transform-origin: 0 0;
      width: ${realWidth}!important;
      height: ${realHeight}!important;
    }`;
    if (realFontSize) {
      ignoreStyleDOM.innerHTML += `\n${itemEl} div ,${itemEl} span,${itemEl} a,${itemEl} * {
        font-size: ${realFontSize}px;
      }`;
    }
  }
}
export { elRectification, offelRectification };
export default autofit;
