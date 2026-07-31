import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Popconfirm, Row, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ClassDefaultPic from 'assets/img/class.jpg'
import { PrimaryButton } from 'publicComponents/Button/index'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import Skeletons from 'publicComponents/Skeleton/index'
import { ClassCard } from 'publicComponents/TeachRotePage'
import React, { useReducer } from 'react'
import { useCreateClass, useDeleteCourse, useEditCourse, useShowCreateClass } from 'server/fetchCourse'
import { CourseList } from 'server/fetchCourse/types'
import { initialState, TeachRoutePageReducer } from './config/reducer'
import { beforeUpload, getBase64 } from './config/util'
import { TeachPageWrapper, UploadImageWrapper } from './TeachPageStyle'

export const TeachPage: React.FC = () => {
  const { TextArea } = Input
  const [state, dispatch] = useReducer(TeachRoutePageReducer, initialState)
  const { data, isLoading } = useShowCreateClass()
  const { uploadLoading, modalVisible, imgUrl, className, EditVisible, EditingCourse, courseDescribe } = state
  const { mutateAsync: DeleteCourse } = useDeleteCourse()
  const { mutateAsync: EditCourse } = useEditCourse()
  const { mutateAsync: createClass } = useCreateClass({
    course_cover: imgUrl,
    course_name: className,
    course_describe: courseDescribe
  })
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      dispatch({ type: 'setUploadLoading', payload: true })
      return
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        dispatch({ type: 'setUploadLoading', payload: false })
        dispatch({ type: 'setImgUrl', payload: url })
      })
    }
  }

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const showModal = () => {
    dispatch({ type: 'setClassName', payload: '' })
    dispatch({ type: 'setCourseDescribe', payload: '' })
    dispatch({ type: 'setModalVisible', payload: true })
  }

  const handleOk = async () => {
    dispatch({ type: 'setModalVisible', payload: false })
    try {
      await createClass()
    } catch (e) {
    } finally {
      dispatch({ type: 'setClassName', payload: '' })
      dispatch({ type: 'setClassTeacher', payload: '' })
      dispatch({ type: 'setImgUrl', payload: '' })
    }
  }
  const handleCancel = () => dispatch({ type: 'setModalVisible', payload: false })

  // 打开编辑
  const handleEdit = (item: CourseList) => {
    dispatch({ type: 'setEditCourse', payload: item })
    dispatch({ type: 'setClassName', payload: item.courseName })
    dispatch({ type: 'setEditVisible', payload: true })
    dispatch({ type: 'setCourseDescribe', payload: item.courseDescribe })
  }
  // 删除
  const handleDelete = async () => {
    await DeleteCourse(EditingCourse.courseId)
    dispatch({ type: 'delClasList', payload: EditingCourse.courseId })
    dispatch({ type: 'setEditVisible', payload: false })
  }
  // 确认编辑
  const confirmEdit = async () => {
    await EditCourse({
      courseId: EditingCourse.courseId,
      courseName: className,
      coursesCover: imgUrl,
      courseDescribe: courseDescribe
    })
    dispatch({ type: 'setEditVisible', payload: false })
    // 页面更新
    dispatch({ type: 'setClasList', payload: EditingCourse })
  }

  return (
    <>
      <TeachPageWrapper>
        <>
          {' '}
          {/* 新建课程弹出窗 */}
          <Modal
            title="新建课程"
            open={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <label className="classname-label" htmlFor="classname">
              请输入课程名称
            </label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
            <div className="classname-label">请上传课程图片</div>
            <UploadImageWrapper>
              <img src={ClassDefaultPic} alt="默认课程图片" />
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </UploadImageWrapper>
            <TextArea
              rows={4}
              value={courseDescribe}
              placeholder={'请输入课程描述'}
              onChange={(e) => {
                dispatch({ type: 'setCourseDescribe', payload: e.target.value })
              }}
            />
          </Modal>
          {/* 编辑课程弹出窗 */}
          <Modal
            title="管理课程"
            open={EditVisible}
            onOk={confirmEdit}
            onCancel={() => dispatch({ type: 'setEditVisible', payload: false })}
            okText="确认"
            cancelText="取消"
          >
            <label className="classname-label" htmlFor="classname">
              更改课程名称
            </label>
            <Input
              placeholder="课程名称"
              id="classname"
              value={className}
              onChange={(e) => {
                dispatch({ type: 'setClassName', payload: e.target.value })
              }}
            />
            <div className="classname-label">更新课程封面</div>
            <UploadImageWrapper>
              <img src={ClassDefaultPic} alt="默认课程图片" />
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </UploadImageWrapper>
            <div className="classname-label">修改课程描述</div>
            <TextArea
              rows={4}
              value={courseDescribe}
              onChange={(e) => {
                dispatch({ type: 'setCourseDescribe', payload: e.target.value })
              }}
            />
            <div className="classname-label">其他选项</div>
            <Popconfirm onConfirm={handleDelete} title="你确定这样做吗，这将解散全部学生并删除里面的资源">
              <Button type="primary" danger>
                删除课程
              </Button>
            </Popconfirm>
          </Modal>
        </>
        <GlobalHeader
          title="我教的课"
          tool={<PrimaryButton title="新建课程" handleClick={showModal}></PrimaryButton>}
        ></GlobalHeader>
        {isLoading ? (
          <Skeletons size="middle" />
        ) : (
          <>
            <GlobalRightLayout className="globalLayout">
              {Array.from({ length: (data?.length || 4 % 4) + 1 }).map((v, i) => (
                <Row key={i} style={{ marginBottom: '30px' }}>
                  {data?.map(
                    (item, index) =>
                      index >= i * 4 &&
                      index < (i + 1) * 4 && (
                        <ClassCard
                          to="MyTeach"
                          classInfo={item}
                          key={item.courseId}
                          EditModal={() => handleEdit(item)}
                        />
                      )
                  )}
                </Row>
              ))}
            </GlobalRightLayout>
          </>
        )}
      </TeachPageWrapper>
    </>
  )
}

export default TeachPage
