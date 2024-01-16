import { FriendsItemInfo } from '@/models/friends'
import friendsService from '@/services/friends'
import { defineStore } from 'pinia'
import { onMounted, reactive } from 'vue'

export const useFriendsStore = defineStore('friends', () => {
  const state = reactive({
    friends: [] as FriendsItemInfo[],
    getFriendsLoading: true,
  })

  const getAllFriends = async () => {
    try {
      state.friends = []
      state.getFriendsLoading = true
      const data = await friendsService.getAllFriends()
      state.getFriendsLoading = false
      state.friends = data.data
    } catch (error) {}
  }

  onMounted(() => {
    getAllFriends()
  })

  return { state, getAllFriends }
})
