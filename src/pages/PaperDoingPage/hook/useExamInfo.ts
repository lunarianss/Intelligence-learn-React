import { useMemo } from 'react'
import { StudentPaper } from 'server/fetchExam/types'

export const useExamInfo = (PaperData: StudentPaper | undefined) => {
  const score = useMemo(() => {
    return PaperData?.questionOfPaperVOS?.reduce((p, c) => p + (c.questionScore ? c.questionScore : 0), 0)
  }, [PaperData?.questionOfPaperVOS.length])

  const [startTime, endTime] = useMemo(() => {
    return [PaperData?.startTime, PaperData?.endTime].map((_) => {
      console.log(_, _?.split('T'))
      return _?.split('T').join(' ')
    })
  }, [PaperData?.startTime, PaperData?.endTime])

  return { score, startTime, endTime }
}
