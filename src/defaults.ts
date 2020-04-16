import { AxiosRequestConfig } from "./types";
import { processHeaders } from "./helpers/headers";
import { transformResponse, transformRequest } from "./helpers/data";

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'Application/json, text/plain, */*'
    }
  },
  // 将请求数据发送到服务器之前对其进行修改，这只适用于请求方法 put、post 和 patch
  transformRequest: [
    function (data: any, headers: any): any {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  // 把响应数据传递给 then 或者 catch 之前对它们进行修改。
  transformResponse: [
    function (data: any): any {
      return transformResponse(data);
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options'];
methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})


const methodsWithData = ['post', 'put', 'patch'];
methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-type': 'application/x-www-form-urlencoded'
  }
})

export default defaults;