/*处理上传试卷*/
import { useCallback, useEffect, useState } from 'react'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'
import { useCreateQuestion, useUpadateQuestion } from 'server/fetchExam'
import { StateSetter } from '../../types'
import { GlobalMessage } from 'publicComponents/GlobalMessage'

export const useHandleUploadExamPaper = (
  question: IQuestionType,
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
) => {
  /*关联的知识点*/
  const [curCheckId, setCurCheckId] = useState<string[]>([])
  /*当前难度*/
  const [curDifficulty, setCurDifficulty] = useState('0')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  /*上传试题Api*/
  const { mutateAsync: uploadQuestion, isLoading } = useCreateQuestion()
  const { mutate: changeQuestion} = useUpadateQuestion()
  /*初始化试题状态*/
  useEffect(() => {
    setCurCheckId(question.pointIds)
    setCurDifficulty(String(question.questionDifficulty))
  }, [question.questionId])

  /*处理难度的选择*/
  const handleChange = useCallback(
    (value: string) => {
      setCurDifficulty(value)
      question.questionDifficulty = Number(value)
    },
    [question]
  )

  /*选择树来触发*/
  const handleRelateCheck = useCallback(
    (checkInfo: any) => {
      const { checked } = checkInfo
      setCurCheckId(checked)
      question.pointIds = checked
    },
    [question]
  )
  /*处理上传题目*/
  const handleOk = async () => {  //
    try {
      setIsSaveModalOpen(false)
      if(question.isStore) {  // 此题目已经上传，修改题目接口
        console.log("更新试题");
        changeQuestion(question)
      } else {  // 此题目未上传，新增题目接口
        console.log("新增试题");
        const qId = await uploadQuestion({ ...question  })
        question.questionId = qId
        question.isStore = true
        // 重置为在线ID
        // TODO: 请确定这里不会在试题编辑页面丢失导航栏引用
        // question.questionId = qId
        setCurEditQuestion({ ...question })
      }
    } catch (e) {
      console.log(e)
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
