<script lang="ts" setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onShow(() => {
  console.log(import.meta.env.VITE_API_URL)
})
</script>

<template>
  <h1>This is Index page</h1>
</template>

<style lang="less" scoped></style>
