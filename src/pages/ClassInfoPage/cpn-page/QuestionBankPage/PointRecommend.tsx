import { Modal } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { KnowledgeSeletor } from 'publicComponents/ResourcePage'
import React from 'react'
import { useRecommendQuestion } from 'server/fetchExam'

export const PointRecommend: React.FC<{
  open: boolean
  close: () => void
}> = ({ open, close }) => {
  const { classInfo } = useCurrentClassInfo()
  const { mutateAsync } = useRecommendQuestion(classInfo.courseId)
  return (
    <Modal
      title="选择不熟练的知识点"
      open={open}
      onCancel={close}
      onOk={() => {
        close
      }}
    >
      <KnowledgeSeletor
        related={[]}
        callback={(e) => {
          console.log(e)

          // mutateAsync(e[0]).then((data) => {
          //   console.log(data)
          // })
        }}
      />
    </Modal>
  )
}
