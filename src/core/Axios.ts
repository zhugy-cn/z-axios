import { AxiosRequestConfig, AxiosPromise, AxiosResponse, ResolvedFn, RejectedFn } from "../types";
import dispatchRequest from './dispatchRequest'
import InterceptorManager from "./InterceptorManager";
import mergeConfig from "./mergeConfig";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn
}


export default class Axios {
  interceptors: Interceptors;
  defaults: AxiosRequestConfig;

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      config = config || {};
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config)

    const chain: PromiseChain[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      // request 拦截器先添加的后执行
      chain.unshift(interceptor);
    })

    this.interceptors.response.forEach(interceptor => {
      // response 拦截器先添加的先执行
      chain.push(interceptor);
    })

    let promise = Promise.resolve(config);
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected);
    }
    return promise;
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, url, method: 'get' });
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, url, method: 'delete' });
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, url, method: 'head' });
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, url, method: 'options' });
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, data, url, method: 'post' });
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, data, url, method: 'put' });
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    config = config || {} as AxiosRequestConfig;
    return dispatchRequest({ ...config, data, url, method: 'patch' });
  }
}