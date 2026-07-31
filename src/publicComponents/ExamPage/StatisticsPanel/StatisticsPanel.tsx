import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Modal, Progress, Segmented, Space, Table, Tooltip } from 'antd'
import React from 'react'

export const StatisticsPanel: React.FC<{
  visible: boolean
  close: () => void
  data?: {
    name: string
    classes: {
      class: string
      status: string
    }[]
  }
}> = ({ visible, close }) => {
  const handleOk = () => {
    close()
  }
  const columns = [
    {
      title: '学生',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>
    },
    {
      title: '得分',
      dataIndex: 'status',
      key: 'status'
    }
  ]
  const data = [
    {
      key: '1',
      name: 'A同学',
      status: '未完成'
    },
    {
      key: '2',
      name: 'B同学',
      status: '待批改'
    },
    {
      key: '3',
      name: 'C同学',
      status: '70'
    }
  ]
  return (
    <Modal
      title={`${'试卷'}统计情况`}
      open={visible}
      onCancel={close}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk} icon={<ArrowRightOutlined />}>
          前往批改
        </Button>,
        <Button key="link" onClick={handleOk} icon={<CloseOutlined />}>
          关闭
        </Button>
      ]}
    >
      <Space align="center">
        <Segmented
          options={[
            {
              label: (
                <div style={{ padding: 4 }}>
                  <Tooltip title="发布到50人/已完成30人/已批改15人">
                    <Progress percent={60} success={{ percent: 30 }} type="circle" width={80} />
                  </Tooltip>
                  <div>一班</div>
                </div>
              ),
              value: 'Class1'
            },
            {
              label: (
                <div style={{ padding: 4 }}>
                  <Tooltip title="发布到30人/已完成5人/已批改0人">
                    <Progress percent={16} success={{ percent: 0 }} type="circle" width={80} />
                  </Tooltip>
                  <div>二班</div>
                </div>
              ),
              value: 'Class2'
            },
            {
              label: (
                <div style={{ padding: 4 }}>
                  <Tooltip title="未发布">
                    <Progress percent={0} type="circle" width={80} status="exception" />
                  </Tooltip>
                  <div>三班</div>
                </div>
              ),
              value: 'Class3'
            }
          ]}
        />
      </Space>
      <Table columns={columns} dataSource={data} />
    </Modal>
  )
}
