import { Tag } from 'antd'

interface QuestionStatusProps {
  config: 'success' | 'warning' | 'processing'
  title: string
}

export const QuestionStatus = ({ config, title }: QuestionStatusProps) => {
  return (
    <>
      <Tag color={config}>{title}</Tag>
    </>
  )
}
