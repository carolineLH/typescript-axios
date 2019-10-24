import { AxiosTransformer } from "../types";

// 对数据进行转换，对data按照fns函数要求转换
export default function transform(data: any, headers: any, fns: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data
  }
  // 为了后期遍历，所以强制转化为数组
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}