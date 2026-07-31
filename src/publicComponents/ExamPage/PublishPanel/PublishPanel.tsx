import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, DatePicker, Modal, Space, Switch, TreeSelect } from 'antd'

import moment from 'dayjs'

import React, { useEffect, useState } from 'react'
import { useReleaseExam, useReleaseHomework } from 'server/fetchExam'
import { Childen, paperTarget, PublishExamType, PublishHomeworkType, TreeData } from '../types'
import { ExamOption } from './ExamOption'
import { HomeworkOption } from './HomeworkOption'
import { ModalWapper } from './style'

const { SHOW_PARENT } = TreeSelect

export const PublishPanel: React.FC<{
  visible: boolean
  close: () => void
  studentTree: paperTarget
  paperId: string
}> = ({ visible, close, studentTree, paperId }) => {
  const [isTiming, setIsTiming] = useState(false)
  const [isExam, setIsExamType] = useState(false)
  const [isAllowRedo, setIsAllowRedo] = useState(false)
  const [value, setValue] = useState<string[]>([])
  const dateFormat = 'YYYY-MM-DD HH:mm:ss'

  const [publishOption, setPublishOption] = useState<PublishExamType | PublishHomeworkType>({
    paper_id: paperId,
    start_time: moment(new Date()).format(dateFormat),
    end_time: moment(new Date(new Date().getDate() + 7)).format(dateFormat),
    student_ids: []
  }) //存取了所有发送网络请求需要的参数
  console.log(moment(new Date()).format(dateFormat), moment(new Date(new Date().getDate() + 7)).format(dateFormat))
  // 必须这个不然上面对象内的paperId 不更新
  useEffect(() => {
    setPublishOption({ ...publishOption, paper_id: paperId })
  }, [paperId])
  // moment(new Date())

  const { mutate: releaseExam } = useReleaseExam()
  const { mutate: releaseHomework } = useReleaseHomework()

  const treeData: TreeData[] = [] //用来放入学生选择树
  studentTree?.classList.map((i, index) => {
    const children: Childen[] = []
    i.studentList.map((i, index1) => {
      children.push({
        title: i.studentName,
        value: `${index}-${index1}`
      })
    })
    treeData.push({
      title: i.className,
      value: `${index}`,
      children: children
    })
  })

  const onChange = (newValue: string[]) => {
    setValue(newValue)
    const studentsTemp: string[] = []
    newValue.map((v) => {
      const temp = v.split('-')
      if (temp.length == 1) {
        //如果是包含的一整个班 既格式为('0')
        //遍历这个班的所有学生的id入数组
        studentTree.classList[parseInt(temp[0])].studentList.map((i) => {
          studentsTemp.push(i.studentId)
        })
      } else {
        //如果包含的是一个班中的几位同学 既格式为('0-1')
        studentsTemp.push(studentTree.classList[parseInt(temp[0])].studentList[parseInt(temp[1])].studentId)
      }
    })
    setPublishOption({ ...publishOption, student_ids: studentsTemp })
  } //学生选择树改变时触发

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '选择发布的学生',
    style: {
      width: '83%'
    }
  } //树的参数

  return (
    <Modal
      title={`发布${isExam ? '考试' : '作业'} FIXME 这里每个都选一遍才会有数据 `}
      open={visible}
      onCancel={close}
      footer={[
        <Button key="cancel" onClick={close} icon={<CloseOutlined />}>
          取消
        </Button>,
        <Button
          key="publish"
          type="primary"
          onClick={() => {
            isExam ? releaseExam(publishOption) : releaseHomework(publishOption)
            close()
          }}
          icon={<ArrowRightOutlined />}
        >
          发布
        </Button>
      ]}
    >
      <ModalWapper>
        <div>
          <Space>
            <div className="bl">发布时间：</div>
            <Switch onChange={(checked: boolean) => setIsTiming(checked)} />
            <b>
              {isTiming ? '定时发布，' : '今天发布，'}
              {publishOption.end_time.date && publishOption.start_time.date
                ? `发布 ${-publishOption.end_time.date() + publishOption.start_time.date()} 天后截止`
                : ''}
            </b>
          </Space>
          <DatePicker.RangePicker
            placement="bottomRight"
            style={{ height: '2.2rem', width: '100%' }}
            showTime
            format={dateFormat}
            // defaultValue={[publishOption.startTime, publishOption.endTime]}
            disabled={[!isTiming, false]}
            onChange={(value, d) => {
              console.log(d)
              setPublishOption({ ...publishOption, start_time: d[0], end_time: d[1] })
            }}
          />
        </div>
        <div>
          <span className="bl">发布对象：</span>
          <TreeSelect {...tProps} />
        </div>

        <div>
          <span className="bl">发布类型：</span>
          <Switch onChange={(checked: boolean) => setIsExamType(checked)} />
          <b>{isExam ? ' 作为试卷' : ' 作为作业'}</b>
        </div>
        <hr></hr>
        {isExam ? (
          <ExamOption publishOption={publishOption} setPublishOption={setPublishOption} />
        ) : (
          <HomeworkOption
            publishOption={publishOption}
            setPublishOption={setPublishOption}
            isAllowRedo={isAllowRedo}
            setIsAllowRedo={setIsAllowRedo}
          />
        )}
      </ModalWapper>
    </Modal>
  )
}
