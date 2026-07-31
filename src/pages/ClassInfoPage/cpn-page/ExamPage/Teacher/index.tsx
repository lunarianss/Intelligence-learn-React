import { AreaChartOutlined, ArrowRightOutlined, DeliveredProcedureOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, DatePicker, Drawer, InputNumber, Modal, Radio, Space, Table, Tree } from 'antd'
import { message } from 'antd/es'
import type { ColumnsType } from 'antd/es/table'
import { TreeSelected } from 'components/ClassInfoPage/KnowledgePage/KnowledgeTree/cpn/TreeSelected'
import dayjs from 'dayjs'
import { StatisticsPanel } from 'publicComponents/ExamPage/StatisticsPanel/StatisticsPanel'
import { ClassList } from 'publicComponents/ExamPage/types/index'
import Skeletons from 'publicComponents/Skeleton/index'
import React, { Key, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetPaperTarget, useReleaseExam, useReleaseHomework, useShowExamList } from 'server/fetchExam'
import { ExamListItem } from 'server/fetchExam/types'
import styled from 'styled-components'
import { useImmer } from 'use-immer'
import { BaseSpin } from '../../../../../baseUI/BaseSpin/BaseSpin'

const { TreeNode } = Tree

const StudentListWrapper = styled.div`
  height: 427px;
`
const ExamListWrapper = styled.div``

export const ExamList: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { data, isLoading } = useShowExamList(courseId)

  const { data: publishTarget, mutateAsync: getPublishTarget } = useGetPaperTarget(courseId)

  const navigate = useNavigate()
  const [statistics, setStatistics] = useState(false)
  const initialExamPublish = {
    publishModalVisible: false,
    paperId: '',
    stuLen: 0,
    stuListModalVisible: false,
    distributeWay: 1,
    paperName: '',
    startTime: '',
    endTime: '',
    limitTime: 45
  }
  const initialStuTreeSelect = { expandKeys: [], checkedKeys: [] }

  const [examPublish, setExamPublish] = useImmer(initialExamPublish)

  const [stuTreeSelect, setStuTreeSelect] = useImmer<{ expandKeys: string[]; checkedKeys: string[] }>(
    initialStuTreeSelect
  )
  console.log(publishTarget, 'target')
  const { mutate: releaseExam } = useReleaseExam()

  const { mutate: releaseHomework } = useReleaseHomework()

  const columns: ColumnsType<ExamListItem> = [
    {
      title: '试卷名字',
      dataIndex: 'paperName',
      key: 'paperName'
    },
    {
      title: '完成状态',
      dataIndex: 'isRelease',
      key: 'status'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Space size="middle">
            <Button icon={<AreaChartOutlined />} onClick={() => setStatistics(true)}>
              统计
            </Button>
            <Button
              icon={<DeliveredProcedureOutlined />}
              onClick={() => {
                getPublishTarget(record.paperId)
                setExamPublish((draft) => {
                  draft.paperId = record.paperId
                  draft.publishModalVisible = true
                  draft.paperName = record.paperName
                })
              }}
            >
              发布
            </Button>
            <Button icon={<ArrowRightOutlined />} onClick={() => navigate(`/previewtestpaper/${record.paperId}`)}>
              打开
            </Button>
          </Space>
        </>
      )
    }
  ]

  const checkStudent = (e: any) => {
    setStuTreeSelect((draft) => {
      draft.checkedKeys = [...e.checked]
    })
  }

  const onClose = () => {
    setExamPublish((draft) => {
      draft.publishModalVisible = false
    })
  }

  const completeChooseStu = () => {
    setExamPublish((draft) => {
      draft.stuListModalVisible = false
      draft.stuLen = stuTreeSelect.checkedKeys.length
    })
  }

  const changeDistributeWay = (e: any) => {
    setExamPublish((draft) => {
      draft.distributeWay = e.target.value
    })
  }

  /*点击选择树进行展开和收缩*/
  const handleRelateExpand = (id: Key[], info: any) => {
    let key = info.node.key
    if (!info.node.expanded) {
      key = info.node.key
      setStuTreeSelect((draft) => {
        draft.expandKeys.push(key)
      })
    } else {
      key = info.node.key
      setStuTreeSelect((draft) => {
        draft.expandKeys = draft.expandKeys.filter((v) => v != key)
      })
    }
  }

  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const confirmPublish = () => {
    const isImmediate = examPublish.distributeWay === 1

    const isPass = () => {
      return stuTreeSelect.checkedKeys.length > 0 && examPublish.endTime && examPublish.limitTime && examPublish.stuLen
    }

    try {
      if (isPass()) {
        releaseExam({
          paper_id: examPublish.paperId,
          student_ids: stuTreeSelect.checkedKeys,
          start_time: isImmediate ? dayjs(new Date()).format(dateFormat) : examPublish.startTime,
          end_time: examPublish.endTime,
          limit_time: examPublish.limitTime
        })
      } else {
        message.info('请填写完所有必填的信息！')
      }
    } catch (err) {
    } finally {
      setExamPublish(initialExamPublish)
      setStuTreeSelect(initialStuTreeSelect)
    }
  }

  const getStudentListTreeData = () => {
    return publishTarget?.classList.map((classList: ClassList, index) => {
      let stuList
      if (classList.studentList && classList.studentList.length) {
        stuList = classList.studentList.map((stu) => {
          return <TreeNode checkable={!stu.isReleased} title={stu.studentName} key={stu.studentId}></TreeNode>
        })
      }
      return (
        <TreeNode title={classList.className} key={index} checkable={false}>
          {stuList}
        </TreeNode>
      )
    })
  }

  const changeExamNumber = (value: number | null) => {
    setExamPublish((draft) => (draft.limitTime = value || Number.MAX_VALUE))
  }

  return isLoading ? (
    <Skeletons size="middle" />
  ) : (
    <ExamListWrapper>
      <Table columns={columns} dataSource={data!} rowKey="paperId" />
      <StatisticsPanel visible={statistics} close={() => setStatistics(false)} />

      <Drawer
        title={`${examPublish.paperName}`}
        placement="right"
        onClose={onClose}
        open={examPublish.publishModalVisible}
        mask={false}
        extra={
          <Button type="primary" onClick={confirmPublish}>
            点击发布
          </Button>
        }
      >
        <div>
          <Button
            icon={<UserAddOutlined />}
            onClick={() =>
              setExamPublish((draft) => {
                draft.stuListModalVisible = true
              })
            }
          >
            发放对象
          </Button>
          <span style={{ marginLeft: '12px ' }}>已经选择了 {examPublish.stuLen} 位学生</span>
        </div>
        <div style={{ margin: '12px 0' }}>
          <span>发放时间：</span>
          <Radio.Group onChange={changeDistributeWay} value={examPublish.distributeWay}>
            <Radio value={1}>立即发放</Radio>
            <Radio value={2}>定时发放</Radio>
          </Radio.Group>

          <DatePicker
            format={dateFormat}
            onChange={(_, d) => {
              setExamPublish((draft) => {
                draft.startTime = d
              })
            }}
            showTime
            style={{ display: examPublish.distributeWay === 1 ? 'none' : 'block' }}
          />
        </div>

        <div style={{ margin: '12px 0' }}>
          <span>截至时间：</span>
          <DatePicker
            format={dateFormat}
            onChange={(_, d) => {
              setExamPublish((draft) => {
                draft.endTime = d
              })
            }}
            showTime
          />
        </div>

        <div style={{ margin: '12px 0' }}>
          <span>考试时间：</span>
          <InputNumber
            size="large"
            min={1}
            max={100000}
            defaultValue={examPublish.limitTime}
            onChange={changeExamNumber}
          />
          <span style={{ marginLeft: '12px' }}>分钟</span>
        </div>
      </Drawer>

      <Modal
        open={examPublish.stuListModalVisible}
        onCancel={() =>
          setExamPublish((draft) => {
            draft.stuListModalVisible = false
          })
        }
        title="学生列表"
        onOk={completeChooseStu}
      >
        <StudentListWrapper>
          {publishTarget ? (
            <TreeSelected
              checkTreeData={getStudentListTreeData()}
              relateKeys={stuTreeSelect.expandKeys}
              handleRelateCheck={checkStudent}
              handleRelateExpand={handleRelateExpand}
              curCheckId={stuTreeSelect.checkedKeys}
            />
          ) : (
            <BaseSpin size="large" />
          )}
        </StudentListWrapper>
      </Modal>
    </ExamListWrapper>
  )
}
