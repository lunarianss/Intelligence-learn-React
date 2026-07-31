import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRenameKnowledgeAPI } from 'server/fetchKnowledge'
import { renameKnowledgePoint } from '../../helper/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { IKnowledgePoint } from './type'

export const useRenameKnowledgePoints = (props: IHandleChapterControl<IKnowledgePoint>) => {
  const { dispatchChapter: dispatch, chapterState: knowledgeState, data } = props
  const { mutateAsync: renameKnowledgeAPI } = useRenameKnowledgeAPI()
  const queryClient = useQueryClient()
  const curId = useRef('')
  const classInfo = {
    courseId: useParams().id!
  }
  const [curRenameNode, setCurRenameNode] = useState<IKnowledgePoint | null>()
  /* 重命名节点 */
  const renameKnowledgeNode = (id: string) => {
    dispatch({ type: 'setFocusState', focusState: true })
    renameKnowledgePoint(data, id, setCurRenameNode, dispatch, classInfo.courseId)
  }
  /* 确认重命名 */
  const confirmRename = async () => {
    try {
      setCurRenameNode((pre) => {
        if (pre) {
          pre.pointName = knowledgeState.curAddInputValue
        }
        return pre
      })
      await renameKnowledgeAPI({ pointId: curId.current, pointName: knowledgeState.curAddInputValue })
    } catch (e) {
      dispatch({ type: 'setError', error: e })
      queryClient.invalidateQueries(['knowledgeTree', classInfo.courseId])
    } finally {
      dispatch({ type: 'setFocusState', focusState: false })
      dispatch({ type: 'setCurInputValue', curInputValue: '' })
      setCurRenameNode(null)
    }
  }
  /* 取消重命名 */
  const cancelRename = useCallback(() => {
    dispatch({ type: 'setFocusState', focusState: false })
  }, [dispatch])

  return { cancelRename, curRenameNode, renameKnowledgeNode, confirmRename }
}
