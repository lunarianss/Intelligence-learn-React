import React from 'react'
import { QuestionBank } from 'server/fetchExam/types'
import { QuestionDetailsWrapper } from '../QuestionBankTableStyle'

export const ShowDetailsCell: React.FC<{
  editing: boolean
  record: QuestionBank
  children: React.ReactNode
}> = ({ editing, record, children, ...restProps }) => {
  // 网络请求回来对应数据
  return (
    <td {...restProps}>
      {editing ? (
        <QuestionDetailsWrapper>
          题目：{record.questionDescription}
          <br /> <br />
          {/* 需要处理 */}
          {record.questionOption === '' ? (
            <></>
          ) : (
            <>
              选项：
              <br />
              {record.questionOption.split('<>').map((item, index) => (
                <span key={index}>
                  {item}
                  <br />
                </span>
              ))}
              <br />
            </>
          )}
          正确答案：
          {record.rightAnswer.split('#').map((item, index) => (
            <span key={index}>{item}&nbsp;&nbsp;</span>
          ))}
        </QuestionDetailsWrapper>
      ) : (
        children
      )}
    </td>
  )
}
