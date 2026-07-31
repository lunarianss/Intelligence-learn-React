import { useMutation } from '@tanstack/react-query'
import { client } from 'server'

export const useUpdateUserInfo = () => {
  // const queryClient = useQueryClient()
  return useMutation(
    (data: { name: string; sex: number; personalSignature: string }) => {
      return client.put({ url: `/user/update`, data: data })
    },
    {
      // onSuccess:queryClient.refetchQueries([`classList-${courseId}`])
    }
  )
}
