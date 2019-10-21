import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T>>

  constructor () {
    this.interceptors = []
  }

  use (resolved:ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    // 为了不打乱拦截器内部的顺序，所以把需要删除的拦截器清空，而不是直接从数组中移除
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}