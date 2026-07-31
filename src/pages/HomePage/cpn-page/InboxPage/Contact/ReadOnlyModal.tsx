import { Modal } from 'antd'
import React from 'react'
import { str2DOM } from 'util/str2DOM'

export const ReadOnlyModal: React.FC<{
  visible: boolean
  close: () => void
  title: string
  content: string
}> = ({ visible, close, title, content }) => {
  return (
    <Modal open={visible} footer={null} onCancel={close} title={title}>
      {str2DOM(content)}
    </Modal>
  )
}
