import { Avatar, Space } from 'antd'
import pyyPic from 'assets/img/pyy.png'
import React from 'react'

export const ChatBubble: React.FC<{
  right?: boolean
  msg: string
}> = ({ right, msg }) => {
  return (
    <>
      <div
        style={{
          height: '50px',
          margin: '2px'
          // border:"1px solid #000"
        }}
      >
        {right ? (
          <Space style={{ float: 'right' }}>
            {' '}
            {/** 右侧 */}
            <div
              style={{
                minHeight: '30px',
                minWidth: '40px',
                marginTop: '15px',
                padding: '3px 6px 4px 10px',
                borderRadius: '15px 0 15px 15px',
                backgroundColor: '#421792',
                color: 'white'
              }}
            >
              {msg}
            </div>
            <Avatar className="avatar" src={pyyPic} size={30}></Avatar>
          </Space>
        ) : (
          <Space>
            {' '}
            {/** 左侧 */}
            <Avatar className="avatar" src={pyyPic} size={30}></Avatar>
            <div
              style={{
                minHeight: '30px',
                minWidth: '40px',
                maxWidth: '90%',
                marginTop: '15px',
                padding: '3px 6px 4px 10px',
                borderRadius: '0 15px 15px 15px',
                color: 'white',
                backgroundColor: '#421792'
              }}
            >
              {msg}
            </div>
          </Space>
        )}
      </div>
    </>
  )
}
