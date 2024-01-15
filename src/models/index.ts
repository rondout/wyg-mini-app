export type Id = string | number

export interface BaseObject {
  [propName: string]: any
}

export interface BaseData<T extends Id = Id> extends BaseObject {
  _id?: T
  [key: string]: any
}

export interface BaseTimeData<T extends Id = Id> extends BaseData<T> {
  createdAt?: Date
  updatedAt?: Date
}

/**
 * @description 检查传入的是不是空
 * @param data 任意值
 * @returns 返回这个值是不是null、undefined、NaN
 */
export const isEmpty = <T = any>(data: T) => ([null, undefined, '', NaN] as any[]).includes(data)
