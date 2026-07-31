import { Tag } from 'antd'
import React from 'react'
import { str2DOM } from 'util/str2DOM'
import { FooterWapper } from './style'

export const PreviewFooter: React.FC<{
  content: {
    questionAnswerExplain: string
    points: any[]
    questionDifficulty: number
  }
}> = ({ content }) => {
  return (
    <FooterWapper>
      <div className="d">解析：{str2DOM(content.questionAnswerExplain)}</div>
      <div className="p">
        相关知识点：
        {content.points.map((i: any) => (
          <Tag color="rgb(150, 151, 164)" key={i}>
            {i}
          </Tag>
        ))}
      </div>
      <div className="r">难易度：{['简单', '中等', '困难'][content.questionDifficulty]}</div>
    </FooterWapper>
  )
}
