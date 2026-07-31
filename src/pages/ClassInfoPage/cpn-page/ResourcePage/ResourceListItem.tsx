import {
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileImageOutlined,
  FilePptOutlined,
  FileUnknownOutlined,
  PlaySquareOutlined
} from '@ant-design/icons'
import { Button, Input, Modal, Popconfirm, Space } from 'antd'
import { GlobalLabel } from 'publicComponents/GlobalLabel/globalLabel'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import React, { useCallback, useState } from 'react'
import { ResourceType } from 'server/fetchCourseResource/types'
import styled from 'styled-components'
import { isTeachAuth } from 'util/isAuthTeach'

export const ResourceListItem: React.FC<{
  item: ResourceType
  rename: (newName: string) => void
  deleteFile: () => void
  preview: () => void
}> = ({ item, rename, deleteFile, preview }) => {
  const [hover, setHover] = useState(false)
  const [newName, setNewName] = useState(item.resourceName)

  const getIcon = useCallback((type: number) => {
    switch (type) {
      case 10:
        return <PlaySquareOutlined />
      case 20:
        return <FilePptOutlined />
      case 40:
      case 41:
        return <FileImageOutlined />
      default:
        return <FileUnknownOutlined />
    }
  }, [])
  const isTeacher = isTeachAuth()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleRename = () => {
    rename(newName)
    setIsModalVisible(false)
  }

  const handleDelete = () => {
    setIsModalVisible(false)
    deleteFile()
  }

  return (
    <Wapper>
      {/* 编辑弹窗 */}
      <Modal
        title={`修改文件信息-${item.resourceName}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Popconfirm key="delete" title="你确定要删除这个文件吗" onConfirm={handleDelete} okText="是" cancelText="否">
            <Button type="primary" danger>
              删除这个文件
            </Button>
          </Popconfirm>,
          <Button key="save" type="primary" onClick={handleRename}>
            保存
          </Button>
        ]}
      >
        <GlobalLabel>修改文件名</GlobalLabel>
        <Input onChange={({ target }) => setNewName(target.value)} value={newName}></Input>
        <GlobalLabel>修改关联的知识点</GlobalLabel>
        <KnowledgeSeletor></KnowledgeSeletor>
      </Modal>

      <div className="flex" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* 文件名及图标 */}
        <Space className="elis">
          {item.type == 40 || item.type == 41 ? (
            <img src={item.resourceLink} className="img" />
          ) : (
            <div style={{ fontSize: '30px' }}>{getIcon(item.type)}</div>
          )}
          <div>{item.resourceName}</div>
        </Space>
        {/* 创建时间 */}
        <div>{item.createTime}</div>
        {/* 操作区域 */}
        <Space size="middle" style={{ opacity: hover ? 1 : 0, transition: 'all ease 330ms' }}>
          <Button type="primary" icon={<EyeOutlined />} onClick={preview}>
            预览
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} href={item.resourceLink}>
            下载
          </Button>
          {isTeacher && (
            <Button type="primary" icon={<EditOutlined />} onClick={() => setIsModalVisible(true)}>
              编辑
            </Button>
          )}
        </Space>
      </div>
    </Wapper>
  )
}

const Wapper = styled.div`
  width: 100%;
  .flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .elis {
    width: 40vw;
  }
  .img {
    width: 30px;
  }
`
