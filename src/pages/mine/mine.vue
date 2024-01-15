<script lang="ts" setup>
import { UserGenderMap, AuthorityMap } from '@/models/users'
import { useAuthStore } from '@/stores'
import { computed } from 'vue'
import Iconfont from '@/components/icon/Iconfont.vue'
import { FunctionBarEnum, FunctionBars } from '@/models/mine'

const authStore = useAuthStore()

const currentUser = computed(() => authStore.state.currentUser)

const handleLogout = () => authStore.handleLogout()

const handleFunctionClick = (key: FunctionBarEnum) => {
  switch (key) {
    case FunctionBarEnum.FRIENDS_REUQEST:
      uni.navigateTo({ url: '/pages/friendRequest/friendRequest' })
      break
    default:
      break
  }
}
</script>

<template>
  <view class="mine-container">
    <view class="top-container">
      <view class="top-content">
        <view class="profile-info flex-start full-height">
          <view class="avatar-circle flex"> {{ authStore.firstNameLetter }} </view>
          <view class="flex-start">
            <view>{{ currentUser?.username }}</view>
            <view v-if="currentUser?.gender" class="gender-info flex-start">
              <view>{{ UserGenderMap.get(currentUser?.gender)?.title }}</view>
              <Iconfont :icon="UserGenderMap.get(currentUser?.gender)?.icon" />
            </view>
            <view class="role-info">{{ AuthorityMap.get(currentUser?.authority)?.title }}</view>
          </view>
        </view>
      </view>
    </view>
    <scroll-view class="content-container">
      <view
        v-for="item of FunctionBars"
        :key="item.key"
        @click="handleFunctionClick(item.key)"
        class="function-item flex flex-btw full-width"
      >
        <view class="flex-start">
          <Iconfont :mt="0.5" :mr="2" :size="40" :icon="item.icon" />
          <view>{{ item.title }}</view>
        </view>
        <!-- <view>好</view> -->
        <Iconfont icon="more" />
      </view>
      <button @tap="handleLogout" class="logout-btn">退出登录</button>
    </scroll-view>
  </view>
</template>

<style lang="scss" scoped>
.mine-container {
  .top-container {
    height: 450rpx;
    background-image: linear-gradient(
      to bottom,
      transparentize($uni-color-primary, 0.75),
      transparent
    );
    padding: 32rpx;
    display: flex;
    align-items: flex-end;
    .top-content {
      flex: 1;
      height: 250rpx;
      background-color: $uni-color-primary;
      border-radius: 12px;
      background-image: linear-gradient(207deg, #6b7bcf, #ccd1ec);
      position: relative;
      .profile-info {
        // display: ;
        color: #fff;
        padding: 32rpx;
        .avatar-circle {
          width: 164rpx;
          height: 164rpx;
          background-color: $uni-color-primary;
          border-radius: 50%;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          position: absolute;
          top: -82rpx;
          left: 82rpx;
          font-size: 64rpx;
        }
        .gender-info {
          font-size: 24rpx;
          margin: 0 16px;
        }
        .role-info {
          font-size: 24rpx;
        }
      }
    }
  }
  .content-container {
    padding: 32rpx;
    .function-item {
      border-bottom: 1px solid #eee;
      padding: 24rpx 0;
    }
    .logout-btn {
      background-color: #fff;
      color: red;
      margin-top: 64rpx;
    }
    .logout-btn::after {
      width: 198%;
      border-color: red;
    }
  }
}
</style>
