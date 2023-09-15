<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { homeService } from '@/services'
import { ref } from 'vue'

const memberStore = useMemberStore()

const userInfo = ref<any[]>([])

const testRequest = async () => {
  try {
    const data = await homeService.getBanners()
    userInfo.value = data.result
  } catch (error) {
    console.log({ error })
  }
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '崔比安尼',
          token: '12345',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
    <button @tap="testRequest" size="mini" plain type="primary">测试请求</button>
    <p v-for="(item, index) of userInfo" :key="index">
      <span>{{ index }}: </span>
      <span>{{ item }}</span>
    </p>
  </view>
</template>

<style lang="scss">
//
</style>
