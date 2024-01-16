<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { FriendRequestInfo } from '@/models/friends'
// import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import friendsService from '@/services/friends'
import { useAuthStore, useFriendsStore } from '@/stores'
import SubTitle from '@/components/texts/SubTitle.vue'
import { Id } from '@/models'

const authStore = useAuthStore()
const friendsStore = useFriendsStore()

type AcceptStatus = '已添加' | '已请求' | '已拒绝' | '被拒绝' | '已同意' | '待处理'

interface DisplayedData extends FriendRequestInfo {
  // 是否是自己发起的
  postBySelf: boolean
  // 展示的头像（现在没头像 用名字第一个字代替）
  avatar: string
  // 用户名
  username: string
  // 添加结果
  acceptStatus: AcceptStatus
}

const state = reactive({
  data: [] as FriendRequestInfo[],
})

const getData = async () => {
  uni.showLoading()
  try {
    const data = await friendsService.getFriendsRequests()
    state.data = data.data
    uni.hideLoading()
  } catch (error) {
    uni.hideLoading()
  }
}

const computedData = computed(() => {
  const currentUserId = authStore.state.currentUser?._id
  return state.data.map((item) => {
    const postBySelf = item.from?._id === currentUserId
    // 如果自己发起的  就展示to里面的信息
    const username = postBySelf ? item.to.username : item.from.username
    const avatar: string = username.toUpperCase().charAt(0)
    let acceptStatus: AcceptStatus
    if (postBySelf) {
      if (item.accept) {
        // 对方已同意
        acceptStatus = '已添加'
      } else if (item.done) {
        acceptStatus = '被拒绝'
      } else {
        acceptStatus = '已请求'
      }
    } else {
      if (item.accept) {
        // 我已同意
        acceptStatus = '已同意'
      } else if (item.done) {
        acceptStatus = '已拒绝'
      } else {
        acceptStatus = '待处理'
      }
    }
    const newItem: DisplayedData = { ...item, postBySelf, avatar, username, acceptStatus }
    return newItem
  })
})

const handleRequest = async (accept: boolean, _id: Id) => {
  try {
    uni.showLoading()
    await friendsService.handleFriendsRequests({ _id, accept })
    uni.hideLoading()
    setTimeout(() => {
      uni.showToast({ title: '操作成功', icon: 'success' })
    }, 500)
    friendsStore.getAllFriends()
    getData()
  } catch (error) {
    uni.showToast({ title: '操作失败', icon: 'error' })
    uni.hideLoading()
  }
}

const handleVerify = (item: FriendRequestInfo) => {
  uni.showModal({
    title: '同意请求',
    content: '验证信息：' + item.msg,
    confirmText: '同意',
    cancelText: '取消',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        handleRequest(true, item._id)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

const handleRefuse = (item: FriendRequestInfo) => {
  uni.showModal({
    title: '拒绝请求',
    content: '确认拒绝该好友请求吗',
    confirmText: '拒绝',
    cancelText: '取消',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        handleRequest(false, item._id)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

onMounted(() => {
  getData()
})
</script>

<template>
  <scroll-view class="friend-request-container">
    <!-- @vue-ignore -->
    <button type="primary">添加好友</button>
    <view style="margin-top: 16px">
      <view v-for="item of computedData" :key="item._id" class="data-item flex-btw">
        <view class="flex-start">
          <view class="avatar-item flex">{{ item.avatar }}</view>
          <view>
            <view>{{ item.username }}</view>
            <SubTitle>{{ item.msg || '-' }}</SubTitle>
          </view>
        </view>
        <view>
          <sub-title v-if="item.acceptStatus !== '待处理'">{{ item.acceptStatus }}</sub-title>
          <view class="flex" v-else>
            <view class="verify-btn" style="margin-right: 16rpx" @click="handleRefuse(item)"
              >拒绝</view
            >
            <view class="verify-btn" @click="handleVerify(item)">同意</view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
.friend-request-container {
  padding: 32rpx;
  .data-item {
    padding: 12rpx;
    border-bottom: 1px solid #eee;
    .avatar-item {
      color: #fff;
      border-radius: 4px;
      background-color: transparentize($uni-color-primary, 0.2);
      height: 72rpx;
      width: 72rpx;
      margin-right: 12rpx;
    }
    .verify-btn {
      font-size: 28rpx;
      color: $uni-color-primary;
    }
  }
}
</style>
