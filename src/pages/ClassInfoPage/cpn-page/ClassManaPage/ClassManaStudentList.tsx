import { Avatar, Button, List, Popconfirm, Skeleton } from 'antd'
import { useUserInfo } from 'context/UserInfoContext'
import { size } from 'lodash'
// import Skeletons from 'publicComponents/Skeleton/index'

import React from 'react'

import { useDeleteStudent, useShowStudent } from 'server/fetchClass'

export const ClassManaStudentList: React.FC<{ class_id: string }> = (props) => {
  const {
    data: studentList,
    isLoading: useShowStudentIsLoading,
    refetch: useRefetchStudent
  } = useShowStudent(props.class_id)
  const { mutate: deleteStudent } = useDeleteStudent(useRefetchStudent)
  const { showUserCard } = useUserInfo()
  // const columns: ColumnsType<StudentList> = [
  //   {
  //     title: '姓名',
  //     dataIndex: 'name',
  //     key: 'name'
  //   },
  //   {
  //     title: '联系方式',
  //     dataIndex: 'mobile',
  //     key: 'mobile'
  //   },
  //   {
  //     title: '课程名称',
  //     dataIndex: 'className',
  //     key: 'className',
  //   },
  //   {
  //     title: '加入时间',
  //     dataIndex: 'joinTime',
  //     key: 'joinTime',
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <Button type='primary' danger onClick={() => {
  //           const classId = props.class_id
  //           const userId = record.userId
  //           deleteStudent({ classId, userId })
  //         }}>Delete</Button>
  //         <Button type='primary'>设为助教</Button>
  //       </Space>
  //     )
  //   }
  // ]

  return useShowStudentIsLoading ? (
    <>
      <Skeleton avatar={{size:'large'}} active paragraph={{ rows: 0 }} title={{width:'90%'}} style={{ marginLeft: '30px',marginTop:'2%',marginBottom:'3%',position:'absolute'}} />
      <Skeleton avatar={{size:'large'}} active paragraph={{ rows: 0 }} title={{width:'90%'}} style={{ marginLeft: '30px',marginTop:'11%',marginBottom:'3%',position:'absolute'}} />
      <Skeleton avatar={{size:'large'}} active paragraph={{ rows: 0 }} title={{width:'90%'}} style={{ marginLeft: '30px',marginTop:'20%',marginBottom:'3%',position:'absolute'}} />
      <Skeleton avatar={{size:'large'}} active paragraph={{ rows: 0 }} title={{width:'90%'}} style={{ marginLeft: '30px',marginTop:'29%',marginBottom:'3%',position:'absolute'}} />
      <Skeleton avatar={{size:'large'}} active paragraph={{ rows: 0 }} title={{width:'90%'}} style={{ marginLeft: '30px',marginTop:'38%',marginBottom:'3%',position:'absolute'}} />
    </>
  ) : (
    <List
      itemLayout="horizontal"
      size="small"
      dataSource={studentList}
      renderItem={(item) => (
        <List.Item className="listItem" style={{ padding: '0px' }}>
          <div className="listItemDiv">
            <div className="listItemDivHead" onClick={showUserCard!}>
              <Avatar size={65} src="\src\assets\img\pyy.png" style={{ marginLeft: '30px', margin: '10px' }} />
              <div>
                <h2 style={{ marginBottom: '0px', marginTop: '20px', fontWeight: 'bold' }}>{item.name}</h2>
                <p style={{ alignItems: 'baseline' }}>联系方式:{item.mobile}</p>
              </div>
            </div>
            <Popconfirm
              placement="top"
              title="确认删除吗"
              okText="确定"
              onConfirm={(e) => {
                e?.stopPropagation()
                const classId = props.class_id
                const userId = item.userId
                deleteStudent({ classId, userId })
              }}
              cancelText="取消"
            >
              <Button type="primary" danger className="deleteStudentButton">
                删除
              </Button>
            </Popconfirm>
          </div>
          {/* <List.Item.Meta
            avataar={<Avatar size={65} src='\src\assets\img\pyy.png' />}
            title={<p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{item.name}</p>}
            description={<p>联系方式:{item.mobile}</p>}
          /> */}
        </List.Item>
      )}
    />
    // <Table
    //   style={{ height: '500px', fontWeight: 'bold' }}
    //   size="small"
    //   columns={columns}
    //   dataSource={studentList}
    //   rowKey={record => record.userId}
    //   pagination={false}
    // />
  )
}
