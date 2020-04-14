import { AxiosRequestConfig, AxiosPromise } from "../types";
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      config = config || {};
      config.url = url;
    } else {
      config = url;
    }
    
    return dispatchRequest(config);
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