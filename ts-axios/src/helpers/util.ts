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

// 判断formData
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

// 做拷贝的辅助函数
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

// 深拷贝就是进行递归
export function deepMerge(...objs: any[]) {
  const result = Object.create(null)

  objs.forEach(obj => {
    if(obj) {
      // Object.keys(obj)拿到，每个对象里面的key
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        // 假如val仍然是个对象
        if(isPlainObject(val)) {
          // 假如result[key]对象已经有了，就进行合并
          if(isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  
  return result
}