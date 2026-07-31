import { useQueryClient } from '@tanstack/react-query'
import { reNameTreeNode } from 'helper/chapterStudyTree'
import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IChapterReducerAction, IChapterReducerState } from 'reducer/ChaperStudyTree/type/type'
import { useEditChapter } from 'server/fetch3rd/fetchChapter'
import { ChapterTreeData } from './type'

interface IHandleChapterControl {
  data: ChapterTreeData[]
  chapterState: IChapterReducerState
  dispatchChapter: React.Dispatch<IChapterReducerAction>
}

export const useHandleRenameChapter = (props: IHandleChapterControl) => {
  const { data, dispatchChapter, chapterState } = props
  const { curAddInputValue } = chapterState
  const queryClient = useQueryClient()
  const courseId = useParams().id
  /*当前重命名节点*/
  const [curRenameNode, setCurRenameNode] = useState<ChapterTreeData | null>(null)
  /*编辑章节*/
  const { mutateAsync: editChapterMutate } = useEditChapter()
  /*重命名节点*/
  const handleReNameTreeNode = useCallback(
    (chapterId: string) => {
      reNameTreeNode(data, chapterId, setCurRenameNode, dispatchChapter)
      dispatchChapter({ type: 'setFocusState', focusState: true })
    },
    [data]
  )
  /*确认重命名*/
  const confirmRename = useCallback(async () => {
    dispatchChapter({ type: 'setFocusState', focusState: false })

    try {
      setCurRenameNode((pre: any) => {
        pre.name = curAddInputValue
        return pre
      })
      await editChapterMutate({
        chapter_id: curRenameNode?.id ?? '',
        new_name: curAddInputValue
      })
    } catch (err) {
      dispatchChapter({ type: 'setError', error: err })
      await queryClient.invalidateQueries(['chapterTree', courseId])
    } finally {
      setCurRenameNode(null)
      dispatchChapter({ type: 'setCurInputValue', curInputValue: '' })
    }
  }, [curRenameNode, curAddInputValue])
  /* 取消重命名 */
  const cancelRename = useCallback(() => {
    setCurRenameNode(null)
    dispatchChapter({ type: 'setFocusState', focusState: false })
  }, [])
  return { handleReNameTreeNode, curRenameNode, cancelRename, confirmRename }
}
