import { useForm } from 'antd/es/form/Form'
import LoginLayout from 'publicComponents/LoginLayout'
import { useEffect, useRef } from 'react'
import { useGetCaptcha, useToken } from 'server/fetchLogin'
import LocalCache from 'util/cache'

const LoginPage = () => {
  /* 获取验证码API */
  const { data: captchaData, mutateAsync: getCaptchaApi } = useGetCaptcha()
  const { mutateAsync: login, isLoading: loginLoading } = useToken()
  const [form] = useForm()
  const sid = useRef()
  const refresh = async () => {
    const s = await getCaptchaApi()
    sid.current = s.verifyKey
  }

  useEffect(() => {
    refresh()
  }, [])

  /* 登录逻辑处理 */
  const onFinish = async (userLoginInfo: any) => {
    if (!userLoginInfo.remember) {
      LocalCache.deleteCache('UserInfo')
    }
    userLoginInfo.verifyKey = sid.current
    delete userLoginInfo.remember
    try {
      await login(userLoginInfo)
    } catch (e) {
      await refresh()
    }
  }

  return (
    <LoginLayout
      form={form}
      isLoginPage={true}
      onFinish={onFinish}
      loading={loginLoading}
      captcha={captchaData?.codeImg}
      refresh={refresh}
    />
  )
}

export default LoginPage
