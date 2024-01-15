import { LoginParams, UserInfo } from '@/models/users'
import { httpService } from '@/utils/http'

export class AuthServie extends httpService {
  public login = (data: LoginParams) => super.post<{ token: string }>('/api/auth/login', data)

  public getCurrentUserInfo = () => super.get<UserInfo>('/api/auth/current')
}

const authService = new AuthServie()
export default authService
