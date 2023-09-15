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

/** 首页-前台类目数据类型 */
export interface CategoryItem extends BaseData {
  /** 图标路径 */
  icon: string
  /** id */
  /** 分类名称 */
  name: string
}

/** 首页-热门推荐数据类型 */
export interface HotItem extends BaseData {
  /** 说明 */
  alt: string
  /** id */
  id: string
  /** 图片集合[ 图片路径 ] */
  pictures: string[]
  /** 跳转地址 */
  target: string
  /** 标题 */
  title: string
  /** 推荐类型 */
  type: string
}

/** 通用商品类型 */
export interface GoodsItem extends BaseData {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: number
}

// 猜你喜欢
export interface GuessItem extends GoodsItem {}

/**
 * @description 检查传入的是不是空
 * @param data 任意值
 * @returns 返回这个值是不是null、undefined、NaN
 */
export const isEmpty = <T = any>(data: T) => ([null, undefined, '', NaN] as any[]).includes(data)
