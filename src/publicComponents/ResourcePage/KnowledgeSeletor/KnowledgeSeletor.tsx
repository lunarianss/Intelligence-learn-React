import { TreeSelect } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import React, { useState } from 'react'
import { useShowKnowledgeTree } from 'server/fetchKnowledge'

const { TreeNode } = TreeSelect

export const KnowledgeSeletor: React.FC<{
  related?: string[] //初始状态
  callback?: (knowledgeList: string[]) => void // 更新回调
}> = ({ related, callback }) => {
  const { classInfo } = useCurrentClassInfo()
  const { data } = useShowKnowledgeTree(classInfo.courseId)
  const [value, setValue] = useState<string[]>(related!) //内部维护的状态
  const onChange = (newValue: string[]) => {
    callback ? callback(newValue) : 0
    setValue(newValue)
  }

  const generator = (data?: any) => {
    if (!data) return
    return data.map((p: any) => (
      <TreeNode key={p.pointId} value={p.pointId} title={p.pointName}>
        {generator(p.children)}
      </TreeNode>
    ))
  }

  return (
    <>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="点击选择知识点"
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
        placement={'topLeft'}
      >
        {generator(data)}
      </TreeSelect>
    </>
  )
}
