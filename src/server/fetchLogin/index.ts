import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { TOKEN_NAME } from 'global/varible'
import { useNavigate } from 'react-router-dom'
import { client } from 'server'
import cache from 'util/cache'

// 登录
export const useToken = () => {
  const navigate = useNavigate()
  return useMutation(
    (data: { name: string; password: string; verifyCode: string; verifyKey: string }) => {
      return client.post<{ token: string }>({
        url: '/user/api/auth/login',
        data: {
          toLogin: data['name'],
          password: data['password'],
          verifyCode: data['verifyCode'],
          verifyKey: data['verifyKey']
        }
      })
    },
    {
      onSuccess: (data) => {
        if (data) {
          cache.setCache(TOKEN_NAME, data)
          message.success('登录成功，欢迎回来')
          navigate('/home/teach')
        }
      }
    }
  )
}

// 注册
export const useRegister = () => {
  return useMutation(async (data) => {
    return client.post<{ token: string }>({
      url: '/user/api/auth/registry',
      data
    })
  })
}

export const useGetUserInfo = () => {
  return useMutation(async () => {
    return client.get({
      url: '/user/api/user/info'
    })
  })
}

export const useGetCaptcha = () => {
  return useMutation(async () => {
    return client.get({
      url: '/code'
    })
  })
}

export const useGetEmailCode = () => {
  return useMutation(async (email: string) => {
    return client.get({
      url: '/user/api/auth/get-email-code',
      params: {
        email
      }
    })
  })
}
