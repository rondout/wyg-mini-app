export interface BaseData {
  id: string
}

export interface BannerItem extends BaseData {
  /** 跳转链接 */
  hrefUrl: string
  /** id */
  /** 图片链接 */
  imgUrl: string
  /** 跳转类型 */
  type: number
}
