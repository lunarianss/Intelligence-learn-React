import { useEffect, useMemo } from 'react'
import { QuestionOfPaperVO, StudentPaper } from 'server/fetchExam/types'
import { Updater, useImmer } from 'use-immer'
import { usePaperMap } from './usePaperMap'

export interface ExamPaper {
  single: QuestionOfPaperVO[]
  multiple: QuestionOfPaperVO[]
  fillBank: QuestionOfPaperVO[]
  shortAnswer: QuestionOfPaperVO[]
  judge: QuestionOfPaperVO[]
}

export const useExamQsData = (PaperData: StudentPaper | undefined): [ExamPaper, Updater<ExamPaper>] => {
  const { paperMap } = usePaperMap()

  const init = useMemo(
    () => ({
      single: [],
      multiple: [],
      fillBank: [],
      judge: [],
      shortAnswer: []
    }),
    [PaperData]
  )

  const [examData, setExamData] = useImmer<ExamPaper>(init)

  const examQuestionData = useMemo(() => {
    if (!PaperData) return init
    return PaperData?.questionOfPaperVOS?.reduce<Record<keyof ExamPaper, QuestionOfPaperVO[]>>((pre, now) => {
      pre[paperMap[now.questionType] as keyof ExamPaper] =
        pre[paperMap[now.questionType] as keyof ExamPaper].concat(now)
      return pre
    }, init)
  }, [PaperData])

  useEffect(() => {
    setExamData(examQuestionData)
  }, [PaperData])

  return [examData, setExamData]
}
