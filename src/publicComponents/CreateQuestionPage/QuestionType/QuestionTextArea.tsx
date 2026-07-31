import { Input } from 'antd/es'
import { useEffect, useState } from 'react'
import { IQuestionType } from 'reducer/CreateExamPaper/type/type'

interface QuestionTextAreaProps {
  question: IQuestionType
  option: { optionName: string; content: string }
  setContent: any
  style?: any
}

export const QuestionTextArea = (props: QuestionTextAreaProps) => {
  const { question, setContent, option } = props
  const [textAreaValue, setTextAreaValue] = useState('')

  const handleOnChange = (value: string) => {
    setContent(value)
    setTextAreaValue(value)
  }

  useEffect(() => {
    setTextAreaValue(option.content)
  }, [question.questionId])

  return <Input value={textAreaValue} onChange={(e: any) => handleOnChange(e.target.value)}></Input>
}
