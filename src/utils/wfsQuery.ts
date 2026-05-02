import { get } from "./httpRequest";

/**
 * geo网络要素查询
 * @param url 请求地址
 * @param typeName 类型名称（工作空间:图层名称）
 * @returns 返回GeoJson
 */
const queryGeoWFS = async (url: string, typeName: string) => {
  let result: any = {};
  await get(url, {
    service: "WFS",
    version: "1.0.0",
    request: "GetFeature",
    typeName: typeName,
    outputFormat: "application/json",
  }).then((res) => {
    result = res.data;
  });
  return result;
};

/**
 * geo网络要素条件查询
 * @param url 请求地址
 * @param filter 请求条件（类似SQL）
 * @param typeName 类型名称（工作空间:图层名称）
 * @param propertyName 需返回的字段
 * @returns 返回GeoJson
 */
const queryGeoWFSFilter = async (
  url: string,
  filter: string,
  typeName: string,
  propertyName: any = null
) => {
  let result: any = {};
  await get(url, {
    service: "WFS",
    version: "1.0.0",
    CQL_FILTER: filter,
    request: "GetFeature",
    typeName: typeName,
    propertyName: propertyName,
    outputFormat: "application/json",
  }).then((res) => {
    result = res.data;
  });
  return result;
};

/**
 * geo服务资源查询
 * @param url 请求地址
 * @param auth 认证信息（用户名:密码）
 * @returns json
 */
const queryGeoService = async (url: string, auth: string) => {
  let result: any = {};
  await get(
    url,
    {},
    {
      Authorization: "Basic " + btoa(auth),
    }
  ).then((res) => {
    result = res.data;
  });
  return result;
};

export { queryGeoWFS, queryGeoWFSFilter, queryGeoService };
