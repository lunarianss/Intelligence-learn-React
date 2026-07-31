import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { GlobalHeader } from 'publicComponents/GlobalHeader/index'
import { GlobalRightLayout } from 'publicComponents/GlobalLayout/style'
import React from 'react'
import { useShowExamListPublished } from 'server/fetchExam'
import { ExamListItem } from 'server/fetchExam/types'

type TableType = ExamListItem & {
  Course?: string
}

const ExamSummary: React.FC = () => {
  const columns: ColumnsType<TableType> = [
    {
      title: '来源课程',
      dataIndex: 'Course'
    },
    {
      title: '作业名称',
      dataIndex: 'paperName'
    },
    {
      title: '完成状态',
      dataIndex: 'paperType'
    },
    {
      title: '截至日期',
      dataIndex: 'endTime'
    },
    {
      title: '操作',
      dataIndex: 'status',
      render: (_: any, record: TableType) => (
        // typeof record.status === 'number' ? (
        //   <Button>查看详情</Button>
        // ) : record.status === statusType.undone ? (
        //   <Button
        //     type="primary"
        //     onClick={() => {
        //       navigate(`/homework/${record.key}`, { replace: true })
        //     }}
        //   >
        //     去完成
        //   </Button>
        // ) : record.status === statusType.Correcting ? (
        //   <Button>去修改</Button>
        // ) : (
        <></>
      )
      // )
    }
  ]

  const { data } = useShowExamListPublished()

  // const data = useGetExam()

  console.log(data, 'data')

  return (
    <>
      <GlobalHeader title="作业和考试"></GlobalHeader>

      <GlobalRightLayout>
        <Table columns={columns} dataSource={data} pagination={false} />
      </GlobalRightLayout>
    </>
  )
}

export default ExamSummary
