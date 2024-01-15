import { BaseData } from '.'

// 权限枚举
export enum Authority {
  // 管理员
  ADMIN = 'ADMIN',
  // 用户
  USER = 'USER',
}

export const AuthorityMap = new Map([
  [Authority.ADMIN, { title: '管理员', icon: '' }],
  [Authority.USER, { title: '用户', icon: '' }],
])

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const UserGenderMap = new Map([
  [UserGender.MALE, { title: '男', icon: 'male' }],
  [UserGender.FEMALE, { title: '女', icon: 'female' }],
])

export interface UserInfo extends BaseData {
  username: string
  age: number
  gender: UserGender
  authority: Authority
}

export interface LoginParams {
  username: string
  password: string
}
