import { Input } from 'antd'
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
      <div className="questionTitle" style={{ marginBottom: '12px' }}>
        {str2DOM(content.questionDescription)}
      </div>
      <Input
        defaultValue={content.studentAnswer}
        onChange={(e) => debounceDispatch(e.target.value, { qsType: content.questionType, id: content.questionId })}
      />
    </>
  )
}
