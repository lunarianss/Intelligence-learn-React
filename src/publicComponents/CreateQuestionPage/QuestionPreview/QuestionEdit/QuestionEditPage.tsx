import { Button } from 'antd'
import { CreateExamRoutePage } from 'components/CreateExamPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { initialQuestionTypeState, questionTypeReducer } from 'reducer/CreateExamPaper/questionTypeReducer'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionTypeAction } from 'server/fetchExam/types'
import styled from 'styled-components'

const QuestionEditPageWrapper = styled.div``
const QuestionEditPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>()
  //请求对应的数据
  const courseId = useCurrentClassInfo().classInfo.courseId
  const { data } = useShowQuestionDetails(questionId)
  const [, dispatchQuestionType] = useReducer(questionTypeReducer, initialQuestionTypeState)
  useEffect(() => {
    if (data) {
      console.log('sdasa', data)
      setCur({ ...data, score: 0, isStore: true })
      const actionType = QuestionTypeAction[data!.questionType] as any
      dispatchQuestionType({
        type: actionType,
        payload: { ...data, courseId, score: 0, isStore: true, pointIds: data.points } as IQuestionType
      })
    }
  }, [data])
  const [cur, setCur] = useState<IQuestionType | undefined>({ ...data!, score: 0, isStore: true })
  const navigate = useNavigate()

  return (
    <QuestionEditPageWrapper>
      <GlobalHeader
        title="编辑题目"
        tool={
          <>
            <Button onClick={() => navigate('../questionbank')}>返回</Button>
          </>
        }
      ></GlobalHeader>
      {cur && (
        <CreateExamRoutePage
          curEdit={cur}
          setCurEditQuestion={setCur}
          dispatchQuestionType={dispatchQuestionType}
        ></CreateExamRoutePage>
      )}
    </QuestionEditPageWrapper>
  )
}

export default QuestionEditPage
