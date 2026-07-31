/*处理上传试卷*/
import { message } from 'antd'
import produce from 'immer'
import { useCallback, useEffect, useState } from 'react'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { useCreateQuestion, useUpadateQuestion } from 'server/fetchExam'
import { StateSetter } from '../../types'

export const useHandleUploadExamPaper = (
  question: IQuestionType,
  setCurEditQuestion: StateSetter<IQuestionType | undefined>,
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
) => {
  /*关联的知识点*/
  const [curCheckId, setCurCheckId] = useState<string[]>([])
  /*当前难度*/
  const [curDifficulty, setCurDifficulty] = useState('0')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  /*上传试题Api*/
  const { mutateAsync: uploadQuestion, isLoading } = useCreateQuestion()
  const { mutate: changeQuestion } = useUpadateQuestion()

  /*初始化试题状态*/
  useEffect(() => {
    setCurCheckId(question.pointIds!)
    setCurDifficulty(String(question.questionDifficulty))
  }, [question])

  /*处理难度的选择*/
  const handleChange = useCallback(
    (value: string) => {
      setCurDifficulty(value)

      setCurEditQuestion({ ...question, questionDifficulty: parseInt(value) })
      dispatchQuestionType({
        isSave: true,
        type: 'editQuestion',
        payload: { id: question.questionId, target: 'questionDifficulty', content: Number(value) }
      })
    },
    [question]
  )

  /*选择树来触发*/
  const handleRelateCheck = useCallback(
    (checkInfo: any) => {
      const { checked } = checkInfo
      setCurCheckId(checked)

      setCurEditQuestion({ ...question, pointIds: checked })

      dispatchQuestionType({
        isSave: true,
        type: 'editQuestion',
        payload: { id: question.questionId, target: 'pointIds', content: [...checked] }
      })
    },
    [question]
  )

  /*处理上传题目*/
  const handleOk = async () => {
    setIsSaveModalOpen(false)

    try {
      if (question.isStore) {
        await changeQuestion(question)
        message.success('修改成功')
      } else {
        const questionId = await uploadQuestion(question)
        dispatchQuestionType({
          type: 'saveQuestionState',
          id: questionId,
          oldId: question.questionId
        })

        setCurEditQuestion(
          produce((draft) => {
            if (draft) draft.isStore = true
          })
        )
      }
    } catch {
      setCurEditQuestion(
        produce((draft) => {
          draft!.isStore = false
        })
      )
    }
  }

  return {
    handleChange,
    handleRelateCheck,
    curDifficulty,
    curCheckId,
    handleOk,
    isSaveModalOpen,
    setIsSaveModalOpen,
    isLoading
  }
}
