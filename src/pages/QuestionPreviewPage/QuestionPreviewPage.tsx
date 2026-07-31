import { Button } from 'antd'
import { ShowDetails } from 'publicComponents/CreateQuestionPage'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShowQuestionDetails } from 'server/fetchExam'
import { QuestionPreviewPageWrapper } from './QuestionPreviewPageStyle'

const QuestionPreviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { questionId } = useParams<{ questionId?: string }>()
  //网络请求
  const { data } = useShowQuestionDetails(questionId)
  const [isEditing, setEditing] = useState(false)
  const save = () => {
    console.log('保存')
  }

  //编辑按钮
  const edit = () => {
    navigate(`/edit/${questionId}`)
    //去请求回来对应的type
  }
  return (
    <>
      <QuestionPreviewPageWrapper>
        {isEditing ? (
          <>
            <Button type="primary" onClick={save}>
              保存
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => {
                navigate('/classinfo/questionbank', { replace: true })
              }}
            >
              返回
            </Button>
            <Button type="primary" style={{ float: 'right' }} onClick={edit}>
              编辑
            </Button>
          </>
        )}
        <ShowDetails questionId={questionId} />
      </QuestionPreviewPageWrapper>
    </>
  )
}
export default QuestionPreviewPage
