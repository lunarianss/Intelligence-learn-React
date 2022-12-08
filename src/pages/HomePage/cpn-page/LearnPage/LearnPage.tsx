import React, { useState } from 'react'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper, ModalContextWrapper } from './LearnPageStyle'
import { Button, Input, Modal, Row } from 'antd'
import { ClassCard } from 'publicComponents/TeachRotePage'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/index'
import { PrimaryButton } from 'publicComponents/Button'
type Class = {classId: string, courseName: string, courseCover: string, teacherName: string}

export const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<Class | undefined>()

  const { data, isLoading } = useShowLearnClass()
  const { mutate: joinClass } = useJoinInvitedCourse()


  // 窗口一
  const [modalVisible, setModalVisible] = useState(false)

  const { mutateAsync, isLoading: wait } = useShowInvitedCourseInfo()

  const handleOk = async () => {
    const data = await mutateAsync(invitedcode)
    console.log(data);
    setNewCourse(data)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const join = () => {
    newCourse ? joinClass(newCourse.classId) : console.log("没有查询到班级");
    setModalVisible(false);
    setNewCourse(undefined);
  }


  return (
    <>
      <>
        <Modal
          maskTransitionName=""
          transitionName=""
          title="加入课程"
          width={250}
          visible={modalVisible}
          onCancel={handleCancel}
          confirmLoading={wait}
          footer={ newCourse?[]:[
            <Button onClick={handleOk} key='1'>查询</Button>
          ]}
        >
          <ModalContextWrapper>
            {newCourse ? <>
              <CardWrapper>
                <CardHeadWrapper>
                <img src={require('assets/img/class.jpg')} alt="课程图片" />
                </CardHeadWrapper>
                <CardBodyWrapper>
                  <div className="tname">{newCourse.courseName}</div>
                  {/* <h3>{newCourse.teacherName}</h3> */}
                  <PrimaryButton title='加入' handleClick={join}
                    style={{ width: '100px', marginTop: '12px' }}
                  />
                </CardBodyWrapper>
              </CardWrapper>
            </> : <>
              <label className="classname-label">输入邀请码</label>
              <Input
                placeholder="课程邀请码"
                id="classname"
                value={invitedcode}
                style={{ margin: '3px 0 12px 0' }}
                onChange={(e) => {
                  setInvitedCode(e.target.value)
                }}
                />
            </>}
            {wait && <BaseLoading />}
          </ModalContextWrapper>
        </Modal>
      </>
      {/* <>
        <Modal
          title="正在加入这门课"
          visible={modal2Visible}
          onOk={handleOk2}
          onCancel={handleCancel2}
          okText="确认"
          cancelText="取消"
          confirmLoading={confirmLoading2}
          width={300}
        >
          <ModalContextWrapper>

          </ModalContextWrapper>
        </Modal>
      </> */}
      <>
        <GlobalHeader
          title="我学的课"
          tool={<PrimaryButton title="加入课程" handleClick={()=>setModalVisible(true)}></PrimaryButton>}
        ></GlobalHeader>
        <GlobalRightLayout>
          { isLoading ? <BaseLoading /> :
            Array.from({ length: (data?.length || 4 % 4) + 1 }).map(
              (v, i) => <Row key={i} style={{ marginBottom: '30px' }}>
                {data?.map((item, index) => index >= i * 4 && index < (i + 1) * 4 &&
                  <ClassCard to='MyStudy' classInfo={item} key={item.courseId} />
                )}
              </Row>
            )
          }
        </GlobalRightLayout>
      </>
    </>
  )
}
