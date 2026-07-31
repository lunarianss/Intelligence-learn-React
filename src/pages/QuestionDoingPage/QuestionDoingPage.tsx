import { Button, Modal, Result, Tag } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import { PrimaryButton } from 'publicComponents/Button'
import { Take as FillBlank } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Take'
import { Take as Judge } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Take'
import { Take as MultipleChoice } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Take'
import { Take as ShortAnswer } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Take'
import { DispatchQs, Take as Single } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Take'
import { GlobalMessage } from 'publicComponents/GlobalMessage'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionForStu, useSubmitQuestion } from 'server/fetchExam'
import { QuestionOfPaperVO, QuestionType } from 'server/fetchExam/types'
import Skeletons from '../../publicComponents/Skeleton/index'
import { BackButton, QuestionDoingPageWrapper } from './QuestionDoingPageStyle'

const QuestionDoingPage = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  const { data, isLoading: showLoading } = useShowQuestionForStu(questionId)
  const { mutateAsync, isLoading } = useSubmitQuestion()
  type T = QuestionOfPaperVO
  const [ans, setAns] = useState('')

  const submit = async () => {
    const result = await mutateAsync({
      questionId: questionId!,
      questionAnswer: ans,
      questionType: data?.questionType || 0
    })
    setModal(result)
    setIsModalOpen(true)
  }

  const { paperNameMap } = usePaperMap()
  const dispatchQuestion: DispatchQs = (studentAnswer, qs) => {
    if (qs.qsType !== QuestionType.multiple) {
      setAns(studentAnswer)
    } else {
      if (ans === '') {
        setAns('###')
      }
      GlobalMessage('error', '多选题还没做好')
      setAns(studentAnswer)
    }
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
  const [modal, setModal] = useState<{
    answerIsRight: boolean
    nextQuestionId: string
    questionAnswerExplain: string
    resource: {
      resourceId: string
      resourceName: string
      type: number
      resourceLink: string
    }
  }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleCancel = () => setIsModalOpen(false)

  return (
    <>
      {showLoading ? (
        <Skeletons size="middle" absolute />
      ) : (
        <QuestionDoingPageWrapper>
          <BackButton>
            {data && (
              <Tag color="processing" style={{ height: '1.5rem' }}>
                {paperNameMap[data.questionType]}
              </Tag>
            )}
          </BackButton>

          {/* 题目正文 */}
          {data && Mapper[data.questionType](data, 0)}

          {
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PrimaryButton title="提交" handleClick={submit} />
            </p>
          }

          <Modal title="回答结果" open={isModalOpen} onCancel={handleCancel} footer={[]}>
            {' '}
            {modal ? (
              <>
                <Result
                  status={modal.answerIsRight ? 'success' : 'error'}
                  title={modal.answerIsRight ? '回答正确' : '回答错误'}
                  subTitle={modal.questionAnswerExplain}
                  extra={[
                    <Button
                      onClick={() => {
                        navigate(`/promote/stu/${modal!.nextQuestionId}`), setIsModalOpen(false)
                      }}
                      key={1}
                    >
                      下一题
                    </Button>
                  ]}
                />
              </>
            ) : (
              <Skeletons size="middle" />
            )}
            相关资源：
            {modal && (
              <Button onClick={() => navigate(modal.resource.resourceLink)}>{modal.resource.resourceName}</Button>
            )}
          </Modal>
        </QuestionDoingPageWrapper>
      )}
    </>
  )
}

export default QuestionDoingPage
