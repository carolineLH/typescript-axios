// 类型判断
// Object.prototype.toString.call(val)可用来判断一些类型
const toString = Object.prototype.toString
// 类型谓词保护 就是保证val一定是个date类型
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// 类型谓词保护 就是保证val一定是个object类型
// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

// 判断普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 做拷贝的辅助函数
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
