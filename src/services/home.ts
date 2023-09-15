import type { BannerItem } from '@/models'
import { httpService } from '@/utils/http'

export class HomeService extends httpService {
  public getBanners = () => super.get<BannerItem[]>('/home/banner')
}

const homeService = new HomeService()

export default homeService
