import { Tree } from 'antd'
import { expandOnMount } from 'helper/chapterStudyTree'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { useKnowledgeControl } from 'hook/useKnowledge/useKnowledgeControl'
import Skeletons from 'publicComponents/Skeleton/index'
import { useEffect } from 'react'
import styled from 'styled-components'
import { ChapterTreeModal } from './cpn/ChapterTreeModal'

export const ChapterStudyTree = (props: { treeData: any; chapterControl: Record<string, any> }) => {
  const { treeData, chapterControl } = props
  const { knowledgeControl } = useKnowledgeControl()
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)

  // 每次挂载后全部展开
  useEffect(() => {
    if (chapterControl.data) {
      chapterControl.dispatchChapter({
        type: 'setExpandKeys',
        expandKeys: () => expandOnMount(chapterControl.data || [])
      })
    }
  }, [chapterControl.data])

  return (
    <ChapterStudyTreeWrapper>
      <ChapterTreeModal
        checkTreeData={checkTreeData}
        handleRelateCheck={knowledgeControl.handleRelateCheck}
        handleRelateExpand={knowledgeControl.handleRelateExpand}
        relateKeys={knowledgeControl.relateKeys}
        handleOk={chapterControl.handleOk}
        addContentLoading={chapterControl.addContentLoading}
      />

      {chapterControl.isLoading ? (
        <Skeletons size="middle" />
      ) : (
        <Tree
          expandedKeys={chapterControl.expandKeys}
          onExpand={chapterControl.handleOnExpand}
          onSelect={chapterControl.handleOnExpand}
        >
          {treeData && treeData}
        </Tree>
      )}
    </ChapterStudyTreeWrapper>
  )
}
const ChapterStudyTreeWrapper = styled.div`
  overflow: hidden;

  a.add-chapter {
    display: inline-block;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }
`
