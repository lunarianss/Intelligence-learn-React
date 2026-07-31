import { Button, Input, Radio } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import React from 'react'
import { QuestionType } from 'server/fetchExam/types'
import { QuestionBankHeaderWrapper, SelectiveList } from '../QuestionBankHeader/QuestionBankHeaderStyle'
export const QuestionBankHeader: React.FC<{
  changeType: (type: QuestionType) => void
  showAll: () => void
  search: (value: string) => any
}> = ({ changeType, showAll, search }) => {
  const { paperNameMap, paperMap } = usePaperMap()
  return (
    <>
      <QuestionBankHeaderWrapper>
        {/* 题型、知识点管理 */}
        <SelectiveList>
          <span className="introduce">题目类型:</span>
          <Radio.Group defaultValue="all">
            <Button type="primary" value="all" className="choosebtn" onClick={showAll}>
              所有
            </Button>
            {paperMap.map((item, index) => (
              <Button
                key={index}
                value={index}
                className="choosebtn"
                type="primary"
                onClick={() => {
                  changeType(index)
                }}
              >
                {paperNameMap[index]}
              </Button>
            ))}
          </Radio.Group>
          <Input.Search allowClear size="large" onSearch={search} style={{ width: '400px' }} />
        </SelectiveList>
      </QuestionBankHeaderWrapper>
    </>
  )
}
