import { Space } from 'antd'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { isTeachAuth } from 'util/isAuthTeach'
import { PointRecommend } from './PointRecommend'
import { ContentWapper } from './QuestionBankPageStyle'
import { QuestionDashbroad } from './QuestionDashbroad'
import { QuestionList } from './QuestionList'

const QuestionBankPage: React.FC = () => {
  const tableRef = useRef<null | HTMLDivElement>(null)
  const DashbroadRef = useRef<null | HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const isTeacher = isTeachAuth()
  const navigate = useNavigate()
  const AnchorBottom = () => tableRef.current!.scrollIntoView({ behavior: 'smooth' })
  const scrollIntoView = (Ref: React.MutableRefObject<HTMLDivElement | null>) => {
    //缩放锚定
    if (Ref === tableRef) window.addEventListener('resize', AnchorBottom)
    else window.removeEventListener('resize', AnchorBottom)
    Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <GlobalHeader
        title="题库"
        tool={
          <Space>
            {isTeacher && (
              <PrimaryButton title="添加题目" handleClick={() => navigate('../createquestion', { replace: true })} />
            )}
          </Space>
        }
      ></GlobalHeader>
      <ContentWapper>
        {!isTeacher && (
          <QuestionDashbroad
            TargetRef={DashbroadRef}
            move={() => scrollIntoView(tableRef)}
            selectPoint={() => setOpen(true)}
          />
        )}
        <QuestionList TargetRef={tableRef} move={() => scrollIntoView(DashbroadRef)} />
      </ContentWapper>
      <PointRecommend open={open} close={() => setOpen(false)} />
    </>
  )
}

export default QuestionBankPage
