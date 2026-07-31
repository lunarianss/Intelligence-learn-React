import React from 'react'
import { QuestionDataWithID } from 'server/fetchExam/types'
import styled from 'styled-components'
import { str2DOM } from 'util/str2DOM'
import { PreviewFooter } from '../PreviewFooter'
import { QuestionWapper } from '../style'

export const Preview: React.FC<{
  content: QuestionDataWithID
  No?: number
}> = ({ content, No }) => {
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        {No ? <b style={{ fontSize: '20px' }}> {No.toString()}.</b> : <></>}&nbsp;&nbsp;
        <QuestionWapper>{str2DOM(content.questionDescription)}</QuestionWapper>
      </div>
      {content.questionOption.split('<>').map((i, index) => (
        <BlankWrapper key={index}>
          <b>第{index + 1}空：</b>
          <span>{i}</span>
        </BlankWrapper>
      ))}
      <PreviewFooter content={content} />
    </>
  )
}

const BlankWrapper = styled.div`
  margin-bottom: 12px;
`
