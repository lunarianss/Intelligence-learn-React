import { Button, Space } from 'antd'
import React from 'react'
import { QuestionOfPaperVO } from 'server/fetchExam/types'
import { str2DOM } from 'util/str2DOM'
import { DispatchQs } from '../SingleChoice/Take'

export const Take: React.FC<{
  content: QuestionOfPaperVO
  NoScore?: boolean
  order: number
  dispatch: DispatchQs
}> = ({ content, order, dispatch }) => {
  const color = (isAnswer: boolean) => (isAnswer ? 'linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%)' : undefined)

  return (
    <>
      <div className="questionTitle">
        {`${order}.`}
        {str2DOM(content.questionDescription)}
      </div>

      {content.questionOption
        .split('<>')
        .map((i, x) => ({
          optionName: String.fromCharCode(x + 65),
          content: i,
          isTrue: true
        }))
        .map((i) => {
          const isAnswer = content.studentAnswer?.split('#').includes(i.optionName)

          return (
            <div key={i.optionName} style={{ margin: '10px' }}>
              <Space>
                <Button
                  type={isAnswer ? 'primary' : 'default'}
                  onClick={() =>
                    dispatch(i.optionName, {
                      id: content.questionId,
                      qsType: content.questionType,
                      oldAns: content.studentAnswer
                    })
                  }
                  style={{ width: '2.5rem', height: '2.5rem', background: color(!!isAnswer) }}
                  shape="circle"
                >
                  {i.optionName}
                </Button>
                {str2DOM(i.content)}
              </Space>
            </div>
          )
        })}
    </>
  )
}
