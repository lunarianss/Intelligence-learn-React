import classPicUrl from 'assets/img/class.jpg'
import { PrimaryButton } from 'publicComponents/Button'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseList } from 'server/fetchCourse/types'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper } from './ClassCardStyle'

export const ClassCard: React.FC<{
  classInfo: CourseList
  to: 'MyTeach' | 'MyStudy'
  EditModal?: () => void
}> = ({ classInfo, to, EditModal }) => {
  const [showCardEdit, setShowCardEdit] = useState(false)

  const navigate = useNavigate()

  const handleOk = () => {
    setShowCardEdit(false)
  }

  const handleCancel = () => {
    setShowCardEdit(false)
  }

  const handleClick = () => {
    navigate(`/classInfo/${to}/${classInfo.courseId}/chapter`)
  }

  return (
    <>
      {/* 这个弹窗在上一层TeachPagePro.tsx */}
      {/* <Modal title="管理课程" open={showCardEdit} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item>
            <label>更改课程名称</label>
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <label>更新课程封面</label>
          </Form.Item>
          <Form.Item>
            <label>修改课程描述</label>
          </Form.Item>
          <Form.Item>
            <label>其他选项 </label>
            <Button type='primary' danger></Button>
          </Form.Item>
        </Form>
      </Modal> */}
      <CardWrapper>
        <CardHeadWrapper>
          <img src={classInfo.coursesCover || classPicUrl} alt="课程图片" />
        </CardHeadWrapper>
        <CardBodyWrapper>
          <div className="tname">{classInfo.courseName}</div>
          <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
            <PrimaryButton
              title="进入课程"
              handleClick={handleClick}
              style={{ width: '100px', marginTop: '12px' }}
            ></PrimaryButton>
            {to == 'MyTeach' ? (
              <a className="magBtn" onClick={EditModal}>
                管理
              </a>
            ) : (
              <></>
            )}
          </div>
        </CardBodyWrapper>
      </CardWrapper>
    </>
  )
}
