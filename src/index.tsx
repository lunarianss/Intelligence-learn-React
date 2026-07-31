import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfigProvider } from 'antd'
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

import ContextProvider from 'context'
import Skeletons from 'publicComponents/Skeleton'
import { RequireAuth } from 'util/requireAuth'

const HomePage = lazy(() => import('pages/HomePage/HomePage'))
const RegisterPage = lazy(() => import('pages/LoginPages/RegisterPage'))
const ClassInfoPage = lazy(() => import('pages/ClassInfoPage/ClassInfoPage'))
const QuestionBankPage = lazy(() => import('pages/ClassInfoPage/cpn-page/QuestionBankPage/QuestionBankPage'))
const CreateQuestionPage = lazy(() => import('pages/CreateQuestionPage/CreateQuestionPage'))
const CreateExamPage = lazy(() => import('pages/CreateExamPage/CreateExamPage'))
const KnowledgeGraph = lazy(() => import('pages/K-graphPage/KnowledgeGraph'))
const SourcePdfPreview = lazy(
  () => import('pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourcePdfPreview')
)
const LoginPage = lazy(() => import('pages/LoginPages/LoginPage'))
const TestPaperPreview = lazy(() => import('components/CreateExamPage/CreateExamPreview/TestPaperPreview'))
const SourceImgPreview = lazy(() => import('pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/IMagePreview'))
const MkGraph = lazy(() => import('pages/MK-graphPage/MkGraph'))
const SourceVideoPreview = lazy(
  () => import('pages/TeacherSourcePreviewPage/cpn-page/SourcePreviewPage/SourceVideoPreview')
)
const QuestionDoingPage = lazy(() => import('pages/QuestionDoingPage/QuestionDoingPage'))
const ExamSummary = lazy(() => import('pages/HomePage/cpn-page/ExamPage/ExamSummary'))
const InboxPage = lazy(() => import('pages/HomePage/cpn-page/InboxPage/InboxPage'))
const LearnPage = lazy(() => import('pages/HomePage/cpn-page/LearnPage/LearnPage'))
const ProfilePage = lazy(() => import('pages/HomePage/cpn-page/ProfilePage/ProfilePage'))
const SettingPage = lazy(() => import('pages/HomePage/cpn-page/SettingPage/SettingPage'))
const TeachPage = lazy(() => import('pages/HomePage/cpn-page/TeachPage/TeachPagePro'))
const ChapterPage = lazy(() => import('pages/ClassInfoPage/cpn-page/ChapterPage/ChapterPage'))
const DiscussPage = lazy(() => import('pages/ClassInfoPage/cpn-page/DiscussPage/DiscussPage'))
const ExamPage = lazy(() => import('pages/ClassInfoPage/cpn-page/ExamPage/ExamPage'))
const KnowledgePage = lazy(() => import('pages/ClassInfoPage/cpn-page/KnowledgePage/KnowledgePage'))
const ResourcePage = lazy(() => import('pages/ClassInfoPage/cpn-page/ResourcePage/ResourcePage'))
const TeacherSourcePreviewPage = lazy(() => import('pages/TeacherSourcePreviewPage/TeacherSourcePreviewPage'))
const PaperDoing = lazy(() => import('pages/PaperDoingPage/paperDoingPage'))
const ClassMana = lazy(() => import('pages/ClassInfoPage/cpn-page/ClassManaPage/ClassManaPage'))
const QuestionEditPage = lazy(
  () => import('publicComponents/CreateQuestionPage/QuestionPreview/QuestionEdit/QuestionEditPage')
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <ReactQueryDevtools initialIsOpen />
      <Router>
        <ContextProvider>
          <Suspense fallback={<Skeletons size={'large'} absolute={true} />}>
            <Suspense fallback={<Skeletons size={'small'} absolute={true} />}>
              <Routes>
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
              </Routes>
            </Suspense>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              ></Route>
            </Routes>

            <Routes>
              <Route path="home" element={<HomePage />}>
                <Route path="teach" element={<TeachPage />} />
                <Route path="learn" element={<LearnPage />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="setting" element={<SettingPage />} />
                <Route path="exam" element={<ExamSummary />} />
              </Route>
            </Routes>

            <Suspense fallback={<Skeletons size={'small'} absolute={true} />}>
              <Routes>
                <Route>
                  <Route path="promote/stu/:questionId" element={<QuestionDoingPage />} />
                </Route>
              </Routes>
            </Suspense>

            <Routes>
              <Route path="classInfo/:identify/:id" element={<ClassInfoPage />}>
                <Route path="chapter" element={<ChapterPage />}>
                  <Route path="teacher-preview" element={<TeacherSourcePreviewPage />}>
                    <Route path="video/:resourceId" element={<SourceVideoPreview />} />
                    <Route path="pdf/:resourceId" element={<SourcePdfPreview />} />
                    <Route path="img/:resourceId" element={<SourceImgPreview />} />
                  </Route>
                </Route>
                <Route path="exam" element={<ExamPage />}>
                  <Route path="editpaper" element={<CreateExamPage />} />
                </Route>

                <Route path="resource" element={<ResourcePage />} />
                <Route path="discuss" element={<DiscussPage />} />
                <Route path="class" element={<ClassMana />} />
                <Route path="knowledge" element={<KnowledgePage />} />
                <Route path="questionbank" element={<QuestionBankPage />}></Route>
                <Route path={'k-graph'} element={<KnowledgeGraph />} />
                <Route path={'mk-graph'} element={<MkGraph />} />
                <Route path="createquestion" element={<CreateQuestionPage />} />
                {/* 编辑题目 */}
                <Route path="edit/:questionId" element={<QuestionEditPage />} />
              </Route>
            </Routes>
            <Routes>
              {/* 预览试卷 */}
              <Route path="previewtestpaper/:paperid" element={<TestPaperPreview />} />
            </Routes>
            <Routes>
              {/* 做试卷 */}
              <Route path="homework/:paperId" element={<PaperDoing />} />
            </Routes>
            <Routes>
              {/* 做试卷 */}
              <Route path="exam/:paperId" element={<PaperDoing />} />
            </Routes>
          </Suspense>
        </ContextProvider>
      </Router>
    </ConfigProvider>
  </QueryClientProvider>
)

reportWebVitals()
