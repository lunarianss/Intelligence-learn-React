import { CourseList } from 'server/fetchCourse/types'
import type { TeachPageAction, TeachPageState } from '../type'
const initialCourse: CourseList = {
  coursesCover: '',
  courseName: '',
  courseDescribe: '',
  courseId: ''
}
export const initialState: TeachPageState = {
  imgUrl: '',
  className: '',
  classTeacher: '',
  classList: [initialCourse],
  modalVisible: false,
  EditVisible: false,
  EditingCourse: initialCourse,
  uploadLoading: false,
  courseDescribe: ''
}
export const TeachRoutePageReducer = (state: TeachPageState, action: TeachPageAction) => {
  let newClassList = null
  switch (action.type) {
    case 'setImgUrl':
      return { ...state, imgUrl: action.payload }
    case 'setClassName':
      return { ...state, className: action.payload }
    case 'setClassTeacher':
      return { ...state, classTeacher: action.payload }
    case 'setClasList':
      newClassList = [...state.classList.filter((i) => i.courseId != action.payload.courseId)].concat(action.payload)
      return { ...state, classList: newClassList }
    case 'delClasList':
      newClassList = [...state.classList.filter((i) => i.courseId != action.payload)]
      return { ...state, classList: newClassList }
    case 'setModalVisible':
      return { ...state, modalVisible: action.payload }
    case 'setEditVisible':
      return { ...state, EditVisible: action.payload }
    case 'setEditCourse':
      return { ...state, EditingCourse: action.payload }
    case 'setUploadLoading':
      return { ...state, uploadLoading: action.payload }
    case 'setCourseDescribe':
      return { ...state, courseDescribe: action.payload }
    default:
      throw new Error()
  }
}
