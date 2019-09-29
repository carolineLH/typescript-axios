import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  // 解构赋值 并且给默认值
  const { data = null, url, method = 'get' } = config
  // 新建实例
  const request = new XMLHttpRequest()
  // 方法默认要大写 method.toLocaleUpperCase()
  request.open(method.toLocaleUpperCase(), url, true)
  request.send(data)
}