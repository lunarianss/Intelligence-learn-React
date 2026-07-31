import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { GlobalMessage } from 'publicComponents/GlobalMessage'

const DEBUGINFO = process.env.NODE_ENV == 'development' ? '错误：' : ''

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks
}

interface Data<T> {
  code: string
  msg: boolean
  data: T
}

class Request {
  config: AxiosRequestConfig
  interceptorHooks?: InterceptorHooks
  instance: AxiosInstance

  constructor(options: RequestConfig) {
    this.config = options
    this.interceptorHooks = options.interceptorHooks
    this.instance = axios.create(options)
    this.setupInterceptor()
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, Data<T>>(config)
        .then((res) => {
          if (res.code != '200') {
            GlobalMessage('error', `${DEBUGINFO}${res.msg}`)
            reject(res.msg)
          } else {
          }
          resolve(res.data)
        })
        .catch((err) => {
          GlobalMessage('error', '网络错误')
          reject(err)
        })
    })
  }

  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  put<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PUT' })
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
