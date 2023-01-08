import React, { useEffect, useMemo, useState } from 'react'
import { CreateExamRoutePageWrapper } from './CreateExamRoutePageStyle'
import { FillBlank, Judge, ShortAnswer, SingleChoice } from 'publicComponents/CreateQuestionPage'
import { QuestionDataWithID, QuestionType } from 'server/fetchExam/types'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import styled from 'styled-components'
import { getQuestionHeader } from '../../../pages/CreateExamPage/util/util'
import { StateSetter } from '../../../types'
import { QuestionStatus } from 'publicComponents/CreateQuestionPage/QuestionType/QuestionStatus'
import { InputNumber } from 'antd'

interface CreateExamRoutePageProps {
  curEdit: IQuestionType
  curOrder?: number
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
  disableHeader?: boolean
}

export const CreateExamRoutePage = (props: CreateExamRoutePageProps) => {
  const { curEdit, curOrder, setCurEditQuestion, dispatchQuestionType } = props
  const [curNumber, setCurNumber] = useState(5)
  const mapper = useMemo(() => {
    if (curEdit)
      return {
        [QuestionType.single]: (
          <SingleChoice
            question={curEdit}
            setCurEditQuestion={setCurEditQuestion}
            dispatchQuestionType={dispatchQuestionType}
          />
        ),
        [QuestionType.multiple]: (
          <SingleChoice
            question={curEdit}
            setCurEditQuestion={setCurEditQuestion}
            dispatchQuestionType={dispatchQuestionType}
          />
        ),
        [QuestionType.shortAnswer]: (
          <ShortAnswer
            question={curEdit}
            setCurEditQuestion={setCurEditQuestion}
            dispatchQuestionType={dispatchQuestionType}
          />
        ),
        [QuestionType.judge]: (
          <Judge
            question={curEdit}
            setCurEditQuestion={setCurEditQuestion}
            dispatchQuestionType={dispatchQuestionType}
          />
        ),
        [QuestionType.fillBlank]: (
          <FillBlank
            question={curEdit}
            setCurEditQuestion={setCurEditQuestion}
            dispatchQuestionType={dispatchQuestionType}
          />
        )
      }
    else return {}
  }, [props])

  useEffect(() => {
    setCurNumber(curEdit?.score)
  }, [curEdit])

  const onChangeScore = (e: number) => {
    setCurNumber(e)
    dispatchQuestionType({ type: 'editQuestion', payload: { id: curEdit.questionId, target: 'score', content: e } })
  }

  return (
    <CreateExamRoutePageWrapper>
      <ExamRouteHeader>
        {curEdit && (
          <>
            <span style={{ marginRight: '16px', color: 'black', fontSize: '18px' }}>{curOrder || ''}</span>
            <span style={{ fontSize: '16px', color: '#646873', marginRight: '12px' }}>
              {getQuestionHeader(parseInt(curEdit.questionType))}
            </span>
            {curOrder ? (
              <span style={{ marginRight: '8px' }}>
                <InputNumber
                  size="middle"
                  min={1}
                  max={100}
                  defaultValue={5}
                  onChange={onChangeScore}
                  value={curNumber}
                />
              </span>
            ) : (
              <></>
            )}
            <QuestionStatus
              config={curEdit.isStore ? 'success' : 'processing'}
              title={curEdit.isStore ? '题目已经保存' : '题目未保存'}
            />
          </>
        )}
      </ExamRouteHeader>
      {curEdit && mapper[curEdit.questionType]}
    </CreateExamRoutePageWrapper>
  )
}
export const ExamRouteHeader = styled.div`
  margin-bottom: 20px;

  .ant-input-number {
    width: 65px;
  }
`
