import { BaseResponse } from '@/models/response'
import { useAuthStore } from '@/stores'
import { envVars } from './environmentVar'

// 小兔鲜后台服务地址
// export const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
export const baseURL = envVars.api_url

// 超时时间 10秒
export const timeout = 10000

const interceptor: UniApp.InterceptorOptions = {
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 设置超时时间
    options.timeout = timeout
    // 设置请求头
    options.header = {
      ...options.header,
      // 后端接口需要知道的请求头
      'source-client': 'miniapp',
    }
    // 4. 添加 token 请求头标识
    // const authStore = useAuthStore()
    // const token = authStore.profile?.token
    const token = uni.getStorageSync('token')
    if (token) {
      options.header.token = token
    }
  },
}

uni.addInterceptor('request', interceptor)
uni.addInterceptor('upload', interceptor)

export type UniRequestParams = string | AnyObject | ArrayBuffer | undefined

export class httpService {
  constructor() {}
  /**
   *
   * @param method 请求的类型
   * @param url 请求的URL
   * @param data 请求体
   * @returns {Promise<BaseResponse<T>>} 返回结果
   */
  private sendRequest<T = any, P extends UniRequestParams = UniRequestParams>(
    method: UniApp.RequestOptions['method'],
    url: string,
    data?: P,
  ): Promise<BaseResponse<T>> {
    return new Promise<BaseResponse<T>>((resolve, reject) => {
      uni.request({
        method,
        url,
        data,
        success(res) {
          // 状态码 2xx， axios 就是这样设计的
          if (res.statusCode >= 200 && res.statusCode < 300) {
            // 2.1 提取核心数据 res.data
            // @ts-ignore
            if (res.data?.code === 200) {
              resolve(res.data as BaseResponse<T>)
            } else {
              reject(res.data)
            }
          } else if (res.statusCode === 401) {
            // 401错误  -> 清理用户信息，跳转到登录页
            const authStore = useAuthStore()
            // authStore.clearProfile()
            // uni.navigateTo({ url: '/pages/login/login' })
            reject(res)
          } else {
            // 其他错误 -> 根据后端错误信息轻提示
            uni.showToast({
              icon: 'none',
              // @ts-ignore
              title: (res.data as BaseResponse<P>).data?.errorMsg || '请求错误',
            })
            reject(res)
          }
        },
        fail(err) {
          uni.showToast({
            icon: 'none',
            title: '网络错误，换个网络试试',
          })
          reject(err)
        },
      })
    })
  }

  protected get<T = any, P extends UniRequestParams = UniRequestParams>(url: string, data?: P) {
    return this.sendRequest<T>('GET', url, data)
  }

  protected post<T = any, P extends UniRequestParams = UniRequestParams>(url: string, data?: P) {
    return this.sendRequest<T>('POST', url, data)
  }

  protected put<T = any, P extends UniRequestParams = UniRequestParams>(url: string, data?: P) {
    return this.sendRequest<T>('PUT', url, data)
  }

  protected delete<T = any, P extends UniRequestParams = UniRequestParams>(url: string, data?: P) {
    return this.sendRequest<T>('DELETE', url, data)
  }
}
