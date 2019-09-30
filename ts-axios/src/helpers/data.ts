// 对 request 中的 data 做一层转换 以满足XMLHttpRequest.send(body)中的body参数所需的格式
// 只是对普通类型做转换
import { isPlainObject } from './util'

export function transformRequest (data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

