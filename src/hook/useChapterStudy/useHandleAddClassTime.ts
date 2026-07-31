import { useClassTimeDispatch } from 'context/ChapterStudyTree/ClassTimeDispatchContext'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddContent } from 'server/fetch3rd/fetchChapter'
import { noTrim } from 'util/noTrim'
import { ClassTimeNode } from './config'
import { ChapterTreeData, ClassTimeInitNode, IHandleChapterControl } from './type'

export const useHandleAddClassTime = (props: Omit<IHandleChapterControl<ChapterTreeData>, 'chapterState'>) => {
  const { data, dispatchChapter } = props
  const curChapterId = useRef('')
  const { dispatch, classTimeState } = useClassTimeDispatch()
  const courseId = useParams().id!

  /*当前课时节点*/
  const [curClassTimeNode, setCurClassTimeNode] = useState<ClassTimeInitNode | null>(null)
  /* 添加课时API*/
  const { mutateAsync: addContentMutate, isLoading: addContentLoading } = useAddContent(courseId)
  /*课时节点*/
  const classTimeInitNode = useMemo(() => Object.assign({}, ClassTimeNode), [data])
  /*添加课时*/
  const handleClickAddChildCourseTime = useCallback(
    (chapterId: any) => {
      dispatch({ type: 'setModalState', open: true })
      curChapterId.current = chapterId
      setCurClassTimeNode(classTimeInitNode)
    },
    [classTimeInitNode]
  )

  /*确认添加课时*/
  const handleConfirmAddClassTime = useCallback(async () => {
    const addChapterId: string = curChapterId.current
    const isTrim = noTrim(classTimeState.courseTimeName)
    if (isTrim) return

    const resourceIds = classTimeState.ids
    try {
      await addContentMutate({
        chapter_id: addChapterId,
        name: classTimeState.courseTimeName,
        resource_ids: resourceIds,
        paper_id: '',
        paper_name: ''
      })
    } catch (err) {
      dispatchChapter({ type: 'setError', error: err })
    } finally {
      dispatch({ type: 'setModalState', open: false })
      dispatch({ type: 'setName', name: '' })
      dispatch({ type: 'clearId' })
      dispatch({ type: 'setFileList', fileObj: () => [] })
      dispatch({ type: 'initNameAndFileList' })
    }
  }, [data, curClassTimeNode, classTimeState])
  return {
    handleConfirmAddClassTime,
    handleClickAddChildCourseTime,
    classTimeState,
    addContentLoading
  }
}
