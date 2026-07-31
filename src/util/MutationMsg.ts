import { message } from 'antd'

export const MutationMsg = (action: string) => ({
  onSuccess: () => {
    message.success(`${action}成功`)
  },
  onError: () => {
    message.error(`${action}失败`)
  }
})
