<script setup lang="ts">
  // const props = defineProps<{}>()
</script>


<template>
  <text class="subtitle">
    <slot></slot>
  </text>
</template>

<style lang="scss">
  .subtitle {
    color: $uni-text-color-grey;
    font-size: 24rpx
  }
</style>
