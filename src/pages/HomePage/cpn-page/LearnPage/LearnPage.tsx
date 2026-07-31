import { Button, Input, message, Modal, Popconfirm, Row } from 'antd'
import Slider, { SliderMarks } from 'antd/es/slider'
import classPicUrl from 'assets/img/class.jpg'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import { ClassCard } from 'publicComponents/TeachRotePage'
import React, { useState } from 'react'
import { useJoinInvitedCourse, useShowInvitedCourseInfo, useShowLearnClass } from 'server/fetchCourse'
import styled from 'styled-components'
import { BaseSpin } from '../../../../baseUI/BaseSpin/BaseSpin'
import { CardBodyWrapper, CardHeadWrapper, CardWrapper, ModalContextWrapper } from './LearnPageStyle'

type Class = { classId: string; courseName: string; courseCover: string; teacherName: string }

const PrimaryButtonWrapper = styled.div`
  a.add-chapter {
    display: inline-block;
    width: 120px;
    height: 36px;
    box-shadow: 0 3px 8px 0 rgb(58 107 255 / 33%);
    border-radius: 13px;
    text-align: center;
    color: white;
    font-size: 14px;
    line-height: 36px;
    background: linear-gradient(140deg, #6cc7ff 0%, #5a33ff 100%);

    &:hover {
      background: linear-gradient(140deg, #89d9ff 0%, #6c4aff 100%);
    }
  }
`

const LearnPage: React.FC = () => {
  const [invitedcode, setInvitedCode] = useState('')
  const [newCourse, setNewCourse] = useState<Class | undefined>()
  const [modalVisible, setModalVisible] = useState(false)
  const [abilityNum, setAbilityNum] = useState(0)
  const [expectNum, setExpectNum] = useState(0)

  const { data: raw, isLoading } = useShowLearnClass()
  const { mutateAsync: joinClass, isLoading: isJoin } = useJoinInvitedCourse()
  const { mutateAsync, isLoading: wait } = useShowInvitedCourseInfo()

  const handleOk = async () => {
    if (invitedcode == '') message.error('请输入邀请码')
    const data = await mutateAsync(invitedcode)
    setNewCourse(data)
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  const join = async (classId: string) => {
    setModalVisible(false)
    let ability
    let expect
    if (abilityNum < 100) {
      ability = '一般'
    } else
      ability = '较好'
    if (expectNum < 50) {
      expect = '合格'
    } else if (expectNum < 100) {
      expect = '良好'
    } else
      expect = '优秀'
    await joinClass({ classId, ability, expect })
  }
  const marks1: SliderMarks = {
    0: '一般',
    100: '较好',
  };
  const marks2: SliderMarks = {
    0: '合格',
    50: '良好',
    100: '优秀',
  };

  return (
    <>
      <Modal
        maskTransitionName=""
        transitionName=""
        title="加入课程"
        width={400}
        bodyStyle={{ height: 380 }}
        open={modalVisible}
        onCancel={handleCancel}
        confirmLoading={wait}
        footer={
          newCourse
            ? [
              <Button onClick={() => (setNewCourse(undefined), setInvitedCode(''))} danger key="2">
                重新输入
              </Button>
            ]
            : [
              <Button onClick={handleOk} key="1">
                查询
              </Button>
            ]
        }
      >
        <ModalContextWrapper>
          <label className="classname-label">输入邀请码</label>
          <Input
            placeholder="课程邀请码"
            id="classname"
            value={invitedcode}
            onChange={(e) => {
              setInvitedCode(e.target.value)
            }}
          />
          {isJoin ? (
            <BaseSpin size="large" />
          ) : (
            newCourse && (
              <CardWrapper>
                <CardHeadWrapper>
                  <img src={newCourse!.courseCover || classPicUrl} alt="课程图片" />
                </CardHeadWrapper>
                <CardBodyWrapper>
                  <div className="tname">{newCourse!.courseName}</div>
                  <Popconfirm
                    placement="left"
                    title={'请为接下来的课程学习期望做一个初步确认'}
                    icon={<></>}
                    description={
                      <>
                        <p>你认为你的学习能力如何</p>
                        <Slider onChange={(v) => setAbilityNum(v)} marks={marks1} tooltip={{ open: false }} step={null} defaultValue={0} />
                        <p>你希望在这门课取得什么样的高度</p>
                        <Slider onChange={(v) => setExpectNum(v)} marks={marks2} tooltip={{ open: false }} step={null} defaultValue={0} />
                      </>
                    }
                    onConfirm={() => { join(newCourse!.classId) }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <PrimaryButtonWrapper>
                      <a className="add-chapter">
                        加入
                      </a>
                    </PrimaryButtonWrapper>
                    {/* <PrimaryButton
                      title="加入"
                      handleClick={
                        () => { }
                      }
                      style={{ width: '100px', marginTop: '12px' }}
                    /> */}
                  </Popconfirm>

                </CardBodyWrapper>
              </CardWrapper>
            )
          )}
        </ModalContextWrapper>
      </Modal>
      <>
        <GlobalHeader
          title="我学的课"
          tool={<PrimaryButton title="加入课程" handleClick={() => setModalVisible(true)}></PrimaryButton>}
        ></GlobalHeader>
        {isLoading ? (
          <Skeletons size="middle"></Skeletons>
        ) : (
          <GlobalRightLayout>
            {Array.from({ length: (raw?.length || 4 % 4) + 1 }).map((v, i) => {
              return (
                <Row key={i} style={{ marginBottom: '30px' }}>
                  {raw?.map(
                    (item, index) =>
                      index >= i * 4 && index < (i + 1) * 4 && <ClassCard to="MyStudy" classInfo={item} key={index} />
                  )}
                </Row>
              )
            })}
          </GlobalRightLayout>
        )}
      </>
    </>
  )
}

export default LearnPage

