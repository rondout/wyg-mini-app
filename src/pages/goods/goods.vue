<script lang="ts" setup>
import CustomNavBar from './components//CustomNavBar.vue'
import CommonSwiper from '@/components/CommonSwiper.vue'
import { useServerData } from '@/hooks/useServerData'
import { homeService } from '@/services'
import CatagoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import GuessLike from './components/GuessLike.vue'
import { ref } from 'vue'

const [banners] = useServerData(homeService.getBanners, [])
const [catagories] = useServerData(homeService.getGoodsCatagories, [])
const [hotItems] = useServerData(homeService.getHotItems, [])

const guessLikeRef = ref<InstanceType<typeof GuessLike>>()

const getMoreGuessLike = () => {
  console.log(':more')
  guessLikeRef.value?.getMore()
}
</script>

<template>
  <view class="viewport">
    <CustomNavBar />
    <scroll-view scroll-y @scrolltolower="getMoreGuessLike">
      <CommonSwiper :list="banners" />
      <CatagoryPanel :list="catagories" />
      <HotPanel :list="hotItems" />
      <GuessLike ref="guessLikeRef" />
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
