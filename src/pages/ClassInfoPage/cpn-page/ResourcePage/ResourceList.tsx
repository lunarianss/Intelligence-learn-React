import { List, Space } from 'antd'
import React, { useState } from 'react'
import { ResourceType } from 'server/fetchCourseResource/types'
import { useDeleteResource } from 'server/fetchResource'
import { ResourceListItem } from './ResourceListItem'

export const ResourceList: React.FC<{
  resourceItems: ResourceType[]
  preview: (...args: any[]) => any
}> = ({ resourceItems, preview }) => {
  const [data, setData] = useState(resourceItems)
  const { mutateAsync } = useDeleteResource()

  const del = async (i: ResourceType) => {
    await mutateAsync(i.resourceId)
    setData(data.filter((item) => i !== item))
  }
  return (
    <>
      <List
        size="large"
        header={
          <Space className="flex">
            <span>文件</span>
            <span>创建时间</span>
            <span> </span>
          </Space>
        }
        bordered
        dataSource={data}
        renderItem={(i) => (
          <List.Item>
            <ResourceListItem
              item={i}
              rename={(name) => {
                i.resourceName = name
                setData([...data])
              }}
              deleteFile={() => del(i)}
              preview={() => preview(i.type, i.resourceLink)}
            />
          </List.Item>
        )}
      />
    </>
  )
}
