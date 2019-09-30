import { AxiosRequestConfig, AxiosPromise } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise  {
  return new Promise((resolve) => {
    // 解构赋值 并且给默认值
    const { data = null, url, method = 'get', headers, responseType } = config
    // 新建实例
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    // 方法默认要大写 method.toLocaleUpperCase()
    request.open(method.toLocaleUpperCase(), url, true)
    request.onreadystatechange = function handleLoad () {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
    }
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}