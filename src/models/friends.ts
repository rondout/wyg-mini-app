import { BaseTimeData, Id } from './index'
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
