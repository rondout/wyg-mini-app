import { BaseData, BaseTimeData, Id } from './index'
import { UserInfo } from './users'

export interface FriendRequestInfo extends BaseTimeData {
  from: UserInfo
  to: UserInfo
  accept: boolean
  done: boolean
  msg?: string
}

// 添加好友的请求体信息
export interface MakeFriendsRequestParams {
  from: Id
  to: Id
  msg?: string
}
export interface HandleFriendsRequestParams {
  _id: Id
  accept: boolean
}

// 朋友列表信息
export interface FriendsItemInfo extends UserInfo {
  // 用户的数据库ID
  userId: Id
}
