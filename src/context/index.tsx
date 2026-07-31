import { ClassTimeDispatchContextProvider } from './ChapterStudyTree/ClassTimeDispatchContext'
import { ClassInfoContext } from './ClassInfoContext'
import { UserInfoContextProvider } from './UserInfoContext'

export default (props: any) => {
  return (
    <ClassInfoContext>
      <UserInfoContextProvider>
        <ClassTimeDispatchContextProvider>{props.children}</ClassTimeDispatchContextProvider>
      </UserInfoContextProvider>
    </ClassInfoContext>
  )
}
