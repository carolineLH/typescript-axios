import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import { isFormData } from '../helpers/util'
import { head } from 'shelljs'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 解构赋值 并且给默认值
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken, withCredentials, onDownloadProgress, onUploadProgress, auth, validateStatus } = config
    // 新建实例
    const request = new XMLHttpRequest()

    // 方法默认要大写 method.toLocaleUpperCase()
    // 类型断言 url不为空，在url后面加上！即可
    request.open(method.toLocaleUpperCase(), url!, true)
    
    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    // 配置函数
    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
  
      if (timeout) {
        request.timeout = timeout
      }
  
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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
  
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
  
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-type']
      }
      
      if (auth) {
        headers['Authorization'] = 'Basic '+ btoa(rawString: auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    // 处理返回的状态码
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
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
