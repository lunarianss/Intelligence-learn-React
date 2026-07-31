export interface paperTarget {
  classList: ClassList[]
}

export interface ClassList {
  className: string
  studentList: {
    studentId: string
    studentName: string
    isReleased: 0 | 1
  }[]
}

export interface TreeData {
  title: string
  value: string
  children: Childen[]
}

export interface Childen {
  title: string
  value: string
}

export interface PublishExamType {
  /**
   * 结束时间
   */
  end_time?: any
  /**
   * 是否允许补交
   */
  isAllowMakeUp?: number
  /**
   * 是否可以查看试卷
   */
  isAllowShowPaper?: number
  /**
   * 是否区分大小写
   */
  isDistinguishCase?: number
  /**
   * 是否取多次最高成绩
   */
  isGetHighScore?: number
  /**
   * 是否可以查看排名
   */
  isShowRank?: number
  /**
   * 是否可以查看分数
   */
  isShowScore?: number
  /**
   * 限制考试时间
   */
  limitEnterTime?: number
  /**
   * 限制提交时间
   */
  limitSubmitTime?: number
  /**
   * 限制时间
   */
  limit_time?: number
  /**
   * 试卷id
   */
  paper_id: string
  /**
   * 及格分数
   */
  passScore?: number
  /**
   * 重做次数
   */
  remakeTime?: number
  /**
   * 开始时间
   */
  start_time?: any
  /**
   * 发放学生
   */
  student_ids: string[]
}

export interface PublishHomeworkType {
  /**
   * 结束时间
   */
  end_time?: string
  /**
   * 是否允许重做
   */
  isAllowMakeUp?: number
  /**
   * 是否取最高分
   */
  isGetHighScore?: number
  /**
   * 是否多选题未选全给一半分， 默认0否， 1是
   */
  isMultiHalfScore?: number
  /**
   * 试卷id
   */
  paper_id: string
  /**
   * 重做次数
   */
  remakeTime?: number
  /**
   * 开始时间
   */
  start_time?: string
  /**
   * 学生id集合
   */
  student_ids: string[]
}
