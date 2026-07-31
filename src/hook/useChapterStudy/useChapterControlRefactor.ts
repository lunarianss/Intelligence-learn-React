import { useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { chapterReducer, initialChapterState } from 'reducer/ChaperStudyTree/chapterReducer'
import { useShowChapter } from 'server/fetch3rd/fetchChapter'
import { useHandleAddChapter } from './useHandleAddChapter'
import { useHandleAddClassTime } from './useHandleAddClassTime'
import { useHandleDeleteChapter } from './useHandleDeleteChapter'
import { useHandleRenameChapter } from './useHandleRenameNode'
import { useHandleOnExpand } from './useHandleTreeOnExpand'

export const useChapterControlRefactor = () => {
  /* ChapterNode Reducer */
  const [chapterState, dispatchChapter] = useReducer(chapterReducer, initialChapterState)

  const { data, isLoading } = useShowChapter(useParams().id!, dispatchChapter)

  /* 添加章节 */
  const { curAddNode, handleClickAddChapter, confirmAddChapter, cancelAddChapter, handleClickAddChildChapter } =
    useHandleAddChapter({
      data: data ?? [],
      chapterState,
      dispatchChapter
    })

  /* 编辑章节 */
  const { confirmRename, curRenameNode, cancelRename, handleReNameTreeNode } = useHandleRenameChapter({
    data: data ?? [],
    chapterState,
    dispatchChapter
  })

  /* 删除章节 */
  const { handleDeleteResource, handleDeleteTreeContent, handleDeleteTreeNode } = useHandleDeleteChapter({
    data: data ?? [],
    dispatchChapter
  })

  /* 添加课时 */
  const { handleConfirmAddClassTime, handleClickAddChildCourseTime, classTimeState, addContentLoading } =
    useHandleAddClassTime({
      data: data ?? [],
      dispatchChapter
    })

  /* 点击树节点交互 */
  const { handleOnExpand } = useHandleOnExpand(dispatchChapter)

  return {
    chapterControl: {
      confirmAddChapter,
      cancelAddChapter,
      cancelRename,
      confirmRename,
      handleDeleteResource,
      dispatchChapter,
      curAddInputValue: chapterState.curAddInputValue,
      handleReNameTreeNode,
      handleClickAddChapter,
      handleClickAddChildChapter,
      handleClickAddChildCourseTime,
      handleDeleteTreeNode,
      curAddNode,
      data,
      curRenameNode,
      focusStatus: chapterState.focusState,
      isLoading,
      expandKeys: chapterState.expandKeys,
      isModalVisible: classTimeState.courseTimeModalVisible,
      handleOnExpand,
      handleOk: handleConfirmAddClassTime,
      handleDeleteTreeContent,
      addContentLoading
    }
  }
}
