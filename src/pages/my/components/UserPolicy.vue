<script lang="ts" setup>
  import { userPolicyContentUrl } from "@/models/config"
  import { defineExpose, ref } from "vue"

  const policyPopup = ref()

  const open = () => {
    policyPopup.value.open()
  }

  const close = () => {
    policyPopup.value.close()
  }

  defineExpose({ open, close })
</script>

<template>
  <uni-popup ref="policyPopup" type="center">
    <view class='container'>
      <view class='content'>
        <view class="title">《用户协议与隐私协议》</view>
        <scroll-view class="text-container" :scroll-y="true">
          1.本服务作为文渊阁用户中台在线服务的组成部分，如您拟使用本服务的全部或部分，您应当阅读并遵守本协议以及现有的及后续可能增加的适用于文渊阁用户中台在线服务的所有服务的文渊阁用户中台在线服务系列协议（包括但不限于《文渊阁用户中台隐私保护政策》等，文渊阁用户中台在线服务系列协议内容均以文渊阁用户中台网站展示并有可能被不时更新的内容为准），请您务必审慎阅读、充分理解该等协议、规则各条款内容，特别是限制或免除责任的相应条款（限制或免除责任的相应条款可能以黑体加粗形式提示您注意）。如果您需开通或使用本服务项下某项具体服务，请您务必提前阅读并同意适用于该项具体服务的相应条款或单独协议（如有）。除非您已阅读并接受上述该等协议的所有条款，否则您无权使用本服务的任何部分或全部。
          2.即便您没有点击同意本协议，下述行为也将视为您对本协议及文渊阁用户中台在线服务系列协议所有条款的认可：
          2.1.点击登录本服务或；
          2.2.实际使用本服务或；
          2.3.实际使用文渊阁用户中台连同本服务一并提供的任何产品或服务（如有）；
          2.4.实际使用第三方连同本服务一并提供的任何产品或服务（如有）。
          3.您继续之前，文渊阁用户中台强烈建议您打印或在本地保存本协议作为备案。
          4.您对本协议的同意即视为您已知悉并同意本协议全部条款并且您保证能够完全遵守本协议。
          2.4.实际使用第三方连同本服务一并提供的任何产品或服务（如有）。
          3.您继续之前，文渊阁用户中台强烈建议您打印或在本地保存本协议作为备案。
          4.您对本协议的同意即视为您已知悉并同意本协议全部条款并且您保证能够完全遵守本协议。
        </scroll-view>
        <button @tap="close" class="unconfirm-btn">不同意></button>
        <button @tap="close" class="confirm-btn">同意并继续</button>
      </view>
    </view>
  </uni-popup>
</template>


<style lang="scss">
  .container {
    // max-height: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;


    .content {
      padding: 48rpx;
      // max-height: 85vh;
      background-color: #fff;
      border-radius: 8px;
      width: 80%;

      .title {
        color: #000;
        font-size: 32rpx;
        text-align: center;
        margin-bottom:32rpx;
      }

      .text-container {
        font-size: 24rpx;
        color: #666;
        margin-bottom: 32rpx;
        max-height: calc(85vh - 300rpx);
      }
      .confirm-btn {
        color:#fff;
        background-color:#2F54EB;
      }
      .unconfirm-btn {
        color:#999;
        background-color:transparent;
      }
    }
  }
</style>
