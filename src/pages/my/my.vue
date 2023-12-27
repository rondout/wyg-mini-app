<script setup lang="ts">
  import { ref } from 'vue'
  import UserPolicy from "./components/UserPolicy.vue"

  const { safeAreaInsets } = uni.getSystemInfoSync()

console.log({safeAreaInsets})

  const getPhoneBtnRef = ref()
  const confirmedPolicy = ref(false)
  const confirmPopup = ref()
  const policyPopup = ref()

  // const userInfo = ref<any[]>([])
  // const wxUserInfo = ref({})

  interface GtePhoneNumberRespDetail {
    code ?: string;
    encryptedData ?: string;
    iv ?: string;
    errMsg ?: string;
  }

  interface GetPhoneNumberResp {
    detail : GtePhoneNumberRespDetail
  }


  const handlePhoneNumberResp = (e : GetPhoneNumberResp) => {
    console.log('获取手机号', e)
    const { code, encryptedData, iv, errMsg } = e.detail
    if (!code) {
      // 用户没有授权或者授权失败
      uni.showToast({
        title: "授权失败",
        icon: "none"
      })
    } else {
      uni.showToast({
        title: "授权成功",
      })
      uni.navigateTo({
        url: "/pages/index/index"
      })
    }
  }

  const showUserPolicy = () => {
    policyPopup.value.open()
  }

  const hanldeUnConfirmedClick = () => {
    confirmPopup.value.open()
  }

  const handleConfirm = () => {
    confirmedPolicy.value = true
    handleCancel()
  }

  const handleCheckboxChange = (e) => {
    confirmedPolicy.value = e.detail.value.includes('confirmed')
  }

  const handleCancel = () => {
    confirmPopup.value.close()
  }
</script>

<template>
  <view class="my-container"  :style="{ paddingTop: safeAreaInsets!.top + 10 + 'px' }">
    <view class="logo-container">
      <image src="@/static/images/logo-with-text.svg" alt="" style="width: 372rpx; height: 424rpx" />
    </view>
    <view class="login-container">
      <!-- <button @click="handleLogin">Login</button> -->
      <button @tap="hanldeUnConfirmedClick" v-if="!confirmedPolicy">微信登录/注册</button>
      <button v-else open-type="getPhoneNumber" ref="getPhoneBtnRef" @getphonenumber="handlePhoneNumberResp">
        微信登录/注册
      </button>
      <view class="policy-container">
        <label>
          <checkbox-group @change="handleCheckboxChange">
            <checkbox :checked="confirmedPolicy" style="transform: scale(0.7); margin-top: -2rpx" value='confirmed' />
            <text style="color: #86909c">阅读并同意</text>
            <text class="policy-btn" @click.stop="showUserPolicy">《用户协议》</text>
            <text style="color: #86909c">和</text>
            <text class="policy-btn" @click.stop="showUserPolicy">《隐私协议》</text>
          </checkbox-group>
        </label>
      </view>
    </view>
    <uni-popup ref="confirmPopup" type="center">
      <view class="confirm-popup">
        <view class="content">
          <text class='confirm-title'>提示</text>
          <view class="policy-container">
            <text style="color: #86909c">请先同意</text>
            <text class="policy-btn" @click.stop="showUserPolicy">《用户协议》</text>
            <text style="color: #86909c">和</text>
            <text class="policy-btn" @click.stop="showUserPolicy">《隐私协议》</text>
          </view>
        </view>
        <view class="action-btns">
          <button @tap='handleCancel'>取消</button>
          <view class="divider">
          </view>
          <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumberResp" @tap="handleConfirm"
            class="confirm-btn">同意</button>
        </view>
      </view>
    </uni-popup>
    <UserPolicy ref="policyPopup" />
  </view>
</template>

<style lang="scss">
  page {
    background-color: #ededed;
  }

  //
  .my-container {
    height: 100vh;
    padding-bottom: 64rpx;
    // background-color: #ededed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .logo-container {
      width: 100%;
      height: 874rpx;
      // background-color: #;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-container {
      margin-top: 10rpx;
      padding: 0 48rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-bottom: 64rpx;

      button {
        color: #fff;
        background-color: #2a59f2;
        width: 100%;
      }

    }

    .policy-container {
      font-size: 28rpx;
      margin-top: 48rpx;

      .policy-btn {
        color: #2a59f2;
      }
    }

    .confirm-popup {
      width: 540rpx;
      height: 312rpx;
      background-color: #fff;
      border-radius: 8px;

      .content {
        height: 224rpx;
        padding: 40rpx 32rpx;

        .confirm-title {
          color: #000;
          text-align: center;
          width: 100%;
          display: inline-block;
        }

        .policy-container {
          font-size: 28rpx;
          margin-top: 48rpx;

          .policy-btn {
            color: #2a59f2;
          }
        }
      }

      .action-btns {
        border-top: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 88rpx;

        .divider {
          height: 100%;
          border-right: 1px solid #eee;
          width: 0;
        }

        button {
          background-color: #fff;
          font-size: 28rpx;
        }

        .confirm-btn {
          color: #2a59f2
        }
      }
    }
  }
</style>
