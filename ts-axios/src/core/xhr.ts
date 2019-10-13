import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 解构赋值 并且给默认值
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    // 新建实例
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    // 方法默认要大写 method.toLocaleUpperCase()
    // 类型断言 url不为空，在url后面加上！即可
    request.open(method.toLocaleUpperCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      // 发生了网络错误或者是超时错误
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    // 处理返回的状态码
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        // 200-300 之间的 HTTP 状态码处理
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
