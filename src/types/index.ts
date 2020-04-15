type METHOD = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH';

// 请求参数
export interface AxiosRequestConfig {
  url?: string;
  method?: METHOD;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

// 响应参数
export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

// 返回类型
export interface AxiosPromise extends Promise<AxiosResponse> {

}

// Axios 混合对象
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise;

  get(url: string, config?: AxiosRequestConfig): AxiosPromise;

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise;

  head(url: string, config?: AxiosRequestConfig): AxiosPromise;

  options(url: string, config?: AxiosRequestConfig): AxiosPromise;

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise;
  (url: string, config?: AxiosRequestConfig): AxiosPromise;
}



// 拦截器
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>;
}
export interface RejectedFn {
  (error: any): any;
}
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
  eject(index: number): void;
}

