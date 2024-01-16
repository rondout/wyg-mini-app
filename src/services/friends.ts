import { httpService } from '@/utils/http'
import { FriendRequestInfo, FriendsItemInfo, HandleFriendsRequestParams } from '@/models/friends'
import { Id } from '@/models'
import { UserInfo } from '@/models/users'

export class FriendsService extends httpService {
  public getFriendsRequests = () => super.get<FriendRequestInfo[]>('/api/friendRequest/aboutMe')

  public handleFriendsRequests = (data: HandleFriendsRequestParams) =>
    super.post('/api/friendRequest/handle', data)

  public getAllFriends = () => super.get<FriendsItemInfo[]>('/api/friends')

  public getFriendDetailById = (_id: Id) => super.get<UserInfo>('/api/friends/' + _id)
}

const friendsService = new FriendsService()

export default friendsService
