import { PrimaryButton } from 'publicComponents/Button/index'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import { Suspense } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { isTeachAuth } from 'util/isAuthTeach'
import { BaseSpin } from '../../../../baseUI/BaseSpin/BaseSpin'
import { StudentExamPage } from './Student'
import { ExamList } from './Teacher'

const ExamPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <GlobalHeader
        title="考试作业"
        tool={
          isTeachAuth() ? (
            <PrimaryButton title="添加考试" handleClick={() => navigate('editpaper')}></PrimaryButton>
          ) : (
            <></>
          )
        }
      ></GlobalHeader>
      <GlobalRightLayout>
        {isTeachAuth() ? (
          <ExamList courseId={useParams().id!}></ExamList>
        ) : (
          <StudentExamPage classId={useParams().id!} />
        )}
      </GlobalRightLayout>
      <Suspense fallback={<BaseSpin size="large" />}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default ExamPage
