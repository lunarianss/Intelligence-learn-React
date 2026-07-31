import React from 'react'
import { useShowQuestionDetails } from 'server/fetchExam'
import {
  PreviewItemWrapperAnswer,
  PreviewItemWrapperExplain,
  PreviewItemWrapperKnowledge,
  PreviewItemWrapperOption,
  PreviewItemWrapperQuestion,
  PreviewItemWrapperRate,
  ShowDetailsWrapper
} from './ShowDetailsStyle'
export const ShowDetails: React.FC<{ questionId: string | undefined }> = ({ questionId }) => {
  //这个数据没有更新，函数没有重新调用
  const { data } = useShowQuestionDetails(questionId)

  return (
    <>
      <ShowDetailsWrapper>
        <PreviewItemWrapperQuestion>
          题目：
          {data?.questionDescription}
        </PreviewItemWrapperQuestion>

        <br />
        <PreviewItemWrapperOption>
          选项：
          {data?.questionOption}
        </PreviewItemWrapperOption>

        <br />
        <PreviewItemWrapperAnswer>
          答案：
          {data?.rightAnswer}
        </PreviewItemWrapperAnswer>

        <br />
        <PreviewItemWrapperExplain>
          解析：
          {data?.questionAnswerExplain}
        </PreviewItemWrapperExplain>

        <br />
        <PreviewItemWrapperRate>
          难易度：
          {data?.questionDifficulty}
        </PreviewItemWrapperRate>

        <br />
        <PreviewItemWrapperKnowledge>
          知识点：
          {data?.points}
        </PreviewItemWrapperKnowledge>
      </ShowDetailsWrapper>
    </>
  )
}
