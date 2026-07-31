import { HeartOutlined, MessageOutlined, UserAddOutlined } from '@ant-design/icons'
import { Avatar, Modal, Space } from 'antd'
import AvatarPic from 'assets/img/avatar.jpg'
import bgPicUrl from 'assets/img/back-authForm.png'
import React from 'react'
import styled from 'styled-components'
import { IUserInfo } from '.'

export const UserCard: React.FC<{
  open: boolean
  close: () => void
  showing: IUserInfo | null
}> = ({ open, close, showing }) => {
  return (
    <Modal
      zIndex={200}
      title=""
      open={open}
      onOk={close}
      onCancel={close}
      modalRender={(modal) => <div>{modal}</div>}
      footer={[]}
      closable={false}
    >
      <Wapper>
        <div className="info">
          <Avatar src={AvatarPic} size={128} shape="circle" className="ava" />
          <p className="name">{showing?.name || 'UserName'}</p>
        </div>
        <div className="imgWapper">
          <img src={bgPicUrl} className="img"></img>
        </div>
        <div className="infoText">
          <p>{showing?.personalSignature || '你所热爱的就是你的生活'}</p>
          <p className="gray"> 0 Following 0 Follower</p>
          <Space className="action" size={16}>
            <HeartOutlined />
            <MessageOutlined />
            <UserAddOutlined />
          </Space>
        </div>
      </Wapper>
    </Modal>
  )
}
const Wapper = styled.div`
  user-select: none;
  .info {
    position: fixed;
  }
  .ava {
    transform: translateY(32px) translateX(30px);
  }
  .name {
    font-size: 48px;
    transform: translateY(-72px) translateX(180px);
    font-weight: bold;
    color: #fff;
    mix-blend-mode: difference;
  }
  .img {
    width: 100%;
    -webkit-user-drag: none;
  }
  .imgWapper {
    height: 128px;
    overflow: hidden;
  }
  .infoText {
    margin-left: 20px;
    margin-top: 40px;
    .gray {
      color: #999;
    }
  }
  .action {
    & > div {
      cursor: pointer;
    }
    font-size: 24px;
  }
`
