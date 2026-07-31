import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { PrimaryButton } from 'publicComponents/Button'
import { Preview as P3 } from 'publicComponents/CreateQuestionPage/QuestionType/FillBlank/Preview'
import { Preview as P5 } from 'publicComponents/CreateQuestionPage/QuestionType/Judge/Preview'
import { Preview as P2 } from 'publicComponents/CreateQuestionPage/QuestionType/MultipleChoice/Preview'
import { Preview as P4 } from 'publicComponents/CreateQuestionPage/QuestionType/ShortAnswer/Preview'
import { Preview as P1 } from 'publicComponents/CreateQuestionPage/QuestionType/SingleChoice/Preview'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteTestPaper, useShowTestPaper } from 'server/fetchExam'
import { QuestionConstantString, QuestionDataWithID, QuestionType, WholeQuestion } from 'server/fetchExam/types'
import styled from 'styled-components'
import { ItemWrapper, TestPaperPreviewWrapper, TitleWrapper } from './TestPaperPreviewStyle'

const TestPaperPreview: React.FC = () => {
  const { paperid } = useParams()
  const [dataList, setData] = useState<Array<WholeQuestion & { questionScore: number }>>([])
  const { data, isLoading } = useShowTestPaper(paperid!) // 打开试卷
  console.log(data, 'data')
  useEffect(() => {
    data && setData(data.questionOfPaperVos)
  }, [data])

  const navigate = useNavigate()
  const { mutate: del } = useDeleteTestPaper()
  type T = { content: QuestionDataWithID; No: number }

  const mapper = {
    [QuestionType.single]: (args: T) => <P1 {...args} />,
    [QuestionType.multiple]: (args: T) => <P2 {...args} />,
    [QuestionType.fillBlank]: (args: T) => <P3 {...args} />,
    [QuestionType.shortAnswer]: (args: T) => <P4 {...args} />,
    [QuestionType.judge]: (args: T) => <P5 {...args} />
  }
  const zhCN_number = ['一', '二', '三', '四', '五']
  const zhCN_name = ['单选', '多选', '填空', '简答', '判断']
  Object.keys(mapper)
  return (
    <>
      <TestPaperPreviewWrapper>
        {/* 试卷头 */}
        <TitleWrapper>
          {isLoading ? (
            <BaseLoading />
          ) : (
            <div className="title">
              <Button icon={<ArrowLeftOutlined />} shape="circle" onClick={() => navigate(-1)}></Button>
              <div className="paperName"> {data?.paperName}</div>
              <Space>
                <PrimaryButton title="编辑" handleClick={() => navigate(`/editpaper/${paperid}`)} />
                <Button type="text" danger size="small" shape="round" onClick={() => del(paperid!)}>
                  删除
                </Button>
              </Space>
            </div>
          )}
        </TitleWrapper>
        {/* 其他信息 */}
        {/* <div>{`试卷总分：${dataList.reduce((p, c) => p + c.questionScore, 0)} 分 | 共 ${
          dataList.length
        } 题 | 及格分数：60 分 | 允许重做 | 重做次数：${3} 次 | 取最高分 `}</div>
        <br /> */}
        {/* 题目列表 */}
        {Object.keys(mapper).map((Type, index) => {
          const T = Number(Type) as QuestionConstantString
          const filtered = dataList.filter((q) => q.questionType == T)
          return filtered.length != 0 ? (
            <PaperBodyWrapper>
              <QuestionTypeWrapper>
                {`${zhCN_number[index]}、${zhCN_name[index]}题（共${filtered.length}道，${filtered.reduce(
                  (p, c) => p + c.questionScore,
                  0
                )}分）`}
              </QuestionTypeWrapper>
              {filtered.map((i, d) => (
                <>
                  <ItemWrapper key={d}>{mapper[i.questionType]({ content: i, No: d + 1 })}</ItemWrapper>
                </>
              ))}
            </PaperBodyWrapper>
          ) : (
            <></>
          )
        })}
      </TestPaperPreviewWrapper>
    </>
  )
}
const QuestionTypeWrapper = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const PaperBodyWrapper = styled.div`
  margin-top: 70px;
`
export default TestPaperPreview
