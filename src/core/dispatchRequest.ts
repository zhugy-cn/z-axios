import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import xhr from "./xhr";
import { buildURL } from "../helpers/url";
import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(response => {
    return transformResponseData(response);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

// 处理 url 参数
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

// 处理 post 方法的 data 参数
function transformRequestData(config: AxiosRequestConfig): void {
  return transformRequest(config.data);
}

// 处理 post 方法的 Content-Type
function transformHeaders(config: AxiosRequestConfig): void {
  let { headers = {}, data } = config;
  return processHeaders(headers, data);
}

// 处理返回的 data 数据
function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transformResponse(response.data);
  return response;
}

export default dispatchRequest;