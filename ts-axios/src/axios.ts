import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

// 工厂函数 实例axios
function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 把Axios上面的request方法给instance，同时绑定this
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

// 传入默认配置
const axios = createInstance(defaults)

export default axios
