import { InputNumber } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import { FillBlank, Judge, ShortAnswer, SingleChoice } from 'publicComponents/CreateQuestionPage'
import { MultipleChoice } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/MultipleChoice'
import { QuestionStatus } from 'publicComponents/CreateQuestionPage/QuestionType/QuestionStatus'
import React, { useEffect, useMemo, useState } from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { QuestionType } from 'server/fetchExam/types'
import { StateSetter } from 'types'
import { CreateExamRoutePageWrapper, ExamRouteHeader } from './CreateExamRoutePageStyle'

type CreateExamRoutePageProps = {
  curEdit: IQuestionType
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
  disableHeader?: boolean
} & {
  curOrder?: number
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
          <MultipleChoice
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

  const onChangeScore = (e: number | null) => {
    setCurNumber(e || 0)
    dispatchQuestionType({ type: 'editQuestion', payload: { id: curEdit.questionId, target: 'score', content: e } })
  }

  const { paperNameMap } = usePaperMap()
  return (
    <CreateExamRoutePageWrapper>
      <ExamRouteHeader>
        {curEdit && (
          <>
            <span className="order">{curOrder || ' '}</span> .
            <span className="typeName">{paperNameMap[curEdit.questionType]}</span>
            {curOrder ? (
              <span className="input">
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
