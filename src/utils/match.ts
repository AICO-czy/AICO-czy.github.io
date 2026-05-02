/**
 * Array match one ?
 * @param {array} array
 * @param {any} one
 * @param {string} keyId
 * @param {string} rtKeyId
 */
export function ArrayMatchOne(
  array: string | any[],
  one: { [x: string]: any },
  keyId: string | number,
  rtKeyId: string | number
) {
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (keyId) {
      if (item[keyId] === one[keyId]) {
        return rtKeyId ? item[rtKeyId] : item;
      }
    } else {
      if (item === one) {
        return rtKeyId ? item[rtKeyId] : item;
      }
    }
  }
[{

}]
  return null;
}

/**
 * Array match Array By Key && Replace
 * @param {array} arrayA
 * @param {any} arrayB
 * @param {string} aKey
 * @param {string} bKey
 */
export function ArrayReplaceArrayByKey(
  arrayA: string | any[],
  arrayB: string | any[],
  aKey: string | number,
  bKey: string | number,
  bReplaceKey: string | number
) {
  for (let i = 0; i < arrayA.length; i++) {
    const itemA = arrayA[i];

    for (let j = 0; j < arrayB.length; j++) {
      const itemB = arrayB[j];

      if (itemA[aKey] === itemB[bKey]) {
        itemA[aKey] = itemB[bReplaceKey];
        if (itemB.sortNo) itemA.sortNo = itemB.sortNo;
        break;
      }
    }
  }

  return arrayA;
}

const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
const pi = 3.1415926535897932384626; // π
const a = 6378245.0; // 长半轴
const ee = 0.00669342162296594323; // 扁率
function transformLat(x: number, y: number) {
  var ret =
    -100.0 +
    2.0 * x +
    3.0 * y +
    0.2 * y * y +
    0.1 * x * y +
    0.2 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;
  ret +=
    ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

function transformLng(x: number, y: number) {
  var ret =
    300.0 +
    x +
    2.0 * y +
    0.1 * x * x +
    0.1 * x * y +
    0.1 * Math.sqrt(Math.abs(x));
  ret +=
    ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
  ret +=
    ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) *
      2.0) /
    3.0;
  return ret;
}

/**
 * 百度坐标转火星坐标
 * @param {Number} x
 * @param {Number} y
 * @returns
 */
export function BD09ToGCJ02(x: number, y: number) {
  var lng = x - 0.0065;
  var lat = y - 0.006;
  var z = Math.sqrt(lng * lng + lat * lat) - 0.00002 * Math.sin(lat * x_pi);
  var theta = Math.atan2(lat, lng) - 0.000003 * Math.cos(lng * x_pi);
  lng = z * Math.cos(theta);
  lat = z * Math.sin(theta);
  return {
    lng: lng,
    lat: lat,
  };
}

/**
 *百度坐标转WGS84
 * @param {*} x
 * @param {*} y
 * @returns
 */
export function BD09ToWGS84(x: any, y: any) {
  var hx = BD09ToGCJ02(x, y);
  var wgs84 = GCJ02ToWGS84(hx.lng, hx.lat);
  return wgs84;
}

/**
 * 火星坐标(GCJ高德和腾讯) 转换为WGS84(gps) 坐标
 * @param {Number} x
 * @param {Number} y
 * @returns
 */
export function GCJ02ToWGS84(x: number, y: number) {
  /*   if (outOfChina(x,y)) {
      return new {"lng":x, "lat":y };
    }
    var dLat = transformLat(x - 105.0, y - 35.0);
    var dLon = transformLng(x - 105.0, y - 35.0);
    var radLat = (y / 180.0) * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat =
      (dLat * 180.0) /
      (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon =
      (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    var mgLat = y + dLat;
    var mgLon = x + dLon;
    var db ={"lng":mgLon, "lat":mgLat };
    return db; */
  if (outOfChina(x, y)) {
    return {
      lng: x,
      lat: y,
    };
  }
  var dlat = transformLat(x - 105.0, y - 35.0);
  var dlng = transformLng(x - 105.0, y - 35.0);
  var radlat = (y / 180.0) * pi;
  var magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * pi);
  dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * pi);
  var wgs84 = {
    lng: 0.0,
    lat: 0.0,
  };
  var mglat = y + dlat;
  var mglng = x + dlng;
  wgs84.lat = y * 2 - mglat;
  wgs84.lng = x * 2 - mglng;
  return wgs84;
}

function outOfChina(x: number, y: number) {
  if (x < 72.004 || x > 137.8347) return true;
  if (y < 0.8293 || y > 55.8271) return true;
  return false;
}

/**
 * 线性渐变起止方向的计算方法
 * @param {*} startArc 开始角度
 * @param {*} endArc 结束角度
 * @returns 四个坐标 x,y,x2,y2
 */
function getCoordinates(startArc: number, endArc: number) {
  const posi = [
    Math.sin(startArc),
    -Math.cos(startArc),
    Math.sin(endArc),
    -Math.cos(endArc),
  ];
  const dx = posi[2] - posi[0];
  const dy = posi[3] - posi[1];

  return getLocation(dx, dy);
}

/**
 * 线性渐变起止方向的计算方法
 * @param {*} dx 开始角度
 * @param {*} dy 结束角度
 * @returns 四个坐标 x,y,x2,y2
 */
function getLocation(dx: number, dy: number) {
  const tanV = dx / dy;
  const directSign = Math.abs(tanV) < 1;
  const t = directSign ? tanV : 1 / tanV;

  const sign1 = t > 0 ? 1 : -1;
  const sign2 = dx > 0 ? 1 : -1;
  const sign = directSign ? sign1 * sign2 : sign2;

  const group1 = [0.5 - (sign * t) / 2, 0.5 + (sign * t) / 2];
  const group2 = sign > 0 ? [0, 1] : [1, 0];
  const group = [...group1, ...group2];
  const keys = directSign ? ["x", "x2", "y", "y2"] : ["y", "y2", "x", "x2"];
  let res: any = {};
  keys.forEach((k, idx) => {
    res[k] = group[idx];
  });
  return res;
}

/**
 * 验证两个object 是否相同
 * @param {Object} obj  [需要进行验证的数据1]
 * @param {Object} newObj [需要进行验证的数据2]
 */
export function objSame(
  obj: { [x: string]: any },
  newObj: { [x: string]: any }
): boolean {
  let bol = true;
  if (Object.keys(obj).length != Object.keys(newObj).length) {
    return false;
  }
  for (let key in obj) {
    if (obj[key] instanceof Object) {
      bol = objSame(obj[key], newObj[key]);
      if (!bol) {
        break;
      }
    } else if (obj[key] instanceof Array) {
      bol = arrSame(obj[key], newObj[key]);
      if (!bol) {
        break;
      }
    } else if (obj[key] != newObj[key]) {
      bol = false;
      break;
    }
  }
  return bol;
}

/**
 * 验证两个数组是否相同
 * 前提是排序相同
 * @param {Array} arr  [需要进行验证的数据1]
 * @param {Array} newArr [需要进行验证的数据2]
 */
export function arrSame(arr: string | any[], newArr: string | any[]): boolean {
  let bol = true;
  if (arr.length != newArr.length) {
    return false;
  }
  for (let i = 0, n = arr.length; i < n; i++) {
    if (arr[i] instanceof Array) {
      bol = arrSame(arr[i], newArr[i]);
      if (!bol) {
        break;
      }
    } else if (arr[i] instanceof Object) {
      bol = objSame(arr[i], newArr[i]);
      if (!bol) {
        break;
      }
    } else if (arr[i] != newArr[i]) {
      bol = false;
      break;
    }
  }
  return bol;
}
