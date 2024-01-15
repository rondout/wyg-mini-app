import { httpService } from '@/utils/http'
import { FriendRequestInfo } from '@/models/friends'

export class FriendsService extends httpService {
  public getFriendsRequests = () => super.get<FriendRequestInfo[]>('/api/friendRequest/aboutMe')
}

const friendsService = new FriendsService()

export default friendsService
