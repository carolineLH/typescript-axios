import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

// 工厂函数 实例axios
function createInstance(): AxiosInstance {
  const context = new Axios()
  // 把Axios上面的request方法给instance，同时绑定this
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
