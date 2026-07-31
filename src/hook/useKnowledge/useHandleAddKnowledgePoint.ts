import { useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useAddKnowledgePointsAPI } from 'server/fetchKnowledge'
import { addChildKnowledgeNode, deleteKnowledgeNode, updateKnowledgeTreeQueryCache } from '../../helper/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { initialKnowledgePoint } from './config'
import { IKnowledgePoint } from './type'

export const useAddKnowledgePoints = (props: IHandleChapterControl<IKnowledgePoint>) => {
  const { data, chapterState: knowledgeState, dispatchChapter: dispatch } = props
  const [curKnowledgeNode, setCurKnowledgeNode] = useState<IKnowledgePoint | null>(null)
  const { classInfo } = useCurrentClassInfo()

  const { mutateAsync: addKnowledgePoints } = useAddKnowledgePointsAPI()
  const knowledgeNode: IKnowledgePoint = useMemo(() => Object.assign({}, initialKnowledgePoint), [data])
  const queryClient = useQueryClient()
  const curId = useRef('')
  /*添加知识点*/
  const addKnowledgePoint = useCallback(() => {
    curId.current = ''
    setCurKnowledgeNode(knowledgeNode)
    updateKnowledgeTreeQueryCache(
      (queryTreeData: IKnowledgePoint[]) => queryTreeData.concat(knowledgeNode),
      queryClient,
      classInfo.courseId
    )
    dispatch({ type: 'setFocusState', focusState: true })
  }, [data])
  /*添加子知识点*/
  const addKnowledgeChildrenPoint = useCallback(
    (id: string) => {
      curId.current = id
      /*这里node保持引用，之后可以修改根据引用来创建name*/
      dispatch({ type: 'setFocusState', focusState: true })
      addChildKnowledgeNode(data, id, queryClient, knowledgeNode, classInfo.courseId)
      setCurKnowledgeNode(knowledgeNode)
    },
    [data]
  )

  /*确认添加知识点*/
  const confirmAdd = useCallback(async () => {
    const isTrim = knowledgeState.curAddInputValue.trim() === ''
    if (isTrim) message.info('不能添加空字段')
    if (!isTrim)
      try {
        dispatch({ type: 'setFocusState', focusState: false })
        const knowledgeId = await addKnowledgePoints({
          pointName: knowledgeState.curAddInputValue,
          pointPid: !curId.current ? '555' : curId.current,
          courseId: classInfo.courseId
        })
        if (knowledgeId) {
          setCurKnowledgeNode((pre) => {
            if (pre) {
              pre.pointId = knowledgeId
              pre.pointName = knowledgeState.curAddInputValue
              pre.pointPid = curId.current
            }

            return pre
          })
        } else {
          deleteKnowledgeNode(data, curKnowledgeNode?.pointId, queryClient, classInfo.courseId)
        }
      } catch (err: unknown) {
        dispatch({ type: 'setError', error: err })
        deleteKnowledgeNode(data, curKnowledgeNode?.pointId, queryClient, classInfo.courseId)
      } finally {
        dispatch({ type: 'setCurInputValue', curInputValue: '' })
        curId.current = ''
        setCurKnowledgeNode(null)
      }
  }, [data, knowledgeState])
  /*取消添加节点*/
  const cancelAdd = () => {
    deleteKnowledgeNode(data, '-1', queryClient, classInfo.courseId)
    dispatch({ type: 'setFocusState', focusState: false })
  }
  return { confirmAdd, addKnowledgePoint, curKnowledgeNode, setCurKnowledgeNode, cancelAdd, addKnowledgeChildrenPoint }
}
