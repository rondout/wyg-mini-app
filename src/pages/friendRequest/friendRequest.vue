<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { FriendRequestInfo } from '@/models/friends'
// import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import friendsService from '@/services/friends'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore()

const state = reactive({
  data: [] as FriendRequestInfo[],
})

const getData = async () => {
  uni.showLoading()
  try {
    const data = await friendsService.getFriendsRequests()
    state.data = data
    uni.hideLoading()
  } catch (error) {
    uni.hideLoading()
  }
}

onMounted(() => {
  //   console.log(10000)
  getData()
})
</script>

<template>
  <scroll-view class="friend-request-container">
    <!-- @vue-ignore -->
    <button type="primary">添加好友</button>
    <view>
      <view v-for="item of state.data" :key="item._id" class="data-item flex-btw">
        <view class="data-item flex-start">
          <view class="avatar-item">{{}}</view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.friend-request-container {
  padding: 32rpx;
  .data-item {
  }
}
</style>
