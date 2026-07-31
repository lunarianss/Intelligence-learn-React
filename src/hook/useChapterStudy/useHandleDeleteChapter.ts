/*删除章节和课时*/
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useDeleteChapter, useDeleteClassTime, useDeleteResource } from 'server/fetch3rd/fetchChapter'
import { deleteResource, deleteTreeContent, deleteTreeNode } from '../../helper/chapterStudyTree'
import { ChapterTreeData, IHandleChapterControl } from './type'

export const useHandleDeleteChapter = (props: Omit<IHandleChapterControl<ChapterTreeData>, 'chapterState'>) => {
  const { data, dispatchChapter } = props
  const queryClient = useQueryClient()
  const classInfo = {
    courseId: useParams().id!
  }

  /*删除章节API*/
  const { mutateAsync: deleteChapterMutate } = useDeleteChapter()
  const { mutateAsync: deleteClassTimeMutate } = useDeleteClassTime()
  const { mutateAsync: deleteResourceMutate } = useDeleteResource()

  /*删除章节*/
  const handleDeleteTreeNode = useCallback(
    async (id: string) => {
      try {
        deleteTreeNode(data ?? [], id, queryClient, classInfo.courseId)
        await deleteChapterMutate(id)
      } catch (err: unknown) {
        dispatchChapter({ type: 'setError', error: err })
        await queryClient.invalidateQueries(['chapterTree', classInfo.courseId])
      }
    },
    [data]
  )
  /*删除课时*/
  const handleDeleteTreeContent = useCallback(
    async (id: string) => {
      try {
        await deleteClassTimeMutate(id)
        deleteTreeContent(data ?? [], id, queryClient, classInfo.courseId)
      } catch (err: unknown) {
        dispatchChapter({ type: 'setError', error: err })
      }
    },
    [data]
  )
  /*删除资源*/
  const handleDeleteResource = useCallback(
    async (id: string) => {
      try {
        await deleteResourceMutate(id)
        deleteResource(data ?? [], id, queryClient, classInfo.courseId)
      } catch (err) {
        dispatchChapter({ type: 'setError', error: err })
      }
    },
    [data]
  )
  return { handleDeleteTreeNode, handleDeleteTreeContent, handleDeleteResource }
}
