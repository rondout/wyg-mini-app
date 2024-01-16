<script lang="ts" setup>
import { useFriendsStore } from '@/stores'
import { onLoad, onLaunch } from '@dcloudio/uni-app'
import { FriendsItemInfo } from '@/models/friends'

const friendsStore = useFriendsStore()

onLoad(() => {
  friendsStore.getAllFriends()
})

const handleClick = (item: FriendsItemInfo) => {
  uni.navigateTo({ url: '/pages/contacts/detail/detail?userId=' + item.userId })
}
</script>

<template>
  <scroll-view class="container">
    <view
      class="friend-item flex-start"
      @click="handleClick(item)"
      v-for="item of friendsStore.state.friends"
      :key="item._id"
    >
      <view class="avatar-item flex">{{ item.username[0]?.toUpperCase() }}</view>
      <view class="friend-name">{{ item.username }}</view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 32rpx;
  padding-bottom: 120rpx;
  .friend-item {
    padding: 8rpx 32rpx;
    .avatar-item {
      color: #fff;
      border-radius: 4px;
      background-color: transparentize($uni-color-primary, 0.2);
      height: 72rpx;
      width: 72rpx;
      margin-right: 12rpx;
    }
  }
}
</style>
