import { Form } from 'antd'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'

export const ShortAnswer: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, dispatchQuestionType, setCurEditQuestion }) => {
  /* 处理单选题编辑题干 */
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }

  /* 处理单选题编辑答案 */
  const handleEditAnswer = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionOption' } })
  }

  return (
    <>
      <Form>
        <QuestionTitleArea
          question={question}
          handleEdit={(content: string) => handleEditTitle(content, question.questionId)}
          label={'题干'}
          questionOf={'questionDescription'}
        />
        <QuestionTitleArea
          question={question}
          handleEdit={(content: string) => handleEditAnswer(content, question.questionId)}
          label={'答案'}
          questionOf={'questionOption'}
        />

        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
