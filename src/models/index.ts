export interface BaseData {
  id: string
}

/**
 * @description 检查传入的是不是空
 * @param data 任意值
 * @returns 返回这个值是不是null、undefined、NaN
 */
export const isEmpty = <T = any>(data: T) => ([null, undefined, '', NaN] as any[]).includes(data)
