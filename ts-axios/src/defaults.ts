import { AxiosRequestConfig } from './types'

// 默认是get请求 common字段针对所有， 让所有请求带有Accept
const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,
  
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults