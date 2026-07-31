import { Form, Switch } from 'antd'
import { QuestionTitleArea } from 'publicComponents/QuestionTitleArea/QuestionTitleArea'
import React, { useState } from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionDataWithID } from 'server/fetchExam/types/index'
import { StateSetter } from 'types'
import { QuestionFooter } from '../QuestionFooter'

export const Judge: React.FC<{
  question: IQuestionType
  callback?: (newData: QuestionDataWithID) => void
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}> = ({ question, dispatchQuestionType, setCurEditQuestion }) => {
  /* 处理单选题编辑题干 */
  const handleEditTitle = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionDescription' } })
  }

  const [check, setCheck] = useState(true)

  const setQuestion = (id: string) => {
    setCheck(!check)
    dispatchQuestionType({
      type: 'editQuestion',
      payload: { target: 'rightAnswer', content: check ? '0' : '1', id }
    })
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
        <Form.Item label="正确答案" required>
          <Switch
            checkedChildren="对"
            unCheckedChildren="错"
            checked={check}
            onChange={() => setQuestion(question.questionId)}
          />
        </Form.Item>
        <QuestionFooter
          question={question}
          setCurEditQuestion={setCurEditQuestion}
          dispatchQuestionType={dispatchQuestionType}
        />
      </Form>
    </>
  )
}
