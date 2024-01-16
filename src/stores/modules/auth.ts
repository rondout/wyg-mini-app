import { UserInfo } from '@/models/users'
import authService from '@/services/auth'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    currentUser: null as UserInfo,
    getAuthLoading: true,
  })

  const isLogin = computed(() => !!state.currentUser?._id)

  const getCurrentUserInfo = async () => {
    try {
      state.getAuthLoading = true
      const result = await authService.getCurrentUserInfo()
      state.getAuthLoading = false
      state.currentUser = result.data
      return true
    } catch (error) {
      state.currentUser = null
      state.getAuthLoading = false
      uni.redirectTo({ url: '/pages/login/login' })
      return false
    }
  }

  const firstNameLetter = computed(() => {
    return state.currentUser?.username?.charAt(0)?.toUpperCase() || ''
  })

  const handleLogout = () => {
    state.currentUser = null
    uni.setStorageSync('token', null)
    uni.reLaunch({ url: '/pages/login/login' })
  }

  return { getCurrentUserInfo, isLogin, state, firstNameLetter, handleLogout }
})

// export interface Profile {
//   account?: string
//   avatar?: string
//   id?: string
//   mobile?: string
//   nickname?: string
//   token?: string
// }

// 定义 Store
// export const useAuthStore = defineStore(
//   'auth',
//   () => {
//     // 会员信息
//     const profile = ref<Profile>()

//     // 保存会员信息，登录时使用
//     const setProfile = (val: Profile) => {
//       profile.value = val
//     }

//     // 清理会员信息，退出时使用
//     const clearProfile = () => {
//       profile.value = undefined
//     }

//     // 记得 return
//     return {
//       profile,
//       setProfile,
//       clearProfile,
//     }
//   },
//   // TODO: 持久化
//   {
//     // persist: true,
//     persist: {
//       storage: {
//         getItem(key) {
//           return uni.getStorageSync(key)
//         },
//         setItem(key, value) {
//           uni.setStorageSync(key, value)
//         },
//       },
//     },
//   },
// )
