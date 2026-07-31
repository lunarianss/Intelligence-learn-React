import { useQueryClient } from '@tanstack/react-query'
import { Key, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { relateAfterPointsAPI, relatePrePointsAPI } from 'server/fetchKnowledge'
import {
  findCurRelatePoints,
  generateKnowledgeKeys,
  generateRelatePointsObj,
  relateAllPoints
} from '../../helper/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { IKnowledgePoint, PrePoint } from './type'

export const useHandleRelatePoints = (props: Omit<IHandleChapterControl<IKnowledgePoint>, 'chapterState'>) => {
  const { data, dispatchChapter: dispatch } = props
  const queryClient = useQueryClient()
  const classInfo = {
    courseId: useParams().id!
  }
  /*关联知识点API*/
  const { mutateAsync: relatePrePointsApi } = relatePrePointsAPI(classInfo.courseId)
  const { mutateAsync: relateAfterPointsApi } = relateAfterPointsAPI(classInfo.courseId)
  /*处理选择树受控展开的key*/
  const [relateKeys, setRelateKeys] = useState([])
  const [isTreeSelectModalVisible, setIsTreeSelectModalVisible] = useState(false)
  /*当前选择的的id所有知识点集合*/
  const [curCheckId, setCurCheckId] = useState([])
  const curId = useRef('')
  /*处理关联知识点*/
  const showModal = () => setIsTreeSelectModalVisible(true)
  const [curRelateType, setCurRelateType] = useState('')
  /*选择树来触发*/
  const handleRelateCheck = (checkInfo: any) => {
    const { checked } = checkInfo
    setCurCheckId(checked)
  }
  /*确认关联知识点*/
  const handleOk = async () => {
    try {
      curRelateType === '前序'
        ? await relatePrePointsApi({ pointId: curId.current, prePointId: curCheckId })
        : await relateAfterPointsApi({ pointId: curId.current, afterPointId: curCheckId })
      const result: PrePoint[] = generateRelatePointsObj(data, curCheckId, classInfo.courseId)
      relateAllPoints(
        data,
        curId.current,
        queryClient,
        result,
        curRelateType === '前序' ? 'pre' : 'after',
        classInfo.courseId
      )
    } catch (e) {
      dispatch({ type: 'setError', error: e })
      await queryClient.invalidateQueries(['knowledgeTree', classInfo.courseId])
    } finally {
      setIsTreeSelectModalVisible(false)
      setCurCheckId([])
    }
  }
  /*点击选择树进行展开和收缩*/
  const handleRelateExpand = (id: Key[], info: any) => {
    let key = info.node.key
    if (!info.node.expanded) {
      key = info.node.key
      setRelateKeys((pre) => pre.concat(key))
    } else {
      key = info.node.key
      setRelateKeys((pre) => pre.filter((v) => v != key))
    }
  }
  /*取消关联*/
  const handleCancel = () => {
    setIsTreeSelectModalVisible(false)
    setCurCheckId([])
  }
  /*点击关联前序或者是关联后序按钮*/
  const relatePoints = (mark: string, nodeId: any) => {
    /*展开所有节点*/
    setRelateKeys(generateKnowledgeKeys(data))
    setCurCheckId(findCurRelatePoints(data, nodeId, mark))
    setCurRelateType(mark)
    setIsTreeSelectModalVisible(true)
    curId.current = nodeId
  }
  return {
    handleCancel,
    relatePoints,
    handleOk,
    handleRelateCheck,
    isTreeSelectModalVisible,
    handleRelateExpand,
    showModal,
    relateKeys,
    curCheckId,
    curRelateType
  }
}
