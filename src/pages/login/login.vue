<script lang="ts" setup>
import authService from '@/services/auth'
import SubTitle from '@/components/texts/SubTitle.vue'
import { LoginParams } from '@/models/users'
import { reactive } from 'vue'
import { useAuthStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()
const authStore = useAuthStore()

const state = reactive({
  formData: {} as LoginParams,
})

const handleValidate = () => {
  if (!state.formData.username || !state.formData.password) {
    uni.showToast({
      title: '请输入用户名和密码',
      icon: 'none',
    })
    return false
  }
  return true
}

const handleLoginSuccess = async () => {
  // 登录成功后就应该去跳转到首页
  const result = await authStore.getCurrentUserInfo()
  if (result) {
    uni.switchTab({ url: '/pages/index/index' })
  }
}

const handleLogin = async () => {
  try {
    const isValid = handleValidate()
    if (!isValid) {
      return
    }
    uni.showLoading()
    const result = await authService.login(state.formData)
    // uni.setStorage
    uni.setStorageSync('token', result.data.token)
    uni.showToast({
      title: '登录成功',
    })
    handleLoginSuccess()
    uni.hideLoading()
  } catch (error) {
    uni.showToast({
      icon: 'none',
      title: '登录失败，请输入正确的用户名和密码',
    })
    uni.hideLoading()
  }
}
</script>

<template>
  <scroll-view scroll-y class="login-container">
    <view class="login-content">
      <view class="welcome-container">
        <view>
          <h2 class="welcome-title">欢迎使用Tribiani Chat</h2>
        </view>
        <SubTitle>不止是聊天、期待你发现更多</SubTitle>
      </view>

      <view class="login-form">
        <view class="input-container">
          <input placeholder="请输入账号" v-model="state.formData.username" />
        </view>
        <view class="input-container">
          <input placeholder="请输入密码" v-model="state.formData.password" />
        </view>
      </view>

      <view class="login-btn-container">
        <button class="login-btn" @click="handleLogin">登录</button>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
page {
  height: 100%;
}

.login-container {
  background-color: transparentize($uni-color-primary, 0.9);
  height: 100%;

  .login-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .welcome-container {
    padding: 32rpx;
    .welcome-title {
      margin-top: 32rpx;
    }
  }

  .login-form {
    padding: 32rpx;

    .input-container {
      padding: 4rpx 32rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 16rpx;
      height: 82rpx;
      display: flex;
      align-items: center;

      uni-input {
        flex: 1;
        font-size: 24rpx;
      }
    }
  }

  .login-btn-container {
    padding: 32rpx;

    .login-btn {
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
}
</style>
