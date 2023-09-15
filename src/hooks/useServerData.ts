import { ref, Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 公用的
export const useServerData = <T>(
  fetchFn: (...rest: any) => Promise<T>,
  onSuccess?: (data: Ref<T>) => void,
  onError?: (error: any) => void,
) => {
  const data = ref<T>(null)
  const loading = ref<boolean>(true)

  const triggerFetchFn = async () => {
    loading.value = true
    try {
      const res = await fetchFn()
      // @ts-ignore
      data.value = res
      onSuccess && onSuccess(data as Ref<T>)
      loading.value = false
    } catch (error) {
      loading.value = false
      onError && onError(error)
    }
  }

  onLoad(() => triggerFetchFn())

  type Result = [Ref<T>, Ref<boolean>, () => Promise<void>]
  const result: Result = [data as Ref<T>, loading, triggerFetchFn]

  return result
}
