import { Tree } from 'antd'
import ChapterNodeFocusStatus from '../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeFocusStatus'
import ChapterNodeRenameStatus from '../../components/ClassInfoPage/ChapterPage/ChapterStudyTree/cpn/ChapterNodeRenameStatus'
import { KnowledgeTreeNode } from '../../components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/KnowledgeTreeNode'
import { IKnowledgePoint } from './type'
import { useKnowledgeControl } from './useKnowledgeControl'

export const useKnowledgeUI = (editable: boolean) => {
  /*业务逻辑层*/
  const { knowledgeControl } = useKnowledgeControl()
  const generateKnowledgeNode = (pointId: any, pointName: any, prePoints: any, afterPoints: any) => {
    return editable ? (
      <KnowledgeTreeNode
        nodeName={pointName}
        nodeId={pointId}
        handleDeleteTreeNode={(pointId: any) => knowledgeControl.deleteKnowledgePoint(pointId)}
        handleClickAddChildChapter={(pointId: any) => knowledgeControl.addKnowledgeChildrenPoint(pointId)}
        relatePoints={knowledgeControl.relatePoints}
        prePoints={prePoints}
        afterPoints={afterPoints}
        handleReNameTreeNode={(pointId: any) => knowledgeControl.renameKnowledgeNode(pointId)}
      />
    ) : (
      pointName
    )
  }

  /* 根据后台数据来递归构造树节点*/
  const generateKnowledgeTree = (data: IKnowledgePoint[]) => {
    if (!data) return
    const recursion = (data: IKnowledgePoint[]) => {
      return data.map((d) => {
        if (d === knowledgeControl.curNode) {
          return (
            <Tree.TreeNode
              title={
                knowledgeControl.focusStatus ? (
                  <ChapterNodeFocusStatus
                    confirmAdd={knowledgeControl.confirmAdd}
                    cancelAdd={knowledgeControl.cancelAdd}
                    dispatchChapter={knowledgeControl.dispatch}
                  />
                ) : (
                  generateKnowledgeNode(d.pointId, d.pointName, d.prePoints, d.afterPoints)
                )
              }
              key={d.pointId}
            ></Tree.TreeNode>
          )
        }
        if (d === knowledgeControl.curRenameNode) {
          return (
            <Tree.TreeNode
              title={
                knowledgeControl.focusStatus ? (
                  <ChapterNodeRenameStatus
                    dispatchChapter={knowledgeControl.dispatch}
                    confirmRename={knowledgeControl.confirmRename}
                    cancelRename={knowledgeControl.cancelRename}
                    value={knowledgeControl.knowledgeState.curAddInputValue}
                  />
                ) : (
                  generateKnowledgeNode(d.pointId, d.pointName, d.prePoints, d.afterPoints)
                )
              }
              key={d.pointId}
            >
              {recursion(d.children)}
            </Tree.TreeNode>
          )
        }
        if (d?.children?.length) {
          return (
            <Tree.TreeNode
              title={generateKnowledgeNode(d.pointId, d.pointName, d.prePoints, d.afterPoints)}
              key={d.pointId}
            >
              {recursion(d.children)}
            </Tree.TreeNode>
          )
        }

        return (
          <Tree.TreeNode
            title={generateKnowledgeNode(d.pointId, d.pointName, d.prePoints, d.afterPoints)}
            key={d.pointId}
          ></Tree.TreeNode>
        )
      })
    }
    return recursion(data)
  }
  return {
    treeData: generateKnowledgeTree(knowledgeControl.data),
    knowledgeControl
  }
}
