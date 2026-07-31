import { createContext, useContext, useState } from 'react'
import { useGetCourseInfoById } from '../../server/fetchCourse'

export interface IClassInfo {
  courseId: string
  courseName: string | null
  coursesCover: string | null
  courseDescribe: string | null
}

const IClassInit = {
  // 对应的初始化状态（消除NUll）
  courseId: '',
  courseName: null,
  coursesCover: null,
  courseDescribe: null
}

interface IClassInfoContext {
  getCurCourseInfo: (params: string) => void
  classInfo: IClassInfo
}

const ClassInfo = createContext<IClassInfoContext>({
  classInfo: IClassInit,
  getCurCourseInfo: (i) => i
})


export const ClassInfoContext = (props: any) => {
  const [classInfo, setClassInfo] = useState<IClassInfo>(IClassInit)
  const { mutateAsync, isLoading } = useGetCourseInfoById()
  const getCurCourseInfo = async (courseId: string) => {
    try {
      const data = await mutateAsync(courseId)
      setClassInfo(data)
    } catch (e) {}
  }
  return <ClassInfo.Provider value={{ getCurCourseInfo, classInfo }}>{props.children}</ClassInfo.Provider>
}

export const useCurrentClassInfo = () => {
  const data = useContext(ClassInfo)
  return data
}
