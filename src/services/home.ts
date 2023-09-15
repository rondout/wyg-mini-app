import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/models'
import { PageLink, PageResponse } from '@/models/response'
import { httpService } from '@/utils/http'

export class HomeService extends httpService {
  public getBanners = () => super.get<BannerItem[]>('/home/banner')

  public getGoodsCatagories = () => super.get<CategoryItem[]>('/home/category/mutli')

  public getHotItems = () => super.get<HotItem[]>('/home/hot/mutli')

  public getHomeGuessLikeItems = (params: PageLink) =>
    super.get<PageResponse<GuessItem>>('/home/goods/guessLike', params)
}

const homeService = new HomeService()

export default homeService
