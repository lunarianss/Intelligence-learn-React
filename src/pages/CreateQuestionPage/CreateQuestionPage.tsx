import { Button } from 'antd'
import { CreateExamMenu, CreateExamRoutePage } from 'components/CreateExamPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { createQuestionObj } from 'pages/CreateExamPage/util/util'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import React, { useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { initialQuestionTypeState, questionTypeReducer } from 'reducer/CreateExamPaper/questionTypeReducer'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { QuestionConstantString, QuestionTypeAction } from 'server/fetchExam/types'
import styled from 'styled-components'
export const CreateQuestionWrapper = styled.div``

const CreateQuestionPage: React.FC = () => {
  const { classInfo } = useCurrentClassInfo()
  const navigate = useNavigate()

  /*添加考试题目*/
  const [curEdit, setCur] = useState<IQuestionType>()
  const idSet = useRef<Set<number>>(new Set())
  const [, dispatchQuestionType] = useReducer(questionTypeReducer, initialQuestionTypeState)
  const addQuestionType = (type: QuestionConstantString) => {
    const actionType = QuestionTypeAction[type] as any
    const question = createQuestionObj(type, idSet.current, classInfo.courseId)
    setCur(question)
    dispatchQuestionType({ type: actionType, payload: question })
  }

  return (
    <>
      <CreateQuestionWrapper>
        <GlobalHeader
          title="创建题目"
          tool={
            <>
              <CreateExamMenu addQuestionType={addQuestionType} />
              <Button onClick={() => navigate('../questionbank')}>返回</Button>
            </>
          }
        ></GlobalHeader>
        {curEdit && (
          <CreateExamRoutePage
            curEdit={curEdit}
            setCurEditQuestion={setCur}
            dispatchQuestionType={dispatchQuestionType}
          />
        )}
      </CreateQuestionWrapper>
    </>
  )
}

export default CreateQuestionPage
