import { Drawer } from 'antd'
import { CreateExamHeader, CreateExamMenu, CreateExamNav, CreateExamRoutePage } from 'components/CreateExamPage'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import React, { useMemo, useReducer, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { initialQuestionTypeState, questionTypeReducer } from 'reducer/CreateExamPaper/questionTypeReducer'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { QuestionConstantString, QuestionTypeAction } from 'server/fetchExam/types'
import styled from 'styled-components'
import {
  CreateExamBodyLeftWrapper,
  CreateExamBodyRightWrapper,
  CreateExamBodyWrapper,
  CreateExamCenterWrapper,
  CreateExamNavWrapper,
  CreateExamPageWrapper,
  CreateExamQuestion
} from './CreateExamPageStyle'
import { createQuestionObj } from './util/util'

const CreateExamPage: React.FC = () => {
  const idSet = useRef<Set<number>>(new Set())
  /*当前正在编辑的题目*/
  const [curEditQuestion, setCurEditQuestion] = useState<undefined | IQuestionType>()
  /*当前正再编辑题目的次序*/
  const [curOrder, setCurOrder] = useState(1)
  const [questionTypeState, dispatchQuestionType] = useReducer(questionTypeReducer, initialQuestionTypeState)
  const navigate = useNavigate()

  const computedRoute = useMemo(() => {
    const index = location.pathname.indexOf('exam')
    return location.pathname.slice(0, index + 4)
  }, [location.pathname])

  const { classInfo } = useCurrentClassInfo()
  const [open, setOpen] = useState(true)

  /*添加考试题目*/
  const addQuestionType = (type: QuestionConstantString) => {
    const actionType = QuestionTypeAction[type] as any
    dispatchQuestionType({ type: actionType, payload: createQuestionObj(type, idSet.current, classInfo.courseId) })
  }

  const onClose = () => {
    setOpen(false)
    navigate(computedRoute)
  }

  return (
    <CreateExamRouteWrapper>
      <Drawer
        title={`添加考试`}
        placement="right"
        size={'large'}
        style={{ width: '100vw' }}
        onClose={onClose}
        open={open}
        mask={false}
        className={'exam-drawer'}
      >
        <CreateExamPageWrapper>
          <CreateExamCenterWrapper>
            <CreateExamHeader questionTypeState={questionTypeState} />
            <CreateExamBodyWrapper>
              <CreateExamBodyLeftWrapper>
                <CreateExamNav
                  questionTypeState={questionTypeState}
                  setCurEdit={setCurEditQuestion}
                  setCurOrder={(curOrder: number) => setCurOrder(curOrder)}
                  curEditQuestion={curEditQuestion!}
                  dispatchQuestionType={dispatchQuestionType}
                />
              </CreateExamBodyLeftWrapper>
              <CreateExamBodyRightWrapper>
                <CreateExamNavWrapper>
                  <CreateExamMenu addQuestionType={addQuestionType} dispatchQuestionType={dispatchQuestionType} />
                </CreateExamNavWrapper>
                <CreateExamQuestion>
                  <CreateExamRoutePage
                    curEdit={curEditQuestion!}
                    curOrder={curOrder}
                    setCurEditQuestion={setCurEditQuestion}
                    dispatchQuestionType={dispatchQuestionType}
                  ></CreateExamRoutePage>
                </CreateExamQuestion>
              </CreateExamBodyRightWrapper>
            </CreateExamBodyWrapper>
          </CreateExamCenterWrapper>
        </CreateExamPageWrapper>
      </Drawer>
    </CreateExamRouteWrapper>
  )
}
const CreateExamRouteWrapper = styled.div``

export default CreateExamPage
