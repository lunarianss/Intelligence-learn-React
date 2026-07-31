import { CourseList } from 'server/fetchCourse/types'

export interface TeachPageState {
  imgUrl: string
  className: string
  classTeacher: string
  classList: Array<CourseList> | []
  modalVisible: boolean
  EditVisible: boolean
  EditingCourse: CourseList
  uploadLoading: boolean
  courseDescribe: string
}
export type TeachPageAction =
  | { type: 'setImgUrl'; payload: string }
  | { type: 'setClassName'; payload: string }
  | { type: 'setClassTeacher'; payload: string }
  | { type: 'setClasList'; payload: CourseList }
  | { type: 'delClasList'; payload: string }
  | { type: 'setModalVisible'; payload: boolean }
  | { type: 'setEditVisible'; payload: boolean }
  | { type: 'setEditCourse'; payload: CourseList }
  | { type: 'setUploadLoading'; payload: boolean }
  | { type: 'setCourseDescribe'; payload: string }
