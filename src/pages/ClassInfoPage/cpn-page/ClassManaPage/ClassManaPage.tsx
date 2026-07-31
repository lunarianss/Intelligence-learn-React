import { useCurrentClassInfo } from 'context/ClassInfoContext'
import { useToGetClassList } from 'server/fetchClass'
import { ClassManaMain } from './ClassManaPageMain'

const ClassMana = () => {
  const { classInfo } = useCurrentClassInfo()
  const { data, isLoading } = useToGetClassList(classInfo.courseId)
  return <ClassManaMain classList={data!} isLoading={isLoading} />
}

export default ClassMana
