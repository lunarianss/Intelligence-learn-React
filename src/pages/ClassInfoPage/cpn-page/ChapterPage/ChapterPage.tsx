import { ChapterStudyTree } from 'components/ClassInfoPage/ChapterPage/ChapterStudyTree/ChapterStudyTree'
import { useChapterUI } from 'hook/useChapterStudy/useChapterUI'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { isTeachAuth } from 'util/isAuthTeach'
import { BaseSpin } from '../../../../baseUI/BaseSpin/BaseSpin'

const ChapterPage: React.FC = () => {
  const editable = isTeachAuth()
  const { treeData, chapterControl } = useChapterUI(editable)
  return (
    <>
      <GlobalHeader
        title="课程章节学习"
        tool={
          editable && (
            <PrimaryButton title="添加章节" handleClick={chapterControl.handleClickAddChapter}></PrimaryButton>
          )
        }
      ></GlobalHeader>

      <GlobalRightLayout>
        {chapterControl.isLoading ? (
          <Skeletons size="middle" />
        ) : (
          <ChapterStudyTree treeData={treeData} chapterControl={chapterControl} />
        )}
      </GlobalRightLayout>
      <Suspense fallback={<BaseSpin size={'large'} />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default ChapterPage
