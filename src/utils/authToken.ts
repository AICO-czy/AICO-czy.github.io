import JSEncrypt from "jsencrypt";
import { get, post } from "./httpRequest";
const jsEncrypt = new JSEncrypt();

/**
 * 获取iserverToken
 * @argument api iserver代理地址
 * @argument userName iserver登录名
 * @argument password iserver登录密码
 */
export const getToken = async (
  api: string,
  userName: string,
  password: string
) => {
  let token = null;
  await post(
    `${api}/services/security/tokens.rjson`,
    {},
    {
      userName: userName,
      password: password,
      clientType: "Referer",
      referer: window.location.origin,
      expiration: 60,
    }
  )
    .then((res) => {
      token = res.data;
    })
    .catch((err) => {});
  return token;
};

/**
 * iserver用户登录
 * @argument  api iserver代理地址
 * @argument  userName iserver登录名
 * @argument password iserver登录密码
 */
export const iserverLogin = async (
  api: string,
  userName: string,
  password: string
) => {
  var result = false;
  await post(
    `${api}/services/security/login.rjson`,
    {},
    {
      userName: userName,
      password: password,
      rememberme: false,
    }
  )
    .then((res) => {
      result = res.data.succeed;
    })
    .catch((err) => {});
  return result;
};

/**
 * 获取公开秘钥
 * @param api 接口名称
 */
export const getPubKey = async (api: string) => {
  let result: any;
  await get(`${api}/user/auth/publicKey`, {})
    .then((res) => {
      jsEncrypt.setPublicKey(res.data.data.publicKey);
      result = res.data.data.publicKey;
    })
    .catch((err) => {});
  return result;
};

/**
 * 加密登录
 * @param api 接口名称
 */
export const requestLoginEncrypt = async (api: string, params: any) => {
  let result: any;
  let timestamp = Math.floor(new Date().getTime() / 1000);
  params.loginName = jsEncrypt.encrypt(params.loginName);
  params.loginPwd = jsEncrypt.encrypt(params.loginPwd);
  await post(
    `${api}/user/auth/encrypted/login`,
    {
      _t: timestamp,
    },
    params
  )
    .then((res) => {
      if (res.data.data) {
        result = res.data.data;
      }
    })
    .catch((err) => {});
  return result;
};
