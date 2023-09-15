import { ref, Ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { BaseResponse } from '@/models/response'

// 公用的
export const useServerData = <T extends BaseResponse>(
  fetchFn: (...rest: any) => Promise<T>,
  defaultValue?: T['result'],
  args: {
    onSuccess?: (data: Ref<T>) => void
    onError?: (error: any) => void
  } = {},
) => {
  const { onSuccess, onError } = args

  type DataType = T['result']
  const data: Ref<DataType> = ref(defaultValue)
  const loading = ref<boolean>(true)

  const triggerFetchFn = async () => {
    loading.value = true
    try {
      const res = await fetchFn()
      // @ts-ignor
      data.value = res?.result
      onSuccess && onSuccess(data.value)
      loading.value = false
    } catch (error) {
      loading.value = false
      onError && onError(error)
    }
  }

  onLoad(() => triggerFetchFn())

  type Result = [Ref<DataType>, Ref<boolean>, () => Promise<void>]
  const result: Result = [data, loading, triggerFetchFn]

  return result
}
