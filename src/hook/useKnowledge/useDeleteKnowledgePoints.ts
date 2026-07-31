/*删除知识点*/
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDeleteKnowledgeAPI } from 'server/fetchKnowledge'
import { deleteKnowledgeNode } from '../../helper/knowledgeTree'
import { IHandleChapterControl } from '../useChapterStudy/type'
import { IKnowledgePoint } from './type'

export const useDeleteKnowledgePoints = (props: Omit<IHandleChapterControl<IKnowledgePoint>, 'chapterState'>) => {
  const { data, dispatchChapter: dispatch } = props
  const classInfo = {
    courseId: useParams().id!
  }
  const { mutateAsync: deleteKnowPointsAPI } = useDeleteKnowledgeAPI()
  const queryClient = useQueryClient()
  const deleteKnowledgePoint = useCallback(
    async (id: string) => {
      deleteKnowledgeNode(data, id, queryClient, classInfo.courseId)
      try {
        await deleteKnowPointsAPI({ pointIds: [id] })
      } catch (err) {
        dispatch({ type: 'setError', error: err })
        queryClient.invalidateQueries(['knowledgeTree', classInfo.courseId])
      }
    },
    [data]
  )
  return { deleteKnowledgePoint }
}
