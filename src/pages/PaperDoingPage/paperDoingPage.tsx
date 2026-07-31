import { ClockCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Typography } from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import { original } from 'immer'
import { Take as FillBlank } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as Judge } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Take as MultipleChoice } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as ShortAnswer } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { DispatchQs, Take as Single } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { GlobalMessage } from 'publicComponents/GlobalMessage/index'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSaveExam, useSaveSingleQs, useShowQuestionForStudent } from 'server/fetchExam'
import { QuestionOfPaperVO, QuestionType } from 'server/fetchExam/types'
import { useExamInfo } from './hook/useExamInfo'
import { ExamPaper, useExamQsData } from './hook/useExamQsData'
import { usePaperMap } from './hook/usePaperMap'
import {
  CenterExamWrapper,
  CountDownWrapper,
  ExamWrapper,
  HeaderWrapper,
  InfoWrapper,
  LayoutWrapper,
  LeftExamWrapper,
  QuestionBlock,
  QuestionStatusHeader,
  QuestionTypeWrapperStatus,
  RightExamWrapper
} from './paperDoingPageStyle'

const PaperDoing: React.FC = () => {
  const { paperId } = useParams()
  const { data: PaperData } = useShowQuestionForStudent(paperId!)
  const { mutateAsync: saveQs } = useSaveSingleQs()
  const { numberMap, paperNameMap, paperMap } = usePaperMap()
  const qsRef = useRef<{ submitVersion: undefined | number }>({
    submitVersion: undefined
  })
  const { mutateAsync: saveExam, isLoading } = useSaveExam()
  const [examData, setExamData] = useExamQsData(PaperData)
  const { score, startTime, endTime } = useExamInfo(PaperData)
  const [open, setOpen] = useState(false)
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30 // Moment is also OK

  useEffect(() => {
    qsRef.current.submitVersion = PaperData?.submitVersion
  }, [PaperData])

  const clickSubmit = async () => {
    try {
      await saveExam(paperId!)
      GlobalMessage('loading', '提交成功，等待2秒自动退出界面')
      setTimeout(() => {
        window.close()
      }, 2000)
    } catch {
      GlobalMessage('success', '提交失败请重试')
    }
  }

  const convertMultiplyAns = (ans: string, oldAns: string | null | undefined) => {
    return function (type: typeof paperMap[number]): string | null {
      if (type !== 'multiple') return ans
      if (!oldAns) return null

      const oldAnsArr = oldAns.split('#')
      const isInclude = oldAnsArr.includes(ans)
      if (isInclude) {
        return oldAnsArr
          .filter((oldAns) => {
            return oldAns !== ans
          })
          .join('#')
      } else {
        return oldAnsArr.concat(ans).join('#')
      }
    }
  }

  const dispatchQuestion: DispatchQs = (studentAnswer, qs) => {
    const type = paperMap[qs.qsType]
    const ans = convertMultiplyAns(studentAnswer, qs.oldAns)(type)

    setExamData((draft) => {
      const originData = original<QuestionOfPaperVO[]>(draft[type])!
      const index = originData?.findIndex((q) => {
        return q.questionId === qs.id
      })
      draft[type][index].studentAnswer = ans
    })

    saveQs({ studentAnswer: ans, submitVersion: qsRef.current.submitVersion, questionId: qs.id, paperId: paperId! })
  }

  const Mapper = {
    [QuestionType.single]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <Single content={data} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.multiple]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <MultipleChoice content={data} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.fillBlank]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <FillBlank content={data} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.shortAnswer]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <ShortAnswer content={data} order={order} dispatch={dispatchQuestion} />
    ),
    [QuestionType.judge]: <T extends QuestionOfPaperVO>(data: T, order: number) => (
      <Judge content={data} order={order} dispatch={dispatchQuestion} />
    )
  }

  type T = { examMap?: typeof Mapper; type: 'nav' | 'content' }
  const QuestionCpn = ({ examMap, type }: T): ReactNode => {
    return (
      <>
        {Object.keys(examData)?.map((k) => {
          return examData[k as keyof ExamPaper]?.map((exam, index) => {
            return (
              <QuestionTypeWrapperStatus key={index}>
                <>
                  <QuestionStatusHeader>
                    <Typography.Title level={5}>
                      {numberMap[exam.questionType as keyof typeof numberMap]}
                      {paperNameMap[exam.questionType]}
                      <span style={{ padding: '0 3px' }}></span>
                      <span>
                        {`(${examData[k as keyof ExamPaper].reduce((pre, now) => {
                          return pre + (now.questionScore || 0)
                        }, 0)}分)`}
                      </span>
                    </Typography.Title>
                  </QuestionStatusHeader>
                  {examMap?.[exam.questionType]?.(exam, index + 1)}
                  {type === 'nav' && (
                    <div style={{ display: 'flex' }}>
                      {examData[k as keyof ExamPaper]?.map((_, index) => {
                        return (
                          <QuestionBlock key={index} bg={!!_.studentAnswer}>
                            {index + 1}
                          </QuestionBlock>
                        )
                      })}
                    </div>
                  )}
                </>
              </QuestionTypeWrapperStatus>
            )
          })
        })}
      </>
    )
  }

  return (
    <ExamWrapper>
      <HeaderWrapper>
        <Button type="primary" loading={isLoading} className="button-submit" onClick={() => setOpen(true)}>
          交卷
        </Button>
      </HeaderWrapper>

      <Modal
        title="交卷"
        open={open}
        onCancel={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
        footer={
          <Button loading={isLoading} type="primary" onClick={clickSubmit}>
            确定
          </Button>
        }
      >
        确认要交卷吗？💯💯💯
      </Modal>

      <LayoutWrapper>
        <LeftExamWrapper>
          <Typography.Title level={4} className="paperName">
            {PaperData?.paperName}
          </Typography.Title>

          <CountDownWrapper>
            <ClockCircleOutlined />
            <span className="count-num">
              <Countdown title="Time remaining" value={deadline} format="HH:mm:ss" />
            </span>
          </CountDownWrapper>

          <InfoWrapper>
            <div className="info-item">姓名：{PaperData?.studentName}</div>
            <div className="info-item">数量：{PaperData?.questionOfPaperVOS?.length}</div>
            <div className="info-item">满分：{score}</div>
            <div className="info-item">开始时间：{startTime}</div>
            <div className="info-item">结束时间：{endTime}</div>
          </InfoWrapper>
        </LeftExamWrapper>
        <CenterExamWrapper>{QuestionCpn({ type: 'content', examMap: Mapper })}</CenterExamWrapper>
        <RightExamWrapper>
          <div className="status-bar">
            <div className="already-answer">已经作答</div>
            <div className="no-answer">未作答</div>
          </div>
          {QuestionCpn({ type: 'nav' })}
        </RightExamWrapper>
      </LayoutWrapper>
    </ExamWrapper>
  )
}

export default PaperDoing
