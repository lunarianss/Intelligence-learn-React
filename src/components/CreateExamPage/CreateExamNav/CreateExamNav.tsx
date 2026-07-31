import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import React, { useMemo, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { IQuestionType, IQuestionTypeAction, IQuestionTypeInitialState } from 'reducer/CreateExamPaper/type/type'
import { QuestionActionString } from 'server/fetchExam/types'
import styled from 'styled-components'

import './index.css'

const { Panel } = Collapse

export interface CreateExamNavProps {
  setCurEdit: (curEdit: IQuestionType) => void
  questionTypeState: IQuestionTypeInitialState<IQuestionType>
  setCurOrder: (curOrder: number) => void
  curEditQuestion: IQuestionType
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}

export const CreateExamNav = (props: CreateExamNavProps) => {
  const { questionTypeState, setCurEdit, setCurOrder, curEditQuestion, dispatchQuestionType } = props
  const [curId, setCurId] = useState('')

  /*编辑试卷类型*/
  const editQuestionType = (question: IQuestionType, index: number) => {
    setCurEdit(question)
    setCurId(question.questionId)
    setCurOrder(index)
  }

  const deleteQuestion = (id: string) => {
    dispatchQuestionType({ type: 'deleteQuestion', id })
  }

  /*试卷总题量*/
  const allQuestionCount = useMemo(() => {
    return Object.keys(questionTypeState).reduce((pre, cur) => {
      return pre + questionTypeState[cur as QuestionActionString].list.length
    }, 0)
  }, [questionTypeState, curEditQuestion])

  /*试卷总分数*/
  const allQuestionPoint = useMemo(() => {
    return Object.keys(questionTypeState).reduce((pre, cur) => {
      return (
        pre +
        questionTypeState[cur as QuestionActionString].list.reduce((pre, cur) => {
          return (pre += cur.score)
        }, 0)
      )
    }, 0)
  }, [questionTypeState, curEditQuestion])
  const { paperNameMap } = usePaperMap()
  return (
    <>
      <ExamNavHeader>
        <span style={{ marginRight: '12px' }}>总题量：{allQuestionCount}</span>
        <span>总分数：{allQuestionPoint}</span>
      </ExamNavHeader>

      <Collapse
        bordered={false}
        expandIconPosition="end"
        className="collapse"
        ghost={true}
        defaultActiveKey={Object.keys(questionTypeState).map((_, index) => index)}
      >
        {Object.keys(questionTypeState).map((type, index) => {
          const questionTypeKey: any = questionTypeState[type as QuestionActionString]
          return (
            questionTypeKey.list.length && (
              <Panel
                key={index}
                header={
                  <PanelHeader>
                    <span style={{ marginRight: '7px' }}>{paperNameMap[index]}</span>（共
                    {questionTypeKey.list.length}题
                    <span>
                      {questionTypeKey.list.reduce((pre: any, now: any) => {
                        return (pre += now.score)
                      }, 0)}
                      分）
                    </span>
                  </PanelHeader>
                }
              >
                <TransitionGroup>
                  {questionTypeKey.list.map((question: IQuestionType, index: any) => {
                    return (
                      <CSSTransition key={question.questionId} timeout={500} classNames="answer">
                        <QuestionTypeWrapper
                          className={curId === question.questionId ? 'active' : 'noActive'}
                          key={question.questionId}
                          onClick={() => {
                            editQuestionType(question, index + 1)
                          }}
                        >
                          <div>
                            <span style={{ marginRight: '3px' }}>{index + 1}</span>
                            <span>({question.score}分)</span>
                            <span style={{ paddingLeft: '12px' }} className="check">
                              {question.isStore && <CheckOutlined />}
                            </span>
                          </div>
                          <span onClick={() => deleteQuestion(question.questionId)} className="tool">
                            <DeleteOutlined />
                          </span>
                        </QuestionTypeWrapper>
                      </CSSTransition>
                    )
                  })}
                </TransitionGroup>
              </Panel>
            )
          )
        })}
      </Collapse>
    </>
  )
}

export const QuestionIntroduce = styled.div``
export const QuestionTypeWrapper = styled.div<any>`
  height: 32px;
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => (props.className === 'active' ? '#3a8bff' : '#646873')};
  position: relative;
  background: ${(props) => (props.className === 'active' ? '#f0f6ff' : 'white')};
  .check svg {
    color: green;
  }
  &:hover {
    background-color: rgb(247, 250, 252);
  }
  &:hover span.tool {
    opacity: 1;
  }
  .tool {
    opacity: 0;
    transition: opacity 330ms ease;
  }
`
export const PanelHeader = styled.div`
  font-size: 13px;
`
export const ExamNavHeader = styled.div`
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  color: #a8a8b3;
  padding-left: 16px;
`
