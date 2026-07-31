import { createContext, useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetUserInfo } from 'server/fetchLogin'
import { GlobalMessage } from '../../publicComponents/GlobalMessage'
import { UserCard } from './UserCard'

export interface IUserInfo {
  name: string
  sex: number
  school: string
  email: string
  mobile: string
  personalSignature: string
  headPortrait: null
}

interface IUserInfoContext {
  getUserInfo: any
  userInfo: IUserInfo | null
  showUserCard: null | (() => void)
}

const UserInfoContext = createContext<IUserInfoContext>({
  userInfo: null,
  getUserInfo: null,
  showUserCard: null
})

export const UserInfoContextProvider = (props: any) => {
  const [userInfo, setUserInfo] = useState(null)
  const [open, setOpen] = useState(false) // 社区模块： 全局的用户信息卡片
  const { mutateAsync } = useGetUserInfo()
  const navigate = useNavigate()
  const getUserInfo = useCallback(async () => {
    try {
      const data = await mutateAsync()
      setUserInfo(data)
    } catch (e) {
      GlobalMessage('info', '用户身份 过期请重新登录！')
      navigate('/login')
    }
  }, [])

  // 应该传入显示哪个用户的id
  const showUserCard = (id?: string) => {
    setOpen(true)
  }
  return (
    <UserInfoContext.Provider value={{ getUserInfo, userInfo, showUserCard }}>
      {props.children}
      <UserCard open={open} close={() => setOpen(false)} showing={userInfo} />
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => {
  const { userInfo, getUserInfo, showUserCard } = useContext(UserInfoContext)

  return { userInfo, getUserInfo, showUserCard }
}
