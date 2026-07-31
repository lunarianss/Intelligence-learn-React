import { Modal } from 'antd'
import { generateKnowledgeKeys } from 'helper/knowledgeTree'
import { useCheckKnowledgeTreeUI } from 'hook/useKnowledge/useCheckKnowledgeTreeUI'
import { useEffect } from 'react'
import { LoadingWrapper } from './cpn/LodingWrapper'
import { TreeSelected } from './cpn/TreeSelected'

export const KnowledgeTree = (props: { treeData: any; knowledgeControl: Record<string, any> }) => {
  const { knowledgeControl, treeData } = props
  const { checkTreeData } = useCheckKnowledgeTreeUI(knowledgeControl.data)

  useEffect(() => {
    knowledgeControl.dispatch({ type: 'setExpandKeys', expandKeys: () => generateKnowledgeKeys(knowledgeControl.data) })
  }, [knowledgeControl.data])
  return (
    <div>
      <Modal
        title={knowledgeControl.curOrder}
        open={knowledgeControl.isModalVisible}
        onOk={knowledgeControl.handleOk}
        onCancel={knowledgeControl.handleCancel}
      >
        <TreeSelected
          curCheckId={knowledgeControl.curCheckId}
          checkTreeData={checkTreeData}
          handleRelateExpand={knowledgeControl.handleRelateExpand}
          handleRelateCheck={knowledgeControl.handleRelateCheck}
          relateKeys={knowledgeControl.relateKeys}
        />
      </Modal>
      <LoadingWrapper
        isLoading={knowledgeControl.isLoading}
        treeData={treeData}
        handleExpand={knowledgeControl.handleExpand}
        handleSelect={knowledgeControl.handleExpand}
        expandKeys={knowledgeControl.knowledgeState.expandKeys}
      />
    </div>
  )
}
