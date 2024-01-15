<script lang="ts" setup>
import { useAuthStore } from '../../stores/index'
import { watch } from 'vue'
const authStore = useAuthStore()

uni.showLoading()

watch(
  () => [authStore.isLogin, authStore.state.getAuthLoading],
  ([isLogin]) => {
    console.log({ isLogin })
    if (isLogin && !authStore.state.getAuthLoading) {
      console.log(1)
      // 如果认证成功
      uni.hideLoading()
      uni.switchTab({ url: '/pages/index/index' })
    } else if (!authStore.state.getAuthLoading) {
      console.log(122)
      // 如果认证失败
      uni.hideLoading()
      uni.redirectTo({ url: '/pages/login/login' })
    }
  },
  {
    immediate: true,
  },
)
</script>

<template></template>

<style lang="scss" scoped></style>
