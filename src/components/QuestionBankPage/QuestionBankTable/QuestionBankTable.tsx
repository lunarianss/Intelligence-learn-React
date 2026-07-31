import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Rate, Space, Table } from 'antd'
import { usePaperMap } from 'pages/PaperDoingPage/hook/usePaperMap'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteQuestion } from 'server/fetchExam'
import { QuestionBank } from 'server/fetchExam/types'
import { isTeachAuth } from 'util/isAuthTeach'
import { ShowDetailsCell } from './cpn/ShowDetailsCell'
import {
  QuestionBankTableWrapper,
  QuestionItemWrapper,
  QuestionOperateWrapper,
  ShowQuestionDetails,
  TotalQuestionWrapper
} from './QuestionBankTableStyle'
const { confirm } = Modal

export const QuestionBankTable: React.FC<{
  originData: QuestionBank[]
  curData: QuestionBank[]
  isAll: boolean
  select?: (i: string) => void
}> = ({ originData, curData, isAll, select }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const navigate = useNavigate()
  // 页面状态
  const [pageSize] = useState(20)
  const [currentPage] = useState(1)
  const [showDetailsKey, setKey] = useState('')
  const isTeacher = isTeachAuth()
  // 网络请求
  const { mutate } = useDeleteQuestion()
  const onSelectChange = (newSelectedRowKeys: React.SetStateAction<any[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const { paperNameMap } = usePaperMap()

  const handleRate = (n: number) => <Rate value={n + 1} disabled count={3} />

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: '您确定要删除这道题吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除以后，您可以在回收站中找回这道题',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      width: '35vw',
      centered: true,
      onOk() {
        mutate(id)
      }
    })
  }
  // 操作函数
  const isShow = (record: QuestionBank) => record.questionId === showDetailsKey
  // 表格配置
  const columns = [
    {
      title: '题目',
      dataIndex: 'questionDescription',
      width: '40%',
      ellipsis: true,
      showing: true,
      className: 'table-header',
      render: (_: any, record: QuestionBank) => (
        <QuestionItemWrapper>
          <ShowQuestionDetails
            onClick={isTeacher ? () => setKey(record.questionId) : () => navigate(`/promote/stu/${record.questionId}`)}
          >
            {record.questionDescription}
          </ShowQuestionDetails>
        </QuestionItemWrapper>
      )
    },
    {
      title: '难易度',
      dataIndex: 'questionDifficulty',
      className: 'table-header',
      width: '12%',
      render: (_: any, record: QuestionBank) => handleRate(record.questionType)
    },
    {
      title: '类型',
      dataIndex: 'questionType',
      className: 'table-header',
      width: '8%',
      render: (_: any, record: QuestionBank) => paperNameMap[record.questionType]
    },
    {
      title: '创建时间',
      width: '20%',
      className: 'table-header',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      className: 'table-header',
      render: (_: any, record: QuestionBank) => {
        return isTeacher ? (
          <QuestionOperateWrapper>
            {select ? (
              <Space>
                <Button type="primary" onClick={() => select(record.questionId)}>
                  选择
                </Button>
              </Space>
            ) : (
              <Space>
                <Button type="primary" danger onClick={() => showDeleteConfirm(record.questionId)}>
                  删除
                </Button>
                <Button type="primary" onClick={() => navigate(`../edit/${record.questionId}`)}>
                  编辑
                </Button>
              </Space>
            )}
          </QuestionOperateWrapper>
        ) : (
          <></>
        )
      }
    }
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.showing) {
      return col
    }
    return {
      ...col,
      onCell: (record: QuestionBank) => ({
        record,
        title: col.title,
        editing: isShow(record)
      })
    }
  })

  return (
    <QuestionBankTableWrapper>
      <TotalQuestionWrapper>共计{originData?.length}题</TotalQuestionWrapper>
      <Table
        style={{ fontWeight: 'bold' }}
        rowSelection={rowSelection}
        columns={mergedColumns}
        dataSource={isAll ? originData : curData}
        components={{
          body: {
            cell: ShowDetailsCell
          }
        }}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSize: pageSize,
          style: {
            paddingBottom: '10px',
            fontSize: '17px'
          },
          current: currentPage,
          pageSizeOptions: ['20', '30', '50', '100']
        }}
        rowClassName="rowStyle"
      />
    </QuestionBankTableWrapper>
  )
}
