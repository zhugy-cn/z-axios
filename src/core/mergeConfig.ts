import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/util";

const strategies = Object.create(null);


// 默认合并策略，config2 有值就用 config2 的值，不然就用 config1 的值
function defaultStrategy(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1;
}


// url、params、data 的合并策略
const strategyKeysFromVal2 = ['url', 'params', 'data']
function fromVal2Strategy(val1: any, val2: any): any {
  if (val2 !== undefined) {
    return val2;
  }
}
strategyKeysFromVal2.forEach(key => {
  strategies[key] = fromVal2Strategy;
})



const strategyKeysFromDeepMerge = ['headers', 'auth']
function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 === 'undefined') {
    return val1
  }
}
strategyKeysFromDeepMerge.forEach(key => {
  strategies[key] = deepMergeStrategy;
})



export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }
  const config = Object.create(null);

  for (const key in config2) {
    // 相当于用 config2 覆盖 config1
    mergeField(key);
  }

  for (const key in config1) {
    // config2 没有而 config1 有的用 config1 的值
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategies[key] || defaultStrategy;
    config[key] = strategy(config1[key], config2![key])
  }
  return config;
}