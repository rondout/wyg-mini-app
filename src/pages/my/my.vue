<script setup lang="ts">
  import { useMemberStore } from '@/stores'
  import { homeService } from '@/services'
  import { ref } from 'vue'
  import UserPolicy from "./components/UserPolicy.vue"

  const memberStore = useMemberStore()
  const getPhoneBtnRef = ref()
  const confirmedPolicy = ref(false)
  const confirmPopup = ref()
  const policyPopup = ref()

  const userInfo = ref<any[]>([])
  const wxUserInfo = ref({})

  const testRequest = async () => {
    try {
      const data = await homeService.getBanners()
      userInfo.value = data.result
    } catch (error) {
      console.log({ error })
    }
  }

  const callWxLogin = () => {
    uni.showToast({
      title: '测试',
    })
    // uni.getUserProfile({
    //   desc: "请授权",success(info) {
    //     console.log("info_result",info)
    //   }
    // })
    // uni.getUserProfile({
    //   provider: 'weixin',
    //   desc: '获取用户信息',
    //   success(info) {
    //     console.log('用户信息', info)
    //     wxUserInfo.value = info.userInfo
    //     uni.login({
    //       provider: 'weixin',
    //       success(loginResult) {
    //         console.log({ loginResult })
    //         uni.showToast({
    //           title: '成功',
    //         })
    //       },
    //       fail() {
    //         uni.showToast({
    //           title: '失败',
    //           icon: 'error',
    //         })
    //       },
    //     })
    //   },
    //   fail(err) {
    //     console.log('获取用户信息失败', err)
    //   },
    // })
  }

  const handlePhoneNumberResp = (e) => {
    console.log('获取手机号', e)
  }

  const showUserPolicy = () => {
    console.log(11111,policyPopup.value)
    policyPopup.value.open()
  }

  // const handleLogin = () => {
  //   uni.login({
  //     provider: 'weixin',
  //     success(res) {
  //       console.log('LOGIN_RESULT', res)
  //     },
  //   })
  // }

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
  <view class="my-container">
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
            <text class="policy-btn">《隐私协议》</text>
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
            <text class="policy-btn">《隐私协议》</text>
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


    <!-- view>会员信息：{{ memberStore.profile }}
  </view>
  <view>微信用户信息：{{ JSON.stringify(wxUserInfo)}}</view>
  <button @tap="
        memberStore.setProfile({
          nickname: '崔比安尼',
          token: '12345',
        })
      " size="mini" plain type="primary">
    保存用户信息
  </button>
  <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
  <button @tap="testRequest" size="mini" plain type="primary">测试请求</button>
  <button @tap="callWxLogin" size="mini" plain type="primary">测试微信登录</button>
  <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumberResp">getPhoneNumber</button>
  <p v-for="(item, index) of userInfo" :key="index">
    <span>{{ index }}: </span>
    <span>{{ item }}</span>
  </p> -->
  </view>
</template>

<style lang="scss">
  //
  .my-container {
    height: 100vh;
    padding-bottom: 64rpx;
    background-color: #ededed;
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

      button {
        color: #fff;
        background-color: #2a59f2;
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
