import { Button, Modal, Select } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { chapterReducer, initialChapterState } from 'reducer/ChaperStudyTree/chapterReducer'
import { IQuestionType, IQuestionTypeAction } from 'reducer/CreateExamPaper/type/type'
import { useShowKnowledgeTree } from 'server/fetchKnowledge'
import styled from 'styled-components'
import { BaseSpin } from '../../../baseUI/BaseSpin/BaseSpin'
import { TreeSelected } from '../../../components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import { generateKnowledgeKeys } from '../../../helper/knowledgeTree'
import { useHandleOnExpand } from '../../../hook/useChapterStudy/useHandleTreeOnExpand'
import { useCheckKnowledgeTreeUI } from '../../../hook/useKnowledge/useCheckKnowledgeTreeUI'
import { useHandleUploadExamPaper } from '../../../hook/useQuestionFooter/useHandleUploadExamPaper'
import { StateSetter } from '../../../types'
import { GlobalLabel } from '../../GlobalLabel/globalLabel'
import { QuestionTitleArea } from '../../QuestionTitleArea/QuestionTitleArea'
import { SingleChoicePreview } from './SingleChoice/SingleChoicePreview'

const { Option } = Select

interface QuestionFooterProps {
  question: IQuestionType
  setCurEditQuestion: StateSetter<IQuestionType | undefined>
  dispatchQuestionType: React.Dispatch<IQuestionTypeAction>
}

export const QuestionFooter = (props: QuestionFooterProps) => {
  const { question, setCurEditQuestion, dispatchQuestionType } = props
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading: KnowledgeTreeLoading } = useShowKnowledgeTree(classInfo.courseId)
  const { checkTreeData } = useCheckKnowledgeTreeUI(data)
  /* 两个弹框的开闭状态 */
  const [isModalOpen, setIsModalOpen] = useState(false)
  /* 知识点选择树的UI层 */
  const [chapterTreeState, dispatch] = useReducer(chapterReducer, initialChapterState)
  /* 处理树的受控展开 */
  const { handleOnExpand } = useHandleOnExpand(dispatch)
  /* 难度数组 */
  const optionDifficulty = useMemo(() => ['简单', '容易', '困难'], [])

  /* 树的展开 */
  useEffect(() => {
    dispatch({
      type: 'setExpandKeys',
      expandKeys: () => generateKnowledgeKeys(data)
    })
  }, [data])

  /* 处理上传试卷 */
  const {
    handleChange,
    handleRelateCheck,
    curDifficulty,
    curCheckId,
    isSaveModalOpen,
    handleOk,
    setIsSaveModalOpen,
    isLoading
  } = useHandleUploadExamPaper(question, setCurEditQuestion, dispatchQuestionType)
  /* 处理预览试卷 */
  const handlePreviewPaper = () => {
    setIsModalOpen(true)

    dispatchQuestionType({
      type: 'saveQuestion',
      id: question.questionId,
      setEditQuestion: (q: IQuestionType) => setCurEditQuestion(q),
      isPreview: true
    })
  }

  /* 处理保存试题 */
  const handleSaveQuestion = async () => {
    setIsSaveModalOpen(true)
    dispatchQuestionType({
      type: 'saveQuestion',
      id: question.questionId,
      setEditQuestion: (q: IQuestionType) => setCurEditQuestion(q)
    })
  }

  /* 编辑题目解析 */
  const handleQuestionAnswerExplain = (content: string, id: string) => {
    dispatchQuestionType({ type: 'editQuestion', payload: { content, id, target: 'questionAnswerExplain' } })
  }

  return (
    <>
      <Modal title={'试题预览'} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={[]}>
        <QuestionTitleWrapper>{question.questionDescription}</QuestionTitleWrapper>
        <SingleChoicePreview question={question} />
      </Modal>
      <Modal title="保存题目" open={isSaveModalOpen} onOk={handleOk} onCancel={() => setIsSaveModalOpen(false)}>
        <GlobalLabel>选择难易度：</GlobalLabel>
        <Select style={{ width: 120 }} onChange={handleChange} value={String(curDifficulty)}>
          {optionDifficulty.map((optionDiff, index) => {
            return (
              <Option key={optionDiff} value={String(index)}>
                {optionDiff}
              </Option>
            )
          })}
        </Select>

        <GlobalLabel style={{ margin: '20px 0 12px 0' }}>题目关联知识点:</GlobalLabel>
        <div style={{ position: 'relative', minHeight: '300px' }}>
          {KnowledgeTreeLoading ? (
            <BaseSpin title={'加载知识点中'} size={'default'} />
          ) : (
            <TreeSelected
              checkTreeData={checkTreeData}
              curCheckId={curCheckId}
              relateKeys={chapterTreeState.expandKeys}
              handleRelateCheck={handleRelateCheck}
              handleRelateExpand={handleOnExpand}
            />
          )}
        </div>
      </Modal>

      <QuestionTitleArea
        question={question}
        handleEdit={(content) => handleQuestionAnswerExplain(content, question.questionId)}
        label={'解析'}
        questionOf={'questionAnswerExplain'}
      />
      <div style={{ textAlign: 'center' }}>
        <Button
          onClick={() => handleSaveQuestion()}
          size="large"
          htmlType="submit"
          type="primary"
          style={{ marginRight: '20px' }}
          loading={isLoading}
        >
          保存试题
        </Button>
        <Button onClick={() => handlePreviewPaper()} size="large" type="primary">
          预览试题
        </Button>
      </div>
    </>
  )
}
export const QuestionTitleWrapper = styled.div`
  font-size: 17px;
  margin-bottom: 25px;
`
export const OptionPreviewWrapper = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 35px;
  background-color: rgb(245, 245, 245);
  text-align: center;
`
