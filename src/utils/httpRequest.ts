import Request from "axios";
import qs from "qs";
let cancels: any[] = [];

/**
 * http get
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns promise
 */
export function get(
  url: any,
  params: any,
  headers: any = null,
  timeout: number = 0
) {
  return Request({
    url: url,
    method: "get",
    params:params,
    paramsSerializer:function(params:any){
      return qs.stringify(params,{arrayFormat:"repeat"})
    },
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http post
 *
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} data
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function post(
  url: any,
  params: any,
  data: any,
  headers: any = null,
  timeout: number = 0
) {
  return Request({
    url: url,
    method: "post",
    params: params,
    data: data,
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http postForm
 *
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} data
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function postForm(
  url: any,
  params: any,
  data: any,
  headers: any = null,
  timeout: number = 0
) {
  return Request({
    url: url,
    method: "post",
    params: params,
    data,
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http put
 *
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} data
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function put(
  url: any,
  params: any,
  data: any,
  headers: any = null,
  timeout: number = 0
) {
  return Request({
    url: url,
    method: "put",
    params: params,
    data: data,
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http get
 * cancel
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function cancelGet(
  url: any,
  params: any,
  headers: any = null,
  timeout: number = 0
) {
  const CancelToken = Request.CancelToken;
  let key: any = null;
  if (params !== undefined && params.hasOwnProperty("cancelKey")) {
    key = params.cancelKey;
    delete params.cancelKey;
  }
  return Request({
    url: url,
    method: "get",
    params: params,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push({
        key: key,
        c: c,
      }); //存储cancle
    }),
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http post
 * cancel
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} data
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function cancelPost(
  url: any,
  params: any,
  data: any,
  headers: any = null,
  timeout: number = 0
) {
  const CancelToken = Request.CancelToken;
  let key: any = null;
  if (params !== undefined && params.hasOwnProperty("cancelKey")) {
    key = params.cancelKey;
    delete params.cancelKey;
  }
  return Request({
    url: url,
    method: "post",
    params: params,
    data: data,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push({
        key: key,
        c: c,
      }); //存储cancle
    }),
    headers: headers,
    timeout: Number(timeout),
  });
}

/**
 * http postForm
 * cancel
 * @export
 * @param {*} url
 * @param {*} params
 * @param {*} data
 * @param {*} [headers=null]
 * @param {number} [timeout=0]
 * @returns
 */
export function cancelPostForm(
  url: any,
  params: any,
  data: any,
  headers: any = null,
  timeout: number = 0
) {
  const CancelToken = Request.CancelToken;
  let key: any = null;
  if (params !== undefined && params.hasOwnProperty("cancelKey")) {
    key = params.cancelKey;
    delete params.cancelKey;
  }
  return Request({
    url: url,
    method: "post",
    params: params,
    data,
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        ret = ret.slice(0, -1);
        return ret;
      },
    ],
    cancelToken: new CancelToken(function executor(c) {
      cancels.push({
        key: key,
        c: c,
      }); //存储cancle
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

/**
 * 取消方法
 *
 * @export
 * @param {*} [key=null]
 */
export function cancelFun(key: any = null) {
  var funs = cancels.filter((x) => x.key === key);
  funs.forEach((item) => {
    item.c();
    cancels.splice(
      cancels.findIndex((x) => x === item),
      1
    );
  });
}
