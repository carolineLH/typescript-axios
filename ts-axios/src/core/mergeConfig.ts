import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/util";

const strats = Object.create(null)
// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

// 对header对象进行合并
function deepMergeStrat(val1: any, val2: any): any {
  // 因为val2可能是对象也可能是普通值,所以要类型判断
  if(isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if(isPlainObject(val1)) {
    // 为什么要merge呢，因为不想跟原来的val1是一个引用
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']
// 对于'url', 'params', 'data'这三个参数，默认是取config2的
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

// headers使用深拷贝合并策略
const stratKeysDeepMerge = ['headers', 'auth']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config  = Object.create(null)

  for(let key in config2) {
    mergeField(key)
  }

  for(let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    // 定义了一个strat变量
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  
  return config
}