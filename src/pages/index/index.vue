<script lang="ts" setup>
import { useFriendsStore } from '@/stores'

const friendsStore = useFriendsStore()
</script>

<template>
  <scroll-view class="container">
    <h1>{{ friendsStore.state.friends.map((v) => v.username) }}</h1>
  </scroll-view>
</template>

<style lang="scss" scoped>
.container {
  padding-bottom: 120rpx;
}
</style>
