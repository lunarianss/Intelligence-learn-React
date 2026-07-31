import { SendOutlined } from '@ant-design/icons'
import { Button, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { ChatBubble } from './ChatBubble'

export const ContactModal: React.FC<{
  visible: boolean
  close: () => void
  from: string
}> = ({ visible, close, from }) => {
  const [send, setSend] = useState('')
  const [data, setData] = useState([
    { id: 'dasa1sddsa', isMe: false, msg: '左边短文字' },
    { id: 'dasa2sddsa', isMe: true, msg: '右边短文字' },
    {
      id: 'dasa3sddsa',
      isMe: false,
      msg: '左边场文字左边场文字左边场文字左边场文字左边场文字左边场文字左边场文字左边场文字左边场文字'
    },
    {
      id: 'dasa4sddsa',
      isMe: true,
      msg: '右边长文字右边长文字右边长文字右边长文字右边长文字右边长文字右边长文字右边长文字右边长文字'
    },
    { id: 'das5asddsa', isMe: false, msg: ' ' },
    { id: 'das6asddsa', isMe: true, msg: ' ' }
  ])
  const test = document.getElementById('test')

  // const 模拟对面回复 = (msg?: string) => {
  //   const id = crypto.randomUUID()
  //   data.push({ id, isMe: false, msg: msg || '狗再叫!' })
  //   setData([...data])
  //   setTimeout(() => {
  //     test!.scrollTo({ top: data.length * 50, behavior: 'smooth' })
  //   })
  // }

  // const handleSend = () => {
  //   const id = crypto.randomUUID()
  //   data.push({ id, isMe: true, msg: send })
  //   setTimeout(() => {
  //     模拟对面回复()
  //   }, 2000)
  //   setSend('')
  //   setData([...data])
  //   setTimeout(() => {
  //     test!.scrollTo({ top: data.length * 50, behavior: 'smooth' })
  //   })
  // }

  return (
    <Modal open={visible} footer={null} onCancel={close} title={`与 ${from} 的对话`}>
      <div style={{ maxHeight: '200px', overflow: 'scroll' }} id="test">
        {data.map((i) => (
          <ChatBubble right={i.isMe} msg={i.msg} key={i.id} />
        ))}
      </div>
      <Input.TextArea rows={4} value={send} onChange={(v) => setSend(v.target.value)} />
      <Button
        onClick={handleSend}
        icon={<SendOutlined />}
        type="primary"
        style={{ float: 'right', transform: 'translateY(-2rem)' }}
      >
        发送
      </Button>
    </Modal>
  )
}
