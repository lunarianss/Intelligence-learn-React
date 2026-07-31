import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Radio, Space } from 'antd'
import React from 'react'
import { QuestionOfPaperVO } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { DispatchQs } from '../SingleChoice/Take'

export const Take: React.FC<{
  content: QuestionOfPaperVO
  NoScore?: boolean
  order: number
  dispatch: DispatchQs
}> = ({ content, dispatch }) => {
  const buttonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <>
      <div className="questionTitle">{str2DOM(content.questionDescription)}</div>

      <Radio.Group
        buttonStyle="solid"
        value={content.studentAnswer}
        onChange={(e) => {
          dispatch(e.target.value, { qsType: content.questionType, id: content.questionId })
        }}
      >
        <Space direction="horizontal" style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}>
          <Radio.Button value={'1'} style={buttonStyle}>
            <CheckOutlined />
          </Radio.Button>
          <Radio.Button value={'0'} style={buttonStyle}>
            <CloseOutlined />
          </Radio.Button>
        </Space>
      </Radio.Group>
    </>
  )
}
