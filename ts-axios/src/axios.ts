import { AxiosStatic, AxiosResponse, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

// 工厂函数 实例axios
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 把Axios上面的request方法给instance，同时绑定this
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

// 传入默认配置
const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
