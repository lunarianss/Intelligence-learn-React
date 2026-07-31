import { Button, Space } from 'antd'
import React from 'react'
import { QuestionConstantString, QuestionOfPaperVO } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import '../QuestionStyle.css'
export type DispatchQs = (
  opt: string,
  qs: { id: string; qsType: QuestionConstantString; oldAns?: string | null }
) => void
export const Take: React.FC<{
  content: QuestionOfPaperVO
  order: number
  dispatch: DispatchQs
}> = ({ content, order, dispatch }) => {
  const color = (i: any) =>
    i.optionName == content.studentAnswer ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined

  const Opt = content.questionOption.split('<>').map((i, x) => ({
    optionName: String.fromCharCode(x + 65),
    content: i
  }))

  return (
    <>
      <div className="questionTitle">
        {`${order}.`}
        {str2DOM(content.questionDescription)}
      </div>

      {Opt.map((i) => (
        <div key={i.optionName} style={{ margin: '10px' }}>
          <Space>
            <Button
              type={i.optionName === content.studentAnswer ? 'primary' : 'default'}
              shape="circle"
              onClick={() => dispatch(i.optionName, { id: content.questionId, qsType: content.questionType })}
              style={{ width: '2.5rem', height: '2.5rem', background: color(i) }}
            >
              {i.optionName}
            </Button>
            {str2DOM(i.content)}
          </Space>
        </div>
      ))}
    </>
  )
}
