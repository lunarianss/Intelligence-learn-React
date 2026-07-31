import { Button, Input, notification } from 'antd'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IQuestionType, IQuestionTypeInitialState } from 'reducer/CreateExamPaper/type/type'
import { useUploadExamPaper } from 'server/fetchExam'
import { QuestionActionString } from 'server/fetchExam/types'
import styled from 'styled-components'

interface CreateExamHeaderProps {
  questionTypeState: IQuestionTypeInitialState<IQuestionType>
}

export const CreateExamHeader = (props: CreateExamHeaderProps) => {
  const { questionTypeState } = props
  const navigate = useNavigate()
  const courseId = useParams().id!
  const [paperName, setPaperName] = useState('期中试卷 xx专业 xx班')
  const { mutateAsync: saveExamPaper, isLoading } = useUploadExamPaper(courseId)
  const computedRoute = useMemo(() => {
    const pathname = location.pathname
    return pathname.slice(0, pathname.indexOf('exam') + 4)
  }, [location])
  /*完成保存试卷*/
  const handleOnStorePaper = async () => {
    // 检查未保存试题
    let countNoSave = 0
    Object.keys(questionTypeState).forEach((item) => {
      questionTypeState[item as QuestionActionString].list.forEach((qs) => {
        if (!qs.isStore) countNoSave++
      })
    })
    const key = `open${Date.now()}`
    const btn = (
      <Button type="primary" size="middle" onClick={() => notification.destroy(key)}>
        知道啦
      </Button>
    )
    if (countNoSave) {
      notification.open({
        message: '试卷保存👋',
        description: (
          <div>
            试卷当中还有 <span style={{ fontSize: '18px', padding: '0 7px' }}>{countNoSave}</span> 道题还没有保存
          </div>
        ),
        placement: 'top',
        btn,
        key
      })
    } else {
      const questionIds: string[] = []
      const questionsScore: number[] = []
      Object.keys(questionTypeState).forEach((qt: string) => {
        const typeQues = questionTypeState[qt as QuestionActionString]
        if (typeQues.list.length > 0) {
          typeQues.list.forEach((qs) => {
            questionIds.push(qs.questionId)
            questionsScore.push(qs.score)
          })
        }
      })

      try {
        await saveExamPaper({ paperName, questionIds, questionsScore })
        navigate(computedRoute)
      } catch (e) {}
    }
  }

  return (
    <ExamHeader>
      {isLoading && <BaseSpin tip={'正在创建试卷……'} />}
      <InputWrapper>
        <label>试卷名字：</label>
        <Input onChange={(e) => setPaperName(e.target.value)} value={paperName}></Input>
        <div>
          <Button type="primary" className={'save-exam'} onClick={() => handleOnStorePaper()} loading={isLoading}>
            保存试卷
          </Button>
          <Button type="primary" onClick={() => navigate(`/previewtestpaper/dasads`)}>
            预览试卷
          </Button>
        </div>
      </InputWrapper>
    </ExamHeader>
  )
}
export const ExamHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  padding: 5px 15px 5px 15px;
  background-color: white;
  border-radius: 8px;
`
const InputWrapper = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 12px;
  display: flex;
  justify-content: space-between;

  input {
    flex: 1;
  }

  .save-exam {
    margin: 0 30px;
  }

  label {
    min-width: 100px;
    line-height: 37px;
  }
`
