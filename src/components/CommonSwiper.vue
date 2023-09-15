<script lang="ts" setup>
import { BannerItem } from '@/models'
import { reactive } from 'vue'

const state = reactive({
  active: null as number,
})

const onChange: UniHelper.SwiperOnChange = (ev) => {
  state.active = ev.detail.current
}

const handleClickDot = (index: number) => {
  state.active = index
}

defineProps<{ list: BannerItem[] }>()
</script>

<template>
  <view class="carousel">
    <swiper
      :circular="true"
      :indicator-dots="false"
      indicator-active-color="#fff"
      :autoplay="true"
      :current="state.active"
      :interval="3000"
      @change="onChange"
    >
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        @click="handleClickDot(index)"
        :class="{ active: index === state.active }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 轮播图 */
.carousel {
  height: 280rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
