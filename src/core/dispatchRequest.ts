import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import xhr from "./xhr";
import { buildURL } from "../helpers/url";
import { transformResponse } from "../helpers/data";
import { flattenHeaders } from "../helpers/headers";
import transform from "./transform";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(response => {
    return transformResponseData(response);
  });
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  let { data, headers, transformRequest } = config;
  config.data = transform(data, headers, transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
}

// 处理 url 参数
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

// 处理返回的 data 数据
function transformResponseData(response: AxiosResponse): AxiosResponse {
  response.data = transform(response.data, response.headers, response.config.transformResponse);
  return response;
}

export default dispatchRequest;