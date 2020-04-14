import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { parseResponseHeaders } from "../helpers/headers";
import { createError } from "../helpers/error";


export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, headers, data = null, method = 'get', responseType, timeout } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url!);
    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    // 设置请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }
      // 超时、断网为0
      if (request.status === 0) {
        return;
      }

      const responseHeaders = parseResponseHeaders(request.getAllResponseHeaders());
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      }
      handleResponse(response);
    }

    // 断网
    request.onerror = function () {
      reject(createError('Network Error', config, null, request));
    }
    // 超时
    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, "ECONNABORTED", request));
    }
    request.send(data);

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request,
          response
        ))
      }
    }
  })
}