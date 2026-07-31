import { Tabs } from 'antd'
import React from 'react'

import { BgColorsOutlined, LockOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { useNavigate } from 'react-router-dom'
import LocalCache from 'util/cache'
import { TOKEN_NAME } from '../../../../global/varible'
import { PrimaryButton } from '../../../../publicComponents/Button/index'
import { AccountSecurity } from './AccountSecurity/AccountSecurity'
import { BasicInformation } from './BasicInformation/BasicInformation'
import { Notification } from './Notification/Notification'
import { Personalization } from './Personalization/Personalization'
import { ProfileWapper } from './SettingPageStyle'

const { TabPane } = Tabs

const SettingPage: React.FC = () => {
  const navigate = useNavigate()

  const logout = () => {
    navigate('/login')
    LocalCache.deleteCache(TOKEN_NAME)
  }

  return (
    <>
      <GlobalHeader
        title="设置"
        tool={<PrimaryButton title="退出登录" handleClick={logout}></PrimaryButton>}
      ></GlobalHeader>
      <ProfileWapper>
        <Tabs tabPosition="left" centered>
          <TabPane
            tab={
              <span className="tab-list">
                <UserOutlined />
                基本信息
              </span>
            }
            key="1"
          >
            <BasicInformation></BasicInformation>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <LockOutlined />
                账号安全
              </span>
            }
            key="2"
          >
            <AccountSecurity></AccountSecurity>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <MessageOutlined />
                通知管理
              </span>
            }
            key="3"
          >
            <Notification></Notification>
          </TabPane>
          <TabPane
            tab={
              <span className="tab-list">
                <BgColorsOutlined />
                个性设置
              </span>
            }
            key="4"
          >
            <Personalization></Personalization>
          </TabPane>
        </Tabs>
      </ProfileWapper>
    </>
  )
}

export default SettingPage
