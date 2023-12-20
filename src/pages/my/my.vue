<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { homeService } from '@/services'
import { ref } from 'vue'

const memberStore = useMemberStore()

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
  uni.getUserProfile({
    provider: 'weixin',
    desc: '获取用户信息',
    success(info) {
      console.log('用户信息', info)
      wxUserInfo.value = info.userInfo
      uni.login({
        provider: 'weixin',
        success(loginResult) {
          console.log({ loginResult })
          uni.showToast({
            title: '成功',
          })
        },
        fail() {
          uni.showToast({
            title: '失败',
            icon: 'error',
          })
        },
      })
    },
    fail(err) {
      console.log('获取用户信息失败', err)
    },
  })
}

const handlePhoneNumberResp = (e) => {
  console.log('获取手机号', e)
}
</script>

<template>
  <view class="my-container">
    <view class="logo-container">
      <image
        src="@/static/images/logo-with-text.svg"
        alt=""
        style="width: 372rpx; height: 424rpx"
      />
    </view>
    <view class="login-container">
      <button open-type="getPhoneNumber" @getphonenumber="handlePhoneNumberResp">
        微信登录/注册
      </button>
      <view class="policy-container">
        <label>
          <checkbox style="transform: scale(0.7); margin-top: -2rpx" :value="1" /><text
            style="color: #86909c"
            >阅读并同意</text
          >
          <text class="policy-btn">《用户协议》</text> <text style="color: #86909c">和</text>
          <text class="policy-btn">《隐私协议》</text>
        </label>
      </view>
    </view>
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

    .policy-container {
      font-size: 28rpx;
      margin-top: 48rpx;
      .policy-btn {
        color: #2a59f2;
      }
    }
  }
}
</style>
