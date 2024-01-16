<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FriendsItemInfo } from '@/models/friends'
import friendsService from '@/services/friends'

const route = useRoute()

const state = reactive({
  detail: {} as FriendsItemInfo,
})

const init = async () => {
  const _id = route.query.userId
  console.log(_id)
  if (!_id) {
    return
  }
  try {
    uni.showLoading()
    uni.setNavigationBarTitle({ title: '' })
    const data = await friendsService.getFriendDetailById(_id)
    uni.setNavigationBarTitle({ title: data.data.username })
    state.detail = data.data
    uni.hideLoading()
  } catch (error) {
    uni.hideLoading()
  }
}

watch(
  () => route.query.userId,
  () => {
    init()
  },
  { immediate: true },
)
</script>

<template>
  <view class="container flex flex-column">
    <scroll-view scroll-y class="msg-content"> </scroll-view>
    <view class="footer flex-start full-width">
      <view class="input-box">
        <input class="msg-input" type="text" />
      </view>
      <view class="send-item"> 发送 </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
page {
  height: 100%;
}
.container {
  background-color: transparentize($uni-color-primary, 0.9);
  height: 100%;
  .msg-content {
  }
  .footer {
    height: 110rpx;
    padding: 24rpx 24rpx 12rpx;
    .input-box {
      flex: 1;
      border-radius: 4px;
      background-color: #fff;
      .msg-input {
        height: 64rpx;
        padding: 0 8px;
      }
    }
    .send-item {
      color: $uni-color-primary;
      font-size: 28rpx;
      margin-left: 16rpx;
    }
  }
}
</style>
