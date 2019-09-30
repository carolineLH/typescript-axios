// 所有公共的类型定义文件

export type Method = 'get' | 'GET' | 'delete' | 'Delete' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?:Method
  data?:any
  params?:any
  headers?:any
  responseType?:XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// axios函数返回对象类型
export interface AxiosPromise extends Promise<AxiosResponse>{

}