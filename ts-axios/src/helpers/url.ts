import { isDate, isPlainObject } from './util'

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts:string[] = []
  // foreach中return是不能结束循环的，他只能跳到下一次循环
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }

    // 当val是数组的时候，定义一个数组变量来装val
    let values = []
    if (Array.isArray(val)) {
      // val是数组的时候
      values = val
      key += '[]'
    } else {
      // val不是数组就把他变成一个数组
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    const marIndex = url.indexOf('#')
    // 去除哈希 #
    if (marIndex !== -1) {
      url = url.slice(0, marIndex)
    }
    // 如果url中本来有参数处理
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}