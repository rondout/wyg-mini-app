import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Profile {
  account: string
  avatar: string
  id: string
  mobile: string
  nickname: string
  token: string
}

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<Profile>()

    // 保存会员信息，登录时使用
    const setProfile = (val: Profile) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // persist: true,
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
