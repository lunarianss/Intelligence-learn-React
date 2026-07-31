import React, { useMemo } from 'react'

import { Button, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { GlobalMessage } from 'publicComponents/GlobalMessage/index'
import Skeletons from 'publicComponents/Skeleton/index'
import { useNavigate } from 'react-router-dom'
import { useHomeWorkListPublished, useShowExamListPublished } from 'server/fetchExam'

enum statusType {
  'undone' = '未提交',
  'Correcting' = '待批改'
}

type TableType = {
  isReview: boolean
  paperId: string
  paperName: string
  isDone: boolean
  hasRemakeTime: number
  startTime: string
  endTime: string
}

export const StudentExamPage: React.FC<{
  classId: string
}> = ({ classId }) => {
  const navigate = useNavigate()
  const { data: dataH } = useHomeWorkListPublished(classId)
  const { data: dataE, isLoading } = useShowExamListPublished(classId)
  console.log(dataH, dataE, 'dataH', 'dataE')
  const data = useMemo(() => (dataH && dataE ? [...dataE!, ...dataH!] : []), [dataH, dataE])

  const startExam = (paperId: string) => {
    window.open(`/exam/${paperId}`)
  }

  const columns: ColumnsType<TableType> = [
    {
      key: '1',
      title: '作业名称',
      dataIndex: 'paperName'
    },
    {
      key: '2',
      title: '完成状态',
      dataIndex: 'isDone',
      render: (_: any, record: TableType) => {
        return <>{record.isDone ? '已完成' : '未完成'}</>
      }
    },

    {
      key: '3',
      title: '截至日期',
      dataIndex: 'endTime',
      render: (_: any, record: TableType) => {
        return <>{record.endTime?.split('T')?.join(' ')}</>
      }
    },

    {
      key: '4',
      title: '操作',
      dataIndex: 'status',
      render: (_: any, record: TableType) => {
        const isExpiration = dayjs().isAfter(dayjs(record?.endTime?.split('T')?.join(' ')))
        return (
          <>
            {isExpiration ? (
              <Button disabled>已过期</Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  if (record.isDone) {
                    GlobalMessage('info', '不能重新考试')
                    return
                  }
                  startExam(record.paperId)
                }}
              >
                {record.isDone ? '已经提交' : '开始考试'}
              </Button>
            )}
          </>
        )
      }
    }
  ]

  return <>{isLoading ? <Skeletons size="middle" /> : <Table columns={columns} dataSource={data} />}</>
}
