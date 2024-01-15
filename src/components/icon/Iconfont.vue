<script lang="ts" setup>
import { CSSProperties, computed, toValue } from 'vue'

const props = defineProps<{
  icon: string
  size?: number
  primary?: boolean
  color?: string
  mr?: number
  mt?: number
}>()

const className = computed(() => {
  let value = 'iconfont icon-' + props.icon
  if (props.primary) {
    value += ' primary-icon'
  }
  return value
})

const computedStyle = computed(() => {
  const value: CSSProperties = {}
  if (props.size) {
    value.fontSize = props.size + 'rpx'
  }
  if (props.color) {
    value.color = props.color
  }
  if (props.mr) {
    value.marginRight = props.mr * 4 + 'px'
  }
  if (props.mt) {
    value.marginTop = props.mt * 4 + 'px'
  }
  return value
})
</script>

<template>
  <i :class="className" :style="computedStyle"></i>
</template>

<style lang="scss" scoped>
.primary-icon {
  color: $uni-color-primary;
}
.iconfont {
  font-size: 32rpx;
}
</style>
