export interface BaseResponse<T = any> {
  code: string
  msg: string
  result: T
}

export interface PageResponse<T = any> {
  counts: number
  page: number
  pageSize: number
  pages: number
  items: T[]
}

/**
 * @description 最大的安全页码请求
 */
export const MAX_SAFE_PAGE_SIZE = 1000

// 分页查询参数
export interface PageLinkInterface {
  page: number
  pageSize: number
  [propName: string]: any
}

// 分页查询类
export class PageLink<T extends Record<string, any> = Record<string, any>>
  implements PageLinkInterface
{
  constructor(public page: number = 1, public pageSize: number = MAX_SAFE_PAGE_SIZE, rest?: T) {
    try {
      // 如果有传入其它参数  也挂载为实例的属性
      if (rest && typeof rest === 'object')
        Object.entries(rest).forEach(([key, value]) => {
          this[key] = value
        })
    } catch (error) {
      console.log(error)
    }
  }
}
