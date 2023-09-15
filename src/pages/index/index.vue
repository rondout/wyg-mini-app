<script lang="ts" setup>
import CustomNavBar from './components//CustomNavBar.vue'
import CommonSwiper from '@/components/CommonSwiper.vue'
import { useServerData } from '@/hooks/useServerData'
import { homeService } from '@/services'

const [banners] = useServerData(homeService.getBanners)
</script>

<template>
  <view class="viewport">
    <CustomNavBar />
    <CommonSwiper :list="banners?.result" />
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
