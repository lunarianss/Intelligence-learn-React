import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { memo } from 'react'
import { IChapterReducerAction } from 'reducer/ChaperStudyTree/type/type'
import styled from 'styled-components'
import { debounce } from 'util/debounece'
import { stopPropagation } from 'util/stopPropagation'

const ChapterNodeRenameStatus: React.FC<{
  dispatchChapter: React.Dispatch<IChapterReducerAction>
  confirmRename: any
  cancelRename: any
  value: string
}> = ({ dispatchChapter, confirmRename, cancelRename, value }) => {
  // debounce用来阻止，多次type造成setUpdaterFunction连续调用，导致组件多次渲染更新
  const debounceChange = debounce(
    (e: any) => {
      dispatchChapter({ type: 'setCurInputValue', curInputValue: e.target.value })
    },
    300,
    true
  )
  return (
    <div style={{ display: 'flex' }}>
      <Input
        autoFocus
        onChange={(e) => debounceChange(e)}
        className="input"
        defaultValue={value}
        onClick={(e) => e.stopPropagation()}
      />
      <Button
        type={'primary'}
        onClick={(e) => stopPropagation(e, confirmRename)}
        className="btn"
        icon={<CheckOutlined />}
      />
      <Button
        type={'primary'}
        className="btn"
        danger
        onClick={(e) => stopPropagation(e, cancelRename)}
        icon={<CloseOutlined />}
      />
    </div>
  )
}
export const Wapper = styled.div`
  display: flex;
  .input {
    margin-right: 12px;
  }
  .btn {
    margin-right: 15px;
    width: 3rem;
  }
`
export default memo(ChapterNodeRenameStatus)
