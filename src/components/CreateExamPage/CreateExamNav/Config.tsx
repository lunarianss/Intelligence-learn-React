import { SettingOutlined } from '@ant-design/icons'
import { Button, Form, InputNumber, Modal, Popconfirm } from 'antd'
import React, { useState } from 'react'
import { QuestionList } from 'server/fetchExam/types'

export const Config: React.FC<{
  config: QuestionList[]
  setConfig: () => void
  SumScore: () => number
}> = ({ config, SumScore, setConfig }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <h2>
        {`试卷总分:${SumScore()}分`}
        <SettingOutlined onClick={showModal} />
      </h2>
      <Modal
        title="编辑设置"
        open={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button
            type="primary"
            key="1"
            onClick={() => {
              setConfig()
              setIsModalOpen(false)
            }}
          >
            保存默认设置
          </Button>,
          <Popconfirm
            title="调整此项将覆盖之前的分数"
            key="2"
            onConfirm={() => {
              setConfig()
              setIsModalOpen(false)
            }}
          >
            <Button type="primary">从新分配分数</Button>
          </Popconfirm>
        ]}
      >
        <Form>
          {config.map((i) => (
            <Form.Item label={i.name} key={i.type}>
              新建每题分数：
              <InputNumber
                defaultValue={i.defaultScore}
                max={config[i.type].max}
                min={config[i.type].min}
                onChange={(v) => (config[i.type].defaultScore = v!)}
              ></InputNumber>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* TODO: 还没做好 */}
              按总分从新分配分数：
              <InputNumber
                defaultValue={i.amount}
                min={config[i.type].amount}
                step={config[i.type].amount / 2}
                onChange={(v) => (i.amount = v!)}
              ></InputNumber>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  )
}
