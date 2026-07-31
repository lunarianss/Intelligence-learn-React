import { Input, Modal } from 'antd'
import React from 'react'
export const BaseModal: React.FC<{
  title: string
  setModalValue?: any
  dispatch: any
  modalVisible: any
  confirmModal: any
  inputInfo?: {
    inputId: string
    placeHolder: string
    inputValue: string
  }
  children: any
  action: string
}> = ({ title, setModalValue, inputInfo, confirmModal, modalVisible, dispatch, children, action }) => {
  const inputArea =
    action === 'delete' ? null : (
      <Input
        id={inputInfo?.inputId}
        value={inputInfo?.inputValue}
        onChange={(e) => setModalValue(e.target.value)}
        placeholder={inputInfo?.placeHolder}
      ></Input>
    )
  return (
    <>
      <Modal
        title={title}
        okText="确认"
        open={modalVisible}
        onOk={confirmModal}
        onCancel={() => dispatch({ type: 'showAddModal', payload: false })}
        cancelText="取消"
      >
        <label htmlFor={inputInfo?.inputId}>{children}</label>
        {inputArea}
      </Modal>
    </>
  )
}
