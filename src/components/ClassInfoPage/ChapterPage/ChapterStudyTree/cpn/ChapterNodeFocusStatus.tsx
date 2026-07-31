import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { memo } from 'react'
import { IChapterReducerAction } from 'reducer/ChaperStudyTree/type/type'
import styled from 'styled-components'
import { debounce } from 'util/debounece'
import { stopPropagation } from 'util/stopPropagation'

const ChapterNodeFocusStatus: React.FC<{
  dispatchChapter: React.Dispatch<IChapterReducerAction>
  confirmAdd: any
  cancelAdd: any
}> = ({ confirmAdd, cancelAdd, dispatchChapter }) => {
  const debounceChange = debounce(
    (e: any) => {
      dispatchChapter({ type: 'setCurInputValue', curInputValue: e.target.value })
    },
    300,
    true
  )
  return (
    <Wapper>
      <Input autoFocus onChange={(e) => debounceChange(e)} className="input" onClick={(e) => e.stopPropagation()} />
      <Button type="primary" onClick={(e) => stopPropagation(e, confirmAdd)} className="btn" icon={<CheckOutlined />} />
      <Button
        type="primary"
        className="btn"
        danger
        onClick={(e) => stopPropagation(e, cancelAdd)}
        icon={<CloseOutlined />}
      />
    </Wapper>
  )
}

export const Wapper = styled.div`
  display: flex;
  align-items: center;
  .input {
    margin-right: 15px;
  }
  .btn {
    margin-right: 15px;
    width: 3rem;
  }
`
export default memo(ChapterNodeFocusStatus)
