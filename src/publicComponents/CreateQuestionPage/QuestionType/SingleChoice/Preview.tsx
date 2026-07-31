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
  const color = (i: any) =>
    i.optionName == content.rightAnswer ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined
  const Opt = content.questionOption.split('<>').map((i, x) => ({
    optionName: String.fromCharCode(x + 65),
    content: i
  }))
  return (
    <>
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        {No ? <b style={{ fontSize: '20px' }}> {No.toString()}.</b> : <></>}&nbsp;&nbsp;
        <QuestionWapper>{str2DOM(content.questionDescription)}</QuestionWapper>
      </div>
      {Opt.map((i: any) => (
        <div key={i.optionName} style={{ marginBottom: '15px' }}>
          <Space>
            <Button
              type={i.optionName == content.rightAnswer ? 'primary' : 'default'}
              shape="circle"
              style={{
                // width: '2.5rem',
                // height: '2.5rem',
                background: color(i)
              }}
            >
              {i.optionName}
            </Button>
            <div>{str2DOM(i.content)}</div>
          </Space>
        </div>
      ))}
      <PreviewFooter content={content} />
    </>
  )
}
