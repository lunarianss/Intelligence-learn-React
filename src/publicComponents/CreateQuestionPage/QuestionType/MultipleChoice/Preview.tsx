import { Button, Space } from 'antd'
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
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        {No ? <b style={{ fontSize: '20px' }}> {No.toString()}.</b> : <></>}&nbsp;&nbsp;
        <QuestionWapper>{str2DOM(content.questionDescription)}</QuestionWapper>
      </div>
      {content.questionOption
        .split('<>')
        .map((i, x) => {
          const optionName = String.fromCharCode(x + 65)
          const isTrue = content.rightAnswer.split('').includes(optionName)
          return {
            optionName,
            content: i,
            isTrue
          }
        })
        .map((i) => (
          <div key={i.optionName} style={{ marginBottom: '15px' }}>
            <Space size="large">
              <Button
                shape="circle"
                type={i.isTrue ? 'primary' : 'default'}
                style={{
                  // width: '2.5rem',
                  // height: '2.5rem',
                  background: i.isTrue ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined
                }}
              >
                {i.optionName}
              </Button>
              {str2DOM(i.content)}
            </Space>
          </div>
        ))}
      <PreviewFooter content={content} />
    </>
  )
}
