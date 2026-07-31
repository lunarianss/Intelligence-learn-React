import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { PreviewFooter } from '../PreviewFooter'
import { QuestionWapper } from '../style'

export const Preview: React.FC<{
  content: QuestionDataWithID
  No?: number
}> = ({ content, No }) => {
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        {No ? <b style={{ fontSize: '20px' }}> {No.toString()}.</b> : <></>}&nbsp;&nbsp;
        <QuestionWapper>{str2DOM(content.questionDescription)}</QuestionWapper>
      </div>
      {content.rightAnswer == '1' ? (
        <div>
          答案：<span>正确</span>
        </div>
      ) : (
        <div>
          答案：<span>错误</span>
        </div>
      )}
      <PreviewFooter content={content} />
    </>
  )
}
