import { useMemo } from 'react'

export const usePaperMap = () => {
  const paperMap = useMemo(() => ['single', 'multiple', 'judge', 'fillBank', 'shortAnswer'] as const, [])
  const paperNameMap = useMemo(() => ['单选题', '多选题', '判断题', '填空题', '简答题'] as const, [])

  // 题型类别和汉字映射
  const numberMap = useMemo(
    () => ({
      0: '一、',
      1: '二、',
      2: '五、',
      3: '三、',
      4: '四、'
    }),
    []
  )
  return { numberMap, paperNameMap, paperMap }
}
