import TextArea from 'antd/lib/input/TextArea'
import React from 'react'
import { QuestionOfPaperVO } from 'server/fetchExam/types'
import { debounce } from 'util/debounece'
import { str2DOM } from 'util/str2DOM'
import { DispatchQs } from '../SingleChoice/Take'

export const Take: React.FC<{
  content: QuestionOfPaperVO
  NoScore?: boolean
  order: number
  dispatch: DispatchQs
}> = ({ content, dispatch }) => {
  const debounceDispatch = debounce(dispatch, 2000, false)
  return (
    <>
      <div className="questionTitle">{str2DOM(content.questionDescription)}</div>

      <div style={{ margin: '10px' }}>
        <TextArea
          showCount
          maxLength={100}
          defaultValue={content.studentAnswer}
          style={{ height: 120, marginBottom: 24 }}
          onChange={(e) => debounceDispatch(e.target.value, { qsType: content.questionType, id: content.questionId })}
          placeholder="can resize"
        />
      </div>
    </>
  )
}
