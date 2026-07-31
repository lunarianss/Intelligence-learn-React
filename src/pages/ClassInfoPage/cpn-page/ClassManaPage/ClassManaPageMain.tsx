import { Button, Input, List, message, Modal, Popconfirm, Typography } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { PrimaryButton } from 'publicComponents/Button'
import { GlobalHeader } from 'publicComponents/GlobalHeader'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton'
import React, { useState } from 'react'
import { useCreateNewClass, useDeleteClass, useReName } from 'server/fetchClass'
import { ClassList } from 'server/fetchClass/types'
import { isTeachAuth } from 'util/isAuthTeach'
import './ClassManaPageMainStyle.css'
import { ClassManaStudentList } from './ClassManaStudentList'
export const ClassManaMain: React.FC<{ classList: ClassList[]; isLoading: boolean }> = ({ classList, isLoading }) => {
  const [input, setInput] = useState('')
  const [vis, setVis] = useState(false)
  const [show, setShow] = useState<ClassList | null>()
  const [add, setadd] = useState(false)

  const { classInfo } = useCurrentClassInfo()
  const { mutate: Rename, isLoading: renameState } = useReName(classInfo.courseId)
  const { mutate: DeleteClass } = useDeleteClass(classInfo.courseId)
  const { mutate: Add } = useCreateNewClass(classInfo.courseId)
  //删除班级的函数
  const removeClassFun = (id: string) => {
    DeleteClass(id)
    setVis(false)
  }

  // 点击分享
  const share = (invitedcode: string) => {
    navigator.clipboard.writeText(invitedcode).then(
      () => message.success('邀请码已复制到剪切板'),
      () => message.error('复制失败，请检测浏览器版本或权限设置')
    )
  }
  // 添加班级
  const AddClass = () => {
    setadd(false), Add(input)
  }

  return (
    <>
      <>
        <Modal title="请输入班级名称" centered open={add} onOk={AddClass} onCancel={() => setadd(false)}>
          <Input placeholder="班级名称" id="classname" value={input} onChange={(e) => setInput(e.target.value)} />
        </Modal>
        {/* 班级详情 */}
        {show && (
          <Modal
            zIndex={1}
            title={
              renameState ? (
                <BaseLoading />
              ) : (
                <Typography.Title
                  editable={{
                    onChange: (value) => {
                      setInput(value)
                    },
                    onEnd() {
                      Rename({ classId: show.class_id, className: input }), setVis(false)
                    }
                  }}
                  level={4}
                  style={{ margin: 0 }}
                >
                  {' '}
                  {`${show.class_name}`}{' '}
                </Typography.Title>
              )
            }
            centered
            open={vis}
            width="1000px"
            footer={
              <>
                <Popconfirm
                  placement="top"
                  title="你确定哟啊删除此班级吗？全部学生将被解散。你可以设置为结课状态保留这个班级，"
                  okText="删除并解散全部学生"
                  onConfirm={() => show && removeClassFun(show.class_id)}
                  cancelText="取消"
                >
                  <Button type="primary" danger>
                    删除这个班级
                  </Button>
                </Popconfirm>
                <Button
                  type="primary"
                  onClick={() => {
                    share(show.class_invitation_code)
                  }}
                >
                  复制邀请码
                </Button>
              </>
            }
            onCancel={() => setVis(false)}
          >
            {/* 等到接口上了之后再打开 */}
            <div style={{ padding: 0, margin: 0,height:'600px' }}>
              <ClassManaStudentList class_id={show.class_id} />
            </div>
          </Modal>
        )}
        {/* 主体内容 */}
        <GlobalHeader
          title="班级管理"
          tool={isTeachAuth() && <PrimaryButton handleClick={() => setadd(true)} title="新建班级" />}
        ></GlobalHeader>
        <GlobalRightLayout>
          {isLoading ? (
            <Skeletons size="middle" />
          ) : (
            <List
              size="large"
              dataSource={classList}
              renderItem={(item) => (
                <List.Item className="ClassListItem">
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 'large' }}>{item.class_name}</div>
                    <div style={{ fontSize: 'small', fontWeight: 'bold', color: 'gray' }}>
                      学生人数:{item.student_number}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', display: 'flex', flexDirection: 'row', left: '50%' }}>
                    <div
                      className="operate"
                      onClick={() => {
                        setShow(item), setVis(true)
                      }}
                    >
                      管理班级
                    </div>
                    <div
                      className="operate"
                      onClick={() => {
                        share(item.class_invitation_code)
                      }}
                    >
                      复制邀请码
                    </div>
                  </div>
                  <div style={{ color: 'gray', fontWeight: 'bold' }}>邀请码:{item.class_invitation_code}</div>
                </List.Item>
              )}
            />
          )}
        </GlobalRightLayout>
      </>
    </>
  )
}
